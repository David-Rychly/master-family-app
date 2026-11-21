import { Router } from "express";
import { fetchPricesJob } from "./jobs";
import { fuelService } from "./service";

// Mounted at /api/fuel.
export const fuelRouter = Router();

/** The newest price at each station. */
fuelRouter.get("/prices/latest", async (_req, res) => {
  res.json(await fuelService.listLatest());
});

/** Every price ever stored. */
fuelRouter.get("/prices", async (_req, res) => {
  res.json(await fuelService.listHistory());
});

fuelRouter.get("/jobs/fetch-prices", fetchPricesJob);
