export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginUser = {
    user_id: string;
    full_name: string;
    email: string;
};

export type LoginSuccessData = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    user: LoginUser;
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
        body: JSON.stringify(credentials),
    });

    const json: unknown = await response.json();

    if (!response.ok) {
        const err = json as LoginErrorResponse;
        throw new Error(err.message ?? "Login failed");
    }

    return json as LoginSuccessResponse;
}
