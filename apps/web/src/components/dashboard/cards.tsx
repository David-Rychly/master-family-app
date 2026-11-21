import { Fuel } from "lucide-react";
import type { GasStation } from "@repo/shared";
import { EmptyState } from "@repo/ui/components/empty-state";
import { UpdatedNote } from "@/components/fuel/updated-note";
import { formatDistance, formatPrice, lastUpdate, splitCurrent } from "@/lib/fuel";
import { StatCard, StatValue } from "./stat-card";

export function FuelCard({ stations, now }: { stations: GasStation[]; now: Date }) {
  if (stations.length === 0) {
    return (
      <StatCard label="Fuel prices" href="/fuel" linkLabel="Open Fuel prices">
        <EmptyState icon={<Fuel />} title="No prices yet" description="They show up here after the next morning update." />
      </StatCard>
    );
  }

  // Only stations from the latest update; a price left over from months ago would always look cheapest.
  const [cheapest, ...rest] = splitCurrent(stations).current;
  return (
    <StatCard label="Fuel prices" href="/fuel" linkLabel="Open Fuel prices">
      <StatValue
        value={<span className="text-primary">{formatPrice(cheapest.price)}</span>}
        meta={`Cheapest at ${cheapest.name}, ${formatDistance(cheapest.distance)} away`}
      />
      <ul className="flex flex-col">
        {rest.slice(0, 3).map((s) => (
          <li key={s.id} className="type-small flex justify-between gap-3 border-t py-2.5 first:border-t-0">
            <span className="truncate">{s.name}</span>
            <span className="type-num text-muted-foreground">{formatPrice(s.price)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <UpdatedNote updatedAt={lastUpdate(stations)} now={now} />
      </div>
    </StatCard>
  );
}
