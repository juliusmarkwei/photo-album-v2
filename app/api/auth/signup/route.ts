import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchema } from "@/app/utils/db";
import { hashPassword, setSessionCookie } from "@/app/utils/auth";

export const POST = async (request: NextRequest) => {
    try {
        const { email, password } = await request.json();
        if (!email || !password || password.length < 8) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email and a password of 8+ chars are required",
                },
                { status: 400 }
            );
        }

        await ensureSchema();
        const normalized = String(email).trim().toLowerCase();
        const existing =
            await sql`SELECT id FROM users WHERE email = ${normalized}`;
        if (existing.rows.length > 0) {
            return NextResponse.json(
                { success: false, message: "Email already registered" },
                { status: 409 }
            );
        }

        const { rows } = await sql`
            INSERT INTO users (email, password_hash)
            VALUES (${normalized}, ${hashPassword(password)})
            RETURNING id`;
        await setSessionCookie(rows[0].id);

        return NextResponse.json({ success: true, email: normalized });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { success: false, message: "Signup failed" },
            { status: 500 }
        );
    }
};
