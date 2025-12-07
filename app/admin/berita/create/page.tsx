"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api-client";
import AdminNavbar from "@/components/AdminNavbar";
import ImageUpload from "@/components/ImageUpload";
import Link from "next/link";
import { FaArrowLeft, FaSave} from "react-icons/fa";
import { MdArticle } from "react-icons/md";

function CreateBeritaPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    judul: "",
    slug: "",
    ringkasan: "",
    konten: "",
    gambarUtama: "",
    kategori: "berita",
    tags: "",
    terbit: false,
    tanggalTerbit: "",
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleJudulChange = (value: string) => {
    setFormData({
      ...formData,
      judul: value,
      slug: generateSlug(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
        tanggalTerbit: formData.terbit
          ? formData.tanggalTerbit || new Date().toISOString()
          : null,
      };

      await apiClient.createBerita(submitData);
      router.push("/admin/berita");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal menyimpan berita";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={logout} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <MdArticle className="text-blue-600" />
                Tambah Berita Baru
              </h1>
              <p className="text-gray-600 mt-1">
                Buat berita atau pengumuman baru
              </p>
            </div>
            <Link
              href="/admin/berita"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft />
              Kembali
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul Berita <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) => handleJudulChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Masukkan judul berita"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Slug URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-mono text-sm"
                  placeholder="judul-berita-url"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL: /berita/{formData.slug || "judul-berita-url"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({ ...formData, kategori: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  required
                >
                  <option value="berita">Berita</option>
                  <option value="pengumuman">Pengumuman</option>
                  <option value="kegiatan">Kegiatan</option>
                  <option value="agenda">Agenda</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Pisahkan dengan koma
                </p>
              </div>

              <div className="md:col-span-2">
                <ImageUpload
                  label="Gambar Utama"
                  value={formData.gambarUtama}
                  onChange={(url) =>
                    setFormData({ ...formData, gambarUtama: url || "" })
                  }
                  folder="berita"
                  aspectRatio="16/9"
                  previewHeight="300px"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ringkasan <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.ringkasan}
                  onChange={(e) =>
                    setFormData({ ...formData, ringkasan: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                  placeholder="Ringkasan singkat berita..."
                  rows={3}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Konten <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.konten}
                  onChange={(e) =>
                    setFormData({ ...formData, konten: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                  placeholder="Tulis konten berita lengkap di sini..."
                  rows={12}
                  required
                />
              </div>
            </div>

            <div className="border-t-2 border-gray-200 pt-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.terbit}
                      onChange={(e) =>
                        setFormData({ ...formData, terbit: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Publikasikan sekarang
                    </span>
                  </label>

                  {formData.terbit && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Tanggal Terbit
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.tanggalTerbit}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tanggalTerbit: e.target.value,
                          })
                        }
                        className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none text-sm text-gray-900"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Link
                    href="/admin/berita"
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl font-semibold ${
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
                        <span>Simpan Berita</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withAuth(CreateBeritaPage);
