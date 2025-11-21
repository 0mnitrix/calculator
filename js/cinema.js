import { qs } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const tagline = qs('[data-category-tagline]');
  if (tagline) {
    tagline.textContent = 'Документалдуу, окутуучу жана кыска видеолор бир жерде.';
  }
});
