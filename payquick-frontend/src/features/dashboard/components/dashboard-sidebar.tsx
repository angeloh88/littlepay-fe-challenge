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

import { cn } from "@/lib/utils";

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
        <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col gap-2 border-r border-transparent bg-slate-50 px-4 py-8 font-body text-[0.875rem] font-medium dark:bg-slate-950">
            <div className="mb-10 flex items-center gap-3 px-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-white">
                    <Wallet className="size-5" aria-hidden strokeWidth={2} />
                </div>
                <div>
                    <h1 className="font-headline text-xl font-extrabold leading-none text-blue-700">
                        PayQuick
                    </h1>
                    <p className="mt-1 text-[0.6875rem] uppercase tracking-widest text-slate-500">
                        Premium Fintech
                    </p>
                </div>
            </div>
            <nav className="flex-1 space-y-1">
                {nav.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                                active
                                    ? "bg-white text-blue-700 shadow-sm dark:bg-slate-900 dark:text-blue-400"
                                    : "text-slate-500 hover:translate-x-1 hover:text-slate-900 dark:hover:text-slate-100",
                            )}
                        >
                            <Icon className="size-5 shrink-0" strokeWidth={2} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-slate-200/50 pt-4">
                <button
                    type="button"
                    onClick={() => void handleLogout()}
                    disabled={isLoggingOut}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-500 transition-all duration-200 hover:text-error disabled:opacity-50 cursor-pointer"
                    aria-busy={isLoggingOut}
                >
                    <LogOut className="size-5 shrink-0" strokeWidth={2} />
                    <span>{isLoggingOut ? "Signing out…" : "Logout"}</span>
                </button>
            </div>
        </aside>
    );
}
