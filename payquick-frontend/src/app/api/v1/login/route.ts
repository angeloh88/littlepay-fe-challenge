import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import {
    SESSION_ACCESS_COOKIE,
    SESSION_REFRESH_COOKIE,
    SESSION_USER_COOKIE,
} from "@/lib/auth/cookies";

export async function POST(request: Request) {
    const origin = env.MOCK_API_ORIGIN;
    if (!origin) {
        return NextResponse.json(
            { error: "MOCK_API_ORIGIN is not set in .env.local" },
            { status: 500 },
        );
    }

    const body = await request.json();

    const upstream = await fetch(`${origin}/api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const text = await upstream.text();

    // ❌ If login failed → just forward response
    if (!upstream.ok) {
        return new NextResponse(text, {
            status: upstream.status,
            headers: {
                "Content-Type":
                    upstream.headers.get("content-type") ?? "application/json",
            },
        });
    }

    // ✅ Parse successful response
    const json = JSON.parse(text);

    const accessToken = json?.data?.access_token;
    const refreshToken = json?.data?.refresh_token;
    const user = json?.data?.user;

    // Basic safety check
    if (!accessToken || !refreshToken || !user) {
        return NextResponse.json(
            { error: "Invalid login response from upstream" },
            { status: 500 },
        );
    }

    // ✅ Create response WITHOUT tokens
    const response = NextResponse.json({
        status: json.status,
        message: json.message,
        user,
    });

    // 🔐 Set httpOnly cookies (tokens)
    response.cookies.set(SESSION_ACCESS_COOKIE, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15, // 15 minutes (adjust based on API)
    });

    response.cookies.set(SESSION_REFRESH_COOKIE, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // 👤 Store user for UI (NOT httpOnly)
    response.cookies.set(SESSION_USER_COOKIE, JSON.stringify(user), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    return response;
}
