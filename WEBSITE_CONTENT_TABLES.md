# 🗄️ Website Content Tables Documentation

## 📋 Daftar Tabel Baru untuk Konten Website

Dokumen ini menjelaskan tabel-tabel baru yang ditambahkan untuk mendukung konten website publik Desa Tababo Selatan.

---

## 1. 🎯 Hero Section

**Tabel**: `HeroSection`

Banner utama/carousel di homepage website.

### Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | ✅ | Primary key (CUID) |
| `judul` | String | ✅ | Judul utama hero |
| `subjudul` | String | ❌ | Subjudul (opsional) |
| `deskripsi` | Text | ❌ | Deskripsi lengkap |
| `gambar` | String | ✅ | URL gambar background |
| `tombolText` | String | ❌ | Text CTA button |
| `tombolUrl` | String | ❌ | URL CTA button |
| `urutan` | Int | ✅ | Urutan tampil (0, 1, 2...) |
| `aktif` | Boolean | ✅ | Status aktif/nonaktif |
| `dibuat` | DateTime | ✅ | Timestamp created |
| `diperbarui` | DateTime | ✅ | Timestamp updated |

### Use Case:
- Carousel/slider di homepage
- Multiple slides dengan urutan
- CTA button untuk navigasi

### Admin Page Needed:
- `/admin/hero-section` - List & manage hero slides
- `/admin/hero-section/create` - Add new slide
- `/admin/hero-section/edit/[id]` - Edit slide

---

## 2. 📄 Profile Desa

**Tabel**: `ProfileDesa`

Konten tentang profil desa (Tentang, Visi Misi, Sejarah, dll).

### Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | ✅ | Primary key |
| `judul` | String | ✅ | Judul section |
| `konten` | Text | ✅ | Konten lengkap |
| `gambar` | String | ❌ | Gambar ilustrasi |
| `urutan` | Int | ✅ | Urutan tampil |
| `section` | String | ✅ | Jenis section (tentang, visi_misi, sejarah, struktur_organisasi) |
| `visi` | Text | ❌ | Visi (khusus visi_misi) |
| `misi` | Json | ❌ | Array misi |
| `aktif` | Boolean | ✅ | Status aktif |

### Section Types:
- `tentang` - Tentang Desa
- `visi_misi` - Visi & Misi
- `sejarah` - Sejarah Desa
- `struktur_organisasi` - Struktur Organisasi

### Admin Page Needed:
- `/admin/profil-desa` - Manage all profile sections
- `/admin/profil-desa/edit/[section]` - Edit specific section

---

## 3. 🖼️ Gallery

**Tabel**: `Gallery`

Galeri foto kegiatan, infrastruktur, dan dokumentasi desa.

### Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | ✅ | Primary key |
| `judul` | String | ✅ | Judul foto/album |
| `deskripsi` | Text | ❌ | Deskripsi |
| `gambar` | String | ✅ | URL gambar |
| `kategori` | String | ✅ | kegiatan, infrastruktur, acara, umum |
| `tags` | Json | ❌ | Array tags untuk filter |
| `urutan` | Int | ✅ | Urutan tampil |
| `tampilHome` | Boolean | ✅ | Tampil di homepage? |

### Kategori:
- `kegiatan` - Kegiatan desa
- `infrastruktur` - Pembangunan infrastruktur
- `acara` - Acara/event
- `umum` - Foto umum

### Admin Page Needed:
- `/admin/gallery` - List & grid view
- `/admin/gallery/create` - Upload new photo
- `/admin/gallery/edit/[id]` - Edit photo

---

## 4. ❓ FAQ

**Tabel**: `FAQ`

Frequently Asked Questions untuk layanan dan prosedur.

### Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | ✅ | Primary key |
| `pertanyaan` | Text | ✅ | Pertanyaan |
| `jawaban` | Text | ✅ | Jawaban |
| `kategori` | String | ❌ | umum, layanan, prosedur |
| `urutan` | Int | ✅ | Urutan tampil |
| `aktif` | Boolean | ✅ | Status aktif |

### Admin Page Needed:
- `/admin/faq` - List FAQ dengan kategori
- `/admin/faq/create` - Add new FAQ
- `/admin/faq/edit/[id]` - Edit FAQ

---

## 5. 📢 Slider

**Tabel**: `Slider`

Pengumuman berjalan / running text di website.

### Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | ✅ | Primary key |
| `judul` | String | ✅ | Judul pengumuman |
| `konten` | Text | ❌ | Konten detail |
| `gambar` | String | ❌ | Gambar (optional) |
| `link` | String | ❌ | Link terkait |
| `tipe` | String | ✅ | info, warning, success, announcement |
| `urutan` | Int | ✅ | Urutan tampil |
| `aktif` | Boolean | ✅ | Status aktif |
| `tanggalMulai` | DateTime | ❌ | Tanggal mulai tampil |
| `tanggalSelesai` | DateTime | ❌ | Tanggal berhenti tampil |

