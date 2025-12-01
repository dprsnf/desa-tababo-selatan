"use client";

import type { Metadata } from "next";
import { motion } from "framer-motion";
import { FaUser, FaUserTie, FaUsers } from "react-icons/fa";
import { GiVillage } from "react-icons/gi";

export default function StrukturOrganisasi() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <GiVillage className="text-6xl text-green-600 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Struktur Organisasi
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600">
            Pemerintahan Desa Tababo Selatan
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
          {/* Kepala Desa */}
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-2xl px-10 py-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <FaUserTie className="text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Kepala Desa</h2>
              <p className="text-xl text-green-100">Nama Kepala Desa</p>
            </div>
          </div>

          {/* Sekretaris Desa */}
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl px-10 py-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <FaUser className="text-4xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Sekretaris Desa</h2>
              <p className="text-xl text-emerald-100">Nama Sekretaris</p>
            </div>
          </div>

          {/* Kaur dan Kasi */}
          <div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Kepala Urusan & Kepala Seksi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { title: "Kaur Keuangan", name: "Nama Kaur Keuangan", color: "from-green-500 to-emerald-600" },
                { title: "Kaur Umum & TU", name: "Nama Kaur Umum", color: "from-emerald-500 to-teal-600" },
                { title: "Kaur Perencanaan", name: "Nama Kaur Perencanaan", color: "from-teal-500 to-cyan-600" },
                { title: "Kasi Pemerintahan", name: "Nama Kasi Pemerintahan", color: "from-lime-500 to-green-600" },
                { title: "Kasi Kesejahteraan", name: "Nama Kasi Kesejahteraan", color: "from-green-500 to-emerald-600" },
                { title: "Kasi Pelayanan", name: "Nama Kasi Pelayanan", color: "from-emerald-500 to-green-700" }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${item.color} text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
                >
                  <FaUser className="text-3xl mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-green-100">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Kepala Dusun */}
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-3">
              <FaUsers className="text-green-600" />
              Kepala Dusun
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Dusun I", name: "Nama Kadus I" },
                { title: "Dusun II", name: "Nama Kadus II" },
                { title: "Dusun III", name: "Nama Kadus III" },
                { title: "Dusun IV", name: "Nama Kadus IV" }
              ].map((dusun, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-600 to-teal-700 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <GiVillage className="text-4xl mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">{dusun.title}</h3>
                  <p className="text-green-100">{dusun.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white text-center shadow-xl">
          <p className="text-lg">
            <strong>Transparansi & Akuntabilitas</strong> - Pemerintahan desa yang melayani dengan sepenuh hati
          </p>
        </div>
      </div>
    </div>
  );
}
