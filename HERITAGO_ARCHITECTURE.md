# HERITAGO Web Platform Architecture (Final UX/UI Spec)

A concise, implementation-ready blueprint for the HERITAGO ethnographic web platform. Every element is defined for production-ready delivery to design, frontend, and backend teams.

## 1. Global Layout & Ethno Visual Direction
- **Persistent regions (desktop):** Top Bar (fixed), Left Sidebar (fixed full height), Main Content (scrollable), AI Assistant FAB fixed at bottom-right.
- **Grid behavior:** 12-column fluid grid in the content area; sidebar remains 280–320px on desktop, collapsible to icons on tablet, hides behind hamburger on mobile.
- **Ethno theme:** warm neutral base, accent colors sampled from Kyrgyz ornaments (deep red, teal, gold), subtle ornament overlays at 10–15% opacity on hero and key banners.
- **Typography:** clear sans for body (e.g., Inter), contrasted with display serif for headlines; supports Cyrillic and Latin; font scaling uses `clamp()` for responsiveness.
- **Iconography:** consistent set with the glyphs noted below; line icons with rounded corners.
- **Accessibility:** WCAG AA contrast, focus-visible rings, keyboard navigable sidebar, reduced motion option, ARIA labels on all interactive elements.

## 2. Top Bar (Persistent)
```
[ HERITAGO LOGO ]                                 [ Профиль ] [ Настройки ] [ Поиск ]
```
- **Logo:** returns to Home.
- **Профиль:** quick account menu (view profile, logout, switch role if applicable).
- **Настройки:** language, privacy, themes, notification toggles.
- **Поиск:** global search field with command-k shortcut; results open in overlay.
- **Behavior:** stays fixed; height 64px; shadow when main scrolls; identical across all pages.

## 3. Left Sidebar Navigation (Persistent)
- **Structure order:** Content → Social → System, reinforcing priority.
- **Sections:**
  - 🕹 ОЮНДАР
  - ❓ КВИЗДЕР
  - 🎬 КИНО
  - 🐺 САНЖЫРА
  - 🌍 ЖЕР-ТААНУУ
  - 📚 ЭНЦИКЛОПЕДИЯ
  - 📖 КИТЕПТЕР
  - (Optional) 📰 Жаңылыктар, ❤️ Избранное
- **Social:** 💬 ГЛОБАЛ ЧАТ, ⭐ РЕЙТИНГ, 👤 МЕН ПРОФИЛ
- **System:** ⚙️ ОРНОТУУЛАР, 🌐 ТИЛ ТАНДОО
- **Behavior:** fixed height, scrollable if overflow; active state highlighted with ornament accent; collapsible to icons; tooltips on hover; mobile opens via hamburger.

## 4. Home Page (Main Content)
1) **Hero block** with soft ornament background and CTA buttons:
```
Кыргыз маданиятын
жаңы муундагы форматта үйрөн.

[ Баштоо ]   [ Курс тандоо ]
```
2) **Featured/Recommendation (3 cards):** Кыргыз тили А1; Популярдуу Квиз; Жаңы Видео.
3) **Популярдуу (horizontal scroll):** card carousel with lazy loading and keyboard/drag support.
4) **Mission/Cultural quote:** short Kyrgyz statement with author attribution.

## 5. Category Pages (from Sidebar)
Each section uses uniform card grids (2–4 columns desktop, 1–2 mobile) with badges for difficulty/type and primary CTA.
- **🕹 ОЮНДАР:** Vocabulary Game; Memory Cards; Match Pairs; Speed Reaction; Audio Guess Game — each card has "Play".
- **❓ КВИЗДЕР:** Beginner Quiz; Culture Quiz; Geography Quiz; Санжыра факты; Аралаш тест — include difficulty chips.
- **🎬 КИНО:** Мультфильмы; Документалдык видеолор; Кыска видео; Окуу видеолору — video cards with duration and type.
- **🐺 САНЖЫРА:** Уруулардын дарагы; Уруулардын тарыхы; Аймактык бөлүнүү; Интерактивдүү карта — tree view + map widget.
- **🌍 ЖЕР-ТААНУУ:** Облустар; Туристтик жайлар; Кыргызстандын жаратылышы; Видео/фото коллекциялар — gallery and map filters.
- **📚 ЭНЦИКЛОПЕДИЯ:** Тарых; Коом; Маданият; Адабият; Искусство — table + cards hybrid for quick scan and detail.
- **📖 КИТЕПТЕР:** Аудиокниги; PDF; Балдар китептери; Кыска тексттер — list with format tags and progress.
- **Optional:** 📰 Жаңылыктар feed; ❤️ Избранное for saved items (supports all content types).

