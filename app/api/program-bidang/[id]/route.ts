import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// PUT - Update program bidang
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
    const { tahun, bidang, kegiatan, urutan } = body;

    const program = await prisma.programBidang.update({
      where: { id },
      data: {
        tahun: tahun ? parseInt(tahun) : undefined,
        bidang,
        kegiatan: kegiatan && Array.isArray(kegiatan) ? kegiatan : undefined,
        urutan: urutan !== undefined ? parseInt(urutan) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Program bidang berhasil diperbarui",
      data: program,
    });
  } catch (error) {
    console.error("Error updating program bidang:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update data" },
      { status: 500 },
    );
  }
}

// DELETE - Delete program bidang (soft delete)
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

    await prisma.programBidang.update({
      where: { id },
      data: { aktif: false },
    });

    return NextResponse.json({
      success: true,
      message: "Program bidang berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting program bidang:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete data" },
      { status: 500 },
    );
  }
}
