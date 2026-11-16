import type { ReactNode } from "react";
import { CircleCheck } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

type EmptyStateProps = {
  /**
   * `start`: nothing here yet; explain what will appear and offer one action.
   * `done`: the list was emptied by finishing things; a calm confirmation, no action.
   */
  tone?: "start" | "done";
  /** `inline` sits inside a card; `page` fills a module page. */
  size?: "inline" | "page";
  /** Lucide icon element for `start` (the module's icon). `done` always shows a check. */
  icon?: ReactNode;
  title: string;
  description?: string;
  /** One primary action, usually a Button. Only for `start`. */
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ tone = "start", size = "inline", icon, title, description, action, className }: EmptyStateProps) {
  const page = size === "page";
  const done = tone === "done";

  return (
    <div
      data-slot="empty-state"
      data-tone={tone}
      className={cn(
        "flex flex-col items-start gap-3",
        page && "gap-4 rounded-lg border border-dashed border-input p-8 sm:p-10",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "grid shrink-0 place-items-center rounded-md bg-secondary text-muted-foreground [&_svg]:stroke-[1.75]",
          page ? "size-14 [&_svg]:size-6" : "size-10 [&_svg]:size-5",
          done && "text-success",
        )}
      >
        {done ? <CircleCheck /> : icon}
      </span>
      <div className="flex flex-col gap-1">
        <p className={cn(page ? "type-h2" : "type-body-strong")}>{title}</p>
        {description ? (
          <p className={cn("max-w-[48ch] text-muted-foreground", page ? "type-body" : "type-small")}>{description}</p>
        ) : null}
      </div>
      {!done && action ? <div className={cn(page ? "pt-2" : "pt-1")}>{action}</div> : null}
    </div>
  );
}
