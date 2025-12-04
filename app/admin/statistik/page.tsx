"use client";

import { useEffect, useState } from "react";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import { apiClient, StatistikData } from "@/lib/api-client";
import AdminNavbar from "@/components/AdminNavbar";
import { FaSave, FaUsers, FaMale, FaFemale, FaHome, FaMapMarkedAlt } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";

function StatistikPage() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState<StatistikData>({
    jumlahPenduduk: 0,
    lakiLaki: 0,
    perempuan: 0,
    jumlahKeluarga: 0,
    luasWilayah: "",
    jumlahRW: 0,
    jumlahRT: 0,
    jumlahDusun: 0,
  });

  useEffect(() => {
    loadStatistik();
  }, []);

  const loadStatistik = async () => {
    try {
      setLoadingData(true);
      const response = await apiClient.getStatistik();

      if (response.success && response.data) {
        setFormData(response.data);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal memuat data statistik";
      alert(errorMessage);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.updateStatistik(formData);
      alert("Data statistik berhasil diperbarui!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal memperbarui data statistik";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return ((value / total) * 100).toFixed(1);
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
        <AdminNavbar onLogout={logout} />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
            <p className="text-gray-600">Memuat data statistik...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={logout} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <MdBarChart className="text-orange-600" />
                Statistik Desa
              </h1>
              <p className="text-gray-600 mt-1">
                Kelola data statistik dan demografi desa
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-semibold mb-1">Total Penduduk</p>
                <p className="text-3xl font-bold">{formData.jumlahPenduduk.toLocaleString("id-ID")}</p>
              </div>
              <FaUsers className="text-5xl text-blue-200 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm font-semibold mb-1">Laki-laki</p>
                <p className="text-3xl font-bold">{formData.lakiLaki.toLocaleString("id-ID")}</p>
                <p className="text-xs text-cyan-200 mt-1">
                  {calculatePercentage(formData.lakiLaki, formData.jumlahPenduduk)}%
                </p>
              </div>
              <FaMale className="text-5xl text-cyan-200 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm font-semibold mb-1">Perempuan</p>
                <p className="text-3xl font-bold">{formData.perempuan.toLocaleString("id-ID")}</p>
                <p className="text-xs text-pink-200 mt-1">
                  {calculatePercentage(formData.perempuan, formData.jumlahPenduduk)}%
                </p>
              </div>
              <FaFemale className="text-5xl text-pink-200 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-semibold mb-1">Jumlah KK</p>
                <p className="text-3xl font-bold">{formData.jumlahKeluarga.toLocaleString("id-ID")}</p>
              </div>
              <FaHome className="text-5xl text-purple-200 opacity-50" />
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Data Statistik</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Demografi Penduduk */}
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaUsers className="text-blue-600" />
                Demografi Penduduk
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Penduduk <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.jumlahPenduduk}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jumlahPenduduk: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Laki-laki <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.lakiLaki}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lakiLaki: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Perempuan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.perempuan}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        perempuan: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah Keluarga (KK) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.jumlahKeluarga}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jumlahKeluarga: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Validation Warning */}
              {formData.lakiLaki + formData.perempuan !== formData.jumlahPenduduk && (
                <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <p className="text-sm text-yellow-800 font-semibold">
                    ⚠️ Peringatan: Jumlah laki-laki + perempuan ({formData.lakiLaki + formData.perempuan}) tidak sama dengan total penduduk ({formData.jumlahPenduduk})
                  </p>
                </div>
              )}
            </div>

            {/* Wilayah Administratif */}
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaMapMarkedAlt className="text-green-600" />
                Wilayah Administratif
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Luas Wilayah <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.luasWilayah}
                    onChange={(e) =>
                      setFormData({ ...formData, luasWilayah: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="Contoh: 12.5 km² atau 1250 Ha"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: angka + satuan (km² atau Ha)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah Dusun <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.jumlahDusun}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jumlahDusun: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah RW <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.jumlahRW}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jumlahRW: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah RT <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.jumlahRT}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jumlahRT: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t-2 border-gray-200 pt-6">
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl font-semibold ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <FaSave />
                      <span>Simpan Perubahan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withAuth(StatistikPage);
