"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api-client";
import ImageUpload from "@/components/ImageUpload";

export default function EditPerangkatPage() {
  const router = useRouter();
  const params = useParams();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    namaLengkap: "",
    jabatan: "",
    foto: "",
    nip: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoadingData(true);
      const response = await apiClient.getPerangkatById(params.id as string);

      if (response.success && response.data) {
        const data = response.data;
        setFormData({
          namaLengkap: data.namaLengkap || "",
          jabatan: data.jabatan || "",
          foto: data.foto || "",
          nip: data.nip || "",
        });
      }
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message ||
        (error as Error).message ||
        "Gagal memuat data perangkat";
      alert(errorMessage);
      router.push("/admin/perangkat");
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await apiClient.updatePerangkat(params.id as string, formData);
      alert("Perangkat berhasil diperbarui");
      router.push("/admin/perangkat");
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message ||
        (error as Error).message ||
        "Gagal memperbarui perangkat";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Edit Perangkat Desa
            </h1>
            <p className="text-gray-600 mt-1">
              Perbarui informasi perangkat desa
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
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.namaLengkap}
                onChange={(e) =>
                  setFormData({ ...formData, namaLengkap: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            {/* Jabatan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jabatan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.jabatan}
                onChange={(e) =>
                  setFormData({ ...formData, jabatan: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Contoh: Kepala Desa, Sekretaris Desa"
              />
            </div>

            {/* NIP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NIP (Opsional)
              </label>
              <input
                type="text"
                value={formData.nip}
                onChange={(e) =>
                  setFormData({ ...formData, nip: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nomor Induk Pegawai"
              />
            </div>

            {/* Foto */}
            <div>
              <ImageUpload
                label="Foto Perangkat *"
                value={formData.foto}
                onChange={(url) =>
                  setFormData({ ...formData, foto: url || "" })
                }
                folder="perangkat"
                aspectRatio="1/1"
                previewHeight="300px"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
              <Link
                href="/admin/perangkat"
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors text-center font-medium"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-800">
            <strong>Tips:</strong> Pastikan URL foto valid dan dapat diakses.
            Gunakan format gambar JPG, PNG, atau WebP untuk hasil terbaik.
          </p>
        </div>
      </div>
    </div>
  );
}
