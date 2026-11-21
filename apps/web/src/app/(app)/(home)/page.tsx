import { Suspense, type ReactNode } from "react";
import { SkeletonCard } from "@repo/ui/components/skeleton";
import { Greeting, TodayDate } from "@/components/shell/greeting";
import { CardBoundary } from "@/components/states/card-boundary";
import { currentMember } from "@/core/mock-member";
import { DASHBOARD_CARDS } from "@/modules/dashboard";

/** Each card loads and fails on its own, so one slow or broken module never blanks the dashboard. */
function CardSlot({ label, rows, children }: { label: string; rows: number; children: ReactNode }) {
  return (
    <CardBoundary label={label} title={`Couldn't load ${label.toLowerCase()}`}>
      <Suspense fallback={<SkeletonCard rows={rows} />}>{children}</Suspense>
    </CardBoundary>
  );
}

export default function Dashboard() {
  return (
    <>
      <section className="flex flex-col gap-3">
        <span className="type-label text-subtle">
          <TodayDate />
        </span>
        <h1 className="type-display text-[44px] leading-[44px] tracking-[-0.035em] text-balance sm:text-[72px] sm:leading-[70px]">
          <Greeting name={currentMember.name} />
        </h1>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {DASHBOARD_CARDS.map(({ module, Card, skeletonRows }) => (
          <CardSlot key={module.id} label={module.name} rows={skeletonRows}>
            <Card />
          </CardSlot>
        ))}
      </div>
    </>
  );
}
