import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET all FAQs (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get("kategori");
    const aktif = searchParams.get("aktif");

    const where: any = {};

    if (kategori) {
      where.kategori = kategori;
    }

    if (aktif !== null && aktif !== undefined) {
      where.aktif = aktif === "true";
    }

    const faqs = await prisma.fAQ.findMany({
      where,
      orderBy: [{ urutan: "asc" }, { dibuat: "desc" }],
    });

    return NextResponse.json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    console.error("Get FAQs error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// POST create new FAQ (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    requireAuth(request);

    const body = await request.json();
    const { pertanyaan, jawaban, kategori, urutan, aktif } = body;

    // Validate
    if (!pertanyaan || !jawaban) {
      return NextResponse.json(
        { error: "Pertanyaan dan jawaban harus diisi" },
        { status: 400 },
      );
    }

    const faq = await prisma.fAQ.create({
      data: {
        pertanyaan,
        jawaban,
        kategori: kategori || null,
        urutan: urutan || 0,
        aktif: aktif !== undefined ? aktif : true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "FAQ berhasil dibuat",
      data: faq,
    });
  } catch (error) {
    // Handle auth errors
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Create FAQ error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
