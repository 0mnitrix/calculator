import { qs } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const tagline = qs('[data-category-tagline]');
  if (tagline) {
    tagline.textContent = 'Аудио, PDF жана балдар китептеринин жыйнагы.';
  }
});
