"use client";

import type { ReactNode } from "react";
import { CircleAlert, RotateCw } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

type ErrorStateProps = {
  /** `inline` replaces one card's content; `page` replaces a whole page. */
  size?: "inline" | "page";
  /** Say what failed, from the user's side: "Couldn't load chores". */
  title: string;
  /** What to do about it. Defaults to a connection hint. */
  description?: string;
  /** Shows a Retry button. */
  onRetry?: () => void;
  retryLabel?: string;
  /** Extra action next to Retry, e.g. a "Back to home" link styled as a button. */
  secondaryAction?: ReactNode;
  className?: string;
};

export function ErrorState({
  size = "inline",
  title,
  description = "Check your connection and try again.",
  onRetry,
  retryLabel = "Try again",
  secondaryAction,
  className,
}: ErrorStateProps) {
  const page = size === "page";

  return (
    <div
      role="alert"
      data-slot="error-state"
      className={cn("flex flex-col items-start gap-3", page && "gap-4 py-8 sm:py-12", className)}
    >
      <span
        aria-hidden
        className={cn(
          "grid shrink-0 place-items-center rounded-md bg-secondary text-destructive [&_svg]:stroke-[1.75]",
          page ? "size-14 [&_svg]:size-6" : "size-10 [&_svg]:size-5",
        )}
      >
        <CircleAlert />
      </span>
      <div className="flex flex-col gap-1">
        <p className={cn(page ? "type-h2" : "type-body-strong")}>{title}</p>
        <p className={cn("max-w-[48ch] text-muted-foreground", page ? "type-body" : "type-small")}>{description}</p>
      </div>
      {onRetry || secondaryAction ? (
        <div className={cn("flex flex-wrap items-center gap-3", page ? "pt-2" : "pt-1")}>
          {onRetry ? (
            <Button variant={page ? "default" : "outline"} size={page ? "default" : "sm"} onClick={onRetry}>
              <RotateCw />
              {retryLabel}
            </Button>
          ) : null}
          {secondaryAction}
        </div>
      ) : null}
    </div>
  );
}
