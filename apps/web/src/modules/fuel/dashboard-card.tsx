import type { DashboardCard } from "../types";
import { fetchGasStations } from "./api";
import { FuelCard } from "./components/fuel-card";
import { fuelModule } from "./module";

// Fetches its own data; the dashboard wraps it in a CardSlot so it loads and fails on its own.
async function FuelDashboardCard() {
  const stations = await fetchGasStations();
  return <FuelCard stations={stations} now={new Date()} />;
}

export const fuelDashboardCard: DashboardCard = {
  module: fuelModule,
  Card: FuelDashboardCard,
  skeletonRows: 3,
};
