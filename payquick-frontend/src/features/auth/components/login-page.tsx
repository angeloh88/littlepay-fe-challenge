import Image from "next/image";
import Link from "next/link";

import { LoginForm } from "./login-form";

const SIDEBAR_IMAGE = "/images/login-sidebar.png";

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-surface font-body text-on-surface md:flex-row">
      <aside className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-surface-container-low p-12 md:flex lg:w-3/5">
        <div className="absolute inset-0 z-0">
          <Image
            src={SIDEBAR_IMAGE}
            alt="Modern glass skyscraper with geometric lines against the sky"
            fill
            className="object-cover opacity-80 mix-blend-overlay"
            sizes="(max-width: 768px) 0vw, 50vw"
            priority
          />
          <div
            className="absolute inset-0 bg-black/40"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-linear-to-br from-primary/15 to-transparent"
            aria-hidden
          />
        </div>
        <div className="relative z-10 max-w-lg">
          <h1 className="mb-6 font-headline text-[3.5rem] font-extrabold leading-none tracking-tighter text-white drop-shadow-md">
            The Digital <span className="text-primary">Vault</span>
          </h1>
          <p className="max-w-md font-body text-lg leading-relaxed text-white/90">
            Experience financial management with the stillness of modern
            architecture. Precision in every transaction, security in every
            layer.
          </p>
          <div className="mt-12 flex gap-4">
            <div className="h-1 w-12 rounded-full bg-white" />
            <div className="h-1 w-4 rounded-full bg-white/30" />
            <div className="h-1 w-4 rounded-full bg-white/30" />
          </div>
        </div>
      </aside>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center bg-surface p-6 md:p-12 lg:p-24">
        <div className="absolute left-10 top-10 flex items-center gap-2 md:left-auto md:right-10">
          <Link
            href="/"
            className="font-headline text-2xl font-bold tracking-tighter text-on-surface"
          >
            PayQuick
          </Link>
        </div>

        <div className="w-full max-w-md pt-14 md:pt-0">
          <div className="mb-10">
            <h2 className="mb-2 font-headline text-2xl font-bold leading-[1.2] tracking-tight text-on-surface">
              Welcome Back
            </h2>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Access your premium financial dashboard.
            </p>
          </div>

          <div className="rounded-xl bg-surface-container-low p-1 editorial-shadow">
            <div className="rounded-xl bg-surface-container-lowest p-8">
              <LoginForm />
            </div>
          </div>

          <div className="mt-8 space-y-6 text-center">
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="ml-1 font-bold text-primary hover:underline"
              >
                Create Account
              </Link>
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1.5">
              <span
                className="h-2 w-2 rounded-full bg-[#00c853]"
                aria-hidden
              />
              <span className="font-label text-[0.6875rem] font-medium tracking-tight text-on-surface-variant">
                System Operational
              </span>
            </div>
          </div>
        </div>

        <footer className="absolute bottom-6 hidden w-full px-12 md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <span className="font-label text-[0.6875rem] text-outline">
              © {new Date().getFullYear()} PayQuick Financial Inc.
            </span>
            <div className="flex gap-6">
              <Link
                href="#"
                className="font-label text-[0.6875rem] text-outline transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="font-label text-[0.6875rem] text-outline transition-colors hover:text-primary"
              >
                Terms
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
