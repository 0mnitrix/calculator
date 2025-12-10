const hamburger = document.querySelector('.hamburger');
const sideMenu = document.getElementById('side-menu');
const backdrop = document.querySelector('.backdrop');
const closeBtn = document.querySelector('.close-btn');

function openMenu() {
  sideMenu.classList.add('open');
  sideMenu.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  backdrop.hidden = false;
}

function closeMenu() {
  sideMenu.classList.remove('open');
  sideMenu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  backdrop.hidden = true;
}

hamburger.addEventListener('click', () => {
  const isOpen = sideMenu.classList.contains('open');
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

closeBtn.addEventListener('click', closeMenu);
backdrop.addEventListener('click', closeMenu);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && sideMenu.classList.contains('open')) {
    closeMenu();
  }
});
