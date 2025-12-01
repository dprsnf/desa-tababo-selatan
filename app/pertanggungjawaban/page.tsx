"use client";

import { FaChartPie, FaMoneyBillWave, FaClipboardList, FaDownload } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";

export default function Pertanggungjawaban() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <MdAccountBalance className="text-6xl text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Pertanggungjawaban Desa
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600">
            Laporan dan Akuntabilitas Pemerintah Desa Tababo Selatan
          </p>
        </div>

        <div className="space-y-6">
          {/* APBDes */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <FaChartPie />
              </span>
              Anggaran Pendapatan dan Belanja Desa (APBDes)
            </h2>
            <div className="border-l-4 border-green-600 pl-6 py-4 bg-green-50 rounded-r-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Tahun Anggaran 2024
              </h3>
              <p className="text-gray-700 mb-2 font-bold text-xl text-green-700">
                Total Anggaran: Rp XXX.XXX.XXX,-
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-600" />
                  Pendapatan: Rp XXX.XXX.XXX,-
                </li>
                <li className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-orange-600" />
                  Belanja: Rp XXX.XXX.XXX,-
                </li>
                <li className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-blue-600" />
                  Pembiayaan: Rp XXX.XXX.XXX,-
                </li>
              </ul>
            </div>
          </div>

          {/* Realisasi APBDes */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-shadow duration-300">
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
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">Uraian</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">Anggaran</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">Realisasi</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">Persentase</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-green-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">Pendapatan Desa</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Rp XXX.XXX.XXX</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Rp XXX.XXX.XXX</td>
                    <td className="px-6 py-4 text-sm text-green-600 font-bold">XX%</td>
                  </tr>
                  <tr className="hover:bg-green-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">Belanja Desa</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Rp XXX.XXX.XXX</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Rp XXX.XXX.XXX</td>
                    <td className="px-6 py-4 text-sm text-green-600 font-bold">XX%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Program dan Kegiatan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="bg-gradient-to-br from-lime-600 to-green-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <FaClipboardList />
              </span>
              Program dan Kegiatan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Bidang Penyelenggaraan Pemerintahan Desa", color: "from-green-500 to-emerald-600" },
                { title: "Bidang Pembangunan Desa", color: "from-emerald-500 to-teal-600" },
                { title: "Bidang Pembinaan Kemasyarakatan", color: "from-teal-500 to-cyan-600" },
                { title: "Bidang Pemberdayaan Masyarakat", color: "from-lime-500 to-green-600" }
              ].map((bidang, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${bidang.color} text-white rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                >
                  <h3 className="font-bold text-lg mb-3">{bidang.title}</h3>
                  <ul className="list-disc list-inside space-y-2 text-green-50">
                    <li>Program 1</li>
                    <li>Program 2</li>
                    <li>Program 3</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Download Dokumen */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FaDownload className="text-3xl" />
              Dokumen Pertanggungjawaban
            </h2>
            <div className="space-y-3">
              {[
                "Laporan Pertanggungjawaban Tahun 2024",
                "APBDes Tahun 2024",
                "Realisasi APBDes Semester I 2024"
              ].map((doc, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center justify-between p-4 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-all border border-white/20"
                >
                  <span className="font-medium">{doc}</span>
                  <span className="flex items-center gap-2">
                    <FaDownload /> Download
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
