"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@repo/ui/lib/utils";
import { DEFAULT_SCHEME, SCHEMES, SCHEME_COOKIE, isSchemeId, type SchemeId } from "@repo/ui/schemes";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getScheme(): SchemeId {
  const value = document.documentElement.dataset.theme;
  return isSchemeId(value) ? value : DEFAULT_SCHEME;
}

function setScheme(id: SchemeId) {
  document.documentElement.dataset.theme = id;
  document.cookie = `${SCHEME_COOKIE}=${id}; path=/; max-age=31536000; samesite=lax`;
}

export function useScheme() {
  return useSyncExternalStore(subscribe, getScheme, () => DEFAULT_SCHEME);
}

export function SchemePicker({ size = "default", className }: { size?: "default" | "sm"; className?: string }) {
  const current = useScheme();
  const small = size === "sm";

  return (
    <div role="group" aria-label="Color scheme" className={cn("flex flex-wrap gap-4", small && "gap-1", className)}>
      {SCHEMES.map((scheme) => {
        const selected = scheme.id === current;
        return (
          <button
            key={scheme.id}
            type="button"
            // The button renders in its own scheme, so the swatch shows that scheme's colors.
            data-theme={scheme.id}
            aria-pressed={selected}
            aria-label={small ? scheme.name : undefined}
            onClick={() => setScheme(scheme.id)}
            className={cn(
              "group flex cursor-pointer flex-col items-center gap-2 rounded-md p-1 text-[13px] leading-[18px] font-medium text-muted-foreground",
              selected && "text-foreground",
              small && "size-11 justify-center p-0",
            )}
          >
            <span
              className={cn(
                "grid place-items-center rounded-full border border-[var(--fa-border)] bg-[var(--fa-bg)] outline-2 outline-offset-3 outline-transparent transition-colors group-hover:border-[var(--fa-border-strong)]",
                small ? "size-7 outline-offset-2" : "size-14",
                selected && "outline-[var(--fa-accent)]",
              )}
            >
              <span className={cn("rounded-full bg-[var(--fa-accent)]", small ? "size-3.5" : "size-7")} />
            </span>
            {!small && scheme.name}
          </button>
        );
      })}
    </div>
  );
}
