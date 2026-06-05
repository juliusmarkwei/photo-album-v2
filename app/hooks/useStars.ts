"use client";

import { useCallback, useEffect, useState } from "react";

const LS_KEY = "starredImages";

export const useStars = () => {
    const [stars, setStars] = useState<Record<string, number>>({});
    const [starredKeys, setStarredKeys] = useState<Set<string>>(new Set());

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
            if (Array.isArray(saved)) setStarredKeys(new Set(saved));
        } catch {
            // ignore malformed storage
        }
        fetch("/api/stars")
            .then((r) => r.json())
            .then((d) => d?.stars && setStars(d.stars))
            .catch(() => {});
    }, []);

    const toggleStar = useCallback((key: string) => {
        setStarredKeys((prev) => {
            const next = new Set(prev);
            const wasStarred = next.has(key);
            const delta = wasStarred ? -1 : 1;
            if (wasStarred) next.delete(key);
            else next.add(key);
            localStorage.setItem(LS_KEY, JSON.stringify([...next]));
            setStars((s) => ({ ...s, [key]: Math.max(0, (s[key] || 0) + delta) }));
            fetch("/api/stars", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key, delta }),
            })
                .then((r) => r.json())
                .then((d) => d?.success && setStars((s) => ({ ...s, [key]: d.count })))
                .catch(() => {});
            return next;
        });
    }, []);

    return { stars, starredKeys, toggleStar };
};
