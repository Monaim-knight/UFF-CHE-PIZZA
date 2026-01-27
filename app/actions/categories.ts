"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;
  const isVisible = formData.get("isVisible") === "true";

  if (!name) {
    return { error: "Name is required" };
  }

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  try {
    const category = await prisma.menuCategory.create({
      data: {
        name,
        slug,
        description: description || null,
        sortOrder,
        isVisible
      }
    });

    revalidatePath("/admin/categories");
    revalidatePath("/menu");
    return { success: true, category };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "A category with this name already exists" };
    }
    return { error: "Failed to create category" };
  }
}

export async function updateCategory(id: number, formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;
  const isVisible = formData.get("isVisible") === "true";

  if (!name) {
    return { error: "Name is required" };
  }

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  try {
    const category = await prisma.menuCategory.update({
      where: { id },
      data: {
        name,
        slug,
        description: description || null,
        sortOrder,
        isVisible
      }
    });

    revalidatePath("/admin/categories");
    revalidatePath(`/admin/categories/${id}/edit`);
    revalidatePath("/menu");
    return { success: true, category };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "A category with this name already exists" };
    }
    return { error: "Failed to update category" };
  }
}

export async function deleteCategory(id: number) {
  await requireAdmin();

  // Check if category has items
  const category = await prisma.menuCategory.findUnique({
    where: { id },
    include: { items: true }
  });

  if (!category) {
    return { error: "Category not found" };
  }

  if (category.items.length > 0) {
    return {
      error: `Cannot delete category with ${category.items.length} items. Please remove or reassign items first.`
    };
  }

  try {
    await prisma.menuCategory.delete({
      where: { id }
    });

    revalidatePath("/admin/categories");
    revalidatePath("/menu");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete category" };
  }
}
