"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Settings, X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { currentMember } from "@/core/mock-member";
import { MENU_ITEMS } from "@/modules/registry";
import { Logo } from "./logo";
import { SchemePicker } from "./scheme-picker";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function FullPageMenu() {
  const pathname = usePathname();

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <Button variant="outline" className="has-[>svg]:pl-3.5 max-sm:size-11 max-sm:p-0" aria-label="Open menu">
          <Menu />
          <span className="max-sm:sr-only">Menu</span>
        </Button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 overflow-y-auto bg-background text-foreground outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-200"
        >
          <div className="mx-auto flex min-h-full max-w-7xl flex-col gap-8 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] sm:gap-12 sm:px-8 sm:pt-6">
            <header className="flex items-center justify-between gap-4">
              <Logo />
              <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
              <DialogPrimitive.Close asChild>
                <Button variant="outline" className="has-[>svg]:pl-3.5 max-sm:size-11 max-sm:p-0" aria-label="Close menu">
                  <X />
                  <span className="max-sm:sr-only">Close</span>
                </Button>
              </DialogPrimitive.Close>
            </header>

            <div className="flex flex-wrap items-start gap-12 lg:gap-16">
              <nav aria-label="Modules" className="flex min-w-0 flex-[999_1_560px] flex-col border-b">
                {MENU_ITEMS.map((module, index) => {
                  const active = isActive(pathname, module.href);
                  const Icon = module.icon;
                  return (
                    <DialogPrimitive.Close asChild key={module.id}>
                      <Link
                        href={module.href}
                        aria-current={active ? "page" : undefined}
                        style={{ "--row": index } as CSSProperties}
                        className="menu-row group flex items-center gap-4 border-t py-2.5 sm:gap-5 sm:py-3.5"
                      >
                        <span className="type-num hidden w-7 shrink-0 text-subtle sm:block">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "grid size-11 shrink-0 place-items-center rounded-md bg-surface-1 text-muted-foreground transition-colors group-hover:bg-primary-soft group-hover:text-primary sm:size-13",
                            active && "bg-primary-soft text-primary",
                          )}
                        >
                          <Icon className="size-[22px] sm:size-6" strokeWidth={1.75} />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:gap-4">
                          <span
                            className={cn(
                              "type-menu-item text-[28px] leading-8 transition-transform duration-200 group-hover:translate-x-1.5 motion-reduce:group-hover:translate-x-0 sm:flex-1 sm:text-[44px] sm:leading-[48px]",
                              active && "text-primary",
                            )}
                          >
                            {module.name}
                          </span>
                          <span className="type-small text-muted-foreground sm:text-right">
                            {module.summary}
                          </span>
                        </span>
                      </Link>
                    </DialogPrimitive.Close>
                  );
                })}
              </nav>

              <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-10 sm:pt-2">
                <section className="flex flex-col gap-4">
                  <h2 className="type-label text-subtle">Color scheme</h2>
                  <SchemePicker />
                  <p className="type-small text-muted-foreground">
                    Only changes the app for you. Everyone picks their own.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="type-label text-subtle">Signed in</h2>
                  <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
                    <Avatar className="size-10">
                      <AvatarFallback className="bg-primary-soft text-sm text-primary-strong">
                        {currentMember.initial}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold">{currentMember.name}</div>
                      <div className="type-small text-muted-foreground">{currentMember.role}</div>
                    </div>
                    <Button variant="ghost" size="sm" disabled title="Available once sign-in exists">
                      Switch
                    </Button>
                  </div>
                </section>

                <DialogPrimitive.Close asChild>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 rounded-md p-3 font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Settings className="size-5" strokeWidth={1.75} />
                    Settings
                  </Link>
                </DialogPrimitive.Close>
              </aside>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
