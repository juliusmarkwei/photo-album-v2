import { sql, ensureSchema } from "./db";

// global favorite counts per image (how many users favorited each)
export const getCounts = async (): Promise<Record<string, number>> => {
    await ensureSchema();
    const { rows } = await sql`
        SELECT image_key, COUNT(*)::int AS n FROM favorites GROUP BY image_key`;
    const counts: Record<string, number> = {};
    for (const r of rows) counts[r.image_key] = r.n;
    return counts;
};

export const getUserFavorites = async (userId: number): Promise<string[]> => {
    await ensureSchema();
    const { rows } = await sql`
        SELECT image_key FROM favorites WHERE user_id = ${userId}
        ORDER BY created_at DESC`;
    return rows.map((r) => r.image_key);
};

export const countFor = async (key: string): Promise<number> => {
    await ensureSchema();
    const { rows } = await sql`
        SELECT COUNT(*)::int AS n FROM favorites WHERE image_key = ${key}`;
    return rows[0]?.n ?? 0;
};
