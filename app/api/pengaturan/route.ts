import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET pengaturan
export async function GET() {
  try {
    const pengaturan = await prisma.pengaturan.findFirst();

    if (!pengaturan) {
      // Return default jika belum ada
      return NextResponse.json({
        success: true,
        data: {
          namaDesa: "Desa Tababo Selatan",
          tagline: "",
          alamat: "",
          kecamatan: "",
          kabupaten: "",
          provinsi: "",
          kodePos: "",
          email: "",
          telepon: "",
          whatsapp: "",
          facebook: "",
          instagram: "",
          youtube: "",
          logo: "",
          visi: "",
          misi: "",
          sejarah: "",
          jamOperasional: "",
          kepalaDesaNama: "",
          kepalaDesaNIP: "",
          kepalaDesaFoto: ""
        },
      });
    }

    // Map database fields to frontend fields
    const mappedData = {
      namaDesa: pengaturan.namaSitus || "",
      tagline: pengaturan.tagline || "",
      alamat: pengaturan.alamatKantor || "",
      kecamatan: "",
      kabupaten: "",
      provinsi: "",
      kodePos: pengaturan.kodePos || "",
      email: pengaturan.emailKontak || "",
      telepon: pengaturan.teleponKontak || "",
      whatsapp: pengaturan.teleponKontak || "",
      facebook: pengaturan.facebook || "",
      instagram: pengaturan.instagram || "",
      youtube: pengaturan.youtube || "",
      logo: pengaturan.logo || "",
      visi: "",
      misi: "",
      sejarah: "",
      jamOperasional: pengaturan.jamOperasional || "",
      kepalaDesaNama: "",
      kepalaDesaNIP: "",
      kepalaDesaFoto: ""
    };

    return NextResponse.json({
      success: true,
      data: mappedData,
    });
  } catch (error) {
    console.error("Get pengaturan error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// UPDATE pengaturan
export async function PUT(request: NextRequest) {
  try {
    requireAuth(request);

    const body = await request.json();

    // Map frontend fields to database fields
    const mappedData: {
      namaSitus?: string;
      tagline?: string;
      deskripsiSitus: string;
      alamatKantor: string;
      kodePos?: string;
      emailKontak?: string;
      teleponKontak?: string;
      facebook?: string;
      instagram?: string;
      twitter?: string;
      youtube?: string;
      logo?: string;
      jamOperasional?: string;
    } = {
      // Set required fields with default values
      deskripsiSitus: body.sejarah || body.visi || "Website Desa",
      alamatKantor: body.alamat || "",
    };

    // Map optional fields
    if (body.namaDesa !== undefined) mappedData.namaSitus = body.namaDesa;
    if (body.tagline !== undefined) mappedData.tagline = body.tagline;
    if (body.kodePos !== undefined) mappedData.kodePos = body.kodePos;
    if (body.email !== undefined) mappedData.emailKontak = body.email;
    if (body.telepon !== undefined) mappedData.teleponKontak = body.telepon;
    if (body.facebook !== undefined) mappedData.facebook = body.facebook;
    if (body.instagram !== undefined) mappedData.instagram = body.instagram;
    if (body.youtube !== undefined) mappedData.youtube = body.youtube;
    if (body.logo !== undefined) mappedData.logo = body.logo;
    if (body.jamOperasional !== undefined) mappedData.jamOperasional = body.jamOperasional;

    const existing = await prisma.pengaturan.findFirst();

    let pengaturan;
    if (existing) {
      pengaturan = await prisma.pengaturan.update({
        where: { id: existing.id },
        data: mappedData,
      });
    } else {
      // Create with all required fields
      pengaturan = await prisma.pengaturan.create({
        data: mappedData,
      });
    }

    return NextResponse.json({
      success: true,
      data: pengaturan,
    });
  } catch (error) {
    // Handle auth errors
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Update pengaturan error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
