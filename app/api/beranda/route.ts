import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET beranda data
export async function GET() {
  try {
    // Get hero section (get the first active one or create default)
    const heroSection = await prisma.heroSection.findFirst({
      where: { aktif: true },
      orderBy: { urutan: "asc" },
    });

    // If no hero section exists, return default values
    if (!heroSection) {
      return NextResponse.json({
        success: true,
        data: {
          hero: {
            judul: "Desa Tababo Selatan",
            subjudul: "Desa Hijau, Sejahtera, dan Mandiri",
            deskripsi: "Kecamatan [Nama Kecamatan], Kabupaten [Nama Kabupaten]",
            gambar: "",
          },
          stats: [
            { label: "Jumlah Penduduk", value: "2,500+" },
            { label: "Luas Wilayah", value: "450 Ha" },
            { label: "Dusun", value: "4" },
            { label: "UMKM Aktif", value: "50+" },
          ],
        },
      });
    }

    // Get statistik data
    const statistik = await prisma.statistik.findFirst();

    // Build stats array
    const stats = statistik
      ? [
          {
            label: "Jumlah Penduduk",
            value: statistik.jumlahPenduduk?.toString() || "0",
          },
          {
            label: "Luas Wilayah",
            value: statistik.luasWilayah || "0 Ha",
          },
          {
            label: "Dusun",
            value: statistik.jumlahDusun?.toString() || "0",
          },
          {
            label: "UMKM Aktif",
            value: "50+",
          },
        ]
      : [
          { label: "Jumlah Penduduk", value: "2,500+" },
          { label: "Luas Wilayah", value: "450 Ha" },
          { label: "Dusun", value: "4" },
          { label: "UMKM Aktif", value: "50+" },
        ];

    return NextResponse.json({
      success: true,
      data: {
        hero: {
          judul: heroSection.judul,
          subjudul: heroSection.subjudul || "",
          deskripsi: heroSection.deskripsi || "",
          gambar: heroSection.gambar || "",
        },
        stats,
      },
    });
  } catch (error) {
    console.error("Get beranda error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// UPDATE beranda data
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    requireAuth(request);

    const body = await request.json();
    const { hero, stats } = body;

    // Validate
    if (!hero || !hero.judul) {
      return NextResponse.json(
        { error: "Data hero section harus diisi" },
        { status: 400 },
      );
    }

    // Update or create hero section
    const existingHero = await prisma.heroSection.findFirst({
      where: { aktif: true },
      orderBy: { urutan: "asc" },
    });

    let heroSection;
    if (existingHero) {
      // Update existing
      heroSection = await prisma.heroSection.update({
        where: { id: existingHero.id },
        data: {
          judul: hero.judul,
          subjudul: hero.subjudul || null,
          deskripsi: hero.deskripsi || null,
          gambar: hero.gambar || "",
          diperbarui: new Date(),
        },
      });
    } else {
      // Create new
      heroSection = await prisma.heroSection.create({
        data: {
          judul: hero.judul,
          subjudul: hero.subjudul || null,
          deskripsi: hero.deskripsi || null,
          gambar: hero.gambar || "",
          urutan: 0,
          aktif: true,
        },
      });
    }

    // Update statistik if provided
    if (stats && Array.isArray(stats)) {
      const existingStatistik = await prisma.statistik.findFirst();

      // Parse stats array back to individual fields
      const pendudukStat = stats.find((s) =>
        s.label.toLowerCase().includes("penduduk"),
      );
      const luasStat = stats.find((s) =>
        s.label.toLowerCase().includes("luas"),
      );
      const dusunStat = stats.find((s) =>
        s.label.toLowerCase().includes("dusun"),
      );
      const umkmStat = stats.find((s) =>
        s.label.toLowerCase().includes("umkm"),
      );

      const statistikData = {
        jumlahPenduduk: pendudukStat
          ? parseInt(pendudukStat.value.replace(/\D/g, ""))
          : 0,
        luasWilayah: luasStat ? luasStat.value : "0 Ha",
        jumlahDusun: dusunStat
          ? parseInt(dusunStat.value.replace(/\D/g, ""))
          : 0,
      };

      if (existingStatistik) {
        await prisma.statistik.update({
          where: { id: existingStatistik.id },
          data: statistikData,
        });
      } else {
        await prisma.statistik.create({
          data: {
            ...statistikData,
            jumlahRT: 0,
            jumlahRW: 0,
            jumlahKeluarga: 0,
            lakiLaki: 0,
            perempuan: 0,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Data beranda berhasil disimpan",
      data: {
        hero: heroSection,
      },
    });
  } catch (error) {
    // Handle auth errors
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Update beranda error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
