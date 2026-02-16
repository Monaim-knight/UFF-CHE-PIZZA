import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";

export default async function AdminDashboard() {
  await requireAdmin();

  const [categoriesCount, itemsCount, recentItems] = await Promise.all([
    prisma.menuCategory.count(),
    prisma.menuItem.count(),
    prisma.menuItem.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true }
    })
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          Overview of your restaurant management
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AdminCard
          title="Total Categories"
          value={categoriesCount}
          icon="📁"
        />
        <AdminCard title="Total Menu Items" value={itemsCount} icon="🍽️" />
        <AdminCard
          title="Active Items"
          value={
            await prisma.menuItem.count({ where: { isAvailable: true } })
          }
          icon="✅"
        />
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-50">Quick links</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/categories"
            className="rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-slate-50"
          >
            📁 Categories
          </Link>
          <Link
            href="/admin/items"
            className="rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-slate-50"
          >
            🍽️ Menu Items
          </Link>
          <Link
            href="/admin/content"
            className="rounded-lg border border-brand-500/50 bg-brand-500/10 px-4 py-2.5 text-sm font-medium text-brand-300 transition hover:bg-brand-500/20"
          >
            ✏️ Site Content
          </Link>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Use Site Content to edit homepage and menu page text (hero, about, order section, etc.).
        </p>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-50">
            Recently Added Items
          </h2>
          <Link
            href="/admin/items"
            className="text-sm text-brand-400 hover:text-brand-300"
          >
            View all →
          </Link>
        </div>

        {recentItems.length === 0 ? (
          <p className="text-sm text-slate-400">No items yet</p>
        ) : (
          <div className="space-y-3">
            {recentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/50 p-4"
              >
                <div>
                  <p className="font-medium text-slate-50">{item.name}</p>
                  <p className="text-sm text-slate-400">
                    {item.category.name}
                  </p>
                </div>
                <Link
                  href={`/admin/items/${item.id}/edit`}
                  className="text-sm text-brand-400 hover:text-brand-300"
                >
                  Edit →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
