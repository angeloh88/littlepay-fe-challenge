"use client";

import { useMemo, useRef, useEffect } from "react";
import { CircleAlert, RefreshCw } from "lucide-react";
import { useInfiniteTransactionsQuery } from "@/features/auth/hooks/use-inifinitetransactions-query";
import { Button } from "@/components/ui/button";
import { type Transaction } from "@/lib/services/transactions.api";
import { TransactionRow } from "./transactions-row";
import {
    TransactionRowSkeleton,
    TransactionsTableSkeleton,
} from "./transactions-table-skeleton";

function nesttedGroupTransactionsByYearMonth(transactions: Transaction[]) {
    return transactions.reduce(
        (acc, transaction) => {
            const year = new Date(transaction.created_at).getFullYear();
            const month = new Date(transaction.created_at).getMonth();
            acc[year] = acc[year] || [];
            acc[year][month] = acc[year][month] || [];
            acc[year][month].push(transaction);
            return acc;
        },
        {} as Record<number, Record<number, Transaction[]>>,
    );
}

function monthIndexToHeading(monthIndex: number): string {
    return new Date(2000, monthIndex, 1).toLocaleString("en-US", {
        month: "long",
    });
}

function TransactionsInitialErrorFallback({
    error,
    onRetry,
}: {
    error: unknown;
    onRetry: () => void;
}) {
    const detail =
        error instanceof Error && error.message
            ? error.message
            : "Check your connection and try again.";

    return (
        <div
            role="alert"
            className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm"
        >
            <span className="sr-only">
                Failed to load transactions. {detail} Use Try again to retry.
            </span>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-container-low text-tertiary"
                    aria-hidden
                >
                    <CircleAlert className="size-6" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                    <h2 className="font-headline text-lg font-bold text-on-surface">
                        Couldn&apos;t load transactions
                    </h2>
                    <p className="mt-1 font-body text-sm leading-relaxed text-on-surface-variant">
                        {detail}
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-linear-to-br from-primary to-primary-container px-6 py-4 font-headline text-sm font-bold text-on-primary shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.98] sm:w-auto"
                    onClick={() => onRetry()}
                >
                    <RefreshCw
                        className="size-5 shrink-0"
                        strokeWidth={2}
                        aria-hidden
                    />
                    Try again
                </button>
            </div>
        </div>
    );
}

function TransactionsLoadMoreErrorBanner({
    error,
    onRetry,
}: {
    error: unknown;
    onRetry: () => void;
}) {
    const detail =
        error instanceof Error && error.message
            ? error.message
            : "Check your connection and try again.";

    return (
        <div
            role="alert"
            className="mt-4 rounded-2xl border border-slate-200 bg-surface-container-lowest p-4 shadow-sm dark:border-slate-600"
        >
            <span className="sr-only">
                Could not load more transactions. {detail} Use Try again to
                retry.
            </span>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex gap-3 sm:min-w-0 sm:flex-1">
                    <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-low text-tertiary"
                        aria-hidden
                    >
                        <CircleAlert className="size-5" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                        <p className="font-headline text-sm font-bold text-on-surface">
                            Couldn&apos;t load older transactions
                        </p>
                        <p className="mt-0.5 font-body text-sm leading-relaxed text-on-surface-variant">
                            {detail}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-transparent px-4 py-3 font-headline text-sm font-bold text-primary hover:border-primary hover:bg-primary/5 dark:border-slate-600 sm:w-auto"
                    onClick={() => onRetry()}
                >
                    <RefreshCw
                        className="size-4 shrink-0"
                        strokeWidth={2}
                        aria-hidden
                    />
                    Try again
                </button>
            </div>
        </div>
    );
}

export function TransactionsTable() {
    const isInfiniteScroll = true;
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isFetchNextPageError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteTransactionsQuery();

    const groupedTransactions = useMemo(() => {
        const allTransactions = data?.pages.flatMap((page) => page.data) ?? [];

        return nesttedGroupTransactionsByYearMonth(allTransactions);
    }, [data]);

    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (!first?.isIntersecting) return;
                if (isFetchNextPageError) return;
                if (!hasNextPage || isFetchingNextPage) return;
                void fetchNextPage();
            },
            { root: null, rootMargin: "200px", threshold: 0 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, isFetchNextPageError, fetchNextPage]);

    if (isLoading) return <TransactionsTableSkeleton />;
    if (isError && !data) {
        return (
            <TransactionsInitialErrorFallback
                error={error}
                onRetry={() => void refetch()}
            />
        );
    }

    if (!data || data.pages.length === 0) {
        return <div>No transactions yet</div>;
    }

    return (
        <>
            {Object.entries(groupedTransactions)
                .sort((a, b) => Number(b[0]) - Number(a[0]))
                .map(([year, months]) => (
                    <section key={year} className="mb-10">
                        {Object.entries(months)
                            .sort((a, b) => Number(b[0]) - Number(a[0]))
                            .map(([month, transactions]) => (
                                <section key={month} className="mb-10">
                                    <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-outline">
                                        {monthIndexToHeading(
                                            Number.parseInt(month, 10),
                                        )}{" "}
                                        {year}
                                    </h3>
                                    <div className="mt-4 flex flex-col gap-[0.6rem]">
                                        {transactions.map((row) => (
                                            <TransactionRow
                                                key={row.id}
                                                row={row}
                                            />
                                        ))}
                                    </div>
                                </section>
                            ))}
                    </section>
                ))}
            {isFetchNextPageError && !isFetchingNextPage && (
                <TransactionsLoadMoreErrorBanner
                    error={error}
                    onRetry={() => void fetchNextPage()}
                />
            )}
            {isFetchingNextPage && (
                <div
                    className="mt-4 flex flex-col gap-[0.6rem]"
                    role="status"
                    aria-busy="true"
                >
                    <span className="sr-only">Loading more transactions</span>
                    <TransactionRowSkeleton />
                    <TransactionRowSkeleton />
                    <TransactionRowSkeleton />
                </div>
            )}
            {isInfiniteScroll && <div ref={sentinelRef} aria-hidden />}
            {!isFetchNextPageError && (
                <Button
                    type="button"
                    variant="outline"
                    className="mt-2 w-full rounded-2xl border-2 border-dashed border-slate-200 py-4 font-body text-sm font-bold text-slate-400 hover:border-primary hover:text-primary dark:border-slate-600"
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? "Loading more…"
                        : hasNextPage
                          ? "Load more transactions"
                          : "No more transactions"}
                </Button>
            )}
        </>
    );
}
