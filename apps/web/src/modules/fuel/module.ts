import { Fuel } from "lucide-react";
import type { ModuleDefinition } from "../types";

export const fuelModule = {
  id: "fuel",
  name: "Fuel prices",
  href: "/fuel",
  icon: Fuel,
  summary: "Latest prices nearby",
} as const satisfies ModuleDefinition;
