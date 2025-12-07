"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import AdminNavbar from "@/components/AdminNavbar";
import DocumentUpload from "@/components/DocumentUpload";

interface DokumenData {
  id: string;
  judul: string;
  deskripsi?: string;
  fileUrl: string;
  namaFile: string;
  ukuranFile?: number;
  tipeFile?: string;
  publicId?: string;
  kategori: string;
  tahun: number;
}

export default function EditDokumenPertanggungjawabanPage() {
  const router = useRouter();
  const params = useParams();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState<DokumenData>({
    id: "",
    judul: "",
    deskripsi: "",
    fileUrl: "",
    namaFile: "",
    ukuranFile: 0,
    tipeFile: "",
    publicId: "",
    kategori: "",
    tahun: new Date().getFullYear(),
  });

  const categories = [
    { value: "apbdes", label: "APBDes" },
    { value: "lkpj", label: "LKPJ (Laporan Keterangan Pertanggungjawaban)" },
    { value: "lppd", label: "LPPD (Laporan Penyelenggaraan Pemerintah Desa)" },
    { value: "realisasi", label: "Realisasi Anggaran" },
    { value: "silpa", label: "SILPA (Sisa Lebih Pembiayaan Anggaran)" },
    { value: "lainnya", label: "Lainnya" },
  ];

  useEffect(() => {
    loadDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const loadDocument = async () => {
    try {
      setLoadingData(true);
      const response = await fetch(
        `/api/dokumen-pertanggungjawaban?id=${params.id}`,
      );
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        const doc = data.data[0];
        setFormData({
          id: doc.id,
          judul: doc.judul,
          deskripsi: doc.deskripsi || "",
          fileUrl: doc.fileUrl,
          namaFile: doc.namaFile,
          ukuranFile: doc.ukuranFile,
          tipeFile: doc.tipeFile,
          publicId: doc.publicId || "",
          kategori: doc.kategori,
          tahun: doc.tahun,
        });
      }
    } catch (error) {
      console.error("Error loading document:", error);
      alert("Gagal memuat dokumen");
    } finally {
      setLoadingData(false);
    }
  };

  const handleFileUpload = (
    url: string,
    metadata?: {
      fileName: string;
      fileSize: number;
      fileType: string;
      publicId: string;
    },
  ) => {
    setFormData({
      ...formData,
      fileUrl: url,
      namaFile: metadata?.fileName || formData.namaFile,
      ukuranFile: metadata?.fileSize || formData.ukuranFile,
      tipeFile: metadata?.fileType || formData.tipeFile,
      publicId: metadata?.publicId || formData.publicId,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fileUrl) {
      alert("Silakan upload dokumen terlebih dahulu");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/dokumen-pertanggungjawaban/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (data.success) {
        alert("Dokumen berhasil diperbarui");
        router.push("/admin/pertanggungjawaban/dokumen");
      } else {
        alert(data.error || "Gagal memperbarui dokumen");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal memperbarui dokumen");
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  if (loadingData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-100">
        <AdminNavbar onLogout={logout} />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-100">
      <AdminNavbar onLogout={logout} />

      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Dokumen Pertanggungjawaban
          </h1>
          <p className="text-gray-600 mt-1">
            Perbarui informasi dokumen laporan keuangan
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Dokumen <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.judul}
                onChange={(e) =>
                  setFormData({ ...formData, judul: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                placeholder="Contoh: Laporan Realisasi APBDes Tahun 2024"
              />
            </div>

            {/* Tahun & Kategori */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tahun <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.tahun}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tahun: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({ ...formData, kategori: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                >
                  <option value="">Pilih kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                rows={4}
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                placeholder="Tuliskan deskripsi singkat dokumen..."
              />
            </div>

            {/* Upload Dokumen */}
            <DocumentUpload
              value={formData.fileUrl}
              onChange={handleFileUpload}
              folder="pertanggungjawaban"
              label="Dokumen (Upload baru jika ingin mengganti)"
              required={false}
            />

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || !formData.fileUrl}
                className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
              <Link
                href="/admin/pertanggungjawaban/dokumen"
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors text-center font-medium"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
