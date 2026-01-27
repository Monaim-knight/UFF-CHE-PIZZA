"use server";

import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession, deleteSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(
  prevState: { error?: string } | null,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const adminUser = await prisma.adminUser.findUnique({
      where: { email }
    });

    if (!adminUser || !adminUser.isActive) {
      return { error: "Invalid credentials" };
    }

    const isValid = await verifyPassword(password, adminUser.password);
    if (!isValid) {
      return { error: "Invalid credentials" };
    }

    await createSession(adminUser.id);
    redirect("/admin");
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An error occurred. Please try again." };
  }
}

export async function logoutAction() {
  await deleteSession();
  redirect("/admin/login");
}
