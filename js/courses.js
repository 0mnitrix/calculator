import { renderList, formatDuration } from './ui.js';

async function loadCourses() {
  try {
    const res = await fetch('/api/courses/');
    const courses = await res.json();
    renderList('#course-list', courses, (course) => `
      <article class="card border-band">
        <div class="badge">${course.level}</div>
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <div class="lesson-meta">
          <span class="chip">${course.lessons} уроков</span>
          <span class="chip">${formatDuration(course.duration)}</span>
          <span class="chip">${course.language}</span>
        </div>
      </article>
    `);
  } catch (e) {
    console.error('Не удалось загрузить курсы', e);
  }
}

document.addEventListener('DOMContentLoaded', loadCourses);
