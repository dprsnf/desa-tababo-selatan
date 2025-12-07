import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET - List program bidang by year
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tahun = searchParams.get("tahun");

    const where = tahun
      ? { tahun: parseInt(tahun), aktif: true }
      : { aktif: true };

    const programList = await prisma.programBidang.findMany({
      where,
      orderBy: { urutan: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: programList,
    });
  } catch (error) {
    console.error("Error fetching program bidang:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load data" },
      { status: 500 },
    );
  }
}

// POST - Create new program bidang
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if (!authResult) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { tahun, bidang, kegiatan, urutan } = body;

    if (!tahun || !bidang || !kegiatan || !Array.isArray(kegiatan)) {
      return NextResponse.json(
        { success: false, error: "Field wajib tidak lengkap atau format salah" },
        { status: 400 },
      );
    }

    const program = await prisma.programBidang.create({
      data: {
        tahun: parseInt(tahun),
        bidang,
        kegiatan,
        urutan: urutan ? parseInt(urutan) : 0,
        aktif: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Program bidang berhasil ditambahkan",
      data: program,
    });
  } catch (error) {
    console.error("Error creating program bidang:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create data" },
      { status: 500 },
    );
  }
}
