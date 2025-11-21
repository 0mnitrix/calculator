function wireAiForms() {
  document.querySelectorAll('[data-ai-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = new FormData(form).get('prompt');
      const transcript = form.closest('.ai-pane, body').querySelector('.ai-transcript');
      if (transcript && input) {
        const time = new Date().toLocaleTimeString('ky-KG', { hour: '2-digit', minute: '2-digit' });
        transcript.textContent = `[${time}] ${input}`;
      }
      form.reset();
    });
  });
}

document.addEventListener('DOMContentLoaded', wireAiForms);
