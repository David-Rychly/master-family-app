import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// One database connection for the whole API, created on first use so the API (and /health) still starts
// without DATABASE_URL. Neon connection strings work as they are (they carry sslmode=require).

let db: PostgresJsDatabase | undefined;

export function getDb(): PostgresJsDatabase {
  if (db) return db;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set. Add it to the .env file in the repo root.");
  // A small pool: on Vercel each function instance holds its own connections.
  db = drizzle({ client: postgres(url, { max: 5 }), casing: "snake_case" });
  return db;
}
