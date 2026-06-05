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

const TARGET = Number(process.argv[2]) || 1000;
const CONCURRENCY = 14;
const CATEGORIES = [
    "Anime",
    "Gaming",
    "Movies",
    "Music",
    "Art",
    "Animals",
    "Nature",
    "Food",
    "Travel",
    "Space",
    "Other",
];

// bright, colorful anime art — nekosapi v4, key-free, safe rating
const gatherUrls = async (target) => {
    const urls = new Set();
    let attempts = 0;
    while (urls.size < target && attempts < target / 50 + 40) {
        attempts++;
        try {
            const res = await fetch(
                "https://api.nekosapi.com/v4/images/random?limit=100&rating=safe"
            );
            if (!res.ok) continue;
            const arr = await res.json();
            for (const it of arr) if (it?.url) urls.add(it.url);
        } catch {
            // transient — keep trying
        }
        if (attempts % 5 === 0) {
            console.log(`gathering... ${urls.size}/${target}`);
        }
    }
    return [...urls].slice(0, target);
};

const store = async (source, category, index) => {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`fetch -> ${res.status}`);
    const blob = await res.blob();
    const pathname = `uploads/${category}/${Date.now()}-anime-${index}`;
    await put(pathname, blob, {
        access: "public",
        addRandomSuffix: false,
        contentType: blob.type || "image/webp",
        token,
    });
};

const wipe = async () => {
    let cursor;
    const urls = [];
    do {
        const r = await list({ cursor, token, limit: 1000 });
        urls.push(...r.blobs.map((b) => b.url));
        cursor = r.cursor;
    } while (cursor);
    for (let i = 0; i < urls.length; i += 500) {
        await del(urls.slice(i, i + 500), { token });
    }
    if (urls.length) console.log(`Cleared ${urls.length} existing blobs.\n`);
};

const pool = async (items, worker) => {
    let idx = 0;
    let ok = 0;
    let failed = 0;
    const run = async () => {
        while (idx < items.length) {
            const i = idx++;
            try {
                await worker(items[i], i);
                ok++;
            } catch (err) {
                failed++;
                if (failed <= 10) console.error(`✗ ${err.message}`);
            }
            if ((ok + failed) % 50 === 0) {
                console.log(`uploaded ${ok + failed}/${items.length}`);
            }
        }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, run));
    return { ok, failed };
};

await wipe();

console.log(`Gathering ${TARGET} anime images...`);
const urls = await gatherUrls(TARGET);
console.log(`Got ${urls.length} unique images. Uploading...\n`);

const { ok, failed } = await pool(urls, (url, i) =>
    store(url, CATEGORIES[i % CATEGORIES.length], i)
);

console.log(`\nDone. Uploaded ${ok}, failed ${failed}.`);
