import "server-only";
import { GasStationList, type GasStation } from "@repo/shared/fuel";

// Read on the server only, so the browser never talks to the API directly.
const API_URL = process.env.API_URL ?? "http://localhost:4000";

async function get(path: string): Promise<GasStation[]> {
  const res = await fetch(`${API_URL}/api/fuel${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return GasStationList.parse(await res.json());
}

/** The latest price at each station. */
export const fetchGasStations = () => get("/prices/latest");

/** Every price ever recorded. */
export const fetchGasPriceHistory = () => get("/prices");
