import { NextResponse } from "next/server";
import { sql, ensureSchema } from "@/app/utils/db";
import { getUserId } from "@/app/utils/auth";

export const GET = async () => {
    try {
        const userId = await getUserId();
        if (!userId) return NextResponse.json({ user: null });

        await ensureSchema();
        const { rows } = await sql`SELECT email FROM users WHERE id = ${userId}`;
        if (rows.length === 0) return NextResponse.json({ user: null });

        return NextResponse.json({ user: { email: rows[0].email } });
    } catch (error) {
        console.error("Me error:", error);
        return NextResponse.json({ user: null });
    }
};
