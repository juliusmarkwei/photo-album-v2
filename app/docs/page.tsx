import Link from "next/link";
import { PhotoCategories } from "../constants/categories";

export const metadata = {
    title: "API Docs | Gallery",
};

const categories = Object.values(PhotoCategories).filter((c) => c !== "All");

const Block = ({ children }: { children: string }) => (
    <pre className="overflow-x-auto rounded-xl bg-neutral-900 p-4 text-sm text-gray-200 ring-1 ring-white/10">
        <code>{children}</code>
    </pre>
);

const Endpoint = ({
    method,
    path,
    children,
}: {
    method: string;
    path: string;
    children: React.ReactNode;
}) => (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div className="mb-3 flex items-center gap-3">
            <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-300">
                {method}
            </span>
            <code className="text-sm text-white">{path}</code>
        </div>
        {children}
    </div>
);

export default function Docs() {
    return (
        <main className="min-h-dvh w-full bg-black px-4 py-10 text-gray-200 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <Link
                    href="/"
                    className="text-sm text-gray-400 hover:text-white"
                >
                    ← Back to gallery
                </Link>

                <h1 className="mt-4 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-4xl font-bold text-transparent">
                    Gallery API
                </h1>
                <p className="mt-3 text-gray-400">
                    Pull anime &amp; fun images from our collection straight
                    into your app. All endpoints return JSON and are
                    CORS-enabled, so you can call them from the browser.
                </p>

                <section className="mt-10 space-y-6">
                    <Endpoint method="GET" path="/api/random">
                        <p className="mb-3 text-sm text-gray-400">
                            Returns one or more random images. Query params:
                            <code className="mx-1 text-gray-200">count</code>
                            (1–50, default 1) and
                            <code className="mx-1 text-gray-200">category</code>
                            (optional).
                        </p>
                        <Block>{`curl "https://photo-album-self.vercel.app/api/random?count=3&category=Anime"`}</Block>
                        <p className="mt-3 mb-2 text-sm text-gray-400">
                            Response
                        </p>
                        <Block>{`{
  "success": true,
  "count": 3,
  "images": [
    { "url": "https://.../img.webp", "name": "img-12", "category": "Anime" }
  ]
}`}</Block>
                    </Endpoint>

                    <Endpoint method="GET" path="/api/photos">
                        <p className="mb-3 text-sm text-gray-400">
                            Returns the full collection.
                        </p>
                        <Block>{`const res = await fetch("https://photo-album-self.vercel.app/api/photos");
const { images } = await res.json();`}</Block>
                    </Endpoint>
                </section>

                <section className="mt-10">
                    <h2 className="mb-3 text-lg font-semibold text-white">
                        Categories
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((c) => (
                            <span
                                key={c}
                                className="rounded-full bg-white/5 px-3 py-1 text-sm text-gray-300 ring-1 ring-white/10"
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                </section>

                <section className="mt-10 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                    <h2 className="mb-2 text-lg font-semibold text-amber-300">
                        Authentication — coming soon
                    </h2>
                    <p className="text-sm text-gray-400">
                        Soon you&apos;ll create an account and generate API
                        tokens to authenticate your requests via an
                        <code className="mx-1 text-gray-200">
                            Authorization: Bearer &lt;token&gt;
                        </code>
                        header, and manage those tokens from your dashboard.
                    </p>
                </section>
            </div>
        </main>
    );
}
