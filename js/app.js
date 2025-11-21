import { qsa, qs } from './utils.js';

function toggleDrawer(targetId) {
  qsa('.drawer').forEach((drawer) => {
    if (drawer.id === targetId) {
      drawer.classList.toggle('open');
    } else {
      drawer.classList.remove('open');
    }
  });
}

function closeDrawers() {
  qsa('.drawer').forEach((drawer) => drawer.classList.remove('open'));
}

function bindDrawerTriggers() {
  qsa('[data-drawer-target]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const { drawerTarget } = trigger.dataset;
      toggleDrawer(drawerTarget);
    });
  });

  qsa('[data-close-drawer]').forEach((btn) => {
    btn.addEventListener('click', closeDrawers);
  });
}

function bindAiMenu() {
  const fab = qs('.ai-fab');
  const menu = qs('.ai-menu');
  if (!fab || !menu) return;

  fab.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  qsa('[data-ai-mode]').forEach((item) => {
    item.addEventListener('click', () => {
      menu.classList.remove('open');
      const mode = item.dataset.aiMode;
      const status = qs('.ai-status');
      if (status) {
        status.textContent = mode === 'voice' ? 'Сүйлөө режими активдүү' : 'Жазуу режими активдүү';
      }
    });
  });
}

function markActiveNav() {
  const path = window.location.pathname.split('/').pop();
  qsa('.sidebar a').forEach((link) => {
    const href = link.getAttribute('href');
    const hrefFile = href ? href.split('/').pop() : '';
    if (hrefFile === path) {
      link.classList.add('active');
    }
  });
}

function bindSidebarToggle() {
  const toggle = qs('[data-sidebar-toggle]');
  const sidebar = qs('.sidebar');
  if (!toggle || !sidebar) return;
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

function initApp() {
  bindDrawerTriggers();
  bindAiMenu();
  markActiveNav();
  bindSidebarToggle();
}

document.addEventListener('DOMContentLoaded', initApp);
