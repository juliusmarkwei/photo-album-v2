import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchema } from "@/app/utils/db";
import { getUserId, generateToken, hashToken } from "@/app/utils/auth";

export const GET = async () => {
    const userId = await getUserId();
    if (!userId)
        return NextResponse.json({ success: false }, { status: 401 });

    await ensureSchema();
    const { rows } = await sql`
        SELECT id, name, prefix, created_at, last_used_at
        FROM api_tokens WHERE user_id = ${userId}
        ORDER BY created_at DESC`;
    return NextResponse.json({ success: true, tokens: rows });
};

export const POST = async (request: NextRequest) => {
    const userId = await getUserId();
    if (!userId)
        return NextResponse.json({ success: false }, { status: 401 });

    const { name } = await request.json();
    const label = (name || "Untitled token").toString().slice(0, 60);

    await ensureSchema();
    const token = generateToken();
    const prefix = token.slice(0, 12);
    await sql`
        INSERT INTO api_tokens (user_id, name, token_hash, prefix)
        VALUES (${userId}, ${label}, ${hashToken(token)}, ${prefix})`;

    return NextResponse.json({ success: true, token, name: label });
};

export const DELETE = async (request: NextRequest) => {
    const userId = await getUserId();
    if (!userId)
        return NextResponse.json({ success: false }, { status: 401 });

    const id = request.nextUrl.searchParams.get("id");
    if (!id)
        return NextResponse.json(
            { success: false, message: "Missing id" },
            { status: 400 }
        );

    await ensureSchema();
    await sql`DELETE FROM api_tokens WHERE id = ${id} AND user_id = ${userId}`;
    return NextResponse.json({ success: true });
};
