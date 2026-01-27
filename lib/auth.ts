import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "admin-session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createSession(adminUserId: number) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, adminUserId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/"
  });
}

export async function getSession(): Promise<number | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  
  if (!sessionCookie?.value) {
    return null;
  }

  const adminUserId = parseInt(sessionCookie.value);
  if (isNaN(adminUserId)) {
    return null;
  }

  // Verify user still exists and is active
  const adminUser = await prisma.adminUser.findUnique({
    where: { id: adminUserId }
  });

  if (!adminUser || !adminUser.isActive) {
    return null;
  }

  return adminUserId;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentAdmin() {
  const adminUserId = await getSession();
  if (!adminUserId) {
    return null;
  }

  return prisma.adminUser.findUnique({
    where: { id: adminUserId },
    select: {
      id: true,
      email: true,
      name: true,
      isActive: true
    }
  });
}

export async function requireAuth() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }
  return admin;
}
