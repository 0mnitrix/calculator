async function loadProgress() {
  try {
    const res = await fetch('/api/progress/');
    const entries = await res.json();
    const table = document.querySelector('#progress-table tbody');
    if (!table) return;
    table.innerHTML = entries
      .map((entry) => {
        const course = entry.course || entry;
        const progress = entry.percent || course.progress || '42%';
        const lessons = entry.lessons_completed || course.lessons;
        return `
        <tr>
          <td>${course.title}</td>
          <td>${progress}
            <div class="progress" aria-hidden="true"><div class="bar" style="width:${progress}"></div></div>
          </td>
          <td>${lessons} уроков</td>
          <td>${course.language}</td>
        </tr>`;
      })
      .join('');
  } catch (e) {
    console.error('Не удалось загрузить прогресс', e);
  }
}

document.addEventListener('DOMContentLoaded', loadProgress);
