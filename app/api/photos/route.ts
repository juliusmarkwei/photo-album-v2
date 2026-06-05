import { NextResponse } from "next/server";
import { listImages, CORS_HEADERS } from "@/app/utils/listImages";

export const OPTIONS = async () =>
    new NextResponse(null, { headers: CORS_HEADERS });

export const GET = async () => {
    try {
        const images = await listImages();
        return NextResponse.json(
            { success: true, images },
            { headers: CORS_HEADERS }
        );
    } catch (error) {
        console.error("Error listing blobs:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to retrieve objects",
            },
            { status: 500, headers: CORS_HEADERS }
        );
    }
};
