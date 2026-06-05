"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ProfileAvatar = () => {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/auth/me")
            .then((r) => r.json())
            .then((d) => setEmail(d.user?.email ?? null))
            .catch(() => {});
    }, []);

    if (!email) {
        return (
            <Link
                href="/account"
                aria-label="Sign in"
                className="flex size-10 lg:size-12 items-center justify-center rounded-full bg-white/5 text-gray-300 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.5a7.5 7.5 0 0 1 15 0v.75H4.5v-.75Z"
                    />
                </svg>
            </Link>
        );
    }

    const initial = email[0]?.toUpperCase() || "?";
    const hue =
        [...email].reduce((sum, c) => sum + c.charCodeAt(0), 0) % 360;

    return (
        <Link
            href="/account"
            title={email}
            style={{ backgroundColor: `hsl(${hue} 60% 45%)` }}
            className="flex size-10 lg:size-12 items-center justify-center rounded-full font-semibold text-white ring-1 ring-white/20"
        >
            {initial}
        </Link>
    );
};

export default ProfileAvatar;
