import { NextResponse } from "next/server";
import { env } from "@/lib/env";

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
    return new NextResponse(text, {
        status: upstream.status,
        headers: {
            "Content-Type":
                upstream.headers.get("content-type") ?? "application/json",
        },
    });
}
