# Master Family App

Monorepo for the family app: a Next.js frontend (installable as a PWA on phones) and an Express API.

## Layout

```
apps/
  web/        Next.js (App Router) frontend + PWA manifest
  api/        Express API (routes -> services -> data repositories)
packages/
  shared/     zod schemas + TS types shared by web and api (the API contract)
  config/     shared tsconfig presets
infra/        local infrastructure (docker-compose Postgres), deploy configs
.github/      CI
```

Rules:
- Infrastructure lives in `infra/`, `packages/config` and `.github/`. Features live in `apps/*` and `packages/shared`.
- Apps depend on packages, never the other way round.
- API routes stay thin. Business logic lives in `services/` and data access in `data/`, so the API can move to NestJS later and the mock data can be swapped for Drizzle.

## Getting started

Requires Node 22+ and pnpm 10 (`npm i -g pnpm`).

```sh
pnpm install
cp .env.example .env
pnpm dev          # web on http://localhost:3000, api on http://localhost:4000
```

Other commands: `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm format`.
Run a single app: `pnpm --filter api dev` or `pnpm --filter web dev`.

## API (mock data for now)

- `GET /health`
- `GET /api/family/members`
- `POST /api/family/members` with `{ "name": "Ann", "role": "child" }`

## Roadmap

1. Database: Drizzle ORM in `packages/db`, local Postgres (`infra/docker-compose.yml`), then Neon.
2. Authentication.
3. Move the API from Express to NestJS.
4. PWA offline support and push notifications.
