document.addEventListener('DOMContentLoaded', async () => {
  const list = document.getElementById('category-list');
  const dataset = document.body.dataset.category;
  if (!list || !dataset) return;

  try {
    const res = await fetch(`../data/${dataset}.json`);
    const items = await res.json();
    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="badge">${item.icon} ${item.type || 'Контент'}</div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        ${item.level ? `<p><strong>Деңгээль:</strong> ${item.level}</p>` : ''}
        ${item.format ? `<p><strong>Формат:</strong> ${item.format}</p>` : ''}
        <div class="button-row">
          <button class="btn">Ачуу</button>
          <button class="btn secondary">Толугураак</button>
        </div>`;
      list.appendChild(card);
    });
  } catch (err) {
    list.innerHTML = '<p>Маалыматты жүктөө мүмкүн эмес.</p>';
    console.error(err);
  }
});
