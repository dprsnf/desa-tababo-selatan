"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaLeaf, FaUsers, FaChartLine, FaNewspaper, FaBuilding } from "react-icons/fa";
import { GiVillage, GiFarmer } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import StatCard from "@/components/StatCard";
import FeatureCard from "@/components/FeatureCard";
import NewsCard from "@/components/NewsCard";
import SectionTitle from "@/components/SectionTitle";

export default function Home() {
  const features = [
    {
      icon: <GiVillage className="text-5xl" />,
      title: "Struktur Organisasi",
      description: "Pemerintahan desa yang transparan dan akuntabel",
      link: "/struktur-organisasi",
      color: "from-emerald-500 to-green-600"
    },
    {
      icon: <FaChartLine className="text-5xl" />,
      title: "Pertanggungjawaban",
      description: "Laporan keuangan dan program desa",
      link: "/pertanggungjawaban",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: <FaUsers className="text-5xl" />,
      title: "Kepala Desa Sebelumnya",
      description: "Sejarah kepemimpinan desa",
      link: "/kepala-desa-sebelumnya",
      color: "from-teal-500 to-cyan-600"
    },
    {
      icon: <FaNewspaper className="text-5xl" />,
      title: "Sejarah Desa",
      description: "Perjalanan dan perkembangan desa",
      link: "/sejarah",
      color: "from-lime-500 to-green-600"
    },
    {
      icon: <FaLeaf className="text-5xl" />,
      title: "Keunggulan Desa",
      description: "Potensi dan keunggulan lokal",
      link: "/keunggulan",
      color: "from-green-600 to-emerald-700"
    },
  ];

  const stats = [
    { label: "Jumlah Penduduk", value: "2,500+", icon: <FaUsers /> },
    { label: "Luas Wilayah", value: "450 Ha", icon: <MdLocationOn /> },
    { label: "Dusun", value: "4", icon: <GiVillage /> },
    { label: "UMKM Aktif", value: "50+", icon: <FaBuilding /> }
  ];

  const news = [
    {
      title: "Program Pembangunan Infrastruktur 2024",
      date: "15 November 2024",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
    },
    {
      title: "Pelatihan UMKM Desa Sukses Digelar",
      date: "10 November 2024",
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80"
    },
    {
      title: "Panen Raya Padi Tahun Ini Meningkat",
      date: "5 November 2024",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-800 via-emerald-700 to-teal-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZWMjRoNnYtem0wIDZoLTZWMzBoNnYxOHptNiAwaDZ2LTZoLTZ2Nm0wLTEyaDZ2LTZoLTZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <GiVillage className="text-8xl mx-auto text-green-200" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Desa Tababo Selatan
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-4 text-green-100"
            >
              Desa Hijau, Sejahtera, dan Mandiri
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl mb-8 text-green-200 max-w-3xl mx-auto"
            >
              <MdLocationOn className="inline text-2xl mb-1" /> Kecamatan [Nama Kecamatan], Kabupaten [Nama Kabupaten]
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-4 justify-center flex-wrap"
            >
              <Link
                href="/struktur-organisasi"
                className="bg-white text-green-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Profil Desa
              </Link>
              <Link
                href="/keunggulan"
                className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg border-2 border-white"
              >
                Keunggulan Desa
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Simplified decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <FaLeaf className="absolute top-20 left-10 text-6xl text-green-300 animate-pulse" />
          <FaLeaf className="absolute bottom-20 right-10 text-5xl text-green-300 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <StatCard icon={stat.icon} value={stat.value} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionTitle>Informasi Desa</SectionTitle>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  link={feature.link}
                  color={feature.color}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Carousel Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionTitle>Berita & Kegiatan Terkini</SectionTitle>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {news.map((item, index) => (
              <SwiperSlide key={index}>
                <NewsCard title={item.title} date={item.date} image={item.image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZWMjRoNnYtem0wIDZoLTZWMzBoNnYxOHptNiAwaDZ2LTZoLTZ2Nm0wLTEyaDZ2LTZoLTZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GiFarmer className="text-7xl mx-auto mb-6 text-green-200" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Mari Bersama Membangun Desa
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Bergabunglah dalam program pembangunan desa untuk masa depan yang lebih baik
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/pertanggungjawaban"
                className="bg-white text-green-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Lihat Program Desa
              </Link>
              <a
                href="#"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-700 transition-all transform hover:scale-105"
              >
                Hubungi Kami
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
