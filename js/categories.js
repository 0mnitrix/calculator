import { renderCards } from './app.js';

const mapCategoryToData = {
  games: 'games.json',
  quiz: 'quiz.json',
  cinema: 'videos.json',
  sanjira: 'sanjira.json',
  explore: 'explore.json',
  encyclopedia: 'encyclopedia.json',
  books: 'books.json',
  news: 'news.json',
  favorites: 'books.json'
};

const loadCategory = async () => {
  const page = document.body.dataset.page;
  const target = document.querySelector('[data-category-list]');
  if (!page || !target) return;
  const file = mapCategoryToData[page];
  try {
    const res = await fetch(`../data/${file}`);
    const items = await res.json();
    renderCards('[data-category-list]', items);
  } catch (err) {
    console.error('Category load failed', err);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadCategory();
});
