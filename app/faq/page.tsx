"use client";

import { useState, useEffect } from "react";
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  id: string;
  pertanyaan: string;
  jawaban: string;
  kategori: string | null;
  urutan: number;
  aktif: boolean;
}

export default function FAQPublikPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKategori, setSelectedKategori] = useState<string>("semua");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/faq?aktif=true");
      const result = await response.json();

      if (result.success && result.data) {
        setFaqs(result.data);
      }
    } catch (error) {
      console.error("Error loading FAQs:", error);
    } finally {
      setLoading(false);
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

  const kategoris = Object.keys(groupedFaqs);

  // Filter FAQs
  const filteredFaqs =
    selectedKategori === "semua"
      ? faqs
      : faqs.filter(
          (faq) => (faq.kategori || "Umum").toLowerCase() === selectedKategori,
        );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-700 text-lg">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 via-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FaQuestionCircle className="text-6xl text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Pertanyaan yang Sering Ditanyakan
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-purple-500 to-pink-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan yang sering ditanyakan tentang Desa
            Tababo Selatan
          </p>
        </div>

        {/* Filter Kategori */}
        {kategoris.length > 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedKategori("semua")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedKategori === "semua"
                    ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Semua ({faqs.length})
              </button>
              {kategoris.map((kategori) => (
                <button
                  key={kategori}
                  onClick={() => setSelectedKategori(kategori.toLowerCase())}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    selectedKategori === kategori.toLowerCase()
                      ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {kategori.charAt(0).toUpperCase() + kategori.slice(1)} (
                  {groupedFaqs[kategori].length})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FAQ List */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <FaQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Belum ada FAQ untuk kategori ini</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-purple-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <FaQuestionCircle className="text-purple-600 text-xl mt-1 shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg mb-1">
                          {faq.pertanyaan}
                        </h3>
                        {faq.kategori && (
                          <span className="inline-block text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                            {faq.kategori.charAt(0).toUpperCase() +
                              faq.kategori.slice(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-purple-600 text-2xl transition-transform ${
                      expandedId === faq.id ? "rotate-180" : ""
                    }`}
                  >
                    {expandedId === faq.id ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="border-t border-purple-100 pt-4 pl-9">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {faq.jawaban}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">
            Tidak menemukan jawaban yang Anda cari?
          </h2>
          <p className="text-purple-100 mb-6">
            Hubungi kami melalui kantor desa atau layanan administrasi untuk
            pertanyaan lebih lanjut
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/layanan"
              className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl"
            >
              Layanan Desa
            </a>
            <a
              href="/"
              className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-xl hover:bg-purple-800 transition-all"
            >
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
