"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api-client";

export default function CreatePertanggungjawabanPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    judul: "",
    tahunAnggaran: new Date().getFullYear(),
    jenisDokumen: "",
    kategori: "",
    ringkasan: "",
    fileDokumen: "",
    terbit: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await apiClient.createPertanggungjawaban(formData);
      alert("Laporan pertanggungjawaban berhasil ditambahkan");
      router.push("/admin/pertanggungjawaban");
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message ||
        (error as Error).message ||
        "Gagal menambahkan laporan";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Tambah Laporan Pertanggungjawaban
            </h1>
            <p className="text-gray-600 mt-1">
              Tambahkan laporan pertanggungjawaban keuangan desa
            </p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Laporan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.judul}
                onChange={(e) =>
                  setFormData({ ...formData, judul: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                placeholder="Contoh: Laporan Realisasi APBDes 2024"
              />
            </div>

            {/* Tahun & Periode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tahun Anggaran <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.tahunAnggaran}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tahunAnggaran: parseInt(e.target.value),
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
                  Kategori
                </label>
                <input
                  type="text"
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({ ...formData, kategori: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                  placeholder="Contoh: Belanja Desa, Pendapatan Desa"
                />
              </div>
            </div>

            {/* Jenis Dokumen */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Dokumen <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.jenisDokumen}
                onChange={(e) =>
                  setFormData({ ...formData, jenisDokumen: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
              >
                <option value="">Pilih jenis dokumen</option>
                <option value="APBDes">
                  APBDes (Anggaran Pendapatan dan Belanja Desa)
                </option>
                <option value="Realisasi">Realisasi Anggaran</option>
                <option value="SILPA">
                  SILPA (Sisa Lebih Pembiayaan Anggaran)
                </option>
                <option value="LPJ">LPJ (Laporan Pertanggungjawaban)</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            {/* Ringkasan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ringkasan
              </label>
              <textarea
                rows={4}
                value={formData.ringkasan}
                onChange={(e) =>
                  setFormData({ ...formData, ringkasan: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                placeholder="Tuliskan ringkasan singkat laporan pertanggungjawaban..."
              />
            </div>

            {/* Dokumen URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL File Dokumen (PDF)
              </label>
              <input
                type="url"
                value={formData.fileDokumen}
                onChange={(e) =>
                  setFormData({ ...formData, fileDokumen: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                placeholder="https://example.com/dokumen.pdf"
              />
              <p className="mt-1 text-sm text-gray-500">
                Pastikan dokumen dapat diakses secara publik
              </p>
            </div>

            {/* Status Terbit */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.terbit}
                  onChange={(e) =>
                    setFormData({ ...formData, terbit: e.target.checked })
                  }
                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Publikasikan laporan (dapat dilihat di website publik)
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Menyimpan..." : "Simpan Laporan"}
              </button>
              <Link
                href="/admin/pertanggungjawaban"
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors text-center font-medium"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>Tips:</strong> Pastikan dokumen PDF sudah diunggah ke cloud
            storage (Google Drive, Dropbox, dll) dan dapat diakses publik.
            Gunakan status "Draft" jika laporan belum siap dipublikasikan.
          </p>
        </div>
      </div>
    </div>
  );
}
