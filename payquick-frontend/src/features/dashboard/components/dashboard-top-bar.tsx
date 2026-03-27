import { Bell, HelpCircle, Search } from "lucide-react";
import Image from "next/image";

import { SidebarTrigger } from "@/components/ui/sidebar";

const DEFAULT_AVATAR = "/images/dashboard-avatar.png";

export type DashboardTopBarProps = {
    userName?: string;
    userSubtitle?: string;
    avatarSrc?: string;
    avatarAlt?: string;
};

export function DashboardTopBar({
    userName = "Alexander Pierce",
    userSubtitle = "Premium Member",
    avatarSrc = DEFAULT_AVATAR,
    avatarAlt,
}: DashboardTopBarProps) {
    const alt = avatarAlt ?? userName;
    return (
        <header className="sticky top-0 z-50 flex h-fit min-h-20 shrink-0 flex-row items-center justify-between gap-3 border-b border-slate-200/60 bg-white/80 p-3 px-4 shadow-[0px_12px_32px_rgba(25,28,32,0.06)] backdrop-blur-xl sm:px-8 dark:border-slate-800 dark:bg-slate-950/80">
            <div className="flex items-center gap-3 w-1/2">
                <div className="flex lg:hidden items-center">
                    <SidebarTrigger className="-ml-1 shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-white cursor-pointer " />
                </div>
                <div className="flex w-full max-w-md items-center gap-2 rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-800/80 sm:gap-4 sm:px-4">
                    <Search
                        className="size-5 shrink-0 text-slate-400"
                        strokeWidth={2}
                        aria-hidden
                    />
                    <input
                        className="w-full border-none bg-transparent text-sm placeholder:text-slate-400 focus:ring-0 dark:text-slate-100"
                        type="search"
                        placeholder="Search transactions, cards..."
                        aria-label="Search transactions and cards"
                    />
                </div>
            </div>
            <div className="flex justify-end items-center gap-6">
                <button
                    type="button"
                    className="relative text-slate-500 transition-colors hover:text-primary dark:text-slate-400"
                    aria-label="Notifications"
                >
                    <Bell className="size-6" strokeWidth={2} />
                    <span className="absolute right-0 top-0 h-2 w-2 rounded-full border-2 border-white bg-error dark:border-slate-950" />
                </button>
                <button
                    type="button"
                    className="text-slate-500 transition-colors hover:text-primary dark:text-slate-400"
                    aria-label="Help"
                >
                    <HelpCircle className="size-6" strokeWidth={2} />
                </button>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-sm font-semibold leading-none text-slate-900 dark:text-slate-100">
                            {userName}
                        </p>
                        <p className="mt-1 text-[0.6875rem] text-slate-500">
                            {userSubtitle}
                        </p>
                    </div>
                    <Image
                        src={avatarSrc}
                        alt={alt}
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700"
                    />
                </div>
            </div>
        </header>
    );
}
