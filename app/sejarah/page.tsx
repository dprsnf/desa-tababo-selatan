"use client";

import { useState, useEffect } from "react";
import { FaBook, FaClock, FaPalette, FaStar } from "react-icons/fa";
import { GiVillage } from "react-icons/gi";

interface TimelineItem {
  tahun: string;
  peristiwa: string;
}

interface BudayaItem {
  nama: string;
  emoji: string;
  deskripsi: string;
}

interface TokohItem {
  nama: string;
  peran: string;
  periode: string;
}

interface SejarahData {
  judulUtama: string;
  deskripsiHero: string;
  asalUsul: string;
  timeline: TimelineItem[];
  budaya: BudayaItem[];
  tokohPenting: TokohItem[];
}

export default function SejarahDesa() {
  const [data, setData] = useState<SejarahData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/sejarah");
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setData(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching sejarah:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Default content if no data
  const judulUtama = data?.judulUtama || "Sejarah Desa Tababo Selatan";
  const deskripsiHero = data?.deskripsiHero || "Desa yang Kaya Akan Sejarah dan Budaya";
  const asalUsul = data?.asalUsul || "Informasi sejarah desa belum tersedia.";
  const timeline = data?.timeline || [];
  const budaya = data?.budaya || [];
  const tokohPenting = data?.tokohPenting || [];

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 via-emerald-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <FaBook className="text-6xl text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {judulUtama}
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-green-500 to-emerald-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600">
            Perjalanan dan Perkembangan Desa dari Masa ke Masa
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-linear-to-r from-green-600 via-emerald-600 to-teal-700 rounded-2xl shadow-2xl p-8 md:p-12 mb-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <GiVillage className="text-6xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              {deskripsiHero}
            </h2>
            <p className="text-lg opacity-90">
              Desa Tababo Selatan memiliki perjalanan panjang yang penuh dengan
              cerita inspiratif dan perkembangan yang berkelanjutan
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Konten Utama */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 w-16 h-16 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaBook className="text-3xl text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Asal Usul dan Sejarah Desa
                </h2>
                <div className="h-1 w-20 bg-green-600 rounded"></div>
              </div>
            </div>
            <div
              className="text-gray-700 leading-relaxed prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: asalUsul.replace(/\n/g, "<br />"),
              }}
            />
          </div>

          {/* Timeline (if data includes timeline) */}
          {timeline.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaClock className="text-3xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Perjalanan Waktu
                  </h2>
                  <div className="h-1 w-20 bg-emerald-600 rounded"></div>
                </div>
              </div>

              <div className="space-y-6">
                {timeline.map((item, index) => {
                  const colorClasses = [
                    { border: "border-green-600", bg: "bg-green-50", gradient: "from-green-500 to-green-600" },
                    { border: "border-emerald-600", bg: "bg-emerald-50", gradient: "from-emerald-500 to-emerald-600" },
                    { border: "border-teal-600", bg: "bg-teal-50", gradient: "from-teal-500 to-teal-600" },
                    { border: "border-lime-600", bg: "bg-lime-50", gradient: "from-lime-500 to-lime-600" },
                  ];
                  const colors = colorClasses[index % colorClasses.length];
                  return (
                    <div
                      key={index}
                      className={`border-l-4 ${colors.border} pl-6 py-3 ${colors.bg} rounded-r-lg hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`bg-linear-to-r ${colors.gradient} text-white text-sm font-bold px-4 py-2 rounded-full shadow-md`}
                        >
                          {item.tahun}
                        </span>
                      </div>
                      <p className="text-gray-700 font-semibold">
                        {item.peristiwa}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Budaya dan Tradisi (if available) */}
          {budaya.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaPalette className="text-3xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Budaya dan Tradisi
                  </h2>
                  <div className="h-1 w-20 bg-purple-600 rounded"></div>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Masyarakat Desa Tababo Selatan memiliki kekayaan budaya dan
                tradisi yang masih terjaga hingga saat ini.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {budaya.map((item, index) => (
                  <div
                    key={index}
                    className="border-2 border-green-200 rounded-xl p-6 bg-linear-to-br from-green-50 to-emerald-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="text-4xl mb-3">{item.emoji}</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-3">
                      {item.nama}
                    </h4>
                    <p className="text-gray-700">
                      {item.deskripsi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tokoh Penting (if available) */}
          {tokohPenting.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-16 h-16 bg-linear-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaStar className="text-3xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Tokoh Penting dalam Sejarah Desa
                  </h2>
                  <div className="h-1 w-20 bg-amber-600 rounded"></div>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Dalam perjalanan sejarahnya, Desa Tababo Selatan telah
                melahirkan berbagai tokoh penting.
              </p>
              <div className="space-y-4">
                {tokohPenting.map((item, index) => (
                  <div
                    key={index}
                    className="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-l-4 border-amber-500 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h4 className="font-bold text-lg text-gray-900 mb-2">
                      {item.nama}
                    </h4>
                    <p className="text-gray-600 mb-2 text-sm">
                      {item.peran} - {item.periode}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Admin Note */}
        {!data && (
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg shadow-md">
            <p className="text-sm text-blue-700">
              <strong>Catatan:</strong> Silakan isi informasi sejarah desa
              melalui halaman admin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
