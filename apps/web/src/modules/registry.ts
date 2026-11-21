import { House } from "lucide-react";
import { fuelModule } from "./fuel/module";
import type { ModuleDefinition } from "./types";

// Every module, in menu order. Adding a module: one import and one entry here.
export const MODULES = [fuelModule] as const satisfies readonly ModuleDefinition[];

export type ModuleId = (typeof MODULES)[number]["id"];

/** Home is core, not a module, but sits first in the menu. */
const HOME: ModuleDefinition = {
  id: "home",
  name: "Home",
  href: "/",
  icon: House,
  summary: "Dashboard",
};

export const MENU_ITEMS: readonly ModuleDefinition[] = [HOME, ...MODULES];
