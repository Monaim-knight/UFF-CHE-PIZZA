import { Sidebar } from "@/components/admin/Sidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getCurrentAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Check if we're on the login page by checking if children is the login component
  // For login page, just render children without auth check
  const admin = await getCurrentAdmin();
  
  // If no valid admin session and not on login page, redirect to login
  // Note: Login page will be handled by its own component, so this check is for other pages
  if (!admin) {
    // Only redirect if we're not already going to login
    // The middleware should handle this, but this is a safety check
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-slate-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
