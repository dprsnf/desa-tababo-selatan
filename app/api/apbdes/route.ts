import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET - List all APBDes
export async function GET() {
  try {
    const apbdesList = await prisma.aPBDes.findMany({
      where: { aktif: true },
      include: {
        realisasi: {
          orderBy: { urutan: "asc" },
        },
        dokumen: {
          where: { aktif: true },
        },
      },
      orderBy: { tahun: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: apbdesList,
    });
  } catch (error) {
    console.error("Error fetching APBDes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load data" },
      { status: 500 },
    );
  }
}

// POST - Create new APBDes
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
    const { tahun, totalAnggaran, pendapatan, belanja, pembiayaan } = body;

    // Validate required fields
    if (!tahun || !totalAnggaran || !pendapatan || !belanja || !pembiayaan) {
      return NextResponse.json(
        { success: false, error: "Semua field wajib diisi" },
        { status: 400 },
      );
    }

    // Check if tahun already exists
    const existing = await prisma.aPBDes.findUnique({
      where: { tahun: parseInt(tahun) },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "APBDes untuk tahun ini sudah ada" },
        { status: 400 },
      );
    }

    const apbdes = await prisma.aPBDes.create({
      data: {
        tahun: parseInt(tahun),
        totalAnggaran: parseFloat(totalAnggaran),
        pendapatan: parseFloat(pendapatan),
        belanja: parseFloat(belanja),
        pembiayaan: parseFloat(pembiayaan),
        aktif: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "APBDes berhasil dibuat",
      data: apbdes,
    });
  } catch (error) {
    console.error("Error creating APBDes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create data" },
      { status: 500 },
    );
  }
}
