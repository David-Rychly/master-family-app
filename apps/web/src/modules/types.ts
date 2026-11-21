import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

/** What a module tells the rest of the app about itself. Lives in modules/<id>/module.ts; safe for the browser. */
export type ModuleDefinition = {
  /** The same id everywhere: folder, URL, API prefix, shared contract, table prefix. */
  id: string;
  name: string;
  href: string;
  icon: LucideIcon;
  /** One line under the name in the full-page menu. */
  summary: string;
};

/** A module's card on the dashboard. Lives in modules/<id>/dashboard-card.tsx; server only. */
export type DashboardCard = {
  module: ModuleDefinition;
  /** Async server component that fetches its own data. */
  Card: ComponentType;
  /** Rows in the loading skeleton, to match the card's shape. */
  skeletonRows: number;
};
