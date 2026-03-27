import { useInfiniteQuery } from "@tanstack/react-query";
import { getTransactions } from "@/lib/services/transactions.api";
import type { TransactionsResponse } from "@/lib/services/transactions.api";

export function useInfiniteTransactionsQuery() {
    return useInfiniteQuery<TransactionsResponse>({
        queryKey: ["transactions"],
        queryFn: ({ pageParam }) => getTransactions(pageParam as number),

        initialPageParam: 1,

        getNextPageParam: (lastPage) => {
            const { current_page, total_pages } = lastPage.pagination;

            return current_page < total_pages ? current_page + 1 : undefined;
        },
    });
}
