"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import { apiClient, PerangkatData } from "@/lib/api-client";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { MdPeople } from "react-icons/md";

function PerangkatPage() {
  const { logout } = useAuth();
  const [perangkat, setPerangkat] = useState<PerangkatData[]>([]);
  const [loading, setLoading] = useState(true);
  const [jabatan, setJabatan] = useState("");
  const [sedangMenjabat, setSedangMenjabat] = useState<string>("");

  const loadPerangkat = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.getPerangkat({
        jabatan: jabatan || undefined,
        sedangMenjabat:
          sedangMenjabat === "" ? undefined : sedangMenjabat === "true",
      });

      if (response.success && response.data) {
        setPerangkat(response.data);
      }
    } catch {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  }, [jabatan, sedangMenjabat]);

  useEffect(() => {
    loadPerangkat();
  }, [loadPerangkat]);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data perangkat ini?")) return;

    try {
      await apiClient.deletePerangkat(id);
      loadPerangkat();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal menghapus data perangkat";
      alert("Gagal menghapus data: " + errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={logout} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <MdPeople className="text-teal-600" />
                Kelola Perangkat Desa
              </h1>
              <p className="text-gray-600 mt-1">
                Manage kepala desa dan perangkat desa
              </p>
            </div>
            <Link
              href="/admin/perangkat/create"
              className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
            >
              <FaPlus />
              Tambah Perangkat
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex gap-4 flex-wrap">
            <select
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 outline-none"
            >
              <option value="">Semua Jabatan</option>
              <option value="Kepala Desa">Kepala Desa</option>
              <option value="Sekretaris Desa">Sekretaris Desa</option>
              <option value="Kepala Urusan">Kepala Urusan</option>
              <option value="Kepala Dusun">Kepala Dusun</option>
              <option value="Staf">Staf</option>
            </select>
            <select
              value={sedangMenjabat}
              onChange={(e) => setSedangMenjabat(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 outline-none"
            >
              <option value="">Semua Status</option>
              <option value="true">Sedang Menjabat</option>
              <option value="false">Tidak Aktif</option>
            </select>
            <button
              onClick={() => {
                setJabatan("");
                setSedangMenjabat("");
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        </div>

        {/* Perangkat List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          ) : perangkat.length === 0 ? (
            <div className="p-12 text-center">
              <MdPeople className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Belum ada data perangkat</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {perangkat.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    {item.foto ? (
                      <img
                        src={item.foto}
                        alt={item.namaLengkap}
                        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-teal-100"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center mb-4 border-4 border-teal-200">
                        <MdPeople className="text-4xl text-teal-600" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {item.namaLengkap}
                    </h3>
                    <p className="text-sm font-semibold text-teal-600 mb-2">
                      {item.jabatan}
                    </p>
                    {item.nip && (
                      <p className="text-xs text-gray-500 mb-3">
                        NIP: {item.nip}
                      </p>
                    )}
                    {item.sedangMenjabat ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 mb-4">
                        Sedang Menjabat
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-4">
                        Tidak Aktif
                      </span>
                    )}
                    {item.periode && (
                      <p className="text-sm text-gray-600 mb-4">
                        Periode: {item.periode}
                      </p>
                    )}
                    <div className="flex gap-2 w-full">
                      <Link
                        href={`/admin/perangkat/edit/${item.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-semibold"
                      >
                        <FaEdit />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-semibold"
                      >
                        <FaTrash />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(PerangkatPage);
