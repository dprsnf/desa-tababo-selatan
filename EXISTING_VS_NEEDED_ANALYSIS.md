# 📊 Analisis: Halaman yang Sudah Ada vs Yang Perlu Dibuat

## 🎯 Tujuan Dokumen
Dokumen ini mencegah duplikasi pekerjaan dengan memetakan halaman admin yang **sudah ada** vs halaman yang **benar-benar perlu dibuat baru**.

---

## ✅ HALAMAN YANG SUDAH ADA

### 1. **Admin Core Pages** (Already Functional)

#### `/admin/dashboard` ✅
- Dashboard utama dengan statistik
- Menu cards ke semua halaman
- Welcome section
- **Status**: Fully functional

#### `/admin/login` ✅
- Login page untuk admin
- Authentication flow
- **Status**: Fully functional

---

### 2. **Content Management - Single Page Editors** (Already Built)

#### `/admin/edit/beranda` ✅
**Mengelola:**
- Hero Section (title, subtitle, location, background image)
- Statistik Desa (4 stats cards)
- Berita & Kegiatan preview

**Note**: ⚠️ Saat ini menggunakan **state lokal**, belum tersimpan ke database!

#### `/admin/edit/sejarah` ✅
**Mengelola:**
- Judul & deskripsi hero
- Asal usul desa
- Timeline sejarah
- Budaya lokal (upacara, tarian, kuliner, kerajinan)
- Tokoh penting

**Note**: ⚠️ State lokal, perlu integrasi database

#### `/admin/edit/keunggulan` ✅
**Mengelola:**
- Keunggulan pertanian
- Peternakan
- UMKM
- Wisata
- SDM
- Infrastruktur

**Note**: ⚠️ State lokal, perlu integrasi database

#### `/admin/edit/kepala-desa` ✅
**Mengelola:**
- Profil kepala desa
- Foto, nama, periode
- Visi & Misi
- Program unggulan

**Note**: ⚠️ State lokal, perlu integrasi database

#### `/admin/edit/struktur-organisasi` ✅
**Mengelola:**
- Struktur organisasi pemerintah desa
- Jabatan & nama perangkat

**Note**: ⚠️ State lokal, perlu integrasi database

#### `/admin/edit/pertanggungjawaban` ✅
**Mengelola:**
- Laporan pertanggungjawaban
- Dokumen keuangan

**Note**: ⚠️ State lokal, perlu integrasi database

---

### 3. **CRUD Modules** (Already Built with Database)

#### `/admin/berita` ✅
- List, Create, Edit pages
- Full CRUD operations
- Search & filter
- **Status**: Fully integrated with database
- **API**: `/api/berita` ✅

#### `/admin/program` ✅
- List, Create, Edit pages
- Program & kegiatan desa
- **Status**: Fully integrated with database
- **API**: `/api/program` ✅

#### `/admin/perangkat` ✅
- List, Create, Edit pages (Edit baru ditambahkan)
- Data perangkat desa
- **Status**: Fully integrated with database
- **API**: `/api/perangkat` ✅

#### `/admin/layanan` ✅
- List, Create, Edit pages
- Layanan administrasi desa
- **Status**: Fully integrated with database
- **API**: `/api/layanan` ✅

#### `/admin/pertanggungjawaban` ✅
- List, Create, Edit pages
- Laporan keuangan
- **Status**: Fully integrated with database
- **API**: `/api/pertanggungjawaban` ✅

---

### 4. **Settings Pages**

#### `/admin/pengaturan` ✅
- Pengaturan umum website
- **Status**: Functional

#### `/admin/statistik` ✅
- Edit statistik desa
- **Status**: Functional
- **API**: `/api/statistik` ✅

---

## ❌ HALAMAN YANG BENAR-BENAR PERLU DIBUAT

### 1. **Gallery Module** 🖼️ (PERLU DIBUAT)
**Priority**: 🟡 MEDIUM

**Pages Needed:**
- [ ] `/admin/gallery` - List gallery with grid view
- [ ] `/admin/gallery/create` - Upload photo
- [ ] `/admin/gallery/edit/[id]` - Edit photo info

**Features:**
- Grid layout dengan preview
- Filter by kategori (kegiatan, infrastruktur, acara, umum)
- Tags untuk filtering
- Upload gambar
- Toggle tampil di home

**Database Table**: `Gallery` ✅ (schema ready)

---

### 2. **FAQ Module** ❓ (PERLU DIBUAT)
**Priority**: 🔴 HIGH

**Pages Needed:**
- [ ] `/admin/faq` - List FAQ
- [ ] `/admin/faq/create` - Add FAQ
- [ ] `/admin/faq/edit/[id]` - Edit FAQ

**Features:**
- List dengan grup per kategori
- Rich text editor untuk jawaban
- Drag & drop reorder
- Kategori: umum, layanan, prosedur

**Database Table**: `FAQ` ✅ (schema ready)

---

