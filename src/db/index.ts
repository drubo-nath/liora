import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * postgres.js over Neon's pooled connection string.
 *
 * Chosen over the Neon HTTP/WebSocket drivers on purpose:
 *  - real transaction support (`db.transaction`)
 *  - works against ANY Postgres (local, Neon, RDS) with zero code changes
 *  - Next.js server components/actions run in the Node runtime, where a
 *    small connection pool is the right tool
 */
const url = process.env.DATABASE_URL;

export const isDbConfigured = Boolean(url);

if (!isDbConfigured) {
  console.warn(
    "[db] DATABASE_URL is not set — serving seed fallback data. " +
      "Copy .env.example to .env.local and paste your Neon connection string.",
  );
}

// Lazy: don't open a pool when unconfigured (build/prerender safety).
const client = url
  ? postgres(url, { prepare: false, max: 5 })
  : (null as unknown as ReturnType<typeof postgres>);

export const db = drizzle(client, { schema });
export { schema };
