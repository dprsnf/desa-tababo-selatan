import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET - Get single APBDes by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const apbdes = await prisma.aPBDes.findUnique({
      where: { id },
      include: {
        realisasi: {
          orderBy: { urutan: "asc" },
        },
        dokumen: {
          where: { aktif: true },
        },
      },
    });

    if (!apbdes) {
      return NextResponse.json(
        { success: false, error: "APBDes tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: apbdes,
    });
  } catch (error) {
    console.error("Error fetching APBDes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load data" },
      { status: 500 },
    );
  }
}

// PUT - Update APBDes
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const authResult = await requireAuth(request);
    if (!authResult) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { tahun, totalAnggaran, pendapatan, belanja, pembiayaan } = body;

    const apbdes = await prisma.aPBDes.update({
      where: { id },
      data: {
        tahun: tahun ? parseInt(tahun) : undefined,
        totalAnggaran: totalAnggaran ? parseFloat(totalAnggaran) : undefined,
        pendapatan: pendapatan ? parseFloat(pendapatan) : undefined,
        belanja: belanja ? parseFloat(belanja) : undefined,
        pembiayaan: pembiayaan ? parseFloat(pembiayaan) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: "APBDes berhasil diperbarui",
      data: apbdes,
    });
  } catch (error) {
    console.error("Error updating APBDes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update data" },
      { status: 500 },
    );
  }
}

// DELETE - Delete APBDes (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const authResult = await requireAuth(request);
    if (!authResult) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    await prisma.aPBDes.update({
      where: { id },
      data: { aktif: false },
    });

    return NextResponse.json({
      success: true,
      message: "APBDes berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting APBDes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete data" },
      { status: 500 },
    );
  }
}
