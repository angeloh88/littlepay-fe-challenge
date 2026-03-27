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

    // ❌ Forward login errors
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

    if (!accessToken || !refreshToken || !user) {
        return NextResponse.json(
            { error: "Invalid login response from upstream" },
            { status: 500 },
        );
    }

    // ✅ Calculate maxAge from env
    const accessCookieMaxAge =
        (env.SESSION_ACCESS_COOKIE_TIMEOUTINMINUTES ?? 15) * 60; // seconds
    const refreshCookieMaxAge =
        (env.SESSION_REFRESH_COOKIE_TIMEOUTINDAYS ?? 7) * 24 * 60 * 60; // seconds

    // ✅ Create response WITHOUT tokens
    const response = NextResponse.json({
        status: json.status,
        message: json.message,
        user,
    });

    // 🔐 Set httpOnly cookies with env-based maxAge
    response.cookies.set(SESSION_ACCESS_COOKIE, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: accessCookieMaxAge,
    });

    response.cookies.set(SESSION_REFRESH_COOKIE, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: refreshCookieMaxAge,
    });

    // 👤 Store user for UI (NOT httpOnly)
    response.cookies.set(SESSION_USER_COOKIE, JSON.stringify(user), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: refreshCookieMaxAge,
    });

    return response;
}
