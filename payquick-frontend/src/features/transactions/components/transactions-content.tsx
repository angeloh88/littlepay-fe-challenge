import { TransactionsTable } from "./transactions-table";

export function TransactionsContent() {
    return (
        <>
            <div className="max-w-5xl px-10 pb-20 pt-8">
                <div className="mb-8">
                    <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">
                        Transaction History
                    </h1>
                    <p className="mt-1 font-body text-sm leading-relaxed text-on-surface-variant">
                        Monitor your global spending and incoming funds.
                    </p>
                </div>

                <TransactionsTable />
            </div>
        </>
    );
}
