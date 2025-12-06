"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import Link from "next/link";
import AdminNavbar from "@/components/AdminNavbar";

interface KaurItem {
  jabatan: string;
  nama: string;
}

interface KasiItem {
  jabatan: string;
  nama: string;
}

interface KepalaDusunItem {
  dusun: string;
  nama: string;
}

interface StrukturData {
  kepalaDesa: { nama: string; nip: string };
  sekretaris: { nama: string; nip: string };
  kaur: KaurItem[];
  kasi: KasiItem[];
  kepalaDusun: KepalaDusunItem[];
}

function EditStrukturOrganisasi() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState<StrukturData>({
    kepalaDesa: { nama: "", nip: "" },
    sekretaris: { nama: "", nip: "" },
    kaur: [],
    kasi: [],
    kepalaDusun: [],
  });

  // Load data on mount
  useEffect(() => {
    loadStrukturData();
  }, []);

  const loadStrukturData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/struktur-organisasi");
      const result = await response.json();

      if (result.success && result.data) {
        setFormData(result.data);
      }
    } catch (error) {
      console.error("Error loading struktur organisasi:", error);
      alert("Gagal memuat data struktur organisasi");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("adminToken");

      const response = await fetch("/api/struktur-organisasi", {
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
      console.error("Error saving struktur organisasi:", error);
      alert("Gagal menyimpan data struktur organisasi");
    } finally {
      setSaving(false);
    }
  };

  const addKaur = () => {
    setFormData({
      ...formData,
      kaur: [...formData.kaur, { jabatan: "", nama: "" }],
    });
  };

  const deleteKaur = (index: number) => {
    const newKaur = formData.kaur.filter((_, i) => i !== index);
    setFormData({ ...formData, kaur: newKaur });
  };

  const addKasi = () => {
    setFormData({
      ...formData,
      kasi: [...formData.kasi, { jabatan: "", nama: "" }],
    });
  };

  const deleteKasi = (index: number) => {
    const newKasi = formData.kasi.filter((_, i) => i !== index);
    setFormData({ ...formData, kasi: newKasi });
  };

  const addKepalaDusun = () => {
    setFormData({
      ...formData,
      kepalaDusun: [...formData.kepalaDusun, { dusun: "", nama: "" }],
    });
  };

  const deleteKepalaDusun = (index: number) => {
    const newDusun = formData.kepalaDusun.filter((_, i) => i !== index);
    setFormData({ ...formData, kepalaDusun: newDusun });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
        <AdminNavbar onLogout={handleLogout} />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data struktur organisasi...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={handleLogout} />
      <div className="p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Edit Struktur Organisasi
              </h1>
              <p className="text-gray-600 text-sm">
                Kelola struktur pemerintahan desa
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/struktur-organisasi"
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
          {/* Kepala Desa */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Kepala Desa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  value={formData.kepalaDesa.nama}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kepalaDesa: {
                        ...formData.kepalaDesa,
                        nama: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  NIP
                </label>
                <input
                  type="text"
                  value={formData.kepalaDesa.nip}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kepalaDesa: {
                        ...formData.kepalaDesa,
                        nip: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Sekretaris */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Sekretaris Desa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  value={formData.sekretaris.nama}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sekretaris: {
                        ...formData.sekretaris,
                        nama: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  NIP
                </label>
                <input
                  type="text"
                  value={formData.sekretaris.nip}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sekretaris: {
                        ...formData.sekretaris,
                        nip: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Kaur */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Kepala Urusan (Kaur)
              </h2>
              <button
                onClick={addKaur}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <FaPlus /> Tambah
              </button>
            </div>
            <div className="space-y-4">
              {formData.kaur.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Belum ada data Kaur. Klik &quot;Tambah&quot; untuk
                  menambahkan.
                </p>
              )}
              {formData.kaur.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg"
                >
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Jabatan
                      </label>
                      <input
                        type="text"
                        value={item.jabatan}
                        onChange={(e) => {
                          const newKaur = [...formData.kaur];
                          newKaur[index].jabatan = e.target.value;
                          setFormData({ ...formData, kaur: newKaur });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none"
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
                          const newKaur = [...formData.kaur];
                          newKaur[index].nama = e.target.value;
                          setFormData({ ...formData, kaur: newKaur });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => deleteKaur(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    title="Hapus"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Kasi */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Kepala Seksi (Kasi)
              </h2>
              <button
                onClick={addKasi}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <FaPlus /> Tambah
              </button>
            </div>
            <div className="space-y-4">
              {formData.kasi.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Belum ada data Kasi. Klik &quot;Tambah&quot; untuk
                  menambahkan.
                </p>
              )}
              {formData.kasi.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg"
                >
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Jabatan
                      </label>
                      <input
                        type="text"
                        value={item.jabatan}
                        onChange={(e) => {
                          const newKasi = [...formData.kasi];
                          newKasi[index].jabatan = e.target.value;
                          setFormData({ ...formData, kasi: newKasi });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none"
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
                          const newKasi = [...formData.kasi];
                          newKasi[index].nama = e.target.value;
                          setFormData({ ...formData, kasi: newKasi });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => deleteKasi(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    title="Hapus"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Kepala Dusun */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Kepala Dusun</h2>
              <button
                onClick={addKepalaDusun}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <FaPlus /> Tambah
              </button>
            </div>
            <div className="space-y-4">
              {formData.kepalaDusun.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Belum ada data Kepala Dusun. Klik &quot;Tambah&quot; untuk
                  menambahkan.
                </p>
              )}
              {formData.kepalaDusun.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg"
                >
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Dusun
                      </label>
                      <input
                        type="text"
                        value={item.dusun}
                        onChange={(e) => {
                          const newDusun = [...formData.kepalaDusun];
                          newDusun[index].dusun = e.target.value;
                          setFormData({ ...formData, kepalaDusun: newDusun });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none"
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
                          const newDusun = [...formData.kepalaDusun];
                          newDusun[index].nama = e.target.value;
                          setFormData({ ...formData, kepalaDusun: newDusun });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => deleteKepalaDusun(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    title="Hapus"
                  >
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

export default EditStrukturOrganisasi;
