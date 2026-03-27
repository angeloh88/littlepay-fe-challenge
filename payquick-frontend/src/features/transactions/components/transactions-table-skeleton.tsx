import { Skeleton } from "@/components/ui/skeleton";

export function TransactionRowSkeleton() {
    return (
        <div
            className="flex items-center justify-between rounded-2xl bg-surface-container-lowest p-4 shadow-sm"
            aria-hidden
        >
            <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-8">
                <div className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="mt-1 flex justify-end">
                        <Skeleton className="h-3 w-44" />
                    </div>
                </div>
                <Skeleton className="h-6 w-14 shrink-0 rounded-full" />
            </div>
        </div>
    );
}

type TransactionsTableSkeletonProps = {
    count?: number;
};

export function TransactionsTableSkeleton({
    count = 8,
}: TransactionsTableSkeletonProps) {
    return (
        <div role="status" aria-busy="true">
            <span className="sr-only">Loading transactions</span>
            <section className="mb-10">
                <Skeleton className="mb-4 h-4 w-40" />
                <div className="flex flex-col gap-[0.6rem]">
                    {Array.from({ length: count }, (_, i) => (
                        <TransactionRowSkeleton key={i} />
                    ))}
                </div>
            </section>
        </div>
    );
}
