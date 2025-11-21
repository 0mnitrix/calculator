import '../js/ai.js';

const voiceStatus = document.createElement('p');
voiceStatus.className = 'helper-text';
voiceStatus.textContent = 'AI ассистент чат режими иштеп жатат.';

document.addEventListener('DOMContentLoaded', () => {
  const pane = document.querySelector('.ai-pane');
  if (pane) {
    pane.appendChild(voiceStatus);
  }
});
