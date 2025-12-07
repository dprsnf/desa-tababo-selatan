"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api-client";

export default function EditLayananPage() {
  const router = useRouter();
  const params = useParams();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    namaLayanan: "",
    deskripsi: "",
    kategori: "",
    persyaratan: "",
    prosedur: "",
    waktuPenyelesaian: "",
    biaya: "",
    kontak: "",
    aktif: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoadingData(true);
      const response = await apiClient.getLayananById(params.id as string);

      if (response.success && response.data) {
        const data = response.data;
        setFormData({
          namaLayanan: data.namaLayanan || "",
          deskripsi: data.deskripsi || "",
          kategori: data.kategori || "",
          persyaratan: (data.persyaratan as string) || "",
          prosedur: data.prosedur || "",
          waktuPenyelesaian: data.waktuPenyelesaian || "",
          biaya: data.biaya || "",
          kontak: data.kontak || "",
          aktif: data.aktif !== undefined ? data.aktif : true,
        });
      }
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message ||
        (error as Error).message ||
        "Gagal memuat data layanan";
      alert(errorMessage);
      router.push("/admin/layanan");
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await apiClient.updateLayanan(params.id as string, formData);
      alert("Layanan berhasil diperbarui");
      router.push("/admin/layanan");
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message ||
        (error as Error).message ||
        "Gagal memperbarui layanan";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-teal-50 to-cyan-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 to-cyan-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Layanan</h1>
            <p className="text-gray-600 mt-1">
              Perbarui informasi layanan publik desa
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
            {/* Nama Layanan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Layanan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.namaLayanan}
                onChange={(e) =>
                  setFormData({ ...formData, namaLayanan: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Contoh: Pembuatan KTP, Surat Keterangan Domisili"
              />
            </div>

            {/* Kategori */}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Pilih kategori</option>
                <option value="Administrasi Kependudukan">
                  Administrasi Kependudukan
                </option>
                <option value="Surat Keterangan">Surat Keterangan</option>
                <option value="Perizinan">Perizinan</option>
                <option value="Pelayanan Umum">Pelayanan Umum</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Jelaskan layanan ini secara detail"
              />
            </div>

            {/* Persyaratan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Persyaratan <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.persyaratan}
                onChange={(e) =>
                  setFormData({ ...formData, persyaratan: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Tuliskan persyaratan yang diperlukan (pisahkan dengan enter untuk daftar)"
              />
              <p className="mt-1 text-sm text-gray-500">
                Contoh: KTP Asli, Kartu Keluarga, Surat Pengantar RT/RW
              </p>
            </div>

            {/* Prosedur */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prosedur <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.prosedur}
                onChange={(e) =>
                  setFormData({ ...formData, prosedur: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Tuliskan langkah-langkah prosedur (pisahkan dengan enter untuk daftar)"
              />
              <p className="mt-1 text-sm text-gray-500">
                Contoh: 1. Datang ke kantor desa, 2. Isi formulir, 3. Serahkan
                persyaratan
              </p>
            </div>

            {/* Waktu Penyelesaian */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Penyelesaian <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.waktuPenyelesaian}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    waktuPenyelesaian: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Contoh: 1-3 hari kerja, 1 minggu"
              />
            </div>

            {/* Biaya */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biaya
              </label>
              <input
                type="text"
                value={formData.biaya}
                onChange={(e) =>
                  setFormData({ ...formData, biaya: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Contoh: Gratis, Rp 10.000 (kosongkan jika gratis)"
              />
            </div>

            {/* Kontak */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kontak
              </label>
              <input
                type="text"
                value={formData.kontak}
                onChange={(e) =>
                  setFormData({ ...formData, kontak: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Contoh: 08123456789, email@desa.id"
              />
            </div>

            {/* Status Aktif */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.aktif}
                  onChange={(e) =>
                    setFormData({ ...formData, aktif: e.target.checked })
                  }
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Layanan aktif (dapat diakses publik)
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
              <Link
                href="/admin/layanan"
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors text-center font-medium"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-teal-50 border border-teal-200 rounded-lg p-4">
          <p className="text-sm text-teal-800">
            <strong>Tips:</strong> Pastikan informasi layanan lengkap dan jelas
            agar mudah dipahami oleh masyarakat. Gunakan bahasa yang sederhana
            dan mudah dimengerti.
          </p>
        </div>
      </div>
    </div>
  );
}
