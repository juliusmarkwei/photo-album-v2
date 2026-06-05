"use client";

import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPrev,
    onNext,
}) => {
    if (totalPages <= 1) return null;

    const baseBtn =
        "h-10 w-12 lg:h-11 lg:w-14 flex items-center justify-center rounded-full transition-colors";

    return (
        <div className="fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/10 px-3 py-2 backdrop-blur-md ring-1 ring-white/10">
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
                className={`${baseBtn} ${
                    currentPage === 1
                        ? "bg-white/10 text-white/30 cursor-not-allowed"
                        : "bg-white text-black hover:bg-gray-200"
                }`}
                title="Previous"
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
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                </svg>
            </button>

            <span className="min-w-16 text-center text-sm font-medium text-white">
                {currentPage} / {totalPages}
            </span>

            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className={`${baseBtn} ${
                    currentPage === totalPages
                        ? "bg-white/10 text-white/30 cursor-not-allowed"
                        : "bg-white text-black hover:bg-gray-200"
                }`}
                title="Next"
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
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
