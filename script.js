const drawers = document.querySelectorAll('.drawer');
const aiMenu = document.querySelector('.ai-menu');
const fab = document.querySelector('[data-toggle="ai-menu"]');

document.addEventListener('click', (event) => {
  const openTarget = event.target.closest('[data-open]');
  const closeTarget = event.target.closest('[data-close]');
  const toggleFab = event.target.closest('[data-toggle="ai-menu"]');

  if (toggleFab) {
    aiMenu.hidden = !aiMenu.hidden;
  }

  if (openTarget) {
    const id = openTarget.getAttribute('data-open');
    const drawer = document.getElementById(id);
    if (drawer) {
      drawer.hidden = false;
      aiMenu.hidden = true;
    }
  }

  if (closeTarget) {
    const id = closeTarget.getAttribute('data-close');
    const drawer = document.getElementById(id);
    if (drawer) {
      drawer.hidden = true;
    }
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    drawers.forEach((drawer) => (drawer.hidden = true));
    aiMenu.hidden = true;
  }
});
