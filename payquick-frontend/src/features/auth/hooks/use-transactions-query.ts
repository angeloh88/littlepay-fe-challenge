"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/lib/services/transactions.api";

export function useTransactionsQuery(page: number) {
    return useQuery({
        queryKey: ["transactions", page],
        queryFn: () => getTransactions(page),
        placeholderData: (prev) => prev, // ✅ replaces keepPreviousData
    });
}
