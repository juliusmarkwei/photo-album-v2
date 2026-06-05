import { NextRequest, NextResponse } from "next/server";
import { listImages, CORS_HEADERS } from "@/app/utils/listImages";

export const OPTIONS = async () =>
    new NextResponse(null, { headers: CORS_HEADERS });

export const GET = async (request: NextRequest) => {
    try {
        const params = request.nextUrl.searchParams;
        const category = params.get("category");
        const count = Math.min(
            Math.max(parseInt(params.get("count") || "1", 10) || 1, 1),
            50
        );

        let images = await listImages();
        if (category && category.toLowerCase() !== "all") {
            images = images.filter(
                (i) => i.category.toLowerCase() === category.toLowerCase()
            );
        }

        if (images.length === 0) {
            return NextResponse.json(
                { success: false, message: "No images found" },
                { status: 404, headers: CORS_HEADERS }
            );
        }

        const pool = [...images];
        const picked = [];
        for (let i = 0; i < count && pool.length > 0; i++) {
            const idx = Math.floor(Math.random() * pool.length);
            picked.push(pool.splice(idx, 1)[0]);
        }

        return NextResponse.json(
            {
                success: true,
                count: picked.length,
                images: picked.map(({ url, name, category }) => ({
                    url,
                    name,
                    category,
                })),
            },
            { headers: CORS_HEADERS }
        );
    } catch (error) {
        console.error("Error picking random images:", error);
        return NextResponse.json(
            { success: false, message: "Failed to retrieve images" },
            { status: 500, headers: CORS_HEADERS }
        );
    }
};
