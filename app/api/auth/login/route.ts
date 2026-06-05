import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchema } from "@/app/utils/db";
import { verifyPassword, setSessionCookie } from "@/app/utils/auth";

export const POST = async (request: NextRequest) => {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password are required" },
                { status: 400 }
            );
        }

        await ensureSchema();
        const normalized = String(email).trim().toLowerCase();
        const { rows } = await sql`
            SELECT id, password_hash FROM users WHERE email = ${normalized}`;

        if (rows.length === 0 || !verifyPassword(password, rows[0].password_hash)) {
            return NextResponse.json(
                { success: false, message: "Invalid email or password" },
                { status: 401 }
            );
        }

        await setSessionCookie(rows[0].id);
        return NextResponse.json({ success: true, email: normalized });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { success: false, message: "Login failed" },
            { status: 500 }
        );
    }
};
