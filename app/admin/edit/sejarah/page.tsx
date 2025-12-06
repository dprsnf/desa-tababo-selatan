"use client";

import { useState, useEffect } from "react";
import { FaSave, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { withAuth } from "@/contexts/AuthContext";

function EditSejarah() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    judulUtama: "Sejarah Desa Tababo Selatan",
    deskripsiHero: "Desa yang Kaya Akan Sejarah dan Budaya",
    asalUsul:
      "Desa Tababo Selatan memiliki sejarah panjang yang dimulai dari...",
    timeline: [
      { tahun: "1945", peristiwa: "Berdirinya Desa Tababo Selatan" },
      { tahun: "1960", peristiwa: "Pembangunan infrastruktur awal" },
      { tahun: "1980", peristiwa: "Pemekaran wilayah desa" },
      { tahun: "2000", peristiwa: "Modernisasi pemerintahan desa" },
      { tahun: "2020", peristiwa: "Desa mandiri dan sejahtera" },
    ],
    budaya: [
      {
        nama: "Upacara Adat",
        emoji: "🎭",
        deskripsi: "Deskripsi upacara adat...",
      },
      {
        nama: "Tarian Tradisional",
        emoji: "💃",
        deskripsi: "Deskripsi tarian...",
      },
      { nama: "Kuliner Khas", emoji: "🍲", deskripsi: "Deskripsi kuliner..." },
      {
        nama: "Kerajinan Lokal",
        emoji: "🎨",
        deskripsi: "Deskripsi kerajinan...",
      },
    ],
    tokohPenting: [
      { nama: "Tokoh 1", peran: "Pendiri Desa", periode: "1945-1960" },
      { nama: "Tokoh 2", peran: "Tokoh Pendidikan", periode: "1960-1980" },
    ],
  });

  // Load data on mount
  useEffect(() => {
    loadSejarahData();
  }, []);

  const loadSejarahData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/sejarah");
      const result = await response.json();

      if (result.success && result.data) {
        setFormData(result.data);
      }
    } catch (error) {
      console.error("Error loading sejarah data:", error);
      alert("Gagal memuat data sejarah");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Get token from localStorage
      const token = localStorage.getItem("token");

      const response = await fetch("/api/sejarah", {
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
      console.error("Error saving sejarah data:", error);
      alert("Gagal menyimpan data sejarah");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data sejarah...</p>
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
              Edit Sejarah Desa
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola sejarah dan budaya desa
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/sejarah"
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

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Informasi Utama
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Judul Halaman
              </label>
              <input
                type="text"
                value={formData.judulUtama}
                onChange={(e) =>
                  setFormData({ ...formData, judulUtama: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deskripsi Hero
              </label>
              <input
                type="text"
                value={formData.deskripsiHero}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsiHero: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Asal Usul Desa
              </label>
              <textarea
                value={formData.asalUsul}
                onChange={(e) =>
                  setFormData({ ...formData, asalUsul: e.target.value })
                }
                rows={5}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Timeline Sejarah
            </h2>
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  timeline: [
                    ...formData.timeline,
                    { tahun: "", peristiwa: "" },
                  ],
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <FaPlus /> Tambah
            </button>
          </div>
          <div className="space-y-4">
            {formData.timeline.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg"
              >
                <div className="flex-1 grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Tahun
                    </label>
                    <input
                      type="text"
                      value={item.tahun}
                      onChange={(e) => {
                        const newData = [...formData.timeline];
                        newData[index].tahun = e.target.value;
                        setFormData({ ...formData, timeline: newData });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Peristiwa
                    </label>
                    <input
                      type="text"
                      value={item.peristiwa}
                      onChange={(e) => {
                        const newData = [...formData.timeline];
                        newData[index].peristiwa = e.target.value;
                        setFormData({ ...formData, timeline: newData });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newData = formData.timeline.filter(
                      (_, i) => i !== index,
                    );
                    setFormData({ ...formData, timeline: newData });
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  title="Hapus timeline"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Budaya */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Budaya & Tradisi
            </h2>
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  budaya: [
                    ...formData.budaya,
                    { nama: "", emoji: "🎭", deskripsi: "" },
                  ],
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <FaPlus /> Tambah
            </button>
          </div>
          <div className="space-y-4">
            {formData.budaya.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg"
              >
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Emoji
                      </label>
                      <input
                        type="text"
                        value={item.emoji}
                        onChange={(e) => {
                          const newData = [...formData.budaya];
                          newData[index].emoji = e.target.value;
                          setFormData({ ...formData, budaya: newData });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm text-center text-2xl"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Nama Budaya
                      </label>
                      <input
                        type="text"
                        value={item.nama}
                        onChange={(e) => {
                          const newData = [...formData.budaya];
                          newData[index].nama = e.target.value;
                          setFormData({ ...formData, budaya: newData });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Deskripsi
                    </label>
                    <textarea
                      value={item.deskripsi}
                      onChange={(e) => {
                        const newData = [...formData.budaya];
                        newData[index].deskripsi = e.target.value;
                        setFormData({ ...formData, budaya: newData });
                      }}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm resize-none"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newData = formData.budaya.filter(
                      (_, i) => i !== index,
                    );
                    setFormData({ ...formData, budaya: newData });
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  title="Hapus budaya"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tokoh Penting */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Tokoh Penting</h2>
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  tokohPenting: [
                    ...formData.tokohPenting,
                    { nama: "", peran: "", periode: "" },
                  ],
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <FaPlus /> Tambah
            </button>
          </div>
          <div className="space-y-4">
            {formData.tokohPenting.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg"
              >
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={item.nama}
                      onChange={(e) => {
                        const newData = [...formData.tokohPenting];
                        newData[index].nama = e.target.value;
                        setFormData({ ...formData, tokohPenting: newData });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Peran
                    </label>
                    <input
                      type="text"
                      value={item.peran}
                      onChange={(e) => {
                        const newData = [...formData.tokohPenting];
                        newData[index].peran = e.target.value;
                        setFormData({ ...formData, tokohPenting: newData });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Periode
                    </label>
                    <input
                      type="text"
                      value={item.periode}
                      onChange={(e) => {
                        const newData = [...formData.tokohPenting];
                        newData[index].periode = e.target.value;
                        setFormData({ ...formData, tokohPenting: newData });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newData = formData.tokohPenting.filter(
                      (_, i) => i !== index,
                    );
                    setFormData({ ...formData, tokohPenting: newData });
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  title="Hapus tokoh penting"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(EditSejarah);
