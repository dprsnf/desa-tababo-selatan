"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaUserTie, FaUsers, FaCalendarAlt, FaAward } from "react-icons/fa";
import { GiVillage } from "react-icons/gi";

interface PerangkatDesa {
  id: string;
  nama: string;
  jabatan: string;
  nip?: string | null;
  foto?: string | null;
  kontak?: string | null;
}

interface KepalaDesaSebelumnya {
  id: string;
  nama: string;
  periode_mulai: string;
  periode_selesai: string | null;
  foto: string | null;
  deskripsi: string | null;
}

interface StrukturPemerintahanData {
  kepala_desa?: PerangkatDesa;
  sekretaris?: PerangkatDesa;
  kaur?: PerangkatDesa[];
  kasi?: PerangkatDesa[];
  kepala_dusun?: PerangkatDesa[];
  perangkat_lain?: PerangkatDesa[];
  kepala_desa_sebelumnya?: KepalaDesaSebelumnya[];
}

export default function StrukturPemerintahan() {
  const [data, setData] = useState<StrukturPemerintahanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/struktur-organisasi");
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setData(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching struktur pemerintahan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatPeriode = (mulai: string, selesai: string | null) => {
    const tahunMulai = new Date(mulai).getFullYear();
    const tahunSelesai = selesai ? new Date(selesai).getFullYear() : "Sekarang";
    return `${tahunMulai} - ${tahunSelesai}`;
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

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 via-emerald-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <GiVillage className="text-6xl text-green-600 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Struktur Pemerintahan
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-green-500 to-emerald-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600">
            Pemerintahan Desa Tababo Selatan
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
          {/* Kepala Desa */}
          {data?.kepala_desa ? (
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-linear-to-br from-green-600 to-emerald-700 text-white rounded-2xl px-10 py-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {data.kepala_desa.foto ? (
                  <img
                    src={data.kepala_desa.foto}
                    alt={data.kepala_desa.nama}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white"
                  />
                ) : (
                  <FaUserTie className="text-5xl mx-auto mb-4" />
                )}
                <h2 className="text-2xl font-bold mb-2">Kepala Desa</h2>
                <p className="text-xl text-green-100 mb-1">
                  {data.kepala_desa.nama}
                </p>
                {data.kepala_desa.nip && (
                  <p className="text-sm text-green-200">
                    NIP: {data.kepala_desa.nip}
                  </p>
                )}
              </motion.div>
            </div>
          ) : (
            <div className="text-center mb-12">
              <div className="inline-block bg-linear-to-br from-green-600 to-emerald-700 text-white rounded-2xl px-10 py-8 shadow-xl">
                <FaUserTie className="text-5xl mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Kepala Desa</h2>
                <p className="text-xl text-green-100">-</p>
              </div>
            </div>
          )}

          {/* Sekretaris Desa */}
          {data?.sekretaris ? (
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block bg-linear-to-br from-emerald-600 to-teal-700 text-white rounded-2xl px-10 py-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {data.sekretaris.foto ? (
                  <img
                    src={data.sekretaris.foto}
                    alt={data.sekretaris.nama}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white"
                  />
                ) : (
                  <FaUser className="text-4xl mx-auto mb-4" />
                )}
                <h2 className="text-2xl font-bold mb-2">Sekretaris Desa</h2>
                <p className="text-xl text-emerald-100 mb-1">
                  {data.sekretaris.nama}
                </p>
                {data.sekretaris.nip && (
                  <p className="text-sm text-emerald-200">
                    NIP: {data.sekretaris.nip}
                  </p>
                )}
              </motion.div>
            </div>
          ) : (
            <div className="text-center mb-12">
              <div className="inline-block bg-linear-to-br from-emerald-600 to-teal-700 text-white rounded-2xl px-10 py-8 shadow-xl">
                <FaUser className="text-4xl mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Sekretaris Desa</h2>
                <p className="text-xl text-emerald-100">-</p>
              </div>
            </div>
          )}

          {/* Kaur dan Kasi */}
          {((data?.kaur && data.kaur.length > 0) ||
            (data?.kasi && data.kasi.length > 0)) && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Kepala Urusan & Kepala Seksi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Kaur */}
                {data?.kaur?.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className={`bg-linear-to-br ${
                      [
                        "from-green-500 to-emerald-600",
                        "from-emerald-500 to-teal-600",
                        "from-teal-500 to-cyan-600",
                      ][index % 3]
                    } text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
                  >
                    {item.foto ? (
                      <img
                        src={item.foto}
                        alt={item.nama}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <FaUser className="text-4xl mx-auto mb-4" />
                    )}
                    <h3 className="font-bold text-lg mb-2">{item.jabatan}</h3>
                    <p className="text-green-100 mb-1">{item.nama}</p>
                    {item.nip && (
                      <p className="text-xs text-green-200">NIP: {item.nip}</p>
                    )}
                  </motion.div>
                ))}

                {/* Kasi */}
                {data?.kasi?.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + (data.kaur?.length || 0) * 0.1 + index * 0.1,
                    }}
                    className={`bg-linear-to-br ${
                      [
                        "from-lime-500 to-green-600",
                        "from-green-500 to-emerald-600",
                        "from-emerald-500 to-green-700",
                      ][index % 3]
                    } text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
                  >
                    {item.foto ? (
                      <img
                        src={item.foto}
                        alt={item.nama}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <FaUser className="text-4xl mx-auto mb-4" />
                    )}
                    <h3 className="font-bold text-lg mb-2">{item.jabatan}</h3>
                    <p className="text-green-100 mb-1">{item.nama}</p>
                    {item.nip && (
                      <p className="text-xs text-green-200">NIP: {item.nip}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Kepala Dusun */}
          {data?.kepala_dusun && data.kepala_dusun.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-3">
                <FaUsers className="text-green-600" />
                Kepala Dusun
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.kepala_dusun.map((dusun, index) => (
                  <motion.div
                    key={dusun.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="bg-linear-to-br from-green-600 to-teal-700 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {dusun.foto ? (
                      <img
                        src={dusun.foto}
                        alt={dusun.nama}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <GiVillage className="text-4xl mx-auto mb-4" />
                    )}
                    <h3 className="font-bold text-lg mb-2">{dusun.jabatan}</h3>
                    <p className="text-green-100 mb-1">{dusun.nama}</p>
                    {dusun.nip && (
                      <p className="text-xs text-green-200">NIP: {dusun.nip}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!data?.kepala_desa &&
            !data?.sekretaris &&
            (!data?.kaur || data.kaur.length === 0) &&
            (!data?.kasi || data.kasi.length === 0) &&
            (!data?.kepala_dusun || data.kepala_dusun.length === 0) && (
              <div className="text-center py-12">
                <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Data struktur pemerintahan belum tersedia
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Silakan isi data melalui halaman admin
                </p>
              </div>
            )}
        </div>

        {/* Kepala Desa Sebelumnya Section */}
        {data?.kepala_desa_sebelumnya && data.kepala_desa_sebelumnya.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <FaAward className="text-5xl text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Kepala Desa Sebelumnya
              </h2>
              <div className="w-24 h-1 bg-linear-to-r from-green-500 to-emerald-600 mx-auto rounded-full mb-4"></div>
              <p className="text-lg text-gray-600">
                Daftar kepala desa yang pernah memimpin Desa Tababo Selatan
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
              {/* Timeline */}
              <div className="relative">
                {/* Vertical Line */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-linear-to-b from-green-500 via-emerald-500 to-green-500"></div>

                <div className="space-y-12">
                  {data.kepala_desa_sebelumnya.map((kepala, index) => (
                    <motion.div
                      key={kepala.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`flex flex-col md:flex-row items-center gap-8 ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Content Card */}
                      <div className="w-full md:w-5/12">
                        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-green-100">
                          <div className="flex items-center gap-6">
                            {/* Avatar */}
                            <div className="shrink-0">
                              {kepala.foto ? (
                                <img
                                  src={kepala.foto}
                                  alt={kepala.nama}
                                  className="w-24 h-24 rounded-full object-cover border-4 border-green-500 shadow-lg"
                                />
                              ) : (
                                <div className="w-24 h-24 bg-linear-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center text-white shadow-lg">
                                  <FaUserTie className="text-4xl" />
                                </div>
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                              <div className="inline-flex items-center gap-2 bg-linear-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-full mb-3 shadow-md">
                                <FaCalendarAlt />
                                {formatPeriode(kepala.periode_mulai, kepala.periode_selesai)}
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {kepala.nama}
                              </h3>
                              <p className="text-gray-600 text-sm flex items-center gap-2">
                                <FaUserTie className="text-green-600" />
                                Kepala Desa
                              </p>
                            </div>
                          </div>

                          {/* Additional Info */}
                          {kepala.deskripsi && (
                            <div className="mt-4 pt-4 border-t border-green-100">
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {kepala.deskripsi}
                              </p>
                            </div>
                          )}

                          {!kepala.deskripsi && (
                            <div className="mt-4 pt-4 border-t border-green-100">
                              <p className="text-gray-600 text-sm">
                                Memimpin Desa Tababo Selatan selama periode{" "}
                                {formatPeriode(kepala.periode_mulai, kepala.periode_selesai)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Timeline Dot */}
                      <div className="hidden md:flex w-2/12 justify-center">
                        <div className="w-8 h-8 bg-linear-to-br from-green-600 to-emerald-700 rounded-full border-4 border-white shadow-xl z-10"></div>
                      </div>

                      {/* Empty Space */}
                      <div className="hidden md:block w-5/12"></div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Summary Box */}
              <div className="mt-16 bg-linear-to-r from-green-600 via-emerald-600 to-green-700 rounded-2xl shadow-2xl p-8 text-white">
                <div className="text-center">
                  <FaAward className="text-5xl mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Kepemimpinan yang Berkelanjutan
                  </h2>
                  <p className="text-lg opacity-90 max-w-3xl mx-auto">
                    Setiap kepala desa telah memberikan kontribusi berharga dalam
                    pembangunan dan kemajuan Desa Tababo Selatan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-8 bg-linear-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white text-center shadow-xl">
          <p className="text-lg">
            <strong>Transparansi & Akuntabilitas</strong> - Pemerintahan desa
            yang melayani dengan sepenuh hati
          </p>
        </div>
      </div>
    </div>
  );
}
