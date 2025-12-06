"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient, PertanggungjawabanData } from "@/lib/api-client";

export default function PertanggungjawabanPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [items, setItems] = useState<PertanggungjawabanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadData();
  }, [page, search, filterYear]);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getPertanggungjawaban({
        page,
        limit: 10,
        tahunAnggaran: filterYear ? parseInt(filterYear) : undefined,
      });

      if (response.success && response.data) {
        setItems(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
      }
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message ||
        (error as Error).message ||
        "Gagal memuat data pertanggungjawaban";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Apakah Anda yakin ingin menghapus laporan pertanggungjawaban ini?",
      )
    )
      return;

    try {
      await apiClient.deletePertanggungjawaban(id);
      alert("Laporan pertanggungjawaban berhasil dihapus");
      loadData();
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message ||
        (error as Error).message ||
        "Gagal menghapus laporan";
      alert(errorMessage);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadData();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Pertanggungjawaban
            </h1>
            <p className="text-gray-600 mt-1">
              Kelola laporan pertanggungjawaban keuangan desa
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Dashboard
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari laporan..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Cari
              </button>
            </form>
            <div className="flex gap-2">
              <select
                value={filterYear}
                onChange={(e) => {
                  setFilterYear(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
              >
                <option value="">Semua Tahun</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <Link
                href="/admin/pertanggungjawaban/create"
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-center whitespace-nowrap"
              >
                + Tambah Laporan
              </Link>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">📊</div>
              <p className="text-gray-600 text-lg">
                Tidak ada laporan pertanggungjawaban
              </p>
              <Link
                href="/admin/pertanggungjawaban/create"
                className="inline-block mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Tambah Laporan Pertama
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-amber-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                        Judul
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                        Tahun
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                        Jenis Dokumen
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-amber-800 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {(page - 1) * 10 + index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="font-medium">{item.judul}</div>
                          <div className="text-gray-500 text-xs mt-1">
                            {new Date(item.tanggalUpload).toLocaleDateString(
                              "id-ID",
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {item.tahunAnggaran}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              item.jenisDokumen === "APBDes"
                                ? "bg-blue-100 text-blue-800"
                                : item.jenisDokumen === "Realisasi"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {item.jenisDokumen}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {item.kategori || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              item.terbit
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.terbit ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/admin/pertanggungjawaban/edit/${item.id}`}
                              className="text-amber-600 hover:text-amber-900"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    Halaman <span className="font-medium">{page}</span> dari{" "}
                    <span className="font-medium">{totalPages}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900"
                    >
                      Sebelumnya
                    </button>
                    <button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900"
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Stats Card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Total Laporan
                </p>
                <p className="text-2xl font-bold text-amber-900">
                  {items.length}
                </p>
              </div>
              <div className="text-amber-600 text-4xl">📊</div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Published</p>
                <p className="text-2xl font-bold text-green-900">
                  {items.filter((i) => i.terbit).length}
                </p>
              </div>
              <div className="text-green-600 text-4xl">✅</div>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Draft</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {items.filter((i) => !i.terbit).length}
                </p>
              </div>
              <div className="text-yellow-600 text-4xl">📝</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
