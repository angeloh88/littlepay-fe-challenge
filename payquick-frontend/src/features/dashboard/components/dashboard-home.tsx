import { DashboardContent } from "./dashboard-content";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopBar } from "./dashboard-top-bar";

/** Post-login dashboard — layout from `design/dashboard-code.html`. */
export function DashboardHome() {
  return (
    <div className="min-h-screen bg-surface font-body text-on-surface antialiased">
      <DashboardSidebar />
      <main className="ml-64 min-h-screen">
        <DashboardTopBar />
        <DashboardContent />
      </main>
    </div>
  );
}
