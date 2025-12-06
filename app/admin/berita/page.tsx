"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import { apiClient, BeritaData } from "@/lib/api-client";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { MdArticle } from "react-icons/md";

function BeritaPage() {
  const { logout } = useAuth();
  const [berita, setBerita] = useState<BeritaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadBerita = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.getBerita({
        page,
        limit: 10,
        kategori: kategori || undefined,
        search: search || undefined,
      });

      if (response.success && response.data) {
        setBerita(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
      }
    } catch {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  }, [page, kategori, search]);

  useEffect(() => {
    loadBerita();
  }, [loadBerita]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadBerita();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus berita ini?")) return;

    try {
      await apiClient.deleteBerita(id);
      loadBerita();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal menghapus berita";
      alert("Gagal menghapus berita: " + errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={logout} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <MdArticle className="text-blue-600" />
                Kelola Berita
              </h1>
              <p className="text-gray-600 mt-1">
                Manage berita dan pengumuman desa
              </p>
            </div>
            <Link
              href="/admin/berita/create"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
            >
              <FaPlus />
              Tambah Berita
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <form onSubmit={handleSearch} className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari berita..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>
            </div>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
            >
              <option value="">Semua Kategori</option>
              <option value="berita">Berita</option>
              <option value="pengumuman">Pengumuman</option>
              <option value="kegiatan">Kegiatan</option>
              <option value="agenda">Agenda</option>
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Cari
            </button>
          </form>
        </div>

        {/* Berita List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          ) : berita.length === 0 ? (
            <div className="p-12 text-center">
              <MdArticle className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Belum ada berita</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Judul
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Kategori
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Penulis
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Views
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {berita.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">
                          {item.judul}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {item.ringkasan}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {item.kategori}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {item.penulis}
                      </td>
                      <td className="px-6 py-4">
                        {item.terbit ? (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            Published
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {item.dilihat}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/berita/edit/${item.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Halaman {page} dari {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(BeritaPage);
