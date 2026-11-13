import type { Metadata } from "next";
import AdminPanel from "./AdminPanel";
import AdminGate from "./AdminGate";

export const metadata: Metadata = {
  title: "Site Settings | Wimbledon Executive Chauffeurs",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="page-enter">
      <AdminGate>
        <AdminPanel />
      </AdminGate>
    </main>
  );
}
