import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";

// GET kepala desa/perangkat by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const perangkat = await prisma.kepalaDesaPerangkat.findUnique({
      where: { id },
    });

    if (!perangkat) {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: perangkat,
    });
  } catch (error) {
    console.error("Get kepala desa error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// UPDATE kepala desa/perangkat
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    requireAuth(request);
    const { id } = await params;
    const body = await request.json();

    // Convert dates & numbers
    if (body.tanggalLahir) body.tanggalLahir = new Date(body.tanggalLahir);
    if (body.tahunMulai) body.tahunMulai = parseInt(body.tahunMulai);
    if (body.tahunSelesai) body.tahunSelesai = parseInt(body.tahunSelesai);
    if (body.urutan !== undefined) body.urutan = parseInt(body.urutan);

    const perangkat = await prisma.kepalaDesaPerangkat.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      success: true,
      data: perangkat,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Data tidak ditemukan" },
          { status: 404 },
        );
      }
    }

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Update kepala desa error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// DELETE kepala desa/perangkat
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    requireAuth(request);
    const { id } = await params;

    await prisma.kepalaDesaPerangkat.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Data tidak ditemukan" },
          { status: 404 },
        );
      }
    }

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Delete kepala desa error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
