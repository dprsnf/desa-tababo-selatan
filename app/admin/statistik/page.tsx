"use client";

import { useEffect, useState } from "react";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import { apiClient, StatistikData } from "@/lib/api-client";
import AdminNavbar from "@/components/AdminNavbar";
import { FaSave, FaUsers, FaMale, FaFemale, FaHome, FaMapMarkedAlt, FaMapMarkerAlt, FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";
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
    latitude: 0.9629460591112564,
    longitude: 124.80253311393106,
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
      // Calculate total penduduk from laki-laki + perempuan
      const dataToSubmit = {
        ...formData,
        jumlahPenduduk: formData.lakiLaki + formData.perempuan,
      };
      await apiClient.updateStatistik(dataToSubmit);
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
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50">
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
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50">
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
          <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-semibold mb-1">Total Penduduk</p>
                <p className="text-3xl font-bold">{(formData.lakiLaki + formData.perempuan).toLocaleString("id-ID")}</p>
                <p className="text-xs text-blue-200 mt-1">Otomatis dihitung</p>
              </div>
              <FaUsers className="text-5xl text-blue-200 opacity-50" />
            </div>
          </div>
          <div className="bg-linear-to-br from-cyan-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm font-semibold mb-1">Laki-laki</p>
                <p className="text-3xl font-bold">{formData.lakiLaki.toLocaleString("id-ID")}</p>
                <p className="text-xs text-cyan-200 mt-1">
                  {calculatePercentage(formData.lakiLaki, formData.lakiLaki + formData.perempuan)}%
                </p>
              </div>
              <FaMale className="text-5xl text-cyan-200 opacity-50" />
            </div>
          </div>

          <div className="bg-linear-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm font-semibold mb-1">Perempuan</p>
                <p className="text-3xl font-bold">{formData.perempuan.toLocaleString("id-ID")}</p>
                <p className="text-xs text-pink-200 mt-1">
                  {calculatePercentage(formData.perempuan, formData.lakiLaki + formData.perempuan)}%
                </p>
              </div>
              <FaFemale className="text-5xl text-pink-200 opacity-50" />
            </div>
          </div>

          <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
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
                    Total Penduduk
                  </label>
                  <input
                    type="number"
                    value={formData.lakiLaki + formData.perempuan}
                    disabled
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Otomatis dihitung dari laki-laki + perempuan
                  </p>
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

            {/* Koordinat Peta */}
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-600" />
                Koordinat Lokasi Peta
              </h3>
              
              {/* Tips Section */}
              <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-blue-600 text-xl flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-blue-900 mb-2">💡 Cara Mendapatkan Koordinat:</h4>
                    <ol className="text-sm text-blue-800 space-y-2 ml-4 list-decimal">
                      <li>Buka <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-blue-600">Google Maps</a></li>
                      <li>Cari lokasi yang diinginkan</li>
                      <li>Klik kanan pada lokasi tersebut</li>
                      <li>Pilih koordinat yang muncul di bagian atas menu (format: latitude, longitude)</li>
                      <li>Salin dan paste koordinat tersebut ke form di bawah</li>
                    </ol>
                    <div className="mt-3 p-2 bg-white rounded border border-blue-200">
                      <p className="text-xs text-blue-700 font-mono">
                        Contoh: 0.9629460591112564, 124.80253311393106
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Latitude (Garis Lintang) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        latitude: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all font-mono"
                    placeholder="0.9629460591112564"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Koordinat vertikal (-90 hingga 90)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Longitude (Garis Bujur) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        longitude: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all font-mono"
                    placeholder="124.80253311393106"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Koordinat horizontal (-180 hingga 180)
                  </p>
                </div>
              </div>

              {/* Preview Link */}
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <FaMapMarkerAlt className="text-green-600" />
                    <span className="font-semibold">Lihat lokasi di Google Maps:</span>
                  </div>
                  <a
                    href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                  >
                    <FaExternalLinkAlt />
                    Buka Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t-2 border-gray-200 pt-6">
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 px-8 py-3 bg-linear-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl font-semibold ${
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
