import { z } from "zod";

/** One station's latest price, as the old Node API returns it from GET /gas-stations?latest=true. */
export const GasStation = z.object({
  id: z.number(),
  station_id: z.string(),
  name: z.string(),
  price: z.number(),
  city: z.string(),
  street: z.string(),
  /** Metres from home. */
  distance: z.number(),
  updated_at: z.string(),
});
export type GasStation = z.infer<typeof GasStation>;

export const GasStationList = z.array(GasStation);
