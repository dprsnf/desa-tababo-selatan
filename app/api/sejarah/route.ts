import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET /api/sejarah - Load sejarah data
export async function GET() {
  try {
    // Find ProfileDesa entry with section="sejarah"
    const sejarahData = await prisma.profileDesa.findFirst({
      where: {
        section: "sejarah",
        aktif: true,
      },
      orderBy: {
        urutan: "asc",
      },
    });

    if (sejarahData) {
      // Parse konten as JSON to get complex data
      let parsedData;
      try {
        parsedData = JSON.parse(sejarahData.konten);
      } catch {
        // If konten is not JSON, use defaults
        parsedData = null;
      }

      // Return structured data
      return NextResponse.json({
        success: true,
        data: {
          judulUtama: sejarahData.judul || "Sejarah Desa Tababo Selatan",
          deskripsiHero:
            parsedData?.deskripsiHero ||
            "Desa yang Kaya Akan Sejarah dan Budaya",
          asalUsul:
            parsedData?.asalUsul ||
            "Desa Tababo Selatan memiliki sejarah panjang yang dimulai dari...",
          timeline: parsedData?.timeline || [
            { tahun: "1945", peristiwa: "Berdirinya Desa Tababo Selatan" },
          ],
          budaya: parsedData?.budaya || [
            {
              nama: "Upacara Adat",
              emoji: "🎭",
              deskripsi: "Deskripsi upacara adat...",
            },
          ],
          tokohPenting: parsedData?.tokohPenting || [
            { nama: "Tokoh 1", peran: "Pendiri Desa", periode: "1945-1960" },
          ],
        },
      });
    }

    // Return default data if not found
    return NextResponse.json({
      success: true,
      data: {
        judulUtama: "Sejarah Desa Tababo Selatan",
        deskripsiHero: "Desa yang Kaya Akan Sejarah dan Budaya",
        asalUsul:
          "Desa Tababo Selatan memiliki sejarah panjang yang dimulai dari...",
        timeline: [
          { tahun: "1945", peristiwa: "Berdirinya Desa Tababo Selatan" },
          { tahun: "1960", peristiwa: "Pembangunan infrastruktur awal" },
          { tahun: "1980", peristiwa: "Pemekaran wilayah desa" },
          { tahun: "2000", peristiwa: "Modernisasi pemerintahan desa" },
          { tahun: "2020", peristiwa: "Desa mandiri dan sejahtera" },
        ],
        budaya: [
          {
            nama: "Upacara Adat",
            emoji: "🎭",
            deskripsi: "Deskripsi upacara adat...",
          },
          {
            nama: "Tarian Tradisional",
            emoji: "💃",
            deskripsi: "Deskripsi tarian...",
          },
          {
            nama: "Kuliner Khas",
            emoji: "🍲",
            deskripsi: "Deskripsi kuliner...",
          },
          {
            nama: "Kerajinan Lokal",
            emoji: "🎨",
            deskripsi: "Deskripsi kerajinan...",
          },
        ],
        tokohPenting: [
          { nama: "Tokoh 1", peran: "Pendiri Desa", periode: "1945-1960" },
          { nama: "Tokoh 2", peran: "Tokoh Pendidikan", periode: "1960-1980" },
        ],
      },
    });
  } catch (error) {
    console.error("Error loading sejarah data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal memuat data sejarah",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// PUT /api/sejarah - Save/update sejarah data
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
    const {
      judulUtama,
      deskripsiHero,
      asalUsul,
      timeline,
      budaya,
      tokohPenting,
    } = body;

    // Validate required fields
    if (!judulUtama || !asalUsul) {
      return NextResponse.json(
        {
          success: false,
          error: "Judul dan Asal Usul wajib diisi",
        },
        { status: 400 },
      );
    }

    // Prepare konten as JSON string containing all complex data
    const kontenData = {
      deskripsiHero,
      asalUsul,
      timeline: timeline || [],
      budaya: budaya || [],
      tokohPenting: tokohPenting || [],
    };

    const kontenJson = JSON.stringify(kontenData);

    // Check if sejarah entry exists
    const existingSejarah = await prisma.profileDesa.findFirst({
      where: {
        section: "sejarah",
      },
      orderBy: {
        urutan: "asc",
      },
    });

    let savedSejarah;

    if (existingSejarah) {
      // Update existing
      savedSejarah = await prisma.profileDesa.update({
        where: {
          id: existingSejarah.id,
        },
        data: {
          judul: judulUtama,
          konten: kontenJson,
          aktif: true,
          section: "sejarah",
        },
      });
    } else {
      // Create new
      savedSejarah = await prisma.profileDesa.create({
        data: {
          judul: judulUtama,
          konten: kontenJson,
          section: "sejarah",
          urutan: 0,
          aktif: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Data sejarah berhasil disimpan",
      data: savedSejarah,
    });
  } catch (error) {
    console.error("Error saving sejarah data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal menyimpan data sejarah",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
