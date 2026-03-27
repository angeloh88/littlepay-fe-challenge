export async function fetchWithRefresh(url: string, options: RequestInit = {}) {
    let res = await fetch(url, { ...options, credentials: "include" });

    if (res.status === 401) {
        // Call BFF refresh route
        const refreshRes = await fetch("/api/v1/token/refresh", {
            method: "POST",
            credentials: "include",
        });

        if (!refreshRes.ok) {
            throw new Error("Session expired, please login again");
        }

        // Retry original request
        res = await fetch(url, { ...options, credentials: "include" });
    }

    return res;
}
