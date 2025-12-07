import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Upload image to Cloudinary
 * @param file - File data (base64 or file path)
 * @param folder - Folder name in Cloudinary (e.g., 'berita', 'perangkat', 'program')
 * @returns Upload result with secure URL
 */
export async function uploadToCloudinary(
  file: string,
  folder: string = "desa-tababo-selatan"
) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: `desa-tababo-selatan/${folder}`,
      resource_type: "auto",
      transformation: [
        { width: 1200, height: 800, crop: "limit" }, // Max dimensions
        { quality: "auto:good" }, // Auto quality optimization
        { fetch_format: "auto" }, // Auto format (WebP when supported)
      ],
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Upload document (PDF, DOC, etc.) to Cloudinary
 * @param file - File data (base64 or file path)
 * @param folder - Folder name in Cloudinary
 * @returns Upload result with secure URL
 */
export async function uploadDocumentToCloudinary(
  file: string,
  folder: string = "dokumen"
) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: `desa-tababo-selatan/${folder}`,
      resource_type: "raw", // For non-image files like PDF
      access_mode: "public",
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      bytes: result.bytes,
      originalFilename: result.original_filename,
    };
  } catch (error) {
    console.error("Cloudinary document upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Delete image from Cloudinary
 * @param publicId - Public ID of the image
 * @returns Deletion result
 */
export async function deleteFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: result.result === "ok",
      result: result.result,
    };
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

/**
 * Delete document from Cloudinary
 * @param publicId - Public ID of the document
 * @returns Deletion result
 */
export async function deleteDocumentFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });
    return {
      success: result.result === "ok",
      result: result.result,
    };
  } catch (error) {
    console.error("Cloudinary document delete error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

/**
 * Extract public ID from Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID
 */
export function extractPublicId(url: string): string {
  if (!url) return "";
  
  // Extract public_id from Cloudinary URL
  // Example: https://res.cloudinary.com/cloud-name/image/upload/v123456/folder/image.jpg
  const parts = url.split("/");
  const uploadIndex = parts.indexOf("upload");
  
  if (uploadIndex === -1) return "";
  
  // Get everything after 'upload/v123456/' or 'upload/'
  const afterUpload = parts.slice(uploadIndex + 1);
  
  // Remove version if exists (starts with 'v' followed by numbers)
  const withoutVersion = afterUpload[0]?.match(/^v\d+$/)
    ? afterUpload.slice(1)
    : afterUpload;
  
  // Join remaining parts and remove file extension
  return withoutVersion.join("/").replace(/\.[^/.]+$/, "");
}
