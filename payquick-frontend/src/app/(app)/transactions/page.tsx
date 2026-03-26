import type { Metadata } from "next";

import { TransactionsHome } from "@/features/transactions/components/transactions-home";

export const metadata: Metadata = {
  title: "PayQuick | Transaction History",
  description: "Monitor your global spending and incoming funds.",
};

export default function TransactionsPage() {
  return <TransactionsHome />;
}
