import type { Metadata } from "next";

import { DashboardHome } from "@/features/dashboard/components/dashboard-home";

export const metadata: Metadata = {
  title: "PayQuick Dashboard",
  description: "Your PayQuick financial dashboard.",
};

export default function DashboardPage() {
  return <DashboardHome />;
}
