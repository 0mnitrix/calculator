function renderProgress(progressList, entries) {
  progressList.innerHTML = '';
  entries.forEach((entry) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'progress-item';
    wrapper.innerHTML = `
      <div class="section-title"><h4>${entry.title}</h4><span class="helper-text">${entry.percent}%</span></div>
      <div class="progress-bar"><span class="progress-fill" style="--value:${entry.percent}%"></span></div>
    `;
    progressList.appendChild(wrapper);
  });
}

function hydrateProfile() {
  const endpoint = 'data/user.json';
  fetch(endpoint)
    .then((res) => res.json())
    .then((user) => {
      const name = document.querySelector('[data-user-name]');
      const username = document.querySelector('[data-user-username]');
      const xp = document.querySelector('[data-user-xp]');
      if (name) name.textContent = user.name;
      if (username) username.textContent = `@${user.username}`;
      if (xp) xp.textContent = `${user.xp} XP | Level ${user.level}`;

      const achievements = document.querySelector('[data-achievements]');
      if (achievements) {
        achievements.innerHTML = '';
        user.achievements.forEach((ach) => {
          const badge = document.createElement('span');
          badge.className = 'badge';
          badge.textContent = ach;
          achievements.appendChild(badge);
        });
      }

      const progressList = document.querySelector('[data-progress-list]');
      if (progressList) {
        renderProgress(progressList, user.progress);
      }
    })
    .catch(() => {
      const notice = document.querySelector('[data-user-name]');
      if (notice) {
        notice.textContent = 'Маалымат жүктөлгөн жок';
      }
    });
}

document.addEventListener('DOMContentLoaded', hydrateProfile);
