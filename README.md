# Heritago — этно-учебная платформа

Статический макет учебной платформы в кыргыз этно-стиле теперь сопровождается Django-бэкендом: многостраничная структура, узорные SVG, палитра терракоты и алтын, компоненты, JSON-данные и API.

## Страницы
- `index.html` — главная с миссией, героем и блоками
- `login.html`, `signup.html` — авторизация
- `dashboard.html`, `progress.html`, `profile.html` — кабинет и прогресс
- `courses.html`, `course.html`, `lesson.html` — курсы и уроки
- `quiz.html` — тесты
- `leaderboard.html` — рейтинг
- `settings.html` — настройки

## Стек
- CSS: `global.css`, `layout.css`, `components.css`, `ethno.css`, `lesson.css`, `quiz.css`
- JS: базовая инициализация (`app.js`), отрисовка (`ui.js`), загрузка данных (`courses.js`, `lesson.js`, `quiz.js`, `progress.js`), демо-авторизация (`auth.js`)
- Данные: `data/*.json`
- SVG-активы: `assets/logo_heritago.svg`, узорные паттерны в `assets/patterns`

Открывайте `index.html` в браузере или через простой статический сервер, чтобы увидеть полную этно-верстку.

## Бэкенд на Django

### Установка

1. Установите зависимости (нужен Python 3.11+):

```bash
pip install -r requirements.txt
```

2. Примените миграции и загрузите демо-данные (курс, урок, тест, прогресс уже зашиты в миграции):

```bash
python manage.py migrate
```

3. Запустите дев-сервер:

```bash
python manage.py runserver
```

### Роутинг

- Страницы: `/`, `/index.html`, `/courses.html`, `/course.html`, `/lesson.html`, `/quiz.html`, `/dashboard.html`, `/progress.html`, `/profile.html`, `/leaderboard.html`, `/settings.html`, `/login.html`, `/signup.html`.
- API: `/api/health/`, `/api/courses/`, `/api/lessons/` (опционально `?course_id=`), `/api/quiz/`, `/api/progress/`.

### Примечания

- Статика (`css/`, `js/`, `assets/`, `data/`) раздается Django в режиме `DEBUG` и готова к `collectstatic` через `STATIC_ROOT=staticfiles/`.
- Миграция `0002_seed_demo_content` заполняет базу теми же данными, что и JSON, чтобы API и страницы работали без ручного ввода.
