"use client";

import type { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopBar } from "./dashboard-top-bar";
import { DashboardFooter } from "./dashboard-footer";

/**
 * Shared chrome for authenticated app routes — shadcn sidebar (icon collapse from `md` up; sheet below).
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
        <SidebarProvider className="min-h-svh">
            <DashboardSidebar />
            <SidebarInset className="min-h-svh bg-surface font-body text-on-surface antialiased">
                <DashboardTopBar
                    userName={userName}
                    userSubtitle={userSubtitle}
                />
                {children}
                <DashboardFooter />
            </SidebarInset>
        </SidebarProvider>
    );
}
