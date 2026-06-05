"use client";

import Image from "next/image";
import React, { useState } from "react";

interface GalleryImageProps {
    url: string;
    name: string;
    starCount: number;
    starred: boolean;
    onToggleStar: () => void;
    onOpen: () => void;
}

const GalleryImage: React.FC<GalleryImageProps> = ({
    url,
    name,
    starCount,
    starred,
    onToggleStar,
    onOpen,
}) => {
    const [dims, setDims] = useState({ width: 4, height: 3 });
    const [loaded, setLoaded] = useState(false);

    const stop = (fn: () => void) => (e: React.MouseEvent) => {
        e.stopPropagation();
        fn();
    };

    return (
        <div
            onClick={onOpen}
            className="relative mb-4 cursor-zoom-in overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/5 group"
        >
            <Image
                src={url}
                alt={name}
                width={dims.width}
                height={dims.height}
                sizes="(max-width: 500px) 50vw, (max-width: 768px) 33vw, (max-width: 992px) 25vw, (max-width: 1200px) 20vw, 16vw"
                onLoad={(e) => {
                    const img = e.currentTarget;
                    setDims({ width: img.naturalWidth, height: img.naturalHeight });
                    setLoaded(true);
                }}
                className={`w-full h-auto object-cover transition duration-500 ease-out group-hover:scale-[1.04] ${
                    loaded ? "opacity-100" : "opacity-0"
                }`}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <span
                className="absolute bottom-3 left-3 right-12 truncate text-sm font-medium text-white opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                title={name}
            >
                {name}
            </span>

            <button
                type="button"
                aria-label="Star"
                onClick={stop(onToggleStar)}
                className={`absolute top-3 right-3 flex h-9 items-center gap-1 rounded-full px-2.5 text-sm font-semibold backdrop-blur-sm transition-all duration-300 ${
                    starred
                        ? "bg-yellow-400 text-black opacity-100"
                        : "bg-black/50 text-white opacity-0 hover:bg-yellow-400 hover:text-black group-hover:opacity-100"
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={starred ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="size-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.12 4.92 5.34.46c.5.04.7.66.32.99l-4.05 3.5 1.21 5.22c.11.49-.42.87-.85.61L12 17.02l-4.63 2.68c-.43.26-.96-.12-.85-.61l1.21-5.22-4.05-3.5a.56.56 0 0 1 .32-.99l5.34-.46 2.12-4.92Z"
                    />
                </svg>
                {starCount}
            </button>
        </div>
    );
};

export default GalleryImage;
