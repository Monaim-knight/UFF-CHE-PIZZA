import { createCategory } from "@/app/actions/categories";
import { FormInput } from "@/components/admin/FormInput";
import { FormTextarea } from "@/components/admin/FormTextarea";
import { FormSelect } from "@/components/admin/FormSelect";
import { SubmitButton } from "@/components/admin/SubmitButton";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function NewCategoryPage() {
  await requireAdmin();

  async function handleSubmit(formData: FormData): Promise<void> {
    "use server";
    const result = await createCategory(formData);
    if (result.success) {
      redirect("/admin/categories");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50">
          New Category
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Create a new menu category
        </p>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <form action={handleSubmit} className="space-y-6">
          <FormInput
            label="Name"
            name="name"
            required
            placeholder="e.g., Appetizers"
          />

          <FormTextarea
            label="Description"
            name="description"
            placeholder="Brief description of this category"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <FormInput
              label="Sort Order"
              name="sortOrder"
              type="number"
              defaultValue={0}
              min={0}
            />

            <FormSelect
              label="Visibility"
              name="isVisible"
              defaultValue="true"
              options={[
                { value: "true", label: "Visible" },
                { value: "false", label: "Hidden" }
              ]}
            />
          </div>

          <div className="flex items-center gap-4">
            <SubmitButton>Create Category</SubmitButton>
            <Link href="/admin/categories" className="btn-outline">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
