import Link from "next/link";
import {
  FaLeaf,
  FaUsers,
  FaChartLine,
  FaNewspaper,
  FaBuilding,
} from "react-icons/fa";
import { GiVillage, GiFarmer } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import StatCard from "@/components/StatCard";
import FeatureCard from "@/components/FeatureCard";
import SectionTitle from "@/components/SectionTitle";
import prisma from "@/lib/prisma";
import HeroSlider from "@/app/HeroSlider";

async function getData() {
  try {
    // Fetch hero section
    const heroSection = await prisma.heroSection.findFirst({
      where: { aktif: true },
      orderBy: { urutan: "asc" },
    });

    // Fetch statistik
    const statistik = await prisma.statistik.findFirst();

    // Fetch active sliders
    const now = new Date();
    const sliders = await prisma.slider.findMany({
      where: {
        aktif: true,
        OR: [
          {
            AND: [
              { tanggalMulai: { lte: now } },
              { tanggalSelesai: { gte: now } },
            ],
          },
          {
            tanggalMulai: null,
            tanggalSelesai: null,
          },
        ],
      },
      orderBy: [
        { urutan: "asc" },
        { dibuat: "desc" },
      ],
      take: 6,
    });

    // Fetch berita terbaru
    const berita = await prisma.berita.findMany({
      where: { terbit: true },
      orderBy: { tanggalTerbit: "desc" },
      take: 6,
    });

    return {
      heroSection,
      statistik,
      sliders,
      berita,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      heroSection: null,
      statistik: null,
      sliders: [],
      berita: [],
    };
  }
}

export default async function Home() {
  const { heroSection, statistik, sliders, berita } = await getData();

  // Default hero data
  const hero = heroSection
    ? {
        judul: heroSection.judul || "Desa Tababo Selatan",
        subjudul: heroSection.subjudul || "Desa Hijau, Sejahtera, dan Mandiri",
        deskripsi: heroSection.deskripsi || "Kecamatan [Nama Kecamatan], Kabupaten [Nama Kabupaten]",
        gambar: heroSection.gambar || "",
      }
    : {
        judul: "Desa Tababo Selatan",
        subjudul: "Desa Hijau, Sejahtera, dan Mandiri",
        deskripsi: "Kecamatan [Nama Kecamatan], Kabupaten [Nama Kabupaten]",
        gambar: "",
      };

  // Stats data
  const stats = statistik
    ? [
        {
          label: "Jumlah Penduduk",
          value: statistik.jumlahPenduduk.toLocaleString("id-ID"),
          icon: <FaUsers />,
        },
        {
          label: "Luas Wilayah",
          value: `${statistik.luasWilayah} Ha`,
          icon: <MdLocationOn />,
        },
        {
          label: "Dusun",
          value: statistik.jumlahDusun.toString(),
          icon: <GiVillage />,
        },
        {
          label: "RT/RW",
          value: `${statistik.jumlahRT}/${statistik.jumlahRW}`,
          icon: <FaBuilding />,
        },
      ]
    : [
        { label: "Jumlah Penduduk", value: "2,500+", icon: <FaUsers /> },
        { label: "Luas Wilayah", value: "450 Ha", icon: <MdLocationOn /> },
        { label: "Dusun", value: "4", icon: <GiVillage /> },
        { label: "RT/RW", value: "12/4", icon: <FaBuilding /> },
      ];

  const features = [
    {
      icon: <GiVillage className="text-5xl" />,
      title: "Struktur Organisasi",
      description: "Pemerintahan desa yang transparan dan akuntabel",
      link: "/struktur-organisasi",
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: <FaChartLine className="text-5xl" />,
      title: "Pertanggungjawaban",
      description: "Laporan keuangan dan program desa",
      link: "/pertanggungjawaban",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: <FaUsers className="text-5xl" />,
      title: "Kepala Desa Sebelumnya",
      description: "Sejarah kepemimpinan desa",
      link: "/kepala-desa-sebelumnya",
      color: "from-teal-500 to-cyan-600",
    },
    {
      icon: <FaNewspaper className="text-5xl" />,
      title: "Sejarah Desa",
      description: "Perjalanan dan perkembangan desa",
      link: "/sejarah",
      color: "from-lime-500 to-green-600",
    },
    {
      icon: <FaLeaf className="text-5xl" />,
      title: "Keunggulan Desa",
      description: "Potensi dan keunggulan lokal",
      link: "/keunggulan",
      color: "from-green-600 to-emerald-700",
    },
  ];

  // Prepare news from berita or sliders
  const newsItems = berita.length > 0
    ? berita.map((item: any) => ({
        id: item.id,
        judul: item.judul,
        konten: item.ringkasan,
        gambar: item.gambarUtama,
        link: `/berita/${item.slug}`,
        tipe: "berita",
        dibuat: item.dibuat.toISOString(),
      }))
    : sliders.map((slider: any) => ({
        id: slider.id,
        judul: slider.judul,
        konten: slider.konten,
        gambar: slider.gambar,
        link: slider.link,
        tipe: slider.tipe,
        dibuat: slider.dibuat.toISOString(),
      }));

  return (
    <div className="bg-gradient-to-b from-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-800 via-emerald-700 to-teal-800">
        {hero.gambar && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${hero.gambar})` }}
          />
        )}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZWMjRoNnYtem0wIDZoLTZWMzBoNnYxOHptNiAwaDZ2LTZoLTZ2Nm0wLTEyaDZ2LTZoLTZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        <div className="container mx-auto px-4 z-10">
          <div className="text-center text-white">
            <div className="mb-6">
              <GiVillage className="text-8xl mx-auto text-green-200 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">{hero.judul}</h1>

            <p className="text-xl md:text-2xl mb-4 text-green-100">
              {hero.subjudul}
            </p>

            {hero.deskripsi && (
              <p className="text-lg md:text-xl mb-8 text-green-200 max-w-3xl mx-auto">
                <MdLocationOn className="inline text-2xl mb-1" />{" "}
                {hero.deskripsi}
              </p>
            )}

            <div className="flex gap-4 justify-center flex-wrap">
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
            </div>
          </div>
        </div>

        {/* Decorations */}
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
              <div key={index}>
                <StatCard
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div>
            <SectionTitle>Informasi Desa</SectionTitle>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  link={feature.link}
                  color={feature.color}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Carousel Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div>
            <SectionTitle>Berita & Kegiatan Terkini</SectionTitle>
          </div>

          {newsItems.length > 0 ? (
            <HeroSlider sliders={newsItems} />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <FaNewspaper className="text-5xl mx-auto mb-4 opacity-30" />
              <p>Belum ada berita tersedia</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZWMjRoNnYtem0wIDZoLTZWMzBoNnYxOHptNiAwaDZ2LTZoLTZ2Nm0wLTEyaDZ2LTZoLTZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div>
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
              <a
                href="#"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-700 transition-all transform hover:scale-105"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
