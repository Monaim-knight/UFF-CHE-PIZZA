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
    // Let Next.js redirects bubble up (they use NEXT_REDIRECT errors internally)
    if (
      error &&
      typeof error === "object" &&
      (error as any).digest &&
      typeof (error as any).digest === "string" &&
      (error as any).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    const message = error instanceof Error ? error.message : String(error);
    console.error("Login error:", message, error);

    // In development, surface the error to help debug (e.g. DB connection)
    if (process.env.NODE_ENV === "development") {
      return { error: `Login failed: ${message}` };
    }

    return { error: "An error occurred. Please try again." };
  }
}

export async function logoutAction() {
  await deleteSession();
  redirect("/admin/login");
}