### Tipe:
- `info` - Informasi umum (blue)
- `warning` - Peringatan (yellow)
- `success` - Pengumuman positif (green)
- `announcement` - Pengumuman penting (red)

### Admin Page Needed:
- `/admin/slider` - List pengumuman
- `/admin/slider/create` - Add announcement
- `/admin/slider/edit/[id]` - Edit announcement

---

## 6. 💬 Pengaduan

**Tabel**: `Pengaduan`

Sistem pengaduan/feedback dari masyarakat.

### Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | ✅ | Primary key |
| `nama` | String | ✅ | Nama pelapor |
| `email` | String | ❌ | Email pelapor |
| `telepon` | String | ❌ | Telepon pelapor |
| `subjek` | String | ✅ | Subjek pengaduan |
| `pesan` | Text | ✅ | Isi pengaduan |
| `kategori` | String | ✅ | pengaduan, saran, pertanyaan, permintaan_informasi |
| `status` | String | ✅ | baru, diproses, selesai, ditolak |
| `prioritas` | String | ✅ | rendah, normal, tinggi, mendesak |
| `tanggapan` | Text | ❌ | Tanggapan dari admin |
| `ditanggapiOleh` | String | ❌ | Admin yang menanggapi |
| `tanggalTanggap` | DateTime | ❌ | Waktu tanggapan |

### Status Flow:
1. `baru` - Pengaduan baru masuk
2. `diproses` - Sedang ditangani
3. `selesai` - Sudah selesai
4. `ditolak` - Ditolak dengan alasan

### Admin Page Needed:
- `/admin/pengaduan` - List semua pengaduan (dengan filter status)
- `/admin/pengaduan/detail/[id]` - Detail & tanggapi
- Dashboard widget untuk pengaduan baru

---

## 7. 📎 Dokumen Publik

**Tabel**: `DokumenPublik`

Repository dokumen publik (Peraturan, SK, Formulir, dll).

### Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | ✅ | Primary key |
| `judul` | String | ✅ | Judul dokumen |
| `deskripsi` | Text | ❌ | Deskripsi |
| `namaFile` | String | ✅ | Nama file |
| `urlFile` | String | ✅ | URL file (PDF/DOC) |
| `ukuranFile` | Int | ❌ | Ukuran dalam bytes |
| `kategori` | String | ✅ | peraturan, sk, sop, formulir, laporan, lainnya |
| `tahun` | Int | ❌ | Tahun dokumen |
| `nomorDokumen` | String | ❌ | Nomor SK/Peraturan |
| `tanggalTerbit` | DateTime | ❌ | Tanggal terbit |
| `jumlahUnduhan` | Int | ✅ | Counter download |
| `aktif` | Boolean | ✅ | Status aktif |

### Kategori:
- `peraturan` - Peraturan Desa
- `sk` - Surat Keputusan
- `sop` - Standard Operating Procedure
- `formulir` - Formulir layanan
- `laporan` - Laporan publik
- `lainnya` - Dokumen lainnya

### Admin Page Needed:
- `/admin/dokumen` - List dokumen
- `/admin/dokumen/create` - Upload dokumen
- `/admin/dokumen/edit/[id]` - Edit info dokumen

---

## 8. 🌾 Potensi Desa

**Tabel**: `PotensiDesa`

Showcase potensi dan unggulan desa.

### Fields:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | ✅ | Primary key |
| `judul` | String | ✅ | Nama potensi |
| `deskripsi` | Text | ✅ | Deskripsi lengkap |
| `kategori` | String | ✅ | pertanian, perkebunan, peternakan, perikanan, industri, pariwisata, umkm |
| `gambar` | String | ❌ | Gambar ilustrasi |
| `lokasi` | String | ❌ | Lokasi potensi |
| `kontak` | String | ❌ | Kontak terkait |
| `urutan` | Int | ✅ | Urutan tampil |
| `aktif` | Boolean | ✅ | Status aktif |

### Kategori:
- `pertanian` - Pertanian
- `perkebunan` - Perkebunan
- `peternakan` - Peternakan
- `perikanan` - Perikanan
- `industri` - Industri kecil/rumahan
- `pariwisata` - Wisata
- `umkm` - UMKM

### Admin Page Needed:
- `/admin/potensi-desa` - List potensi
- `/admin/potensi-desa/create` - Add potensi
- `/admin/potensi-desa/edit/[id]` - Edit potensi

---

## 🚀 Migration Steps

### 1. Create Migration

