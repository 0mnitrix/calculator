import { qs } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const tagline = qs('[data-category-tagline]');
  if (tagline) {
    tagline.textContent = 'Уруулардын тарыхын жана интерактивдүү дарактарды изилде.';
  }
});
