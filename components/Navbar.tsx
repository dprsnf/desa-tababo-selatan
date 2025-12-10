"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { GiVillage } from "react-icons/gi";
import { FaBars, FaTimes, FaQuestionCircle, FaNewspaper } from "react-icons/fa";
import { MdDashboard, MdAccountBalance, MdHistory, MdStars, MdMiscellaneousServices } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { 
      href: "/", 
      label: "Beranda",
      icon: <MdDashboard className="text-xl" />
    },
    { 
      href: "/struktur-organisasi", 
      label: "Struktur Organisasi",
      icon: <FaUsers className="text-xl" />
    },
    { 
      href: "/berita", 
      label: "Berita",
      icon: <FaNewspaper className="text-xl" />
    },
    { 
      href: "/layanan", 
      label: "Layanan",
      icon: <MdMiscellaneousServices className="text-xl" />
    },
    { 
      href: "/pertanggungjawaban", 
      label: "Pertanggungjawaban",
      icon: <MdAccountBalance className="text-xl" />
    },
    { 
      href: "/sejarah", 
      label: "Sejarah",
      icon: <MdHistory className="text-xl" />
    },
    { 
      href: "/keunggulan", 
      label: "Keunggulan",
      icon: <MdStars className="text-xl" />
    },
    { 
      href: "/faq", 
      label: "FAQ",
      icon: <FaQuestionCircle className="text-xl" />
    },
  ];

  return (
    <nav 
      className={`bg-linear-to-r from-green-700 via-emerald-600 to-teal-700 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-2xl backdrop-blur-sm bg-opacity-95" : "shadow-lg"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 text-white hover:text-green-100 transition-all duration-300 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-lg group-hover:bg-white/30 transition-all"></div>
              <Image
                src="/logo.png"
                alt="Logo Desa"
                width={60}
                height={60}
                className="relative z-10 transform group-hover:scale-110 transition-transform object-contain"
              />
            </div>
            <div>
              <div className="font-bold text-xl tracking-tight">Desa Tababo Selatan</div>
              <div className="text-xs text-green-100 font-medium">Hijau, Sejahtera, Mandiri</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden 2xl:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "bg-white text-green-700 shadow-lg shadow-green-900/30 scale-105"
                      : "text-white hover:bg-white/10 hover:shadow-md"
                  }`}
                >
                  <span className={`${isActive ? "text-green-600" : "text-green-200 group-hover:text-white"} transition-colors`}>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-green-600 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="2xl:hidden text-white text-2xl p-3 hover:bg-white/10 rounded-xl transition-all duration-300 active:scale-95"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`2xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2 pt-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-white text-green-700 shadow-lg transform scale-105"
                      : "text-white hover:bg-white/10 hover:translate-x-2"
                  }`}
                >
                  <span className={`text-xl ${isActive ? "text-green-600" : "text-green-200"}`}>
                    {link.icon}
                  </span>
                  <span className="flex-1">{link.label}</span>
                  {isActive && (
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
