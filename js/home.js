import { renderCards } from './app.js';

const loadHomeSections = async () => {
  const featuredEl = document.querySelector('[data-featured]');
  const carouselEl = document.querySelector('[data-carousel]');
  try {
    const [gamesRes, quizRes, videoRes] = await Promise.all([
      fetch('/data/games.json'),
      fetch('/data/quiz.json'),
      fetch('/data/videos.json'),
    ]);
    const [games, quizzes, videos] = await Promise.all([
      gamesRes.json(),
      quizRes.json(),
      videoRes.json(),
    ]);

    if (featuredEl) {
      const picks = [games[0], quizzes[1], videos[2]];
      renderCards('[data-featured]', picks);
    }

    if (carouselEl) {
      const list = [...games.slice(0, 2), ...quizzes.slice(0, 2), videos[0]];
      carouselEl.innerHTML = list
        .map(
          (item) => `
          <article class="card border-band">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
            <div class="chipset">${(item.tags || [])
              .map((tag) => `<span class="chip">${tag}</span>`)
              .join('')}</div>
          </article>
        `,
        )
        .join('');
    }
  } catch (err) {
    console.error('Home data failed', err);
  }
};

document.addEventListener('DOMContentLoaded', loadHomeSections);
