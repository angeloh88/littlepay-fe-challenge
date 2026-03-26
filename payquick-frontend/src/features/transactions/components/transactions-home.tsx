import { AppShell } from "@/features/dashboard/components/app-shell";

import { TransactionsContent } from "./transactions-content";

/** Full transaction history — from `design/transactions-code.html`. */
export function TransactionsHome() {
  return (
    <AppShell>
      <TransactionsContent />
    </AppShell>
  );
}
