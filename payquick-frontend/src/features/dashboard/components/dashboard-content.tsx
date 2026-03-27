import {
    ArrowRight,
    FileText,
    Landmark,
    LayoutGrid,
    Lock,
    PackagePlus,
    Plus,
    PlusCircle,
    Send,
    ShoppingBag,
    TrendingUp,
    UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const chartMonths: { label: string; left: number; right: number }[] = [
    { label: "Oct", left: 40, right: 60 },
    { label: "Nov", left: 50, right: 80 },
    { label: "Dec", left: 30, right: 45 },
    { label: "Jan", left: 70, right: 90 },
    { label: "Feb", left: 45, right: 65 },
];

export function DashboardContent() {
    return (
        <div className="px-10 pb-12 pt-28">
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-12 space-y-10 lg:col-span-8">
                    {/* Total Balance */}
                    <section className="relative overflow-hidden rounded-[2rem] bg-surface-container-low p-10">
                        <div className="relative z-10 flex items-start justify-between">
                            <div>
                                <p className="mb-2 flex items-center gap-2 font-medium tracking-wide text-slate-500">
                                    <Landmark
                                        className="size-[1.2rem] shrink-0"
                                        strokeWidth={2}
                                    />
                                    Total Balance
                                </p>
                                <h2 className="font-headline text-[3.5rem] font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                                    $12,450
                                    <span className="text-slate-400">.00</span>
                                </h2>
                                <div className="mt-6 flex flex-wrap gap-4">
                                    <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm dark:bg-slate-900">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-fixed">
                                            <TrendingUp
                                                className="size-4 text-primary"
                                                strokeWidth={2}
                                                aria-hidden
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[0.6875rem] font-medium leading-none text-slate-500">
                                                Monthly Growth
                                            </p>
                                            <p className="mt-1 text-sm font-bold text-slate-900 dark:text-slate-100">
                                                +12.4%
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm dark:bg-slate-900">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tertiary-fixed">
                                            <Lock
                                                className="size-4 text-tertiary"
                                                strokeWidth={2}
                                                aria-hidden
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[0.6875rem] font-medium leading-none text-slate-500">
                                                Available Credit
                                            </p>
                                            <p className="mt-1 text-sm font-bold text-slate-900 dark:text-slate-100">
                                                $45,000.00
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/50 px-3 py-1.5 text-[0.6875rem] font-semibold text-slate-600 backdrop-blur dark:border-slate-600/50 dark:bg-slate-800/50">
                                    <span className="h-2 w-2 rounded-full bg-green-500" />
                                    Updated 2 mins ago
                                </div>
                            </div>
                        </div>
                        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-100/50 blur-[80px] dark:bg-blue-900/20" />
                        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-indigo-50/50 blur-[40px] dark:bg-indigo-950/30" />
                    </section>

                    {/* Financial Activity */}
                    <section className="space-y-6">
                        <div className="flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="font-headline text-xl font-bold text-slate-900 dark:text-slate-100">
                                Financial Activity
                            </h3>
                            <div className="flex gap-2 rounded-xl bg-surface-container p-1 dark:bg-slate-800">
                                <Button
                                    type="button"
                                    size="sm"
                                    className="h-auto rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-primary shadow-sm dark:bg-slate-900"
                                >
                                    Monthly
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto rounded-lg px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                                >
                                    Yearly
                                </Button>
                            </div>
                        </div>
                        <div className="flex h-80 items-end justify-between gap-4 rounded-[2rem] bg-surface-container-lowest p-8 dark:bg-slate-900/50">
                            {chartMonths.map((m) => (
                                <div
                                    key={m.label}
                                    className="group flex flex-1 flex-col items-center gap-3"
                                >
                                    <div className="flex h-48 w-full items-end justify-center gap-1">
                                        <div
                                            className="w-4 rounded-t-full bg-primary opacity-20 transition-all duration-500 group-hover:h-[calc(100%-2px)]"
                                            style={{ height: `${m.left}%` }}
                                        />
                                        <div
                                            className="w-4 rounded-t-full bg-primary transition-all duration-500"
                                            style={{ height: `${m.right}%` }}
                                        />
                                    </div>
                                    <span className="text-[0.6875rem] font-medium text-slate-400">
                                        {m.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Recent Activity */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="font-headline text-xl font-bold text-slate-900 dark:text-slate-100">
                                Recent Activity
                            </h3>
                            <Button
                                variant="link"
                                className="h-auto gap-1 p-0 text-sm font-bold text-primary hover:gap-2"
                                asChild
                            >
                                <Link href="/transactions">
                                    View All
                                    <ArrowRight
                                        className="size-[18px]"
                                        strokeWidth={2}
                                    />
                                </Link>
                            </Button>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h4 className="mb-4 px-2 text-[0.6875rem] font-bold uppercase tracking-widest text-slate-400">
                                    November 2024
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex cursor-pointer items-center justify-between rounded-2xl bg-surface-container-lowest p-5 transition-all duration-200 hover:translate-x-1 dark:bg-slate-900/80">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low text-slate-900 dark:bg-slate-800">
                                                <ShoppingBag
                                                    className="size-6"
                                                    strokeWidth={2}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                                    Apple Store Online
                                                </p>
                                                <p className="mt-0.5 text-[0.6875rem] text-slate-500">
                                                    Technology • Nov 24, 2024
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                                -$1,299.00
                                            </p>
                                            <span className="mt-1 inline-block rounded-full bg-primary-fixed px-3 py-0.5 text-[0.625rem] font-bold uppercase text-on-primary-fixed-variant">
                                                Completed
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex cursor-pointer items-center justify-between rounded-2xl bg-surface-container-lowest p-5 transition-all duration-200 hover:translate-x-1 dark:bg-slate-900/80">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low text-slate-900 dark:bg-slate-800">
                                                <UtensilsCrossed
                                                    className="size-6"
                                                    strokeWidth={2}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                                    The Modern Bistro
                                                </p>
                                                <p className="mt-0.5 text-[0.6875rem] text-slate-500">
                                                    Dining • Nov 22, 2024
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                                -$156.40
                                            </p>
                                            <span className="mt-1 inline-block rounded-full bg-primary-fixed px-3 py-0.5 text-[0.625rem] font-bold uppercase text-on-primary-fixed-variant">
                                                Completed
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex cursor-pointer items-center justify-between rounded-2xl bg-surface-container-lowest p-5 transition-all duration-200 hover:translate-x-1 dark:bg-slate-900/80">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low text-primary dark:bg-slate-800">
                                                <PlusCircle
                                                    className="size-6"
                                                    strokeWidth={2}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                                    Deposit from External Bank
                                                </p>
                                                <p className="mt-0.5 text-[0.6875rem] text-slate-500">
                                                    Transfer • Nov 20, 2024
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-primary">
                                                +$5,000.00
                                            </p>
                                            <span className="mt-1 inline-block rounded-full bg-tertiary-fixed px-3 py-0.5 text-[0.625rem] font-bold uppercase text-on-tertiary-fixed-variant">
                                                Pending
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right column */}
                <div className="col-span-12 space-y-10 lg:col-span-4">
                    <section className="space-y-6 rounded-[2rem] bg-surface-container-highest p-8 dark:bg-slate-800/60">
                        <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-slate-100">
                            Quick Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                type="button"
                                className="vault-gradient group hover:opacity-95 flex h-auto flex-col gap-3 rounded-2xl border-0 py-6 text-on-primary shadow-lg active:scale-95"
                            >
                                <Send
                                    className="size-8 transition-transform group-hover:scale-110"
                                    strokeWidth={2}
                                />
                                <span className="text-[0.6875rem] font-bold uppercase tracking-wider">
                                    Send Money
                                </span>
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                className="group h-auto flex-col gap-3 rounded-2xl border border-slate-100 bg-white py-6 text-slate-900 shadow-sm active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            >
                                <FileText
                                    className="size-8 transition-transform group-hover:scale-110"
                                    strokeWidth={2}
                                />
                                <span className="text-[0.6875rem] font-bold uppercase tracking-wider">
                                    Request
                                </span>
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                className="group h-auto flex-col gap-3 rounded-2xl border border-slate-100 bg-white py-6 text-slate-900 shadow-sm active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            >
                                <PackagePlus
                                    className="size-8 transition-transform group-hover:scale-110"
                                    strokeWidth={2}
                                />
                                <span className="text-[0.6875rem] font-bold uppercase tracking-wider">
                                    Add Funds
                                </span>
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                className="group h-auto flex-col gap-3 rounded-2xl border border-slate-100 bg-white py-6 text-slate-900 shadow-sm active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            >
                                <LayoutGrid
                                    className="size-8 transition-transform group-hover:scale-110"
                                    strokeWidth={2}
                                />
                                <span className="text-[0.6875rem] font-bold uppercase tracking-wider">
                                    More
                                </span>
                            </Button>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="font-headline text-xl font-bold text-slate-900 dark:text-slate-100">
                                My Cards
                            </h3>
                            <Button
                                variant="link"
                                className="h-auto p-0 text-sm font-semibold"
                                asChild
                            >
                                <Link href="#">Manage</Link>
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div className="group relative h-48 cursor-pointer overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
                                <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-transparent" />
                                <div className="relative z-10 flex h-full flex-col justify-between">
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                                            <span className="text-xs font-bold text-blue-400">
                                                NFC
                                            </span>
                                        </div>
                                        <span className="text-xs font-bold tracking-widest text-slate-400">
                                            PLATINUM VIRTUAL
                                        </span>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-slate-500">
                                            Card Number
                                        </p>
                                        <p className="font-headline text-lg tracking-[0.15em]">
                                            •••• •••• •••• 4291
                                        </p>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-[0.625rem] uppercase text-slate-500">
                                                Expiry
                                            </p>
                                            <p className="text-xs font-bold">
                                                12/28
                                            </p>
                                        </div>
                                        <div className="flex -space-x-2">
                                            <div className="size-8 rounded-full bg-red-500/80" />
                                            <div className="size-8 rounded-full bg-yellow-500/80" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -right-4 -top-10 h-32 w-32 rotate-45 bg-white/5 transition-transform duration-700 group-hover:translate-x-10" />
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full rounded-3xl border-2 border-dashed border-slate-200 py-4 text-slate-400 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-slate-600"
                            >
                                <Plus className="size-5" strokeWidth={2} />
                                <span className="text-sm font-bold">
                                    Add New Card
                                </span>
                            </Button>
                        </div>
                    </section>

                    <section className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm dark:bg-slate-900/80">
                        <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-slate-100">
                            Savings Goals
                        </h3>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[0.6875rem] font-bold text-slate-900 dark:text-slate-100">
                                    <span>New Workspace</span>
                                    <span>85%</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                    <div className="h-full w-[85%] rounded-full bg-primary" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[0.6875rem] font-bold text-slate-900 dark:text-slate-100">
                                    <span>Holiday 2025</span>
                                    <span>24%</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                    <div className="h-full w-[24%] rounded-full bg-tertiary-container" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
