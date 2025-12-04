import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";

// GET semua pertanggungjawaban (dengan pagination & filter)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const tahun = searchParams.get("tahun");
    const jenis = searchParams.get("jenis");
    const terbit = searchParams.get("terbit");

    const skip = (page - 1) * limit;

    // Build filter
    const where: Prisma.PertanggungjawabanWhereInput = {};

    if (tahun) {
      where.tahun = parseInt(tahun);
    }

    if (jenis) {
      where.jenis = jenis;
    }

    if (terbit !== null && terbit !== undefined) {
      where.terbit = terbit === "true";
    }

    // Get data dengan pagination
    const [data, total] = await Promise.all([
      prisma.pertanggungjawaban.findMany({
        where,
        orderBy: [{ tahun: "desc" }, { dibuat: "desc" }],
        skip,
        take: limit,
      }),
      prisma.pertanggungjawaban.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get pertanggungjawaban error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// CREATE pertanggungjawaban baru
export async function POST(request: NextRequest) {
  try {
    requireAuth(request);

    const body = await request.json();
    const {
      tahun,
      jenis,
      judul,
      deskripsi,
      periode,
      anggaranTotal,
      realisasiTotal,
      persentase,
      rincianAnggaran,
      rincianRealisasi,
      dokumen,
      terbit,
      tanggalTerbit,
    } = body;

    // Validasi
    if (!tahun || !jenis || !judul || !deskripsi) {
      return NextResponse.json(
        { error: "Field yang diperlukan harus diisi" },
        { status: 400 },
      );
    }

    // Create pertanggungjawaban
    const data = await prisma.pertanggungjawaban.create({
      data: {
        tahun: parseInt(tahun),
        jenis,
        judul,
        deskripsi,
        periode,
        anggaranTotal: anggaranTotal ? parseFloat(anggaranTotal) : null,
        realisasiTotal: realisasiTotal ? parseFloat(realisasiTotal) : null,
        persentase: persentase ? parseFloat(persentase) : null,
        rincianAnggaran,
        rincianRealisasi,
        dokumen,
        terbit: terbit || false,
        tanggalTerbit: terbit
          ? tanggalTerbit
            ? new Date(tanggalTerbit)
            : new Date()
          : null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Create pertanggungjawaban error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
