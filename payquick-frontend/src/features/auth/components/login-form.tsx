"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
                <label
                    className="px-1 font-label text-[0.6875rem] font-semibold uppercase tracking-wider text-on-surface-variant"
                    htmlFor="email"
                >
                    Email Address
                </label>
                <div className="relative">
                    <input
                        className="w-full rounded-xl border-none bg-surface-container-highest px-4 py-3 font-body text-sm text-on-surface transition-all placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="alex@sterling.com"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-end justify-between px-1">
                    <label
                        className="font-label text-[0.6875rem] font-semibold uppercase tracking-wider text-on-surface-variant"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <a
                        className="text-[0.75rem] font-semibold text-primary hover:underline"
                        href="#"
                    >
                        Forgot Password?
                    </a>
                </div>
                <div className="relative">
                    <input
                        className="w-full rounded-xl border-none bg-surface-container-highest px-4 py-3 font-body text-sm text-on-surface transition-all placeholder:text-outline focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                    />
                </div>
            </div>
            <button
                className="w-full rounded-xl bg-linear-to-br from-primary to-primary-container px-6 py-4 font-headline text-sm font-bold text-on-primary shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                type="submit"
            >
                Sign In
            </button>
    </form>
  );
}
