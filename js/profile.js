const renderProfile = async () => {
  try {
    const res = await fetch('./data/user.json');
    const user = await res.json();
    const nameEl = document.querySelector('[data-user-name]');
    const handleEl = document.querySelector('[data-user-handle]');
    const levelEl = document.querySelector('[data-user-level]');
    const streakEl = document.querySelector('[data-user-streak]');
    const achievementsEl = document.querySelector('[data-achievements]');
    const coursesEl = document.querySelector('[data-courses]');

    if (nameEl) nameEl.textContent = user.name;
    if (handleEl) handleEl.textContent = user.handle;
    if (levelEl) levelEl.textContent = `Level ${user.level} • ${user.xp} XP`;
    if (streakEl) streakEl.textContent = `${user.streak} күн`;

    if (achievementsEl) {
      achievementsEl.innerHTML = user.achievements
        .map((item) => `<span class="chip">${item}</span>`)
        .join('');
    }

    if (coursesEl) {
      coursesEl.innerHTML = user.courses
        .map(
          (c) => `
          <div class="stat-pill">
            <strong>${c.title}</strong>
            <div class="progress"><div class="bar" style="width:${c.progress}%"></div></div>
            <small>${c.progress}%</small>
          </div>
        `,
        )
        .join('');
    }
  } catch (err) {
    console.error('Profile load failed', err);
  }
};

document.addEventListener('DOMContentLoaded', renderProfile);
