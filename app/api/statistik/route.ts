import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET statistik
export async function GET() {
  try {
    const stats = await prisma.statistik.findFirst();

    if (!stats) {
      // Return default jika belum ada
      return NextResponse.json({
        success: true,
        data: {
          jumlahPenduduk: 0,
          lakiLaki: 0,
          perempuan: 0,
          jumlahKeluarga: 0,
          luasWilayah: "0",
          jumlahRW: 0,
          jumlahRT: 0,
          jumlahDusun: 0,
          latitude: 0.9629460591112564,
          longitude: 124.80253311393106,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Get statistik error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// UPDATE statistik
export async function PUT(request: NextRequest) {
  try {
    requireAuth(request);

    const body = await request.json();

    const existing = await prisma.statistik.findFirst();

    let stats;
    if (existing) {
      stats = await prisma.statistik.update({
        where: { id: existing.id },
        data: {
          jumlahPenduduk: parseInt(body.jumlahPenduduk) || 0,
          lakiLaki: parseInt(body.lakiLaki) || 0,
          perempuan: parseInt(body.perempuan) || 0,
          jumlahKeluarga: parseInt(body.jumlahKeluarga) || 0,
          luasWilayah: body.luasWilayah || "0",
          jumlahRW: parseInt(body.jumlahRW) || 0,
          jumlahRT: parseInt(body.jumlahRT) || 0,
          jumlahDusun: parseInt(body.jumlahDusun) || 0,
          latitude: body.latitude !== undefined ? parseFloat(body.latitude) : 0.9629460591112564,
          longitude: body.longitude !== undefined ? parseFloat(body.longitude) : 124.80253311393106,
        },
      });
    } else {
      stats = await prisma.statistik.create({
        data: {
          jumlahPenduduk: parseInt(body.jumlahPenduduk) || 0,
          lakiLaki: parseInt(body.lakiLaki) || 0,
          perempuan: parseInt(body.perempuan) || 0,
          jumlahKeluarga: parseInt(body.jumlahKeluarga) || 0,
          luasWilayah: body.luasWilayah || "0",
          jumlahRW: parseInt(body.jumlahRW) || 0,
          jumlahRT: parseInt(body.jumlahRT) || 0,
          jumlahDusun: parseInt(body.jumlahDusun) || 0,
          latitude: body.latitude !== undefined ? parseFloat(body.latitude) : 0.9629460591112564,
          longitude: body.longitude !== undefined ? parseFloat(body.longitude) : 124.80253311393106,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    // Handle auth errors
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Update statistik error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
