import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest, hashPassword, verifyPassword } from "@/lib/auth";

export async function PUT(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { username, currentPassword, newPassword, confirmPassword } = body;

    // Get current admin data
    const admin = await prisma.admin.findUnique({
      where: { id: user.userId },
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "User tidak ditemukan" },
        { status: 404 },
      );
    }

    // Prepare update data
    const updateData: {
      username?: string;
      password?: string;
    } = {};

    // Update username if provided
    if (username && username !== admin.username) {
      // Check if username is already taken
      const existingUser = await prisma.admin.findUnique({
        where: { username },
      });

      if (existingUser && existingUser.id !== admin.id) {
        return NextResponse.json(
          { success: false, error: "Username sudah digunakan" },
          { status: 400 },
        );
      }

      updateData.username = username;
    }

    // Update password if provided
    if (newPassword) {
      // Verify current password
      if (!currentPassword) {
        return NextResponse.json(
          { success: false, error: "Password saat ini harus diisi" },
          { status: 400 },
        );
      }

      const isValidPassword = await verifyPassword(
        currentPassword,
        admin.password,
      );

      if (!isValidPassword) {
        return NextResponse.json(
          { success: false, error: "Password saat ini salah" },
          { status: 400 },
        );
      }

      // Validate new password
      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, error: "Password baru minimal 6 karakter" },
          { status: 400 },
        );
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { success: false, error: "Konfirmasi password tidak cocok" },
          { status: 400 },
        );
      }

      updateData.password = await hashPassword(newPassword);
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: "Tidak ada perubahan" },
        { status: 400 },
      );
    }

    // Update admin data
    const updatedAdmin = await prisma.admin.update({
      where: { id: admin.id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        namaLengkap: true,
        role: true,
        fotoProfil: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profil berhasil diperbarui",
      data: {
        user: updatedAdmin,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
