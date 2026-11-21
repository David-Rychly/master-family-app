import { Loading, Skeleton } from "@repo/ui/components/skeleton";
import { FuelPricesSkeleton } from "./components/fuel-prices";
import { PriceHistorySkeleton } from "./components/price-history";

// Shown while the fuel page loads.
export default function FuelLoading() {
  return (
    <div className="flex flex-col gap-8">
      <Loading label="Loading" className="flex items-center gap-4">
        <Skeleton className="size-13 rounded-md" />
        <Skeleton className="h-9 w-48" />
      </Loading>
      <div className="flex max-w-4xl flex-col gap-6">
        <FuelPricesSkeleton />
        <PriceHistorySkeleton />
      </div>
    </div>
  );
}
