import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET - Load pertanggungjawaban page data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tahun = searchParams.get("tahun");

    // Load halaman configuration
    const halamanConfig = await prisma.halamanPertanggungjawaban.findFirst({
      where: { aktif: true },
    });

    // Determine which year to load
    let targetTahun: number;
    if (tahun) {
      targetTahun = parseInt(tahun);
    } else {
      // Get the most recent year from APBDes
      const latestAPBDes = await prisma.aPBDes.findFirst({
        where: { aktif: true },
        orderBy: { tahun: "desc" },
      });
      targetTahun = latestAPBDes?.tahun || new Date().getFullYear();
    }

    // Load APBDes data with realisasi and dokumen
    const apbdesData = await prisma.aPBDes.findFirst({
      where: {
        tahun: targetTahun,
        aktif: true,
      },
      include: {
        realisasi: {
          orderBy: { urutan: "asc" },
        },
        dokumen: {
          where: { aktif: true },
          orderBy: { dibuat: "desc" },
        },
      },
    });

    // Load program per bidang
    const programData = await prisma.programBidang.findMany({
      where: {
        tahun: targetTahun,
        aktif: true,
      },
      orderBy: { urutan: "asc" },
    });

    // Get available years for filtering
    const availableYears = await prisma.aPBDes.findMany({
      where: { aktif: true },
      select: { tahun: true },
      orderBy: { tahun: "desc" },
      distinct: ["tahun"],
    });

    return NextResponse.json({
      success: true,
      data: {
        judul: halamanConfig?.judul || "Pertanggungjawaban Desa",
        konten:
          halamanConfig?.konten ||
          "Laporan dan Akuntabilitas Pemerintah Desa Tababo Selatan",
        tahunAktif: targetTahun,
        tahunTersedia: availableYears.map((y) => y.tahun),
        apbdes: apbdesData
          ? {
              tahun: apbdesData.tahun.toString(),
              total_anggaran: apbdesData.totalAnggaran,
              pendapatan: apbdesData.pendapatan,
              belanja: apbdesData.belanja,
              pembiayaan: apbdesData.pembiayaan,
            }
          : null,
        realisasi: apbdesData?.realisasi || [],
        program: programData.map((p) => ({
          bidang: p.bidang,
          kegiatan: p.kegiatan as string[],
        })),
        dokumen: apbdesData?.dokumen.map((d) => ({
          judul: d.judul,
          file: d.fileUrl,
        })) || [],
      },
    });
  } catch (error) {
    console.error("Error loading pertanggungjawaban page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load data" },
      { status: 500 },
    );
  }
}

// PUT - Update halaman configuration
export async function PUT(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { judul, konten } = body;

    if (!judul || !konten) {
      return NextResponse.json(
        { success: false, error: "Judul dan konten wajib diisi" },
        { status: 400 },
      );
    }

    // Check if config exists
    const existing = await prisma.halamanPertanggungjawaban.findFirst({
      where: { aktif: true },
    });

    let result;
    if (existing) {
      result = await prisma.halamanPertanggungjawaban.update({
        where: { id: existing.id },
        data: { judul, konten },
      });
    } else {
      result = await prisma.halamanPertanggungjawaban.create({
        data: { judul, konten, aktif: true },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Konfigurasi halaman berhasil disimpan",
      data: result,
    });
  } catch (error) {
    console.error("Error saving halaman config:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save data" },
      { status: 500 },
    );
  }
}
