"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import AdminNavbar from "@/components/AdminNavbar";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaTrash,
  FaEdit,
  FaEye,
} from "react-icons/fa";

interface DokumenPertanggungjawaban {
  id: string;
  judul: string;
  deskripsi?: string;
  fileUrl: string;
  namaFile: string;
  ukuranFile?: number;
  tipeFile?: string;
  kategori: string;
  tahun: number;
  jumlahUnduhan: number;
  aktif: boolean;
  dibuat: string;
}

export default function AdminDokumenPertanggungjawabanPage() {
  const { logout } = useAuth();
  const [documents, setDocuments] = useState<DokumenPertanggungjawaban[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterYear, setFilterYear] = useState("");
  const [filterKategori, setFilterKategori] = useState("");

  const categories = [
    { value: "apbdes", label: "APBDes" },
    { value: "lkpj", label: "LKPJ" },
    { value: "lppd", label: "LPPD" },
    { value: "realisasi", label: "Realisasi Anggaran" },
    { value: "silpa", label: "SILPA" },
    { value: "lainnya", label: "Lainnya" },
  ];

  useEffect(() => {
    loadDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterYear, filterKategori]);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterYear) params.append("tahun", filterYear);
      if (filterKategori) params.append("kategori", filterKategori);

      const response = await fetch(
        `/api/dokumen-pertanggungjawaban?${params.toString()}`,
      );
      const data = await response.json();

      if (data.success) {
        setDocuments(data.data);
      }
    } catch (error) {
      console.error("Error loading documents:", error);
      alert("Gagal memuat dokumen");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus dokumen ini?")) return;

    try {
      const response = await fetch(`/api/dokumen-pertanggungjawaban/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        alert("Dokumen berhasil dihapus");
        loadDocuments();
      } else {
        alert(data.error || "Gagal menghapus dokumen");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Gagal menghapus dokumen");
    }
  };

  const getFileIcon = (tipeFile?: string) => {
    const type = tipeFile?.toLowerCase() || "";
    if (type.includes("pdf")) return <FaFilePdf className="text-red-500" />;
    if (type.includes("word") || type.includes("doc"))
      return <FaFileWord className="text-blue-500" />;
    if (type.includes("excel") || type.includes("xls"))
      return <FaFileExcel className="text-green-500" />;
    return <FaFilePdf className="text-gray-500" />;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "-";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-100">
      <AdminNavbar onLogout={logout} />

      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dokumen Pertanggungjawaban
            </h1>
            <p className="text-gray-600 mt-1">
              Kelola dokumen laporan keuangan dan pertanggungjawaban desa
            </p>
          </div>
          <Link
            href="/admin/pertanggungjawaban/dokumen/create"
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium shadow-lg"
          >
            + Upload Dokumen
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter Tahun
              </label>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
              >
                <option value="">Semua Tahun</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter Kategori
              </label>
              <select
                value={filterKategori}
                onChange={(e) => setFilterKategori(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
              >
                <option value="">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : documents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FaFilePdf className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">
              Belum ada dokumen pertanggungjawaban
            </p>
            <p className="text-gray-400 mb-4">
              Upload dokumen untuk memulai
            </p>
            <Link
              href="/admin/pertanggungjawaban/dokumen/create"
              className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              + Upload Dokumen
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{getFileIcon(doc.tipeFile)}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1 truncate">
                      {doc.judul}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">
                        {doc.tahun}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {
                          categories.find((c) => c.value === doc.kategori)
                            ?.label
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {doc.deskripsi && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {doc.deskripsi}
                  </p>
                )}

                {/* File Info */}
                <div className="text-xs text-gray-500 mb-4 space-y-1">
                  <p className="truncate">📄 {doc.namaFile}</p>
                  <p>📦 {formatFileSize(doc.ukuranFile)}</p>
                  <p>⬇️ {doc.jumlahUnduhan} unduhan</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <FaEye /> Lihat
                  </a>
                  <Link
                    href={`/admin/pertanggungjawaban/dokumen/edit/${doc.id}`}
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-6">
          <Link
            href="/admin/pertanggungjawaban"
            className="inline-block px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}
