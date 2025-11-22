const aiButton = document.getElementById('ai-button');
const aiMenu = document.getElementById('ai-menu');
const aiChatWindow = document.getElementById('ai-chat-window');

if (aiButton) {
    aiButton.addEventListener('click', () => {
        aiMenu.style.display = aiMenu.style.display === 'block' ? 'none' : 'block';
        aiChatWindow.style.right = aiChatWindow.style.right === '20px' ? '-400px' : '20px';
    });
}

const aiInput = aiChatWindow?.querySelector('input');
const aiMessages = aiChatWindow?.querySelector('.messages');

aiInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && aiInput.value.trim()) {
        const div = document.createElement('div');
        div.textContent = aiInput.value;
        aiMessages.appendChild(div);
        aiInput.value = '';
    }
});
