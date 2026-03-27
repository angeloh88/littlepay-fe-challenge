import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/lib/env";
import {
    SESSION_ACCESS_COOKIE,
    SESSION_REFRESH_COOKIE,
} from "@/lib/auth/cookies";

export async function POST(request: Request) {
    const origin = env.MOCK_API_ORIGIN;
    if (!origin) {
        return NextResponse.json(
            { error: "MOCK_API_ORIGIN is not set" },
            { status: 500 },
        );
    }

    // 🔐 Read refresh token from httpOnly cookie
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(SESSION_REFRESH_COOKIE)?.value;

    if (!refreshToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Forward request to upstream /token/refresh
    const upstream = await fetch(`${origin}/api/v1/token/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
        },
        body: await request.text(), // forward body as-is
    });

    const text = await upstream.text();

    // ❌ Forward errors
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
    const newRefreshToken = json?.data?.refresh_token;

    if (!accessToken || !newRefreshToken) {
        return NextResponse.json(
            { error: "Invalid refresh response" },
            { status: 500 },
        );
    }

    // ✅ Rotate cookies
    const response = NextResponse.json({ status: "success" });

    const accessCookieMaxAge = env.SESSION_ACCESS_COOKIE_TIMEOUTINMINUTES * 60; // seconds
    const refreshCookieMaxAge =
        env.SESSION_REFRESH_COOKIE_TIMEOUTINDAYS * 24 * 60 * 60; // seconds

    response.cookies.set(SESSION_ACCESS_COOKIE, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: accessCookieMaxAge,
    });

    response.cookies.set(SESSION_REFRESH_COOKIE, newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: refreshCookieMaxAge,
    });

    return response;
}
