import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/app/utils/auth";

export const POST = async () => {
    await clearSessionCookie();
    return NextResponse.json({ success: true });
};
