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
const CONCURRENCY = 12;
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

// mixed anime so it isn't all waifus: scenery/action wallpapers (pic.re),
// male characters (husbando) and a smaller share of female/creature art.
const NEKOS = [
    { endpoint: "husbando", want: Math.round(TARGET * 0.22) },
    { endpoint: "waifu", want: Math.round(TARGET * 0.13) },
    { endpoint: "neko", want: Math.round(TARGET * 0.08) },
    { endpoint: "kitsune", want: Math.round(TARGET * 0.07) },
];

const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const gatherNekos = async (endpoint, want) => {
    const urls = new Set();
    let attempts = 0;
    while (urls.size < want && attempts < want / 10 + 30) {
        attempts++;
        try {
            const res = await fetch(
                `https://nekos.best/api/v2/${endpoint}?amount=20`
            );
            if (!res.ok) continue;
            const { results } = await res.json();
            for (const r of results) if (r?.url) urls.add(r.url);
        } catch {
            // transient
        }
    }
    return [...urls].slice(0, want);
};

const fetchBlob = async (task) => {
    const src = task.type === "url" ? task.url : "https://pic.re/image";
    const res = await fetch(src);
    if (!res.ok) throw new Error(`fetch -> ${res.status}`);
    const blob = await res.blob();
    if (!blob.type.startsWith("image/")) throw new Error("not an image");
    return blob;
};

const store = async (task, category, index) => {
    let blob;
    try {
        blob = await fetchBlob(task);
    } catch {
        blob = await fetchBlob(task); // single retry
    }
    const pathname = `uploads/${category}/${Date.now()}-img-${index}`;
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

console.log("Gathering character art (male + female + creatures)...");
const tasks = [];
for (const { endpoint, want } of NEKOS) {
    const urls = await gatherNekos(endpoint, want);
    console.log(`  ${endpoint}: ${urls.length}`);
    for (const url of urls) tasks.push({ type: "url", url });
}

// fill the rest with varied pic.re anime wallpapers/scenery/action
const picre = Math.max(0, TARGET - tasks.length);
for (let i = 0; i < picre; i++) tasks.push({ type: "picre" });
console.log(`  pic.re wallpapers: ${picre}\n`);

shuffle(tasks);
console.log(`Uploading ${tasks.length} mixed images...\n`);

const { ok, failed } = await pool(tasks, (task, i) =>
    store(task, CATEGORIES[i % CATEGORIES.length], i)
);

console.log(`\nDone. Uploaded ${ok}, failed ${failed}.`);
