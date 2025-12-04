"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import { apiClient, ProgramData } from "@/lib/api-client";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";

function ProgramPage() {
  const { logout } = useAuth();
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPrograms = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.getProgram({
        page,
        limit: 10,
        kategori: kategori || undefined,
        status: status || undefined,
        search: search || undefined,
      });

      if (response.success && response.data) {
        setPrograms(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
      }
    } catch {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  }, [page, kategori, status, search]);

  useEffect(() => {
    loadPrograms();
  }, [loadPrograms]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadPrograms();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus program ini?")) return;

    try {
      await apiClient.deleteProgram(id);
      loadPrograms();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal menghapus program";
      alert("Gagal menghapus program: " + errorMessage);
    }
  };

  const formatCurrency = (value: number | undefined) => {
    if (!value) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      perencanaan: { bg: "bg-yellow-100", text: "text-yellow-700" },
      "dalam-pelaksanaan": { bg: "bg-blue-100", text: "text-blue-700" },
      selesai: { bg: "bg-green-100", text: "text-green-700" },
      tertunda: { bg: "bg-red-100", text: "text-red-700" },
    };

    const badge = badges[status] || { bg: "bg-gray-100", text: "text-gray-700" };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}
      >
        {status
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </span>
    );
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
                <MdWorkOutline className="text-purple-600" />
                Kelola Program
              </h1>
              <p className="text-gray-600 mt-1">
                Manage program dan kegiatan desa
              </p>
            </div>
            <Link
              href="/admin/program/create"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
            >
              <FaPlus />
              Tambah Program
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
                  placeholder="Cari program..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                />
              </div>
            </div>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none"
            >
              <option value="">Semua Kategori</option>
              <option value="infrastruktur">Infrastruktur</option>
              <option value="kesehatan">Kesehatan</option>
              <option value="pendidikan">Pendidikan</option>
              <option value="ekonomi">Ekonomi</option>
              <option value="sosial">Sosial</option>
              <option value="lingkungan">Lingkungan</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none"
            >
              <option value="">Semua Status</option>
              <option value="perencanaan">Perencanaan</option>
              <option value="dalam-pelaksanaan">Dalam Pelaksanaan</option>
              <option value="selesai">Selesai</option>
              <option value="tertunda">Tertunda</option>
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              Cari
            </button>
          </form>
        </div>

        {/* Program List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          ) : programs.length === 0 ? (
            <div className="p-12 text-center">
              <MdWorkOutline className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Belum ada program</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Nama Program
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Kategori
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Anggaran
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Tanggal
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {programs.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">
                          {item.namaProgram}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {item.deskripsi}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                          {item.kategori}
                        </span>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-semibold text-gray-800">
                            {formatCurrency(item.anggaran)}
                          </div>
                          {item.realisasi && (
                            <div className="text-xs text-gray-500">
                              Realisasi: {formatCurrency(item.realisasi)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-sm">
                        {new Date(item.tanggalMulai).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/program/edit/${item.id}`}
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
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default withAuth(ProgramPage);
