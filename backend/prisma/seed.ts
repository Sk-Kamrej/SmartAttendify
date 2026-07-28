import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Hash password
  const passwordHash = await bcrypt.hash("Admin@123", 10);

  // Create College
  const college = await prisma.college.upsert({
    where: {
      code: "PBC",
    },
    update: {},
    create: {
      name: "Panskura Banamali College",
      code: "PBC",
      email: "info@pbc.edu.in",
      phone: "9876543210",
      address: "Panskura, Purba Medinipur, West Bengal",
    },
  });

  console.log("✅ College created");

  // Create Super Admin
  await prisma.user.upsert({
    where: {
      email: "superadmin@smartattendify.com",
    },
    update: {},
    create: {
      firstName: "Super",
      lastName: "Admin",
      email: "superadmin@smartattendify.com",
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      collegeId: college.id,
    },
  });

  console.log("✅ Super Admin created");

  // Create College Admin
  await prisma.user.upsert({
    where: {
      email: "admin@pbc.edu.in",
    },
    update: {},
    create: {
      firstName: "College",
      lastName: "Admin",
      email: "admin@pbc.edu.in",
      passwordHash,
      role: UserRole.COLLEGE_ADMIN,
      collegeId: college.id,
    },
  });

  console.log("✅ College Admin created");
}

main()
  .then(async () => {
    console.log("🎉 Database seeded successfully!");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });