# 🚀 New Admin Pages TODO - Website Content Management

## 📋 Overview

Setelah menambahkan 8 tabel baru untuk konten website, kita perlu membuat halaman admin untuk mengelola konten-konten tersebut.

**Total**: 8 Modul Baru = **24 Halaman** yang perlu dibuat

---

## ✅ Implementation Priority

### 🔴 HIGH PRIORITY (Critical untuk Launch Website)

#### 1. Hero Section Module (3 halaman) 🎯
**Urgency**: ⭐⭐⭐⭐⭐ - First impression website!

- [ ] `/admin/hero-section` - List & manage slides
- [ ] `/admin/hero-section/create` - Add new hero slide
- [ ] `/admin/hero-section/edit/[id]` - Edit slide

**Fields**:
- `judul` (required, string)
- `subjudul` (optional, text)
- `deskripsi` (optional, text)
- `gambar` (required, URL)
- `tombolText` (optional, string)
- `tombolUrl` (optional, string)
- `urutan` (number, for ordering)
- `aktif` (boolean)

**Features**:
- Drag & drop untuk reorder slides
- Preview gambar
- Toggle aktif/nonaktif
- Multiple active slides untuk carousel

**Color Theme**: `indigo-600`, `from-indigo-50 to-blue-100`

---

#### 2. Profile Desa Module (2 halaman) 📄
**Urgency**: ⭐⭐⭐⭐⭐ - Konten inti website!

- [ ] `/admin/profil-desa` - List all profile sections (Tentang, Visi Misi, Sejarah, Struktur)
- [ ] `/admin/profil-desa/edit/[id]` - Edit specific section

**Sections**:
- `tentang` - Tentang Desa
- `visi_misi` - Visi & Misi (with special fields)
- `sejarah` - Sejarah Desa
- `struktur_organisasi` - Struktur Organisasi

**Fields**:
- `judul` (string)
- `konten` (text/rich text)
- `gambar` (optional, URL)
- `section` (dropdown)
- `visi` (text, khusus visi_misi)
- `misi` (JSON array, khusus visi_misi)
- `aktif` (boolean)

**Special Note**: Misi harus bisa di-manage sebagai array (add/remove items)

**Color Theme**: `sky-600`, `from-sky-50 to-blue-100`

---

#### 3. Slider/Pengumuman Module (3 halaman) 📢
**Urgency**: ⭐⭐⭐⭐ - Penting untuk komunikasi

- [ ] `/admin/slider` - List pengumuman
- [ ] `/admin/slider/create` - Add announcement
- [ ] `/admin/slider/edit/[id]` - Edit announcement

**Fields**:
- `judul` (required, string)
- `konten` (optional, text)
- `gambar` (optional, URL)
- `link` (optional, URL)
- `tipe` (dropdown: info, warning, success, announcement)
- `urutan` (number)
- `aktif` (boolean)
- `tanggalMulai` (optional, date)
- `tanggalSelesai` (optional, date)

**Features**:
- Color-coded by type
- Auto-hide based on date range
- Preview tampilan slider

**Color Theme**: `orange-600`, `from-orange-50 to-amber-100`

---

#### 4. FAQ Module (3 halaman) ❓
**Urgency**: ⭐⭐⭐⭐ - Reduce support burden

- [ ] `/admin/faq` - List FAQ
- [ ] `/admin/faq/create` - Add FAQ
- [ ] `/admin/faq/edit/[id]` - Edit FAQ

**Fields**:
- `pertanyaan` (required, text)
- `jawaban` (required, text/rich text)
- `kategori` (dropdown: umum, layanan, prosedur)
- `urutan` (number)
- `aktif` (boolean)

**Features**:
- Group by kategori
- Drag & drop reorder
- Rich text editor untuk jawaban

**Color Theme**: `violet-600`, `from-violet-50 to-purple-100`

---

### 🟡 MEDIUM PRIORITY (Enhancement & Engagement)

#### 5. Gallery Module (3 halaman) 🖼️
**Urgency**: ⭐⭐⭐ - Visual engagement

- [ ] `/admin/gallery` - Grid view gallery
- [ ] `/admin/gallery/create` - Upload photo
- [ ] `/admin/gallery/edit/[id]` - Edit photo info

**Fields**:
- `judul` (required, string)
- `deskripsi` (optional, text)
- `gambar` (required, URL)
- `kategori` (dropdown: kegiatan, infrastruktur, acara, umum)
- `tags` (JSON array, for filtering)
- `urutan` (number)
- `tampilHome` (boolean - feature on homepage)

**Features**:
- Grid layout dengan preview
- Bulk upload (optional)
- Filter by kategori
- Lightbox preview

**Color Theme**: `pink-600`, `from-pink-50 to-rose-100`

---

#### 6. Pengaduan Module (2 halaman) 💬
**Urgency**: ⭐⭐⭐ - Public service

- [ ] `/admin/pengaduan` - List all pengaduan (with filters)
- [ ] `/admin/pengaduan/detail/[id]` - View & respond

**Fields**:
- `nama` (string)
- `email` (optional)
- `telepon` (optional)
- `subjek` (string)
- `pesan` (text)
- `kategori` (dropdown: pengaduan, saran, pertanyaan, permintaan_informasi)
- `status` (dropdown: baru, diproses, selesai, ditolak)
- `prioritas` (dropdown: rendah, normal, tinggi, mendesak)
- `tanggapan` (text, admin input)
- `ditanggapiOleh` (auto-filled from logged in admin)

**Features**:
- Dashboard widget for "pengaduan baru"
- Filter by status, kategori, prioritas
- Email notification (optional)
- Status workflow (baru → diproses → selesai)
- Priority badges

**Color Theme**: `red-600`, `from-red-50 to-rose-100`

---

#### 7. Dokumen Publik Module (3 halaman) 📎
**Urgency**: ⭐⭐⭐ - Transparency

- [ ] `/admin/dokumen` - List documents
- [ ] `/admin/dokumen/create` - Upload document
- [ ] `/admin/dokumen/edit/[id]` - Edit document info

**Fields**:
- `judul` (required, string)
- `deskripsi` (optional, text)
- `namaFile` (string)
- `urlFile` (required, URL)
- `ukuranFile` (number, bytes)
- `kategori` (dropdown: peraturan, sk, sop, formulir, laporan, lainnya)
- `tahun` (number)
- `nomorDokumen` (optional, string - untuk SK/Peraturan)
- `tanggalTerbit` (optional, date)
- `jumlahUnduhan` (number, auto-increment)
- `aktif` (boolean)

**Features**:
- File upload handler
- File size display (convert to KB/MB)
- Download counter
- Filter by kategori & tahun
- Sort by most downloaded

**Color Theme**: `cyan-600`, `from-cyan-50 to-teal-100`

---

### 🟢 LOW PRIORITY (Nice to Have)

#### 8. Potensi Desa Module (3 halaman) 🌾
**Urgency**: ⭐⭐ - Showcase content

- [ ] `/admin/potensi-desa` - List potensi
- [ ] `/admin/potensi-desa/create` - Add potensi
- [ ] `/admin/potensi-desa/edit/[id]` - Edit potensi

**Fields**:
- `judul` (required, string)
- `deskripsi` (required, text/rich text)
- `kategori` (dropdown: pertanian, perkebunan, peternakan, perikanan, industri, pariwisata, umkm)
- `gambar` (optional, URL)
- `lokasi` (optional, string)
- `kontak` (optional, string)
- `urutan` (number)
- `aktif` (boolean)

**Features**:
- Card layout dengan gambar
- Filter by kategori
- Map integration (future)

**Color Theme**: `lime-600`, `from-lime-50 to-green-100`

---

## 📊 Implementation Summary

| Priority | Modules | Pages | Estimated Time |
|----------|---------|-------|----------------|
| 🔴 HIGH | 4 | 11 | 2-3 days |
| 🟡 MEDIUM | 3 | 8 | 2 days |
| 🟢 LOW | 1 | 3 | 1 day |
| **TOTAL** | **8** | **22** | **5-6 days** |

---

## 🛠️ Technical Implementation Notes

### Pattern to Follow

Gunakan pattern yang sama dengan halaman admin yang sudah ada:

1. **List Page**: Tabel dengan search, filter, pagination
2. **Create Form**: Form dengan validasi
3. **Edit Form**: Form dengan pre-fill data

### Required Tools

- [ ] **Rich Text Editor**: TipTap atau React Quill untuk konten panjang
- [ ] **Image Upload**: Supabase Storage / Cloudinary integration
- [ ] **File Upload**: Untuk dokumen PDF
- [ ] **Drag & Drop**: react-beautiful-dnd untuk reordering
- [ ] **Date Picker**: react-datepicker untuk tanggal

### API Routes to Create

Semua CRUD operations untuk setiap modul:
- GET `/api/[module]` - List
- POST `/api/[module]` - Create
- GET `/api/[module]/[id]` - Detail
- PUT `/api/[module]/[id]` - Update
- DELETE `/api/[module]/[id]` - Delete

### Database

✅ Schema sudah dibuat di `prisma/schema.prisma`
✅ TypeScript interfaces sudah dibuat di `lib/api-client.ts`
✅ API client methods sudah dibuat

**Next Steps**:
```bash
# Run migration
npx prisma migrate dev --name add_website_content_tables

# Generate Prisma Client
npx prisma generate
```

---

## 📝 Template Checklist untuk Setiap Module

Ketika membuat module baru, pastikan:

### Backend (API Routes)
- [ ] Create GET list endpoint
- [ ] Create GET by ID endpoint
- [ ] Create POST create endpoint
- [ ] Create PUT update endpoint
- [ ] Create DELETE endpoint
- [ ] Add authentication middleware
- [ ] Add validation
- [ ] Error handling

### Frontend (Admin Pages)
- [ ] List page dengan tabel/grid
- [ ] Search functionality
- [ ] Filter by kategori/status
- [ ] Pagination
- [ ] Create form page
- [ ] Edit form page
- [ ] Delete confirmation
- [ ] Loading states
- [ ] Error handling
- [ ] Success messages
- [ ] Form validation

### Dashboard Integration
- [ ] Add widget to dashboard (if needed)
- [ ] Add navigation menu item
- [ ] Add to sidebar
- [ ] Update breadcrumbs

---

## 🎯 Sprint Planning Suggestion

### Sprint 1 (HIGH Priority - Week 1)
- Day 1-2: Hero Section + Profile Desa
- Day 3: Slider/Pengumuman
- Day 4: FAQ
- Day 5: Testing & Fixes

### Sprint 2 (MEDIUM Priority - Week 2)
- Day 1-2: Gallery + Upload handler
- Day 3: Pengaduan + Email notifications
- Day 4: Dokumen Publik + File upload
- Day 5: Testing & Integration

### Sprint 3 (LOW Priority + Polish - Week 3)
- Day 1: Potensi Desa
- Day 2-3: UI/UX improvements
- Day 4: Performance optimization
- Day 5: Final testing & documentation

---

## 🔗 Related Files

- **Schema**: `prisma/schema.prisma` ✅ Done
- **API Client**: `lib/api-client.ts` ✅ Done
- **Types**: `lib/api-client.ts` (exported) ✅ Done
- **Documentation**: `WEBSITE_CONTENT_TABLES.md` ✅ Done

---

## 💡 Quick Start

Untuk memulai implementasi:

1. **Run migration**:
   ```bash
   npx prisma migrate dev --name add_website_content_tables
   npx prisma generate
   ```

2. **Seed initial data** (optional):
   ```bash
   # Create prisma/seed-content.ts
   npx prisma db seed
   ```

3. **Start with HIGH priority**:
   - Hero Section (paling critical)
   - Profile Desa
   - Slider
   - FAQ

4. **Follow existing patterns**:
   - Check `/admin/berita` untuk reference
   - Copy structure dari module yang sudah ada
   - Adjust fields sesuai kebutuhan

---

## 📞 Questions?

Refer to:
- `ADMIN_PAGES_GUIDE.md` - Pattern & template
- `SESSION_COMPLETION_SUMMARY.md` - Current status
- `WEBSITE_CONTENT_TABLES.md` - Database schema detail

---

**Status**: 📝 Ready for implementation
**Next Action**: Run migration → Start Hero Section module

---

_Last Updated: Implementation Planning Phase_
_Total New Pages: 22 pages across 8 modules_