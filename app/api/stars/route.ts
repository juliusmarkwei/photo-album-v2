import { NextRequest, NextResponse } from "next/server";
import { list, put } from "@vercel/blob";
import { CORS_HEADERS } from "@/app/utils/listImages";

const STARS_PATH = "meta/stars.json";

const readStars = async (): Promise<Record<string, number>> => {
    try {
        const { blobs } = await list({ prefix: STARS_PATH, limit: 1 });
        const blob = blobs.find((b) => b.pathname === STARS_PATH);
        if (!blob) return {};
        const res = await fetch(blob.url, { cache: "no-store" });
        if (!res.ok) return {};
        return await res.json();
    } catch {
        return {};
    }
};

export const OPTIONS = async () =>
    new NextResponse(null, { headers: CORS_HEADERS });

export const GET = async () => {
    const stars = await readStars();
    return NextResponse.json(
        { success: true, stars },
        { headers: CORS_HEADERS }
    );
};

export const POST = async (request: NextRequest) => {
    try {
        const { key, delta } = await request.json();
        if (!key || typeof key !== "string") {
            return NextResponse.json(
                { success: false, message: "Missing key" },
                { status: 400, headers: CORS_HEADERS }
            );
        }

        const stars = await readStars();
        const count = Math.max(0, (stars[key] || 0) + (delta === -1 ? -1 : 1));
        stars[key] = count;

        await put(STARS_PATH, JSON.stringify(stars), {
            access: "public",
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: "application/json",
        });

        return NextResponse.json(
            { success: true, key, count },
            { headers: CORS_HEADERS }
        );
    } catch (error) {
        console.error("Error updating stars:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update stars" },
            { status: 500, headers: CORS_HEADERS }
        );
    }
};
