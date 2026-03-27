import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/lib/env";
import { SESSION_ACCESS_COOKIE } from "@/lib/auth/cookies";

export async function GET(request: Request) {
    const origin = env.MOCK_API_ORIGIN;

    if (!origin) {
        return NextResponse.json(
            { error: "MOCK_API_ORIGIN is not set in .env.local" },
            { status: 500 },
        );
    }

    // 🔐 Read access token from httpOnly cookie
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(SESSION_ACCESS_COOKIE)?.value;

    if (!accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 📄 Extract query params (same pattern as login body parsing)
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") ?? "1";

    // 🌐 Call upstream API
    const upstream = await fetch(`${origin}/api/v1/transactions?page=${page}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const text = await upstream.text();

    // ❌ Forward errors exactly like login route
    if (!upstream.ok) {
        return new NextResponse(text, {
            status: upstream.status,
            headers: {
                "Content-Type":
                    upstream.headers.get("content-type") ?? "application/json",
            },
        });
    }

    // ✅ Forward success response as-is
    return new NextResponse(text, {
        status: upstream.status,
        headers: {
            "Content-Type":
                upstream.headers.get("content-type") ?? "application/json",
        },
    });
}
