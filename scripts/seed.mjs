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

const CONCURRENCY = 10;
const PER_KEYWORD = Number(process.argv[2]) || 28;

const SIZES = [
    [800, 600],
    [600, 800],
    [800, 800],
    [900, 500],
];

// trending anime series + cool scenery (no female-pinup APIs), keyed by category
const CATEGORY_KEYWORDS = {
    Anime: ["naruto", "onepiece", "demonslayer", "jujutsukaisen"],
    Gaming: ["cyberpunk", "videogame", "bluelock"],
    Movies: ["ghibli", "spiritedaway", "animemovie"],
    Music: ["neon", "synthwave", "concert"],
    Art: ["animeart", "attackontitan", "chainsawman"],
    Animals: ["pokemon", "wildlife"],
    Nature: ["landscape", "mountains"],
    Food: ["dessert", "ramen"],
    Travel: ["cityscape", "japan"],
    Space: ["galaxy", "nebula"],
    Other: ["onepunchman", "haikyuu", "dragonball"],
};

// male anime characters mixed into the anime-heavy categories
const HUSBANDO_INTO = ["Anime", "Art", "Other"];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const withRetry = async (fn, tries = 5) => {
    for (let attempt = 0; ; attempt++) {
        try {
            return await fn();
        } catch (err) {
            const rateLimited =
                err?.name === "BlobServiceRateLimited" ||
                /too many requests/i.test(err?.message || "");
            if (!rateLimited || attempt >= tries) throw err;
            await sleep(Math.min((err?.retryAfter || 5) * 1000, 65000));
        }
    }
};

const gatherHusbando = async (want) => {
    const urls = new Set();
    let attempts = 0;
    while (urls.size < want && attempts < 40) {
        attempts++;
        try {
            const res = await fetch("https://nekos.best/api/v2/husbando?amount=20");
            if (!res.ok) continue;
            const { results } = await res.json();
            for (const r of results) if (r?.url) urls.add(r.url);
        } catch {
            // transient
        }
    }
    return [...urls].slice(0, want);
};

const fetchBlob = async (src) => {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`fetch -> ${res.status}`);
    const blob = await res.blob();
    if (!blob.type.startsWith("image/")) throw new Error("not an image");
    return blob;
};

const store = async (task, index) => {
    let blob;
    try {
        blob = await fetchBlob(task.src);
    } catch {
        blob = await fetchBlob(task.src);
    }
    const pathname = `uploads/${task.category}/${Date.now()}-img-${index}`;
    await withRetry(() =>
        put(pathname, blob, {
            access: "public",
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: blob.type || "image/jpeg",
            token,
        })
    );
};

const wipe = async () => {
    let cursor;
    const urls = [];
    do {
        const r = await list({ cursor, token, limit: 1000 });
        urls.push(...r.blobs.map((b) => b.url));
        cursor = r.cursor;
    } while (cursor);
    for (let i = 0; i < urls.length; i += 100) {
        await withRetry(() => del(urls.slice(i, i + 100), { token }));
        await sleep(300);
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

console.log("Building task list (trending anime + cool scenery)...");
const tasks = [];
for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
        for (let lock = 1; lock <= PER_KEYWORD; lock++) {
            const [w, h] = SIZES[lock % SIZES.length];
            tasks.push({
                category,
                src: `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock}`,
            });
        }
    }
}

const husbando = await gatherHusbando(180);
console.log(`  husbando (male anime): ${husbando.length}`);
husbando.forEach((url, i) =>
    tasks.push({ category: HUSBANDO_INTO[i % HUSBANDO_INTO.length], src: url })
);

console.log(`Uploading ${tasks.length} images...\n`);
const { ok, failed } = await pool(tasks, store);
console.log(`\nDone. Uploaded ${ok}, failed ${failed}.`);
