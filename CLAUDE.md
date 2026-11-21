# Family App

pnpm + Turborepo monorepo: `apps/web` (Next.js PWA), `apps/api` (Express), `packages/ui` (design system), `packages/shared` (zod API contract). Layout and commands: `Readme.md`.

## Next.js

This is Next.js 16 with Cache Components, and its APIs differ from older versions. Before writing Next.js code, read the matching guide in `apps/web/node_modules/next/dist/docs/`. Known constraints here:
- Route segment config such as `dynamicParams` breaks the build. Leave it out.
- Keep the root layout static: per-user values (color scheme, greeting, date) are applied by inline scripts before first paint (see `components/shell/greeting.tsx`, `SCHEME_SCRIPT`), not read with `cookies()`.
- Route files in `app/` are thin re-exports of a module's `page.tsx` / `loading.tsx` (see Modules). Route segment config, when needed, is written in the route file itself, since Next.js reads it there at build time.

## Modules

The app is a set of feature **modules** (`fuel`, …) built on a **core** (home, family and members, auth, health). Everything one module needs lives in that module's folder, in each app:

- `apps/web/src/modules/<id>/`: `module.ts` (name, href, icon, menu summary; browser-safe), `page.tsx` + `loading.tsx`, `dashboard-card.tsx` (async server component that fetches its own data), `api.ts` (server-only reads), `actions.ts` (server actions for writes), `lib.ts`, `components/` with their stories, fixtures and tests.
- `apps/api/src/modules/<id>/`: `router.ts` (mounted at `/api/<id>`), `service.ts`, `repository.ts` + its implementations, `jobs.ts` (scheduled work as GET routes for Vercel Cron, guarded by `CRON_SECRET`, scheduled in `apps/api/vercel.json`).
- `packages/shared/src/<id>.ts`: the module's request and response schemas, imported as `@repo/shared/<id>`.

Rules:
- One id everywhere: folder, URL, `/api/<id>`, `@repo/shared/<id>`, database table prefix `<id>_`.
- Modules are isolated: a module imports its own files, core, `src/components`, `src/lib`, `@repo/ui` and `@repo/shared`. Modules reach each other only through the API. ESLint (`no-restricted-imports` in `apps/web/eslint.config.mjs`) enforces this. Code a second module needs moves to `src/components` or `src/lib`.
- Inside a module, import its own files with relative paths.
- The rest of the app sees a module through its registries: `apps/web/src/modules/registry.ts` (menu, browser-safe), `apps/web/src/modules/dashboard.ts` (dashboard cards, server-only), `apps/api/src/modules/registry.ts` (routers). Adding a module means one entry in each registry it uses, plus `app/(app)/<id>/page.tsx` and `loading.tsx` re-exporting the module's files.
- Contracts are camelCase; the database is snake_case. Drizzle maps the two (`casing: "snake_case"`). An adapter for an old snake_case API stays inside the module's `api.ts`.
- Each module owns its tables. A module's tables may reference core tables (`member_id`), never another module's tables.

## Design system

The visual source is the [Family App Design System](https://claude.ai/artifact/AtwDRxCHmA9gqFVSPqZ1Nq) (tokens, guidelines, component previews); screens are on the [Family App Screens](https://claude.ai/artifact/2cD9dKXCMMDcSfBpKwXR31) canvas. Read its README before designing a new screen or component.

Three layers, each with one home:
1. **Tokens**: `packages/ui/tokens.json`. To change a color, size or font, edit it, run `pnpm --filter @repo/ui build:theme`, and make the same change in the design system artifact so both stay in sync. `theme.css` and `schemes.ts` are generated.
2. **Base components**: shadcn/ui in `packages/ui/src/components`, restyled to the tokens. Add one by running `pnpm dlx shadcn@latest add <name>` inside `packages/ui`, then point its `cn` import at `@repo/ui/lib/utils` (the CLI resolves it to an unrelated npm package called `cn`).
3. **App components**: compose base components. Shared ones (shell, states, `StatCard`) live in `apps/web/src/components`; a module's own live in `modules/<id>/components`.

Styling rules:
- Color with token classes only: `bg-background`, `bg-card`, `bg-secondary`, `bg-surface-3`, `text-foreground`, `text-muted-foreground`, `text-subtle`, `border`, `border-input`, `bg-primary` / `text-primary` (the user's scheme color), `bg-primary-soft` + `text-primary-strong` (tinted chips and selected states), `text-success` / `text-warning` / `text-destructive`.
- Set text with `type-*` utilities (`type-display`, `type-menu-item`, `type-h1`–`type-h3`, `type-small`, `type-label`, `type-stat`, `type-num`). Times, counts and amounts use `type-num` or `type-stat`.
- Radii: `rounded-sm` chips, `rounded-md` buttons and inputs, `rounded-lg` cards, `rounded-full` avatars. Spacing follows Tailwind's 4px scale.
- The app is dark only; the color scheme (Tide, Ember, Moss, Berry) is `data-theme` on `<html>`. An element that previews another scheme sets its own `data-theme` and reads `--fa-*` variables (see `scheme-picker.tsx`).
- One accent element per card. Status colors always come with an icon or a word.
- Icons: lucide-react, `strokeWidth={1.75}`. Each module's icon is defined once, in its `module.ts`.
- Copy is sentence case, short and plain, written like a note to a family member.
- Every view that loads data has all three states: `Loading` + `Skeleton*` in the shape of the content (and a `loading.tsx` per route), `EmptyState` (`start` with one action, or `done`), and `ErrorState` sized to what failed. Dashboard cards go in a `CardSlot`, so each one loads and fails on its own.

## Storybook

Storybook (`apps/storybook`, `pnpm storybook` → http://localhost:6006) is the catalogue of every component and state. A component is finished only when it has a story:
- Put `<name>.stories.tsx` next to the component, in `packages/ui` or `apps/web`. Titles: `Base/…` for shadcn components, `States/…` for loading, empty and error, `App/…` for shared app components, `<Module name>/…` (e.g. `Fuel/…`) for a module's components.
- Cover each variant and each state the component can show (loading, empty, error, disabled, invalid), with realistic family copy, not lorem ipsum.
- Pass data in as props so stories can show every state; a component that fetches its own data gets a story per state through its presentational part.
- Changing a component means updating its story in the same change. `pnpm --filter storybook build` must pass, and the a11y panel must stay clean.

## Data

- The signed-in member is example data in `apps/web/src/core/mock-member.ts` until auth exists.
- The API's database is Postgres on Neon through Drizzle and `postgres` (`apps/api/src/core/db.ts`, `DATABASE_URL` in the root `.env`).
- Schema changes go through migrations: edit a `schema.ts`, run `pnpm --filter api db:generate`, review the SQL in `apps/api/drizzle/`, then `pnpm --filter api db:migrate`.
- The web reads the API on the server only (`API_URL`, default `http://localhost:4000`); `pnpm dev` starts both.
- API: routers stay thin; logic goes in the service, data access in repositories (Drizzle for fuel, mock for core family until it gets tables).
- Copy is English; money and dates use Czech formats (CZK, Europe/Prague).
