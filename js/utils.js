export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

export function createCard({ title, description, actionText = 'Ачуу' }) {
  const div = document.createElement('article');
  div.className = 'card category-card';
  div.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
    <div class="hero-actions">
      <button class="button secondary" type="button">${actionText}</button>
    </div>
  `;
  return div;
}
