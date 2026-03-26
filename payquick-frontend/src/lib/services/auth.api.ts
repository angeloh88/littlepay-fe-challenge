export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginUser = {
    user_id: string;
    full_name: string;
    email: string;
};

// Updated: no token fields because cookies are httpOnly
export type LoginSuccessData = {
    user?: LoginUser; // optional optimistic UI
};

export type LoginSuccessResponse = {
    status: string;
    message: string;
    data: LoginSuccessData;
};

export type LoginErrorResponse = {
    status: string;
    message: string;
};

export async function login(
    credentials: LoginRequest,
): Promise<LoginSuccessResponse> {
    const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ crucial for httpOnly cookies
        body: JSON.stringify(credentials),
    });

    // Attempt to parse JSON, but if BFF doesn't return tokens, it's optional
    let json: unknown = {};
    try {
        json = await response.json();
    } catch {
        // no JSON returned — that's okay when relying on cookies
        json = {
            status: response.ok ? "success" : "error",
            message: response.ok ? "Logged in" : "Login failed",
            data: {},
        };
    }

    if (!response.ok) {
        const err = json as LoginErrorResponse;
        throw new Error(err.message ?? "Login failed");
    }

    return json as LoginSuccessResponse;
}
