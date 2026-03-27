import { cookies } from "next/headers";
import {
    SESSION_ACCESS_COOKIE,
    SESSION_USER_COOKIE,
    SESSION_REFRESH_COOKIE,
    parseUserCookie,
    type SessionUser,
} from "./cookies";
import { env } from "@/lib/env";

export async function getSession(): Promise<{
    user: SessionUser | null;
    hasTokens: boolean;
} | null> {
    const cookieStore = await cookies();

    let accessToken = cookieStore.get(SESSION_ACCESS_COOKIE)?.value;
    const refreshToken = cookieStore.get(SESSION_REFRESH_COOKIE)?.value;
    const rawUser = cookieStore.get(SESSION_USER_COOKIE)?.value;

    // ❌ No refresh token at all → fully logged out
    if (!refreshToken) {
        return null;
    }

    // ✅ If access token exists → session is valid
    if (accessToken) {
        return {
            user: rawUser ? parseUserCookie(rawUser) : null,
            hasTokens: true,
        };
    }

    // 🔄 Try refresh
    const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/v1/token/refresh`, {
        method: "POST",
        headers: {
            cookie: cookieStore.toString(),
        },
    });

    if (!res.ok) {
        return null;
    }

    // ✅ After refresh, cookies are updated
    const newCookies = await cookies();
    accessToken = newCookies.get(SESSION_ACCESS_COOKIE)?.value;

    if (!accessToken) {
        return null;
    }

    return {
        user: rawUser ? parseUserCookie(rawUser) : null,
        hasTokens: true,
    };
}

export async function clearSessionCookies() {
    const cookieStore = await cookies();

    cookieStore.set(SESSION_ACCESS_COOKIE, "", { maxAge: 0, path: "/" });
    cookieStore.set(SESSION_REFRESH_COOKIE, "", { maxAge: 0, path: "/" });
    cookieStore.set(SESSION_USER_COOKIE, "", { maxAge: 0, path: "/" });
}
