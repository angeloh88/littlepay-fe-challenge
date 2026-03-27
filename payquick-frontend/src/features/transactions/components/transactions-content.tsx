import { TransactionsTable } from "./transactions-table";
import Link from "next/link";

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
