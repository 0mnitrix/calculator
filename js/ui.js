export function renderList(targetSelector, items = [], renderer) {
  const target = document.querySelector(targetSelector);
  if (!target || !renderer) return;
  target.innerHTML = items.map(renderer).join('');
}

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} мин`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}ч ${m}м`;
}
