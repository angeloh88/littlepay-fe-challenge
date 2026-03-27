import type { ReactNode } from "react";

import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopBar } from "./dashboard-top-bar";
import { DashboardFooter } from "./dashboard-footer";

/**
 * Shared chrome for authenticated app routes — one sidebar + top bar for the same user.
 */
export function AppShell({
    children,
    userName,
    userSubtitle,
}: Readonly<{
    children: ReactNode;
    userName?: string;
    userSubtitle?: string;
}>) {
    return (
        <div className="min-h-screen bg-surface font-body text-on-surface antialiased">
            <DashboardSidebar />
            <main className="ml-64 min-h-screen">
                <DashboardTopBar
                    userName={userName}
                    userSubtitle={userSubtitle}
                />
                {children}
                <DashboardFooter />
            </main>
        </div>
    );
}
