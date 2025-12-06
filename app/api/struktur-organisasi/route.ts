import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET - Load struktur organisasi data
export async function GET() {
  try {
    // Load from ProfileDesa table with section="struktur_organisasi"
    const existing = await prisma.profileDesa.findFirst({
      where: { section: "struktur_organisasi" },
    });

    if (existing && existing.konten) {
      // Parse JSON from konten field
      const strukturData = JSON.parse(existing.konten);

      return NextResponse.json({
        success: true,
        data: strukturData,
      });
    }

    // Return default structure if not found
    return NextResponse.json({
      success: true,
      data: {
        kepalaDesa: { nama: "", nip: "" },
        sekretaris: { nama: "", nip: "" },
        kaur: [],
        kasi: [],
        kepalaDusun: [],
      },
    });
  } catch (error) {
    console.error("Error loading struktur organisasi:", error);
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
