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
  if (!sidebar) return;

  // overlay for mobile slide-in
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
  }

  const closeSidebar = () => {
    sidebar.classList.remove('open');
    document.body.classList.remove('sidebar-open');
  };

  const openSidebar = () => {
    sidebar.classList.add('open');
    document.body.classList.add('sidebar-open');
  };

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.contains('open');
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  overlay.addEventListener('click', closeSidebar);

  sidebar.querySelectorAll('.nav-item').forEach((link) => {
    link.addEventListener('click', () => {
      closeSidebar();
    });
  });
};

const initAI = () => {
  const aiTrigger = document.querySelector('.ai-trigger');
  const aiMenu = document.querySelector('.ai-menu');
  const chatPanel = document.querySelector('[data-chat-panel]');
  const openChat = document.querySelector('[data-ai-write]');
  const speakBtn = document.querySelector('[data-ai-speak]');
  const closeChat = document.querySelector('[data-close-chat]');

  if (aiTrigger && aiMenu) {
    aiTrigger.addEventListener('click', () => {
      aiMenu.classList.toggle('visible');
    });
    document.addEventListener('click', (e) => {
      if (!aiMenu.contains(e.target) && !aiTrigger.contains(e.target)) {
        aiMenu.classList.remove('visible');
      }
    });
  }

  if (openChat && chatPanel) {
    openChat.addEventListener('click', () => {
      chatPanel.classList.add('visible');
      aiMenu?.classList.remove('visible');
    });
  }

  if (speakBtn) {
    speakBtn.addEventListener('click', () => {
      aiMenu?.classList.remove('visible');
      alert('Сүйлөө демо: микрофон иштетилген эмес');
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

const ensureDetailModal = () => {
  let layer = document.querySelector('.modal-layer');
  if (!layer) {
    layer = document.createElement('div');
    layer.className = 'modal-layer';
    layer.innerHTML = `
      <div class="modal-card border-band" role="dialog" aria-modal="true">
        <div class="section-heading">
          <div class="title-row"><div class="accent-line"></div><h3 data-modal-title>Деталь</h3></div>
          <button class="btn secondary" type="button" data-close-modal>Жабуу</button>
        </div>
        <p data-modal-description></p>
        <div class="chipset" data-modal-tags></div>
      </div>
    `;
    document.body.appendChild(layer);

    const close = () => layer.classList.remove('visible');
    layer.addEventListener('click', (e) => {
      if (e.target === layer || e.target.dataset.closeModal !== undefined) {
        close();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }
  return layer;
};

const openDetailModal = ({ title, description, tags = [] }) => {
  const layer = ensureDetailModal();
  layer.querySelector('[data-modal-title]').textContent = title;
  layer.querySelector('[data-modal-description]').textContent = description;
  layer.querySelector('[data-modal-tags]').innerHTML = tags
    .map((tag) => `<span class="chip">${tag}</span>`)
    .join('');
  layer.classList.add('visible');
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
          <button
            class="btn primary"
            data-open-detail
            data-title="${item.title}"
            data-description="${item.description}"
            data-tags="${(item.tags || []).join('||')}"
          >${item.cta || 'Ачуу'}</button>
        </article>
      `,
      )
      .join('');

  target.querySelectorAll('[data-open-detail]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tags = btn.dataset.tags ? btn.dataset.tags.split('||').filter(Boolean) : [];
      openDetailModal({
        title: btn.dataset.title || 'Heritago',
        description: btn.dataset.description || '',
        tags,
      });
    });
  });
};

export { setYear, activateNav, initSidebarToggle, initAI, initSearch, renderCards, renderChips };

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  activateNav();
  initSidebarToggle();
  initAI();
  initSearch();
});
