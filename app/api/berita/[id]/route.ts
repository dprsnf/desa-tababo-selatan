import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";

// GET berita by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Try to find by slug first, then by ID
    let berita = await prisma.berita.findUnique({
      where: { slug: id },
    });

    // If not found by slug, try by ID
    if (!berita) {
      berita = await prisma.berita.findUnique({
        where: { id },
      });
    }

    if (!berita) {
      return NextResponse.json(
        { error: "Berita tidak ditemukan" },
        { status: 404 },
      );
    }

    // Increment view count
    await prisma.berita.update({
      where: { id: berita.id },
      data: { dilihat: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      data: berita,
    });
  } catch (error) {
    console.error("Get berita error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// UPDATE berita
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    requireAuth(request);
    const { id } = await params;
    const body = await request.json();

    const berita = await prisma.berita.update({
      where: { id },
      data: {
        ...body,
        tanggalTerbit: body.terbit
          ? body.tanggalTerbit
            ? new Date(body.tanggalTerbit)
            : new Date()
          : null,
      },
    });

    return NextResponse.json({
      success: true,
      data: berita,
    });
  } catch (error) {
    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Berita tidak ditemukan" },
          { status: 404 },
        );
      }
    }

    // Handle auth errors
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Update berita error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// DELETE berita
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    requireAuth(request);
    const { id } = await params;

    await prisma.berita.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil dihapus",
    });
  } catch (error) {
    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Berita tidak ditemukan" },
          { status: 404 },
        );
      }
    }

    // Handle auth errors
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Delete berita error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
