const express = require('express');
const http = require('http');
const { WebSocketServer, WebSocket } = require('ws');
const { randomUUID } = require('crypto');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const ROUND_DURATION = 30; // seconds
const BROADCAST_INTERVAL_MS = 500;
const NEXT_ROUND_DELAY = 5 * 1000;

const players = new Map(); // id -> { id, name, score, ws }
let timeLeft = ROUND_DURATION;
let gameActive = false;
let countdownInterval = null;
let broadcastInterval = null;
let nextRoundTimeout = null;

app.use(express.static('public'));

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
    if (player.ws.readyState === WebSocket.OPEN) {
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

wss.on('connection', (ws) => {
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

  ws.on('message', (data) => {
    let payload;
    try {
      payload = JSON.parse(data.toString());
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
  });

  ws.on('close', () => {
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
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Clicker race server running at http://localhost:${PORT}`);
});

