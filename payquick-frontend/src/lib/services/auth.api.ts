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
