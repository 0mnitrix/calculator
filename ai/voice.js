const indicator = document.createElement('div');
indicator.className = 'badge';
indicator.textContent = 'Сүйлөө режими — микрофон даяр';

document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('.ai-pane');
  if (target) {
    target.prepend(indicator);
  }
});
