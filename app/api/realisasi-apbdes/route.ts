import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET - List realisasi for specific APBDes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const apbdesId = searchParams.get("apbdesId");

    if (!apbdesId) {
      return NextResponse.json(
        { success: false, error: "apbdesId is required" },
        { status: 400 },
      );
    }

    const realisasiList = await prisma.realisasiAPBDes.findMany({
      where: { apbdesId },
      orderBy: { urutan: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: realisasiList,
    });
  } catch (error) {
    console.error("Error fetching realisasi:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load data" },
      { status: 500 },
    );
  }
}

// POST - Create new realisasi
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
    const { apbdesId, uraian, anggaran, realisasi, urutan } = body;

    if (!apbdesId || !uraian || anggaran === undefined || realisasi === undefined) {
      return NextResponse.json(
        { success: false, error: "Field wajib tidak lengkap" },
        { status: 400 },
      );
    }

    // Calculate percentage
    const persentase = (parseFloat(realisasi) / parseFloat(anggaran)) * 100;

    const realisasiData = await prisma.realisasiAPBDes.create({
      data: {
        apbdesId,
        uraian,
        anggaran: parseFloat(anggaran),
        realisasi: parseFloat(realisasi),
        persentase: parseFloat(persentase.toFixed(2)),
        urutan: urutan ? parseInt(urutan) : 0,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Realisasi berhasil ditambahkan",
      data: realisasiData,
    });
  } catch (error) {
    console.error("Error creating realisasi:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create data" },
      { status: 500 },
    );
  }
}
