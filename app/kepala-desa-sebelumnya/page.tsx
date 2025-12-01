"use client";

import { FaUserTie, FaCalendarAlt, FaAward } from "react-icons/fa";

export default function KepalaDesaSebelumnya() {
  const kepalaDesaList = [
    { periode: "2018 - 2024", nama: "Nama Kepala Desa 1" },
    { periode: "2012 - 2018", nama: "Nama Kepala Desa 2" },
    { periode: "2006 - 2012", nama: "Nama Kepala Desa 3" },
    { periode: "2000 - 2006", nama: "Nama Kepala Desa 4" },
    { periode: "1994 - 2000", nama: "Nama Kepala Desa 5" },
    { periode: "1988 - 1994", nama: "Nama Kepala Desa 6" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <FaAward className="text-6xl text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Kepala Desa Sebelumnya
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600">
            Daftar kepala desa yang pernah memimpin Desa Tababo Selatan
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-500 via-emerald-500 to-green-500"></div>

          <div className="space-y-12">
            {kepalaDesaList.map((kepala, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-5/12">
                  <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-green-100">
                    <div className="flex items-center gap-6">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center text-white shadow-lg">
                          <FaUserTie className="text-4xl" />
                        </div>
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-full mb-3 shadow-md">
                          <FaCalendarAlt />
                          {kepala.periode}
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
                    <div className="mt-4 pt-4 border-t border-green-100">
                      <p className="text-gray-600 text-sm">
                        Memimpin Desa Tababo Selatan selama periode {kepala.periode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex w-2/12 justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full border-4 border-white shadow-xl z-10"></div>
                </div>

                {/* Empty Space */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Box */}
        <div className="mt-16 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 rounded-2xl shadow-2xl p-8 text-white">
          <div className="text-center">
            <FaAward className="text-5xl mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Kepemimpinan yang Berkelanjutan</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Setiap kepala desa telah memberikan kontribusi berharga dalam pembangunan 
              dan kemajuan Desa Tababo Selatan.
            </p>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg shadow-md">
          <p className="text-sm text-amber-800">
            <strong>Catatan:</strong> Silakan perbarui nama, periode, dan informasi 
            lainnya sesuai dengan data sebenarnya dari Desa Tababo Selatan.
          </p>
        </div>
      </div>
    </div>
  );
}
