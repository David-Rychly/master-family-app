import type { GasStation } from "@repo/shared/fuel";

/** A price as the scraper finds it, before it is stored. */
export type NewGasPrice = Omit<GasStation, "id">;

export interface FuelRepository {
  /** Every stored price. */
  listAll(): Promise<GasStation[]>;
  /** The newest price per station. */
  listLatest(): Promise<GasStation[]>;
  insertMany(prices: NewGasPrice[]): Promise<number>;
}
