export const env = {
    MOCK_API_ORIGIN: process.env.MOCK_API_ORIGIN || "http://localhost:3001",
    NEXT_PUBLIC_APP_URL:
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

    // numbers, parsed once
    SESSION_ACCESS_COOKIE_TIMEOUTINMINUTES:
        Number(process.env.SESSION_ACCESS_COOKIE_TIMEOUTINMINUTES) || 15,
    SESSION_REFRESH_COOKIE_TIMEOUTINDAYS:
        Number(process.env.SESSION_REFRESH_COOKIE_TIMEOUTINDAYS) || 7,
};
