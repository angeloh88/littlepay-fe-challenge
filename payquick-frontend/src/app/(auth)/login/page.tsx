import type { Metadata } from "next";

import { LoginPage } from "@/features/auth/components/login-page";

export const metadata: Metadata = {
  title: "PayQuick | Secure Login",
  description: "Sign in to your PayQuick financial dashboard.",
};

export default function LoginRoute() {
  return <LoginPage />;
}
