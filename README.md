# Heritago — этно-учебная платформа

Статический макет учебной платформы в кыргыз этно-стиле: многостраничная структура, узорные SVG, палитра терракоты и алтын, компоненты и JSON-данные.

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
