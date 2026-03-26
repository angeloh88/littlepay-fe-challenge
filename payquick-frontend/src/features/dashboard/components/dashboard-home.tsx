import { AppShell } from "./app-shell";
import { DashboardContent } from "./dashboard-content";

/** Post-login dashboard — layout from `design/dashboard-code.html`. */
export function DashboardHome() {
  return (
    <AppShell>
      <DashboardContent />
    </AppShell>
  );
}
