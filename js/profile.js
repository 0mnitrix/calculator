document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('./data/user.json');
    const user = await res.json();

    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-handle').textContent = `@${user.username}`;
    document.getElementById('user-xp').textContent = `${user.xp} XP | Level ${user.level}`;

    const achievements = document.getElementById('achievements');
    user.achievements.forEach((item) => {
      const badge = document.createElement('div');
      badge.className = 'badge';
      badge.textContent = `${item.icon} ${item.title}`;
      achievements.appendChild(badge);
    });

    const progress = document.getElementById('course-progress');
    user.courses.forEach((course) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `<h4>${course.name}</h4><div class="progress"><span style="width:${course.progress}%"></span></div><small>${course.progress}%</small>`;
      progress.appendChild(card);
    });

    const uploads = document.getElementById('uploads');
    user.uploads.forEach((upload) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `<h4>${upload.title}</h4><p>${upload.type}</p>`;
      uploads.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load profile data', err);
  }
});
