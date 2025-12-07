import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET - List dokumen pertanggungjawaban
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const apbdesId = searchParams.get("apbdesId");
    const tahun = searchParams.get("tahun");
    const kategori = searchParams.get("kategori");

    // If ID is provided, get single document
    if (id) {
      const dokumen = await prisma.dokumenPertanggungjawaban.findUnique({
        where: { id },
      });

      if (!dokumen) {
        return NextResponse.json(
          { success: false, error: "Dokumen tidak ditemukan" },
          { status: 404 },
        );
      }

      return NextResponse.json({
        success: true,
        data: [dokumen],
      });
    }

    // Otherwise, list documents with filters
    const where: any = { aktif: true };
    if (apbdesId) where.apbdesId = apbdesId;
    if (tahun) where.tahun = parseInt(tahun);
    if (kategori) where.kategori = kategori;

    const dokumenList = await prisma.dokumenPertanggungjawaban.findMany({
      where,
      orderBy: { dibuat: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: dokumenList,
    });
  } catch (error) {
    console.error("Error fetching dokumen:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load data" },
      { status: 500 },
    );
  }
}

// POST - Create new dokumen
export async function POST(request: NextRequest) {
  try {
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
      publicId,
      kategori,
      tahun,
    } = body;

    if (!judul || !fileUrl || !namaFile || !kategori || !tahun) {
      return NextResponse.json(
        { success: false, error: "Field wajib tidak lengkap" },
        { status: 400 },
      );
    }

    const dokumen = await prisma.dokumenPertanggungjawaban.create({
      data: {
        apbdesId: apbdesId || undefined,
        judul,
        deskripsi,
        fileUrl,
        namaFile,
        ukuranFile: ukuranFile ? parseInt(ukuranFile) : undefined,
        tipeFile,
        publicId: publicId || undefined,
        kategori,
        tahun: parseInt(tahun),
        aktif: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Dokumen berhasil ditambahkan",
      data: dokumen,
    });
  } catch (error) {
    console.error("Error creating dokumen:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create data" },
      { status: 500 },
    );
  }
}
