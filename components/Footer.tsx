"use client";

import Link from "next/link";
import { GiVillage } from "react-icons/gi";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { MdArrowUpward } from "react-icons/md";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { href: "/", label: "Beranda" },
    { href: "/struktur-organisasi", label: "Struktur Organisasi" },
    { href: "/berita", label: "Berita" },
    { href: "/layanan", label: "Layanan" },
    { href: "/pertanggungjawaban", label: "Pertanggungjawaban" },
    { href: "/sejarah", label: "Sejarah Desa" },
    { href: "/keunggulan", label: "Keunggulan" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <footer className="relative bg-linear-to-br from-green-900 via-emerald-800 to-teal-900 text-white">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-green-400 via-emerald-400 to-teal-400"></div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400/30 rounded-full blur-xl"></div>
                <GiVillage className="text-5xl text-green-300 relative z-10" />
              </div>
              <div>
                <h3 className="font-bold text-xl tracking-tight">Desa Tababo Selatan</h3>
                <p className="text-sm text-green-300 font-medium">Hijau, Sejahtera, Mandiri</p>
              </div>
            </div>
            <p className="text-green-100 text-sm leading-relaxed mb-6">
              Desa yang kaya akan potensi alam dan sumber daya manusia yang produktif untuk kemajuan bersama menuju masa depan yang lebih baik.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="group w-10 h-10 bg-green-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:rotate-6"
                aria-label="Facebook"
              >
                <FaFacebook className="text-lg group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="group w-10 h-10 bg-green-700 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:rotate-6"
                aria-label="Instagram"
              >
                <FaInstagram className="text-lg group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="group w-10 h-10 bg-green-700 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:rotate-6"
                aria-label="YouTube"
              >
                <FaYoutube className="text-lg group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="group w-10 h-10 bg-green-700 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:rotate-6"
                aria-label="Twitter"
              >
                <FaTwitter className="text-lg group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-green-400 rounded-full"></div>
              Link Cepat
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-100 hover:text-white text-sm flex items-center gap-2 group transition-all hover:translate-x-2"
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:w-3 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-green-400 rounded-full"></div>
              Kontak Kami
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-600 transition-colors">
                  <FaMapMarkerAlt className="text-green-300" />
                </div>
                <span className="text-green-100 leading-relaxed">
                  Kecamatan [Nama Kecamatan],<br />Kabupaten [Nama Kabupaten]
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-600 transition-colors">
                  <FaPhone className="text-green-300" />
                </div>
                <a href="tel:+62" className="text-green-100 hover:text-white transition-colors">
                  +62 XXX-XXXX-XXXX
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-600 transition-colors">
                  <FaEnvelope className="text-green-300" />
                </div>
                <a href="mailto:desa@tababo-selatan.id" className="text-green-100 hover:text-white transition-colors">
                  desa@tababo-selatan.id
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-600 transition-colors">
                  <FaWhatsapp className="text-green-300" />
                </div>
                <a href="https://wa.me/62" className="text-green-100 hover:text-white transition-colors">
                  WhatsApp Desa
                </a>
              </div>
            </div>
          </div>

          {/* Jam Pelayanan */}
          <div>
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-green-400 rounded-full"></div>
              Jam Pelayanan
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-green-800/50 rounded-lg p-4 border border-green-700">
                <p className="text-green-300 font-semibold mb-2">Hari Kerja</p>
                <p className="text-green-100">Senin - Jumat</p>
                <p className="text-white font-bold">08:00 - 16:00 WIB</p>
              </div>
              <div className="bg-green-800/50 rounded-lg p-4 border border-green-700">
                <p className="text-green-300 font-semibold mb-2">Weekend</p>
                <p className="text-green-100">Sabtu - Minggu</p>
                <p className="text-white font-bold">Tutup</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-green-200 text-sm text-center md:text-left">
            © {new Date().getFullYear()} <span className="font-semibold">Desa Tababo Selatan</span>. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-6 py-2.5 bg-green-700 hover:bg-green-600 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            aria-label="Scroll to top"
          >
            <span>Kembali ke Atas</span>
            <MdArrowUpward className="text-lg group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
