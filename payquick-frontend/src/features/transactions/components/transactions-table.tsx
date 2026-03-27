"use client";

import { useState } from "react";
import { useTransactionsQuery } from "@/features/auth/hooks/use-transactions-query";
import { Button } from "@/components/ui/button";
import { type Transaction } from "@/lib/services/transactions.api";
import { TransactionRow } from "./transactions-row";

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
    const [page, setPage] = useState<number>(1);
    const { data, isLoading, isError } = useTransactionsQuery(page);

    const groupedTransactions = nesttedGroupTransactionsByYearMonth(
        data?.data || [],
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    console.log(groupedTransactions);
    return (
        <>
            {Object.entries(groupedTransactions)
                .sort(
                    (a, b) =>
                        new Date(b[0]).getTime() - new Date(a[0]).getTime(),
                )
                .map(([year, months]) => (
                    <section key={year} className="mb-10">
                        {Object.entries(months)
                            .sort(
                                (a, b) =>
                                    new Date(b[0]).getTime() -
                                    new Date(a[0]).getTime(),
                            )
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
            <Button
                type="button"
                variant="outline"
                className="w-full rounded-2xl border-2 border-dashed border-slate-200 py-4 font-body text-sm font-bold text-slate-400 hover:border-primary hover:text-primary dark:border-slate-600"
                onClick={() => setPage(page + 1)}
            >
                Load more history
            </Button>
        </>
    );
}
