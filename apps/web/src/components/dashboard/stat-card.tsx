import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardAction, CardHeader, CardTitle } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";

// A dashboard card that summarises one module and links into it.
// One accent element per card: the key number, a progress fill, or the primary button.
export function StatCard({
  label,
  href,
  linkLabel,
  className,
  children,
}: {
  label: string;
  href: string;
  linkLabel: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardAction>
          <Link
            href={href}
            aria-label={linkLabel}
            className="-m-1 inline-flex rounded-sm p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ArrowUpRight className="size-5" strokeWidth={1.75} />
          </Link>
        </CardAction>
      </CardHeader>
      {children}
    </Card>
  );
}

export function StatValue({ value, meta, className }: { value: ReactNode; meta?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="type-stat">{value}</div>
      {meta ? <div className="type-small text-muted-foreground">{meta}</div> : null}
    </div>
  );
}
