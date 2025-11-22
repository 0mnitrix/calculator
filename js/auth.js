const forms = document.querySelectorAll('form[data-auth]');

const persistDemoUser = (payload) => {
  const user = {
    name: payload.name || payload.email,
    email: payload.email,
  };
  try {
    localStorage.setItem('heritagoUser', JSON.stringify(user));
  } catch (err) {
    console.warn('Unable to persist demo user', err);
  }
  return user;
};

forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    const status = form.querySelector('[data-auth-status]');

    if (!payload.email || !payload.password) {
      status ? (status.textContent = 'Email жана пароль толтуруңуз') : alert('Email жана пароль толтуруңуз');
      return;
    }

    const user = persistDemoUser(payload);
    const message = `Кош келиңиз, ${user.name}! (демо аккаунт)`;
    if (status) {
      status.textContent = message;
    } else {
      alert(message);
    }
    setTimeout(() => {
      window.location.href = '/dashboard.html';
    }, 500);
  });
});
