const setYear = () => {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};

const highlightNav = () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  const current = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  highlightNav();
});
