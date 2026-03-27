"use client";

import { useMemo, useRef, useEffect } from "react";
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

export function TransactionsTable() {
    const isInfiniteScroll = true;
    const {
        data,
        isLoading,
        isError,
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
                if (!hasNextPage || isFetchingNextPage) return;
                void fetchNextPage();
            },
            { root: null, rootMargin: "200px", threshold: 0 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) return <TransactionsTableSkeleton />;
    if (isError) return <div>Error</div>;

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
            <Button
                type="button"
                variant="outline"
                className="w-full rounded-2xl border-2 border-dashed border-slate-200 py-4 font-body text-sm font-bold text-slate-400 hover:border-primary hover:text-primary dark:border-slate-600"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage
                    ? "Loading more…"
                    : hasNextPage
                      ? "Load more transactions"
                      : "No more transactions"}
            </Button>
        </>
    );
}
