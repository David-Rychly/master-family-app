import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import { familyRouter } from "./core/family/router";
import { healthRouter } from "./core/health/router";
import { MODULE_ROUTERS } from "./modules/registry";

export function createApp() {
  const app = express();

  // Comma-separated list of allowed origins: the web app and, in development, Storybook.
  const origins = (process.env.CORS_ORIGIN ?? "http://localhost:3000,http://localhost:6006")
    .split(",")
    .map((o) => o.trim());
  app.use(cors({ origin: origins }));
  app.use(express.json());

  // Core: what every module builds on.
  app.use("/health", healthRouter);
  app.use("/api/family", familyRouter);

  // Modules: each owns /api/<id>.
  for (const { id, router } of MODULE_ROUTERS) app.use(`/api/${id}`, router);

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  };
  app.use(errorHandler);

  return app;
}
