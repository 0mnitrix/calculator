const mockMessages = [
  { from: 'Айгерим', text: 'Саламатсыздарбы! Этно оюн кимге жагат?' },
  { from: 'Бек', text: 'Жаңы квиздер абдан кызык экен.' },
  { from: 'Садыр', text: 'Жер-Таануу бөлүмүнөн сүрөттөрүңөр менен бөлүшсөңөр.' }
];

const renderChat = () => {
  const list = document.querySelector('[data-chat-messages]');
  if (!list) return;
  list.innerHTML = mockMessages
    .map(
      (m) => `
      <div class="message">
        <strong>${m.from}</strong>
        <p>${m.text}</p>
      </div>
    `,
    )
    .join('');
};

document.addEventListener('DOMContentLoaded', renderChat);
