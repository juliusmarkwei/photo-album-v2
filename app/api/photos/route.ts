/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { list, del } from "@vercel/blob";

export const GET = async () => {
    try {
        const blobs = [];
        let cursor: string | undefined;
        do {
            const page = await list({ cursor, limit: 1000 });
            blobs.push(...page.blobs);
            cursor = page.cursor;
        } while (cursor);

        const images = blobs.map((blob) => {
            const parts = blob.pathname.split("/");
            const category = parts[1];
            const filename = parts[2] ?? "";
            const name = filename.slice(filename.indexOf("-") + 1);
            return { key: blob.url, name, category, url: blob.url };
        });

        return NextResponse.json({
            success: true,
            images,
        });
    } catch (error) {
        console.error("Error listing blobs:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to retrieve objects",
            },
            { status: 500 }
        );
    }
};

export const DELETE = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        let key = searchParams.get("key");

        if (!key) {
            return NextResponse.json({
                success: false,
                message: "Key parameter is missing",
            });
        }

        key = decodeURIComponent(key);
        await del(key);

        return NextResponse.json({
            success: true,
        });
    } catch (error: any) {
        console.error("Error deleting blob:", error);
        return NextResponse.json(
            {
                success: false,
                message: `Failed to delete object: ${error.name} - ${error.message}`,
            },
            { status: 500 }
        );
    }
};
