import type { FetchPricesResult, GasStation } from "@repo/shared/fuel";
import { mockFuelRepository } from "./mock-repository";
import type { FuelRepository } from "./repository";
import { scrapeStations } from "./scraper";

export function createFuelService(repo: FuelRepository, scrape = scrapeStations) {
  return {
    listLatest(): Promise<GasStation[]> {
      return repo.listLatest();
    },
    listHistory(): Promise<GasStation[]> {
      return repo.listAll();
    },
    /** Reads today's prices and stores them, all with the same timestamp so they group as one update. */
    async fetchAndStorePrices(now = new Date()): Promise<FetchPricesResult> {
      const stations = await scrape();
      if (stations.length === 0) throw new Error("Scraper found no stations");
      const at = now.toISOString();
      const saved = await repo.insertMany(stations.map((s) => ({ ...s, updatedAt: at })));
      return { saved, at };
    },
  };
}

// Swap mockFuelRepository for a Drizzle-backed repository once the database exists.
export const fuelService = createFuelService(mockFuelRepository);
