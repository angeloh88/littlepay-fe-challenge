import Link from "next/link";

export function LandingCta() {
    return (
        <section className="px-8 py-32">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#191c20] p-12 md:p-24">
                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <h2 className="mb-8 font-headline text-4xl font-extrabold text-white md:text-6xl">
                        Ready to enter the vault?
                    </h2>
                    <p className="mb-12 text-xl text-white/60">
                        Join 2M+ premium members who have upgraded their
                        financial life with PayQuick.
                    </p>
                    <div className="flex flex-col justify-center gap-6 sm:flex-row">
                        <Link
                            href="/register"
                            className="rounded-xl bg-white px-10 py-5 text-lg font-bold text-[#191c20] transition-all hover:bg-slate-100"
                        >
                            Get Started Now
                        </Link>
                        <Link
                            href="#"
                            className="rounded-xl border border-white/20 px-10 py-5 text-lg font-bold text-white transition-all hover:bg-white/5"
                        >
                            Talk to Sales
                        </Link>
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary opacity-20 blur-[120px]" />
                <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary-container opacity-20 blur-[120px]" />
            </div>
        </section>
    );
}
