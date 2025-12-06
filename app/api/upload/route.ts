import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import sharp from "sharp";
import { requireAuth } from "@/lib/auth";

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed file types
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    requireAuth(request);

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Only JPEG, PNG, and WebP are allowed.",
        },
        { status: 400 },
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size too large. Maximum size is 5MB." },
        { status: 400 },
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split(".").pop() || "jpg";
    const filename = `${timestamp}-${randomString}.${extension}`;

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const filepath = path.join(uploadsDir, filename);

    // Optimize and save image
    try {
      await sharp(buffer)
        .resize(1920, 1920, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 85 })
        .toFile(filepath);
    } catch (error) {
      console.error("Error processing image:", error);
      return NextResponse.json(
        { error: "Failed to process image" },
        { status: 500 },
      );
    }

    // Generate thumbnail
    const thumbnailFilename = `thumb-${filename}`;
    const thumbnailPath = path.join(uploadsDir, thumbnailFilename);

    try {
      await sharp(buffer)
        .resize(400, 400, {
          fit: "cover",
        })
        .jpeg({ quality: 80 })
        .toFile(thumbnailPath);
    } catch (error) {
      console.error("Error creating thumbnail:", error);
    }

    // Return URLs
    const url = `/uploads/${filename}`;
    const thumbnailUrl = `/uploads/${thumbnailFilename}`;

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url,
        thumbnailUrl,
        filename,
        originalName: file.name,
        size: file.size,
        type: file.type,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    requireAuth(request);

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 },
      );
    }

    if (filename.includes("..") || filename.includes("/")) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const filepath = path.join(uploadsDir, filename);
    const thumbnailPath = path.join(uploadsDir, `thumb-${filename}`);

    if (existsSync(filepath)) {
      await unlink(filepath);
    }

    if (existsSync(thumbnailPath)) {
      await unlink(thumbnailPath);
    }

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 },
    );
  }
}
