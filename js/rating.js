function switchRatingTab(button, list) {
  const filter = button.dataset.filter;
  list.querySelectorAll('.rating-item').forEach((item) => {
    const scope = item.dataset.scope;
    item.hidden = filter !== 'all' && scope !== filter;
  });
}

function bindRatingTabs() {
  const tabs = document.querySelector('.rating-tabs');
  const list = document.querySelector('.rating-list');
  if (!tabs || !list) return;

  tabs.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      tabs.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      switchRatingTab(btn, list);
    });
  });
}

document.addEventListener('DOMContentLoaded', bindRatingTabs);
