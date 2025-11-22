document.addEventListener('DOMContentLoaded', async () => {
  const featured = document.getElementById('featured');
  const popular = document.getElementById('popular');

  try {
    const res = await fetch('./data/home.json');
    const data = await res.json();

    data.featured.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `<div class="badge">${item.icon} ${item.tag}</div><h3>${item.title}</h3><p>${item.description}</p>`;
      featured?.appendChild(card);
    });

    data.popular.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `<h4>${item.title}</h4><p>${item.description}</p>`;
      popular?.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load home data', err);
  }
});
