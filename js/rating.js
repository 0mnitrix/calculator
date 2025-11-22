const tabs = {
  weekly: [
    { name: 'Айбек', points: 240 },
    { name: 'Айсулуу', points: 210 },
    { name: 'Улан', points: 188 }
  ],
  monthly: [
    { name: 'Айсулуу', points: 820 },
    { name: 'Нурсултан', points: 780 },
    { name: 'Асель', points: 640 }
  ],
  all: [
    { name: 'Айсулуу', points: 2400 },
    { name: 'Жазгүл', points: 2220 },
    { name: 'Арсен', points: 2100 }
  ],
};

const renderTab = (key) => {
  const list = tabs[key];
  const board = document.querySelector('[data-leaderboard]');
  if (!list || !board) return;
  board.innerHTML = list
    .map(
      (item, idx) => `
      <div class="entry">
        <span class="badge">#${idx + 1}</span>
        <div>
          <strong>${item.name}</strong>
          <p>${key.toUpperCase()} • ${item.points} XP</p>
        </div>
        <button class="btn secondary">Көчүрүү</button>
      </div>
    `,
    )
    .join('');
};

const bindTabs = () => {
  document.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach((t) => t.classList.remove('active'));
      btn.classList.add('active');
      renderTab(btn.dataset.tab);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  bindTabs();
  renderTab('weekly');
});
