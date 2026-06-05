"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import DisplayImages from "../components/DisplayImages";
import ImageDialog, { DialogImage } from "../components/ImageDialog";
import { useStars } from "../hooks/useStars";

type Image = {
    url: string;
    name: string;
    category: string;
    key: string;
};

export default function Favorites() {
    const [images, setImages] = useState<Image[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<DialogImage | null>(null);

    const { stars, starredKeys, toggleStar } = useStars();

    useEffect(() => {
        fetch("/api/photos")
            .then((r) => r.json())
            .then((d) => setImages(d.images || []))
            .catch((e) => console.error("Error fetching images:", e))
            .finally(() => setIsLoading(false));
    }, []);

    const favorites = useMemo(
        () => images.filter((img) => starredKeys.has(img.key)),
        [images, starredKeys]
    );

    return (
        <div className="relative min-h-dvh w-full bg-black pb-24 font-[family-name:var(--font-geist-sans)]">
            <div className="fixed top-0 left-0 z-50 flex w-full items-center justify-between gap-3 border-b border-white/10 bg-black/80 px-3 py-3 backdrop-blur-md lg:px-5">
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-xl lg:text-2xl font-bold tracking-tight text-transparent"
                    >
                        Gallery
                    </Link>
                    <span className="text-sm text-gray-400">/ Favorites</span>
                </div>
                <Link
                    href="/"
                    className="rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-200 ring-1 ring-white/10 transition-colors hover:bg-white/10"
                >
                    ← Back
                </Link>
            </div>

            <div className="px-3 pt-24 lg:px-5">
                {isLoading ? (
                    <div className="flex h-[60vh] w-full items-center justify-center">
                        <div className="size-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    </div>
                ) : favorites.length === 0 ? (
                    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center text-center">
                        <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-yellow-400/10 ring-1 ring-yellow-400/20">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="size-10 text-yellow-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.12 4.92 5.34.46c.5.04.7.66.32.99l-4.05 3.5 1.21 5.22c.11.49-.42.87-.85.61L12 17.02l-4.63 2.68c-.43.26-.96-.12-.85-.61l1.21-5.22-4.05-3.5a.56.56 0 0 1 .32-.99l5.34-.46 2.12-4.92Z"
                                />
                            </svg>
                        </div>
                        <h1 className="mb-2 text-2xl font-bold text-white">
                            No favorites yet
                        </h1>
                        <p className="mb-7 max-w-sm text-sm text-white/50">
                            Tap the <span className="text-yellow-400">★</span> on
                            any photo to save it here for quick access.
                        </p>
                        <Link
                            href="/"
                            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                        >
                            Browse the gallery
                        </Link>
                    </div>
                ) : (
                    <>
                        <h1 className="mb-1 text-2xl font-bold text-white">
                            Your favorites
                        </h1>
                        <p className="mb-5 text-sm text-white/50">
                            {favorites.length} starred{" "}
                            {favorites.length === 1 ? "photo" : "photos"}
                        </p>
                        <DisplayImages
                            filteredImages={favorites}
                            isLoading={false}
                            stars={stars}
                            starredKeys={starredKeys}
                            onToggleStar={toggleStar}
                            onOpenImage={setSelectedImage}
                        />
                    </>
                )}
            </div>

            <ImageDialog
                image={selectedImage}
                starCount={selectedImage ? stars[selectedImage.key] || 0 : 0}
                starred={
                    selectedImage ? starredKeys.has(selectedImage.key) : false
                }
                onToggleStar={() =>
                    selectedImage && toggleStar(selectedImage.key)
                }
                onClose={() => setSelectedImage(null)}
            />
        </div>
    );
}
