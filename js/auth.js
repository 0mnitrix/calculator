const form = document.querySelector('form[data-auth]');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    alert(`Добро пожаловать, ${payload.name || payload.email}! (демо)`);
  });
}
