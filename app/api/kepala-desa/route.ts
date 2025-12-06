import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";

// GET semua kepala desa & perangkat (dengan filter)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jabatan = searchParams.get("jabatan");
    const sedangMenjabat = searchParams.get("sedangMenjabat");
    const namaDusun = searchParams.get("namaDusun");

    // Build filter
    const where: Prisma.KepalaDesaPerangkatWhereInput = {};

    if (jabatan) {
      where.jabatan = jabatan;
    }

    if (sedangMenjabat !== null && sedangMenjabat !== undefined) {
      where.sedangMenjabat = sedangMenjabat === "true";
    }

    if (namaDusun) {
      where.namaDusun = namaDusun;
    }

    // Get data
    const perangkat = await prisma.kepalaDesaPerangkat.findMany({
      where,
      orderBy: [
        { sedangMenjabat: "desc" },
        { urutan: "asc" },
        { tahunMulai: "desc" },
      ],
    });

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

// CREATE kepala desa/perangkat baru
export async function POST(request: NextRequest) {
  try {
    requireAuth(request);

    const body = await request.json();
    const {
      namaLengkap,
      jabatan,
      nip,
      tempatLahir,
      tanggalLahir,
      pendidikan,
      foto,
      periode,
      tahunMulai,
      tahunSelesai,
      visi,
      misi,
      prestasi,
      programUnggulan,
      namaDusun,
      sedangMenjabat,
      urutan,
    } = body;

    // Validasi
    if (!namaLengkap || !jabatan) {
      return NextResponse.json(
        { error: "Nama lengkap dan jabatan harus diisi" },
        { status: 400 },
      );
    }

    // Create perangkat
    const perangkat = await prisma.kepalaDesaPerangkat.create({
      data: {
        namaLengkap,
        jabatan,
        nip,
        tempatLahir,
        tanggalLahir: tanggalLahir ? new Date(tanggalLahir) : null,
        pendidikan,
        foto,
        periode,
        tahunMulai: tahunMulai ? parseInt(tahunMulai) : null,
        tahunSelesai: tahunSelesai ? parseInt(tahunSelesai) : null,
        visi,
        misi,
        prestasi,
        programUnggulan,
        namaDusun,
        sedangMenjabat: sedangMenjabat !== undefined ? sedangMenjabat : false,
        urutan: urutan ? parseInt(urutan) : 0,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: perangkat,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Create kepala desa error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
