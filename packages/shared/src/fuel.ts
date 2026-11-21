import { z } from "zod";

/** One station's price at one moment. Latest prices are one of these per station. */
export const GasStation = z.object({
  id: z.number(),
  stationId: z.string(),
  name: z.string(),
  price: z.number(),
  city: z.string(),
  street: z.string(),
  /** Metres from home. Null when the station was read from its own page, which doesn't show a distance. */
  distance: z.number().nullable(),
  /** ISO timestamp of the fetch that recorded this price. */
  updatedAt: z.string(),
});
export type GasStation = z.infer<typeof GasStation>;

export const GasStationList = z.array(GasStation);

/** What the daily price fetch answers with. */
export const FetchPricesResult = z.object({
  saved: z.number(),
  at: z.string(),
});
export type FetchPricesResult = z.infer<typeof FetchPricesResult>;
