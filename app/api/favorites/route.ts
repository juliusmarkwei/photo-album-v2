import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchema } from "@/app/utils/db";
import { getUserId } from "@/app/utils/auth";
import { getCounts, getUserFavorites, countFor } from "@/app/utils/favorites";

// global counts (everyone) + the current user's favorites (if signed in)
export const GET = async () => {
    const userId = await getUserId();
    const counts = await getCounts();
    const mine = userId ? await getUserFavorites(userId) : [];
    return NextResponse.json({ loggedIn: !!userId, mine, counts });
};

export const POST = async (request: NextRequest) => {
    const userId = await getUserId();
    if (!userId)
        return NextResponse.json(
            { success: false, message: "Sign in to favorite" },
            { status: 401 }
        );

    const { key } = await request.json();
    if (!key)
        return NextResponse.json(
            { success: false, message: "Missing key" },
            { status: 400 }
        );

    await ensureSchema();
    await sql`
        INSERT INTO favorites (user_id, image_key) VALUES (${userId}, ${key})
        ON CONFLICT (user_id, image_key) DO NOTHING`;
    return NextResponse.json({ success: true, count: await countFor(key) });
};

export const DELETE = async (request: NextRequest) => {
    const userId = await getUserId();
    if (!userId)
        return NextResponse.json(
            { success: false, message: "Sign in to favorite" },
            { status: 401 }
        );

    const key = request.nextUrl.searchParams.get("key");
    if (!key)
        return NextResponse.json(
            { success: false, message: "Missing key" },
            { status: 400 }
        );

    await ensureSchema();
    await sql`DELETE FROM favorites WHERE user_id = ${userId} AND image_key = ${key}`;
    return NextResponse.json({ success: true, count: await countFor(key) });
};
