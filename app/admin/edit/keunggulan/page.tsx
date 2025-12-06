"use client";

import { useState, useEffect } from "react";
import { FaSave, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { withAuth } from "@/contexts/AuthContext";

function EditKeunggulan() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    judulUtama: "Keunggulan Desa Tababo Selatan",
    deskripsiHero: "Desa yang Kaya Akan Potensi",
    pertanian: [
      { nama: "Padi", emoji: "🌾", deskripsi: "Lahan sawah produktif" },
      { nama: "Jagung", emoji: "🌽", deskripsi: "Komoditas unggulan" },
      { nama: "Kelapa", emoji: "🥥", deskripsi: "Perkebunan berkualitas" },
    ],
    peternakan: [
      { nama: "Sapi", emoji: "🐄" },
      { nama: "Kambing", emoji: "🐐" },
      { nama: "Ayam", emoji: "🐔" },
      { nama: "Bebek", emoji: "🦆" },
    ],
    umkm: [
      {
        nama: "Kerajinan Tangan",
        emoji: "🎨",
        deskripsi: "Deskripsi kerajinan...",
      },
      {
        nama: "Produk Olahan Pangan",
        emoji: "🍱",
        deskripsi: "Deskripsi produk...",
      },
      {
        nama: "Jasa dan Perdagangan",
        emoji: "💼",
        deskripsi: "Deskripsi jasa...",
      },
      {
        nama: "Industri Rumahan",
        emoji: "🏭",
        deskripsi: "Deskripsi industri...",
      },
    ],
    wisata: [
      {
        nama: "Wisata Alam",
        emoji: "🌳",
        deskripsi: "Deskripsi wisata alam...",
      },
      {
        nama: "Wisata Budaya",
        emoji: "🏛️",
        deskripsi: "Deskripsi wisata budaya...",
      },
      {
        nama: "Wisata Desa",
        emoji: "🏘️",
        deskripsi: "Deskripsi wisata desa...",
      },
      {
        nama: "Wisata Perikanan",
        emoji: "🎣",
        deskripsi: "Deskripsi wisata perikanan...",
      },
    ],
    sdm: {
      jumlahPenduduk: "2,500+",
      usiaProduktif: "85%",
      kelompokUsaha: "50+",
    },
    infrastruktur: [
      { nama: "Jalan Desa", emoji: "🛣️" },
      { nama: "Listrik", emoji: "💡" },
      { nama: "Air Bersih", emoji: "💧" },
      { nama: "Internet", emoji: "📡" },
      { nama: "Kesehatan", emoji: "🏥" },
      { nama: "Pendidikan", emoji: "🏫" },
      { nama: "Ibadah", emoji: "🕌" },
      { nama: "Kantor Desa", emoji: "🏢" },
    ],
  });

  // Load data on mount
  useEffect(() => {
    loadKeunggulanData();
  }, []);

  const loadKeunggulanData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/keunggulan");
      const result = await response.json();

      if (result.success && result.data) {
        setFormData(result.data);
      }
    } catch (error) {
      console.error("Error loading keunggulan data:", error);
      alert("Gagal memuat data keunggulan");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Get token from localStorage
      const token = localStorage.getItem("token");

      const response = await fetch("/api/keunggulan", {
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
      console.error("Error saving keunggulan data:", error);
      alert("Gagal menyimpan data keunggulan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data keunggulan...</p>
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
              Edit Keunggulan Desa
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola potensi dan keunggulan desa
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/keunggulan"
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
        {/* Info Utama */}
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
                Deskripsi
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
          </div>
        </div>

        {/* Pertanian */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Pertanian & Perkebunan
            </h2>
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  pertanian: [
                    ...formData.pertanian,
                    { nama: "", emoji: "🌾", deskripsi: "" },
                  ],
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <FaPlus /> Tambah
            </button>
          </div>
          <div className="space-y-4">
            {formData.pertanian.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg"
              >
                <div className="flex-1 grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Emoji
                    </label>
                    <input
                      type="text"
                      value={item.emoji}
                      onChange={(e) => {
                        const newData = [...formData.pertanian];
                        newData[index].emoji = e.target.value;
                        setFormData({ ...formData, pertanian: newData });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-2xl text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={item.nama}
                      onChange={(e) => {
                        const newData = [...formData.pertanian];
                        newData[index].nama = e.target.value;
                        setFormData({ ...formData, pertanian: newData });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Deskripsi
                    </label>
                    <input
                      type="text"
                      value={item.deskripsi}
                      onChange={(e) => {
                        const newData = [...formData.pertanian];
                        newData[index].deskripsi = e.target.value;
                        setFormData({ ...formData, pertanian: newData });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newData = formData.pertanian.filter(
                      (_, i) => i !== index,
                    );
                    setFormData({ ...formData, pertanian: newData });
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  title="Hapus pertanian"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Peternakan */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Peternakan</h2>
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  peternakan: [
                    ...formData.peternakan,
                    { nama: "", emoji: "🐄" },
                  ],
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <FaPlus /> Tambah
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.peternakan.map((item, index) => (
              <div
                key={index}
                className="border-2 border-gray-100 rounded-lg p-4 text-center relative group"
              >
                <button
                  onClick={() => {
                    const newData = formData.peternakan.filter(
                      (_, i) => i !== index,
                    );
                    setFormData({ ...formData, peternakan: newData });
                  }}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Hapus peternakan"
                >
                  <FaTrash className="text-sm" />
                </button>
                <input
                  type="text"
                  value={item.emoji}
                  onChange={(e) => {
                    const newData = [...formData.peternakan];
                    newData[index].emoji = e.target.value;
                    setFormData({ ...formData, peternakan: newData });
                  }}
                  className="w-full text-4xl text-center mb-2 outline-none"
                />
                <input
                  type="text"
                  value={item.nama}
                  onChange={(e) => {
                    const newData = [...formData.peternakan];
                    newData[index].nama = e.target.value;
                    setFormData({ ...formData, peternakan: newData });
                  }}
                  className="w-full text-sm text-center border-b border-gray-200 outline-none focus:border-green-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* UMKM */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              UMKM & Produk Lokal
            </h2>
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  umkm: [
                    ...formData.umkm,
                    { nama: "", emoji: "🎨", deskripsi: "" },
                  ],
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <FaPlus /> Tambah
            </button>
          </div>
          <div className="space-y-4">
            {formData.umkm.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg"
              >
                <div className="flex-1 grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Emoji
                    </label>
                    <input
                      type="text"
                      value={item.emoji}
                      onChange={(e) => {
                        const newData = [...formData.umkm];
                        newData[index].emoji = e.target.value;
                        setFormData({ ...formData, umkm: newData });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-2xl text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={item.nama}
                      onChange={(e) => {
                        const newData = [...formData.umkm];
                        newData[index].nama = e.target.value;
                        setFormData({ ...formData, umkm: newData });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Deskripsi
                    </label>
                    <input
                      type="text"
                      value={item.deskripsi}
                      onChange={(e) => {
                        const newData = [...formData.umkm];
                        newData[index].deskripsi = e.target.value;
                        setFormData({ ...formData, umkm: newData });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newData = formData.umkm.filter((_, i) => i !== index);
                    setFormData({ ...formData, umkm: newData });
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  title="Hapus UMKM"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Wisata */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Wisata</h2>
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  wisata: [
                    ...formData.wisata,
                    { nama: "", emoji: "🌳", deskripsi: "" },
                  ],
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <FaPlus /> Tambah
            </button>
          </div>
          <div className="space-y-4">
            {formData.wisata.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg"
              >
                <div className="flex-1 grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Emoji
                    </label>
                    <input
                      type="text"
                      value={item.emoji}
                      onChange={(e) => {
                        const newData = [...formData.wisata];
                        newData[index].emoji = e.target.value;
                        setFormData({ ...formData, wisata: newData });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-2xl text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={item.nama}
                      onChange={(e) => {
                        const newData = [...formData.wisata];
                        newData[index].nama = e.target.value;
                        setFormData({ ...formData, wisata: newData });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Deskripsi
                    </label>
                    <input
                      type="text"
                      value={item.deskripsi}
                      onChange={(e) => {
                        const newData = [...formData.wisata];
                        newData[index].deskripsi = e.target.value;
                        setFormData({ ...formData, wisata: newData });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newData = formData.wisata.filter(
                      (_, i) => i !== index,
                    );
                    setFormData({ ...formData, wisata: newData });
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  title="Hapus wisata"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SDM */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Sumber Daya Manusia
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jumlah Penduduk
              </label>
              <input
                type="text"
                value={formData.sdm.jumlahPenduduk}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sdm: { ...formData.sdm, jumlahPenduduk: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Usia Produktif
              </label>
              <input
                type="text"
                value={formData.sdm.usiaProduktif}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sdm: { ...formData.sdm, usiaProduktif: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kelompok Usaha
              </label>
              <input
                type="text"
                value={formData.sdm.kelompokUsaha}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sdm: { ...formData.sdm, kelompokUsaha: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Infrastruktur */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Infrastruktur</h2>
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  infrastruktur: [
                    ...formData.infrastruktur,
                    { nama: "", emoji: "🏢" },
                  ],
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <FaPlus /> Tambah
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.infrastruktur.map((item, index) => (
              <div
                key={index}
                className="border-2 border-gray-100 rounded-lg p-4 text-center relative group"
              >
                <button
                  onClick={() => {
                    const newData = formData.infrastruktur.filter(
                      (_, i) => i !== index,
                    );
                    setFormData({ ...formData, infrastruktur: newData });
                  }}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Hapus infrastruktur"
                >
                  <FaTrash className="text-sm" />
                </button>
                <input
                  type="text"
                  value={item.emoji}
                  onChange={(e) => {
                    const newData = [...formData.infrastruktur];
                    newData[index].emoji = e.target.value;
                    setFormData({ ...formData, infrastruktur: newData });
                  }}
                  className="w-full text-4xl text-center mb-2 outline-none"
                />
                <input
                  type="text"
                  value={item.nama}
                  onChange={(e) => {
                    const newData = [...formData.infrastruktur];
                    newData[index].nama = e.target.value;
                    setFormData({ ...formData, infrastruktur: newData });
                  }}
                  className="w-full text-sm text-center border-b border-gray-200 outline-none focus:border-green-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(EditKeunggulan);
