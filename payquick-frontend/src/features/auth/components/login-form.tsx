"use client";

import type { SubmitEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/features/auth/hooks/use-login-mutation";

export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { mutate, isPending, isError, isSuccess } = useLoginMutation();

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        mutate(
            { email: email.trim(), password: password },
            {
                onSuccess: () => {
                    router.push("/dashboard");
                },
            },
        );
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
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <button
                className="w-full rounded-xl bg-linear-to-br from-primary to-primary-container px-6 py-4 font-headline text-sm font-bold text-on-primary shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                type="submit"
                disabled={isPending}
            >
                {isPending ? "Signing in..." : "Sign In"}
            </button>
            {isError && (
                <div className="text-sm text-red-500">Login failed</div>
            )}
            {isSuccess && (
                <div className="text-sm text-green-500">Login successful</div>
            )}
        </form>
    );
}
