import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET /api/keunggulan - Load keunggulan data
export async function GET() {
  try {
    // Find ProfileDesa entry with section="keunggulan"
    const keunggulanData = await prisma.profileDesa.findFirst({
      where: {
        section: "keunggulan",
        aktif: true,
      },
      orderBy: {
        urutan: "asc",
      },
    });

    if (keunggulanData) {
      // Parse konten as JSON to get complex data
      let parsedData;
      try {
        parsedData = JSON.parse(keunggulanData.konten);
      } catch {
        // If konten is not JSON, use defaults
        parsedData = null;
      }

      // Return structured data
      return NextResponse.json({
        success: true,
        data: {
          judulUtama: keunggulanData.judul || "Keunggulan Desa Tababo Selatan",
          deskripsiHero:
            parsedData?.deskripsiHero || "Desa yang Kaya Akan Potensi",
          pertanian: parsedData?.pertanian || [
            { nama: "Padi", emoji: "🌾", deskripsi: "Lahan sawah produktif" },
          ],
          peternakan: parsedData?.peternakan || [
            { nama: "Sapi", emoji: "🐄" },
          ],
          umkm: parsedData?.umkm || [
            {
              nama: "Kerajinan Tangan",
              emoji: "🎨",
              deskripsi: "Deskripsi kerajinan...",
            },
          ],
          wisata: parsedData?.wisata || [
            {
              nama: "Wisata Alam",
              emoji: "🌳",
              deskripsi: "Deskripsi wisata alam...",
            },
          ],
          sdm: parsedData?.sdm || {
            jumlahPenduduk: "2,500+",
            usiaProduktif: "85%",
            kelompokUsaha: "50+",
          },
          infrastruktur: parsedData?.infrastruktur || [
            { nama: "Jalan Desa", emoji: "🛣️" },
          ],
        },
      });
    }

    // Return default data if not found
    return NextResponse.json({
      success: true,
      data: {
        judulUtama: "Keunggulan Desa Tababo Selatan",
        deskripsiHero: "Desa yang Kaya Akan Potensi",
        pertanian: [
          { nama: "Padi", emoji: "🌾", deskripsi: "Lahan sawah produktif" },
          { nama: "Jagung", emoji: "🌽", deskripsi: "Komoditas unggulan" },
          { nama: "Kelapa", emoji: "🥥", deskripsi: "Perkebunan berkualitas" },
        ],
        peternakan: [
          { nama: "Sapi", emoji: "🐄" },
          { nama: "Kambing", emoji: "🐐" },
          { nama: "Ayam", emoji: "🐔" },
          { nama: "Bebek", emoji: "🦆" },
        ],
        umkm: [
          {
            nama: "Kerajinan Tangan",
            emoji: "🎨",
            deskripsi: "Deskripsi kerajinan...",
          },
          {
            nama: "Produk Olahan Pangan",
            emoji: "🍱",
            deskripsi: "Deskripsi produk...",
          },
          {
            nama: "Jasa dan Perdagangan",
            emoji: "💼",
            deskripsi: "Deskripsi jasa...",
          },
          {
            nama: "Industri Rumahan",
            emoji: "🏭",
            deskripsi: "Deskripsi industri...",
          },
        ],
        wisata: [
          {
            nama: "Wisata Alam",
            emoji: "🌳",
            deskripsi: "Deskripsi wisata alam...",
          },
          {
            nama: "Wisata Budaya",
            emoji: "🏛️",
            deskripsi: "Deskripsi wisata budaya...",
          },
          {
            nama: "Wisata Desa",
            emoji: "🏘️",
            deskripsi: "Deskripsi wisata desa...",
          },
          {
            nama: "Wisata Perikanan",
            emoji: "🎣",
            deskripsi: "Deskripsi wisata perikanan...",
          },
        ],
        sdm: {
          jumlahPenduduk: "2,500+",
          usiaProduktif: "85%",
          kelompokUsaha: "50+",
        },
        infrastruktur: [
          { nama: "Jalan Desa", emoji: "🛣️" },
          { nama: "Listrik", emoji: "💡" },
          { nama: "Air Bersih", emoji: "💧" },
          { nama: "Internet", emoji: "📡" },
          { nama: "Kesehatan", emoji: "🏥" },
          { nama: "Pendidikan", emoji: "🏫" },
          { nama: "Ibadah", emoji: "🕌" },
          { nama: "Kantor Desa", emoji: "🏢" },
        ],
      },
    });
  } catch (error) {
    console.error("Error loading keunggulan data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal memuat data keunggulan",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// PUT /api/keunggulan - Save/update keunggulan data
export async function PUT(request: NextRequest) {
  try {
    // Require authentication
    let user;
    try {
      user = requireAuth(request);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const {
      judulUtama,
      deskripsiHero,
      pertanian,
      peternakan,
      umkm,
      wisata,
      sdm,
      infrastruktur,
    } = body;

    // Validate required fields
    if (!judulUtama) {
      return NextResponse.json(
        {
          success: false,
          error: "Judul wajib diisi",
        },
        { status: 400 },
      );
    }

    // Prepare konten as JSON string containing all complex data
    const kontenData = {
      deskripsiHero,
      pertanian: pertanian || [],
      peternakan: peternakan || [],
      umkm: umkm || [],
      wisata: wisata || [],
      sdm: sdm || {
        jumlahPenduduk: "0",
        usiaProduktif: "0%",
        kelompokUsaha: "0",
      },
      infrastruktur: infrastruktur || [],
    };

    const kontenJson = JSON.stringify(kontenData);

    // Check if keunggulan entry exists
    const existingKeunggulan = await prisma.profileDesa.findFirst({
      where: {
        section: "keunggulan",
      },
      orderBy: {
        urutan: "asc",
      },
    });

    let savedKeunggulan;

    if (existingKeunggulan) {
      // Update existing
      savedKeunggulan = await prisma.profileDesa.update({
        where: {
          id: existingKeunggulan.id,
        },
        data: {
          judul: judulUtama,
          konten: kontenJson,
          aktif: true,
          section: "keunggulan",
        },
      });
    } else {
      // Create new
      savedKeunggulan = await prisma.profileDesa.create({
        data: {
          judul: judulUtama,
          konten: kontenJson,
          section: "keunggulan",
          urutan: 0,
          aktif: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Data keunggulan berhasil disimpan",
      data: savedKeunggulan,
    });
  } catch (error) {
    console.error("Error saving keunggulan data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal menyimpan data keunggulan",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
