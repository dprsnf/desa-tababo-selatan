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
import { GiWheat, GiCorn, GiCoconuts, GiCow } from "react-icons/gi";

interface KeunggulanItem {
  id?: string;
  judul: string;
  deskripsi: string;
  icon?: string;
  kategori?: string;
}

interface KeunggulanData {
  judul: string;
  konten: string;
  items?: KeunggulanItem[];
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700 text-lg">Memuat...</p>
        </div>
      </div>
    );
  }

  const judul = data?.judul || "Keunggulan Desa Tababo Selatan";
  const konten =
    data?.konten ||
    "Desa Tababo Selatan memiliki berbagai keunggulan dan potensi yang dapat dikembangkan untuk kesejahteraan masyarakat";
  const items = data?.items || [];

  // Default categories if no custom data
  const defaultCategories = [
    {
      key: "pertanian",
      title: "Pertanian dan Perkebunan",
      icon: <GiWheat className="text-4xl text-white" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      key: "peternakan",
      title: "Peternakan",
      icon: <GiCow className="text-4xl text-white" />,
      color: "from-amber-500 to-orange-600",
    },
    {
      key: "umkm",
      title: "UMKM dan Produk Lokal",
      icon: <FaStore className="text-4xl text-white" />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      key: "wisata",
      title: "Potensi Wisata",
      icon: <FaMountain className="text-4xl text-white" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      key: "sdm",
      title: "Sumber Daya Manusia",
      icon: <FaUsers className="text-4xl text-white" />,
      color: "from-red-500 to-pink-600",
    },
    {
      key: "infrastruktur",
      title: "Infrastruktur Desa",
      icon: <FaRoad className="text-4xl text-white" />,
      color: "from-indigo-500 to-purple-600",
    },
  ];

  // Group items by category
  const groupedItems = items.reduce((acc: any, item) => {
    const kategori = item.kategori || "umum";
    if (!acc[kategori]) {
      acc[kategori] = [];
    }
    acc[kategori].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <FaLeaf className="text-6xl text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {judul}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600">
            Potensi dan Keunggulan yang Dimiliki Desa Kami
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-2xl shadow-2xl p-8 md:p-12 mb-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <FaSeedling className="text-6xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Desa yang Kaya Akan Potensi
            </h2>
            <p className="text-lg opacity-90">{konten}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {items.length > 0 ? (
            // Render custom items from database
            <>
              {defaultCategories.map((category) => {
                const categoryItems = groupedItems[category.key] || [];
                if (categoryItems.length === 0) return null;

                return (
                  <div
                    key={category.key}
                    className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg`}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryItems.map(
                        (item: KeunggulanItem, index: number) => (
                          <div
                            key={item.id || index}
                            className="border-2 border-green-200 rounded-xl p-6 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                          >
                            {item.icon && (
                              <div className="text-4xl mb-3">{item.icon}</div>
                            )}
                            <h3 className="font-bold text-lg text-gray-900 mb-3">
                              {item.judul}
                            </h3>
                            <p className="text-gray-700">{item.deskripsi}</p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Items without category */}
              {groupedItems.umum && groupedItems.umum.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Keunggulan Lainnya
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedItems.umum.map(
                      (item: KeunggulanItem, index: number) => (
                        <div
                          key={item.id || index}
                          className="border-2 border-green-200 rounded-xl p-6 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                          {item.icon && (
                            <div className="text-4xl mb-3">{item.icon}</div>
                          )}
                          <h3 className="font-bold text-lg text-gray-900 mb-3">
                            {item.judul}
                          </h3>
                          <p className="text-gray-700">{item.deskripsi}</p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            // Default content when no data available
            <>
              {/* Potensi Pertanian */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <GiWheat className="text-4xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Pertanian dan Perkebunan
                    </h2>
                    <div className="h-1 w-20 bg-green-600 rounded"></div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  Desa Tababo Selatan memiliki lahan pertanian dan perkebunan
                  yang luas dengan berbagai komoditas unggulan.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <GiWheat className="text-5xl" />,
                      title: "Padi",
                      desc: "Lahan sawah produktif",
                      color: "from-amber-400 to-yellow-600",
                    },
                    {
                      icon: <GiCorn className="text-5xl" />,
                      title: "Jagung",
                      desc: "Komoditas unggulan",
                      color: "from-yellow-400 to-orange-600",
                    },
                    {
                      icon: <GiCoconuts className="text-5xl" />,
                      title: "Kelapa",
                      desc: "Perkebunan berkualitas",
                      color: "from-green-400 to-emerald-600",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-br ${item.color} text-white rounded-xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}
                    >
                      <div className="mb-4">{item.icon}</div>
                      <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                      <p className="text-white/90 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Peternakan */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <GiCow className="text-4xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Peternakan
                    </h2>
                    <div className="h-1 w-20 bg-amber-600 rounded"></div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  Sektor peternakan berkembang pesat dengan berbagai jenis
                  ternak.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🐄", name: "Sapi" },
                    { emoji: "🐐", name: "Kambing" },
                    { emoji: "🐔", name: "Ayam" },
                    { emoji: "🦆", name: "Bebek" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 text-center border-2 border-amber-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <div className="text-4xl mb-3">{item.emoji}</div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* UMKM dan Kerajinan */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <FaStore className="text-4xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      UMKM dan Produk Lokal
                    </h2>
                    <div className="h-1 w-20 bg-blue-600 rounded"></div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  Berbagai usaha mikro, kecil, dan menengah yang berkembang di
                  desa.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Kerajinan Tangan",
                      desc: "Produk kerajinan tangan khas desa",
                      icon: "🎨",
                    },
                    {
                      title: "Produk Olahan Pangan",
                      desc: "Makanan dan minuman olahan lokal",
                      icon: "🍱",
                    },
                    {
                      title: "Jasa dan Perdagangan",
                      desc: "Berbagai layanan jasa masyarakat",
                      icon: "💼",
                    },
                    {
                      title: "Industri Rumahan",
                      desc: "Usaha produktif skala rumah tangga",
                      icon: "🏭",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-600 pl-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-r-xl shadow-md hover:shadow-lg hover:translate-x-1 transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sumber Daya Manusia */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
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
                  Masyarakat yang produktif dan berkualitas menjadi aset utama
                  pembangunan desa.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      value: "2,500+",
                      label: "Jumlah Penduduk",
                      color: "from-red-500 to-pink-600",
                    },
                    {
                      value: "85%",
                      label: "Usia Produktif",
                      color: "from-orange-500 to-red-600",
                    },
                    {
                      value: "50+",
                      label: "Kelompok Usaha",
                      color: "from-pink-500 to-rose-600",
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className={`text-center p-8 bg-gradient-to-br ${stat.color} text-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                    >
                      <div className="text-5xl font-bold mb-2">
                        {stat.value}
                      </div>
                      <p className="font-semibold text-lg">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-2xl shadow-2xl p-8 text-white text-center">
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
        {!data && (
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
