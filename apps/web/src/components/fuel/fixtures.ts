// Example data for stories, in the shape the old API returns.
import type { GasStation } from "@repo/shared";

/** "Now" for stories: shortly after the morning update. */
export const storyNow = new Date("2026-11-21T09:30:00Z");

export const latestStations: GasStation[] = [
  {
    id: 2668,
    station_id: "17062",
    name: "MOL",
    price: 46.9,
    city: "Praha 5 - Barrandov",
    street: "K Barrandovu",
    distance: 70,
    updated_at: "2026-11-21T06:00:03.471Z",
  },
  {
    id: 2667,
    station_id: "17215",
    name: "OMV",
    price: 47.5,
    city: "Praha 5 - Barrandov",
    street: "K Barrandovu 10",
    distance: 1180,
    updated_at: "2026-11-21T06:00:03.471Z",
  },
  {
    id: 2666,
    station_id: "17216",
    name: "Orlen",
    price: 46.5,
    city: "Praha 5 - Barrandov",
    street: "K Barrandovu 6",
    distance: 0,
    updated_at: "2026-11-21T06:00:03.471Z",
  },
  {
    id: 2530,
    station_id: "18390",
    name: "Shell",
    price: 42.9,
    city: "Praha 5 - Hlubočepy",
    street: "Geologická",
    distance: 1460,
    updated_at: "2026-11-02T06:00:06.421Z",
  },
  {
    id: 2669,
    station_id: "19281",
    name: "Prim",
    price: 44.5,
    city: "Praha 5",
    street: "Slavínského",
    distance: 2300,
    updated_at: "2026-11-21T06:00:03.471Z",
  },
];

/** Raw history: one row per station per morning for the last `days` days, prices drifting a little each day. */
export function historyRows(days: number): GasStation[] {
  const rows: GasStation[] = [];
  let id = 1;
  for (let d = 0; d < days; d++) {
    const at = new Date(storyNow.getTime() - d * 24 * 60 * 60 * 1000);
    at.setUTCHours(6, 0, 3, 0);
    for (const [i, s] of latestStations.entries()) {
      // Shell stopped reporting a week ago, so older days show it and recent ones don't.
      if (s.name === "Shell" && d < 7) continue;
      const drift = Math.round(Math.sin(d / 3 + i) * 8) / 10;
      rows.push({
        ...s,
        id: id++,
        price: Math.round((s.price + drift) * 10) / 10,
        updated_at: at.toISOString(),
      });
    }
  }
  return rows;
}
