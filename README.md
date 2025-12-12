# Web Learning Hub

A lightweight web app that teaches HTML, CSS, JavaScript, Internet fundamentals, and API basics. It uses an Express API with a SQLite database to store topics and your completion rewards.

## Features
- Curated topic cards with quick explanations and practice checklists.
- Rewards for each completed topic stored in SQLite so progress survives restarts.
- Simple UI with progress stats and refresh controls.

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run a quick syntax check (optional):
   ```bash
   npm test
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open http://localhost:3000 in your browser to learn and track progress.

## Project structure
- `server.js` — Express server, database bootstrapping, and API routes.
- `public/` — Static assets (HTML, CSS, JS) for the learning experience.
- `data.db` — SQLite database file created at runtime (ignored by git).
