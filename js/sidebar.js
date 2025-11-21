import { qsa } from './utils.js';

function collapseMobileOnSelect() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  qsa('.sidebar a').forEach((link) => {
    link.addEventListener('click', () => {
      if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', collapseMobileOnSelect);
