import { Clock, Fuel } from "lucide-react";
import type { GasStation } from "@repo/shared/fuel";
import { Badge } from "@repo/ui/components/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { EmptyState } from "@repo/ui/components/empty-state";
import { Loading, Skeleton } from "@repo/ui/components/skeleton";
import { cn } from "@repo/ui/lib/utils";
import { formatDistance, formatPrice, formatUpdated, lastUpdate, splitCurrent } from "../lib";
import { UpdatedNote } from "./updated-note";

const TITLE = "Latest prices";

/** Latest price at each station near home, cheapest first. */
export function FuelPrices({ stations, now }: { stations: GasStation[]; now: Date }) {
  if (stations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{TITLE}</CardTitle>
        </CardHeader>
        <EmptyState
          icon={<Fuel />}
          title="No prices yet"
          description="They show up here after the next morning update."
        />
      </Card>
    );
  }

  // Stations that dropped out of the morning update go last, and can't be "Cheapest" with an old price.
  const { current, outdated } = splitCurrent(stations);
  const sorted = [...current, ...outdated];
  const cheapest = current[0]?.price;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{TITLE}</CardTitle>
        <CardDescription>
          <UpdatedNote updatedAt={lastUpdate(stations)} now={now} />
        </CardDescription>
      </CardHeader>
      <div className="-mx-6 overflow-x-auto px-6">
        <table className="w-full text-left">
          <thead className="type-label text-subtle">
            <tr>
              <th scope="col" className="pb-2 font-medium">
                Station
              </th>
              <th scope="col" className="hidden pb-2 font-medium sm:table-cell">
                Distance
              </th>
              <th scope="col" className="hidden pb-2 font-medium md:table-cell">
                Updated
              </th>
              <th scope="col" className="hidden pb-2 font-medium lg:table-cell">
                Station ID
              </th>
              <th scope="col" className="pb-2 text-right font-medium">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => {
              const old = outdated.includes(s);
              return (
                <tr key={s.id} className="border-t">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="type-body-strong">{s.name}</span>
                      {old ? (
                        <Badge>
                          <Clock />
                          Old price
                        </Badge>
                      ) : s.price === cheapest ? (
                        <Badge variant="primary">Cheapest</Badge>
                      ) : null}
                    </div>
                    <div className="type-small text-muted-foreground">
                      {s.street}, {s.city}
                      {s.distance !== null ? (
                        <span className="sm:hidden"> · {formatDistance(s.distance)}</span>
                      ) : null}
                    </div>
                  </td>
                  <td className="hidden py-3 pr-4 whitespace-nowrap text-muted-foreground type-num sm:table-cell">
                    {formatDistance(s.distance) ?? "—"}
                  </td>
                  <td className="hidden py-3 pr-4 whitespace-nowrap text-muted-foreground type-num md:table-cell">
                    {formatUpdated(s.updatedAt)}
                  </td>
                  <td className="hidden py-3 pr-4 text-muted-foreground type-num lg:table-cell">
                    {s.stationId}
                  </td>
                  <td
                    className={cn(
                      "py-3 text-right whitespace-nowrap type-num",
                      old && "text-subtle",
                    )}
                  >
                    {formatPrice(s.price)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/** Same shape as FuelPrices while the prices load. */
export function FuelPricesSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <Loading label="Loading fuel prices">
      <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-48" />
        </div>
        <div className="flex flex-col">
          {Array.from({ length: rows }, (_, i) => (
            <div key={i} className="flex items-center justify-between gap-4 border-t py-3.5">
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-48 max-w-full" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </Loading>
  );
}
