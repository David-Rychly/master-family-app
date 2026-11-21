import { doublePrecision, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Every fetched price, one row per station per fetch.
 * Column names come from the keys via `casing: "snake_case"` (stationId -> station_id).
 */
export const fuelPrices = pgTable("fuel_prices", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  stationId: text().notNull(),
  name: text().notNull(),
  city: text().notNull(),
  street: text().notNull(),
  /** Metres from home; null when the station was read from its own page. */
  distance: integer(),
  price: doublePrecision().notNull(),
  /** When the fetch that recorded this price ran. */
  updatedAt: timestamp({ withTimezone: true }).notNull(),
});
