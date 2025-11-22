const setYear = () => {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};

const activateNav = () => {
  const currentPage = document.body.dataset.page;
  const links = document.querySelectorAll('.nav-item');
  links.forEach((link) => {
    if (link.dataset.nav === currentPage) {
      link.classList.add('active');
    }
  });
};

const initSidebarToggle = () => {
  const toggle = document.querySelector('[data-sidebar-toggle]');
  const sidebar = document.querySelector('.sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
};

const initAI = () => {
  const aiTrigger = document.querySelector('.ai-trigger');
  const aiMenu = document.querySelector('.ai-menu');
  const chatPanel = document.querySelector('[data-chat-panel]');
  const openChat = document.querySelector('[data-ai-write]');
  const closeChat = document.querySelector('[data-close-chat]');

  if (aiTrigger && aiMenu) {
    aiTrigger.addEventListener('click', () => {
      aiMenu.classList.toggle('visible');
    });
  }

  if (openChat && chatPanel) {
    openChat.addEventListener('click', () => {
      chatPanel.classList.add('visible');
      aiMenu?.classList.remove('visible');
    });
  }

  if (closeChat && chatPanel) {
    closeChat.addEventListener('click', () => {
      chatPanel.classList.remove('visible');
    });
  }
};

const initSearch = () => {
  const searchInput = document.querySelector('[data-search]');
  if (!searchInput) return;
  searchInput.addEventListener('focus', () => {
    searchInput.parentElement?.classList.add('focused');
  });
  searchInput.addEventListener('blur', () => {
    searchInput.parentElement?.classList.remove('focused');
  });
};

const renderChips = (container, tags = []) => {
  if (!container) return;
  container.innerHTML = tags.map((tag) => `<span class="chip">${tag}</span>`).join('');
};

const renderCards = (targetSelector, items = []) => {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  target.innerHTML = items
    .map(
      (item) => `
      <article class="category-card border-band">
        <div class="meta">
          <span class="badge-line">${item.level || item.difficulty || ''}</span>
          <span class="badge-line">${item.length || ''}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="chipset">${(item.tags || [])
          .map((tag) => `<span class="chip">${tag}</span>`)
          .join('')}</div>
        <button class="btn primary">${item.cta || 'Ачуу'}</button>
      </article>
    `,
    )
    .join('');
};

export { setYear, activateNav, initSidebarToggle, initAI, initSearch, renderCards, renderChips };

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  activateNav();
  initSidebarToggle();
  initAI();
  initSearch();
});
