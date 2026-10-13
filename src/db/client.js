import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Database client (postgres.js + drizzle).
 *
 * One connection pool per server process. Vercel functions are short-lived
 * and may run many in parallel, so the pool is kept small (`max: 5`) and
 * idle connections are released quickly; Railway's Postgres has a modest
 * connection ceiling and every warm lambda would otherwise hold a slot.
 *
 * `prepare: false` because the connection may pass through a pooler that
 * does not support named prepared statements.
 *
 * The pool is memoised on `globalThis` so Next's dev-server hot reloads
 * do not open a fresh pool on every file change.
 */
function createPool() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return postgres(url, {
    max: 5,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
  });
}

const pool = globalThis.__arbPgPool ?? createPool();
if (process.env.NODE_ENV !== "production") globalThis.__arbPgPool = pool;

export const db = drizzle(pool, { schema });
