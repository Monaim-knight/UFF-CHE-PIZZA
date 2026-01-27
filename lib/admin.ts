import { getCurrentAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }
  return admin;
}
