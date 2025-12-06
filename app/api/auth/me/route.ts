import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        username: true,
        email: true,
        namaLengkap: true,
        role: true,
        fotoProfil: true,
        aktif: true,
      },
    });

    if (!admin || !admin.aktif) {
      return NextResponse.json(
        { success: false, error: "User tidak ditemukan atau tidak aktif" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        user: admin,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
