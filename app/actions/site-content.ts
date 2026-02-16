"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";
import { getContentKeys } from "@/lib/site-content";

export async function updateSiteContent(formData: FormData): Promise<void> {
  await requireAdmin();

  const keys = getContentKeys();
  for (const { key } of keys) {
    const value = formData.get(key);
    if (value !== null && typeof value === "string") {
      await prisma.siteContent.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/menu");
  revalidatePath("/admin/content");
}
