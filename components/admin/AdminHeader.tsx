import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth";

export async function AdminHeader() {
  const admin = await getCurrentAdmin();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-slate-50">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {admin && (
          <div className="text-sm text-slate-400">
            <span className="text-slate-300">{admin.name || admin.email}</span>
          </div>
        )}
        <Link
          href="/"
          target="_blank"
          className="text-sm text-slate-400 hover:text-brand-300"
        >
          View Site →
        </Link>
      </div>
    </header>
  );
}
