import { NextResponse } from "next/server";
import {
    SESSION_ACCESS_COOKIE,
    SESSION_REFRESH_COOKIE,
    SESSION_USER_COOKIE,
} from "@/lib/auth/cookies";

const isProd = process.env.NODE_ENV === "production";

const cookieBase = {
    path: "/",
    maxAge: 0,
    sameSite: "lax" as const,
    secure: isProd,
};

export async function POST() {
    const res = NextResponse.json({ ok: true });

    res.cookies.set(SESSION_ACCESS_COOKIE, "", {
        ...cookieBase,
        httpOnly: true,
    });
    res.cookies.set(SESSION_REFRESH_COOKIE, "", {
        ...cookieBase,
        httpOnly: true,
    });
    res.cookies.set(SESSION_USER_COOKIE, "", {
        ...cookieBase,
        httpOnly: false,
    });

    return res;
}
