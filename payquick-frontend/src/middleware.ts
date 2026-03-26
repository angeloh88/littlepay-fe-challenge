import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_ACCESS_COOKIE } from "@/lib/auth/cookies";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get(SESSION_ACCESS_COOKIE)?.value;

    const isAuthPage = pathname.startsWith("/login");
    const isProtectedRoute =
        pathname.startsWith("/transactions") ||
        pathname.startsWith("/dashboard");

    // 🚫 Not logged in → trying to access protected route
    if (!accessToken && isProtectedRoute) {
        const loginUrl = new URL("/login", request.url);

        // Optional: preserve where user was going
        loginUrl.searchParams.set("next", pathname);

        return NextResponse.redirect(loginUrl);
    }

    // ✅ Logged in → trying to access login page
    if (accessToken && isAuthPage) {
        return NextResponse.redirect(new URL("/transactions", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all routes except:
         * - static files
         * - _next (Next.js internals)
         * - favicon
         */
        "/((?!_next|favicon.ico).*)",
    ],
};
