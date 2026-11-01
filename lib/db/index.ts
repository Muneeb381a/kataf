import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let client: ReturnType<typeof drizzle<typeof schema>> | null = null;

/** Returns null when DATABASE_URL is not set (local dev without a database). */
export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!client) {
    // prepare:false keeps this compatible with pooled connections (Neon, Supabase, Vercel Postgres).
    client = drizzle(postgres(url, { max: 1, prepare: false }), { schema });
  }
  return client;
}

export { schema };
