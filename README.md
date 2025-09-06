# NeonAI Tools (static, client-side)

Futuristic AI tools knowledge base built with React + Vite + Tailwind. Uses LocalStorage for persistence so you can deploy to static hosts (Vercel, GitHub Pages).

## Features
- Add / Edit / Delete tools (admin)
- Favorites ⭐
- Search (Fuse.js fuzzy)
- Export / Import JSON
- Markdown rendering for descriptions
- Code highlighting (Prism)
- LocalStorage persistence

## Admin credentials (default)
- **username**: `admin`
- **password**: `ai-tools`

The password is stored as hashed value in localStorage on first run.

## Local dev
```bash
npm install
npm run dev
# open http://localhost:5173
