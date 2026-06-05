import { readFileSync } from "node:fs";
import { put, list, del } from "@vercel/blob";
import sharp from "sharp";

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
        // rely on ambient env
    }
}

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
    console.error("BLOB_READ_WRITE_TOKEN is not set. Run `vercel env pull .env.local`.");
    process.exit(1);
}

const CONCURRENCY = Number(process.env.CONC) || 8;
const PER_TAG = Number(process.argv[2]) || 60; // images to pull per tag combo
const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;

// real anime artwork from Safebooru. characters from trending series (1boy),
// and `no_humans` scenery/objects for people-free anime backdrops.
// each entry: [safebooru tags, clean display name].
const CATEGORY_TAGS = {
    Anime: [
        ["naruto 1boy", "Naruto"],
        ["jujutsu_kaisen 1boy", "Jujutsu Kaisen"],
        ["kimetsu_no_yaiba 1boy", "Demon Slayer"],
    ],
    Gaming: [
        ["genshin_impact 1boy", "Genshin Impact"],
        ["cyberpunk no_humans", "Cyberpunk"],
        ["mecha no_humans", "Mecha"],
    ],
    Movies: [
        ["scenery no_humans", "Scenery"],
        ["sunset no_humans", "Sunset"],
    ],
    Music: [
        ["instrument no_humans", "Instrument"],
        ["guitar no_humans", "Guitar"],
    ],
    Art: [
        ["one_piece 1boy", "One Piece"],
        ["chainsaw_man 1boy", "Chainsaw Man"],
        ["dragon_ball 1boy", "Dragon Ball"],
    ],
    Animals: [
        ["cat no_humans", "Cat"],
        ["pokemon_(creature)", "Pokemon"],
        ["dog no_humans", "Dog"],
    ],
    Nature: [
        ["forest no_humans", "Forest"],
        ["mountain no_humans", "Mountain"],
        ["flower no_humans", "Flower"],
    ],
    Food: [["food no_humans", "Food"]],
    Travel: [
        ["city no_humans", "City"],
        ["building no_humans", "Building"],
    ],
    Space: [
        ["star_(sky) no_humans", "Starry Sky"],
        ["space no_humans", "Space"],
    ],
    Other: [
        ["one_punch_man 1boy", "One Punch Man"],
        ["haikyuu 1boy", "Haikyuu"],
        ["spy_x_family 1boy", "Spy x Family"],
    ],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const withRetry = async (fn, tries = 5) => {
    for (let a = 0; ; a++) {
        try {
            return await fn();
        } catch (err) {
            const limited =
                err?.name === "BlobServiceRateLimited" ||
                /too many requests/i.test(err?.message || "");
            if (!limited || a >= tries) throw err;
            await sleep(Math.min((err?.retryAfter || 5) * 1000, 65000));
        }
    }
};

const cleanName = (raw, fallback) => {
    const n = (raw || "").replace(/_+/g, " ").replace(/[^a-zA-Z0-9 ]+/g, " ")
        .replace(/\s+/g, " ").trim();
    return (n.slice(0, 60) || fallback);
};

const queryUrl = (tags, pid) =>
    `https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&limit=100&pid=${pid}&tags=${encodeURIComponent(
        tags + " -animated"
    )}`;

const gather = async (tags, label, want) => {
    const out = [];
    const seen = new Set();
    for (let pid = 0; out.length < want && pid < 8; pid++) {
        try {
            const res = await fetch(queryUrl(tags, pid));
            if (!res.ok) break;
            const posts = await res.json();
            if (!Array.isArray(posts) || posts.length === 0) break;
            for (const p of posts) {
                if (!p.image || seen.has(p.image)) continue;
                if (!/\.(jpe?g|png|webp)$/i.test(p.image)) continue;
                seen.add(p.image);
                out.push({
                    hash: p.image.split(".")[0],
                    ext: p.image.split(".").pop().toLowerCase(),
                    url: `https://safebooru.org/images/${p.directory}/${p.image}`,
                    name: label,
                });
                if (out.length >= want) break;
            }
        } catch {
            break;
        }
        await sleep(150);
    }
    return out;
};

const store = async (item, category) => {
    const res = await fetch(item.url);
    if (!res.ok) throw new Error(`fetch ${res.status}`);
    const input = Buffer.from(await res.arrayBuffer());
    if (input.length < 3000) throw new Error("invalid image");
    // downscale + recompress so the gallery fits the 1GB Blob free tier
    const out = await sharp(input)
        .rotate()
        .resize({ width: 1280, height: 1280, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 78 })
        .toBuffer();
    const pathname = `uploads/${category}/${cleanName(item.name, "image")}__${item.hash.slice(0, 10)}.jpg`;
    await withRetry(() =>
        put(pathname, out, {
            access: "public",
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: "image/jpeg",
            token,
        })
    );
};

const wipe = async () => {
    let cursor;
    const urls = [];
    do {
        const r = await list({ cursor, token, limit: 1000 });
        urls.push(...r.blobs.filter((b) => b.pathname.startsWith("uploads/")).map((b) => b.url));
        cursor = r.cursor;
    } while (cursor);
    for (let i = 0; i < urls.length; i += 100) {
        await withRetry(() => del(urls.slice(i, i + 100), { token }));
        await sleep(300);
    }
    if (urls.length) console.log(`Cleared ${urls.length} existing blobs.\n`);
};

const pool = async (items, worker) => {
    let idx = 0, ok = 0, failed = 0;
    const run = async () => {
        while (idx < items.length) {
            const i = idx++;
            try {
                await worker(items[i]);
                ok++;
            } catch (err) {
                failed++;
                if (failed <= 12) console.error(`✗ ${err.message}`);
            }
            if ((ok + failed) % 50 === 0)
                console.log(`uploaded ${ok + failed}/${items.length}`);
        }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, run));
    return { ok, failed };
};

if (!process.env.NOWIPE) await wipe();

console.log("Gathering real anime art from Safebooru...");
const tasks = [];
const globalSeen = new Set();
for (const [category, combos] of Object.entries(CATEGORY_TAGS)) {
    if (ONLY && !ONLY.includes(category)) continue;
    let n = 0;
    for (const [tags, label] of combos) {
        const items = await gather(tags, label, PER_TAG);
        for (const it of items) {
            if (globalSeen.has(it.hash)) continue;
            globalSeen.add(it.hash);
            tasks.push({ item: it, category });
            n++;
        }
    }
    console.log(`  ${category}: ${n}`);
}

console.log(`\nUploading ${tasks.length} images...\n`);
const { ok, failed } = await pool(tasks, (t) => store(t.item, t.category));
console.log(`\nDone. Uploaded ${ok}, failed ${failed}.`);
