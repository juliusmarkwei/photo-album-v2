import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import {
    listImages,
    readStars,
    buildPathname,
    cleanName,
    CORS_HEADERS,
} from "@/app/utils/listImages";
import { authenticateToken } from "@/app/utils/auth";

const unauthorized = () =>
    NextResponse.json(
        {
            success: false,
            message:
                "Missing or invalid API token. Create one at /account and send it as 'Authorization: Bearer <token>'.",
        },
        { status: 401, headers: CORS_HEADERS }
    );

export const OPTIONS = async () =>
    new NextResponse(null, { headers: CORS_HEADERS });

export const GET = async (request: NextRequest) => {
    try {
        if (!(await authenticateToken(request))) return unauthorized();

        const params = request.nextUrl.searchParams;
        const category = params.get("category");
        const name = params.get("name");
        const favorites = params.get("favorites") === "true";
        const random = params.get("random") !== "false" && !favorites;
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
        if (name) {
            const q = name.toLowerCase();
            images = images.filter((i) => i.name.toLowerCase().includes(q));
        }

        const stars = await readStars();
        const starOf = (key: string) => stars[key] || 0;

        if (favorites) {
            images = images
                .filter((i) => starOf(i.key) > 0)
                .sort((a, b) => starOf(b.key) - starOf(a.key));
        }

        if (images.length === 0) {
            return NextResponse.json(
                { success: false, message: "No images match your query" },
                { status: 404, headers: CORS_HEADERS }
            );
        }

        let selected;
        if (random) {
            const pool = [...images];
            selected = [];
            for (let i = 0; i < count && pool.length > 0; i++) {
                selected.push(
                    pool.splice(Math.floor(Math.random() * pool.length), 1)[0]
                );
            }
        } else {
            selected = images.slice(0, count);
        }

        return NextResponse.json(
            {
                success: true,
                count: selected.length,
                images: selected.map(({ url, name, category, key }) => ({
                    url,
                    name,
                    category,
                    stars: starOf(key),
                })),
            },
            { headers: CORS_HEADERS }
        );
    } catch (error) {
        console.error("Error querying images:", error);
        return NextResponse.json(
            { success: false, message: "Failed to retrieve images" },
            { status: 500, headers: CORS_HEADERS }
        );
    }
};

export const POST = async (request: NextRequest) => {
    try {
        if (!(await authenticateToken(request))) return unauthorized();

        const contentType = request.headers.get("content-type") || "";
        let data: Blob;
        let name: string;
        let category: string;

        if (contentType.includes("application/json")) {
            const body = await request.json();
            if (!body.url) {
                return NextResponse.json(
                    { success: false, message: "Provide an image 'url'" },
                    { status: 400, headers: CORS_HEADERS }
                );
            }
            const res = await fetch(body.url);
            if (!res.ok) {
                return NextResponse.json(
                    { success: false, message: "Could not fetch image url" },
                    { status: 400, headers: CORS_HEADERS }
                );
            }
            data = await res.blob();
            name = body.name || "image";
            category = body.category || "Other";
        } else {
            const form = await request.formData();
            const file = form.get("file");
            if (!(file instanceof Blob)) {
                return NextResponse.json(
                    { success: false, message: "Provide a 'file'" },
                    { status: 400, headers: CORS_HEADERS }
                );
            }
            data = file;
            name = (form.get("name") as string) || "image";
            category = (form.get("category") as string) || "Other";
        }

        if (!data.type.startsWith("image/")) {
            return NextResponse.json(
                { success: false, message: "File must be an image" },
                { status: 400, headers: CORS_HEADERS }
            );
        }

        const ext = (data.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
        const unique =
            Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        const pathname = buildPathname(category, name, unique, ext);
        const result = await put(pathname, data, {
            access: "public",
            addRandomSuffix: false,
            contentType: data.type,
        });

        return NextResponse.json(
            {
                success: true,
                image: { url: result.url, name: cleanName(name), category },
            },
            { status: 201, headers: CORS_HEADERS }
        );
    } catch (error) {
        console.error("Error uploading via API:", error);
        return NextResponse.json(
            { success: false, message: "Upload failed" },
            { status: 500, headers: CORS_HEADERS }
        );
    }
};
