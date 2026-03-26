import { Globe, Share2 } from "lucide-react";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="w-full border-t border-[#c2c6d8]/20 bg-[#f8f9ff] px-8 py-12 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="font-body text-[0.6875rem] text-slate-500">
          © {new Date().getFullYear()} PayQuick Financial Inc.
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link
            href="#"
            className="font-body text-[0.6875rem] text-slate-500 transition-colors hover:text-[#0057cd]"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="font-body text-[0.6875rem] text-slate-500 transition-colors hover:text-[#0057cd]"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="font-body text-[0.6875rem] text-slate-500 transition-colors hover:text-[#0057cd]"
          >
            Cookie Policy
          </Link>
          <Link
            href="#"
            className="font-body text-[0.6875rem] text-slate-500 transition-colors hover:text-[#0057cd]"
          >
            Status
          </Link>
        </div>
        <div className="flex gap-4">
          <Link
            href="#"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high text-slate-600 transition-colors hover:text-primary"
            aria-label="Web"
          >
            <Globe className="h-4 w-4" aria-hidden strokeWidth={2} />
          </Link>
          <Link
            href="#"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high text-slate-600 transition-colors hover:text-primary"
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" aria-hidden strokeWidth={2} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
