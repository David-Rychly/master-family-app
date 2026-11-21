import { Suspense, type ReactNode } from "react";
import { SkeletonCard } from "@repo/ui/components/skeleton";
import { FuelCard } from "@/components/dashboard/cards";
import { Greeting, TodayDate } from "@/components/shell/greeting";
import { CardBoundary } from "@/components/states/card-boundary";
import { fetchGasStations } from "@/lib/api";
import { currentMember } from "@/lib/mock-dashboard";

// Real data from the old backend, fetched per request and streamed into its slot.
async function LatestFuel() {
  const stations = await fetchGasStations();
  return <FuelCard stations={stations} now={new Date()} />;
}

/** Each card loads and fails on its own, so one slow or broken module never blanks the dashboard. */
function CardSlot({ label, module, rows = 2, className, children }: {
  label: string;
  module: string;
  rows?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <CardBoundary label={label} title={`Couldn't load ${module}`} className={className}>
      <Suspense fallback={<SkeletonCard rows={rows} className={className} />}>{children}</Suspense>
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
        <CardSlot label="Fuel prices" module="fuel prices" rows={3}>
          <LatestFuel />
        </CardSlot>
      </div>
    </>
  );
}
