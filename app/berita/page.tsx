"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaNewspaper,
  FaCalendarAlt,
  FaTag,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface Berita {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  gambarUtama: string | null;
  kategori: string;
  penulis: string;
  dibuat: string;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function BeritaPage() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 9,
    totalPages: 1,
  });
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchBerita();
  }, [pagination.page, kategori]);

  // Auto-search when search term changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPagination({ ...pagination, page: 1 });
      fetchBerita();
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const fetchBerita = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        terbit: "true",
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (kategori) params.append("kategori", kategori);
      if (search) params.append("search", search);

      const response = await fetch(`/api/berita?${params.toString()}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setBeritaList(result.data);
          setPagination(result.pagination);

          // Extract unique categories
          const uniqueCategories = [
            ...new Set(result.data.map((b: Berita) => b.kategori)),
          ];
          setCategories(uniqueCategories as string[]);
        }
      }
    } catch (error) {
      console.error("Error fetching berita:", error);
    } finally {
      setLoading(false);
    }
  };



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, page: newPage });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 via-white to-emerald-50">
      {/* Header */}
      <section className="bg-linear-to-br from-green-700 via-emerald-600 to-teal-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaNewspaper className="text-6xl mx-auto mb-6 text-green-200" />
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Berita & Kegiatan
            </h1>
            <div className="w-24 h-1 bg-white mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Informasi terkini tentang kegiatan dan perkembangan Desa Tababo
              Selatan
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-12"
        >
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari berita..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="md:w-64">
                <select
                  value={kategori}
                  onChange={(e) => {
                    setKategori(e.target.value);
                    setPagination({ ...pagination, page: 1 });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Info */}
        {!loading && (
          <div className="mb-8 text-gray-600">
            Menampilkan {beritaList.length} dari {pagination.total} berita
            {kategori && ` dalam kategori "${kategori}"`}
            {search && ` yang mengandung "${search}"`}
          </div>
        )}

        {/* Berita Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-56 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : beritaList.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beritaList.map((berita, index) => (
                <motion.div
                  key={berita.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={`/berita/${berita.slug}`}
                    className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full"
                  >
                    {berita.gambarUtama && (
                      <div className="relative h-56 w-full overflow-hidden">
                        <img
                          src={berita.gambarUtama}
                          alt={berita.judul}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <FaTag className="text-xs" />
                            {berita.kategori}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <FaCalendarAlt className="text-xs" />
                        <span>{formatDate(berita.dibuat)}</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-green-600 transition-colors">
                        {berita.judul}
                      </h3>

                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {berita.ringkasan}
                      </p>

                      <div className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                        Baca Selengkapnya →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 flex justify-center items-center gap-2"
              >
                <button
                  onClick={() => changePage(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="p-3 rounded-xl bg-white shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <FaChevronLeft />
                </button>

                <div className="flex gap-2">
                  {[...Array(pagination.totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => changePage(page)}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                          pagination.page === page
                            ? "bg-green-600 text-white shadow-lg"
                            : "bg-white text-gray-700 hover:bg-green-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => changePage(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="p-3 rounded-xl bg-white shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <FaChevronRight />
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <FaNewspaper className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Tidak Ada Berita
            </h3>
            <p className="text-gray-500 mb-6">
              {search || kategori
                ? "Tidak ada berita yang sesuai dengan pencarian Anda"
                : "Belum ada berita yang dipublikasikan"}
            </p>
            {(search || kategori) && (
              <button
                onClick={() => {
                  setSearch("");
                  setKategori("");
                  setPagination({ ...pagination, page: 1 });
                }}
                className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all"
              >
                Reset Filter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
