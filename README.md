# Online Clicker Race

A tiny real-time multiplayer clicker race built with Node.js, Express, and WebSockets. Players mash the **Click!** button to earn points before the timer runs out while watching everyone else's scores update live.

## Features
- WebSocket-powered real-time score syncing
- 30-second rounds with automatic restarts
- Leaderboard that highlights your player
- Toast announcing the winners at the end of each round
- Optional "Start new round" button when a game is idle

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. Open http://localhost:3000 in multiple browser tabs and click as fast as you can!

The server automatically restarts rounds a few seconds after one ends. If a round is idle, you can force-start it with the **Start new round** button.
