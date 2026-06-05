"use client";

import Image from "next/image";
import React, { useState } from "react";

interface GalleryImageProps {
    url: string;
    name: string;
    onDelete: () => void;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ url, name, onDelete }) => {
    const [dims, setDims] = useState({ width: 4, height: 3 });
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative mb-4 overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/5 group">
            <Image
                src={url}
                alt={name}
                width={dims.width}
                height={dims.height}
                sizes="(max-width: 500px) 50vw, (max-width: 768px) 33vw, (max-width: 992px) 25vw, (max-width: 1200px) 20vw, 16vw"
                onLoad={(e) => {
                    const img = e.currentTarget;
                    setDims({
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                    });
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

            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                    type="button"
                    aria-label="Like"
                    className="flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-pink-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                    </svg>
                </button>
                <button
                    type="button"
                    aria-label="Delete"
                    onClick={onDelete}
                    className="flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-red-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default GalleryImage;
