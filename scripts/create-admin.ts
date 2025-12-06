import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hash password
  const password = "admin123"; // Password default
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cek apakah admin sudah ada
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: "admin" },
  });

  if (existingAdmin) {
    console.log("❌ Admin dengan username 'admin' sudah ada!");
    console.log("Username:", existingAdmin.username);
    console.log("Email:", existingAdmin.email);
    return;
  }

  // Buat admin baru
  const admin = await prisma.admin.create({
    data: {
      namaLengkap: "Administrator",
      username: "admin",
      email: "admin@tababo-selatan.go.id",
      password: hashedPassword,
      role: "admin",
      aktif: true,
    },
  });

  console.log("✅ Akun admin berhasil dibuat!");
  console.log("═══════════════════════════════════");
  console.log("Nama Lengkap:", admin.namaLengkap);
  console.log("Username    :", admin.username);
  console.log("Email       :", admin.email);
  console.log("Password    :", password);
  console.log("═══════════════════════════════════");
  console.log("⚠️  SIMPAN PASSWORD INI DENGAN AMAN!");
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
