import { createPool, type VercelPool } from "@vercel/postgres";

let pool: VercelPool | null = null;
const getPool = () => {
    if (!pool) {
        pool = createPool({
            connectionString:
                process.env.POSTGRES_URL ||
                process.env.DATABASE_URL ||
                process.env.POSTGRES_URL_NON_POOLING,
        });
    }
    return pool;
};

// lazy tagged-template proxy so the pool is only created when a query runs
// (avoids "missing_connection_string" at build time / on DB-less pages)
export const sql = (
    strings: TemplateStringsArray,
    ...values: unknown[]
) => getPool().sql(strings, ...(values as never[]));

let ready: Promise<void> | null = null;

export const ensureSchema = () => {
    if (!ready) {
        ready = (async () => {
            await sql`CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMPTZ DEFAULT now()
            )`;
            await sql`CREATE TABLE IF NOT EXISTS api_tokens (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                name TEXT NOT NULL,
                token_hash TEXT UNIQUE NOT NULL,
                prefix TEXT NOT NULL,
                created_at TIMESTAMPTZ DEFAULT now(),
                last_used_at TIMESTAMPTZ
            )`;
            await sql`CREATE TABLE IF NOT EXISTS favorites (
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                image_key TEXT NOT NULL,
                created_at TIMESTAMPTZ DEFAULT now(),
                PRIMARY KEY (user_id, image_key)
            )`;
        })().catch((e) => {
            ready = null;
            throw e;
        });
    }
    return ready;
};
