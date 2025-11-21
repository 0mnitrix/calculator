const setYear = () => {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};

const highlightNav = () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === location.pathname.split('/').pop()) {
      link.classList.add('active');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  highlightNav();
});
