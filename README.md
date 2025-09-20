# Prepwise AI

AI-powered job preparation platform to help you land offers faster. Practice realistic AI interviews, optimize your resume for ATS and recruiters, and prepare for technical questions — all in one place.

## Features

- **AI Interview Practice**
  - Real-time voice interaction with an adaptive AI interviewer
  - Personalized feedback on communication style and delivery
  - Industry-specific question banks and progress tracking

- **Smart Resume Analysis**
  - ATS compatibility scoring and optimization
  - Job description matching and keyword suggestions
  - Actionable recommendations with impact measurement

- **Technical Interview Prep**
  - Curated problems across difficulty levels and topics
  - AI-powered hints and explanations
  - Guidance to improve problem-solving approach

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript, React 19
- **Styling**: Tailwind CSS
- **Auth**: Clerk
- **Database**: PostgreSQL + Drizzle ORM
- **AI**: Google Gemini via `@ai-sdk/google`
- **Voice/Emotion**: Hume Voice
- **Security/Abuse Protection**: Arcjet

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values. Only variables in `.env.example` are required by the app.

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk publishable key (public)
- `CLERK_SECRET_KEY` — Clerk secret key (server)
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` — Sign in route (default: `/sign-in`)
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` — Redirect after sign in (default: `/app`)
- `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL` — Redirect after sign up (default: `/onboarding`)
- `ARCJET_KEY` — Arcjet key for bot/abuse protection
- `DATABASE_URL` — PostgreSQL connection string (e.g. `postgres://user:password@localhost:5432/dbname`)
- `HUME_API_KEY` — Hume API key
- `HUME_SECRET_KEY` — Hume API secret
- `NEXT_PUBLIC_HUME_CONFIG_ID` — Hume Voice configuration ID (public)
- `GEMINI_API_KEY` — Google Gemini API key
- `CLERK_WEBHOOK_SIGNING_SECRET` — Verifies incoming Clerk webhooks

Optional (for local Postgres via Docker Compose):
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` — Used by `docker-compose.yml` to spin up Postgres. If you use this, set `DATABASE_URL` to match these values.

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm, npm, or yarn
- PostgreSQL 14+ (local or hosted). Optionally use Docker (see below).

### 1) Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 2) Set up environment

Create and edit `.env.local` as described above.

### 3) Start a local database (optional via Docker)

If you want a local Postgres instance:

```bash
# Ensure DB_* env vars are set in your shell or an .env file Docker can read
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=postgres
# DB_PASSWORD=postgres
# DB_NAME=prepwise

docker compose up -d
```

Set `DATABASE_URL` accordingly, e.g.:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/prepwise
```

### 4) Run database migrations (Drizzle)

Drizzle is already configured in `drizzle.config.ts` to use `DATABASE_URL`.

```bash
# Generate SQL from schema (if needed)
npm run db:generate

# Push the schema to your DB
npm run db:push

# Apply generated migrations (if using migrations)
npm run db:migrate

# Optional: open Drizzle Studio
npm run db:studio
```

### 5) Start the dev server

```bash
npm run dev
```

Open http://localhost:3000.

## Important Routes

- `/` — Marketing landing page
- `/app` — Authenticated dashboard to manage job descriptions and start prep
- `/onboarding` — Onboarding flow after sign-up
- `/sign-in` — Sign-in page (handled by Clerk)

## Webhooks (Clerk)

If you configure Clerk webhooks, set `CLERK_WEBHOOK_SIGNING_SECRET` and point your webhook to your deployment, e.g. `https://your-domain.com/api/webhooks/clerk` (ensure you create the route if required by your setup).

## Deployment

- The app runs on any Node.js host. Vercel is recommended for Next.js.
- Set all environment variables in your hosting provider.
- Ensure your `DATABASE_URL` points to a managed PostgreSQL instance.

## Troubleshooting

- **Auth errors**: Check `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
- **DB connection issues**: Verify `DATABASE_URL` matches your DB and that the DB is reachable. If using Docker, confirm the container is healthy.
- **Hume/Gemini features not working**: Ensure `HUME_*`, `NEXT_PUBLIC_HUME_CONFIG_ID`, and `GEMINI_API_KEY` are set.
- **403/abuse protection**: Validate `ARCJET_KEY` configuration.

## Scripts

- `dev` — Start Next.js dev server (Turbopack)
- `build` — Build for production
- `start` — Start production server
- `lint` — Lint the project
- `db:generate` — Generate SQL from Drizzle schema
- `db:push` — Push schema to DB
- `db:migrate` — Apply migrations
- `db:studio` — Open Drizzle Studio

---

Built with ❤️ to help you prepare smarter and get hired faster.
