import { defineConfig } from "drizzle-kit";

// DATABASE_URL lives in the root .env, like the rest of the API's settings.
try {
  process.loadEnvFile("../../.env");
} catch {
  // No .env file (CI, Vercel): the variable comes from the environment.
}

export default defineConfig({
  dialect: "postgresql",
  // Every module's tables, plus core tables once they exist.
  schema: ["./src/modules/*/schema.ts", "./src/core/**/schema.ts"],
  out: "./drizzle",
  casing: "snake_case",
  dbCredentials: { url: process.env.DATABASE_URL! },
});
