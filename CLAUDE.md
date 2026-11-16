# Family App

pnpm + Turborepo monorepo: `apps/web` (Next.js PWA), `apps/api` (Express), `packages/ui` (design system), `packages/shared` (zod API contract). Layout and commands: `Readme.md`.

## Next.js

This is Next.js 16 with Cache Components, and its APIs differ from older versions. Before writing Next.js code, read the matching guide in `apps/web/node_modules/next/dist/docs/`. Known constraints here:
- Route segment config such as `dynamicParams` breaks the build. Leave it out.
- Keep the root layout static: per-user values (color scheme, greeting, date) are applied by inline scripts before first paint (see `components/shell/greeting.tsx`, `SCHEME_SCRIPT`), not read with `cookies()`.

## Design system

The visual source is the [Family App Design System](https://claude.ai/artifact/AtwDRxCHmA9gqFVSPqZ1Nq) (tokens, guidelines, component previews); screens are on the [Family App Screens](https://claude.ai/artifact/2cD9dKXCMMDcSfBpKwXR31) canvas. Read its README before designing a new screen or component.

Three layers, each with one home:
1. **Tokens**: `packages/ui/tokens.json`. To change a color, size or font, edit it, run `pnpm --filter @repo/ui build:theme`, and make the same change in the design system artifact so both stay in sync. `theme.css` and `schemes.ts` are generated.
2. **Base components**: shadcn/ui in `packages/ui/src/components`, restyled to the tokens. Add one by running `pnpm dlx shadcn@latest add <name>` inside `packages/ui`, then point its `cn` import at `@repo/ui/lib/utils` (the CLI resolves it to an unrelated npm package called `cn`).
3. **App components**: compose base components in `apps/web/src/components`. Anything used by one module stays in that module's folder.

Styling rules:
- Color with token classes only: `bg-background`, `bg-card`, `bg-secondary`, `bg-surface-3`, `text-foreground`, `text-muted-foreground`, `text-subtle`, `border`, `border-input`, `bg-primary` / `text-primary` (the user's scheme color), `bg-primary-soft` + `text-primary-strong` (tinted chips and selected states), `text-success` / `text-warning` / `text-destructive`.
- Set text with `type-*` utilities (`type-display`, `type-menu-item`, `type-h1`–`type-h3`, `type-small`, `type-label`, `type-stat`, `type-num`). Times, counts and amounts use `type-num` or `type-stat`.
- Radii: `rounded-sm` chips, `rounded-md` buttons and inputs, `rounded-lg` cards, `rounded-full` avatars. Spacing follows Tailwind's 4px scale.
- The app is dark only; the color scheme (Tide, Ember, Moss, Berry) is `data-theme` on `<html>`. An element that previews another scheme sets its own `data-theme` and reads `--fa-*` variables (see `scheme-picker.tsx`).
- One accent element per card. Status colors always come with an icon or a word.
- Icons: lucide-react, `strokeWidth={1.75}`. Each module's icon is defined once in `apps/web/src/lib/modules.ts`.
- Copy is sentence case, short and plain, written like a note to a family member.
- Every view that loads data has all three states: `Loading` + `Skeleton*` in the shape of the content (and a `loading.tsx` per route), `EmptyState` (`start` with one action, or `done`), and `ErrorState` sized to what failed. Dashboard cards go in a `CardSlot`, so each one loads and fails on its own.

## Storybook

Storybook (`apps/storybook`, `pnpm storybook` → http://localhost:6006) is the catalogue of every component and state. A component is finished only when it has a story:
- Put `<name>.stories.tsx` next to the component, in `packages/ui` or `apps/web`. Titles: `Base/…` for shadcn components, `States/…` for loading, empty and error, `App/…` for app components.
- Cover each variant and each state the component can show (loading, empty, error, disabled, invalid), with realistic family copy, not lorem ipsum.
- Pass data in as props so stories can show every state; a component that fetches its own data gets a story per state through its presentational part.
- Changing a component means updating its story in the same change. `pnpm --filter storybook build` must pass, and the a11y panel must stay clean.

## Data

- Dashboard data is example data in `apps/web/src/lib/mock-dashboard.ts` until the API serves it.
- API: routes stay thin; logic goes in `services/`, data access in `data/` repositories (mock now, Drizzle later), request and response shapes in `packages/shared`.