## 6. Global Chat (💬)
- Opens as right-side drawer overlay.
- **Layout:** topic list + live chat area, input with send button, close (×) control.
- Supports message timestamps, typing indicator, and basic moderation (report, mute topic).

## 7. Global Rating (⭐)
- Right-side drawer with tabs: weekly, monthly, all-time.
- List with rank, username, XP; highlight current user; supports search/filter.

## 8. Profile (👤 Мен профиль)
- **Header:** avatar, name, handle, XP, level, "Редактировать профиль".
- **Achievements:** icon grid (🏆 Баштоочу, 🔥 7 күн streak, 📚 10 китеп, 🎬 5 видео, 🌍 Жер-Таануу lvl 1, etc.).
- **Course Progress:** progress bars (e.g., Кыргыз тили А1 — 72%; Санжыра — 44%; Энциклопедия — 13%).
- **Uploads:** gallery for photos, text notes, audio notes.
- **Personal Info:** editable fields (Аты, Email, Туулган жылы, Турак жер, Пол).
- **Settings:** language, privacy, account controls.

## 9. AI Assistant (🤖)
- **Placement:** fixed bottom-right floating action button; never hidden.
- **Step 1 (menu):** options — 🎤 «СҮЙЛӨӨ», ✍️ «ЖАЗУУ».
- **Step 2:**
  - "Сүйлөө" → microphone capture UI (no chat thread).
  - "Жазуу" → right drawer chat panel: title "Heritago AI", greeting "Салам! Эмне жардам керек?", input field; FAB remains visible.
- **Behavior:** supports quick suggestions, provides keyboard shortcut, honors privacy settings.

## 10. Interaction & States
- Hover, active, focus, disabled states defined for buttons/links with ornamented focus ring.
- Empty states with cultural illustrations; loading skeletons for cards and lists.
- Error states with retry actions; success toasts for saves.

## 11. Responsive & Layout Rules
- **Desktop:** full sidebar + top bar; content max width 1280–1440px.
- **Tablet:** sidebar collapses to icons; top bar remains; drawers slide over content.
- **Mobile:** hamburger for sidebar; top bar compresses search into icon; drawers become full-screen sheets; carousels switch to single-row swipe.

## 12. Design System Snapshot
- **Colors:**
  - Base: #0F1419 (text), #F7F3ED (background)
  - Accents: #B6282A (deep red), #0F8A8A (teal), #CDA349 (gold)
  - Surfaces: #FFFFFF, #F0E7DB overlays with ornament textures
- **Spacing:** 4px base scale; common paddings 16/24/32px.
- **Elevation:** shadow tokens for top bar and drawers; blur background on overlays.
- **Components:** primary/secondary buttons, icon buttons, cards (media + meta + CTA), tabs, chips, drawers, progress bars, tooltips, modals, toasts.

## 13. Content Management Notes
- All navigation labels and CTAs localized; language switch in settings and sidebar.
- CMS-friendly card data: title, subtitle, type, difficulty, duration, tags, thumbnail.
- Accessibility metadata: `aria-label` on sidebar icons, landmarks (`header`, `nav`, `main`, `aside`).

## 14. Delivery Checklist
- ✅ Top bar, sidebar, content region, AI FAB present on every page.
- ✅ Home hero + featured + popular carousel + mission quote implemented.
- ✅ All category pages share the card grid template and specified items.
- ✅ Drawers for chat, rating, and AI chat are responsive and accessible.
- ✅ Ethno ornament overlays applied subtly (10–15% opacity) to hero and key surfaces.
- ✅ Localization ready (Cyrillic first), with strong keyboard navigation and focus visibility.

