import type { RequestHandler } from "express";
import { BrowserCheckError } from "./scraper";
import { fuelService } from "./service";

/**
 * Daily price fetch, called by Vercel Cron (see apps/api/vercel.json) with GET and
 * `Authorization: Bearer $CRON_SECRET`. Without CRON_SECRET set, only local development may call it.
 */
export const fetchPricesJob: RequestHandler = async (req, res) => {
  const secret = process.env.CRON_SECRET;
  const allowed = secret
    ? req.headers.authorization === `Bearer ${secret}`
    : process.env.NODE_ENV !== "production";
  if (!allowed) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    res.json(await fuelService.fetchAndStorePrices());
  } catch (err) {
    // The price site refused us: say so plainly in the cron log instead of a generic 500.
    if (err instanceof BrowserCheckError) {
      console.error(err.message);
      res.status(502).json({ error: err.message });
      return;
    }
    throw err;
  }
};
