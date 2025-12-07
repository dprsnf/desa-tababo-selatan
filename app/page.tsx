"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaUsers,
  FaChartLine,
  FaNewspaper,
  FaBuilding,
  FaQuestionCircle,
} from "react-icons/fa";
import { GiVillage, GiFarmer } from "react-icons/gi";
import { MdLocationOn, MdAccountBalance, MdHistory, MdStars } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import StatCard from "@/components/StatCard";
import FeatureCard from "@/components/FeatureCard";
import NewsCard from "@/components/NewsCard";
import SectionTitle from "@/components/SectionTitle";
import MapSection from "@/components/MapSection";

interface HeroData {
  judul: string;
  subjudul: string;
  deskripsi: string;
  gambar: string;
}

interface StatData {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface SliderData {
  id: string;
  judul: string;
  konten: string | null;
  gambar: string | null;
  link: string | null;
  tipe: string;
  dibuat: string;
}

interface Berita {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  gambarUtama: string | null;
  kategori: string;
  dibuat: string;
}

export default function Home() {
  const [hero, setHero] = useState<HeroData>({
    judul: "Desa Tababo Selatan",
    subjudul: "Desa Hijau, Sejahtera, dan Mandiri",
    deskripsi: "Kecamatan Belang, Kabupaten Minahasa Tenggara",
    gambar: "",
  });

  const [stats, setStats] = useState<StatData[]>([
    { label: "Jumlah Penduduk", value: "2,500+", icon: <FaUsers /> },
    { label: "Luas Wilayah", value: "450 Ha", icon: <MdLocationOn /> },
    { label: "Dusun", value: "4", icon: <GiVillage /> },
    { label: "UMKM Aktif", value: "50+", icon: <FaBuilding /> },
  ]);

  const [sliders, setSliders] = useState<SliderData[]>([]);
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch beranda data (hero + stats)
        const berandaRes = await fetch("/api/beranda");
        if (berandaRes.ok) {
          const berandaData = await berandaRes.json();
          if (berandaData.success && berandaData.data) {
            if (berandaData.data.hero) {
              setHero(berandaData.data.hero);
            }
            if (berandaData.data.stats) {
              // Add icons to stats
              const statsWithIcons = berandaData.data.stats.map(
                (stat: StatData) => {
                  let icon = <FaUsers />;
                  if (stat.label.toLowerCase().includes("luas")) {
                    icon = <MdLocationOn />;
                  } else if (stat.label.toLowerCase().includes("dusun")) {
                    icon = <GiVillage />;
                  } else if (stat.label.toLowerCase().includes("umkm")) {
                    icon = <FaBuilding />;
                  }
                  return { ...stat, icon };
                },
              );
              setStats(statsWithIcons);
            }
          }
        }

        // Fetch slider data
        const sliderRes = await fetch("/api/slider-publik");
        if (sliderRes.ok) {
          const sliderData = await sliderRes.json();
          if (sliderData.success && sliderData.data) {
            setSliders(sliderData.data);
          }
        }

        // Fetch berita terbaru (terbit & limit 6)
        const beritaRes = await fetch("/api/berita?terbit=true&limit=6");
        if (beritaRes.ok) {
          const beritaData = await beritaRes.json();
          if (beritaData.success && beritaData.data) {
            setBeritaList(beritaData.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: <FaUsers className="text-5xl" />,
      title: "Struktur Pemerintahan",
      description: "Susunan pemerintahan dan perangkat desa",
      link: "/struktur-organisasi",
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: <MdAccountBalance className="text-5xl" />,
      title: "Pertanggungjawaban",
      description: "Laporan keuangan dan realisasi program",
      link: "/pertanggungjawaban",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: <FaNewspaper className="text-5xl" />,
      title: "Berita & Kegiatan",
      description: "Informasi dan kegiatan terkini desa",
      link: "/berita",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: <MdHistory className="text-5xl" />,
      title: "Sejarah Desa",
      description: "Perjalanan dan perkembangan Desa Tababo Selatan",
      link: "/sejarah",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: <MdStars className="text-5xl" />,
      title: "Keunggulan Desa",
      description: "Potensi unggulan dan sumber daya lokal",
      link: "/keunggulan",
      color: "from-green-600 to-emerald-700",
    },
    {
      icon: <FaQuestionCircle className="text-5xl" />,
      title: "FAQ",
      description: "Pertanyaan yang sering diajukan",
      link: "/faq",
      color: "from-purple-500 to-pink-600",
    },
  ];

  // Format berita untuk NewsCard
  const newsItems = beritaList.map((berita) => ({
    title: berita.judul,
    date: new Date(berita.dibuat).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    image:
      berita.gambarUtama ||
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    link: `/berita/${berita.slug}`,
    excerpt: berita.ringkasan,
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700 text-lg">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-b from-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-linear-to-br from-green-800 via-emerald-700 to-teal-800">
        {hero.gambar && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${hero.gambar})` }}
          />
        )}
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
              {hero.judul}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-4 text-green-100"
            >
              {hero.subjudul}
            </motion.p>

            {hero.deskripsi && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg md:text-xl mb-8 text-green-200 max-w-3xl mx-auto"
              >
                <MdLocationOn className="inline text-2xl mb-1" />{" "}
                {hero.deskripsi}
              </motion.p>
            )}

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
          <FaLeaf
            className="absolute bottom-20 right-10 text-5xl text-green-300 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
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
                <StatCard
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-linear-to-b from-green-50 to-white">
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

      {/* News Section */}
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

          {newsItems.length > 0 ? (
            <>
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="pb-12"
              >
                {newsItems.map((item, index) => (
                  <SwiperSlide key={index}>
                    <NewsCard
                      title={item.title}
                      date={item.date}
                      image={item.image}
                      link={item.link}
                      excerpt={item.excerpt}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="text-center mt-8">
                <Link
                  href="/berita"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all transform hover:scale-105"
                >
                  <FaNewspaper />
                  Lihat Semua Berita
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <FaNewspaper className="text-5xl mx-auto mb-4 opacity-30" />
              <p>Belum ada berita tersedia</p>
            </div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <MapSection
        latitude={0.9629460591112564}
        longitude={124.80253311393106}
        desaNama="Desa Tababo Selatan"
        alamat="Kecamatan [Nama Kecamatan], Kabupaten [Nama Kabupaten], Provinsi Gorontalo"
      />

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-green-700 via-emerald-600 to-teal-700 text-white relative overflow-hidden">
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
              Bergabunglah dalam program pembangunan desa untuk masa depan yang
              lebih baik
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/pertanggungjawaban"
                className="bg-white text-green-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Lihat Program Desa
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
