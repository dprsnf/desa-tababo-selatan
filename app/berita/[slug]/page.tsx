"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import {
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaArrowLeft,
  FaNewspaper,
} from "react-icons/fa";

interface Berita {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  konten: string;
  gambarUtama: string | null;
  kategori: string;
  penulis: string;
  terbit: boolean;
  dibuat: string;
  diperbarui: string;
}

export default function BeritaDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [berita, setBerita] = useState<Berita | null>(null);
  const [loading, setLoading] = useState(true);
  const [beritaLainnya, setBeritaLainnya] = useState<Berita[]>([]);

  useEffect(() => {
    if (!slug) return;

    const fetchBerita = async () => {
      try {
        setLoading(true);

        // Fetch detail berita
        const response = await fetch(`/api/berita/${slug}`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setBerita(result.data);

            // Fetch berita lainnya (exclude current)
            const otherResponse = await fetch(
              `/api/berita?terbit=true&limit=3`
            );
            if (otherResponse.ok) {
              const otherResult = await otherResponse.json();
              if (otherResult.success && otherResult.data) {
                const filtered = otherResult.data.filter(
                  (b: Berita) => b.slug !== slug
                );
                setBeritaLainnya(filtered.slice(0, 3));
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching berita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700 text-lg">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="min-h-screen bg-linear-to-b from-green-50 to-emerald-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FaNewspaper className="text-6xl text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Berita Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mb-8">
            Maaf, berita yang Anda cari tidak ditemukan atau sudah dihapus.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all"
          >
            <FaArrowLeft />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-linear-to-br from-green-700 via-emerald-600 to-teal-700 text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-white hover:text-green-100 mb-6 transition-colors font-medium"
          >
            <FaArrowLeft />
            Kembali ke Daftar Berita
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                <FaTag className="text-xs" />
                {berita.kategori}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {berita.judul}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>{formatDate(berita.dibuat)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUser />
                <span>{berita.penulis}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {berita.gambarUtama && (
            <div className="relative h-[400px] md:h-[500px] w-full">
              <img
                src={berita.gambarUtama}
                alt={berita.judul}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            {berita.ringkasan && (
              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-xl mb-8">
                <p className="text-lg text-gray-800 italic font-medium leading-relaxed">
                  {berita.ringkasan}
                </p>
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              {parse(berita.konten)}
            </div>
          </div>
        </motion.article>

        {/* Berita Lainnya */}
        {beritaLainnya.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Berita Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {beritaLainnya.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  {item.gambarUtama && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={item.gambarUtama}
                        alt={item.judul}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-xs text-green-600 font-semibold">
                      {item.kategori}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 mt-2 mb-3 line-clamp-2">
                      {item.judul}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.ringkasan}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                      <FaCalendarAlt />
                      <span>{formatDate(item.dibuat)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
