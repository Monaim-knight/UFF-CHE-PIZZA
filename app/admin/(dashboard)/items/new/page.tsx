import { prisma } from "@/lib/prisma";
import { createItem } from "@/app/actions/items";
import { FormInput } from "@/components/admin/FormInput";
import { FormTextarea } from "@/components/admin/FormTextarea";
import { FormSelect } from "@/components/admin/FormSelect";
import { ImageUrlField } from "@/components/admin/ImageUrlField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function NewItemPage() {
  await requireAdmin();

  const categories = await prisma.menuCategory.findMany({
    orderBy: { sortOrder: "asc" }
  });

  async function handleSubmit(formData: FormData): Promise<void> {
    "use server";
    const result = await createItem(formData);
    if (result.success) {
      redirect("/admin/items");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50">New Menu Item</h1>
        <p className="mt-1 text-sm text-slate-400">
          Create a new menu item
        </p>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <form action={handleSubmit} className="space-y-6">
          <FormInput
            label="Name"
            name="name"
            required
            placeholder="e.g., Wood-Fired Half Chicken"
          />

          <FormTextarea
            label="Description"
            name="description"
            required
            placeholder="Detailed description of the dish"
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
              placeholder="28.00"
            />

            <FormSelect
              label="Category"
              name="categoryId"
              required
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name
              }))}
            />
          </div>

          <ImageUrlField
            label="Image URL"
            placeholder="https://example.com/image.jpg or /menu-item.svg"
          />

          <FormInput
            label="Tags (comma-separated)"
            name="tags"
            placeholder="vegetarian, gluten-free, signature"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <FormSelect
              label="Availability"
              name="isAvailable"
              defaultValue="true"
              options={[
                { value: "true", label: "Available" },
                { value: "false", label: "Unavailable" }
              ]}
            />

            <FormInput
              label="Sort Order"
              name="sortOrder"
              type="number"
              defaultValue={0}
              min={0}
            />
          </div>

          <div className="flex items-center gap-4">
            <SubmitButton>Create Item</SubmitButton>
            <Link href="/admin/items" className="btn-outline">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
