import { readFileSync } from "node:fs";
import { put, list, del } from "@vercel/blob";

if (!process.env.BLOB_READ_WRITE_TOKEN) {
    try {
        const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
        for (const line of env.split("\n")) {
            const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
            if (m && !process.env[m[1]]) {
                process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
            }
        }
    } catch {
        // no .env.local — rely on the ambient environment
    }
}

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
    console.error(
        "BLOB_READ_WRITE_TOKEN is not set. Run `vercel env pull .env.local` after connecting a Blob store."
    );
    process.exit(1);
}

// category (must match app/constants/categories.ts) -> LoremFlickr keyword
const SEED = {
    Animals: "animal",
    Architecture: "architecture",
    Art: "art",
    Food: "food",
    Nature: "nature",
    Travel: "travel",
    Cars: "car",
    Space: "galaxy",
    Sports: "sport",
    Technology: "technology",
    Fashion: "fashion",
    Music: "music",
};

// varied aspect ratios so the masonry layout visibly staggers
const SIZES = [
    [800, 600],
    [600, 800],
    [800, 800],
    [900, 500],
];

const PER_CATEGORY = SIZES.length;

const upload = async (category, keyword, lock) => {
    const [w, h] = SIZES[(lock - 1) % SIZES.length];
    const src = `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock}`;
    const res = await fetch(src);
    if (!res.ok) throw new Error(`fetch ${src} -> ${res.status}`);
    const blob = await res.blob();
    const name = `${keyword}-${lock}`;
    const pathname = `uploads/${category}/${Date.now()}-${name}`;
    const result = await put(pathname, blob, {
        access: "public",
        addRandomSuffix: false,
        contentType: blob.type || "image/jpeg",
        token,
    });
    return result.url;
};

const wipe = async () => {
    let cursor;
    const urls = [];
    do {
        const r = await list({ cursor, token });
        urls.push(...r.blobs.map((b) => b.url));
        cursor = r.cursor;
    } while (cursor);
    if (urls.length) {
        await del(urls, { token });
        console.log(`Cleared ${urls.length} existing blobs.\n`);
    }
};

await wipe();

let ok = 0;
let failed = 0;
for (const [category, keyword] of Object.entries(SEED)) {
    for (let i = 0; i < PER_CATEGORY; i++) {
        const lock = i + 1;
        try {
            await upload(category, keyword, lock);
            ok++;
            console.log(`✓ ${category}/${keyword}-${lock}`);
        } catch (err) {
            failed++;
            console.error(`✗ ${category}/${keyword}-${lock}: ${err.message}`);
        }
    }
}

console.log(`\nDone. Uploaded ${ok}, failed ${failed}.`);
