function wireSearchForm() {
  const form = document.querySelector('[data-search-form]');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = new FormData(form).get('q');
    const banner = document.querySelector('.ai-status');
    if (banner) {
      banner.textContent = `Издөө: ${query || '—'}`;
    }
  });
}

document.addEventListener('DOMContentLoaded', wireSearchForm);
