import "server-only";
import { z } from "zod";
import { GasStation } from "@repo/shared/fuel";

// The old Node backend still serves fuel prices until they move into apps/api.
const LEGACY_API_URL = process.env.LEGACY_API_URL ?? "https://be-node-orpin.vercel.app";

/**
 * The old API answers in snake_case. This adapter turns it into the camelCase contract, so nothing else in
 * the module knows about the old shape. Delete it once apps/api serves /api/fuel.
 */
const LegacyGasStationList = z.array(
  z
    .object({
      id: z.number(),
      station_id: z.string(),
      name: z.string(),
      price: z.number(),
      city: z.string(),
      street: z.string(),
      distance: z.number(),
      updated_at: z.string(),
    })
    .transform(({ station_id, updated_at, ...rest }) =>
      GasStation.parse({ ...rest, stationId: station_id, updatedAt: updated_at }),
    ),
);

async function getLegacy(path: string): Promise<GasStation[]> {
  const res = await fetch(`${LEGACY_API_URL}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return LegacyGasStationList.parse(await res.json());
}

/** The latest price at each station. */
export const fetchGasStations = () => getLegacy("/gas-stations?latest=true");

/** Every price ever recorded. The old API has no date filter, so this is the whole table. */
export const fetchGasPriceHistory = () => getLegacy("/gas-stations");
