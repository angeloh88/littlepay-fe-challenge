import type { LucideIcon } from "lucide-react";
import { TransactionsTable } from "./transactions-table";
import { Plane, Tv, Zap } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type TxRow = {
    icon: LucideIcon;
    iconClass: string;
    title: string;
    meta: string;
    status: "Completed" | "Pending";
    statusStyle: "primary" | "tertiary";
    amount: string;
    amountClass: string;
    balance: string;
};

const october: TxRow[] = [
    {
        icon: Plane,
        iconClass: "text-primary",
        title: "British Airways",
        meta: "Oct 28, 2024 • Travel",
        status: "Completed",
        statusStyle: "primary",
        amount: "- $2,410.20",
        amountClass: "text-on-surface",
        balance: "Balance: $7,466.85",
    },
    {
        icon: Zap,
        iconClass: "text-primary",
        title: "National Grid Utilities",
        meta: "Oct 15, 2024 • Bills",
        status: "Completed",
        statusStyle: "primary",
        amount: "- $154.00",
        amountClass: "text-on-surface",
        balance: "Balance: $9,877.05",
    },
    {
        icon: Tv,
        iconClass: "text-primary",
        title: "Netflix Subscription",
        meta: "Oct 12, 2024 • Lifestyle",
        status: "Completed",
        statusStyle: "primary",
        amount: "- $19.99",
        amountClass: "text-on-surface",
        balance: "Balance: $10,031.05",
    },
];

function StatusBadge({
    label,
    variant,
}: {
    label: string;
    variant: "primary" | "tertiary";
}) {
    if (variant === "tertiary") {
        return (
            <span className="rounded-full bg-tertiary-fixed px-3 py-1 font-label text-[0.625rem] font-bold uppercase text-on-tertiary-fixed-variant">
                {label}
            </span>
        );
    }
    return (
        <span className="rounded-full bg-primary-fixed px-3 py-1 font-label text-[0.625rem] font-bold uppercase text-on-primary-fixed-variant">
            {label}
        </span>
    );
}

function TransactionRow({ row }: { row: TxRow }) {
    const Icon = row.icon;
    return (
        <div className="group flex items-center justify-between rounded-2xl bg-surface-container-lowest p-4 shadow-sm transition-all hover:bg-white dark:hover:bg-slate-800">
            <div className="flex items-center gap-4">
                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low ${row.iconClass}`}
                >
                    <Icon className="size-6" strokeWidth={2} aria-hidden />
                </div>
                <div>
                    <h3 className="font-body text-[0.875rem] font-bold text-on-surface">
                        {row.title}
                    </h3>
                    <p className="font-label text-[0.6875rem] text-slate-500">
                        {row.meta}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-8">
                <StatusBadge
                    label={row.status}
                    variant={
                        row.statusStyle === "primary" ? "primary" : "tertiary"
                    }
                />
                <div className="text-right">
                    <p
                        className={`font-headline text-[1rem] font-bold ${row.amountClass}`}
                    >
                        {row.amount}
                    </p>
                    <p className="font-label text-[0.6875rem] text-slate-400">
                        {row.balance}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function TransactionsContent() {
    return (
        <>
            <div className="max-w-5xl px-10 pb-20 pt-28">
                <div className="mb-8">
                    <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">
                        Transaction History
                    </h1>
                    <p className="mt-1 font-body text-sm leading-relaxed text-on-surface-variant">
                        Monitor your global spending and incoming funds.
                    </p>
                </div>

                <TransactionsTable />

                <section className="mb-10">
                    <div className="py-3">
                        <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-outline">
                            October 2024
                        </h2>
                    </div>
                    <div className="mt-4 flex flex-col gap-[0.6rem]">
                        {october.map((row) => (
                            <TransactionRow key={row.title} row={row} />
                        ))}
                    </div>
                </section>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-2xl border-2 border-dashed border-slate-200 py-4 font-body text-sm font-bold text-slate-400 hover:border-primary hover:text-primary dark:border-slate-600"
                >
                    Load more history
                </Button>
            </div>

            <footer className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-slate-100 px-10 py-10 text-[0.6875rem] font-medium text-slate-400 sm:flex-row sm:items-center dark:border-slate-800">
                <div>
                    © {new Date().getFullYear()} PayQuick Premium Fintech
                    Services. All rights reserved.
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1 text-green-600 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-400">
                        <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
                        System Operational
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="#"
                            className="transition-colors hover:text-primary"
                        >
                            Security
                        </Link>
                        <Link
                            href="#"
                            className="transition-colors hover:text-primary"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="#"
                            className="transition-colors hover:text-primary"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    );
}
