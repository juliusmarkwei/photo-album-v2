"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm";
import TokenManager from "../components/TokenManager";

export default function Account() {
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/auth/me")
            .then((r) => r.json())
            .then((d) => setEmail(d.user?.email ?? null))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setEmail(null);
    };

    return (
        <main className="min-h-dvh w-full bg-black px-4 py-10 text-gray-200 lg:px-8">
            <div className="mx-auto max-w-2xl">
                <div className="mb-8 flex items-center justify-between">
                    <Link
                        href="/"
                        className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-xl font-bold text-transparent"
                    >
                        Gallery
                    </Link>
                    <Link
                        href="/docs"
                        className="text-sm text-gray-400 hover:text-white"
                    >
                        API docs →
                    </Link>
                </div>

                {loading ? (
                    <div className="flex h-40 items-center justify-center">
                        <div className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    </div>
                ) : email ? (
                    <div>
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-white">
                                    API tokens
                                </h1>
                                <p className="text-sm text-gray-400">
                                    Signed in as {email}
                                </p>
                            </div>
                            <button
                                onClick={logout}
                                className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium ring-1 ring-white/10 hover:bg-white/10"
                            >
                                Sign out
                            </button>
                        </div>
                        <TokenManager />
                    </div>
                ) : (
                    <AuthForm onSuccess={setEmail} />
                )}
            </div>
        </main>
    );
}
