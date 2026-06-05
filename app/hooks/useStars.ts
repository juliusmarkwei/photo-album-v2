"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// account-based favorites: counts + the signed-in user's set come from
// Postgres via /api/favorites. Favoriting requires login.
export const useStars = () => {
    const router = useRouter();
    const [stars, setStars] = useState<Record<string, number>>({});
    const [starredKeys, setStarredKeys] = useState<Set<string>>(new Set());
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const starredRef = useRef(starredKeys);
    starredRef.current = starredKeys;

    useEffect(() => {
        fetch("/api/favorites")
            .then((r) => r.json())
            .then((d) => {
                if (d?.counts) setStars(d.counts);
                if (Array.isArray(d?.mine)) setStarredKeys(new Set(d.mine));
                setLoggedIn(!!d?.loggedIn);
            })
            .catch(() => setLoggedIn(false));
    }, []);

    const toggleStar = useCallback(
        (key: string) => {
            if (loggedIn === false) {
                toast("Sign in to save favorites");
                router.push("/account");
                return;
            }

            const wasStarred = starredRef.current.has(key);
            const delta = wasStarred ? -1 : 1;

            const next = new Set(starredRef.current);
            if (wasStarred) next.delete(key);
            else next.add(key);
            starredRef.current = next;
            setStarredKeys(next);
            setStars((s) => ({ ...s, [key]: Math.max(0, (s[key] || 0) + delta) }));

            fetch("/api/favorites" + (wasStarred ? `?key=${encodeURIComponent(key)}` : ""), {
                method: wasStarred ? "DELETE" : "POST",
                headers: { "Content-Type": "application/json" },
                body: wasStarred ? undefined : JSON.stringify({ key }),
            })
                .then((r) => r.json())
                .then((d) => {
                    if (d?.success && typeof d.count === "number")
                        setStars((s) => ({ ...s, [key]: d.count }));
                })
                .catch(() => {});
        },
        [loggedIn, router]
    );

    return { stars, starredKeys, toggleStar, loggedIn };
};
