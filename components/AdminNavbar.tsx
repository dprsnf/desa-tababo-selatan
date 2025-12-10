"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { GiVillage } from "react-icons/gi";

interface AdminNavbarProps {
  onLogout?: () => void;
}

export default function AdminNavbar({ onLogout }: AdminNavbarProps) {
  const pathname = usePathname();
  const isDashboard = pathname === "/admin/dashboard";

  return (
    <>
      {/* Admin Navigation - Simplified */}
      <nav className="bg-linear-to-r from-green-700 via-emerald-600 to-teal-700 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin/dashboard" className="flex items-center gap-3 text-white hover:text-green-100 transition-all">
              <Image
                src="/logo.png"
                alt="Logo Desa"
                width={48}
                height={48}
                className="object-contain"
              />
              <div className="hidden md:block">
                <div className="font-bold text-lg">Admin Panel</div>
                <div className="text-xs text-green-200">Desa Tababo Selatan</div>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              {!isDashboard && (
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                >
                  <FaArrowLeft />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
              )}
              
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all shadow-lg"
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
