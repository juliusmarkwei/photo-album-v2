import {
    scryptSync,
    randomBytes,
    timingSafeEqual,
    createHmac,
    createHash,
} from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { sql, ensureSchema } from "./db";

const SECRET = process.env.SESSION_SECRET || "dev-insecure-secret";
const COOKIE = "session";
const MAX_AGE = 60 * 60 * 24 * 30;

export const hashPassword = (pw: string) => {
    const salt = randomBytes(16).toString("hex");
    const dk = scryptSync(pw, salt, 64).toString("hex");
    return `${salt}:${dk}`;
};

export const verifyPassword = (pw: string, stored: string) => {
    const [salt, key] = stored.split(":");
    if (!salt || !key) return false;
    const dk = scryptSync(pw, salt, 64);
    const keyBuf = Buffer.from(key, "hex");
    return keyBuf.length === dk.length && timingSafeEqual(keyBuf, dk);
};

const sign = (data: string) =>
    createHmac("sha256", SECRET).update(data).digest("base64url");

const createSessionValue = (userId: number) => {
    const payload = `${userId}.${Date.now() + MAX_AGE * 1000}`;
    return `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
};

const readSession = (value?: string): number | null => {
    if (!value) return null;
    const [b64, sig] = value.split(".");
    if (!b64 || !sig) return null;
    const payload = Buffer.from(b64, "base64url").toString();
    if (sign(payload) !== sig) return null;
    const [userId, exp] = payload.split(".");
    if (Number(exp) < Date.now()) return null;
    return Number(userId);
};

export const setSessionCookie = async (userId: number) => {
    const c = await cookies();
    c.set(COOKIE, createSessionValue(userId), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: MAX_AGE,
    });
};

export const clearSessionCookie = async () => {
    const c = await cookies();
    c.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
};

export const getUserId = async (): Promise<number | null> => {
    const c = await cookies();
    return readSession(c.get(COOKIE)?.value);
};

export const generateToken = () => "glr_" + randomBytes(24).toString("hex");
export const hashToken = (token: string) =>
    createHash("sha256").update(token).digest("hex");

export const authenticateToken = async (
    request: NextRequest
): Promise<boolean> => {
    const auth = request.headers.get("authorization") || "";
    const match = auth.match(/^Bearer\s+(.+)$/i);
    if (!match) return false;
    await ensureSchema();
    const tokenHash = hashToken(match[1].trim());
    const { rows } = await sql`
        UPDATE api_tokens SET last_used_at = now()
        WHERE token_hash = ${tokenHash} RETURNING id`;
    return rows.length > 0;
};
