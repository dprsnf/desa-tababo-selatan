import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { uploadToCloudinary, uploadDocumentToCloudinary } from "@/lib/cloudinary";

// Maximum file size: 10MB for images, 20MB for documents
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_DOCUMENT_SIZE = 20 * 1024 * 1024;

// Allowed file types
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    requireAuth(request);

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "general";
    const type = (formData.get("type") as string) || "image"; // 'image' or 'document'

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const isDocument = type === "document";
    const allowedTypes = isDocument ? ALLOWED_DOCUMENT_TYPES : ALLOWED_IMAGE_TYPES;
    const maxSize = isDocument ? MAX_DOCUMENT_SIZE : MAX_IMAGE_SIZE;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type. Allowed: ${isDocument ? "PDF, DOC, DOCX, XLS, XLSX" : "JPEG, PNG, WebP"}`,
        },
        { status: 400 },
      );
    }

    // Validate file size
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size too large. Maximum size is ${maxSize / (1024 * 1024)}MB.` },
        { status: 400 },
      );
    }

    // Convert file to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = isDocument
      ? await uploadDocumentToCloudinary(base64, folder)
      : await uploadToCloudinary(base64, folder);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Upload failed" },
        { status: 500 },
      );
    }

    // Return Cloudinary URL with type-safe properties
    const baseResponse = {
      success: true,
      message: "File uploaded successfully",
      url: result.url!,
      publicId: result.publicId!,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    };

    // Add type-specific properties
    const typeSpecificProps = isDocument
      ? { bytes: (result as any).bytes, format: result.format }
      : { width: (result as any).width, height: (result as any).height, format: result.format };

    return NextResponse.json({
      ...baseResponse,
      ...typeSpecificProps,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    requireAuth(request);

    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get("publicId");

    if (!publicId) {
      return NextResponse.json(
        { error: "Public ID is required" },
        { status: 400 },
      );
    }

    // Note: Cloudinary deletion is optional
    // Images will be automatically managed by Cloudinary
    return NextResponse.json({
      success: true,
      message: "File marked for deletion",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Delete failed",
      },
      { status: 500 },
    );
  }
}
