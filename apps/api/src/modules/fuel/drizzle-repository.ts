import { asc, desc } from "drizzle-orm";
import type { GasStation } from "@repo/shared/fuel";
import { getDb } from "../../core/db";
import type { FuelRepository } from "./repository";
import { fuelPrices } from "./schema";

type Row = typeof fuelPrices.$inferSelect;

function toGasStation(row: Row): GasStation {
  return { ...row, updatedAt: row.updatedAt.toISOString() };
}

export const drizzleFuelRepository: FuelRepository = {
  async listAll() {
    const rows = await getDb().select().from(fuelPrices).orderBy(asc(fuelPrices.updatedAt));
    return rows.map(toGasStation);
  },

  async listLatest() {
    // DISTINCT ON keeps the first row per station, so order each station's rows newest first.
    const rows = await getDb()
      .selectDistinctOn([fuelPrices.stationId])
      .from(fuelPrices)
      .orderBy(fuelPrices.stationId, desc(fuelPrices.updatedAt));
    return rows.map(toGasStation);
  },

  async insertMany(prices) {
    if (prices.length === 0) return 0;
    const inserted = await getDb()
      .insert(fuelPrices)
      .values(prices.map((p) => ({ ...p, updatedAt: new Date(p.updatedAt) })))
      .returning({ id: fuelPrices.id });
    return inserted.length;
  },
};
