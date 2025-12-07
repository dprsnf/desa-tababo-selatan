import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// PUT - Update realisasi
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
    const { uraian, anggaran, realisasi, urutan } = body;

    // Calculate percentage if anggaran and realisasi provided
    let persentase = undefined;
    if (anggaran !== undefined && realisasi !== undefined) {
      persentase = (parseFloat(realisasi) / parseFloat(anggaran)) * 100;
    }

    const realisasiData = await prisma.realisasiAPBDes.update({
      where: { id },
      data: {
        uraian,
        anggaran: anggaran ? parseFloat(anggaran) : undefined,
        realisasi: realisasi ? parseFloat(realisasi) : undefined,
        persentase: persentase ? parseFloat(persentase.toFixed(2)) : undefined,
        urutan: urutan !== undefined ? parseInt(urutan) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Realisasi berhasil diperbarui",
      data: realisasiData,
    });
  } catch (error) {
    console.error("Error updating realisasi:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update data" },
      { status: 500 },
    );
  }
}

// DELETE - Delete realisasi
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

    await prisma.realisasiAPBDes.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Realisasi berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting realisasi:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete data" },
      { status: 500 },
    );
  }
}
