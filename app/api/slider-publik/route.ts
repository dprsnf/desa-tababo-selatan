import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET public slider data (active only)
export async function GET() {
  try {
    const now = new Date();

    // Get active sliders that are within date range (or have no date restrictions)
    const sliders = await prisma.slider.findMany({
      where: {
        aktif: true,
        OR: [
          {
            AND: [
              { tanggalMulai: { lte: now } },
              { tanggalSelesai: { gte: now } },
            ],
          },
          {
            tanggalMulai: null,
            tanggalSelesai: null,
          },
        ],
      },
      orderBy: [
        { urutan: "asc" },
        { dibuat: "desc" },
      ],
      select: {
        id: true,
        judul: true,
        konten: true,
        gambar: true,
        link: true,
        tipe: true,
        urutan: true,
        dibuat: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: sliders,
    });
  } catch (error) {
    console.error("Get slider publik error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
