"use client";

import { useEffect, useState } from "react";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import AdminNavbar from "@/components/AdminNavbar";
import { apiClient } from "@/lib/api-client";
import {
  FaHome,
  FaUsers,
  FaChartLine,
  FaUserTie,
  FaHistory,
  FaStar,
  FaEdit,
  FaNewspaper,
  FaClipboardList,
} from "react-icons/fa";
import { MdDashboard, MdSettings } from "react-icons/md";

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalBerita: 0,
    totalProgram: 0,
    totalPengunjung: 0,
    lastUpdate: "Loading...",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Load real statistics from API
      const beritaResponse = await apiClient.getBerita({ limit: 1 });
      const statistikResponse = await apiClient.getStatistik();

      setStats({
        totalBerita: beritaResponse.pagination?.total || 0,
        totalProgram: 0, // Add program API call here
        totalPengunjung: statistikResponse.data?.jumlahPenduduk || 0,
        lastUpdate: new Date().toLocaleDateString("id-ID"),
      });
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: "Berita & Pengumuman",
      icon: <FaNewspaper />,
      href: "/admin/berita",
      desc: "Kelola berita dan pengumuman desa",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Program & Kegiatan",
      icon: <FaClipboardList />,
      href: "/admin/program",
      desc: "Manage program dan kegiatan desa",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Struktur Organisasi",
      icon: <FaUsers />,
      href: "/admin/kepala-desa",
      desc: "Kelola data perangkat desa",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Pertanggungjawaban",
      icon: <FaChartLine />,
      href: "/admin/pertanggungjawaban",
      desc: "Laporan dan anggaran desa",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Layanan Desa",
      icon: <FaClipboardList />,
      href: "/admin/layanan",
      desc: "Kelola layanan administrasi",
      color: "from-teal-500 to-green-500",
    },
    {
      title: "Pengaturan",
      icon: <MdSettings />,
      href: "/admin/pengaturan",
      desc: "Pengaturan website dan statistik",
      color: "from-gray-500 to-slate-500",
    },
  ];

  const statsData = [
    {
      label: "Total Berita",
      value: stats.totalBerita.toString(),
      color: "bg-blue-500",
    },
    {
      label: "Total Penduduk",
      value: stats.totalPengunjung.toString(),
      color: "bg-green-500",
    },
    {
      label: "Terakhir Update",
      value: stats.lastUpdate,
      color: "bg-purple-500",
    },
    { label: "Admin Aktif", value: "1", color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={logout} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Selamat Datang, {user?.namaLengkap}! 👋
              </h2>
              <p className="text-green-100">
                Kelola konten website desa dengan mudah dari dashboard ini
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {user?.role}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {user?.email}
                </span>
              </div>
            </div>
            <MdDashboard className="text-8xl text-white/20 hidden lg:block" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-3`}
              >
                <MdDashboard className="text-2xl text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {loading ? "..." : stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Menu Utama</h3>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg shadow-md text-gray-700 font-medium transition-all hover:scale-105"
            >
              <FaHome />
              Lihat Website
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                <div className="p-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 text-white text-3xl group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                  <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                    <FaEdit />
                    <span>Kelola</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard);
