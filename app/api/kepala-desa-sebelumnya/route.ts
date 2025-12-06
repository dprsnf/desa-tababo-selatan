import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET /api/kepala-desa-sebelumnya - Load former village heads data
export async function GET() {
  try {
    // Find ProfileDesa entry with section="kepala_desa_sebelumnya"
    const kepalaDesaData = await prisma.profileDesa.findFirst({
      where: {
        section: "kepala_desa_sebelumnya",
        aktif: true,
      },
      orderBy: {
        urutan: "asc",
      },
    });

    if (kepalaDesaData) {
      // Parse konten as JSON to get list data
      let parsedData;
      try {
        parsedData = JSON.parse(kepalaDesaData.konten);
      } catch {
        // If konten is not JSON, use defaults
        parsedData = null;
      }

      // Return structured data
      return NextResponse.json({
        success: true,
        data: {
          kepalaDesaList: parsedData?.kepalaDesaList || [
            {
              periode: "2018 - 2024",
              nama: "Nama Kepala Desa 1",
              prestasi: "Prestasi selama menjabat...",
            },
          ],
        },
      });
    }

    // Return default data if not found
    return NextResponse.json({
      success: true,
      data: {
        kepalaDesaList: [
          {
            periode: "2018 - 2024",
            nama: "Nama Kepala Desa 1",
            prestasi: "Prestasi selama menjabat...",
          },
          {
            periode: "2012 - 2018",
            nama: "Nama Kepala Desa 2",
            prestasi: "Prestasi selama menjabat...",
          },
          {
            periode: "2006 - 2012",
            nama: "Nama Kepala Desa 3",
            prestasi: "Prestasi selama menjabat...",
          },
          {
            periode: "2000 - 2006",
            nama: "Nama Kepala Desa 4",
            prestasi: "Prestasi selama menjabat...",
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error loading kepala desa sebelumnya data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal memuat data kepala desa sebelumnya",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// PUT /api/kepala-desa-sebelumnya - Save/update former village heads data
export async function PUT(request: NextRequest) {
  try {
    // Require authentication
    const user = requireAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { kepalaDesaList } = body;

    // Validate required fields
    if (!kepalaDesaList || !Array.isArray(kepalaDesaList)) {
      return NextResponse.json(
        {
          success: false,
          error: "Data kepala desa tidak valid",
        },
        { status: 400 },
      );
    }

    // Prepare konten as JSON string containing the list
    const kontenData = {
      kepalaDesaList: kepalaDesaList || [],
    };

    const kontenJson = JSON.stringify(kontenData);

    // Check if entry exists
    const existingData = await prisma.profileDesa.findFirst({
      where: {
        section: "kepala_desa_sebelumnya",
      },
      orderBy: {
        urutan: "asc",
      },
    });

    let savedData;

    if (existingData) {
      // Update existing
      savedData = await prisma.profileDesa.update({
        where: {
          id: existingData.id,
        },
        data: {
          judul: "Kepala Desa Sebelumnya",
          konten: kontenJson,
          aktif: true,
          section: "kepala_desa_sebelumnya",
        },
      });
    } else {
      // Create new
      savedData = await prisma.profileDesa.create({
        data: {
          judul: "Kepala Desa Sebelumnya",
          konten: kontenJson,
          section: "kepala_desa_sebelumnya",
          urutan: 0,
          aktif: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Data kepala desa sebelumnya berhasil disimpan",
      data: savedData,
    });
  } catch (error) {
    console.error("Error saving kepala desa sebelumnya data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal menyimpan data kepala desa sebelumnya",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
