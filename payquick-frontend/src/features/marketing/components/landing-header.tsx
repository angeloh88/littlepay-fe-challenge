import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#f8f9ff] dark:bg-slate-950">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="font-headline text-2xl font-bold tracking-tighter text-[#191c20] dark:text-white"
        >
          PayQuick
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#"
            className="border-b-2 border-[#0057cd] pb-1 font-headline text-sm font-semibold tracking-tight text-[#0057cd] dark:text-[#0d6efd]"
          >
            Personal
          </Link>
          <Link
            href="#"
            className="font-headline text-sm font-semibold tracking-tight text-slate-600 transition-colors duration-200 hover:text-[#0d6efd] dark:text-slate-400"
          >
            Business
          </Link>
          <Link
            href="#"
            className="font-headline text-sm font-semibold tracking-tight text-slate-600 transition-colors duration-200 hover:text-[#0d6efd] dark:text-slate-400"
          >
            Wealth
          </Link>
          <Link
            href="#"
            className="font-headline text-sm font-semibold tracking-tight text-slate-600 transition-colors duration-200 hover:text-[#0d6efd] dark:text-slate-400"
          >
            Security
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="editorial-shadow rounded-xl bg-linear-to-br from-primary to-primary-container px-6 py-2 font-semibold text-on-primary transition-transform duration-150 active:scale-95"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
