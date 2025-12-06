"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { FaSave, FaEye, FaImage, FaPlus, FaTrash } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import AdminNavbar from "@/components/AdminNavbar";

function EditBeranda() {
  const router = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    heroTitle: "Desa Tababo Selatan",
    heroSubtitle: "Desa Hijau, Sejahtera, dan Mandiri",
    heroLocation: "Kecamatan [Nama Kecamatan], Kabupaten [Nama Kabupaten]",
    heroImage: "",
    stats: [
      { label: "Jumlah Penduduk", value: "2,500+" },
      { label: "Luas Wilayah", value: "450 Ha" },
      { label: "Dusun", value: "4" },
      { label: "UMKM Aktif", value: "50+" },
    ],
    news: [
      {
        title: "Program Pembangunan Infrastruktur 2024",
        date: "15 November 2024",
      },
      { title: "Pelatihan UMKM Desa Sukses Digelar", date: "10 November 2024" },
      { title: "Panen Raya Padi Tahun Ini Meningkat", date: "5 November 2024" },
    ],
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadBerandaData();
  }, []);

  const loadBerandaData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/beranda", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setFormData({
            heroTitle: result.data.hero.judul || "Desa Tababo Selatan",
            heroSubtitle:
              result.data.hero.subjudul || "Desa Hijau, Sejahtera, dan Mandiri",
            heroLocation:
              result.data.hero.deskripsi ||
              "Kecamatan [Nama Kecamatan], Kabupaten [Nama Kabupaten]",
            heroImage: result.data.hero.gambar || "",
            stats: result.data.stats || formData.stats,
            news: formData.news, // News tetap dari state lokal untuk sementara
          });
        }
      }
    } catch (error) {
      console.error("Failed to load beranda data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("adminToken");

      const response = await fetch("/api/beranda", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          hero: {
            judul: formData.heroTitle,
            subjudul: formData.heroSubtitle,
            deskripsi: formData.heroLocation,
            gambar: formData.heroImage,
          },
          stats: formData.stats,
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const error = await response.json();
        alert(`Gagal menyimpan: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
        <AdminNavbar onLogout={logout} />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={logout} />

      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Edit Halaman Beranda
              </h1>
              <p className="text-gray-600 text-sm">
                Kelola konten halaman utama
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all"
              >
                <FaEye />
                <span className="hidden md:inline">Preview</span>
              </Link>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaSave />
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Notification */}
      {saved && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce z-50">
          ✓ Data berhasil disimpan!
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <MdDashboard className="text-white text-xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Hero Section
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Judul Utama
                  </label>
                  <input
                    type="text"
                    value={formData.heroTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, heroTitle: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.heroSubtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, heroSubtitle: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    value={formData.heroLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, heroLocation: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Background Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.heroImage}
                    onChange={(e) =>
                      setFormData({ ...formData, heroImage: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  />
                  {formData.heroImage && (
                    <div className="mt-4 rounded-lg overflow-hidden border-2 border-gray-200">
                      <img
                        src={formData.heroImage}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "";
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Statistik Desa
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  <FaPlus />
                  Tambah
                </button>
              </div>

              <div className="space-y-4">
                {formData.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-start p-4 border-2 border-gray-100 rounded-lg hover:border-green-200 transition-colors"
                  >
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...formData.stats];
                            newStats[index].label = e.target.value;
                            setFormData({ ...formData, stats: newStats });
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Nilai
                        </label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...formData.stats];
                            newStats[index].value = e.target.value;
                            setFormData({ ...formData, stats: newStats });
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm text-gray-900"
                        />
                      </div>
                    </div>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* News */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Berita & Kegiatan
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  <FaPlus />
                  Tambah
                </button>
              </div>

              <div className="space-y-4">
                {formData.news.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border-2 border-gray-100 rounded-lg hover:border-green-200 transition-colors"
                  >
                    <div className="flex gap-3 items-start mb-3">
                      <div className="flex-1 space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Judul Berita
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const newNews = [...formData.news];
                              newNews[index].title = e.target.value;
                              setFormData({ ...formData, news: newNews });
                            }}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Tanggal
                          </label>
                          <input
                            type="text"
                            value={item.date}
                            onChange={(e) => {
                              const newNews = [...formData.news];
                              newNews[index].date = e.target.value;
                              setFormData({ ...formData, news: newNews });
                            }}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm text-gray-900"
                          />
                        </div>
                      </div>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <FaTrash />
                      </button>
                    </div>
                    <div className="border-t pt-3">
                      <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-2">
                        <FaImage />
                        Upload Gambar Berita
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-green-600">
                    Published
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Terakhir edit:</span>
                  <span className="font-semibold">Hari ini</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Editor:</span>
                  <span className="font-semibold">Admin</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Aksi</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                  Publish
                </button>
                <button className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                  Draft
                </button>
                <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                  Reset
                </button>
              </div>
            </div>

            {/* Help */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-6 border border-blue-200">
              <h3 className="font-bold text-gray-800 mb-2">💡 Tips</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pastikan semua informasi sudah benar sebelum menyimpan. Klik
                Preview untuk melihat hasil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(EditBeranda);
