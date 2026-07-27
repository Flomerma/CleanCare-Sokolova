import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";
import { isAuthenticated } from "@/lib/auth";
import { storageIsEphemeral } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authenticated = await isAuthenticated();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {authenticated ? <AdminDashboard ephemeral={storageIsEphemeral} /> : <AdminLogin />}
    </section>
  );
}
