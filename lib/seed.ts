import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log(" Mulai seeding database...");

  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      email: "admin@desatababoselatan.id",
      password: hashedPassword,
      namaLengkap: "Administrator",
      role: "superadmin",
      aktif: true,
    },
  });

  console.log(" Admin user dibuat:", admin.username);

  const stats = await prisma.statistik.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      jumlahPenduduk: 5000,
      lakiLaki: 2500,
      perempuan: 2500,
      jumlahKeluarga: 1200,
      luasWilayah: "25.5 km²",
      jumlahRW: 8,
      jumlahRT: 24,
      jumlahDusun: 4,
    },
  });

  console.log(" Statistik dibuat");

  const pengaturan = await prisma.pengaturan.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      namaSitus: "Website Desa Tababo Selatan",
      tagline: "Desa Sejahtera, Masyarakat Berdaya",
      deskripsiSitus:
        "Website resmi Pemerintah Desa Tababo Selatan, Kecamatan Tababo, Kabupaten Sangihe",
      alamatKantor:
        "Jl. Raya Tababo Selatan, Kec. Tababo, Kab. Sangihe, Sulawesi Utara",
      emailKontak: "pemdes@tababoselatan.id",
      teleponKontak: "0821-xxxx-xxxx",
      jamOperasional: "Senin - Jumat: 08.00 - 15.00 WITA",
    },
  });

  console.log(" Pengaturan dibuat");

  const berita = await prisma.berita.create({
    data: {
      judul: "Selamat Datang di Website Desa Tababo Selatan",
      slug: "selamat-datang-di-website-desa-tababo-selatan",
      ringkasan:
        "Website resmi Desa Tababo Selatan kini telah resmi diluncurkan",
      konten:
        "Website ini dibuat untuk meningkatkan transparansi dan aksesibilitas informasi pemerintahan desa kepada masyarakat.",
      kategori: "pengumuman",
      penulis: "Admin",
      terbit: true,
      tanggalTerbit: new Date(),
    },
  });

  console.log(" Berita contoh dibuat");

  console.log(" Seeding selesai!");
}

main()
  .catch((e) => {
    console.error(" Seeding gagal: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
