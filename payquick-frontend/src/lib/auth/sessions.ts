import { cookies } from "next/headers";
import {
    SESSION_ACCESS_COOKIE,
    SESSION_USER_COOKIE,
    SESSION_REFRESH_COOKIE,
    parseUserCookie,
    type SessionUser,
} from "./cookies";

export async function getSession(): Promise<{
    user: SessionUser | null;
    hasTokens: boolean;
} | null> {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get(SESSION_ACCESS_COOKIE)?.value;
    const rawUser = cookieStore.get(SESSION_USER_COOKIE)?.value;

    // No tokens → no session
    if (!accessToken) {
        return null;
    }

    // Parse user safely (may be null if missing/invalid)
    const user = rawUser ? parseUserCookie(rawUser) : null;

    return {
        user,
        hasTokens: true,
    };
}

export async function clearSessionCookies() {
    const cookieStore = await cookies();

    cookieStore.set(SESSION_ACCESS_COOKIE, "", { maxAge: 0, path: "/" });
    cookieStore.set(SESSION_REFRESH_COOKIE, "", { maxAge: 0, path: "/" });
    cookieStore.set(SESSION_USER_COOKIE, "", { maxAge: 0, path: "/" });
}
