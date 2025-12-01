# 🏘️ Website Desa Tababo Selatan

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

Website resmi Pemerintah Desa Tababo Selatan - Modern, Responsive, dan User-Friendly

[Demo](#) · [Laporan Bug](https://github.com/dprsnf/desa-tababo-selatan/issues) · [Request Fitur](https://github.com/dprsnf/desa-tababo-selatan/issues)

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Instalasi](#-instalasi)
- [Penggunaan](#-penggunaan)
- [Struktur Proyek](#-struktur-proyek)
- [Halaman Website](#-halaman-website)
- [Admin Panel](#-admin-panel)
- [Deployment](#-deployment)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 🎯 Tentang Proyek

Website Desa Tababo Selatan adalah platform digital yang dirancang untuk meningkatkan transparansi dan aksesibilitas informasi pemerintahan desa kepada masyarakat. Website ini menyediakan informasi lengkap tentang profil desa, struktur organisasi, program kerja, dan pertanggungjawaban pemerintah desa.

### ✨ Keunggulan

- 🎨 **Modern & Responsif** - Desain yang menarik dan berfungsi sempurna di semua perangkat
- ⚡ **Performa Tinggi** - Dibangun dengan Next.js 16 dan React 19 untuk loading yang cepat
- 🔐 **Admin Panel** - Dashboard khusus untuk mengelola konten website
- ♿ **User-Friendly** - Antarmuka intuitif dan mudah digunakan
- 🎭 **Animasi Smooth** - Menggunakan Framer Motion untuk transisi yang halus

---

## 🚀 Fitur Utama

### Halaman Publik
- ✅ **Beranda** - Informasi umum, statistik, dan berita terkini
- ✅ **Sejarah Desa** - Timeline perkembangan dan budaya lokal
- ✅ **Keunggulan Desa** - Potensi pertanian, UMKM, dan pariwisata
- ✅ **Struktur Organisasi** - Hierarki pemerintahan desa
- ✅ **Kepala Desa Sebelumnya** - Riwayat kepemimpinan desa
- ✅ **Pertanggungjawaban** - Laporan APBDes dan program kerja

### Admin Panel
- 🔐 **Login & Autentikasi** - Akses terlindungi untuk admin
- 📊 **Dashboard** - Ringkasan statistik dan akses cepat
- ✏️ **Edit Konten** - Kelola semua halaman dengan mudah
- 💾 **Auto-save** - Penyimpanan otomatis perubahan

---

## 🛠️ Teknologi yang Digunakan

### Core Framework
- **[Next.js 16](https://nextjs.org/)** - React framework untuk production
- **[React 19](https://react.dev/)** - Library UI terkini
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animasi dan transisi
- **[React Icons](https://react-icons.github.io/react-icons/)** - Koleksi icon lengkap
- **[Swiper](https://swiperjs.com/)** - Touch slider modern

### Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing

---

## 📦 Instalasi

### Prasyarat
Pastikan sudah terinstall:
- Node.js 20+ 
- npm / yarn / pnpm / bun

### Langkah Instalasi

1. **Clone repository**
```bash
git clone https://github.com/dprsnf/desa-tababo-selatan.git
cd desa-tababo-selatan/frontend
```

2. **Install dependencies**
```bash
npm install
# atau
yarn install
# atau
pnpm install
```

3. **Jalankan development server**
```bash
npm run dev
```

4. **Buka browser**
```
http://localhost:3000
```

Website akan otomatis reload saat Anda melakukan perubahan pada kode.

---

## 💻 Penggunaan

### Development Mode
```bash
npm run dev     # Menjalankan dev server di port 3000
```

### Production Build
```bash
npm run build   # Build aplikasi untuk production
npm start       # Menjalankan production server
```

### Linting
```bash
npm run lint    # Cek kualitas kode dengan ESLint
```

### Admin Login (Default)
```
Username: admin
Password: admin123
```
⚠️ **Penting:** Ubah kredensial default sebelum deployment!

---

## 📁 Struktur Proyek

```
frontend/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 🏠 Halaman Beranda
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── sejarah/                  # 📖 Halaman Sejarah
│   ├── keunggulan/               # ⭐ Halaman Keunggulan
│   ├── struktur-organisasi/      # 👥 Halaman Struktur
│   ├── kepala-desa-sebelumnya/   # 👔 Halaman Kepala Desa
│   ├── pertanggungjawaban/       # 📊 Halaman Laporan
│   └── admin/                    # 🔐 Admin Panel
│       ├── login/                # Login page
│       ├── dashboard/            # Admin dashboard
│       └── edit/                 # Edit pages
│           ├── beranda/
│           ├── sejarah/
│           ├── keunggulan/
│           ├── struktur-organisasi/
│           ├── kepala-desa/
│           └── pertanggungjawaban/
├── components/                   # React Components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── AdminNavbar.tsx
│   ├── StatCard.tsx
│   ├── FeatureCard.tsx
│   ├── NewsCard.tsx
│   └── SectionTitle.tsx
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
├── next.config.ts                # Next.js config
└── README.md                     # Dokumentasi
```

---

## 🌐 Halaman Website

| Halaman | Route | Deskripsi |
|---------|-------|-----------|
| **Beranda** | `/` | Halaman utama dengan hero, statistik, fitur, dan berita |
| **Sejarah** | `/sejarah` | Asal usul, timeline, budaya, dan tokoh penting desa |
| **Keunggulan** | `/keunggulan` | Potensi pertanian, UMKM, pariwisata, dan infrastruktur |
| **Struktur Organisasi** | `/struktur-organisasi` | Hierarki pemerintahan dari kepala desa hingga staff |
| **Kepala Desa Sebelumnya** | `/kepala-desa-sebelumnya` | Timeline kepemimpinan desa dari masa ke masa |
| **Pertanggungjawaban** | `/pertanggungjawaban` | Laporan APBDes, keuangan, dan program kerja |

---

## 🔐 Admin Panel

### Akses Admin
1. Buka `http://localhost:3000/admin/login`
2. Login dengan kredensial admin
3. Akses dashboard di `/admin/dashboard`

### Fitur Dashboard
- **Statistik Real-time** - Total halaman, update, pengunjung
- **Quick Access** - Tombol akses cepat ke halaman edit
- **Manajemen Konten** - Edit semua halaman dari satu tempat

### Edit Halaman
Setiap halaman memiliki form editor dengan:
- ✏️ Text editor untuk konten
- 🖼️ Upload gambar
- ➕ Tambah/hapus item dinamis
- 👁️ Preview langsung
- 💾 Auto-save

---

## 🚀 Deployment

### Deploy ke Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dprsnf/desa-tababo-selatan)

1. Push code ke GitHub
2. Import project ke [Vercel](https://vercel.com)
3. Vercel akan otomatis detect Next.js dan deploy
4. Domain custom bisa ditambahkan di settings

### Deploy ke Platform Lain
- **Netlify** - Drag & drop folder `out/` hasil build
- **Railway** - Connect GitHub repo dan deploy otomatis
- **VPS/Server** - Build dan jalankan dengan `npm start`

### Environment Variables
Untuk production, tambahkan environment variables di dashboard hosting:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_SITE_URL=your_site_url
```

---

## 🤝 Kontribusi

Kontribusi sangat diterima dan diapresiasi! Berikut cara berkontribusi:

1. **Fork** repository ini
2. **Create branch** untuk fitur (`git checkout -b feature/AmazingFeature`)
3. **Commit** perubahan (`git commit -m 'Add some AmazingFeature'`)
4. **Push** ke branch (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

### Guidelines
- Ikuti style code yang ada
- Tulis commit message yang jelas
- Test sebelum submit PR
- Update dokumentasi jika diperlukan

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Unsplash](https://unsplash.com/) untuk foto placeholder

---

<div align="center">

**Dibuat dengan ❤️ untuk Desa Tababo Selatan**

⭐ Star repository ini jika bermanfaat!

</div>
