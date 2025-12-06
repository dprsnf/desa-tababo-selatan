"use client";

import { useState, useEffect } from "react";
import { FaSave, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { withAuth } from "@/contexts/AuthContext";

function EditKepalaDesaSebelumnya() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    kepalaDesaList: [
      {
        periode: "2018 - 2024",
        nama: "Nama Kepala Desa 1",
        prestasi: "Prestasi selama menjabat...",
      },
      {
        periode: "2012 - 2018",
        nama: "Nama Kepala Desa 2",
        prestasi: "Prestasi selama menjabat...",
      },
      {
        periode: "2006 - 2012",
        nama: "Nama Kepala Desa 3",
        prestasi: "Prestasi selama menjabat...",
      },
      {
        periode: "2000 - 2006",
        nama: "Nama Kepala Desa 4",
        prestasi: "Prestasi selama menjabat...",
      },
    ],
  });

  // Load data on mount
  useEffect(() => {
    loadKepalaDesaData();
  }, []);

  const loadKepalaDesaData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/kepala-desa-sebelumnya");
      const result = await response.json();

      if (result.success && result.data) {
        setFormData(result.data);
      }
    } catch (error) {
      console.error("Error loading kepala desa data:", error);
      alert("Gagal memuat data kepala desa");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Get token from localStorage
      const token = localStorage.getItem("token");

      const response = await fetch("/api/kepala-desa-sebelumnya", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert(result.error || "Gagal menyimpan data");
      }
    } catch (error) {
      console.error("Error saving kepala desa data:", error);
      alert("Gagal menyimpan data kepala desa");
    } finally {
      setSaving(false);
    }
  };

  const addKepala = () => {
    setFormData({
      ...formData,
      kepalaDesaList: [
        ...formData.kepalaDesaList,
        { periode: "", nama: "", prestasi: "" },
      ],
    });
  };

  const deleteKepala = (index: number) => {
    const newList = formData.kepalaDesaList.filter((_, i) => i !== index);
    setFormData({ ...formData, kepalaDesaList: newList });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data kepala desa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Edit Kepala Desa Sebelumnya
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola data kepala desa yang pernah menjabat
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/kepala-desa-sebelumnya"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all"
            >
              <FaEye /> Preview
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave /> {saving ? "Menyimpan..." : "Simpan"}
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
          <h2 className="text-xl font-bold text-gray-800">
            Daftar Kepala Desa
          </h2>
          <button
            onClick={addKepala}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <FaPlus /> Tambah Kepala Desa
          </button>
        </div>

        <div className="space-y-6">
          {formData.kepalaDesaList.map((kepala, index) => (
            <div
              key={index}
              className="border-2 border-gray-100 rounded-xl p-6 hover:border-green-200 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-700">
                  Kepala Desa #{index + 1}
                </h3>
                <button
                  onClick={() => deleteKepala(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus kepala desa"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Periode
                  </label>
                  <input
                    type="text"
                    value={kepala.periode}
                    onChange={(e) => {
                      const newList = [...formData.kepalaDesaList];
                      newList[index].periode = e.target.value;
                      setFormData({ ...formData, kepalaDesaList: newList });
                    }}
                    placeholder="Contoh: 2018 - 2024"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={kepala.nama}
                    onChange={(e) => {
                      const newList = [...formData.kepalaDesaList];
                      newList[index].nama = e.target.value;
                      setFormData({ ...formData, kepalaDesaList: newList });
                    }}
                    placeholder="Nama kepala desa"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prestasi / Pencapaian
                </label>
                <textarea
                  value={kepala.prestasi}
                  onChange={(e) => {
                    const newList = [...formData.kepalaDesaList];
                    newList[index].prestasi = e.target.value;
                    setFormData({ ...formData, kepalaDesaList: newList });
                  }}
                  placeholder="Deskripsi prestasi dan pencapaian selama menjabat..."
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none resize-none text-gray-900"
                />
              </div>
            </div>
          ))}

          {formData.kepalaDesaList.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>Belum ada data kepala desa.</p>
              <p className="text-sm mt-2">
                Klik tombol &quot;Tambah Kepala Desa&quot; untuk menambahkan
                data.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(EditKepalaDesaSebelumnya);
