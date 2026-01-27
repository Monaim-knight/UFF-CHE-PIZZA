import { prisma } from "@/lib/prisma";

export async function getFullMenu() {
  const categories = await prisma.menuCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      items: {
        orderBy: { sortOrder: "asc" }
      }
    }
  });

  return categories;
}

export async function getCategoryById(id: number) {
  return prisma.menuCategory.findUnique({
    where: { id },
    include: { items: { orderBy: { sortOrder: "asc" } } }
  });
}

export async function getItemById(id: number) {
  return prisma.menuItem.findUnique({
    where: { id },
    include: { category: true }
  });
}

