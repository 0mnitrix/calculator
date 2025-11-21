import { qs } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const tagline = qs('[data-category-tagline]');
  if (tagline) {
    tagline.textContent = 'Тил, маданият жана тарых боюнча деңгээлге ылайык квиздер.';
  }
});
