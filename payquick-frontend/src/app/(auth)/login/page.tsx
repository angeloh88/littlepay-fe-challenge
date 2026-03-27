import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/sessions";
import type { Metadata } from "next";

import { LoginPage } from "@/features/auth/components/login-page";

export const metadata: Metadata = {
    title: "PayQuick | Secure Login",
    description: "Sign in to your PayQuick financial dashboard.",
};

export default async function LoginRoute() {
    const session = await getSession();

    // ✅ Already logged in → redirect away
    if (session) {
        redirect("/dashboard");
    }

    return <LoginPage />;
}
