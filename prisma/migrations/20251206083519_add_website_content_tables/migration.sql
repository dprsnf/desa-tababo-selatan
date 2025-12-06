-- CreateTable
CREATE TABLE "HeroSection" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "subjudul" TEXT,
    "deskripsi" TEXT,
    "gambar" TEXT NOT NULL,
    "tombolText" TEXT,
    "tombolUrl" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileDesa" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL DEFAULT 'Profil Desa',
    "konten" TEXT NOT NULL,
    "gambar" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "section" TEXT NOT NULL DEFAULT 'tentang',
    "visi" TEXT,
    "misi" JSONB,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileDesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "gambar" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "tags" JSONB,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "tampilHome" BOOLEAN NOT NULL DEFAULT false,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "pertanyaan" TEXT NOT NULL,
    "jawaban" TEXT NOT NULL,
    "kategori" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slider" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT,
    "gambar" TEXT,
    "link" TEXT,
    "tipe" TEXT NOT NULL DEFAULT 'info',
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "tanggalMulai" TIMESTAMP(3),
    "tanggalSelesai" TIMESTAMP(3),
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Slider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengaduan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT,
    "telepon" TEXT,
    "subjek" TEXT NOT NULL,
    "pesan" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'baru',
    "prioritas" TEXT NOT NULL DEFAULT 'normal',
    "tanggapan" TEXT,
    "ditanggapiOleh" TEXT,
    "tanggalTanggap" TIMESTAMP(3),
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pengaduan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DokumenPublik" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "namaFile" TEXT NOT NULL,
    "urlFile" TEXT NOT NULL,
    "ukuranFile" INTEGER,
    "kategori" TEXT NOT NULL,
    "tahun" INTEGER,
    "nomorDokumen" TEXT,
    "tanggalTerbit" TIMESTAMP(3),
    "jumlahUnduhan" INTEGER NOT NULL DEFAULT 0,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DokumenPublik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotensiDesa" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "gambar" TEXT,
    "lokasi" TEXT,
    "kontak" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PotensiDesa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HeroSection_aktif_idx" ON "HeroSection"("aktif");

-- CreateIndex
CREATE INDEX "HeroSection_urutan_idx" ON "HeroSection"("urutan");

-- CreateIndex
CREATE INDEX "ProfileDesa_section_idx" ON "ProfileDesa"("section");

-- CreateIndex
CREATE INDEX "ProfileDesa_aktif_idx" ON "ProfileDesa"("aktif");

-- CreateIndex
CREATE INDEX "Gallery_kategori_idx" ON "Gallery"("kategori");

-- CreateIndex
CREATE INDEX "Gallery_tampilHome_idx" ON "Gallery"("tampilHome");

-- CreateIndex
CREATE INDEX "FAQ_kategori_idx" ON "FAQ"("kategori");

-- CreateIndex
CREATE INDEX "FAQ_aktif_idx" ON "FAQ"("aktif");

-- CreateIndex
CREATE INDEX "Slider_aktif_idx" ON "Slider"("aktif");

-- CreateIndex
CREATE INDEX "Slider_urutan_idx" ON "Slider"("urutan");

-- CreateIndex
CREATE INDEX "Slider_tanggalMulai_idx" ON "Slider"("tanggalMulai");

-- CreateIndex
CREATE INDEX "Slider_tanggalSelesai_idx" ON "Slider"("tanggalSelesai");

-- CreateIndex
CREATE INDEX "Pengaduan_status_idx" ON "Pengaduan"("status");

-- CreateIndex
CREATE INDEX "Pengaduan_kategori_idx" ON "Pengaduan"("kategori");

-- CreateIndex
CREATE INDEX "Pengaduan_prioritas_idx" ON "Pengaduan"("prioritas");

-- CreateIndex
CREATE INDEX "Pengaduan_dibuat_idx" ON "Pengaduan"("dibuat");

-- CreateIndex
CREATE INDEX "DokumenPublik_kategori_idx" ON "DokumenPublik"("kategori");

-- CreateIndex
CREATE INDEX "DokumenPublik_tahun_idx" ON "DokumenPublik"("tahun");

-- CreateIndex
CREATE INDEX "DokumenPublik_aktif_idx" ON "DokumenPublik"("aktif");

-- CreateIndex
CREATE INDEX "PotensiDesa_kategori_idx" ON "PotensiDesa"("kategori");

-- CreateIndex
CREATE INDEX "PotensiDesa_aktif_idx" ON "PotensiDesa"("aktif");
