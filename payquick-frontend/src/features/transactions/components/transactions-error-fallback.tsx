import { CircleAlert, RefreshCw } from "lucide-react";

function getTransactionErrorDetail(error: unknown): string {
    return error instanceof Error && error.message
        ? error.message
        : "Check your connection and try again.";
}

function ErrorAlertIcon({ size }: { size: "lg" | "sm" }) {
    const box = size === "lg" ? "h-12 w-12" : "h-10 w-10";
    const icon = size === "lg" ? "size-6" : "size-5";
    return (
        <div
            className={`flex shrink-0 items-center justify-center rounded-xl bg-surface-container-low text-tertiary ${box}`}
            aria-hidden
        >
            <CircleAlert className={icon} strokeWidth={2} />
        </div>
    );
}

type TransactionsQueryErrorFallbackProps = {
    error: unknown;
    onRetry: () => void;
    variant: "initial" | "loadMore";
};

function TransactionsQueryErrorFallback({
    error,
    onRetry,
    variant,
}: TransactionsQueryErrorFallbackProps) {
    const detail = getTransactionErrorDetail(error);
    const isInitial = variant === "initial";

    const srOnly = isInitial
        ? `Failed to load transactions. ${detail} Use Try again to retry.`
        : `Could not load more transactions. ${detail} Use Try again to retry.`;

    return (
        <div
            role="alert"
            className={`rounded-2xl bg-surface-container-lowest p-6 shadow-sm`}
        >
            <span className="sr-only">{srOnly}</span>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                <ErrorAlertIcon size="lg" />
                <div className="min-w-0 flex-1">
                    <h2 className="font-headline text-lg font-bold text-on-surface">
                        {isInitial
                            ? "Couldn't load transactions"
                            : "Couldn't load older transactions"}
                    </h2>
                    <p className="mt-1 font-body text-sm leading-relaxed text-on-surface-variant">
                        {detail}
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-linear-to-br from-primary to-primary-container px-6 py-4 font-headline text-sm font-bold text-on-primary shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.98] sm:w-auto cursor-pointer"
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

export function TransactionsInitialErrorFallback(
    props: Omit<TransactionsQueryErrorFallbackProps, "variant">,
) {
    return <TransactionsQueryErrorFallback {...props} variant="initial" />;
}

export function TransactionsLoadMoreErrorBanner(
    props: Omit<TransactionsQueryErrorFallbackProps, "variant">,
) {
    return <TransactionsQueryErrorFallback {...props} variant="loadMore" />;
}
