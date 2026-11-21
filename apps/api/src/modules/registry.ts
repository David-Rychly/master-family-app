import type { Router } from "express";
import { fuelRouter } from "./fuel/router";

// Every module's router, mounted at /api/<id>. Adding a module: one import and one entry here.
export const MODULE_ROUTERS: readonly { id: string; router: Router }[] = [
  { id: "fuel", router: fuelRouter },
];
