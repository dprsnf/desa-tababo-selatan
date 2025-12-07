import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET - Load struktur pemerintahan data dari database
export async function GET() {
  try {
    // Load perangkat desa yang sedang menjabat
    const perangkatDesa = await prisma.kepalaDesaPerangkat.findMany({
      where: { sedangMenjabat: true },
      orderBy: { urutan: "asc" },
    });

    // Load kepala desa sebelumnya (yang tidak sedang menjabat)
    const kepalaDesaSebelumnya = await prisma.kepalaDesaPerangkat.findMany({
      where: {
        jabatan: "kepala_desa",
        sedangMenjabat: false,
      },
      orderBy: { tahunSelesai: "desc" },
    });

    // Pisahkan berdasarkan jabatan (case-insensitive dan fleksibel)
    const kepala_desa = perangkatDesa.find((p) => 
      p.jabatan.toLowerCase().replace(/\s+/g, '_') === "kepala_desa" ||
      p.jabatan.toLowerCase().includes("kepala desa")
    );
    const sekretaris = perangkatDesa.find((p) => 
      p.jabatan.toLowerCase().replace(/\s+/g, '_') === "sekretaris" ||
      p.jabatan.toLowerCase().includes("sekretaris")
    );
    
    const kaur = perangkatDesa.filter((p) => 
      p.jabatan.toLowerCase().includes("kaur") || 
      p.jabatan.toLowerCase().includes("kepala urusan")
    );
    
    const kasi = perangkatDesa.filter((p) => 
      p.jabatan.toLowerCase().includes("kasi") || 
      p.jabatan.toLowerCase().includes("kepala seksi")
    );
    
    const kepala_dusun = perangkatDesa.filter((p) => 
      p.jabatan.toLowerCase().includes("kepala dusun") ||
      p.jabatan === "kepala_dusun"
    );

    const perangkat_lain = perangkatDesa.filter((p) => 
      p.jabatan !== "kepala_desa" && 
      p.jabatan !== "sekretaris" &&
      !p.jabatan.toLowerCase().includes("kaur") &&
      !p.jabatan.toLowerCase().includes("kepala urusan") &&
      !p.jabatan.toLowerCase().includes("kasi") &&
      !p.jabatan.toLowerCase().includes("kepala seksi") &&
      !p.jabatan.toLowerCase().includes("kepala dusun")
    );

    // Format data untuk frontend
    const formatPerangkat = (p: any) => ({
      id: p.id,
      nama: p.namaLengkap,
      jabatan: p.jabatan,
      nip: p.nip,
      foto: p.foto,
      kontak: null, // Field kontak tidak ada di schema, bisa ditambahkan jika perlu
    });

    // Format kepala desa sebelumnya
    const kepalaDesaSebelumnyaFormatted = kepalaDesaSebelumnya.map((kd) => ({
      id: kd.id,
      nama: kd.namaLengkap,
      periode_mulai: kd.tahunMulai ? `${kd.tahunMulai}-01-01` : new Date().toISOString(),
      periode_selesai: kd.tahunSelesai ? `${kd.tahunSelesai}-12-31` : null,
      foto: kd.foto,
      deskripsi: kd.prestasi || null,
    }));

    return NextResponse.json({
      success: true,
      data: {
        kepala_desa: kepala_desa ? formatPerangkat(kepala_desa) : undefined,
        sekretaris: sekretaris ? formatPerangkat(sekretaris) : undefined,
        kaur: kaur.map(formatPerangkat),
        kasi: kasi.map(formatPerangkat),
        kepala_dusun: kepala_dusun.map(formatPerangkat),
        perangkat_lain: perangkat_lain.map(formatPerangkat),
        kepala_desa_sebelumnya: kepalaDesaSebelumnyaFormatted,
      },
    });
  } catch (error) {
    console.error("Error loading struktur pemerintahan:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load data" },
      { status: 500 },
    );
  }
}

// PUT - Save/update struktur organisasi data
export async function PUT(request: NextRequest) {
  try {
    // Require authentication
    const authResult = await requireAuth(request);
    if (!authResult) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { kepalaDesa, sekretaris, kaur, kasi, kepalaDusun } = body;

    // Validate required fields
    if (!kepalaDesa || !sekretaris) {
      return NextResponse.json(
        { success: false, error: "Kepala Desa dan Sekretaris wajib diisi" },
        { status: 400 },
      );
    }

    // Prepare data to store as JSON
    const strukturData = {
      kepalaDesa: kepalaDesa || { nama: "", nip: "" },
      sekretaris: sekretaris || { nama: "", nip: "" },
      kaur: kaur || [],
      kasi: kasi || [],
      kepalaDusun: kepalaDusun || [],
    };

    const kontenJson = JSON.stringify(strukturData);

    // Check if entry exists
    const existing = await prisma.profileDesa.findFirst({
      where: { section: "struktur_organisasi" },
    });

    let result;

    if (existing) {
      // Update existing entry
      result = await prisma.profileDesa.update({
        where: { id: existing.id },
        data: {
          judul: "Struktur Organisasi Pemerintah Desa",
          konten: kontenJson,
          aktif: true,
        },
      });
    } else {
      // Create new entry
      result = await prisma.profileDesa.create({
        data: {
          judul: "Struktur Organisasi Pemerintah Desa",
          konten: kontenJson,
          section: "struktur_organisasi",
          aktif: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Struktur organisasi berhasil disimpan",
      data: result,
    });
  } catch (error) {
    console.error("Error saving struktur organisasi:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save data" },
      { status: 500 },
    );
  }
}
