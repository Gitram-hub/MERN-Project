# Ai-CodeReviewer

A full-stack AI-assisted code review platform — backend (Node.js + Prisma) and frontend (Vite + React).

## Key features
- AI-powered code review and suggestions
- User authentication and profiles
- Project dashboard with review history
- API endpoints for submitting code and retrieving reviews

## Prerequisites
- Node.js 16+ and npm or yarn
- A relational database supported by Prisma (e.g. PostgreSQL)
- An OpenAI API key (or other AI provider key) if AI features are used

## Quick start (development)

1. Backend

```bash
cd Ai-CodeReviewer/backend
npm install
# copy or create .env with at least: DATABASE_URL, JWT_SECRET, OPENAI_API_KEY
npx prisma migrate dev --name init
# start server (check package.json for exact script name)
npm run dev
```

2. Frontend

```bash
cd Ai-CodeReviewer/frontend
npm install
# start the dev server (Vite)
npm run dev
```

Open the frontend dev URL (typically http://localhost:5173) and the backend API at its configured port.

## Environment variables
- `DATABASE_URL` — your database connection string
- `JWT_SECRET` — secret for signing auth tokens
- `OPENAI_API_KEY` — API key for AI service (if used)

## Project layout
- `backend/` — Express server, Prisma schema, controllers, services
- `frontend/` — Vite + React app, components, routes

## Deployment notes
- Use `prisma migrate deploy` on production for migrations
- Build the frontend with `npm run build` and serve statically
- Provide production-grade env vars and secrets via your hosting platform

## Troubleshooting
- If Prisma complains about migrations, run `npx prisma migrate resolve` or check `prisma/migrations`
- Check logs from backend (console) and frontend (Vite) for stack traces

## Contributing
Please open issues or PRs with clear reproduction steps. Add tests for backend logic where possible.

## License
Add a license file if this project will be shared publicly.
