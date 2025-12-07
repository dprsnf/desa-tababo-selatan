import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Mulai seeding database...");

  // 1. Admin
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      email: "admin@desatababoselatan.id",
      password: hashedPassword,
      namaLengkap: "Administrator Desa",
      role: "superadmin",
      aktif: true,
    },
  });
  console.log("✅ Admin user dibuat:", admin.username);

  // 2. Statistik
  const stats = await prisma.statistik.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      jumlahPenduduk: 5247,
      lakiLaki: 2650,
      perempuan: 2597,
      jumlahKeluarga: 1389,
      luasWilayah: "25.5 km²",
      jumlahRW: 8,
      jumlahRT: 24,
      jumlahDusun: 4,
    },
  });
  console.log("✅ Statistik dibuat");

  // 3. Pengaturan
  const pengaturan = await prisma.pengaturan.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      namaSitus: "Website Desa Tababo Selatan",
      tagline: "Desa Sejahtera, Masyarakat Berdaya",
      deskripsiSitus:
        "Website resmi Pemerintah Desa Tababo Selatan, Kecamatan Tababo, Kabupaten Kepulauan Sangihe, Provinsi Sulawesi Utara. Menyediakan informasi dan layanan publik untuk masyarakat.",
      alamatKantor:
        "Jl. Trans Sangihe, Desa Tababo Selatan, Kec. Tababo, Kab. Kepulauan Sangihe, Sulawesi Utara 95819",
      emailKontak: "pemdes@tababoselatan.id",
      teleponKontak: "0821-9999-8888",
      jamOperasional: "Senin - Jumat: 08.00 - 15.00 WITA",
      facebook: "https://facebook.com/desatababoselatan",
      instagram: "https://instagram.com/desatababoselatan",
      metaKeywords: "desa tababo selatan, sangihe, sulawesi utara, pemerintah desa",
      metaDescription: "Website resmi Desa Tababo Selatan - Informasi, layanan, dan transparansi pemerintahan desa",
    },
  });
  console.log("✅ Pengaturan dibuat");

  // 4. Kepala Desa & Perangkat
  const kepalaDesaData = [
    {
      namaLengkap: "Bpk. H. Ahmad Rahmat, S.Sos",
      jabatan: "Kepala Desa",
      nip: "197503151995031002",
      periode: "2019-2025",
      tahunMulai: 2019,
      tahunSelesai: 2025,
      pendidikan: "S1 Sosiologi",
      visi: "Mewujudkan Desa Tababo Selatan yang Sejahtera, Mandiri, dan Berdaya Saing Berbasis Potensi Lokal",
      misi: [
        "Meningkatkan kualitas pelayanan publik yang cepat, mudah, dan transparan",
        "Mengembangkan potensi ekonomi masyarakat melalui pemberdayaan UMKM",
        "Meningkatkan kualitas infrastruktur desa untuk menunjang aktivitas masyarakat",
        "Mewujudkan tata kelola pemerintahan yang baik, bersih, dan akuntabel",
        "Mengembangkan SDM masyarakat melalui pendidikan dan pelatihan",
      ],
      sedangMenjabat: true,
      urutan: 1,
    },
    {
      namaLengkap: "Ibu Sri Wahyuni, S.Pd",
      jabatan: "Sekretaris Desa",
      nip: "198204102005022003",
      pendidikan: "S1 Pendidikan",
      sedangMenjabat: true,
      urutan: 2,
    },
    {
      namaLengkap: "Bpk. Budiman, SE",
      jabatan: "Kaur Keuangan",
      nip: "198508152008011004",
      pendidikan: "S1 Ekonomi",
      sedangMenjabat: true,
      urutan: 3,
    },
    {
      namaLengkap: "Bpk. Supriyanto",
      jabatan: "Kaur Perencanaan",
      pendidikan: "SMA",
      sedangMenjabat: true,
      urutan: 4,
    },
    {
      namaLengkap: "Ibu Siti Nurhaliza, S.Sos",
      jabatan: "Kasi Pemerintahan",
      pendidikan: "S1 Sosiologi",
      sedangMenjabat: true,
      urutan: 5,
    },
    {
      namaLengkap: "Bpk. Hendri Saputra",
      jabatan: "Kasi Kesejahteraan",
      pendidikan: "SMA",
      sedangMenjabat: true,
      urutan: 6,
    },
    {
      namaLengkap: "Bpk. Agus Salim",
      jabatan: "Kepala Dusun",
      namaDusun: "Dusun I",
      pendidikan: "SMA",
      sedangMenjabat: true,
      urutan: 7,
    },
    {
      namaLengkap: "Bpk. Yusuf Mahendra",
      jabatan: "Kepala Dusun",
      namaDusun: "Dusun II",
      pendidikan: "SMA",
      sedangMenjabat: true,
      urutan: 8,
    },
  ];

  for (const perangkat of kepalaDesaData) {
    await prisma.kepalaDesaPerangkat.create({
      data: perangkat as any,
    });
  }
  console.log("✅ Kepala Desa & Perangkat dibuat:", kepalaDesaData.length);

  // 5. Berita
  const beritaData = [
    {
      judul: "Selamat Datang di Website Resmi Desa Tababo Selatan",
      slug: "selamat-datang-website-desa",
      ringkasan:
        "Website resmi Desa Tababo Selatan kini telah resmi diluncurkan untuk meningkatkan transparansi dan pelayanan kepada masyarakat.",
      konten:
        "Desa Tababo Selatan dengan bangga meluncurkan website resmi yang dapat diakses oleh seluruh masyarakat. Website ini dibuat dengan tujuan meningkatkan transparansi pemerintahan desa, mempermudah akses informasi, dan meningkatkan kualitas pelayanan publik. Masyarakat dapat mengakses berbagai informasi seperti berita desa, program pembangunan, layanan administrasi, dan informasi lainnya melalui website ini.",
      kategori: "pengumuman",
      penulis: "Admin Desa",
      terbit: true,
      tanggalTerbit: new Date("2024-12-01"),
    },
    {
      judul: "Musyawarah Desa Pembahasan APBDes 2025",
      slug: "musyawarah-desa-apbdes-2025",
      ringkasan:
        "Pemerintah Desa mengundang seluruh elemen masyarakat dalam Musyawarah Desa pembahasan Rancangan APBDes Tahun 2025.",
      konten:
        "Dalam rangka transparansi dan partisipasi masyarakat, Pemerintah Desa Tababo Selatan menyelenggarakan Musyawarah Desa untuk membahas Rancangan Anggaran Pendapatan dan Belanja Desa (APBDes) Tahun Anggaran 2025. Musyawarah akan dilaksanakan pada tanggal 15 Desember 2024 di Balai Desa. Seluruh elemen masyarakat, tokoh agama, tokoh adat, dan ketua RT/RW diharapkan hadir untuk memberikan masukan dan aspirasi terkait program pembangunan desa tahun depan.",
      kategori: "pengumuman",
      penulis: "Sekretaris Desa",
      terbit: true,
      tanggalTerbit: new Date("2024-12-05"),
    },
    {
      judul: "Gotong Royong Pembersihan Saluran Air",
      slug: "gotong-royong-pembersihan-saluran",
      ringkasan:
        "Masyarakat Desa Tababo Selatan kompak melaksanakan gotong royong pembersihan saluran air di seluruh wilayah desa.",
      konten:
        "Sebagai upaya menjaga kebersihan lingkungan dan mencegah banjir saat musim hujan, masyarakat Desa Tababo Selatan secara kompak melaksanakan gotong royong pembersihan saluran air. Kegiatan yang dilaksanakan serentak di 4 dusun ini diikuti oleh ratusan warga dan perangkat desa. Kepala Desa mengapresiasi partisipasi aktif masyarakat dalam menjaga kebersihan lingkungan.",
      kategori: "kegiatan",
      penulis: "Admin Desa",
      terbit: true,
      tanggalTerbit: new Date("2024-12-03"),
    },
  ];

  for (const berita of beritaData) {
    await prisma.berita.create({ data: berita });
  }
  console.log("✅ Berita dibuat:", beritaData.length);

  // 6. Program & Kegiatan
  const programData = [
    {
      namaProgram: "Pembangunan Jalan Desa",
      slug: "pembangunan-jalan-desa",
      deskripsi:
        "Program pembangunan dan pengaspalan jalan desa sepanjang 2 km untuk meningkatkan aksesibilitas masyarakat.",
      kategori: "infrastruktur",
      sumberDana: "APBDes",
      anggaran: 500000000,
      realisasi: 350000000,
      status: "berjalan",
      tanggalMulai: new Date("2024-08-01"),
      lokasiKegiatan: "Jalan Desa Utama",
      penanggungJawab: "Kaur Perencanaan",
      targetPenerima: "Seluruh masyarakat desa",
      terbit: true,
    },
    {
      namaProgram: "Pelatihan UMKM Desa",
      slug: "pelatihan-umkm-desa",
      deskripsi:
        "Pelatihan kewirausahaan dan manajemen UMKM untuk meningkatkan kemampuan pelaku usaha lokal.",
      kategori: "ekonomi",
      sumberDana: "APBDes & APBD",
      anggaran: 50000000,
      realisasi: 50000000,
      status: "selesai",
      tanggalMulai: new Date("2024-09-15"),
      tanggalSelesai: new Date("2024-09-17"),
      lokasiKegiatan: "Balai Desa",
      penanggungJawab: "Kasi Kesejahteraan",
      targetPenerima: "50 pelaku UMKM",
      terbit: true,
    },
    {
      namaProgram: "Bantuan Bibit Tanaman Produktif",
      slug: "bantuan-bibit-tanaman",
      deskripsi:
        "Pembagian bibit tanaman produktif seperti kelapa, cengkeh, dan pala untuk petani.",
      kategori: "ekonomi",
      sumberDana: "APBDes",
      anggaran: 75000000,
      realisasi: 75000000,
      status: "selesai",
      tanggalMulai: new Date("2024-10-01"),
      tanggalSelesai: new Date("2024-10-05"),
      lokasiKegiatan: "Seluruh Dusun",
      penanggungJawab: "Kasi Kesejahteraan",
      targetPenerima: "200 petani",
      terbit: true,
    },
    {
      namaProgram: "Posyandu Balita dan Lansia",
      slug: "posyandu-balita-lansia",
      deskripsi:
        "Program pelayanan kesehatan rutin untuk balita dan lansia setiap bulan.",
      kategori: "kesehatan",
      sumberDana: "APBDes",
      anggaran: 30000000,
      realisasi: 20000000,
      status: "berjalan",
      tanggalMulai: new Date("2024-01-01"),
      lokasiKegiatan: "Posyandu di setiap dusun",
      penanggungJawab: "Kasi Kesejahteraan",
      targetPenerima: "300 balita dan 150 lansia",
      terbit: true,
    },
  ];

  for (const program of programData) {
    await prisma.program.create({ data: program });
  }
  console.log("✅ Program dibuat:", programData.length);

  // 7. Pertanggungjawaban
  const pertanggungjawabanData = [
    {
      tahun: 2024,
      jenis: "apbdes",
      judul: "Laporan Realisasi APBDes Tahun 2024",
      deskripsi: "Laporan realisasi anggaran pendapatan dan belanja desa tahun anggaran 2024.",
      periode: "Tahun 2024",
      anggaranTotal: 2500000000,
      realisasiTotal: 1800000000,
      persentase: 72,
      rincianAnggaran: [
        { bidang: "Penyelenggaraan Pemerintahan Desa", anggaran: 800000000, realisasi: 750000000 },
        { bidang: "Pembangunan Desa", anggaran: 1200000000, realisasi: 800000000 },
        { bidang: "Pembinaan Kemasyarakatan", anggaran: 300000000, realisasi: 150000000 },
        { bidang: "Pemberdayaan Masyarakat", anggaran: 200000000, realisasi: 100000000 },
      ],
      terbit: true,
      tanggalTerbit: new Date("2024-12-01"),
    },
  ];

  for (const laporan of pertanggungjawabanData) {
    await prisma.pertanggungjawaban.create({ data: laporan as any });
  }
  console.log("✅ Pertanggungjawaban dibuat:", pertanggungjawabanData.length);

  // 8. Layanan
  const layananData = [
    {
      namaLayanan: "Surat Keterangan Domisili",
      slug: "surat-keterangan-domisili",
      deskripsi: "Surat keterangan bahwa seseorang berdomisili di wilayah Desa Tababo Selatan.",
      persyaratan: [
        "KTP asli dan fotocopy",
        "Kartu Keluarga asli dan fotocopy",
        "Surat Pengantar RT/RW",
      ],
      prosedur: [
        "Datang ke kantor desa dengan membawa persyaratan",
        "Mengisi formulir permohonan",
        "Petugas akan memproses permohonan",
        "Surat dapat diambil sesuai waktu yang ditentukan",
      ],
      biaya: "Gratis",
      waktuPenyelesaian: "1 hari kerja",
      kontak: "0821-9999-8888",
      aktif: true,
      urutan: 1,
    },
    {
      namaLayanan: "Surat Keterangan Usaha",
      slug: "surat-keterangan-usaha",
      deskripsi: "Surat keterangan untuk membuktikan bahwa seseorang memiliki usaha di wilayah desa.",
      persyaratan: [
        "KTP asli dan fotocopy",
        "Kartu Keluarga asli dan fotocopy",
        "Surat Pengantar RT/RW",
        "Foto lokasi usaha",
      ],
      prosedur: [
        "Datang ke kantor desa dengan membawa persyaratan",
        "Mengisi formulir permohonan",
        "Petugas akan melakukan survey lokasi",
        "Surat dapat diambil setelah verifikasi",
      ],
      biaya: "Gratis",
      waktuPenyelesaian: "3 hari kerja",
      kontak: "0821-9999-8888",
      aktif: true,
      urutan: 2,
    },
    {
      namaLayanan: "Surat Keterangan Tidak Mampu (SKTM)",
      slug: "surat-keterangan-tidak-mampu",
      deskripsi: "Surat keterangan untuk keperluan beasiswa, bantuan sosial, atau keringanan biaya.",
      persyaratan: [
        "KTP asli dan fotocopy",
        "Kartu Keluarga asli dan fotocopy",
        "Surat Pengantar RT/RW",
        "Surat keterangan dari Dinas Sosial (jika ada)",
      ],
      prosedur: [
        "Datang ke kantor desa dengan membawa persyaratan",
        "Mengisi formulir permohonan",
        "Petugas akan melakukan verifikasi data",
        "Surat dapat diambil setelah verifikasi",
      ],
      biaya: "Gratis",
      waktuPenyelesaian: "2 hari kerja",
      kontak: "0821-9999-8888",
      aktif: true,
      urutan: 3,
    },
  ];

  for (const layanan of layananData) {
    await prisma.layanan.create({ data: layanan as any });
  }
  console.log("✅ Layanan dibuat:", layananData.length);

  // 9. FAQ
  const faqData = [
    {
      pertanyaan: "Bagaimana cara mengurus surat keterangan domisili?",
      jawaban:
        "Untuk mengurus surat keterangan domisili, Anda perlu membawa KTP asli dan fotocopy, Kartu Keluarga asli dan fotocopy, serta surat pengantar dari RT/RW. Datang ke kantor desa pada jam kerja, isi formulir permohonan, dan surat dapat diambil dalam 1 hari kerja.",
      kategori: "layanan",
      urutan: 1,
      aktif: true,
    },
    {
      pertanyaan: "Berapa biaya pengurusan surat-surat di desa?",
      jawaban:
        "Semua layanan administrasi di Desa Tababo Selatan GRATIS. Tidak ada pungutan biaya apapun untuk pengurusan surat keterangan, surat pengantar, atau dokumen administrasi lainnya.",
      kategori: "layanan",
      urutan: 2,
      aktif: true,
    },
    {
      pertanyaan: "Kapan jam operasional kantor desa?",
      jawaban:
        "Kantor Desa Tababo Selatan buka setiap hari Senin sampai Jumat, pukul 08.00 - 15.00 WITA. Untuk hari Sabtu, Minggu, dan hari libur nasional, kantor tutup.",
      kategori: "umum",
      urutan: 3,
      aktif: true,
    },
    {
      pertanyaan: "Bagaimana cara menyampaikan aspirasi atau pengaduan?",
      jawaban:
        "Masyarakat dapat menyampaikan aspirasi atau pengaduan melalui beberapa cara: 1) Datang langsung ke kantor desa, 2) Melalui website desa di menu Kontak/Pengaduan, 3) Melalui telepon ke nomor (0821-9999-8888), 4) Melalui media sosial resmi desa.",
      kategori: "umum",
      urutan: 4,
      aktif: true,
    },
  ];

  for (const faq of faqData) {
    await prisma.fAQ.create({ data: faq });
  }
  console.log("✅ FAQ dibuat:", faqData.length);

  // 10. Profile Desa
  const profileData = [
    {
      judul: "Tentang Desa Tababo Selatan",
      section: "tentang",
      konten:
        "Desa Tababo Selatan adalah salah satu desa di Kecamatan Tababo, Kabupaten Kepulauan Sangihe, Provinsi Sulawesi Utara. Desa ini memiliki luas wilayah 25,5 km² dengan jumlah penduduk sekitar 5.247 jiwa. Mayoritas masyarakat bermata pencaharian sebagai petani, nelayan, dan pelaku UMKM. Desa Tababo Selatan memiliki potensi alam yang melimpah, terutama di sektor pertanian, perkebunan, dan perikanan.",
      aktif: true,
      urutan: 1,
    },
    {
      judul: "Visi & Misi Desa",
      section: "visi_misi",
      konten: "Visi dan Misi Pemerintah Desa Tababo Selatan Periode 2019-2025",
      visi: "Mewujudkan Desa Tababo Selatan yang Sejahtera, Mandiri, dan Berdaya Saing Berbasis Potensi Lokal",
      misi: [
        "Meningkatkan kualitas pelayanan publik yang cepat, mudah, dan transparan",
        "Mengembangkan potensi ekonomi masyarakat melalui pemberdayaan UMKM",
        "Meningkatkan kualitas infrastruktur desa untuk menunjang aktivitas masyarakat",
        "Mewujudkan tata kelola pemerintahan yang baik, bersih, dan akuntabel",
        "Mengembangkan SDM masyarakat melalui pendidikan dan pelatihan",
      ],
      aktif: true,
      urutan: 1,
    },
  ];

  for (const profile of profileData) {
    await prisma.profileDesa.create({ data: profile as any });
  }
  console.log("✅ Profile Desa dibuat:", profileData.length);

  // 11. Potensi Desa
  const potensiData = [
    {
      judul: "Pertanian Padi dan Jagung",
      deskripsi:
        "Desa Tababo Selatan memiliki lahan pertanian yang luas dengan produktivitas tinggi. Komoditas utama adalah padi dan jagung yang ditanam secara bergilir.",
      kategori: "pertanian",
      urutan: 1,
      aktif: true,
    },
    {
      judul: "Perkebunan Kelapa dan Cengkeh",
      deskripsi:
        "Perkebunan kelapa dan cengkeh menjadi salah satu sumber pendapatan utama masyarakat. Kualitas cengkeh dari desa ini dikenal baik di pasaran.",
      kategori: "perkebunan",
      urutan: 2,
      aktif: true,
    },
    {
      judul: "UMKM Olahan Pangan",
      deskripsi:
        "Berbagai UMKM olahan pangan lokal seperti keripik, dodol, dan kue tradisional telah berkembang dan mulai memasuki pasar modern.",
      kategori: "umkm",
      urutan: 3,
      aktif: true,
    },
  ];

  for (const potensi of potensiData) {
    await prisma.potensiDesa.create({ data: potensi });
  }
  console.log("✅ Potensi Desa dibuat:", potensiData.length);

  // 12. Hero Section
  const heroData = {
    judul: "Selamat Datang di Desa Tababo Selatan",
    subjudul: "Desa Sejahtera, Masyarakat Berdaya",
    deskripsi:
      "Website resmi Pemerintah Desa Tababo Selatan - Informasi, Layanan, dan Transparansi untuk Masyarakat",
    gambar: "/images/hero-bg.jpg",
    tombolText: "Jelajahi Layanan",
    tombolUrl: "#layanan",
    urutan: 1,
    aktif: true,
  };

  await prisma.heroSection.create({ data: heroData });
  console.log("✅ Hero Section dibuat");

  console.log("\n🎉 Seeding selesai!");
  console.log("==========================================");
  console.log("📊 Ringkasan Data:");
  console.log("- Admin: 1");
  console.log("- Statistik: 1");
  console.log("- Pengaturan: 1");
  console.log("- Perangkat Desa: " + kepalaDesaData.length);
  console.log("- Berita: " + beritaData.length);
  console.log("- Program: " + programData.length);
  console.log("- Pertanggungjawaban: " + pertanggungjawabanData.length);
  console.log("- Layanan: " + layananData.length);
  console.log("- FAQ: " + faqData.length);
  console.log("- Profile Desa: " + profileData.length);
  console.log("- Potensi Desa: " + potensiData.length);
  console.log("- Hero Section: 1");
  console.log("==========================================");
  console.log("\n🔐 Login Credentials:");
  console.log("Username: admin");
  console.log("Password: admin123");
  console.log("==========================================\n");
}

main()
  .catch((e) => {
    console.error("❌ Seeding gagal: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
