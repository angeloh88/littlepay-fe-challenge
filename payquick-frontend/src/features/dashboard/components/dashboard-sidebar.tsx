"use client";

import {
    BarChart3,
    CreditCard,
    LayoutDashboard,
    LogOut,
    Settings,
    Wallet,
    WalletCards,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const nav: {
    href: string;
    label: string;
    icon: typeof LayoutDashboard;
}[] = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/transactions", label: "Payments", icon: WalletCards },
    { href: "#", label: "Cards", icon: CreditCard },
    { href: "#", label: "Insights", icon: BarChart3 },
    { href: "#", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    async function handleLogout() {
        setIsLoggingOut(true);
        try {
            await fetch("/api/v1/logout", {
                method: "POST",
                credentials: "include",
            });
            router.push("/login");
            router.refresh();
        } finally {
            setIsLoggingOut(false);
        }
    }

    function isActive(href: string) {
        if (href === "#") return false;
        return pathname === href;
    }

    return (
        <Sidebar
            collapsible="icon"
            className="border-r border-transparent bg-slate-50 dark:bg-slate-950 **:data-[sidebar=sidebar]:bg-slate-50 dark:**:data-[sidebar=sidebar]:bg-slate-950"
        >
            <SidebarHeader className="gap-3 border-b border-sidebar-border/60 px-2 py-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-container text-white">
                        <Wallet
                            className="size-5"
                            aria-hidden
                            strokeWidth={2}
                        />
                    </div>
                    <div className="grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                        <span className="font-headline truncate text-lg font-extrabold text-blue-700 dark:text-blue-400">
                            PayQuick
                        </span>
                        <span className="truncate text-[0.6875rem] font-medium uppercase tracking-widest text-slate-500">
                            Premium Fintech
                        </span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="px-0 py-2">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1 px-2">
                            {nav.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);
                                return (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={active}
                                            tooltip={item.label}
                                            className="h-11 rounded-xl px-3 text-[0.875rem] font-medium text-slate-500 transition-all duration-200 hover:translate-x-0.5 hover:text-slate-900 data-active:translate-x-0 data-active:bg-white data-active:text-blue-700 data-active:shadow-sm dark:text-slate-400 dark:hover:text-slate-100 dark:data-active:bg-slate-900 dark:data-active:text-blue-400"
                                        >
                                            <Link href={item.href}>
                                                <Icon
                                                    className="size-5"
                                                    strokeWidth={2}
                                                />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-sidebar-border/60 p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            type="button"
                            tooltip={isLoggingOut ? "Signing out…" : "Logout"}
                            disabled={isLoggingOut}
                            aria-busy={isLoggingOut}
                            onClick={() => void handleLogout()}
                            className="h-11 cursor-pointer rounded-xl px-3 text-left text-[0.875rem] font-medium text-slate-500 hover:text-destructive disabled:opacity-50"
                        >
                            <LogOut className="size-5" strokeWidth={2} />
                            <span>
                                {isLoggingOut ? "Signing out…" : "Logout"}
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
