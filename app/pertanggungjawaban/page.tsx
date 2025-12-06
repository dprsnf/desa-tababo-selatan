"use client";

import { useState, useEffect } from "react";
import {
  FaChartPie,
  FaMoneyBillWave,
  FaClipboardList,
  FaDownload,
} from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { motion } from "framer-motion";

interface PertanggungjawabanData {
  judul?: string;
  konten?: string;
  apbdes?: {
    tahun: string;
    total_anggaran: number;
    pendapatan: number;
    belanja: number;
    pembiayaan: number;
  };
  realisasi?: Array<{
    uraian: string;
    anggaran: number;
    realisasi: number;
    persentase: number;
  }>;
  program?: Array<{
    bidang: string;
    kegiatan: string[];
  }>;
  dokumen?: Array<{
    judul: string;
    file: string;
  }>;
}

export default function Pertanggungjawaban() {
  const [data, setData] = useState<PertanggungjawabanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/pertanggungjawaban-page");
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setData(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching pertanggungjawaban:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

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

  const judul = data?.judul || "Pertanggungjawaban Desa";
  const konten =
    data?.konten || "Laporan dan Akuntabilitas Pemerintah Desa Tababo Selatan";

  // Default program if no data
  const defaultProgram = [
    {
      bidang: "Bidang Penyelenggaraan Pemerintahan Desa",
      kegiatan: ["Belum ada data program"],
    },
    { bidang: "Bidang Pembangunan Desa", kegiatan: ["Belum ada data program"] },
    {
      bidang: "Bidang Pembinaan Kemasyarakatan",
      kegiatan: ["Belum ada data program"],
    },
    {
      bidang: "Bidang Pemberdayaan Masyarakat",
      kegiatan: ["Belum ada data program"],
    },
  ];

  const program =
    data?.program && data.program.length > 0 ? data.program : defaultProgram;

  const programColors = [
    "from-green-500 to-emerald-600",
    "from-emerald-500 to-teal-600",
    "from-teal-500 to-cyan-600",
    "from-lime-500 to-green-600",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <MdAccountBalance className="text-6xl text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {judul}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600">{konten}</p>
        </div>

        <div className="space-y-6">
          {/* APBDes */}
          {data?.apbdes && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                  <FaChartPie />
                </span>
                Anggaran Pendapatan dan Belanja Desa (APBDes)
              </h2>
              <div className="border-l-4 border-green-600 pl-6 py-4 bg-green-50 rounded-r-lg">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  Tahun Anggaran {data.apbdes.tahun}
                </h3>
                <p className="text-gray-700 mb-2 font-bold text-xl text-green-700">
                  Total Anggaran: {formatRupiah(data.apbdes.total_anggaran)}
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-green-600" />
                    Pendapatan: {formatRupiah(data.apbdes.pendapatan)}
                  </li>
                  <li className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-orange-600" />
                    Belanja: {formatRupiah(data.apbdes.belanja)}
                  </li>
                  <li className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-blue-600" />
                    Pembiayaan: {formatRupiah(data.apbdes.pembiayaan)}
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Realisasi APBDes */}
          {data?.realisasi && data.realisasi.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                  <FaClipboardList />
                </span>
                Realisasi APBDes
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-green-500 to-emerald-600">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                        Uraian
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                        Anggaran
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                        Realisasi
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                        Persentase
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.realisasi.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-green-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          {item.uraian}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatRupiah(item.anggaran)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatRupiah(item.realisasi)}
                        </td>
                        <td className="px-6 py-4 text-sm text-green-600 font-bold">
                          {item.persentase}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Program dan Kegiatan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-green-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="bg-gradient-to-br from-lime-600 to-green-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <FaClipboardList />
              </span>
              Program dan Kegiatan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {program.map((bidang, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${programColors[index % programColors.length]} text-white rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                >
                  <h3 className="font-bold text-lg mb-3">{bidang.bidang}</h3>
                  <ul className="list-disc list-inside space-y-2 text-green-50">
                    {bidang.kegiatan.map((kegiatan, idx) => (
                      <li key={idx}>{kegiatan}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Download Dokumen */}
          {data?.dokumen && data.dokumen.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-xl p-8 text-white"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaDownload className="text-3xl" />
                Dokumen Pertanggungjawaban
              </h2>
              <div className="space-y-3">
                {data.dokumen.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-all border border-white/20"
                  >
                    <span className="font-medium">{doc.judul}</span>
                    <span className="flex items-center gap-2">
                      <FaDownload /> Download
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty state */}
          {!data?.apbdes && !data?.realisasi && !data?.dokumen && (
            <div className="text-center py-20 bg-white rounded-2xl shadow-xl">
              <MdAccountBalance className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">
                Data pertanggungjawaban belum tersedia
              </p>
              <p className="text-gray-400 text-sm">
                Silakan isi data melalui halaman admin
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
