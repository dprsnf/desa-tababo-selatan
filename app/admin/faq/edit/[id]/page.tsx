"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaQuestionCircle } from "react-icons/fa";

function EditFAQPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    pertanyaan: "",
    jawaban: "",
    kategori: "umum",
    urutan: 0,
    aktif: true,
  });

  useEffect(() => {
    if (id) {
      loadFAQ();
    }
  }, [id]);

  const loadFAQ = async () => {
    try {
      setLoadingData(true);
      const response = await fetch(`/api/faq/${id}`);
      const result = await response.json();

      if (result.success && result.data) {
        setFormData({
          pertanyaan: result.data.pertanyaan,
          jawaban: result.data.jawaban,
          kategori: result.data.kategori || "umum",
          urutan: result.data.urutan,
          aktif: result.data.aktif,
        });
      }
    } catch (error) {
      console.error("Error loading FAQ:", error);
      alert("Gagal memuat data FAQ");
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.pertanyaan || !formData.jawaban) {
      alert("Pertanyaan dan jawaban harus diisi");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`/api/faq/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("FAQ berhasil diperbarui");
        router.push("/admin/faq");
      } else {
        const error = await response.json();
        alert("Gagal memperbarui FAQ: " + error.error);
      }
    } catch (error) {
      alert("Gagal memperbarui FAQ");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-purple-50">
        <AdminNavbar onLogout={logout} />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Memuat data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-purple-50">
      <AdminNavbar onLogout={logout} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <FaQuestionCircle className="text-purple-600" />
                Edit FAQ
              </h1>
              <p className="text-gray-600 mt-1">
                Perbarui pertanyaan dan jawaban
              </p>
            </div>
            <Link
              href="/admin/faq"
              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all"
            >
              <FaArrowLeft />
              Kembali
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pertanyaan */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pertanyaan <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.pertanyaan}
                onChange={(e) =>
                  setFormData({ ...formData, pertanyaan: e.target.value })
                }
                placeholder="Masukkan pertanyaan yang sering ditanyakan..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none resize-none"
                required
              />
            </div>

            {/* Jawaban */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jawaban <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.jawaban}
                onChange={(e) =>
                  setFormData({ ...formData, jawaban: e.target.value })
                }
                placeholder="Masukkan jawaban lengkap..."
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none resize-none"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Jelaskan dengan detail dan mudah dipahami
              </p>
            </div>

            {/* Kategori & Urutan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kategori */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({ ...formData, kategori: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none"
                >
                  <option value="umum">Umum</option>
                  <option value="layanan">Layanan</option>
                  <option value="prosedur">Prosedur</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Pilih kategori yang sesuai
                </p>
              </div>

              {/* Urutan */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Urutan Tampil
                </label>
                <input
                  type="number"
                  value={formData.urutan}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      urutan: parseInt(e.target.value) || 0,
                    })
                  }
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Semakin kecil angka, semakin awal ditampilkan
                </p>
              </div>
            </div>

            {/* Status Aktif */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.aktif}
                  onChange={(e) =>
                    setFormData({ ...formData, aktif: e.target.checked })
                  }
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Aktifkan FAQ (tampilkan di website)
                </span>
              </label>
            </div>

            {/* Preview */}
            <div className="border-2 border-purple-200 rounded-xl p-6 bg-purple-50">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaQuestionCircle className="text-purple-600" />
                Preview
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-bold text-gray-800">
                    {formData.pertanyaan || "Pertanyaan akan muncul di sini..."}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    {formData.jawaban || "Jawaban akan muncul di sini..."}
                  </p>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full">
                    {formData.kategori.charAt(0).toUpperCase() +
                      formData.kategori.slice(1)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full ${
                      formData.aktif
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {formData.aktif ? "Aktif" : "Nonaktif"}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-semibold transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl"
                }`}
              >
                <FaSave />
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withAuth(EditFAQPage);
