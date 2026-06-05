"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

export interface DialogImage {
    url: string;
    name: string;
    category: string;
    key: string;
}

interface ImageDialogProps {
    image: DialogImage | null;
    starCount: number;
    starred: boolean;
    onToggleStar: () => void;
    onClose: () => void;
}

const ImageDialog: React.FC<ImageDialogProps> = ({
    image,
    starCount,
    starred,
    onToggleStar,
    onClose,
}) => {
    const [dims, setDims] = useState({ w: 4, h: 3 });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!image) return;
        setDims({ w: 4, h: 3 });
        setLoaded(false);
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [image, onClose]);

    if (!image) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative flex max-h-[92vh] w-fit max-w-[95vw] flex-col overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    aria-label="Close"
                    onClick={onClose}
                    className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
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

                <div
                    className={`relative flex items-center justify-center bg-black ${
                        loaded ? "" : "min-h-[55vh] min-w-[80vw] sm:min-w-[45vw]"
                    }`}
                >
                    {!loaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="size-9 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                        </div>
                    )}
                    <Image
                        src={image.url}
                        alt={image.name}
                        width={dims.w}
                        height={dims.h}
                        priority
                        onLoad={(e) => {
                            const img = e.currentTarget;
                            setDims({
                                w: img.naturalWidth,
                                h: img.naturalHeight,
                            });
                            setLoaded(true);
                        }}
                        sizes="(max-width: 768px) 95vw, 768px"
                        className={`max-h-[78vh] max-w-[95vw] w-auto h-auto object-contain transition-opacity duration-300 ${
                            loaded ? "opacity-100" : "opacity-0"
                        }`}
                    />
                </div>

                <div className="flex items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                        <p className="truncate text-base font-semibold text-white">
                            {image.name}
                        </p>
                        <span className="mt-1 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-gray-300">
                            {image.category}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={onToggleStar}
                        className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                            starred
                                ? "bg-yellow-400 text-black"
                                : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={starred ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="size-5"
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
            </div>
        </div>
    );
};

export default ImageDialog;
