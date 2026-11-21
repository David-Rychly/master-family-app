import type { GasStation } from "@repo/shared/fuel";
import type { FuelRepository } from "./repository";

// In-memory example data, two mornings of prices. Resets on every restart.
// Replaced by a Drizzle repository (table fuel_prices) once the database is set up.
const prices: GasStation[] = [
  {
    id: 1,
    stationId: "17216",
    name: "Orlen",
    price: 46.9,
    city: "Praha 5 - Barrandov",
    street: "K Barrandovu 6",
    distance: 0,
    updatedAt: "2026-11-20T06:00:03.000Z",
  },
  {
    id: 2,
    stationId: "17215",
    name: "OMV",
    price: 47.5,
    city: "Praha 5 - Barrandov",
    street: "K Barrandovu 10",
    distance: 1180,
    updatedAt: "2026-11-20T06:00:03.000Z",
  },
  {
    id: 3,
    stationId: "17062",
    name: "MOL",
    price: 46.9,
    city: "Praha 5 - Barrandov",
    street: "K Barrandovu",
    distance: 70,
    updatedAt: "2026-11-20T06:00:03.000Z",
  },
  {
    id: 4,
    stationId: "17216",
    name: "Orlen",
    price: 46.5,
    city: "Praha 5 - Barrandov",
    street: "K Barrandovu 6",
    distance: 0,
    updatedAt: "2026-11-21T06:00:03.000Z",
  },
  {
    id: 5,
    stationId: "17215",
    name: "OMV",
    price: 47.5,
    city: "Praha 5 - Barrandov",
    street: "K Barrandovu 10",
    distance: 1180,
    updatedAt: "2026-11-21T06:00:03.000Z",
  },
  {
    id: 6,
    stationId: "17062",
    name: "MOL",
    price: 46.9,
    city: "Praha 5 - Barrandov",
    street: "K Barrandovu",
    distance: 70,
    updatedAt: "2026-11-21T06:00:03.000Z",
  },
];

export const mockFuelRepository: FuelRepository = {
  async listAll() {
    return [...prices];
  },
  async listLatest() {
    const latest = new Map<string, GasStation>();
    for (const p of prices) {
      const seen = latest.get(p.stationId);
      if (!seen || p.updatedAt > seen.updatedAt) latest.set(p.stationId, p);
    }
    return [...latest.values()];
  },
  async insertMany(rows) {
    let id = Math.max(0, ...prices.map((p) => p.id));
    for (const row of rows) prices.push({ id: ++id, ...row });
    return rows.length;
  },
};
