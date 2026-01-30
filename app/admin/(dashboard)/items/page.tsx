import { prisma } from "@/lib/prisma";
import { AdminTable } from "@/components/admin/AdminTable";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { deleteItem } from "@/app/actions/items";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ItemsSearch } from "@/components/admin/ItemsSearch";

interface ItemsPageProps {
  searchParams: {
    search?: string;
    page?: string;
  };
}

const ITEMS_PER_PAGE = 20;

export default async function ItemsPage({ searchParams }: ItemsPageProps) {
  await requireAdmin();

  const search = searchParams.search || "";
  const page = parseInt(searchParams.page || "1");
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } }
        ]
      }
    : {};

  const [items, totalItems] = await Promise.all([
    prisma.menuItem.findMany({
      where,
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: { createdAt: "desc" },
      include: {
        category: true
      }
    }),
    prisma.menuItem.count({ where })
  ]);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  function formatPrice(cents: number): string {
    return `$${(cents / 100).toFixed(2)}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">Menu Items</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage menu items and pricing
          </p>
        </div>
        <Link href="/admin/items/new" className="btn-primary">
          + New Item
        </Link>
      </div>

      <ItemsSearch search={search} />

      <AdminTable
        headers={[
          "Name",
          "Category",
          "Price",
          "Available",
          "Sort Order",
          "Actions"
        ]}
      >
        {items.map((item) => (
          <tr key={item.id} className="hover:bg-slate-900/50">
            <td className="px-6 py-4">
              <div>
                <p className="font-medium text-slate-50">{item.name}</p>
                <p className="text-sm text-slate-400 line-clamp-1">
                  {item.description}
                </p>
              </div>
            </td>
            <td className="px-6 py-4 text-slate-300">
              {item.category.name}
            </td>
            <td className="px-6 py-4 text-slate-300">
              {formatPrice(item.priceCents)}
            </td>
            <td className="px-6 py-4">
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  item.isAvailable
                    ? "bg-green-500/20 text-green-400"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {item.isAvailable ? "Yes" : "No"}
              </span>
            </td>
            <td className="px-6 py-4 text-slate-300">{item.sortOrder}</td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/items/${item.id}/edit`}
                  className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-800"
                >
                  Edit
                </Link>
                <form action={deleteItem.bind(null, item.id)}>
                  <DeleteButton itemName={item.name} />
                </form>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/admin/items?page=${page - 1}${search ? `&search=${search}` : ""}`}
              className="rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              Previous
            </Link>
          )}
          <span className="text-sm text-slate-400">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/admin/items?page=${page + 1}${search ? `&search=${search}` : ""}`}
              className="rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
