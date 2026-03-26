import {
    ArrowRight,
    CheckCircle,
    FileQuestion,
    LineChart,
    Send,
    ShoppingBag,
    UtensilsCrossed,
} from "lucide-react";

export function LandingFeatures() {
    return (
        <section id="features" className="bg-surface-container-low px-8 py-24">
            <div className="mx-auto max-w-7xl">
                <div className="mb-16">
                    <h2 className="mb-4 font-headline text-3xl font-bold">
                        Architected for speed.
                    </h2>
                    <p className="max-w-lg text-on-surface-variant">
                        Everything you need to move money at the speed of
                        thought, wrapped in an interface that stays out of your
                        way.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="group rounded-[1.5rem] bg-surface-container-lowest p-10 transition-all hover:bg-surface-bright editorial-shadow md:col-span-2">
                        <div className="flex flex-col items-center gap-12 md:flex-row">
                            <div className="flex-1">
                                <div className="mb-6 text-primary-container">
                                    <Send
                                        className="h-9 w-9"
                                        aria-hidden
                                        strokeWidth={2}
                                    />
                                </div>
                                <h3 className="mb-4 font-headline text-2xl font-bold">
                                    Instant Global Sending
                                </h3>
                                <p className="mb-8 text-on-surface-variant">
                                    Send funds to 140+ countries in seconds. No
                                    hidden fees, no weekend delays. Just pure,
                                    borderless liquidity.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm font-medium">
                                        <CheckCircle
                                            className="h-5 w-5 shrink-0 text-primary"
                                            aria-hidden
                                            strokeWidth={2}
                                        />
                                        Real-time FX rates
                                    </li>
                                    <li className="flex items-center gap-3 text-sm font-medium">
                                        <CheckCircle
                                            className="h-5 w-5 shrink-0 text-primary"
                                            aria-hidden
                                            strokeWidth={2}
                                        />
                                        Instant bank settlement
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full rounded-2xl bg-surface-container-low p-6 md:w-64">
                                <div className="space-y-4">
                                    <div className="rounded-xl bg-surface-container-lowest p-4 editorial-shadow">
                                        <div className="mb-1 text-[0.6875rem] font-bold uppercase tracking-wider text-slate-500">
                                            Amount
                                        </div>
                                        <div className="font-headline text-xl font-bold">
                                            $12,450.00
                                        </div>
                                    </div>
                                    <div className="rounded-xl bg-surface-container-lowest p-4 editorial-shadow">
                                        <div className="mb-1 text-[0.6875rem] font-bold uppercase tracking-wider text-slate-500">
                                            Recipient
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-full bg-secondary-fixed" />
                                            <div className="text-sm font-bold">
                                                Studio Alpha
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-on-primary"
                                    >
                                        Execute Transfer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between rounded-[1.5rem] bg-primary p-10 text-on-primary editorial-shadow">
                        <div>
                            <FileQuestion
                                className="mb-6 h-9 w-9"
                                aria-hidden
                                strokeWidth={2}
                            />
                            <h3 className="mb-4 font-headline text-2xl font-bold">
                                Request with Link
                            </h3>
                            <p className="leading-relaxed opacity-80">
                                Create professional payment requests that your
                                clients can settle with a single tap. Beautiful,
                                fast, and secure.
                            </p>
                        </div>
                        <div className="mt-8 border-t border-white/10 pt-8">
                            <button
                                type="button"
                                className="group flex items-center gap-2 font-bold"
                            >
                                Create link
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>

                    <div className="rounded-[1.5rem] bg-surface-container-lowest p-10 editorial-shadow">
                        <div className="mb-6 text-tertiary">
                            <LineChart
                                className="h-9 w-9"
                                aria-hidden
                                strokeWidth={2}
                            />
                        </div>
                        <h3 className="mb-4 font-headline text-2xl font-bold">
                            Live Insights
                        </h3>
                        <p className="text-on-surface-variant">
                            Analyze your cash flow with editorial-grade charts
                            that reveal your true spending patterns.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-8 overflow-hidden rounded-[1.5rem] bg-surface-container-highest p-10 md:col-span-2 md:flex-row">
                        <div className="flex-1">
                            <h3 className="mb-4 font-headline text-2xl font-bold">
                                Unified Transaction Ledger
                            </h3>
                            <p className="text-on-surface-variant">
                                A singular, crystalline view of every movement
                                across all your accounts. One source of truth.
                            </p>
                        </div>
                        <div className="flex w-full flex-col gap-2 md:w-[400px]">
                            <div className="flex items-center justify-between rounded-xl bg-surface-container-lowest px-6 py-4 editorial-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-fixed text-on-secondary-fixed">
                                        <ShoppingBag
                                            className="h-5 w-5"
                                            aria-hidden
                                            strokeWidth={2}
                                        />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">
                                            Apple Store
                                        </div>
                                        <div className="text-xs text-on-surface-variant">
                                            Electronics • Today
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold">
                                        -$1,299.00
                                    </div>
                                    <div className="inline-block rounded-full bg-primary-fixed px-2 py-0.5 text-[0.6875rem] text-on-primary-fixed-variant">
                                        Completed
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-xl bg-surface-container-lowest px-6 py-4 editorial-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
                                        <UtensilsCrossed
                                            className="h-5 w-5"
                                            aria-hidden
                                            strokeWidth={2}
                                        />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">
                                            Le Bernardin
                                        </div>
                                        <div className="text-xs text-on-surface-variant">
                                            Dining • Yesterday
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold">
                                        -$420.50
                                    </div>
                                    <div className="inline-block rounded-full bg-tertiary-fixed px-2 py-0.5 text-[0.6875rem] text-on-tertiary-fixed-variant">
                                        Pending
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
