"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUsers, FaChartLine, FaUserTie, FaHistory, FaStar, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { GiVillage } from "react-icons/gi";

interface AdminNavbarProps {
  onLogout?: () => void;
}

export default function AdminNavbar({ onLogout }: AdminNavbarProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard /> },
    { href: "/admin/edit/beranda", label: "Beranda", icon: <FaHome /> },
    { href: "/admin/edit/struktur-organisasi", label: "Struktur", icon: <FaUsers /> },
    { href: "/admin/edit/pertanggungjawaban", label: "Pertanggungjawaban", icon: <FaChartLine /> },
    { href: "/admin/edit/kepala-desa", label: "Kepala Desa", icon: <FaUserTie /> },
    { href: "/admin/edit/sejarah", label: "Sejarah", icon: <FaHistory /> },
    { href: "/admin/edit/keunggulan", label: "Keunggulan", icon: <FaStar /> },
  ];

  return (
    <>
      {/* Admin Navigation Only */}
      <nav className="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin/dashboard" className="flex items-center gap-3 text-white hover:text-green-100">
              <GiVillage className="text-4xl" />
              <div className="hidden md:block">
                <div className="font-bold text-lg">Admin Panel</div>
                <div className="text-xs text-green-200">Desa Tababo Selatan</div>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white text-green-700 shadow-md"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all ml-4"
              >
                <FaSignOutAlt />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
