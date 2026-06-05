"use client";

import React, { useState } from "react";

interface AuthFormProps {
    onSuccess: (email: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setBusy(true);
        try {
            const res = await fetch(`/api/auth/${mode}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.success) onSuccess(data.email);
            else setError(data.message || "Something went wrong");
        } catch {
            setError("Network error");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h1 className="mb-1 text-2xl font-bold text-white">
                {mode === "login" ? "Sign in" : "Create account"}
            </h1>
            <p className="mb-5 text-sm text-gray-400">
                {mode === "login"
                    ? "Sign in to manage your API tokens."
                    : "Create an account to generate API tokens."}
            </p>

            <form onSubmit={submit} className="space-y-3">
                <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white ring-1 ring-white/10 focus:outline-none focus:ring-white/30"
                />
                <input
                    type="password"
                    required
                    placeholder="Password (8+ characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white ring-1 ring-white/10 focus:outline-none focus:ring-white/30"
                />
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button
                    type="submit"
                    disabled={busy}
                    className="w-full rounded-lg bg-white py-2.5 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-60"
                >
                    {busy
                        ? "Please wait..."
                        : mode === "login"
                        ? "Sign in"
                        : "Create account"}
                </button>
            </form>

            <button
                onClick={() => {
                    setMode(mode === "login" ? "signup" : "login");
                    setError("");
                }}
                className="mt-4 w-full text-sm text-gray-400 hover:text-white"
            >
                {mode === "login"
                    ? "Need an account? Sign up"
                    : "Already have an account? Sign in"}
            </button>
        </div>
    );
};

export default AuthForm;
