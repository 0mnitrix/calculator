const clickButton = document.getElementById('click-btn');
const restartButton = document.getElementById('restart-btn');
const timerEl = document.getElementById('timer');
const playersList = document.getElementById('players');
const playerNameEl = document.getElementById('player-name');
const playerScoreEl = document.getElementById('player-score');
const statusEl = document.getElementById('status');
const roundStatusEl = document.getElementById('round-status');
const toastEl = document.getElementById('toast');

let socket;
let currentPlayer = null;
let gameActive = false;

function connect() {
  const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  socket = new WebSocket(`${protocol}://${location.host}`);

  socket.addEventListener('open', () => {
    statusEl.textContent = 'Connected. Get ready to click!';
  });

  socket.addEventListener('message', (event) => {
    const payload = JSON.parse(event.data);

    if (payload.type === 'welcome') {
      currentPlayer = payload.player;
      playerNameEl.textContent = currentPlayer.name;
      clickButton.disabled = !payload.gameActive;
      restartButton.disabled = payload.gameActive;
      if (!payload.gameActive) {
        statusEl.textContent = 'Waiting for the next round to start...';
      }
    }

    if (payload.type === 'state') {
      renderState(payload);
    }

    if (payload.type === 'game_over') {
      showGameOver(payload);
    }
  });

  socket.addEventListener('close', () => {
    statusEl.textContent = 'Disconnected. Reconnecting...';
    clickButton.disabled = true;
    restartButton.disabled = true;
    setTimeout(connect, 1200);
  });
}

function renderState(state) {
  gameActive = state.gameActive;
  timerEl.textContent = `${state.timeLeft}s`;
  clickButton.disabled = !state.gameActive;
  restartButton.disabled = state.gameActive;
  statusEl.textContent = state.gameActive ? 'Tap like crazy!' : 'Round finished. Waiting...';
  roundStatusEl.textContent = state.gameActive ? 'Live' : 'Idle';

  const sortedPlayers = [...state.players].sort((a, b) => b.score - a.score);
  playersList.innerHTML = '';
  sortedPlayers.forEach((player, index) => {
    const li = document.createElement('li');
    li.className = player.id === currentPlayer?.id ? 'me' : '';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = `${index + 1}. ${player.name}`;

    const scoreSpan = document.createElement('strong');
    scoreSpan.textContent = player.score;

    li.appendChild(nameSpan);
    li.appendChild(scoreSpan);
    playersList.appendChild(li);

    if (player.id === currentPlayer?.id) {
      playerScoreEl.textContent = player.score;
    }
  });
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.remove('hidden');
  toastEl.classList.add('visible');
  setTimeout(() => {
    toastEl.classList.remove('visible');
    setTimeout(() => toastEl.classList.add('hidden'), 200);
  }, 2000);
}

function showGameOver(payload) {
  const { winners, scores } = payload;
  const winnerText = winners?.length ? winners.join(', ') : 'Nobody';
  const scoreboard = Object.entries(scores || {})
    .map(([name, score]) => `${name}: ${score}`)
    .join(' • ');
  showToast(`Winner: ${winnerText} | ${scoreboard}`);
}

clickButton.addEventListener('click', () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: 'click' }));
  }
});

restartButton.addEventListener('click', () => {
  if (socket && socket.readyState === WebSocket.OPEN && !gameActive) {
    socket.send(JSON.stringify({ type: 'restart' }));
  }
});

connect();
