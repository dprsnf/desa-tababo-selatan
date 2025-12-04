import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username dan password harus diisi" },
        { status: 400 },
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        namaLengkap: true,
        role: true,
        fotoProfil: true,
        password: true,
        aktif: true,
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: "Username atau password salah",
        },
        { status: 401 },
      );
    }

    if (!admin.aktif) {
      return NextResponse.json(
        {
          success: false,
          error: "Akun admin tidak aktif",
        },
        { status: 403 },
      );
    }

    const isValidPassword = await verifyPassword(password, admin.password);

    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Username atau password salah",
        },
        { status: 401 },
      );
    }

    const token = generateToken({
      userId: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = admin;

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: userWithoutPassword,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan saat login",
      },
      { status: 500 },
    );
  }
}
