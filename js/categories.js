import { createCard } from './utils.js';

function hydrateCategory(container) {
  const source = container.dataset.source;
  fetch(source)
    .then((res) => res.json())
    .then((items) => {
      container.innerHTML = '';
      items.forEach((item) => {
        container.appendChild(
          createCard({
            title: item.title,
            description: item.description,
            actionText: item.cta || 'Баштоо',
          }),
        );
      });
    })
    .catch(() => {
      container.appendChild(createCard({ title: 'Дайындалган файл табылган жок', description: source }));
    });
}

function initCategories() {
  document.querySelectorAll('[data-category-source]').forEach((container) => {
    hydrateCategory(container);
  });
}

document.addEventListener('DOMContentLoaded', initCategories);
