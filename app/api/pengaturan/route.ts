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
          namaSitus: "Desa Tababo Selatan",
          tagline: "",
          deskripsiSitus: "",
          alamatKantor: "",
          emailKontak: "",
          teleponKontak: "",
          jamOperasional: "",
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: pengaturan,
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

    const existing = await prisma.pengaturan.findFirst();

    let pengaturan;
    if (existing) {
      pengaturan = await prisma.pengaturan.update({
        where: { id: existing.id },
        data: body,
      });
    } else {
      pengaturan = await prisma.pengaturan.create({
        data: body,
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
