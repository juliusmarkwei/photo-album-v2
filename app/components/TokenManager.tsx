"use client";

import React, { useEffect, useState } from "react";

type Token = {
    id: number;
    name: string;
    prefix: string;
    created_at: string;
    last_used_at: string | null;
};

const TokenManager = () => {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [name, setName] = useState("");
    const [created, setCreated] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    const load = () =>
        fetch("/api/tokens")
            .then((r) => r.json())
            .then((d) => d.success && setTokens(d.tokens))
            .catch(() => {});

    useEffect(() => {
        load();
    }, []);

    const createToken = async (e: React.FormEvent) => {
        e.preventDefault();
        setBusy(true);
        setCreated(null);
        try {
            const res = await fetch("/api/tokens", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
            const data = await res.json();
            if (data.success) {
                setCreated(data.token);
                setName("");
                load();
            }
        } finally {
            setBusy(false);
        }
    };

    const revoke = async (id: number) => {
        await fetch(`/api/tokens?id=${id}`, { method: "DELETE" });
        load();
    };

    return (
        <div>
            <form onSubmit={createToken} className="flex gap-2">
                <input
                    placeholder="Token name (e.g. My app)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 rounded-lg bg-white/5 px-4 py-2.5 text-white ring-1 ring-white/10 focus:outline-none focus:ring-white/30"
                />
                <button
                    type="submit"
                    disabled={busy}
                    className="shrink-0 rounded-lg bg-white px-4 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-60"
                >
                    Create token
                </button>
            </form>

            {created && (
                <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
                    <p className="mb-2 text-sm text-emerald-300">
                        Copy this token now — you won&apos;t see it again.
                    </p>
                    <code className="block break-all rounded bg-black/40 p-2 text-sm text-white">
                        {created}
                    </code>
                </div>
            )}

            <div className="mt-6 space-y-2">
                {tokens.length === 0 && (
                    <p className="text-sm text-gray-500">No tokens yet.</p>
                )}
                {tokens.map((t) => (
                    <div
                        key={t.id}
                        className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3"
                    >
                        <div className="min-w-0">
                            <p className="truncate font-medium text-white">
                                {t.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {t.prefix}··· · last used{" "}
                                {t.last_used_at
                                    ? new Date(t.last_used_at).toLocaleDateString()
                                    : "never"}
                            </p>
                        </div>
                        <button
                            onClick={() => revoke(t.id)}
                            className="shrink-0 rounded-lg bg-red-500/15 px-3 py-1.5 text-sm font-medium text-red-300 transition hover:bg-red-500/30"
                        >
                            Revoke
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TokenManager;
