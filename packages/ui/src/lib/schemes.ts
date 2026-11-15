// GENERATED from packages/ui/tokens.json by scripts/build-theme.mjs. Do not edit by hand.
export const SCHEMES = [
  {
    "id": "tide",
    "name": "Tide"
  },
  {
    "id": "ember",
    "name": "Ember"
  },
  {
    "id": "moss",
    "name": "Moss"
  },
  {
    "id": "berry",
    "name": "Berry"
  }
] as const;

export type SchemeId = (typeof SCHEMES)[number]["id"];

export const DEFAULT_SCHEME: SchemeId = "tide";

export const SCHEME_COOKIE = "scheme";

export function isSchemeId(value: unknown): value is SchemeId {
  return SCHEMES.some((s) => s.id === value);
}

// Runs in <head> before first paint: applies the saved scheme so there is no flash of the default colors.
export const SCHEME_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|; )${SCHEME_COOKIE}=([^;]*)/);var v=m&&decodeURIComponent(m[1]);if(v&&["tide","ember","moss","berry"].indexOf(v)>-1)document.documentElement.setAttribute("data-theme",v)}catch(e){}})()`;
