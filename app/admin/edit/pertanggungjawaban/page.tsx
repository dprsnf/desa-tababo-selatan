"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import Link from "next/link";
import AdminNavbar from "@/components/AdminNavbar";

interface RealisasiItem {
  bidang: string;
  anggaran: string;
  realisasi: string;
}

interface ProgramItem {
  nama: string;
  status: string;
  dana: string;
}

interface PertanggungjawabanData {
  apbdes: {
    tahun: string;
    pendapatan: string;
    belanja: string;
    surplus: string;
  };
  realisasi: RealisasiItem[];
  program: ProgramItem[];
}

function EditPertanggungjawaban() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState<PertanggungjawabanData>({
    apbdes: {
      tahun: "",
      pendapatan: "",
      belanja: "",
      surplus: "",
    },
    realisasi: [],
    program: [],
  });

  // Load data on mount
  useEffect(() => {
    loadPertanggungjawabanData();
  }, []);

  const loadPertanggungjawabanData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/pertanggungjawaban-page");
      const result = await response.json();

      if (result.success && result.data) {
        setFormData(result.data);
      }
    } catch (error) {
      console.error("Error loading pertanggungjawaban:", error);
      alert("Gagal memuat data pertanggungjawaban");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("adminToken");

      const response = await fetch("/api/pertanggungjawaban-page", {
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
      console.error("Error saving pertanggungjawaban:", error);
      alert("Gagal menyimpan data pertanggungjawaban");
    } finally {
      setSaving(false);
    }
  };

  const addRealisasi = () => {
    setFormData({
      ...formData,
      realisasi: [
        ...formData.realisasi,
        { bidang: "", anggaran: "", realisasi: "" },
      ],
    });
  };

  const deleteRealisasi = (index: number) => {
    const newRealisasi = formData.realisasi.filter((_, i) => i !== index);
    setFormData({ ...formData, realisasi: newRealisasi });
  };

  const addProgram = () => {
    setFormData({
      ...formData,
      program: [
        ...formData.program,
        { nama: "", status: "Berjalan", dana: "" },
      ],
    });
  };

  const deleteProgram = (index: number) => {
    const newProgram = formData.program.filter((_, i) => i !== index);
    setFormData({ ...formData, program: newProgram });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
        <AdminNavbar onLogout={handleLogout} />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data pertanggungjawaban...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={handleLogout} />
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Edit Pertanggungjawaban
              </h1>
              <p className="text-gray-600 text-sm">
                Kelola laporan keuangan dan program desa
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/pertanggungjawaban"
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
          {/* APBDes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">APBDes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tahun Anggaran
                </label>
                <input
                  type="text"
                  value={formData.apbdes.tahun}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      apbdes: { ...formData.apbdes, tahun: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Pendapatan
                </label>
                <input
                  type="text"
                  value={formData.apbdes.pendapatan}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      apbdes: {
                        ...formData.apbdes,
                        pendapatan: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Belanja
                </label>
                <input
                  type="text"
                  value={formData.apbdes.belanja}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      apbdes: { ...formData.apbdes, belanja: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Surplus/Defisit
                </label>
                <input
                  type="text"
                  value={formData.apbdes.surplus}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      apbdes: { ...formData.apbdes, surplus: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Realisasi */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Realisasi Anggaran
              </h2>
              <button
                onClick={addRealisasi}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <FaPlus /> Tambah
              </button>
            </div>
            <div className="space-y-4">
              {formData.realisasi.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Belum ada data realisasi. Klik &quot;Tambah&quot; untuk
                  menambahkan.
                </p>
              )}
              {formData.realisasi.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg"
                >
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Bidang
                      </label>
                      <input
                        type="text"
                        value={item.bidang}
                        onChange={(e) => {
                          const newData = [...formData.realisasi];
                          newData[index].bidang = e.target.value;
                          setFormData({ ...formData, realisasi: newData });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Anggaran
                      </label>
                      <input
                        type="text"
                        value={item.anggaran}
                        onChange={(e) => {
                          const newData = [...formData.realisasi];
                          newData[index].anggaran = e.target.value;
                          setFormData({ ...formData, realisasi: newData });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Realisasi
                      </label>
                      <input
                        type="text"
                        value={item.realisasi}
                        onChange={(e) => {
                          const newData = [...formData.realisasi];
                          newData[index].realisasi = e.target.value;
                          setFormData({ ...formData, realisasi: newData });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => deleteRealisasi(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    title="Hapus"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Program */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Program & Kegiatan
              </h2>
              <button
                onClick={addProgram}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <FaPlus /> Tambah
              </button>
            </div>
            <div className="space-y-4">
              {formData.program.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Belum ada data program. Klik &quot;Tambah&quot; untuk
                  menambahkan.
                </p>
              )}
              {formData.program.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg"
                >
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Nama Program
                      </label>
                      <input
                        type="text"
                        value={item.nama}
                        onChange={(e) => {
                          const newData = [...formData.program];
                          newData[index].nama = e.target.value;
                          setFormData({ ...formData, program: newData });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Status
                      </label>
                      <select
                        value={item.status}
                        onChange={(e) => {
                          const newData = [...formData.program];
                          newData[index].status = e.target.value;
                          setFormData({ ...formData, program: newData });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm"
                      >
                        <option>Berjalan</option>
                        <option>Selesai</option>
                        <option>Direncanakan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Dana
                      </label>
                      <input
                        type="text"
                        value={item.dana}
                        onChange={(e) => {
                          const newData = [...formData.program];
                          newData[index].dana = e.target.value;
                          setFormData({ ...formData, program: newData });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => deleteProgram(index)}
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

export default EditPertanggungjawaban;
