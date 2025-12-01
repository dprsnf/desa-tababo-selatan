"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminNavbar from "@/components/AdminNavbar";
import { 
  FaHome, 
  FaUsers, 
  FaChartLine, 
  FaUserTie, 
  FaHistory, 
  FaStar, 
  FaEdit, 
  FaSignOutAlt,
  FaBell,
  FaSearch
} from "react-icons/fa";
import { MdDashboard, MdSettings } from "react-icons/md";
import { GiVillage } from "react-icons/gi";

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  if (!mounted) {
    return null;
  }

  const menuItems = [
    { 
      title: "Beranda", 
      icon: <FaHome />, 
      href: "/admin/edit/beranda",
      desc: "Edit konten halaman utama",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      title: "Struktur Organisasi", 
      icon: <FaUsers />, 
      href: "/admin/edit/struktur-organisasi",
      desc: "Kelola struktur pemerintahan",
      color: "from-green-500 to-emerald-500"
    },
    { 
      title: "Pertanggungjawaban", 
      icon: <FaChartLine />, 
      href: "/admin/edit/pertanggungjawaban",
      desc: "Update laporan dan anggaran",
      color: "from-purple-500 to-pink-500"
    },
    { 
      title: "Kepala Desa", 
      icon: <FaUserTie />, 
      href: "/admin/edit/kepala-desa",
      desc: "Data kepala desa sebelumnya",
      color: "from-orange-500 to-red-500"
    },
    { 
      title: "Sejarah", 
      icon: <FaHistory />, 
      href: "/admin/edit/sejarah",
      desc: "Edit sejarah dan budaya desa",
      color: "from-amber-500 to-yellow-500"
    },
    { 
      title: "Keunggulan", 
      icon: <FaStar />, 
      href: "/admin/edit/keunggulan",
      desc: "Kelola potensi dan keunggulan",
      color: "from-teal-500 to-green-500"
    },
  ];

  const stats = [
    { label: "Total Halaman", value: "6", color: "bg-blue-500" },
    { label: "Terakhir Update", value: "Hari ini", color: "bg-green-500" },
    { label: "Total Pengunjung", value: "1,234", color: "bg-purple-500" },
    { label: "Data Entry", value: "45", color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Selamat Datang, Admin! 👋</h2>
              <p className="text-green-100">Kelola konten website desa dengan mudah dari dashboard ini</p>
            </div>
            <MdDashboard className="text-8xl text-white/20 hidden lg:block" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                <MdDashboard className="text-2xl text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Kelola Halaman</h3>
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
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 text-white text-3xl group-hover:scale-110 transition-transform shadow-lg`}>
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                  <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                    <FaEdit />
                    <span>Edit Halaman</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MdSettings className="text-green-600" />
            Pengaturan Cepat
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left">
              <div className="font-semibold text-gray-800 mb-1">Pengaturan Umum</div>
              <div className="text-sm text-gray-600">Nama desa, logo, kontak</div>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left">
              <div className="font-semibold text-gray-800 mb-1">Kelola Berita</div>
              <div className="text-sm text-gray-600">Tambah & edit berita desa</div>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left">
              <div className="font-semibold text-gray-800 mb-1">Galeri Foto</div>
              <div className="text-sm text-gray-600">Upload foto kegiatan</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
