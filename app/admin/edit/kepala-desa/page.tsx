"use client";

import { useState } from "react";
import { FaSave, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import Link from "next/link";

export default function EditKepalaDesaSebelumnya() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    kepalaDesaList: [
      { periode: "2018 - 2024", nama: "Nama Kepala Desa 1", prestasi: "Prestasi selama menjabat..." },
      { periode: "2012 - 2018", nama: "Nama Kepala Desa 2", prestasi: "Prestasi selama menjabat..." },
      { periode: "2006 - 2012", nama: "Nama Kepala Desa 3", prestasi: "Prestasi selama menjabat..." },
      { periode: "2000 - 2006", nama: "Nama Kepala Desa 4", prestasi: "Prestasi selama menjabat..." },
    ]
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addKepala = () => {
    setFormData({
      ...formData,
      kepalaDesaList: [...formData.kepalaDesaList, { periode: "", nama: "", prestasi: "" }]
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Edit Kepala Desa Sebelumnya</h1>
            <p className="text-gray-600 text-sm">Kelola data kepala desa yang pernah menjabat</p>
          </div>
          <div className="flex gap-3">
            <Link href="/kepala-desa-sebelumnya" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all">
              <FaEye /> Preview
            </Link>
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all">
              <FaSave /> Simpan
            </button>
          </div>
        </div>
      </div>

      {saved && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
          ✓ Data berhasil disimpan!
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Daftar Kepala Desa</h2>
          <button onClick={addKepala} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <FaPlus /> Tambah Kepala Desa
          </button>
        </div>

        <div className="space-y-6">
          {formData.kepalaDesaList.map((kepala, index) => (
            <div key={index} className="border-2 border-gray-100 rounded-xl p-6 hover:border-green-200 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-700">Kepala Desa #{index + 1}</h3>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <FaTrash />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Periode</label>
                  <input
                    type="text"
                    value={kepala.periode}
                    onChange={(e) => {
                      const newList = [...formData.kepalaDesaList];
                      newList[index].periode = e.target.value;
                      setFormData({ ...formData, kepalaDesaList: newList });
                    }}
                    placeholder="Contoh: 2018 - 2024"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    value={kepala.nama}
                    onChange={(e) => {
                      const newList = [...formData.kepalaDesaList];
                      newList[index].nama = e.target.value;
                      setFormData({ ...formData, kepalaDesaList: newList });
                    }}
                    placeholder="Nama kepala desa"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Prestasi / Pencapaian</label>
                <textarea
                  value={kepala.prestasi}
                  onChange={(e) => {
                    const newList = [...formData.kepalaDesaList];
                    newList[index].prestasi = e.target.value;
                    setFormData({ ...formData, kepalaDesaList: newList });
                  }}
                  placeholder="Deskripsi prestasi dan pencapaian selama menjabat..."
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
