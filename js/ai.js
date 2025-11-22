document.addEventListener('DOMContentLoaded', () => {
  const aiButton = document.querySelector('.ai-button');
  const aiMenu = document.querySelector('.ai-menu');
  const aiChat = document.getElementById('ai-chat-panel');

  aiButton?.addEventListener('click', () => {
    aiMenu?.classList.toggle('open');
  });

  aiMenu?.querySelector('[data-mode="voice"]')?.addEventListener('click', () => {
    aiMenu.classList.remove('open');
    alert('Voice mode placeholder: connect microphone handling.');
  });

  aiMenu?.querySelector('[data-mode="text"]')?.addEventListener('click', () => {
    aiMenu.classList.remove('open');
    aiChat?.classList.toggle('open');
  });

  aiChat?.querySelector('form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = aiChat.querySelector('textarea');
    if (!input?.value.trim()) return;
    const log = aiChat.querySelector('.ai-log');
    const entry = document.createElement('div');
    entry.className = 'card';
    entry.textContent = input.value.trim();
    log?.appendChild(entry);
    input.value = '';
  });
});
