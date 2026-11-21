import { Suspense } from "react";
import { FuelPrices, FuelPricesSkeleton } from "@/components/fuel/fuel-prices";
import { PriceHistory, PriceHistorySkeleton } from "@/components/fuel/price-history";
import { CardBoundary } from "@/components/states/card-boundary";
import { fetchGasPriceHistory, fetchGasStations } from "@/lib/api";
import { toDailyPrices } from "@/lib/fuel";
import { findModule } from "@/lib/modules";

export const metadata = { title: "Fuel prices · Family App" };

const appModule = findModule("fuel")!;

// Not cached: fetched on every request, so the page always shows the latest morning update.
async function LatestPrices() {
  const stations = await fetchGasStations();
  return <FuelPrices stations={stations} now={new Date()} />;
}

// Grouped by day on the server, so the browser gets one row per day instead of every raw price.
async function History() {
  const rows = await fetchGasPriceHistory();
  return <PriceHistory history={toDailyPrices(rows)} />;
}

export default function FuelPage() {
  const Icon = appModule.icon;

  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <span className="grid size-13 place-items-center rounded-md bg-primary-soft text-primary">
          <Icon className="size-6" strokeWidth={1.75} />
        </span>
        <h1 className="type-h1">{appModule.name}</h1>
      </div>

      <div className="flex max-w-4xl flex-col gap-6">
        <CardBoundary label="Latest prices" title="Couldn't load fuel prices">
          <Suspense fallback={<FuelPricesSkeleton />}>
            <LatestPrices />
          </Suspense>
        </CardBoundary>
        <CardBoundary label="Price history" title="Couldn't load older prices">
          <Suspense fallback={<PriceHistorySkeleton />}>
            <History />
          </Suspense>
        </CardBoundary>
      </div>
    </section>
  );
}
