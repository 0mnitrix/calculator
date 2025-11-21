import { renderList } from './ui.js';

async function loadLesson() {
  try {
    const res = await fetch('./data/lessons.json');
    const { title, summary, steps, vocab } = await res.json();
    const titleEl = document.querySelector('#lesson-title');
    const summaryEl = document.querySelector('#lesson-summary');
    if (titleEl) titleEl.textContent = title;
    if (summaryEl) summaryEl.textContent = summary;
    renderList('#lesson-steps', steps, (step, idx) => `
      <li>
        <div class="avatar">${idx + 1}</div>
        <div>
          <strong>${step.title}</strong>
          <p class="muted">${step.detail}</p>
        </div>
      </li>
    `);
    renderList('#vocab-list', vocab, (item) => `
      <li>
        <span>${item.term}</span>
        <span class="tag">${item.translation}</span>
      </li>
    `);
  } catch (e) {
    console.error('Не удалось загрузить урок', e);
  }
}

document.addEventListener('DOMContentLoaded', loadLesson);
