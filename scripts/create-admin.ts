import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst({
      where: {
        OR: [{ username: "admin" }, { email: "admin@desatababo.id" }],
      },
    });

    if (existingAdmin) {
      console.log("❌ Admin sudah ada!");
      console.log("Username:", existingAdmin.username);
      console.log("Email:", existingAdmin.email);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        namaLengkap: "Administrator",
        username: "admin",
        email: "admin@desatababo.id",
        password: hashedPassword,
        role: "admin",
        aktif: true,
      },
    });

    console.log("✅ Admin berhasil dibuat!");
    console.log("Username:", admin.username);
    console.log("Email:", admin.email);
    console.log("Password: admin123");
    console.log("\n⚠️  Segera ganti password setelah login pertama kali!");
  } catch (error) {
    console.error("❌ Error membuat admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
