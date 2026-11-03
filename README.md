# Drifting Bottle — Connections Lab Project 2

## Run locally
1. Open this folder in VS Code.
2. Open Terminal > New Terminal.
3. Run: npm install
4. Put your ocean footage at public/assets/ocean.mp4
5. Run: npm start
6. Visit http://localhost:3000

## Core interaction
- WRITE A BOTTLE: submit an anonymous message.
- The server stores it in lowdb.
- Socket.io broadcasts the new bottle to all open browsers.
- Each stored message is represented by a floating light.
- CATCH A LIGHT: reads a randomly selected stored message.

## Files
- server.js — Express server, lowdb persistence, Socket.io
- public/index.html — page structure
- public/style.css — visual design
- public/client.js — browser interaction + Socket.io client
- data/db.json — stored messages
