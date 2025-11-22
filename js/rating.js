const ratingToggle = document.querySelector('.rating-toggle');
const ratingPanel = document.querySelector('.rating-panel');

ratingToggle?.addEventListener('click', () => {
    ratingPanel?.classList.toggle('open');
});
