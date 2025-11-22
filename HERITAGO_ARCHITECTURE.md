# Heritago Web Platform Architecture

## Layout Overview
The web application uses a consistent four-part layout across all pages:
- **Top Bar** fixed across the full width with logo (home link), profile, settings, and global search.
- **Sidebar Navigation** anchored on the left for primary navigation.
- **Content Area** for page-specific experiences.
- **AI Assistant** button fixed to the bottom-right corner.

## Top Bar
- **Logo**: returns to the home page.
- **Profile**: quick access to account details.
- **Settings**: language, privacy, and themes.
- **Search**: global search across the platform.

## Sidebar Navigation
Order reflects priority: content → social → system.

### Content Sections
- 🕹 **Оюндар**
- ❓ **Квиздер**
- 🎬 **Кино**
- 🐺 **Санжыра**
- 🌍 **Жер-Таануу**
- 📚 **Энциклопедия**
- 📖 **Китептер**
- Optional: 📰 **Жаңылыктар**, ❤️ **Избранное**

### Social Sections
- 💬 **Глобал Чат**
- ⭐ **Рейтинг**
- 👤 **Мен профиль**

### System Sections
- ⚙️ **Орнотуулар**
- 🌐 **Тил тандоо**

## Home Page
1. **Hero**: headline “Кыргыз маданиятын жаңы муундагы форматта үйрөн.” with primary button “Баштоо” and secondary “Курс тандоо”; soft ethnic patterned background.
2. **Featured/Recommendations**: three large cards (Кыргыз тили A1, Популярдуу Квиз, Жаңы Видео).
3. **Popular Carousel**: horizontal scroll of popular content cards.
4. **Quote/Mission**: concise cultural statement.

## Category Pages
Each sidebar entry opens its own page with cards for key items.
- **Оюндар**: Vocabulary Game, Memory Cards, Match Pairs, Speed Reaction, Audio Guess Game (card + Play CTA).
- **Квиздер**: Beginner Quiz, Culture Quiz, Geography Quiz, Санжыра факты, Аралаш тест (card + difficulty levels).
- **Кино**: Мультфильмы, Документалдык видеолор, Кыска видео, Окуу видеолору (video cards).
- **Санжыра**: Уруулардын дарагы, Уруулардын тарыхы, Аймактык бөлүнүү, Интерактивдүү карта.
- **Жер-Таануу**: Облустар, Туристтик жайлар, Кыргызстандын жаратылышы, Видео/фото коллекциялар.
- **Энциклопедия**: Тарых, Коом, Маданият, Адабият, Искусство (tables + cards).
- **Китептер**: Аудиокниги, PDF, Балдар китептери, Кыска тексттер.

## Social Experiences
- **Глобал Чат**: slide-in panel from the right with topic list and message input.
- **Рейтинг**: slide-in leaderboard with weekly, monthly, and all-time tabs.

## Profile Page
- **Personal Summary**: avatar, name, @handle, XP/level, edit profile.
- **Achievements**: badges (e.g., Баштоочу, 7 күн streak, 10 китеп, 5 видео, Жер-Таануу lvl 1).
- **Course Progress**: progress bars for enrolled tracks.
- **Uploads**: gallery for photos, text, and voice notes.
- **Personal Info**: editable name, email, birth year, location, gender.
- **Settings**: language, privacy, account options.

## AI Assistant (Persistent)
- Fixed bottom-right button.
- **Step 1**: mini menu with 🎤 “Сүйлөө” and ✍️ “Жазуу”.
- **Step 2**: speech mode opens microphone; writing mode opens right-side chat panel with prompt field. Assistant button remains visible.

## Suggested File Structure
```
heritago/
├── index.html
├── profile.html
├── chat.html
├── rating.html
├── settings.html
├── login.html
├── register.html
├── categories/
│   ├── games.html
│   ├── quiz.html
│   ├── cinema.html
│   ├── sanjira.html
│   ├── explore.html
│   ├── encyclopedia.html
│   ├── books.html
│   ├── news.html
│   └── favorites.html
├── ai/
│   ├── ai-chat.html
│   ├── ai.js
│   └── voice.js
├── assets/
│   ├── logo/
│   │   └── logo.svg
│   ├── icons/
│   │   ├── game.svg
│   │   ├── quiz.svg
│   │   ├── movie.svg
│   │   ├── sanjira.svg
│   │   ├── explore.svg
│   │   ├── book.svg
│   │   ├── encyclopedia.svg
│   │   ├── chat.svg
│   │   ├── rating.svg
│   │   └── ai.svg
│   ├── images/
│   │   ├── hero-bg.png
│   │   ├── patterns.png
│   │   └── category-bg.jpg
│   └── videos/
├── css/
│   ├── global.css
│   ├── layout.css
│   ├── components.css
│   ├── sidebar.css
│   ├── topbar.css
│   ├── home.css
│   ├── profile.css
│   ├── chat.css
│   ├── rating.css
│   ├── categories.css
│   ├── ai.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── sidebar.js
│   ├── topbar.js
│   ├── home.js
│   ├── chat.js
│   ├── rating.js
│   ├── profile.js
│   ├── categories.js
│   ├── games.js
│   ├── quiz.js
│   ├── cinema.js
│   ├── sanjira.js
│   ├── explore.js
│   ├── encyclopedia.js
│   ├── books.js
│   └── utils.js
└── data/
    ├── games.json
    ├── quiz.json
    ├── videos.json
    ├── sanjira.json
    ├── explore.json
    ├── encyclopedia.json
    ├── books.json
    ├── news.json
    └── user.json
```
