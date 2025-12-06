import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const kategori = searchParams.get("kategori");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const tahun = searchParams.get("tahun");

    const skip = (page - 1) * limit;

    const where: Prisma.ProgramWhereInput = {};

    if (kategori) {
      where.kategori = kategori;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { namaProgram: { contains: search, mode: "insensitive" } },
        { deskripsi: { contains: search, mode: "insensitive" } },
      ];
    }

    if (tahun) {
      const year = parseInt(tahun);
      where.tanggalMulai = {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      };
    }

    const [programs, total] = await Promise.all([
      prisma.program.findMany({
        where,
        orderBy: { tanggalMulai: "desc" },
        skip,
        take: limit,
      }),
      prisma.program.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: programs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server: " + error },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    requireAuth(request);

    const body = await request.json();
    const {
      namaProgram,
      slug,
      deskripsi,
      kategori,
      sumberDana,
      anggaran,
      realisasi,
      status,
      tanggalMulai,
      tanggalSelesai,
      lokasiKegiatan,
      penanggungJawab,
      targetPenerima,
      galeri,
      terbit,
    } = body;

    if (
      !namaProgram ||
      !slug ||
      !deskripsi ||
      !kategori ||
      !status ||
      !tanggalMulai
    ) {
      return NextResponse.json(
        { error: "Field yang diperlukan harus diisi" },
        { status: 400 },
      );
    }

    const existing = await prisma.program.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Data sudah ada/sedang digunakan" },
        { status: 400 },
      );
    }

    const program = await prisma.program.create({
      data: {
        namaProgram,
        slug,
        deskripsi,
        kategori,
        sumberDana,
        anggaran: anggaran ? parseFloat(anggaran) : null,
        realisasi: realisasi ? parseFloat(realisasi) : null,
        status,
        tanggalMulai: new Date(tanggalMulai),
        tanggalSelesai: tanggalSelesai ? new Date(tanggalSelesai) : null,
        lokasiKegiatan,
        penanggungJawab,
        targetPenerima,
        galeri,
        terbit: terbit !== undefined ? terbit : true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: program,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan pada server : " + error },
      { status: 500 },
    );
  }
}
