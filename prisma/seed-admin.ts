import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding admin user...");

  const email = process.env.ADMIN_EMAIL || "admin@radiantbistro.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const name = process.env.ADMIN_NAME || "Admin User";

  // Check if admin already exists
  const existing = await prisma.adminUser.findUnique({
    where: { email }
  });

  if (existing) {
    console.log(`✅ Admin user already exists: ${email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.adminUser.create({
    data: {
      email,
      password: hashedPassword,
      name,
      isActive: true
    }
  });

  console.log(`✅ Created admin user: ${email}`);
  console.log(`   Password: ${password}`);
  console.log(`   ⚠️  Please change the default password after first login!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
