import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";

// GET semua berita (dengan pagination & filter)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const kategori = searchParams.get("kategori");
    const terbit = searchParams.get("terbit");
    const search = searchParams.get("search");

    const skip = (page - 1) * limit;

    // Build filter
    const where: Prisma.BeritaWhereInput = {};

    if (kategori) {
      where.kategori = kategori;
    }

    if (terbit !== null && terbit !== undefined) {
      where.terbit = terbit === "true";
    }

    if (search) {
      where.OR = [
        { judul: { contains: search, mode: "insensitive" } },
        { ringkasan: { contains: search, mode: "insensitive" } },
        { konten: { contains: search, mode: "insensitive" } },
      ];
    }

    // Get berita dengan pagination
    const [berita, total] = await Promise.all([
      prisma.berita.findMany({
        where,
        orderBy: { dibuat: "desc" },
        skip,
        take: limit,
      }),
      prisma.berita.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: berita,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get berita error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// CREATE berita baru
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = requireAuth(request);

    const body = await request.json();
    const {
      judul,
      slug,
      ringkasan,
      konten,
      gambarUtama,
      kategori,
      tags,
      terbit,
      tanggalTerbit,
    } = body;

    // Validasi
    if (!judul || !slug || !ringkasan || !konten || !kategori) {
      return NextResponse.json(
        { error: "Field yang diperlukan harus diisi" },
        { status: 400 },
      );
    }

    // Cek slug duplicate
    const existing = await prisma.berita.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Slug sudah digunakan" },
        { status: 400 },
      );
    }

    // Create berita
    const berita = await prisma.berita.create({
      data: {
        judul,
        slug,
        ringkasan,
        konten,
        gambarUtama,
        kategori,
        tags,
        penulis: user.username,
        penulis_id: user.userId,
        terbit: terbit || false,
        tanggalTerbit: terbit
          ? tanggalTerbit
            ? new Date(tanggalTerbit)
            : new Date()
          : null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: berita,
      },
      { status: 201 },
    );
  } catch (error) {
    // Handle auth errors
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Create berita error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
