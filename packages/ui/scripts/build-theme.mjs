// Generates src/styles/theme.css and src/lib/schemes.ts from tokens.json.
// tokens.json is a copy of the Family App Design System's tokens; edit it there, copy it here, then run `pnpm --filter @repo/ui build:theme`.
import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const tokens = JSON.parse(readFileSync(new URL("tokens.json", root), "utf8"));

const themes = tokens.color.themes;
const first = themes[0].id;
const colorValue = (token, theme) =>
  typeof token.value === "string" ? (theme === first ? token.value : undefined) : token.value[theme];

const lines = [];
const out = (s = "") => lines.push(s);

out("/* Family App theme. GENERATED from packages/ui/tokens.json by scripts/build-theme.mjs. Do not edit by hand. */");
out();
out("/* Layer 1: design tokens, one block per color scheme. The scheme is the data-theme attribute on <html>. */");
for (const theme of themes) {
  out(`${theme.id === first ? ":root, " : ""}[data-theme="${theme.id}"] {`);
  for (const token of tokens.color.tokens) {
    const v = colorValue(token, theme.id);
    if (v) out(`  --fa-${token.name}: ${v};`);
  }
  out("  color-scheme: dark;");
  out("}");
}
out();
out(":root {");
for (const s of tokens.shadow?.tokens ?? []) out(`  --fa-${s.name}: ${s.value};`);
out();
out("  /* shadcn/ui variables, mapped onto the tokens */");
const shadcn = {
  background: "bg",
  foreground: "text",
  card: "surface-1",
  "card-foreground": "text",
  popover: "surface-3",
  "popover-foreground": "text",
  primary: "accent",
  "primary-foreground": "on-accent",
  secondary: "surface-2",
  "secondary-foreground": "text",
  muted: "surface-2",
  "muted-foreground": "text-muted",
  accent: "surface-2",
  "accent-foreground": "text",
  destructive: "danger",
  border: "border",
  input: "border-strong",
  ring: "accent",
};
for (const [k, v] of Object.entries(shadcn)) out(`  --${k}: var(--fa-${v});`);
out("}");
out();

out("@theme inline {");
for (const k of Object.keys(shadcn)) out(`  --color-${k}: var(--${k});`);
const extra = {
  "surface-1": "surface-1",
  "surface-2": "surface-2",
  "surface-3": "surface-3",
  "border-strong": "border-strong",
  subtle: "text-subtle",
  "primary-strong": "accent-strong",
  "primary-soft": "accent-soft",
  success: "success",
  warning: "warning",
  danger: "danger",
  scrim: "scrim",
};
for (const [k, v] of Object.entries(extra)) out(`  --color-${k}: var(--fa-${v});`);
for (const r of tokens.radius.tokens) {
  if (r.name === "radius-full") continue;
  out(`  --${r.name}: ${r.value};`);
}
for (const s of tokens.shadow?.tokens ?? []) out(`  --${s.name.replace(/^shadow-/, "shadow-")}: var(--fa-${s.name});`);
out("  /* Font variables come from next/font in apps/web/src/app/layout.tsx */");
out("  --font-display: var(--font-familjen), " + tokens.type.families.display + ";");
out("  --font-sans: var(--font-onest), " + tokens.type.families.sans + ";");
out("  --font-mono: var(--font-geist-mono), " + tokens.type.families.mono + ";");
out("}");
out();

out("/* Type styles from the design system: use as `type-<name>`, e.g. `type-h1`, `type-label`. */");
for (const group of tokens.type.groups) {
  for (const s of group.styles) {
    const family = s.family ?? group.family;
    out(`@utility type-${s.name} {`);
    out(`  font-family: var(--font-${family});`);
    out(`  font-size: ${s.fontSize};`);
    out(`  line-height: ${s.lineHeight};`);
    out(`  font-weight: ${s.fontWeight};`);
    if (s.letterSpacing) out(`  letter-spacing: ${s.letterSpacing};`);
    if (s.name === "label") out("  text-transform: uppercase;");
    if (family === "mono") out("  font-variant-numeric: tabular-nums;");
    out("}");
  }
}
out();

writeFileSync(new URL("src/styles/theme.css", root), lines.join("\n"));

const schemes = `// GENERATED from packages/ui/tokens.json by scripts/build-theme.mjs. Do not edit by hand.
export const SCHEMES = ${JSON.stringify(themes.map((t) => ({ id: t.id, name: t.name })), null, 2)} as const;

export type SchemeId = (typeof SCHEMES)[number]["id"];

export const DEFAULT_SCHEME: SchemeId = ${JSON.stringify(first)};

export const SCHEME_COOKIE = "scheme";

export function isSchemeId(value: unknown): value is SchemeId {
  return SCHEMES.some((s) => s.id === value);
}

// Runs in <head> before first paint: applies the saved scheme so there is no flash of the default colors.
export const SCHEME_SCRIPT = \`(function(){try{var m=document.cookie.match(/(?:^|; )\${SCHEME_COOKIE}=([^;]*)/);var v=m&&decodeURIComponent(m[1]);if(v&&${JSON.stringify(themes.map((t) => t.id))}.indexOf(v)>-1)document.documentElement.setAttribute("data-theme",v)}catch(e){}})()\`;
`;
writeFileSync(new URL("src/lib/schemes.ts", root), schemes);

console.log(`theme.css and schemes.ts written (${themes.length} schemes, ${tokens.color.tokens.length} colors)`);
