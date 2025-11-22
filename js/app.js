function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach((item) => {
    const href = item.getAttribute('href');
    if (href && href.includes(current)) {
      item.classList.add('active');
    }
  });
}

function togglePanel(id) {
  const panel = document.getElementById(id);
  if (!panel) return;
  panel.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();

  const chatToggle = document.querySelector('[data-toggle="chat"]');
  const ratingToggle = document.querySelector('[data-toggle="rating"]');

  chatToggle?.addEventListener('click', () => togglePanel('chat-panel'));
  ratingToggle?.addEventListener('click', () => togglePanel('rating-panel'));
});
