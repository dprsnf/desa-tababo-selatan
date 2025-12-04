import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";

// GET pertanggungjawaban by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const data = await prisma.pertanggungjawaban.findUnique({
      where: { id },
    });

    if (!data) {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Get pertanggungjawaban error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// UPDATE pertanggungjawaban
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    requireAuth(request);
    const { id } = await params;
    const body = await request.json();

    // Convert numbers
    if (body.tahun) body.tahun = parseInt(body.tahun);
    if (body.anggaranTotal) body.anggaranTotal = parseFloat(body.anggaranTotal);
    if (body.realisasiTotal)
      body.realisasiTotal = parseFloat(body.realisasiTotal);
    if (body.persentase) body.persentase = parseFloat(body.persentase);

    // Convert dates
    if (body.tanggalTerbit) body.tanggalTerbit = new Date(body.tanggalTerbit);

    const data = await prisma.pertanggungjawaban.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      success: true,
      data,
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

    console.error("Update pertanggungjawaban error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// DELETE pertanggungjawaban
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    requireAuth(request);
    const { id } = await params;

    await prisma.pertanggungjawaban.delete({
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

    console.error("Delete pertanggungjawaban error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
