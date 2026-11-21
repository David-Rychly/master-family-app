import { Router } from "express";
import type { HealthResponse } from "@repo/shared/health";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  const body: HealthResponse = {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
  res.json(body);
});
