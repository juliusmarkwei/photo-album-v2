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

// varied aspect ratios so the masonry layout visibly staggers
const SIZES = [
    [800, 600],
    [600, 800],
    [800, 800],
    [900, 500],
];
const PER_CATEGORY = SIZES.length;

// anime sources (nekos.best, key-free, returns static PNGs)
const ANIME = { Anime: "waifu", Other: "neko", Art: "kitsune" };
// fun real-photo keywords (LoremFlickr, key-free, CC images)
const FUN = {
    Gaming: "videogame",
    Movies: "cinema",
    Music: "concert",
    Animals: "kitten",
    Nature: "sunset",
    Food: "icecream",
    Travel: "beach",
    Space: "galaxy",
};

const fetchAnimeUrls = async (endpoint, amount) => {
    const res = await fetch(
        `https://nekos.best/api/v2/${endpoint}?amount=${amount}`
    );
    if (!res.ok) throw new Error(`nekos.best ${endpoint} -> ${res.status}`);
    const { results } = await res.json();
    return results.map((r) => r.url);
};

const store = async (category, name, source) => {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`fetch ${source} -> ${res.status}`);
    const blob = await res.blob();
    const pathname = `uploads/${category}/${Date.now()}-${name}`;
    await put(pathname, blob, {
        access: "public",
        addRandomSuffix: false,
        contentType: blob.type || "image/jpeg",
        token,
    });
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

let ok = 0;
let failed = 0;

await wipe();

for (const [category, endpoint] of Object.entries(ANIME)) {
    let urls = [];
    try {
        urls = await fetchAnimeUrls(endpoint, PER_CATEGORY);
    } catch (err) {
        console.error(`✗ ${category}: ${err.message}`);
    }
    for (let i = 0; i < urls.length; i++) {
        try {
            await store(category, `${endpoint}-${i + 1}`, urls[i]);
            ok++;
            console.log(`✓ ${category}/${endpoint}-${i + 1}`);
        } catch (err) {
            failed++;
            console.error(`✗ ${category}/${endpoint}-${i + 1}: ${err.message}`);
        }
    }
}

for (const [category, keyword] of Object.entries(FUN)) {
    for (let i = 0; i < PER_CATEGORY; i++) {
        const lock = i + 1;
        const [w, h] = SIZES[i % SIZES.length];
        const src = `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock}`;
        try {
            await store(category, `${keyword}-${lock}`, src);
            ok++;
            console.log(`✓ ${category}/${keyword}-${lock}`);
        } catch (err) {
            failed++;
            console.error(`✗ ${category}/${keyword}-${lock}: ${err.message}`);
        }
    }
}

console.log(`\nDone. Uploaded ${ok}, failed ${failed}.`);
