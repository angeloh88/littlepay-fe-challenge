import { type Transaction } from "@/lib/services/transactions.api";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

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

function formatAmount(amountInCents: number, currency: string) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amountInCents / 100);
}

export function TransactionRow({ row }: { row: Transaction }) {
    const Icon = row.type === "TRANSFER" ? BanknoteArrowDown : BanknoteArrowUp;

    return (
        <div className="group flex items-center justify-between rounded-2xl bg-surface-container-lowest p-4 shadow-sm transition-all hover:bg-white dark:hover:bg-slate-800">
            <div className="flex items-center gap-4">
                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low ${row.type === "TRANSFER" ? "text-tertiary" : "text-primary"}`}
                >
                    <Icon className="size-6" strokeWidth={2} aria-hidden />
                </div>
                <div>
                    <h3 className="font-body text-[0.875rem] font-bold text-on-surface">
                        {formatAmount(row.amount_in_cents, row.currency)}
                    </h3>
                    <p className="font-label text-[0.6875rem] text-slate-500">
                        {row.type}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-8">
                <StatusBadge
                    label={row.status}
                    variant={row.status === "SUCCESS" ? "primary" : "tertiary"}
                />
                <div className="text-right">
                    <p className={`font-headline text-[1rem] font-bold`}>
                        {row.id}
                    </p>
                    <p className="font-label text-[0.6875rem] text-slate-400">
                        {row.created_at}
                    </p>
                </div>
            </div>
        </div>
    );
}
