const chatToggle = document.querySelector('.chat-toggle');
const chatPanel = document.querySelector('.chat-panel');

chatToggle?.addEventListener('click', () => {
    chatPanel?.classList.toggle('open');
});
