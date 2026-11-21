import type { GasStation } from "@repo/shared";

// Prices are collected around Prague, so dates and times are shown there whatever time zone the server runs in.
const TIME_ZONE = "Europe/Prague";

const priceFormat = new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK" });
const updatedFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
const dayLabelFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});
// en-CA formats as YYYY-MM-DD, which sorts as text.
const dayKeyFormat = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE });

export const formatPrice = (price: number) => priceFormat.format(price);
export const formatUpdated = (iso: string) => updatedFormat.format(new Date(iso));
export const formatDistance = (metres: number) =>
  metres < 1000 ? `${metres} m` : `${(metres / 1000).toFixed(1)} km`;

/** Latest prices, cheapest first. */
export function sortByPrice(stations: GasStation[]) {
  return [...stations].sort((a, b) => a.price - b.price);
}

/** Newest update across all stations, as an ISO string. */
export function lastUpdate(stations: GasStation[]) {
  return stations.reduce((latest, s) => (s.updated_at > latest ? s.updated_at : latest), "");
}

const dayMonthFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  day: "numeric",
  month: "short",
});
export const formatDayMonth = (iso: string) => dayMonthFormat.format(new Date(iso));

const DAY_AND_A_HALF = 36 * 60 * 60 * 1000;

/** Prices are fetched every morning, so anything older than a day and a half means the update stopped. */
export function isStale(updatedAt: string, now: Date) {
  return now.getTime() - new Date(updatedAt).getTime() > DAY_AND_A_HALF;
}

/**
 * Splits the latest prices into stations seen in the newest morning update and stations that dropped out
 * (the API keeps returning a station's last known price forever). Both lists are cheapest first.
 */
export function splitCurrent(stations: GasStation[]) {
  const newest = lastUpdate(stations);
  const current: GasStation[] = [];
  const outdated: GasStation[] = [];
  for (const s of sortByPrice(stations)) {
    (isStale(s.updated_at, new Date(newest)) ? outdated : current).push(s);
  }
  return { current, outdated };
}

export type PriceHistory = {
  stations: { id: string; name: string }[];
  /** Newest day first. A station missing from a day has no price that day. */
  days: { key: string; label: string; prices: Record<string, number> }[];
};

/** Turns every price ever recorded into one row per day, keeping each station's last price of that day. */
export function toDailyPrices(rows: GasStation[]): PriceHistory {
  const names = new Map<string, string>();
  const days = new Map<
    string,
    { label: string; prices: Record<string, number>; at: Record<string, string> }
  >();

  for (const row of rows) {
    names.set(row.station_id, row.name);
    const date = new Date(row.updated_at);
    const key = dayKeyFormat.format(date);
    let day = days.get(key);
    if (!day) {
      day = { label: dayLabelFormat.format(date), prices: {}, at: {} };
      days.set(key, day);
    }
    const seen = day.at[row.station_id];
    if (!seen || row.updated_at > seen) {
      day.prices[row.station_id] = row.price;
      day.at[row.station_id] = row.updated_at;
    }
  }

  return {
    stations: [...names]
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    days: [...days]
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([key, { label, prices }]) => ({ key, label, prices })),
  };
}
