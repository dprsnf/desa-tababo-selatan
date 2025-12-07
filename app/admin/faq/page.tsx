"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaQuestionCircle } from "react-icons/fa";

interface FAQ {
  id: string;
  pertanyaan: string;
  jawaban: string;
  kategori: string | null;
  urutan: number;
  aktif: boolean;
  dibuat: string;
  diperbarui: string;
}

function FAQPage() {
  const { logout } = useAuth();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [kategoriFilter, setKategoriFilter] = useState("");

  const loadFaqs = useCallback(async () => {
    try {
      setLoading(true);
      const url = new URL("/api/faq", window.location.origin);
      if (kategoriFilter) {
        url.searchParams.append("kategori", kategoriFilter);
      }

      const response = await fetch(url.toString());
      const result = await response.json();

      if (result.success && result.data) {
        setFaqs(result.data);
      }
    } catch (error) {
      console.error("Error loading FAQs:", error);
    } finally {
      setLoading(false);
    }
  }, [kategoriFilter]);

  useEffect(() => {
    loadFaqs();
  }, [loadFaqs]);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus FAQ ini?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/faq/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        loadFaqs();
      } else {
        const error = await response.json();
        alert("Gagal menghapus FAQ: " + error.error);
      }
    } catch (error) {
      alert("Gagal menghapus FAQ");
    }
  };

  const handleToggleAktif = async (id: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem("token");
      const faq = faqs.find((f) => f.id === id);
      if (!faq) return;

      const response = await fetch(`/api/faq/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pertanyaan: faq.pertanyaan,
          jawaban: faq.jawaban,
          kategori: faq.kategori,
          urutan: faq.urutan,
          aktif: !currentStatus,
        }),
      });

      if (response.ok) {
        loadFaqs();
      }
    } catch (error) {
      console.error("Error toggling aktif:", error);
    }
  };

  // Group FAQs by kategori
  const groupedFaqs = faqs.reduce(
    (acc, faq) => {
      const kategori = faq.kategori || "Umum";
      if (!acc[kategori]) {
        acc[kategori] = [];
      }
      acc[kategori].push(faq);
      return acc;
    },
    {} as Record<string, FAQ[]>,
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-purple-50">
      <AdminNavbar onLogout={logout} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <FaQuestionCircle className="text-purple-600" />
                Kelola FAQ
              </h1>
              <p className="text-gray-600 mt-1">
                Frequently Asked Questions - Pertanyaan yang sering ditanyakan
              </p>
            </div>
            <Link
              href="/admin/faq/create"
              className="flex items-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
            >
              <FaPlus />
              Tambah FAQ
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Total FAQ</h3>
            <p className="text-4xl font-bold">{faqs.length}</p>
          </div>
          <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">FAQ Aktif</h3>
            <p className="text-4xl font-bold">
              {faqs.filter((f) => f.aktif).length}
            </p>
          </div>
          <div className="bg-linear-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Kategori</h3>
            <p className="text-4xl font-bold">
              {Object.keys(groupedFaqs).length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex gap-4 items-center">
            <label className="font-semibold text-gray-700">
              Filter Kategori:
            </label>
            <select
              value={kategoriFilter}
              onChange={(e) => setKategoriFilter(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none"
            >
              <option value="">Semua Kategori</option>
              <option value="umum">Umum</option>
              <option value="layanan">Layanan</option>
              <option value="prosedur">Prosedur</option>
            </select>
          </div>
        </div>

        {/* FAQ List */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        ) : faqs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <FaQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Belum ada FAQ</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedFaqs).map(([kategori, items]) => (
              <div
                key={kategori}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-6 py-4">
                  <h2 className="text-xl font-bold">
                    {kategori.charAt(0).toUpperCase() + kategori.slice(1)}
                  </h2>
                  <p className="text-purple-100 text-sm">
                    {items.length} pertanyaan
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {items.map((faq) => (
                    <div
                      key={faq.id}
                      className={`border-2 rounded-xl p-4 transition-all ${
                        faq.aktif
                          ? "border-purple-200 bg-purple-50"
                          : "border-gray-200 bg-gray-50 opacity-60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <FaQuestionCircle className="text-purple-600" />
                            {faq.pertanyaan}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {faq.jawaban}
                          </p>
                          <div className="flex gap-2 text-xs text-gray-500">
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                              Urutan: {faq.urutan}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full ${
                                faq.aktif
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {faq.aktif ? "Aktif" : "Nonaktif"}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleAktif(faq.id, faq.aktif)}
                            className={`px-3 py-2 rounded-lg text-white text-sm transition-colors ${
                              faq.aktif
                                ? "bg-orange-500 hover:bg-orange-600"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                            title={faq.aktif ? "Nonaktifkan" : "Aktifkan"}
                          >
                            {faq.aktif ? "Hide" : "Show"}
                          </button>
                          <Link
                            href={`/admin/faq/edit/${faq.id}`}
                            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-1"
                          >
                            <FaEdit />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(faq.id)}
                            className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center gap-1"
                          >
                            <FaTrash />
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(FAQPage);