### 3. **Slider/Pengumuman Module** 📢 (PERLU DIBUAT)
**Priority**: 🔴 HIGH

**Pages Needed:**
- [ ] `/admin/slider` - List pengumuman
- [ ] `/admin/slider/create` - Add announcement
- [ ] `/admin/slider/edit/[id]` - Edit announcement

**Features:**
- Pengumuman berjalan (running text/slider)
- Tipe: info, warning, success, announcement
- Tanggal mulai & selesai (auto-hide)
- Urutan & aktif/nonaktif

**Database Table**: `Slider` ✅ (schema ready)

---

### 4. **Pengaduan Module** 💬 (PERLU DIBUAT)
**Priority**: 🟡 MEDIUM

**Pages Needed:**
- [ ] `/admin/pengaduan` - List all pengaduan (with filters)
- [ ] `/admin/pengaduan/detail/[id]` - View & respond

**Features:**
- Filter by status, kategori, prioritas
- Status workflow: baru → diproses → selesai → ditolak
- Priority badges
- Admin response field
- Dashboard widget for "pengaduan baru"

**Database Table**: `Pengaduan` ✅ (schema ready)

**Note**: Public form akan dibuat di frontend (bukan admin)

---

### 5. **Dokumen Publik Module** 📎 (PERLU DIBUAT)
**Priority**: 🟡 MEDIUM

**Pages Needed:**
- [ ] `/admin/dokumen` - List documents
- [ ] `/admin/dokumen/create` - Upload document
- [ ] `/admin/dokumen/edit/[id]` - Edit document info

**Features:**
- File upload (PDF, DOC, XLS)
- Kategori: peraturan, sk, sop, formulir, laporan, lainnya
- Filter by kategori & tahun
- Download counter
- Nomor dokumen (untuk SK/Peraturan)

**Database Table**: `DokumenPublik` ✅ (schema ready)

---

### 6. **Potensi Desa Module** 🌾 (PERLU DIBUAT)
**Priority**: 🟢 LOW

**Pages Needed:**
- [ ] `/admin/potensi-desa` - List potensi
- [ ] `/admin/potensi-desa/create` - Add potensi
- [ ] `/admin/potensi-desa/edit/[id]` - Edit potensi

**Features:**
- Showcase potensi ekonomi desa
- Kategori: pertanian, perkebunan, peternakan, perikanan, industri, pariwisata, umkm
- Card layout dengan gambar
- Lokasi & kontak

**Database Table**: `PotensiDesa` ✅ (schema ready)

---

## 🔄 HALAMAN YANG PERLU INTEGRASI DATABASE

Halaman-halaman ini **sudah ada UI-nya**, tapi masih menggunakan **state lokal**. Perlu integrasi dengan database:

### 1. `/admin/edit/beranda` - Hero Section
**Action Needed**: 
- Buat API `/api/beranda` atau gunakan tabel yang sudah ada
- Simpan hero title, subtitle, location, stats ke database
- Load data dari database saat page load

**Database Table Options**:
- Gunakan tabel `HeroSection` yang sudah ada? ✅
- Atau buat tabel khusus `Beranda`?

---

### 2. `/admin/edit/sejarah` - Sejarah Desa
**Action Needed**:
- Buat API `/api/sejarah`
- Simpan timeline, budaya, tokoh ke database
- Rich text editor untuk konten

**Database Table Options**:
- Gunakan tabel `ProfileDesa` dengan section="sejarah"? ✅
- Atau buat tabel khusus `Sejarah`?

---

### 3. `/admin/edit/keunggulan` - Keunggulan Desa
**Action Needed**:
- Buat API `/api/keunggulan`
- Simpan data pertanian, UMKM, wisata ke database

**Database Table Options**:
- Gunakan tabel `PotensiDesa` yang sudah ada? ✅
- Atau buat tabel khusus `Keunggulan`?

---

### 4. `/admin/edit/kepala-desa` - Profil Kepala Desa
**Action Needed**:
- Sudah ada tabel `Perangkat` dengan jabatan="kepala_desa"
- Perlu API khusus atau gunakan `/api/perangkat`?

---

### 5. `/admin/edit/struktur-organisasi` - Struktur Organisasi
**Action Needed**:
- Sudah ada tabel `Perangkat`
- Load semua perangkat dan tampilkan dalam struktur

---

## 📊 SUMMARY

### Already Built (Functional with Database): 7 modules
1. ✅ Berita
2. ✅ Program
3. ✅ Perangkat
4. ✅ Layanan
5. ✅ Pertanggungjawaban (CRUD)
6. ✅ Statistik
7. ✅ Pengaturan

### Already Built (UI only, need DB integration): 6 pages
1. ⚠️ `/admin/edit/beranda`
2. ⚠️ `/admin/edit/sejarah`
3. ⚠️ `/admin/edit/keunggulan`
4. ⚠️ `/admin/edit/kepala-desa`
5. ⚠️ `/admin/edit/struktur-organisasi`
6. ⚠️ `/admin/edit/pertanggungjawaban` (single page editor)

