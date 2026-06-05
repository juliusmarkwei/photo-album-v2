import { readFileSync } from "node:fs";
import { put } from "@vercel/blob";

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

const PER_CATEGORY = 4;

const upload = async (category, keyword, lock) => {
    const src = `https://loremflickr.com/800/600/${keyword}?lock=${lock}`;
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
