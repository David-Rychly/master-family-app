import type { ReactNode } from "react"
import { cn } from "@repo/ui/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn("animate-pulse rounded-sm bg-secondary motion-reduce:animate-none", className)}
      {...props}
    />
  )
}

/**
 * Wraps any skeleton. Announces loading to screen readers and fades the skeleton in only after
 * 300ms, so fast loads never flash a placeholder.
 */
function Loading({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("animate-in fade-in-0 fill-mode-backwards delay-300 duration-300", className)}
    >
      <span className="sr-only">{label}</span>
      {children}
    </div>
  )
}

// Varied widths so rows read as text, not as a grid of bars.
const ROW_WIDTHS = ["w-3/4", "w-1/2", "w-2/3", "w-5/12", "w-3/5"]

/** Rows shaped like a ListRow: leading slot, title and meta line. */
function SkeletonRows({ rows = 3, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-3 border-t py-3.5 first:border-t-0">
          <Skeleton className="h-4 w-11 shrink-0" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className={cn("h-4", ROW_WIDTHS[i % ROW_WIDTHS.length])} />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

/** Card-shaped placeholder: eyebrow, headline figure, then rows. */
function SkeletonCard({ rows = 3, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-4 rounded-lg border bg-card p-6", className)}>
      <Skeleton className="h-3 w-24" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-3 w-40" />
      </div>
      {rows > 0 ? <SkeletonRows rows={rows} /> : null}
    </div>
  )
}

/** Placeholder for a page title block: eyebrow and heading. */
function SkeletonHeading({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-10 w-72 max-w-full sm:h-14 sm:w-[28rem]" />
    </div>
  )
}

export { Skeleton, Loading, SkeletonRows, SkeletonCard, SkeletonHeading }
