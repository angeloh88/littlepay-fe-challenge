"use client";

import { useMutation } from "@tanstack/react-query";
import { login, type LoginRequest } from "@/lib/services/auth.api";

export function useLoginMutation() {
    return useMutation({
        mutationFn: (credentials: LoginRequest) => login(credentials),
        retry: false,
    });
}
