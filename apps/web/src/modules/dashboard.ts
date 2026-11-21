import "server-only";
import { fuelDashboardCard } from "./fuel/dashboard-card";
import type { DashboardCard } from "./types";

// Dashboard cards, in order. Kept apart from registry.ts because cards fetch on the server
// and the registry is also read by the menu in the browser.
export const DASHBOARD_CARDS: readonly DashboardCard[] = [fuelDashboardCard];
