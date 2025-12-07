"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api-client";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";

function CreateProgramPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    namaProgram: "",
    slug: "",
    deskripsi: "",
    kategori: "infrastruktur",
    sumberDana: "",
    anggaran: "",
    realisasi: "",
    status: "perencanaan",
    tanggalMulai: "",
    tanggalSelesai: "",
    lokasiKegiatan: "",
    penanggungJawab: "",
    targetPenerima: "",
    terbit: true,
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNamaProgramChange = (value: string) => {
    setFormData({
      ...formData,
      namaProgram: value,
      slug: generateSlug(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        anggaran: formData.anggaran ? parseFloat(formData.anggaran) : undefined,
        realisasi: formData.realisasi ? parseFloat(formData.realisasi) : undefined,
        tanggalSelesai: formData.tanggalSelesai || undefined,
      };

      await apiClient.createProgram(submitData);
      router.push("/admin/program");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal menyimpan program";
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
                <MdWorkOutline className="text-purple-600" />
                Tambah Program Baru
              </h1>
              <p className="text-gray-600 mt-1">
                Buat program atau kegiatan desa baru
              </p>
            </div>
            <Link
              href="/admin/program"
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
                  Nama Program <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.namaProgram}
                  onChange={(e) => handleNamaProgramChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="Masukkan nama program"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all font-mono text-sm"
                  placeholder="nama-program-url"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL: /program/{formData.slug || "nama-program-url"}
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  required
                >
                  <option value="infrastruktur">Infrastruktur</option>
                  <option value="kesehatan">Kesehatan</option>
                  <option value="pendidikan">Pendidikan</option>
                  <option value="ekonomi">Ekonomi</option>
                  <option value="sosial">Sosial</option>
                  <option value="lingkungan">Lingkungan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  required
                >
                  <option value="perencanaan">Perencanaan</option>
                  <option value="dalam-pelaksanaan">Dalam Pelaksanaan</option>
                  <option value="selesai">Selesai</option>
                  <option value="tertunda">Tertunda</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                  placeholder="Deskripsi lengkap program..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sumber Dana
                </label>
                <input
                  type="text"
                  value={formData.sumberDana}
                  onChange={(e) =>
                    setFormData({ ...formData, sumberDana: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="APBD, APBN, Swadaya, dll"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Penanggung Jawab
                </label>
                <input
                  type="text"
                  value={formData.penanggungJawab}
                  onChange={(e) =>
                    setFormData({ ...formData, penanggungJawab: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="Nama penanggung jawab"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Anggaran (Rp)
                </label>
                <input
                  type="number"
                  value={formData.anggaran}
                  onChange={(e) =>
                    setFormData({ ...formData, anggaran: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="0"
                  min="0"
                  step="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Realisasi (Rp)
                </label>
                <input
                  type="number"
                  value={formData.realisasi}
                  onChange={(e) =>
                    setFormData({ ...formData, realisasi: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="0"
                  min="0"
                  step="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tanggal Mulai <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.tanggalMulai}
                  onChange={(e) =>
                    setFormData({ ...formData, tanggalMulai: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  value={formData.tanggalSelesai}
                  onChange={(e) =>
                    setFormData({ ...formData, tanggalSelesai: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lokasi Kegiatan
                </label>
                <input
                  type="text"
                  value={formData.lokasiKegiatan}
                  onChange={(e) =>
                    setFormData({ ...formData, lokasiKegiatan: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="Lokasi pelaksanaan program"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Penerima
                </label>
                <input
                  type="text"
                  value={formData.targetPenerima}
                  onChange={(e) =>
                    setFormData({ ...formData, targetPenerima: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="Contoh: 100 KK, Seluruh warga desa, dll"
                />
              </div>
            </div>

            <div className="border-t-2 border-gray-200 pt-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.terbit}
                    onChange={(e) =>
                      setFormData({ ...formData, terbit: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-2 border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-200"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Publikasikan program
                  </span>
                </label>

                <div className="flex gap-3">
                  <Link
                    href="/admin/program"
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl font-semibold ${
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
                        <span>Simpan Program</span>
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

export default withAuth(CreateProgramPage);
