const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { randomUUID, createHash } = require('node:crypto');

const ROUND_DURATION = 30; // seconds
const BROADCAST_INTERVAL_MS = 500;
const NEXT_ROUND_DELAY = 5 * 1000;

const READY_STATE_OPEN = 1;
const players = new Map(); // id -> { id, name, score, ws }
let timeLeft = ROUND_DURATION;
let gameActive = false;
let countdownInterval = null;
let broadcastInterval = null;
let nextRoundTimeout = null;

const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  const filePath = urlPath === '/' ? path.join(PUBLIC_DIR, 'index.html') : path.join(PUBLIC_DIR, urlPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath);
    const contentType = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
    }[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

function encodeFrame(message) {
  const payload = Buffer.from(message);
  const length = payload.length;
  let header;

  if (length < 126) {
    header = Buffer.alloc(2);
    header[1] = length;
  } else if (length < 65536) {
    header = Buffer.alloc(4);
    header[1] = 126;
    header.writeUInt16BE(length, 2);
  } else {
    header = Buffer.alloc(10);
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(length), 2);
  }

  header[0] = 0x81; // FIN + text frame
  return Buffer.concat([header, payload]);
}

function decodeFrame(buffer) {
  if (!buffer || buffer.length < 2) return null;
  const firstByte = buffer[0];
  const opcode = firstByte & 0x0f;
  if (opcode === 0x8) {
    return null; // close frame
  }

  const secondByte = buffer[1];
  const isMasked = (secondByte & 0x80) === 0x80;
  let offset = 2;
  let payloadLength = secondByte & 0x7f;

  if (payloadLength === 126) {
    payloadLength = buffer.readUInt16BE(offset);
    offset += 2;
  } else if (payloadLength === 127) {
    payloadLength = Number(buffer.readBigUInt64BE(offset));
    offset += 8;
  }

  let maskingKey;
  if (isMasked) {
    maskingKey = buffer.slice(offset, offset + 4);
    offset += 4;
  }

  const payload = buffer.slice(offset, offset + payloadLength);
  if (isMasked) {
    for (let i = 0; i < payload.length; i += 1) {
      payload[i] ^= maskingKey[i % 4];
    }
  }

  return payload.toString('utf-8');
}

function createWebSocketConnection(req, socket) {
  const acceptKey = createHash('sha1')
    .update(req.headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
    .digest('base64');

  const responseHeaders = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${acceptKey}`,
  ];

  socket.write(responseHeaders.join('\r\n') + '\r\n\r\n');

  let isOpen = true;
  socket.on('close', () => {
    isOpen = false;
  });
  socket.on('end', () => {
    isOpen = false;
  });

  return {
    socket,
    get readyState() {
      return isOpen ? READY_STATE_OPEN : 3;
    },
    send(message) {
      if (!isOpen) return;
      socket.write(encodeFrame(message));
    },
    close() {
      if (isOpen) {
        isOpen = false;
        socket.end();
      }
    },
  };
}

function generateName() {
  const adjectives = ['Swift', 'Brave', 'Bright', 'Lucky', 'Rapid', 'Calm'];
  const animals = ['Fox', 'Hawk', 'Otter', 'Panda', 'Tiger', 'Dolphin'];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const suffix = Math.floor(Math.random() * 90 + 10);
  return `${adjective}${animal}${suffix}`;
}

function broadcast(data) {
  const message = JSON.stringify(data);
  for (const player of players.values()) {
    if (player.ws.readyState === READY_STATE_OPEN) {
      player.ws.send(message);
    }
  }
}

function buildStatePayload() {
  return {
    type: 'state',
    players: Array.from(players.values()).map(({ id, name, score }) => ({ id, name, score })),
    timeLeft,
    gameActive,
  };
}

function broadcastState() {
  broadcast(buildStatePayload());
}

function startBroadcasting() {
  if (broadcastInterval) return;
  broadcastInterval = setInterval(broadcastState, BROADCAST_INTERVAL_MS);
}

function stopBroadcasting() {
  if (broadcastInterval) {
    clearInterval(broadcastInterval);
    broadcastInterval = null;
  }
}

function endRound() {
  gameActive = false;
  stopBroadcasting();
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }

  const topScore = Math.max(0, ...Array.from(players.values()).map((p) => p.score));
  const winners = Array.from(players.values())
    .filter((p) => p.score === topScore && topScore > 0)
    .map((p) => p.name);

  broadcast({
    type: 'game_over',
    winners,
    scores: Object.fromEntries(Array.from(players.values()).map((p) => [p.name, p.score])),
  });

  for (const player of players.values()) {
    player.score = 0;
  }
  timeLeft = 0;
  scheduleNextRound();
}

function scheduleNextRound() {
  if (nextRoundTimeout) return;
  nextRoundTimeout = setTimeout(() => {
    nextRoundTimeout = null;
    if (players.size > 0 && !gameActive) {
      startRound();
    }
  }, NEXT_ROUND_DELAY);
}

function startRound() {
  if (gameActive) return;
  timeLeft = ROUND_DURATION;
  gameActive = true;
  startBroadcasting();
  broadcastState();

  countdownInterval = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft <= 0) {
      timeLeft = 0;
      endRound();
    }
  }, 1000);
}

function addPlayer(ws) {
  const id = randomUUID();
  const name = generateName();
  const player = { id, name, score: 0, ws };
  players.set(id, player);
  return player;
}

function handleConnection(ws) {
  const player = addPlayer(ws);

  ws.send(
    JSON.stringify({
      type: 'welcome',
      player: { id: player.id, name: player.name },
      timeLeft,
      gameActive,
    })
  );

  broadcastState();
  if (!gameActive) {
    startRound();
  }

  const handleMessage = (data) => {
    let payload;
    try {
      payload = JSON.parse(data);
    } catch (error) {
      return;
    }

    if (payload.type === 'click' && gameActive) {
      player.score += 1;
      broadcastState();
    }

    if (payload.type === 'restart' && !gameActive) {
      if (nextRoundTimeout) {
        clearTimeout(nextRoundTimeout);
        nextRoundTimeout = null;
      }
      startRound();
    }
  };

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;

    ws.socket.off('data', onData);
    ws.socket.off('close', cleanup);
    ws.socket.off('end', cleanup);
    ws.socket.off('error', cleanup);

    players.delete(player.id);
    broadcastState();

    if (players.size === 0) {
      gameActive = false;
      stopBroadcasting();
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
      timeLeft = ROUND_DURATION;
      if (nextRoundTimeout) {
        clearTimeout(nextRoundTimeout);
        nextRoundTimeout = null;
      }
    }
  };

  const onData = (chunk) => {
    let message;
    try {
      message = decodeFrame(chunk);
    } catch (error) {
      cleanup();
      return;
    }

    if (message === null) {
      cleanup();
      return;
    }
    handleMessage(message);
  };

  ws.socket.on('data', onData);
  ws.socket.on('close', cleanup);
  ws.socket.on('end', cleanup);
  ws.socket.on('error', cleanup);
}

server.on('upgrade', (req, socket) => {
  if ((req.headers.upgrade || '').toLowerCase() !== 'websocket') {
    socket.destroy();
    return;
  }

  const ws = createWebSocketConnection(req, socket);
  handleConnection(ws);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Clicker race server running at http://localhost:${PORT}`);
});

