"use client";

import { useState, useEffect } from "react";
import {
  FaFileAlt,
  FaClock,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaDownload,
  FaCheckCircle,
  FaListOl,
} from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { motion } from "framer-motion";

interface LayananItem {
  id: string;
  namaLayanan: string;
  slug: string;
  deskripsi: string;
  persyaratan: string[];
  prosedur: string[];
  biaya: string | null;
  waktuPenyelesaian: string;
  kontak: string | null;
  formulir: string | null;
  aktif: boolean;
  urutan: number;
}

export default function LayananDesa() {
  const [layanan, setLayanan] = useState<LayananItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLayanan, setSelectedLayanan] = useState<LayananItem | null>(
    null,
  );

  useEffect(() => {
    fetchLayanan();
  }, []);

  const fetchLayanan = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/layanan?aktif=true");
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setLayanan(result.data);
        }
      }
    } catch (error) {
      console.error("Error fetching layanan:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-700 text-lg">Memuat layanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <MdMiscellaneousServices className="text-6xl text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Layanan Desa Tababo Selatan
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Berbagai layanan administrasi dan pelayanan publik yang tersedia
            untuk masyarakat Desa Tababo Selatan
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl shadow-2xl p-8 md:p-12 mb-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <FaFileAlt className="text-6xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Pelayanan Prima untuk Masyarakat
            </h2>
            <p className="text-lg opacity-90">
              Kami berkomitmen memberikan pelayanan terbaik dengan proses yang
              mudah, cepat, dan transparan
            </p>
          </div>
        </div>

        {/* Layanan Cards */}
        {layanan.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {layanan.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-blue-100"
              >
                {/* Card Header */}
                <div className="bg-linear-to-r from-blue-500 to-indigo-600 p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        {item.namaLayanan}
                      </h3>
                      <p className="text-blue-50 text-sm">{item.deskripsi}</p>
                    </div>
                    <MdMiscellaneousServices className="text-3xl opacity-80" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Biaya */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <FaMoneyBillWave className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        Biaya
                      </p>
                      <p className="font-bold text-gray-800">
                        {item.biaya || "Gratis"}
                      </p>
                    </div>
                  </div>

                  {/* Waktu */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <FaClock className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        Waktu Penyelesaian
                      </p>
                      <p className="font-bold text-gray-800">
                        {item.waktuPenyelesaian}
                      </p>
                    </div>
                  </div>

                  {/* Kontak */}
                  {item.kontak && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                        <FaPhoneAlt className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">
                          Kontak
                        </p>
                        <p className="font-bold text-gray-800">{item.kontak}</p>
                      </div>
                    </div>
                  )}

                  {/* Persyaratan Count */}
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">
                        {item.persyaratan.length}
                      </span>{" "}
                      Persyaratan
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">{item.prosedur.length}</span>{" "}
                      Tahapan
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => setSelectedLayanan(item)}
                    className="w-full mt-4 bg-linear-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Lihat Detail
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xl">
            <MdMiscellaneousServices className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">
              Belum ada layanan tersedia
            </p>
            <p className="text-gray-400 text-sm">
              Silakan tambahkan layanan melalui halaman admin
            </p>
          </div>
        )}

        {/* Detail Modal */}
        {selectedLayanan && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLayanan(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-linear-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {selectedLayanan.namaLayanan}
                    </h2>
                    <p className="text-blue-100">{selectedLayanan.deskripsi}</p>
                  </div>
                  <button
                    onClick={() => setSelectedLayanan(null)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Info Ringkas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <FaMoneyBillWave className="text-green-600 text-xl" />
                      <p className="font-semibold text-gray-700">Biaya</p>
                    </div>
                    <p className="text-lg font-bold text-green-700">
                      {selectedLayanan.biaya || "Gratis"}
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <FaClock className="text-blue-600 text-xl" />
                      <p className="font-semibold text-gray-700">
                        Waktu Penyelesaian
                      </p>
                    </div>
                    <p className="text-lg font-bold text-blue-700">
                      {selectedLayanan.waktuPenyelesaian}
                    </p>
                  </div>

                  {selectedLayanan.kontak && (
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FaPhoneAlt className="text-purple-600 text-xl" />
                        <p className="font-semibold text-gray-700">Kontak</p>
                      </div>
                      <p className="text-lg font-bold text-purple-700">
                        {selectedLayanan.kontak}
                      </p>
                    </div>
                  )}
                </div>

                {/* Persyaratan */}
                <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <FaCheckCircle className="text-white text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Persyaratan
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {selectedLayanan.persyaratan.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm"
                      >
                        <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prosedur */}
                <div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                      <FaListOl className="text-white text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Prosedur Pelayanan
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {selectedLayanan.prosedur.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="shrink-0">
                          <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                            {index + 1}
                          </div>
                          {index < selectedLayanan.prosedur.length - 1 && (
                            <div className="w-0.5 h-8 bg-indigo-300 ml-5 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-gray-700">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Formulir Download */}
                {selectedLayanan.formulir && (
                  <div className="bg-linear-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                          <FaDownload className="text-2xl" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-1">
                            Formulir Tersedia
                          </h3>
                          <p className="text-green-100 text-sm">
                            Download formulir untuk layanan ini
                          </p>
                        </div>
                      </div>
                      <a
                        href={selectedLayanan.formulir}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t border-gray-200">
                <button
                  onClick={() => setSelectedLayanan(null)}
                  className="w-full bg-linear-to-r from-gray-600 to-gray-700 text-white py-3 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-12 bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white text-center">
          <FaPhoneAlt className="text-5xl mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Butuh Bantuan?
          </h2>
          <p className="text-lg mb-4 opacity-90 max-w-2xl mx-auto">
            Hubungi kantor desa untuk informasi lebih lanjut mengenai layanan
            yang tersedia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-xl">
              <p className="text-sm opacity-90">Telepon</p>
              <p className="font-bold text-lg">(0123) 456-7890</p>
            </div>
            <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-xl">
              <p className="text-sm opacity-90">Email</p>
              <p className="font-bold text-lg">info@tababo-selatan.desa.id</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
