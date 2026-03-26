import { Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HERO_MAIN = "/images/landing-hero-main.png";
const HERO_SMALL_TOP = "/images/landing-hero-small-top.png";
const HERO_SMALL_BOTTOM = "/images/landing-hero-small-bottom.png";

export function LandingHero() {
    return (
        <section className="relative overflow-hidden px-8 pb-32 pt-20">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
                <div className="z-10">
                    <span className="mb-6 inline-block rounded-full bg-primary-fixed px-4 py-1.5 font-label text-[0.6875rem] font-bold uppercase tracking-widest text-primary">
                        Secure Global Transfers
                    </span>
                    <h1 className="mb-8 font-headline text-6xl font-extrabold leading-[1.1] tracking-tighter text-on-surface md:text-7xl">
                        The Digital <br />
                        <span className="text-primary-container">Vault.</span>
                    </h1>
                    <p className="mb-10 max-w-xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
                        Experience institutional-grade security with the
                        fluidity of modern design. PayQuick redefines how you
                        send, receive, and manage your wealth across borders.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/register"
                            className="editorial-shadow rounded-xl bg-linear-to-br from-primary to-primary-container px-8 py-4 text-lg font-bold text-on-primary transition-transform active:scale-95"
                        >
                            Open Free Account
                        </Link>
                        <Link
                            href="#features"
                            className="rounded-xl bg-secondary-container px-8 py-4 text-lg font-bold text-on-secondary-container transition-all hover:bg-opacity-90"
                        >
                            Explore Wealth
                        </Link>
                    </div>
                </div>
                <div className="relative">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="relative col-span-8 aspect-4/5 overflow-hidden rounded-2xl editorial-shadow">
                            <Image
                                src={HERO_MAIN}
                                alt="Minimal architectural structure with clean lines and soft blue lighting on glass surfaces"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 45vw"
                                priority
                            />
                        </div>
                        <div className="col-span-4 flex flex-col gap-4">
                            <div className="relative aspect-square overflow-hidden rounded-2xl editorial-shadow">
                                <Image
                                    src={HERO_SMALL_TOP}
                                    alt="Abstract digital artwork with glowing blue neural pathways"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 33vw, 18vw"
                                />
                            </div>
                            <div className="relative aspect-square overflow-hidden rounded-2xl editorial-shadow">
                                <Image
                                    src={HERO_SMALL_BOTTOM}
                                    alt="Finance professional reviewing digital charts on a monitor"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 33vw, 18vw"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="glass-surface editorial-shadow absolute -bottom-8 -left-8 max-w-[280px] rounded-2xl p-6">
                        <div className="mb-4 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-fixed text-primary">
                                <Shield
                                    className="h-6 w-6"
                                    aria-hidden
                                    strokeWidth={2}
                                />
                            </div>
                            <div>
                                <div className="text-sm font-bold">
                                    Verified Secure
                                </div>
                                <div className="text-[0.6875rem] text-on-surface-variant">
                                    AES-256 Encryption
                                </div>
                            </div>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                            <div className="h-full w-3/4 bg-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
