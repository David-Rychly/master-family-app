import { GasStationList, type GasStation } from "@repo/shared";

// The old Node backend still serves fuel prices until that endpoint moves into apps/api.
const LEGACY_API_URL = process.env.LEGACY_API_URL ?? "https://be-node-orpin.vercel.app";

export async function fetchGasStations(): Promise<GasStation[]> {
  const res = await fetch(`${LEGACY_API_URL}/gas-stations?latest=true`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return GasStationList.parse(await res.json());
}

/** Every price ever recorded. The old API has no date filter, so this is the whole table. */
export async function fetchGasPriceHistory(): Promise<GasStation[]> {
  const res = await fetch(`${LEGACY_API_URL}/gas-stations`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return GasStationList.parse(await res.json());
}