### Need to Build from Scratch: 6 modules (17 pages)
1. ❌ Gallery (3 pages) - MEDIUM
2. ❌ FAQ (3 pages) - HIGH
3. ❌ Slider (3 pages) - HIGH
4. ❌ Pengaduan (2 pages) - MEDIUM
5. ❌ Dokumen Publik (3 pages) - MEDIUM
6. ❌ Potensi Desa (3 pages) - LOW

---

## 🎯 PRIORITY ROADMAP

### Phase 1: HIGH Priority (Database Integration)
**Goal**: Make existing pages functional with database

1. **Integrate `/admin/edit/beranda`** with `HeroSection` table
   - API: POST/GET/PUT `/api/beranda`
   - Load hero data from DB
   - Save changes to DB

2. **Build FAQ Module** (HIGH priority for user support)
   - 3 new pages
   - Full CRUD
   - Rich text editor

3. **Build Slider Module** (HIGH priority for announcements)
   - 3 new pages
   - Auto-hide based on dates
   - Running text on homepage

### Phase 2: MEDIUM Priority (New Modules)
**Goal**: Add engagement & transparency features

4. **Build Gallery Module**
   - 3 new pages
   - Image upload handler
   - Grid view with filters

5. **Build Pengaduan Module**
   - 2 new pages
   - Status workflow
   - Dashboard widget

6. **Build Dokumen Publik Module**
   - 3 new pages
   - File upload
   - Download counter

7. **Integrate `/admin/edit/sejarah`** with `ProfileDesa` table
8. **Integrate `/admin/edit/keunggulan`** with `PotensiDesa` table

### Phase 3: LOW Priority (Enhancement)
**Goal**: Showcase village potential

9. **Build Potensi Desa Module**
   - 3 new pages
   - Economic showcase
   - Map integration (future)

---

## ⚠️ LESSONS LEARNED

### Before Creating New Pages, ALWAYS CHECK:
1. ✅ **Check `/app/admin/edit/` folder** - Single page editors
2. ✅ **Check `/app/admin/` folder** - CRUD modules
3. ✅ **Check dashboard menu items** - What's already linked
4. ✅ **Check API routes** - What's already integrated
5. ✅ **Check Prisma schema** - What tables exist
6. ✅ **Read previous session docs** - What was already built

### Integration vs New Build Decision Tree:
```
Is there a UI page for this? 
├─ YES → Does it save to database?
│  ├─ YES → ✅ Already done! Use it.
│  └─ NO → ⚠️ Add database integration
└─ NO → Does schema table exist?
   ├─ YES → ❌ Build the admin pages
   └─ NO → 🔴 ERROR: Schema should exist first
```

---

## 📁 File Organization

### Current Structure:
```
app/admin/
├── edit/                    # Single-page editors (mostly need DB integration)
│   ├── beranda/            ⚠️ Need DB
│   ├── sejarah/            ⚠️ Need DB
│   ├── keunggulan/         ⚠️ Need DB
│   ├── kepala-desa/        ⚠️ Need DB
│   ├── struktur-organisasi/ ⚠️ Already uses Perangkat?
│   └── pertanggungjawaban/  ⚠️ Need DB
│
├── berita/                  ✅ Full CRUD with DB
├── program/                 ✅ Full CRUD with DB
├── perangkat/               ✅ Full CRUD with DB
├── layanan/                 ✅ Full CRUD with DB
├── pertanggungjawaban/      ✅ Full CRUD with DB
├── pengaturan/              ✅ Settings
└── statistik/               ✅ Stats editor
```

### To Be Added:
```
app/admin/
├── gallery/                 ❌ TODO
├── faq/                     ❌ TODO
├── slider/                  ❌ TODO
├── pengaduan/               ❌ TODO
├── dokumen/                 ❌ TODO
└── potensi-desa/            ❌ TODO
```

---

## 🚀 Next Actions

### Immediate (This Session):
1. ✅ Delete redundant Hero Section pages (DONE)
2. ✅ Create this analysis document (DONE)
3. ⏳ Choose next module to build from the "Need to Build" list

### Recommended Order:
1. **FAQ Module** (HIGH, simple CRUD)
2. **Slider Module** (HIGH, simple CRUD)
3. **Gallery Module** (MEDIUM, needs upload handler)
4. **Pengaduan Module** (MEDIUM, needs workflow)
5. **Dokumen Publik Module** (MEDIUM, needs file upload)
6. **Potensi Desa Module** (LOW)

Then integrate existing edit pages with database.

---

**Status**: ✅ Analysis Complete
**Total Pages to Build**: 17 pages (6 modules)
**Total Pages to Integrate**: 6 pages with existing UI
**Estimated Time**: 4-5 days for all modules

---

_Last Updated: After Hero Section deletion_
_Purpose: Prevent duplication & guide future development_
_Always check this document before creating new pages!_