// Names used by BFF + middleware + getSession — single source of truth
export const SESSION_ACCESS_COOKIE = "pq_access_token";
export const SESSION_REFRESH_COOKIE = "pq_refresh_token";
export const SESSION_USER_COOKIE = "pq_user";

export type SessionUser = {
    user_id: string;
    full_name: string;
    email: string;
};

export function parseUserCookie(raw: string): SessionUser | null {
    try {
        const v = JSON.parse(raw) as unknown;
        if (
            typeof v === "object" &&
            v !== null &&
            "user_id" in v &&
            "full_name" in v &&
            "email" in v &&
            typeof (v as SessionUser).user_id === "string" &&
            typeof (v as SessionUser).full_name === "string" &&
            typeof (v as SessionUser).email === "string"
        ) {
            return v as SessionUser;
        }
        return null;
    } catch {
        return null;
    }
}
