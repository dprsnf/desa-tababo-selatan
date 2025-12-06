import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";

// GET semua media
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const jenisMedia = searchParams.get("jenisMedia");
    const kategori = searchParams.get("kategori");

    const skip = (page - 1) * limit;

    // Build filter
    const where: Prisma.MediaWhereInput = {};

    if (jenisMedia) {
      where.jenisMedia = jenisMedia;
    }

    if (kategori) {
      where.kategori = kategori;
    }

    // Get media dengan pagination
    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        orderBy: { dibuat: "desc" },
        skip,
        take: limit,
      }),
      prisma.media.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: media,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get media error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// CREATE media (simpan info file yang sudah diupload)
export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request);

    const body = await request.json();
    const {
      namaFile,
      namaAsli,
      url,
      path,
      jenisMedia,
      ukuranFile,
      mimeType,
      kategori,
      deskripsi,
    } = body;

    // Validasi
    if (!namaFile || !url || !jenisMedia || !ukuranFile || !mimeType) {
      return NextResponse.json(
        { error: "Field yang diperlukan harus diisi" },
        { status: 400 },
      );
    }

    // Create media
    const media = await prisma.media.create({
      data: {
        namaFile,
        namaAsli: namaAsli || namaFile,
        url,
        path,
        jenisMedia,
        ukuranFile: parseInt(ukuranFile),
        mimeType,
        kategori,
        deskripsi,
        diuploadOleh: user.username,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: media,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Create media error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
