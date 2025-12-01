"use client";

import { FaBook, FaClock, FaPalette, FaStar } from "react-icons/fa";
import { GiVillage } from "react-icons/gi";

export default function SejarahDesa() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <FaBook className="text-6xl text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Sejarah Desa Tababo Selatan
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600">
            Perjalanan dan Perkembangan Desa dari Masa ke Masa
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-2xl shadow-2xl p-8 md:p-12 mb-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <GiVillage className="text-6xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Desa yang Kaya Akan Sejarah dan Budaya
            </h2>
            <p className="text-lg opacity-90">
              Desa Tababo Selatan memiliki perjalanan panjang yang penuh dengan 
              cerita inspiratif dan perkembangan yang berkelanjutan
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Asal Usul */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaBook className="text-3xl text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Asal Usul Desa</h2>
                <div className="h-1 w-20 bg-green-600 rounded"></div>
              </div>
            </div>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Desa Tababo Selatan merupakan salah satu desa yang terletak di wilayah 
                [nama kecamatan], Kabupaten [nama kabupaten]. Nama "Tababo" sendiri 
                memiliki arti dan makna historis yang mendalam dalam bahasa lokal.
              </p>
              <p>
                Konon, pada masa lampau daerah ini merupakan kawasan yang [cerita asal usul]. 
                Dari sinilah kemudian terbentuk sebuah perkampungan yang terus berkembang 
                hingga menjadi desa yang mandiri seperti sekarang ini.
              </p>
            </div>
          </div>

          {/* Timeline Sejarah */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaClock className="text-3xl text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Perjalanan Waktu</h2>
                <div className="h-1 w-20 bg-emerald-600 rounded"></div>
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                { year: "XXXX", title: "Pembentukan Desa", desc: "Desa Tababo Selatan resmi dibentuk sebagai desa definitif.", color: "green" },
                { year: "XXXX", title: "Perkembangan Infrastruktur", desc: "Pembangunan infrastruktur dasar dimulai.", color: "emerald" },
                { year: "XXXX", title: "Modernisasi Desa", desc: "Era modernisasi dimulai dengan masuknya teknologi.", color: "teal" },
                { year: "Kini", title: "Desa Maju dan Berkembang", desc: "Desa terus berkembang menjadi desa yang mandiri.", color: "lime" }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`border-l-4 border-${item.color}-600 pl-6 py-3 bg-${item.color}-50 rounded-r-lg hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md`}>
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Budaya dan Tradisi */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaPalette className="text-3xl text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Budaya dan Tradisi</h2>
                <div className="h-1 w-20 bg-purple-600 rounded"></div>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Masyarakat Desa Tababo Selatan memiliki kekayaan budaya dan tradisi 
              yang masih terjaga hingga saat ini.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: "🎉", title: "Tradisi Upacara Adat", desc: "[Deskripsi tentang upacara adat]" },
                { icon: "🎨", title: "Kesenian Lokal", desc: "[Deskripsi tentang kesenian tradisional]" },
                { icon: "🍲", title: "Kuliner Khas", desc: "[Deskripsi tentang makanan khas]" },
                { icon: "🏛️", title: "Situs Bersejarah", desc: "[Deskripsi tentang situs bersejarah]" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="border-2 border-green-200 rounded-xl p-6 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tokoh Penting */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaStar className="text-3xl text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Tokoh Penting dalam Sejarah Desa</h2>
                <div className="h-1 w-20 bg-amber-600 rounded"></div>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Dalam perjalanan sejarahnya, Desa Tababo Selatan telah melahirkan berbagai tokoh penting.
            </p>
            <div className="space-y-4">
              {[1, 2].map((_, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-l-4 border-amber-500 shadow-md hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-bold text-lg text-gray-900 mb-2">[Nama Tokoh {index + 1}]</h4>
                  <p className="text-gray-600 mb-2 text-sm">[Peran/Jabatan] - [Periode]</p>
                  <p className="text-gray-700">[Deskripsi kontribusi tokoh tersebut]</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg shadow-md">
          <p className="text-sm text-blue-700">
            <strong>Catatan:</strong> Silakan perbarui informasi dengan data sejarah yang akurat dari Desa Tababo Selatan.
          </p>
        </div>
      </div>
    </div>
  );
}
