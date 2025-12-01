"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import Link from "next/link";
import AdminNavbar from "@/components/AdminNavbar";

export default function EditPertanggungjawaban() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };
  const [formData, setFormData] = useState({
    apbdes: {
      tahun: "2024",
      pendapatan: "Rp 1.500.000.000",
      belanja: "Rp 1.400.000.000",
      surplus: "Rp 100.000.000"
    },
    realisasi: [
      { bidang: "Bidang Penyelenggaraan Pemerintahan", anggaran: "Rp 400.000.000", realisasi: "95%" },
      { bidang: "Bidang Pembangunan", anggaran: "Rp 600.000.000", realisasi: "92%" },
      { bidang: "Bidang Pembinaan Kemasyarakatan", anggaran: "Rp 300.000.000", realisasi: "88%" },
      { bidang: "Bidang Pemberdayaan Masyarakat", anggaran: "Rp 100.000.000", realisasi: "90%" },
    ],
    program: [
      { nama: "Pembangunan Jalan Desa", status: "Selesai", dana: "Rp 200.000.000" },
      { nama: "Posyandu Aktif", status: "Berjalan", dana: "Rp 50.000.000" },
      { nama: "Pelatihan UMKM", status: "Berjalan", dana: "Rp 30.000.000" },
    ]
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={handleLogout} />
      <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Edit Pertanggungjawaban</h1>
            <p className="text-gray-600 text-sm">Kelola laporan keuangan dan program desa</p>
          </div>
          <div className="flex gap-3">
            <Link href="/pertanggungjawaban" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all">
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

      <div className="space-y-6">
        {/* APBDes */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">APBDes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tahun Anggaran</label>
              <input type="text" value={formData.apbdes.tahun} onChange={(e) => setFormData({ ...formData, apbdes: { ...formData.apbdes, tahun: e.target.value }})} className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Total Pendapatan</label>
              <input type="text" value={formData.apbdes.pendapatan} onChange={(e) => setFormData({ ...formData, apbdes: { ...formData.apbdes, pendapatan: e.target.value }})} className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Total Belanja</label>
              <input type="text" value={formData.apbdes.belanja} onChange={(e) => setFormData({ ...formData, apbdes: { ...formData.apbdes, belanja: e.target.value }})} className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Surplus/Defisit</label>
              <input type="text" value={formData.apbdes.surplus} onChange={(e) => setFormData({ ...formData, apbdes: { ...formData.apbdes, surplus: e.target.value }})} className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Realisasi */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Realisasi Anggaran</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <FaPlus /> Tambah
            </button>
          </div>
          <div className="space-y-4">
            {formData.realisasi.map((item, index) => (
              <div key={index} className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg">
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Bidang</label>
                    <input type="text" value={item.bidang} onChange={(e) => { const newData = [...formData.realisasi]; newData[index].bidang = e.target.value; setFormData({ ...formData, realisasi: newData }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Anggaran</label>
                    <input type="text" value={item.anggaran} onChange={(e) => { const newData = [...formData.realisasi]; newData[index].anggaran = e.target.value; setFormData({ ...formData, realisasi: newData }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Realisasi</label>
                    <input type="text" value={item.realisasi} onChange={(e) => { const newData = [...formData.realisasi]; newData[index].realisasi = e.target.value; setFormData({ ...formData, realisasi: newData }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm" />
                  </div>
                </div>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Program */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Program & Kegiatan</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <FaPlus /> Tambah
            </button>
          </div>
          <div className="space-y-4">
            {formData.program.map((item, index) => (
              <div key={index} className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg">
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Program</label>
                    <input type="text" value={item.nama} onChange={(e) => { const newData = [...formData.program]; newData[index].nama = e.target.value; setFormData({ ...formData, program: newData }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                    <select value={item.status} onChange={(e) => { const newData = [...formData.program]; newData[index].status = e.target.value; setFormData({ ...formData, program: newData }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm">
                      <option>Berjalan</option>
                      <option>Selesai</option>
                      <option>Direncanakan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Dana</label>
                    <input type="text" value={item.dana} onChange={(e) => { const newData = [...formData.program]; newData[index].dana = e.target.value; setFormData({ ...formData, program: newData }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm" />
                  </div>
                </div>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
