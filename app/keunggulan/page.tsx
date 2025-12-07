"use client";

import { useState, useEffect } from "react";
import {
  FaLeaf,
  FaSeedling,
  FaStore,
  FaMountain,
  FaUsers,
  FaRoad,
} from "react-icons/fa";
import { GiWheat, GiCow } from "react-icons/gi";

interface PertanianItem {
  nama: string;
  emoji: string;
  deskripsi: string;
}

interface PeternakanItem {
  nama: string;
  emoji: string;
}

interface UMKMItem {
  nama: string;
  emoji: string;
  deskripsi: string;
}

interface WisataItem {
  nama: string;
  emoji: string;
  deskripsi: string;
}

interface SDMData {
  jumlahPenduduk: string;
  usiaProduktif: string;
  kelompokUsaha: string;
}

interface InfrastrukturItem {
  nama: string;
  emoji: string;
}

interface KeunggulanData {
  judulUtama: string;
  deskripsiHero: string;
  pertanian: PertanianItem[];
  peternakan: PeternakanItem[];
  umkm: UMKMItem[];
  wisata: WisataItem[];
  sdm: SDMData;
  infrastruktur: InfrastrukturItem[];
}

export default function KeunggulanDesa() {
  const [data, setData] = useState<KeunggulanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/keunggulan");
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setData(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching keunggulan:", error);
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

  const judulUtama = data?.judulUtama || "Keunggulan Desa Tababo Selatan";
  const deskripsiHero =
    data?.deskripsiHero ||
    "Desa yang Kaya Akan Potensi";
  const pertanian = data?.pertanian || [];
  const peternakan = data?.peternakan || [];
  const umkm = data?.umkm || [];
  const wisata = data?.wisata || [];
  const sdm = data?.sdm || { jumlahPenduduk: "2,500+", usiaProduktif: "85%", kelompokUsaha: "50+" };
  const infrastruktur = data?.infrastruktur || [];

  // Categories configuration
  const categories = [
    {
      key: "pertanian",
      title: "Pertanian dan Perkebunan",
      icon: <GiWheat className="text-4xl text-white" />,
      color: "from-green-500 to-emerald-600",
      items: pertanian,
    },
    {
      key: "peternakan",
      title: "Peternakan",
      icon: <GiCow className="text-4xl text-white" />,
      color: "from-amber-500 to-orange-600",
      items: peternakan,
    },
    {
      key: "umkm",
      title: "UMKM dan Produk Lokal",
      icon: <FaStore className="text-4xl text-white" />,
      color: "from-blue-500 to-cyan-600",
      items: umkm,
    },
    {
      key: "wisata",
      title: "Potensi Wisata",
      icon: <FaMountain className="text-4xl text-white" />,
      color: "from-purple-500 to-pink-600",
      items: wisata,
    },
    {
      key: "infrastruktur",
      title: "Infrastruktur Desa",
      icon: <FaRoad className="text-4xl text-white" />,
      color: "from-indigo-500 to-purple-600",
      items: infrastruktur,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 via-emerald-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <FaLeaf className="text-6xl text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {judulUtama}
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-green-500 to-emerald-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600">
            Potensi dan Keunggulan yang Dimiliki Desa Kami
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-linear-to-r from-green-600 via-emerald-600 to-teal-700 rounded-2xl shadow-2xl p-8 md:p-12 mb-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <FaSeedling className="text-6xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              {deskripsiHero}
            </h2>
            <p className="text-lg opacity-90">
              Desa Tababo Selatan memiliki berbagai keunggulan dan potensi yang dapat dikembangkan untuk kesejahteraan masyarakat
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Dynamic Categories */}
          {categories.map((category) => {
            if (!category.items || category.items.length === 0) return null;
            
            return (
              <div
                key={category.key}
                className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`shrink-0 w-20 h-20 bg-linear-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {category.title}
                    </h2>
                    <div className="h-1 w-20 bg-green-600 rounded"></div>
                  </div>
                </div>
                
                {category.key === "pertanian" && (
                  <>
                    <p className="text-gray-700 mb-6 text-lg">
                      Desa Tababo Selatan memiliki lahan pertanian dan perkebunan yang luas dengan berbagai komoditas unggulan.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {pertanian.map((item, index) => {
                        const colorClasses = [
                          "from-amber-400 to-yellow-600",
                          "from-yellow-400 to-orange-600",
                          "from-green-400 to-emerald-600",
                        ];
                        return (
                          <div
                            key={index}
                            className={`bg-linear-to-br ${colorClasses[index % 3]} text-white rounded-xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}
                          >
                            <div className="text-5xl mb-4">{item.emoji}</div>
                            <h3 className="font-bold text-xl mb-2">{item.nama}</h3>
                            <p className="text-white/90 text-sm">{item.deskripsi}</p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {category.key === "peternakan" && (
                  <>
                    <p className="text-gray-700 mb-6 text-lg">
                      Sektor peternakan berkembang pesat dengan berbagai jenis ternak.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {peternakan.map((item, index) => (
                        <div
                          key={index}
                          className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl p-6 text-center border-2 border-amber-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                          <div className="text-4xl mb-3">{item.emoji}</div>
                          <p className="font-semibold text-gray-900">{item.nama}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {category.key === "umkm" && (
                  <>
                    <p className="text-gray-700 mb-6 text-lg">
                      Berbagai usaha mikro, kecil, dan menengah yang berkembang di desa.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {umkm.map((item, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-blue-600 pl-6 py-4 bg-linear-to-r from-blue-50 to-cyan-50 rounded-r-xl shadow-md hover:shadow-lg hover:translate-x-1 transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-3xl">{item.emoji}</span>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900 mb-2">
                                {item.nama}
                              </h3>
                              <p className="text-gray-600">{item.deskripsi}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {category.key === "wisata" && (
                  <>
                    <p className="text-gray-700 mb-6 text-lg">
                      Potensi wisata yang dapat dikembangkan di desa.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {wisata.map((item, index) => (
                        <div
                          key={index}
                          className="border-2 border-purple-200 rounded-xl p-6 bg-linear-to-br from-purple-50 to-pink-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                          <div className="text-4xl mb-3">{item.emoji}</div>
                          <h3 className="font-bold text-lg text-gray-900 mb-3">
                            {item.nama}
                          </h3>
                          <p className="text-gray-700">{item.deskripsi}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {category.key === "infrastruktur" && (
                  <>
                    <p className="text-gray-700 mb-6 text-lg">
                      Infrastruktur pendukung pembangunan desa yang terus berkembang.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {infrastruktur.map((item, index) => (
                        <div
                          key={index}
                          className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-xl p-6 text-center border-2 border-indigo-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                          <div className="text-4xl mb-3">{item.emoji}</div>
                          <p className="font-semibold text-gray-900">{item.nama}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {/* SDM Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 w-20 h-20 bg-linear-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaUsers className="text-4xl text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Sumber Daya Manusia
                </h2>
                <div className="h-1 w-20 bg-red-600 rounded"></div>
              </div>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Masyarakat yang produktif dan berkualitas menjadi aset utama pembangunan desa.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-8 bg-linear-to-br from-red-500 to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-5xl font-bold mb-2">{sdm.jumlahPenduduk}</div>
                <p className="font-semibold text-lg">Jumlah Penduduk</p>
              </div>
              <div className="text-center p-8 bg-linear-to-br from-orange-500 to-red-600 text-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-5xl font-bold mb-2">{sdm.usiaProduktif}</div>
                <p className="font-semibold text-lg">Usia Produktif</p>
              </div>
              <div className="text-center p-8 bg-linear-to-br from-pink-500 to-rose-600 text-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-5xl font-bold mb-2">{sdm.kelompokUsaha}</div>
                <p className="font-semibold text-lg">Kelompok Usaha</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-linear-to-r from-green-600 via-emerald-600 to-teal-700 rounded-2xl shadow-2xl p-8 text-white text-center">
          <FaSeedling className="text-6xl mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mari Kembangkan Potensi Desa Bersama
          </h2>
          <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
            Dengan berbagai keunggulan yang dimiliki, mari bersama-sama
            membangun Desa Tababo Selatan menjadi desa yang lebih maju dan
            sejahtera
          </p>
        </div>

        {/* Admin Note */}
        {(!pertanian.length && !peternakan.length && !umkm.length && !wisata.length && !infrastruktur.length) && (
          <div className="mt-8 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg shadow-md">
            <p className="text-sm text-green-700">
              <strong>Catatan:</strong> Silakan isi informasi keunggulan desa
              melalui halaman admin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
