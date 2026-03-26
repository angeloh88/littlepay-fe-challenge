import { getSession } from "@/lib/auth/sessions";
import { redirect } from "next/navigation";
import { AppShell } from "@/features/dashboard/components/app-shell";

export default async function AppShellLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }

    const userName = session.user?.full_name ?? "User";
    const userSubtitle = session.user?.email ?? "";
    return (
        <AppShell userName={userName} userSubtitle={userSubtitle}>
            {children}
        </AppShell>
    );
}