```bash
npx prisma migrate dev --name add_website_content_tables
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Seed Initial Data (Optional)

Create `prisma/seed-content.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Hero Section
  await prisma.heroSection.create({
    data: {
      judul: 'Selamat Datang di Desa Tababo Selatan',
      subjudul: 'Desa Maju dan Sejahtera',
      deskripsi: 'Portal informasi resmi Desa Tababo Selatan',
      gambar: '/images/hero-default.jpg',
      tombolText: 'Selengkapnya',
      tombolUrl: '/profil',
      urutan: 0,
      aktif: true,
    },
  });

  // Profile Desa - Tentang
  await prisma.profileDesa.create({
    data: {
      judul: 'Tentang Desa Tababo Selatan',
      konten: 'Desa Tababo Selatan adalah...',
      section: 'tentang',
      aktif: true,
    },
  });

  // Profile Desa - Visi Misi
  await prisma.profileDesa.create({
    data: {
      judul: 'Visi & Misi',
      konten: '',
      section: 'visi_misi',
      visi: 'Visi Desa...',
      misi: ['Misi 1', 'Misi 2', 'Misi 3'],
      aktif: true,
    },
  });

  console.log('Content seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## 📊 Priority untuk Implementasi Admin Pages

### High Priority (Penting untuk Launch):
1. ✅ **Hero Section** - First impression website
2. ✅ **Profile Desa** - Info dasar desa
3. ✅ **Slider** - Pengumuman penting
4. ✅ **FAQ** - Bantuan untuk user

### Medium Priority:
5. ✅ **Gallery** - Visual appeal
6. ✅ **Pengaduan** - Layanan masyarakat
7. ✅ **Dokumen Publik** - Transparansi

### Low Priority (Nice to Have):
8. ✅ **Potensi Desa** - Showcase

---

## 🎨 Suggested Color Themes

| Module | Color | Gradient |
|--------|-------|----------|
| Hero Section | `indigo-600` | `from-indigo-50 to-blue-100` |
| Profile Desa | `sky-600` | `from-sky-50 to-blue-100` |
| Gallery | `pink-600` | `from-pink-50 to-rose-100` |
| FAQ | `violet-600` | `from-violet-50 to-purple-100` |
| Slider | `orange-600` | `from-orange-50 to-amber-100` |
| Pengaduan | `red-600` | `from-red-50 to-rose-100` |
| Dokumen Publik | `cyan-600` | `from-cyan-50 to-teal-100` |
| Potensi Desa | `lime-600` | `from-lime-50 to-green-100` |

---

## 🔗 API Routes yang Perlu Dibuat

```
/api/hero-section
  GET    - List all hero slides
  POST   - Create new slide
  
/api/hero-section/[id]
  GET    - Get specific slide
  PUT    - Update slide
  DELETE - Delete slide

/api/profil-desa
  GET    - List all profile sections
  POST   - Create new section
  
/api/profil-desa/[id]
  GET    - Get specific section
  PUT    - Update section
  DELETE - Delete section

/api/gallery
  GET    - List gallery with filter
  POST   - Upload new photo

/api/gallery/[id]
  GET    - Get photo detail
  PUT    - Update photo
  DELETE - Delete photo

/api/faq
  GET    - List FAQ
  POST   - Create FAQ

/api/faq/[id]
  GET    - Get FAQ
  PUT    - Update FAQ
  DELETE - Delete FAQ

/api/slider
  GET    - List active sliders
  POST   - Create slider

/api/slider/[id]
  GET    - Get slider
  PUT    - Update slider
  DELETE - Delete slider

/api/pengaduan
  GET    - List (admin only)
  POST   - Submit (public)

/api/pengaduan/[id]
  GET    - Detail
  PUT    - Update/respond
  DELETE - Delete

/api/dokumen
  GET    - List dokumen
  POST   - Upload dokumen

/api/dokumen/[id]
  GET    - Download dokumen
  PUT    - Update info
  DELETE - Delete dokumen

/api/potensi-desa
  GET    - List potensi
  POST   - Create potensi

/api/potensi-desa/[id]
  GET    - Detail
  PUT    - Update
  DELETE - Delete
```

---

## ✅ Next Steps

1. **Run Migration**: `npx prisma migrate dev --name add_website_content_tables`
2. **Generate Client**: `npx prisma generate`
3. **Create API Routes**: Implement CRUD untuk setiap tabel
4. **Create Admin Pages**: Implementasi halaman admin sesuai priority
5. **Create Public Pages**: Halaman website publik untuk display konten
6. **Seed Data**: Populate initial content

---

## 💡 Tips

- **Image Storage**: Pertimbangkan Supabase Storage / Cloudinary untuk gambar
- **Rich Text**: Gunakan editor seperti TipTap untuk konten panjang
- **Validation**: Implement Zod schema untuk semua form
- **Caching**: Cache konten publik dengan Next.js revalidation
- **SEO**: Implement metadata untuk setiap page

---

**Status**: 📝 Schema sudah ditambahkan, siap untuk migration dan implementasi!