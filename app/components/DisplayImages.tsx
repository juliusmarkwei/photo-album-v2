"use client";

import React, { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import GalleryImage from "./GalleryImage";

type GalleryItem = {
    url: string;
    name: string;
    category: string;
    key: string;
};

interface DisplayImagesProps {
    filteredImages: GalleryItem[];
    isLoading: boolean;
    stars: Record<string, number>;
    starredKeys: Set<string>;
    onToggleStar: (key: string) => void;
    onOpenImage: (image: GalleryItem) => void;
}

const breakpointColumnsObj = {
    default: 6,
    1200: 5,
    992: 4,
    768: 3,
    500: 2,
};

const BATCH = 48;

const DisplayImages: React.FC<DisplayImagesProps> = ({
    filteredImages,
    isLoading,
    stars,
    starredKeys,
    onToggleStar,
    onOpenImage,
}) => {
    const [visibleCount, setVisibleCount] = useState(BATCH);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setVisibleCount(BATCH);
    }, [filteredImages]);

    const hasMore = visibleCount < filteredImages.length;

    useEffect(() => {
        const node = sentinelRef.current;
        if (!node || !hasMore) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((c) =>
                        Math.min(c + BATCH, filteredImages.length)
                    );
                }
            },
            { rootMargin: "800px" }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [hasMore, visibleCount, filteredImages.length]);

    if (isLoading) {
        return (
            <section className="flex h-[60vh] w-full items-center justify-center">
                <div className="size-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            </section>
        );
    }

    if (filteredImages.length === 0) {
        return (
            <section className="flex h-[60vh] w-full flex-col items-center justify-center gap-2 text-center">
                <h1 className="text-lg font-medium text-white">No images found</h1>
                <p className="text-sm text-white/50">
                    Try another category or upload a new photo.
                </p>
            </section>
        );
    }

    const currentImages = filteredImages.slice(0, visibleCount);

    return (
        <section className="w-full">
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="-ml-3 flex w-auto lg:-ml-4"
                columnClassName="pl-3 bg-clip-padding lg:pl-4"
            >
                {currentImages.map((image) => (
                    <GalleryImage
                        key={image.key}
                        url={image.url}
                        name={image.name}
                        starCount={stars[image.key] || 0}
                        starred={starredKeys.has(image.key)}
                        onToggleStar={() => onToggleStar(image.key)}
                        onOpen={() => onOpenImage(image)}
                    />
                ))}
            </Masonry>

            {hasMore && (
                <div
                    ref={sentinelRef}
                    className="flex w-full justify-center py-10"
                >
                    <div className="size-7 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                </div>
            )}
        </section>
    );
};

export default DisplayImages;
