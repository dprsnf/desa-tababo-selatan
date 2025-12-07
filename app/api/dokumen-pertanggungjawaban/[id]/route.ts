import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { deleteDocumentFromCloudinary } from "@/lib/cloudinary";

// GET - Increment download count and return file URL
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const dokumen = await prisma.dokumenPertanggungjawaban.findUnique({
      where: { id },
    });

    if (!dokumen) {
      return NextResponse.json(
        { success: false, error: "Dokumen tidak ditemukan" },
        { status: 404 },
      );
    }

    // Increment download count
    await prisma.dokumenPertanggungjawaban.update({
      where: { id },
      data: { jumlahUnduhan: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      data: {
        fileUrl: dokumen.fileUrl,
        namaFile: dokumen.namaFile,
      },
    });
  } catch (error) {
    console.error("Error fetching dokumen:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load data" },
      { status: 500 },
    );
  }
}

// PUT - Update dokumen
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
    const {
      apbdesId,
      judul,
      deskripsi,
      fileUrl,
      namaFile,
      ukuranFile,
      tipeFile,
      kategori,
      tahun,
    } = body;

    const dokumen = await prisma.dokumenPertanggungjawaban.update({
      where: { id },
      data: {
        apbdesId: apbdesId !== undefined ? apbdesId : undefined,
        judul,
        deskripsi,
        fileUrl,
        namaFile,
        ukuranFile: ukuranFile ? parseInt(ukuranFile) : undefined,
        tipeFile,
        kategori,
        tahun: tahun ? parseInt(tahun) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Dokumen berhasil diperbarui",
      data: dokumen,
    });
  } catch (error) {
    console.error("Error updating dokumen:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update data" },
      { status: 500 },
    );
  }
}

// DELETE - Delete dokumen (soft delete + delete from Cloudinary)
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

    // Get document data first
    const dokumen = await prisma.dokumenPertanggungjawaban.findUnique({
      where: { id },
    });

    if (!dokumen) {
      return NextResponse.json(
        { success: false, error: "Dokumen tidak ditemukan" },
        { status: 404 },
      );
    }

    // Delete from Cloudinary if publicId exists
    if (dokumen.publicId) {
      await deleteDocumentFromCloudinary(dokumen.publicId);
    }

    // Soft delete from database
    await prisma.dokumenPertanggungjawaban.update({
      where: { id },
      data: { aktif: false },
    });

    return NextResponse.json({
      success: true,
      message: "Dokumen berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting dokumen:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete data" },
      { status: 500 },
    );
  }
}
