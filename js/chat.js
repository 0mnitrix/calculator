function wireChatForms() {
  document.querySelectorAll('[data-chat-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = new FormData(form).get('message');
      const list = form.closest('.drawer, main, body').querySelector('.message-list');
      if (!list || !message) return;
      const bubble = document.createElement('div');
      bubble.className = 'message self';
      bubble.textContent = message;
      list.appendChild(bubble);
      form.reset();
    });
  });
}

document.addEventListener('DOMContentLoaded', wireChatForms);
