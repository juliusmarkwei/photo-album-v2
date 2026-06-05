import Link from "next/link";
import React, { FC } from "react";
import ProfileAvatar from "./ProfileAvatar";

interface HeaderProps {
    setSearchTerm: (term: string) => void;
    setQuery: (query: string) => void;
    query: string;
    count: number;
}

const Header: FC<HeaderProps> = ({ setSearchTerm, setQuery, query, count }) => {
    const onChange = (value: string) => {
        setQuery(value);
        setSearchTerm(value);
    };

    return (
        <div className="flex items-center gap-3 lg:gap-5 w-full py-2">
            <div className="flex items-center gap-3 shrink-0">
                <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-xl lg:text-2xl font-bold tracking-tight text-transparent">
                    Gallery
                </span>
                <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-gray-300 ring-1 ring-white/10">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    {count.toLocaleString()} photos
                </span>
            </div>

            <div className="flex items-center gap-2 flex-1 max-w-xl mx-auto rounded-full bg-white/5 px-4 h-11 lg:h-12 ring-1 ring-white/10 focus-within:ring-white/30 transition">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-400 shrink-0"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
                <input
                    type="search"
                    placeholder="Search photos..."
                    value={query}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-transparent text-base lg:text-lg text-gray-100 placeholder:text-gray-500 focus:outline-0"
                />
                {query && (
                    <button
                        type="button"
                        aria-label="Clear search"
                        onClick={() => onChange("")}
                        className="text-gray-400 hover:text-white shrink-0"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>

            <div className="flex items-center gap-3 lg:gap-4 shrink-0">
                <nav className="hidden sm:flex items-center gap-1 text-sm font-medium">
                    <Link
                        href="/"
                        className="rounded-full px-3 py-1.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        Home
                    </Link>
                    <Link
                        href="/favorites"
                        className="rounded-full px-3 py-1.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        Favorites
                    </Link>
                    <Link
                        href="/docs"
                        className="rounded-full px-3 py-1.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        API
                    </Link>
                    <Link
                        href="/account"
                        className="rounded-full px-3 py-1.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        Account
                    </Link>
                </nav>
                <ProfileAvatar />
            </div>
        </div>
    );
};

export default Header;
