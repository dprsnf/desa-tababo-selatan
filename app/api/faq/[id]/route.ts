import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET single FAQ by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const faq = await prisma.fAQ.findUnique({
      where: { id },
    });

    if (!faq) {
      return NextResponse.json(
        { error: "FAQ tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: faq,
    });
  } catch (error) {
    console.error("Get FAQ error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// PUT update FAQ by ID (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Check authentication
    requireAuth(request);

    const { id } = await params;
    const body = await request.json();
    const { pertanyaan, jawaban, kategori, urutan, aktif } = body;

    // Validate
    if (!pertanyaan || !jawaban) {
      return NextResponse.json(
        { error: "Pertanyaan dan jawaban harus diisi" },
        { status: 400 },
      );
    }

    // Check if FAQ exists
    const existingFaq = await prisma.fAQ.findUnique({
      where: { id },
    });

    if (!existingFaq) {
      return NextResponse.json(
        { error: "FAQ tidak ditemukan" },
        { status: 404 },
      );
    }

    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        pertanyaan,
        jawaban,
        kategori: kategori || null,
        urutan: urutan !== undefined ? urutan : existingFaq.urutan,
        aktif: aktif !== undefined ? aktif : existingFaq.aktif,
      },
    });

    return NextResponse.json({
      success: true,
      message: "FAQ berhasil diperbarui",
      data: faq,
    });
  } catch (error) {
    // Handle auth errors
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Update FAQ error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// DELETE FAQ by ID (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Check authentication
    requireAuth(request);

    const { id } = await params;

    // Check if FAQ exists
    const existingFaq = await prisma.fAQ.findUnique({
      where: { id },
    });

    if (!existingFaq) {
      return NextResponse.json(
        { error: "FAQ tidak ditemukan" },
        { status: 404 },
      );
    }

    await prisma.fAQ.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "FAQ berhasil dihapus",
    });
  } catch (error) {
    // Handle auth errors
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Delete FAQ error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
