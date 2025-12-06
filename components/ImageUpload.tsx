"use client";

import { useState, useRef } from "react";
import { FaUpload, FaTrash, FaImage, FaSpinner } from "react-icons/fa";
import Image from "next/image";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  maxSize?: number; // in MB
  aspectRatio?: string;
  previewHeight?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Upload Gambar",
  maxSize = 5,
  aspectRatio = "16/9",
  previewHeight = "300px",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar");
      return;
    }

    // Validate file size
    const maxBytes = maxSize * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`Ukuran file maksimal ${maxSize}MB`);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload gagal");
      }

      const data = await response.json();
      if (data.success && data.data.url) {
        onChange(data.data.url);
        setPreview(data.data.url);
      } else {
        throw new Error("Upload gagal");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Upload gagal");
      setPreview(value || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Preview or Upload Area */}
      <div
        className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors"
        style={{
          aspectRatio: aspectRatio,
          minHeight: previewHeight,
        }}
      >
        {preview ? (
          // Image Preview
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />

            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all flex items-center justify-center gap-3 opacity-0 hover:opacity-100">
              <button
                type="button"
                onClick={handleClick}
                disabled={uploading}
                className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-2 font-medium"
              >
                <FaUpload />
                Ganti
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors flex items-center gap-2 font-medium"
              >
                <FaTrash />
                Hapus
              </button>
            </div>
          </div>
        ) : (
          // Upload Placeholder
          <button
            type="button"
            onClick={handleClick}
            disabled={uploading}
            className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            {uploading ? (
              <>
                <FaSpinner className="text-5xl mb-3 animate-spin text-green-600" />
                <p className="text-sm font-medium text-green-600">
                  Uploading...
                </p>
              </>
            ) : (
              <>
                <FaImage className="text-5xl mb-3" />
                <p className="text-sm font-medium mb-1">
                  Klik untuk upload gambar
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, WEBP (max {maxSize}MB)
                </p>
              </>
            )}
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Helper text */}
      {!error && (
        <p className="text-xs text-gray-500">
          Ukuran maksimal {maxSize}MB. Format: PNG, JPG, WEBP
        </p>
      )}
    </div>
  );
}
