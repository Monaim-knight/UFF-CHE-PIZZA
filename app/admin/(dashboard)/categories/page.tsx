import { prisma } from "@/lib/prisma";
import { AdminTable } from "@/components/admin/AdminTable";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { deleteCategory } from "@/app/actions/categories";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function CategoriesPage() {
  await requireAdmin();

  const categories = await prisma.menuCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: {
        select: { items: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">Categories</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage menu categories
          </p>
        </div>
        <Link href="/admin/categories/new" className="btn-primary">
          + New Category
        </Link>
      </div>

      <AdminTable
        headers={["Name", "Items", "Sort Order", "Visible", "Actions"]}
      >
        {categories.map((category) => (
          <tr key={category.id} className="hover:bg-slate-900/50">
            <td className="px-6 py-4">
              <div>
                <p className="font-medium text-slate-50">{category.name}</p>
                {category.description && (
                  <p className="text-sm text-slate-400">
                    {category.description}
                  </p>
                )}
              </div>
            </td>
            <td className="px-6 py-4 text-slate-300">
              {category._count.items}
            </td>
            <td className="px-6 py-4 text-slate-300">
              {category.sortOrder}
            </td>
            <td className="px-6 py-4">
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  category.isVisible
                    ? "bg-green-500/20 text-green-400"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {category.isVisible ? "Visible" : "Hidden"}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/categories/${category.id}/edit`}
                  className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-800"
                >
                  Edit
                </Link>
                <form action={deleteCategory.bind(null, category.id)}>
                  <DeleteButton itemName={category.name} />
                </form>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
