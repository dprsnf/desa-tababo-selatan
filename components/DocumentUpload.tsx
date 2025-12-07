"use client";

import { useState, useRef } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaUpload, FaTrash, FaSpinner, FaCheckCircle } from "react-icons/fa";

interface DocumentUploadProps {
  value?: string; // Current document URL
  onChange: (url: string, metadata?: DocumentMetadata) => void;
  folder?: string;
  acceptedFormats?: string[];
  maxSize?: number; // in MB
  label?: string;
  required?: boolean;
}

interface DocumentMetadata {
  fileName: string;
  fileSize: number;
  fileType: string;
  publicId: string;
}

export default function DocumentUpload({
  value,
  onChange,
  folder = "pertanggungjawaban",
  acceptedFormats = [".pdf", ".doc", ".docx", ".xls", ".xlsx"],
  maxSize = 20,
  label = "Upload Dokumen",
  required = false,
}: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<DocumentMetadata | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf":
        return <FaFilePdf className="text-red-500 text-4xl" />;
      case "doc":
      case "docx":
        return <FaFileWord className="text-blue-500 text-4xl" />;
      case "xls":
      case "xlsx":
        return <FaFileExcel className="text-green-500 text-4xl" />;
      default:
        return <FaFilePdf className="text-gray-500 text-4xl" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File terlalu besar. Maksimal ${maxSize}MB`);
      return;
    }

    // Validate file type
    const fileExt = `.${file.name.split(".").pop()?.toLowerCase()}`;
    if (!acceptedFormats.includes(fileExt)) {
      setError(`Format file tidak didukung. Format yang diterima: ${acceptedFormats.join(", ")}`);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      formData.append("type", "document");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload gagal");
      }

      const data = await response.json();
      
      const docMetadata: DocumentMetadata = {
        fileName: data.fileName,
        fileSize: data.fileSize,
        fileType: data.fileType,
        publicId: data.publicId,
      };

      setMetadata(docMetadata);
      onChange(data.url, docMetadata);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload gagal");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
    setMetadata(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Upload Area */}
      {!value && (
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFormats.join(",")}
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
            id="document-upload"
          />
          <label
            htmlFor="document-upload"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
              uploading
                ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                : "border-gray-300 hover:border-green-500 bg-gray-50 hover:bg-green-50"
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <FaSpinner className="text-3xl text-green-600 animate-spin mb-2" />
                <span className="text-sm text-gray-600">Mengupload...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FaUpload className="text-3xl text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 mb-1">
                  Klik untuk upload dokumen
                </span>
                <span className="text-xs text-gray-500">
                  {acceptedFormats.join(", ")} (Max {maxSize}MB)
                </span>
              </div>
            )}
          </label>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative border-2 border-green-500 rounded-lg p-4 bg-green-50">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="shrink-0">
              {getFileIcon(metadata?.fileName || value)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <FaCheckCircle className="text-green-600 shrink-0" />
                <p className="text-sm font-medium text-gray-900 truncate">
                  {metadata?.fileName || "Dokumen"}
                </p>
              </div>
              {metadata && (
                <p className="text-xs text-gray-600">
                  {formatFileSize(metadata.fileSize)}
                </p>
              )}
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-green-600 hover:text-green-700 underline"
              >
                Lihat dokumen
              </a>
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={handleRemove}
              className="shrink-0 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              title="Hapus dokumen"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Info */}
      <p className="text-xs text-gray-500">
        Format yang didukung: {acceptedFormats.join(", ")}. Ukuran maksimal: {maxSize}MB
      </p>
    </div>
  );
}
