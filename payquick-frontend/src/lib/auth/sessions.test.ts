import { getSession, clearSessionCookies } from "./sessions";

// Mock env
jest.mock("@/lib/env", () => ({
    env: { NEXT_PUBLIC_APP_URL: "http://localhost" },
}));

// Mock parseUserCookie
jest.mock("./cookies", () => ({
    parseUserCookie: jest.fn((v: string) => ({ id: v })),
    SESSION_ACCESS_COOKIE: "access",
    SESSION_REFRESH_COOKIE: "refresh",
    SESSION_USER_COOKIE: "user",
}));

// ✅ Declare mockCookies variable first
let mockCookies: jest.Mock;

// Mock next/headers to use mockCookies
jest.mock("next/headers", () => ({
    cookies: () => mockCookies(),
}));

// returns user if access token exists
// Scenario: Access token and refresh token exist in cookies.
// Behavior tested: getSession() returns the user parsed from the cookie and hasTokens: true.
// ✅ Happy path when the session is valid.
it("returns user if access token exists", async () => {
    mockCookies = jest.fn().mockReturnValue({
        get: jest.fn((key: string) => {
            if (key === "access") return { value: "token" };
            if (key === "refresh") return { value: "refresh-token" };
            if (key === "user") return { value: "123" };
            return undefined;
        }),
        toString: jest.fn(),
    });

    const session = await getSession();

    expect(session).toEqual({
        user: { id: "123" },
        hasTokens: true,
    });
});

// tries refresh if no access token
// Scenario: No access token, but refresh token exists.
// Behavior tested: getSession() calls the refresh API, updates cookies, and returns the user.
// ✅ Tests the refresh logic path.
it("tries refresh if no access token", async () => {
    // First cookies: no access token, has refresh token
    const fakeCookieStore = {
        get: jest.fn((key: string) => {
            if (key === "refresh") return { value: "refresh-token" };
            if (key === "user") return { value: "123" };
            return undefined;
        }),
        toString: jest.fn(() => "refresh=refresh-token"),
    };

    // Second cookies: after refresh, access token exists
    const newCookieStore = {
        get: jest.fn((key: string) => {
            if (key === "access") return { value: "new-access" };
            if (key === "user") return { value: "123" }; // include user
            return undefined;
        }),
        toString: jest.fn(),
    };

    global.fetch = jest
        .fn()
        .mockResolvedValue({ ok: true } as Partial<Response>);

    mockCookies
        .mockReturnValueOnce(fakeCookieStore)
        .mockReturnValueOnce(newCookieStore);

    const session = await getSession();

    expect(session).toEqual({
        user: { id: "123" },
        hasTokens: true,
    });
});

// returns null if refresh fails
// Scenario: No access token, refresh token exists, but API refresh fails (res.ok = false).
// Behavior tested: getSession() returns null.
// ✅ Tests failed refresh scenario.
it("returns null if refresh fails", async () => {
    const fakeCookieStore = {
        get: jest.fn((key: string) => {
            if (key === "refresh") return { value: "refresh-token" };
            return undefined;
        }),
        toString: jest.fn(),
    };

    global.fetch = jest
        .fn()
        .mockResolvedValue({ ok: false } as Partial<Response>);

    mockCookies = jest.fn().mockReturnValue(fakeCookieStore);

    const session = await getSession();
    expect(session).toBeNull();
});

// returns null if refresh succeeds but no access token in new cookies
// Scenario: Refresh API succeeds but the new cookies don’t contain an access token.
// Behavior tested: getSession() returns null.
// ✅ Covers edge case when refresh doesn’t actually produce a valid session.
it("returns null if refresh succeeds but no access token in new cookies", async () => {
    const fakeCookieStore = {
        get: jest.fn((key: string) => {
            if (key === "refresh") return { value: "refresh-token" };
            if (key === "user") return { value: "123" };
            return undefined;
        }),
        toString: jest.fn(),
    };

    const newCookieStore = {
        get: jest.fn(() => undefined), // no access token
        toString: jest.fn(),
    };

    global.fetch = jest
        .fn()
        .mockResolvedValue({ ok: true } as Partial<Response>);

    mockCookies = jest
        .fn()
        .mockReturnValueOnce(fakeCookieStore)
        .mockReturnValueOnce(newCookieStore);

    const session = await getSession();
    expect(session).toBeNull();
});

// returns null user if no user cookie
// Scenario: Access & refresh tokens exist, but user cookie is missing.
// Behavior tested: getSession() returns user: null but hasTokens: true.
// ✅ Ensures the function gracefully handles missing user info.
it("returns null user if no user cookie", async () => {
    mockCookies = jest.fn().mockReturnValue({
        get: jest.fn((key: string) => {
            if (key === "access") return { value: "token" };
            if (key === "refresh") return { value: "refresh-token" };
            return undefined; // no user cookie
        }),
        toString: jest.fn(),
    });

    const session = await getSession();
    expect(session).toEqual({
        user: null,
        hasTokens: true,
    });
});

// clears cookies with correct maxAge and path
// Scenario: Call clearSessionCookies().
// Behavior tested: All session cookies (access, refresh, user) are cleared with correct maxAge: 0 and path: "/".
// ✅ Verifies cookie clearing logic.
it("clears cookies with correct maxAge and path", async () => {
    const fakeCookieStore = {
        set: jest.fn(),
    };
    mockCookies = jest.fn().mockReturnValue(fakeCookieStore);

    await clearSessionCookies();

    expect(fakeCookieStore.set).toHaveBeenCalledWith("access", "", {
        maxAge: 0,
        path: "/",
    });
    expect(fakeCookieStore.set).toHaveBeenCalledWith("refresh", "", {
        maxAge: 0,
        path: "/",
    });
    expect(fakeCookieStore.set).toHaveBeenCalledWith("user", "", {
        maxAge: 0,
        path: "/",
    });
});
