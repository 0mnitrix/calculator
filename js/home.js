import { qs, createCard } from './utils.js';

function hydrateFromData() {
  const popularStrip = qs('[data-source]');
  if (!popularStrip) return;
  const { source } = popularStrip.dataset;
  fetch(source)
    .then((res) => res.json())
    .then((items) => {
      items.slice(0, 6).forEach((item) => {
        popularStrip.appendChild(
          createCard({
            title: item.title,
            description: item.description,
            actionText: item.cta || 'Көрүү',
          }),
        );
      });
    })
    .catch(() => {
      popularStrip.appendChild(createCard({ title: 'Контент табылган жок', description: 'Файлды текшериңиз.' }));
    });
}

document.addEventListener('DOMContentLoaded', hydrateFromData);
