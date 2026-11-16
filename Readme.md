# Master Family App

Monorepo for the family app: a Next.js frontend (installable as a PWA on phones) and an Express API.

## Layout

```
apps/
  web/        Next.js (App Router) frontend + PWA manifest
  api/        Express API (routes -> services -> data repositories)
  storybook/  Storybook: every component and state in one place
packages/
  ui/         design system: tokens, theme, shadcn/ui base components, states
  shared/     zod schemas + TS types shared by web and api (the API contract)
  config/     shared tsconfig presets and the color lint rule
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

Other commands: `pnpm storybook`, `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm format`.
Run a single app: `pnpm --filter api dev` or `pnpm --filter web dev`.

## Design system

Three layers, see the [Family App Design System](https://claude.ai/artifact/AtwDRxCHmA9gqFVSPqZ1Nq) for the visual reference:

1. **Tokens**: `packages/ui/tokens.json` is the source of truth (a copy of the design system's tokens). `pnpm --filter @repo/ui build:theme` generates `src/styles/theme.css` (CSS variables per color scheme, shadcn variable mapping, Tailwind theme, `type-*` text styles) and `src/lib/schemes.ts`. Never edit those two by hand.
2. **Base components**: shadcn/ui in `packages/ui/src/components`, restyled to the tokens. Add more with `pnpm dlx shadcn@latest add <name>` run inside `packages/ui`, then replace the `cn` import with `@repo/ui/lib/utils` if the CLI gets it wrong.
3. **App components**: composed in `apps/web/src/components` (dashboard cards, full-page menu, scheme picker).

Every component has a story next to it (`*.stories.tsx`). Run `pnpm storybook` and open http://localhost:6006; the toolbar switches the color scheme.

The app is dark only. The user picks a color scheme (Tide, Ember, Moss, Berry); it is stored in the `scheme` cookie and applied by an inline script before first paint.

## API (mock data for now)

- `GET /health`
- `GET /api/family/members`
- `POST /api/family/members` with `{ "name": "Ann", "role": "child" }`

## Roadmap

1. Database: Drizzle ORM in `packages/db`, local Postgres (`infra/docker-compose.yml`), then Neon.
2. Authentication.
3. Move the API from Express to NestJS.
4. PWA offline support and push notifications.
