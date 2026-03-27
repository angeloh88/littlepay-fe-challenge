interface CookieOptions {
    maxAge?: number;
    path?: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
}

export const mockCookies = (initialCookies: Record<string, string> = {}) => {
    const store = { ...initialCookies };
    return {
        get: (key: string) => ({ value: store[key] }),
        /* eslint-disable @typescript-eslint/no-unused-vars */
        set: (key: string, value: string, options?: Partial<CookieOptions>) => {
            store[key] = value;
        },
        /* eslint-enable @typescript-eslint/no-unused-vars */
        toString: () =>
            Object.entries(store)
                .map(([k, v]) => `${k}=${v}`)
                .join("; "),
    };
};
