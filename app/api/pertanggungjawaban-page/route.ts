import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET - Load pertanggungjawaban page data
export async function GET() {
  try {
    // Load from ProfileDesa table with section="pertanggungjawaban_page"
    const existing = await prisma.profileDesa.findFirst({
      where: { section: "pertanggungjawaban_page" },
    });

    if (existing && existing.konten) {
      // Parse JSON from konten field
      const pertanggungjawabanData = JSON.parse(existing.konten);

      return NextResponse.json({
        success: true,
        data: pertanggungjawabanData,
      });
    }

    // Return default structure if not found
    return NextResponse.json({
      success: true,
      data: {
        apbdes: {
          tahun: "",
          pendapatan: "",
          belanja: "",
          surplus: "",
        },
        realisasi: [],
        program: [],
      },
    });
  } catch (error) {
    console.error("Error loading pertanggungjawaban page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load data" },
      { status: 500 },
    );
  }
}

// PUT - Save/update pertanggungjawaban page data
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
    const { apbdes, realisasi, program } = body;

    // Validate required fields
    if (!apbdes || !apbdes.tahun) {
      return NextResponse.json(
        { success: false, error: "Tahun anggaran wajib diisi" },
        { status: 400 },
      );
    }

    // Prepare data to store as JSON
    const pertanggungjawabanData = {
      apbdes: apbdes || {
        tahun: "",
        pendapatan: "",
        belanja: "",
        surplus: "",
      },
      realisasi: realisasi || [],
      program: program || [],
    };

    const kontenJson = JSON.stringify(pertanggungjawabanData);

    // Check if entry exists
    const existing = await prisma.profileDesa.findFirst({
      where: { section: "pertanggungjawaban_page" },
    });

    let result;

    if (existing) {
      // Update existing entry
      result = await prisma.profileDesa.update({
        where: { id: existing.id },
        data: {
          judul: "Laporan Pertanggungjawaban",
          konten: kontenJson,
          aktif: true,
        },
      });
    } else {
      // Create new entry
      result = await prisma.profileDesa.create({
        data: {
          judul: "Laporan Pertanggungjawaban",
          konten: kontenJson,
          section: "pertanggungjawaban_page",
          aktif: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Laporan pertanggungjawaban berhasil disimpan",
      data: result,
    });
  } catch (error) {
    console.error("Error saving pertanggungjawaban page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save data" },
      { status: 500 },
    );
  }
}
