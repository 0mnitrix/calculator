async function loadProgress() {
  try {
    const res = await fetch('./data/courses.json');
    const courses = await res.json();
    const table = document.querySelector('#progress-table tbody');
    if (!table) return;
    table.innerHTML = courses
      .map(
        (course) => `
        <tr>
          <td>${course.title}</td>
          <td>${course.progress || '42%'}
            <div class="progress" aria-hidden="true"><div class="bar" style="width:${course.progress || '42%'}"></div></div>
          </td>
          <td>${course.lessons} уроков</td>
          <td>${course.language}</td>
        </tr>
      `
      )
      .join('');
  } catch (e) {
    console.error('Не удалось загрузить прогресс', e);
  }
}

document.addEventListener('DOMContentLoaded', loadProgress);
