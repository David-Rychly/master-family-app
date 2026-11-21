"use client";

import { useState } from "react";
import { ChevronDown, History } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { EmptyState } from "@repo/ui/components/empty-state";
import { Loading, Skeleton } from "@repo/ui/components/skeleton";
import { formatPrice, type PriceHistory as PriceHistoryData } from "../lib";

const TITLE = "Price history";
const FIRST_PAGE = 14;
const PAGE = 30;

/** One row per day, one column per station. The day's cheapest price is in bold. */
export function PriceHistory({ history }: { history: PriceHistoryData }) {
  const [visible, setVisible] = useState(FIRST_PAGE);
  const { stations, days } = history;

  if (days.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{TITLE}</CardTitle>
        </CardHeader>
        <EmptyState
          icon={<History />}
          title="No history yet"
          description="Each morning's prices are kept here, day by day."
        />
      </Card>
    );
  }

  const shown = days.slice(0, visible);
  const older = days.length - shown.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{TITLE}</CardTitle>
        <CardDescription>
          {days.length === 1 ? "1 day" : `${days.length} days`} of prices, newest first.
        </CardDescription>
      </CardHeader>
      <div className="-mx-6 overflow-x-auto px-6">
        <table className="w-full text-left">
          <thead className="type-label text-subtle">
            <tr>
              <th scope="col" className="pr-4 pb-2 font-medium">
                Day
              </th>
              {stations.map((s) => (
                <th
                  key={s.id}
                  scope="col"
                  className="pb-2 pl-4 text-right font-medium whitespace-nowrap"
                >
                  {s.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((day) => {
              const cheapest = Math.min(...Object.values(day.prices));
              return (
                <tr key={day.key} className="border-t">
                  <th
                    scope="row"
                    className="py-2.5 pr-4 text-left font-normal whitespace-nowrap text-muted-foreground"
                  >
                    {day.label}
                  </th>
                  {stations.map((s) => {
                    const price = day.prices[s.id];
                    return (
                      <td key={s.id} className="py-2.5 pl-4 text-right whitespace-nowrap type-num">
                        {price === undefined ? (
                          <span className="text-subtle" aria-label="No price">
                            —
                          </span>
                        ) : price === cheapest ? (
                          <span className="font-semibold">{formatPrice(price)}</span>
                        ) : (
                          <span className="text-muted-foreground">{formatPrice(price)}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {older > 0 ? (
        <Button
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => setVisible((v) => v + PAGE)}
        >
          <ChevronDown />
          Show older days
        </Button>
      ) : null}
    </Card>
  );
}

/** Same shape as PriceHistory while it loads. */
export function PriceHistorySkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <Loading label="Loading price history">
      <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-40" />
        </div>
        <div className="flex flex-col">
          {Array.from({ length: rows }, (_, i) => (
            <div key={i} className="flex items-center gap-6 border-t py-3">
              <Skeleton className="h-4 w-24" />
              <div className="flex flex-1 justify-end gap-6">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="hidden h-4 w-16 sm:block" />
                <Skeleton className="hidden h-4 w-16 sm:block" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Loading>
  );
}
