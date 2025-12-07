"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api-client";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaUser } from "react-icons/fa";
import { MdPeople } from "react-icons/md";

function CreatePerangkatPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    namaLengkap: "",
    jabatan: "Kepala Desa",
    nip: "",
    tempatLahir: "",
    tanggalLahir: "",
    pendidikan: "",
    foto: "",
    periode: "",
    tahunMulai: "",
    tahunSelesai: "",
    visi: "",
    misi: "",
    prestasi: "",
    programUnggulan: "",
    namaDusun: "",
    sedangMenjabat: true,
    urutan: "0",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        namaLengkap: formData.namaLengkap,
        jabatan: formData.jabatan,
        nip: formData.nip || undefined,
        tempatLahir: formData.tempatLahir || undefined,
        tanggalLahir: formData.tanggalLahir || undefined,
        pendidikan: formData.pendidikan || undefined,
        foto: formData.foto || undefined,
        periode: formData.periode || undefined,
        tahunMulai: formData.tahunMulai ? parseInt(formData.tahunMulai) : undefined,
        tahunSelesai: formData.tahunSelesai ? parseInt(formData.tahunSelesai) : undefined,
        visi: formData.visi || undefined,
        misi: formData.misi ? formData.misi.split("\n").filter(m => m.trim()) : undefined,
        prestasi: formData.prestasi ? formData.prestasi.split("\n").filter(p => p.trim()) : undefined,
        programUnggulan: formData.programUnggulan ? formData.programUnggulan.split("\n").filter(p => p.trim()) : undefined,
        namaDusun: formData.namaDusun || undefined,
        sedangMenjabat: formData.sedangMenjabat,
        urutan: parseInt(formData.urutan),
      };

      await apiClient.createPerangkat(submitData);
      router.push("/admin/perangkat");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal menyimpan data perangkat";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={logout} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <MdPeople className="text-teal-600" />
                Tambah Perangkat Desa
              </h1>
              <p className="text-gray-600 mt-1">
                Tambah data kepala desa atau perangkat desa
              </p>
            </div>
            <Link
              href="/admin/perangkat"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft />
              Kembali
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Data Pribadi */}
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaUser className="text-teal-600" />
                Data Pribadi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.namaLengkap}
                    onChange={(e) =>
                      setFormData({ ...formData, namaLengkap: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jabatan <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.jabatan}
                    onChange={(e) =>
                      setFormData({ ...formData, jabatan: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    required
                  >
                    <option value="Kepala Desa">Kepala Desa</option>
                    <option value="Sekretaris Desa">Sekretaris Desa</option>
                    <option value="Kepala Urusan Umum">Kepala Urusan Umum</option>
                    <option value="Kepala Urusan Keuangan">Kepala Urusan Keuangan</option>
                    <option value="Kepala Urusan Perencanaan">Kepala Urusan Perencanaan</option>
                    <option value="Kepala Seksi Pemerintahan">Kepala Seksi Pemerintahan</option>
                    <option value="Kepala Seksi Kesejahteraan">Kepala Seksi Kesejahteraan</option>
                    <option value="Kepala Seksi Pelayanan">Kepala Seksi Pelayanan</option>
                    <option value="Kepala Dusun">Kepala Dusun</option>
                    <option value="Staf">Staf</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    NIP
                  </label>
                  <input
                    type="text"
                    value={formData.nip}
                    onChange={(e) =>
                      setFormData({ ...formData, nip: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="Nomor Induk Pegawai"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    value={formData.tempatLahir}
                    onChange={(e) =>
                      setFormData({ ...formData, tempatLahir: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="Kota tempat lahir"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={formData.tanggalLahir}
                    onChange={(e) =>
                      setFormData({ ...formData, tanggalLahir: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pendidikan Terakhir
                  </label>
                  <select
                    value={formData.pendidikan}
                    onChange={(e) =>
                      setFormData({ ...formData, pendidikan: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                  >
                    <option value="">Pilih Pendidikan</option>
                    <option value="SD">SD</option>
                    <option value="SMP">SMP</option>
                    <option value="SMA/SMK">SMA/SMK</option>
                    <option value="D3">D3</option>
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="S3">S3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Dusun
                  </label>
                  <input
                    type="text"
                    value={formData.namaDusun}
                    onChange={(e) =>
                      setFormData({ ...formData, namaDusun: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="Khusus untuk Kepala Dusun"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL Foto
                  </label>
                  <input
                    type="url"
                    value={formData.foto}
                    onChange={(e) =>
                      setFormData({ ...formData, foto: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="https://example.com/foto.jpg"
                  />
                  {formData.foto && (
                    <div className="mt-3 rounded-xl overflow-hidden border-2 border-gray-200 w-32 h-32">
                      <img
                        src={formData.foto}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3Ctext fill='%236b7280' font-family='Arial' font-size='14' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EGambar Error%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Data Jabatan */}
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Informasi Jabatan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Periode
                  </label>
                  <input
                    type="text"
                    value={formData.periode}
                    onChange={(e) =>
                      setFormData({ ...formData, periode: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="Contoh: 2020-2026"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Urutan Tampilan
                  </label>
                  <input
                    type="number"
                    value={formData.urutan}
                    onChange={(e) =>
                      setFormData({ ...formData, urutan: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="0"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Urutan tampilan di website (semakin kecil semakin atas)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tahun Mulai
                  </label>
                  <input
                    type="number"
                    value={formData.tahunMulai}
                    onChange={(e) =>
                      setFormData({ ...formData, tahunMulai: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="2020"
                    min="1900"
                    max="2100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tahun Selesai
                  </label>
                  <input
                    type="number"
                    value={formData.tahunSelesai}
                    onChange={(e) =>
                      setFormData({ ...formData, tahunSelesai: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="2026"
                    min="1900"
                    max="2100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.sedangMenjabat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sedangMenjabat: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-2 border-gray-300 text-teal-600 focus:ring-2 focus:ring-teal-200"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Sedang Menjabat
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Visi & Misi (Khusus Kepala Desa) */}
            {formData.jabatan === "Kepala Desa" && (
              <div className="border-2 border-teal-200 rounded-xl p-6 bg-teal-50">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Visi, Misi & Program (Khusus Kepala Desa)
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Visi
                    </label>
                    <textarea
                      value={formData.visi}
                      onChange={(e) =>
                        setFormData({ ...formData, visi: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none bg-white"
                      placeholder="Visi kepemimpinan..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Misi
                    </label>
                    <textarea
                      value={formData.misi}
                      onChange={(e) =>
                        setFormData({ ...formData, misi: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none bg-white"
                      placeholder="Pisahkan setiap misi dengan enter/baris baru"
                      rows={5}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Tulis setiap misi di baris terpisah
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Program Unggulan
                    </label>
                    <textarea
                      value={formData.programUnggulan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          programUnggulan: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none bg-white"
                      placeholder="Pisahkan setiap program dengan enter/baris baru"
                      rows={4}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Tulis setiap program di baris terpisah
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prestasi
                    </label>
                    <textarea
                      value={formData.prestasi}
                      onChange={(e) =>
                        setFormData({ ...formData, prestasi: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none bg-white"
                      placeholder="Pisahkan setiap prestasi dengan enter/baris baru"
                      rows={4}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Tulis setiap prestasi di baris terpisah
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="border-t-2 border-gray-200 pt-6">
              <div className="flex items-center justify-end gap-3">
                <Link
                  href="/admin/perangkat"
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl font-semibold ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <FaSave />
                      <span>Simpan Data</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withAuth(CreatePerangkatPage);
