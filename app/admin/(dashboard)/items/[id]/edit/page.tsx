import { prisma } from "@/lib/prisma";
import { updateItem } from "@/app/actions/items";
import { FormInput } from "@/components/admin/FormInput";
import { FormTextarea } from "@/components/admin/FormTextarea";
import { FormSelect } from "@/components/admin/FormSelect";
import { SubmitButton } from "@/components/admin/SubmitButton";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

export default async function EditItemPage({
  params
}: {
  params: { id: string };
}) {
  await requireAdmin();

  const itemId = parseInt(params.id);
  if (isNaN(itemId)) {
    notFound();
  }

  const [item, categories] = await Promise.all([
    prisma.menuItem.findUnique({
      where: { id: itemId }
    }),
    prisma.menuCategory.findMany({
      orderBy: { sortOrder: "asc" }
    })
  ]);

  if (!item) {
    notFound();
  }

  async function handleSubmit(formData: FormData): Promise<void> {
    "use server";
    const result = await updateItem(itemId, formData);
    if (result.success) {
      redirect("/admin/items");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50">Edit Menu Item</h1>
        <p className="mt-1 text-sm text-slate-400">
          Update item details
        </p>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <form action={handleSubmit} className="space-y-6">
          <FormInput
            label="Name"
            name="name"
            required
            defaultValue={item.name}
          />

          <FormTextarea
            label="Description"
            name="description"
            required
            defaultValue={item.description}
            rows={4}
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <FormInput
              label="Price"
              name="price"
              type="number"
              required
              step="0.01"
              min="0"
              defaultValue={(item.priceCents / 100).toFixed(2)}
            />

            <FormSelect
              label="Category"
              name="categoryId"
              required
              defaultValue={item.categoryId}
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name
              }))}
            />
          </div>

          <FormInput
            label="Image URL"
            name="imageUrl"
            type="url"
            defaultValue={item.imageUrl || ""}
            placeholder="https://example.com/image.jpg or /menu-item.svg"
          />

          <FormInput
            label="Tags (comma-separated)"
            name="tags"
            defaultValue={item.tags.join(", ")}
            placeholder="vegetarian, gluten-free, signature"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <FormSelect
              label="Availability"
              name="isAvailable"
              defaultValue={item.isAvailable.toString()}
              options={[
                { value: "true", label: "Available" },
                { value: "false", label: "Unavailable" }
              ]}
            />

            <FormInput
              label="Sort Order"
              name="sortOrder"
              type="number"
              defaultValue={item.sortOrder}
              min={0}
            />
          </div>

          <div className="flex items-center gap-4">
            <SubmitButton>Update Item</SubmitButton>
            <Link href="/admin/items" className="btn-outline">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
