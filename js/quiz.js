async function loadQuiz() {
  try {
    const res = await fetch('./data/quiz.json');
    const { title, questions } = await res.json();
    const titleEl = document.querySelector('#quiz-title');
    if (titleEl) titleEl.textContent = title;
    const list = document.querySelector('#quiz-questions');
    if (!list) return;
    list.innerHTML = questions
      .map((q, idx) => `
        <section class="question-card">
          <div class="quiz-header">
            <h3>${idx + 1}. ${q.prompt}</h3>
            <span class="badge">${q.topic}</span>
          </div>
          <ul class="option-list">
            ${q.options
              .map(
                (option, i) => `
                  <li>
                    <label>
                      <input type="radio" name="q${idx}" value="${i}" />
                      <span>${option}</span>
                    </label>
                  </li>
                `
              )
              .join('')}
          </ul>
        </section>
      `)
      .join('');
  } catch (e) {
    console.error('Не удалось загрузить тест', e);
  }
}

document.addEventListener('DOMContentLoaded', loadQuiz);
