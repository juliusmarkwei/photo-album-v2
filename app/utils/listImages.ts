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
            return {
                key: blob.url,
                name: parseName(filename),
                category,
                url: blob.url,
            };
        });
};

// display name from a stored filename. New scheme: "<name>__<unique>.<ext>".
// Legacy scheme: "<timestamp>-<name>".
export const parseName = (filename: string): string => {
    const base = filename.replace(/\.[a-z0-9]+$/i, "");
    const raw = base.includes("__")
        ? base.split("__")[0]
        : base.slice(base.indexOf("-") + 1);
    return raw.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim() || "Untitled";
};

export const cleanName = (raw: string, fallback = "image"): string => {
    const n = (raw || "")
        .replace(/_+/g, " ")
        .replace(/[^a-zA-Z0-9 ]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    return n.slice(0, 60) || fallback;
};

export const buildPathname = (
    category: string,
    name: string,
    unique: string,
    ext = "jpg"
): string => `uploads/${category}/${cleanName(name)}__${unique}.${ext}`;

export const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
};

export const STARS_PATH = "meta/stars.json";

export const readStars = async (): Promise<Record<string, number>> => {
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
