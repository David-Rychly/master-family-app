import { Fuel, House, type LucideIcon } from "lucide-react";

export type ModuleId = "home" | "fuel";

export type AppModule = {
  id: ModuleId;
  name: string;
  href: string;
  icon: LucideIcon;
};

// Fixed order of modules in the full-page menu. One icon per module, used everywhere.
export const MODULES: AppModule[] = [
  { id: "home", name: "Home", href: "/", icon: House },
  { id: "fuel", name: "Fuel prices", href: "/fuel", icon: Fuel },
];

export function findModule(id: string) {
  return MODULES.find((m) => m.id === id);
}
