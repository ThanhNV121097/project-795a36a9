# Architecture Overview — Todo List App v4

## Scope and shape

Project shape is fullstack: Next.js frontend, Go backend, PostgreSQL database. Product is single-page todo app with no login. Data persists task title, completion state, and ordering metadata only.

## Tech stack

- Frontend: Next.js 15 App Router, TypeScript, Tailwind CSS v3, ESLint.
- Backend: Go 1.22 module, `net/http`, `pgx` PostgreSQL driver.
- Database: PostgreSQL 16.
- Local run: `docker compose --profile local up --build` from repo root.
- CI: `.github/workflows/ci.yml` runs backend build/vet/test, frontend lint/build/test, and compose config validation.

## Folder structure

```text
code/
  backend/
    cmd/api/main.go              Go HTTP entry point
    migrations/                  Embedded SQL migrations
    go.mod                       Backend module
    .env.example                 Backend env documentation
  frontend/
    app/                         Next.js App Router pages and global styles
    next.config.js               Standalone output for Docker runtime
    package.json                 Frontend scripts and pinned dependencies
    .env.example                 Browser-visible API URL example
docs/
  architecture/overview.md       This document
```

## Component boundaries and data flow

1. Browser loads one App Router page from frontend.
2. Frontend calls backend through `NEXT_PUBLIC_API_URL`.
3. Backend owns validation, persistence, and JSON API responses.
4. Backend connects using `DATABASE_URL`, applies embedded migrations, verifies `SELECT 1`, then becomes healthy.
5. PostgreSQL stores todos. No auth tables, user tables, sessions, or profile data exist in this version.

## Backend conventions

- Entry point stays `code/backend/cmd/api/main.go`.
- Backend reads `DATABASE_URL`, then `PORT`, then `APP_PORT`, defaulting to `8080`.
- `/healthz` returns 200 only after migrations succeeded and database ping succeeds.
- SQL migrations are embedded from `code/backend/migrations/` and applied in filename order.
- `schema_migrations(version text primary key, applied_at timestamptz not null default now())` tracks applied migrations.
- Future handlers use `context.Context` from requests, parameterized SQL, JSON responses, and generic external errors.
- Todo title validation ceiling is 200 trimmed characters per SRS.

## Frontend conventions

- App Router files live under `code/frontend/app/`.
- `app/page.tsx` remains a Server Component unless it needs hooks or event handlers.
- Any component using `useState`, `useEffect`, event handlers, refs, or browser APIs must start with literal first line `"use client"`.
- React component files use `export default function ComponentName()`.
- Shared tokens and reusable base classes live in `app/globals.css`.
- Design colors: primary `#2563EB`, background `#F8FAFC`, surface `#FFFFFF`, success `#10B981`, error `#EF4444`.

## Environment variables

### Root `.env.example`

- `POSTGRES_USER` — local PostgreSQL user for compose.
- `POSTGRES_PASSWORD` — local PostgreSQL password for compose.
- `POSTGRES_DB` — local PostgreSQL database for compose.
- `BACKEND_PORT` — host port mapped to backend container port 8080.
- `FRONTEND_PORT` — host port mapped to frontend container port 3000.
- `NEXT_PUBLIC_API_URL` — browser-visible backend base URL.

### Backend `code/backend/.env.example`

- `DATABASE_URL` — PostgreSQL connection string injected by runtime or compose.
- `PORT` — HTTP listen port.
- `APP_PORT` — fallback HTTP listen port when `PORT` is absent.

### Frontend `code/frontend/.env.example`

- `NEXT_PUBLIC_API_URL` — backend API base URL available to browser code.

## How to run

```bash
cp .env.example .env
docker compose --profile local up --build
```

Frontend: `http://localhost:3000`.
Backend health: `http://localhost:8080/healthz`.

Local service checks without Docker:

```bash
cd code/backend && go build ./... && go vet ./... && go test ./...
cd code/frontend && npm ci && npm run lint && npm run build && npm test --if-present
```

## Key decisions

1. Use fullstack shape with PostgreSQL persistence.
   - Rejected static-only/localStorage: simpler, but fails SRS refresh persistence across server-backed storage expectation.
   - Rejected backend without database: cannot preserve tasks after runtime restart.
   - Tradeoff: more moving parts, but persistence behavior is explicit and testable.

2. Use Go `net/http` plus pgx.
   - Rejected web framework: no routing complexity yet; stdlib handles health and future small todo endpoints.
   - Rejected `database/sql` plus driver: pgx gives maintained PostgreSQL support with less adapter code.
   - Tradeoff: one external dependency for database access, no extra web dependency.

3. Self-migrate backend on boot.
   - Rejected manual migration step: runtime creates empty database and no other step applies schema.
   - Rejected frontend-triggered setup: mixes persistence concerns into UI and creates race conditions.
   - Tradeoff: boot can fail if migration fails, which is correct because app is not healthy without schema.

4. Keep `docker-compose.yml`, service Dockerfiles, and existing container workflows unchanged.
   - Rejected rewriting generated container files: higher risk of breaking known build context assumptions.
   - Tradeoff: compose uses existing `postgres` service name and local profile; run command includes `--profile local`.

5. Scaffold only shell UI, not todo product behavior.
   - Rejected implementing add/toggle/delete now: feature stories own behavior and tests.
   - Tradeoff: first feature still has real work, but baseline build stays small and stable.

## Risks and unknowns

- Deleted task recovery remains open product question; current architecture supports permanent delete only.
- No auth means all visitors share same task list unless later scope adds per-user identity.
- Compose local database uses default demo credentials; deployment must inject real `DATABASE_URL`.
