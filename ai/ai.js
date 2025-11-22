const aiHistory = [
  { role: 'assistant', text: 'Саламатсызбы! Эмне үйрөнгүңүз келет?' },
  { role: 'user', text: 'Кыргыз жер-суусу боюнча айтыңыз.' },
  { role: 'assistant', text: 'Ысык-Көл дүйнөдөгү экинчи чоң тоо көлү, ал эми Сулайман-Тоо ЮНЕСКОнун мурасы.' }
];

document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.querySelector('[data-ai-thread]');
  if (!wrap) return;
  wrap.innerHTML = aiHistory
    .map(
      (m) => `
      <div class="message ${m.role}">
        <strong>${m.role === 'assistant' ? 'Heritago AI' : 'Сиз'}</strong>
        <p>${m.text}</p>
      </div>
    `,
    )
    .join('');
});
