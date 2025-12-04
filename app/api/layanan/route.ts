import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";

// GET semua layanan
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const aktif = searchParams.get("aktif");

    // Build filter
    const where: Prisma.LayananWhereInput = {};

    if (aktif !== null && aktif !== undefined) {
      where.aktif = aktif === "true";
    }

    // Get layanan
    const layanan = await prisma.layanan.findMany({
      where,
      orderBy: { urutan: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: layanan,
    });
  } catch (error) {
    console.error("Get layanan error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// CREATE layanan baru
export async function POST(request: NextRequest) {
  try {
    requireAuth(request);

    const body = await request.json();
    const {
      namaLayanan,
      slug,
      deskripsi,
      persyaratan,
      prosedur,
      biaya,
      waktuPenyelesaian,
      kontak,
      formulir,
      aktif,
      urutan,
    } = body;

    // Validasi
    if (
      !namaLayanan ||
      !slug ||
      !deskripsi ||
      !persyaratan ||
      !prosedur ||
      !waktuPenyelesaian
    ) {
      return NextResponse.json(
        { error: "Field yang diperlukan harus diisi" },
        { status: 400 },
      );
    }

    // Cek slug duplicate
    const existing = await prisma.layanan.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Slug sudah digunakan" },
        { status: 400 },
      );
    }

    // Create layanan
    const layanan = await prisma.layanan.create({
      data: {
        namaLayanan,
        slug,
        deskripsi,
        persyaratan,
        prosedur,
        biaya,
        waktuPenyelesaian,
        kontak,
        formulir,
        aktif: aktif !== undefined ? aktif : true,
        urutan: urutan ? parseInt(urutan) : 0,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: layanan,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Create layanan error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
