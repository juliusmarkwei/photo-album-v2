import { list } from "@vercel/blob";

export type GalleryImage = {
    key: string;
    name: string;
    category: string;
    url: string;
};

export const listImages = async (): Promise<GalleryImage[]> => {
    const blobs = [];
    let cursor: string | undefined;
    do {
        const page = await list({ cursor, limit: 1000 });
        blobs.push(...page.blobs);
        cursor = page.cursor;
    } while (cursor);

    return blobs
        .filter((blob) => blob.pathname.startsWith("uploads/"))
        .map((blob) => {
            const parts = blob.pathname.split("/");
            const category = parts[1];
            const filename = parts[2] ?? "";
            const name = filename.slice(filename.indexOf("-") + 1);
            return { key: blob.url, name, category, url: blob.url };
        });
};

export const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
};
