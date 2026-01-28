"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";

export async function createItem(formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const priceCents = Math.round(
    parseFloat(formData.get("price") as string) * 100
  );
  const categoryId = parseInt(formData.get("categoryId") as string);
  const imageUrl = formData.get("imageUrl") as string;
  const tags = (formData.get("tags") as string)
    ?.split(",")
    .map((tag) => tag.trim())
    .filter(Boolean) || [];
  const isAvailable = formData.get("isAvailable") === "true";
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;

  if (!name || !description || !priceCents || !categoryId) {
    return { error: "Name, description, price, and category are required" };
  }

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  try {
    const item = await prisma.menuItem.create({
      data: {
        name,
        slug,
        description,
        priceCents,
        categoryId,
        imageUrl: imageUrl || null,
        tags,
        isAvailable,
        sortOrder
      }
    });

    revalidatePath("/admin/items");
    revalidatePath("/menu");
    return { success: true, item };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "An item with this name already exists" };
    }
    return { error: "Failed to create item" };
  }
}

export async function updateItem(id: number, formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const priceCents = Math.round(
    parseFloat(formData.get("price") as string) * 100
  );
  const categoryId = parseInt(formData.get("categoryId") as string);
  const imageUrl = formData.get("imageUrl") as string;
  const tags = (formData.get("tags") as string)
    ?.split(",")
    .map((tag) => tag.trim())
    .filter(Boolean) || [];
  const isAvailable = formData.get("isAvailable") === "true";
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;

  if (!name || !description || !priceCents || !categoryId) {
    return { error: "Name, description, price, and category are required" };
  }

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  try {
    const item = await prisma.menuItem.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        priceCents,
        categoryId,
        imageUrl: imageUrl || null,
        tags,
        isAvailable,
        sortOrder
      }
    });

    revalidatePath("/admin/items");
    revalidatePath(`/admin/items/${id}/edit`);
    revalidatePath("/menu");
    return { success: true, item };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "An item with this name already exists" };
    }
    return { error: "Failed to update item" };
  }
}

export async function deleteItem(id: number): Promise<void> {
  await requireAdmin();

  try {
    await prisma.menuItem.delete({
      where: { id }
    });

    revalidatePath("/admin/items");
    revalidatePath("/menu");
  } catch (error) {
    return;
  }
}
