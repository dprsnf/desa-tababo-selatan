-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "fotoProfil" TEXT,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistik" (
    "id" TEXT NOT NULL,
    "jumlahPenduduk" INTEGER NOT NULL DEFAULT 0,
    "lakiLaki" INTEGER NOT NULL DEFAULT 0,
    "perempuan" INTEGER NOT NULL DEFAULT 0,
    "jumlahKeluarga" INTEGER NOT NULL DEFAULT 0,
    "luasWilayah" TEXT NOT NULL DEFAULT '0',
    "jumlahRW" INTEGER NOT NULL DEFAULT 0,
    "jumlahRT" INTEGER NOT NULL DEFAULT 0,
    "jumlahDusun" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Statistik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KepalaDesaPerangkat" (
    "id" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "nip" TEXT,
    "tempatLahir" TEXT,
    "tanggalLahir" TIMESTAMP(3),
    "pendidikan" TEXT,
    "foto" TEXT,
    "periode" TEXT,
    "tahunMulai" INTEGER,
    "tahunSelesai" INTEGER,
    "visi" TEXT,
    "misi" JSONB,
    "prestasi" TEXT,
    "programUnggulan" JSONB,
    "namaDusun" TEXT,
    "sedangMenjabat" BOOLEAN NOT NULL DEFAULT false,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KepalaDesaPerangkat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Berita" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ringkasan" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "gambarUtama" TEXT,
    "kategori" TEXT NOT NULL,
    "tags" JSONB,
    "penulis" TEXT NOT NULL,
    "penulis_id" TEXT,
    "dilihat" INTEGER NOT NULL DEFAULT 0,
    "terbit" BOOLEAN NOT NULL DEFAULT false,
    "tanggalTerbit" TIMESTAMP(3),
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pertanggungjawaban" (
    "id" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "jenis" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "periode" TEXT,
    "anggaranTotal" DOUBLE PRECISION,
    "realisasiTotal" DOUBLE PRECISION,
    "persentase" DOUBLE PRECISION,
    "rincianAnggaran" JSONB,
    "rincianRealisasi" JSONB,
    "dokumen" JSONB,
    "terbit" BOOLEAN NOT NULL DEFAULT false,
    "tanggalTerbit" TIMESTAMP(3),
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pertanggungjawaban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "namaProgram" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "sumberDana" TEXT,
    "anggaran" DOUBLE PRECISION,
    "realisasi" DOUBLE PRECISION,
    "status" TEXT NOT NULL,
    "tanggalMulai" TIMESTAMP(3) NOT NULL,
    "tanggalSelesai" TIMESTAMP(3),
    "lokasiKegiatan" TEXT,
    "penanggungJawab" TEXT,
    "targetPenerima" TEXT,
    "galeri" JSONB,
    "terbit" BOOLEAN NOT NULL DEFAULT true,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Layanan" (
    "id" TEXT NOT NULL,
    "namaLayanan" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "persyaratan" JSONB NOT NULL,
    "prosedur" JSONB NOT NULL,
    "biaya" TEXT,
    "waktuPenyelesaian" TEXT NOT NULL,
    "kontak" TEXT,
    "formulir" TEXT,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Layanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "namaFile" TEXT NOT NULL,
    "namaAsli" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "path" TEXT,
    "jenisMedia" TEXT NOT NULL,
    "ukuranFile" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "kategori" TEXT,
    "deskripsi" TEXT,
    "diuploadOleh" TEXT,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengaturan" (
    "id" TEXT NOT NULL,
    "namaSitus" TEXT NOT NULL DEFAULT 'Desa Tababo Selatan',
    "tagline" TEXT,
    "deskripsiSitus" TEXT NOT NULL,
    "logo" TEXT,
    "favicon" TEXT,
    "alamatKantor" TEXT NOT NULL,
    "kodePos" TEXT,
    "emailKontak" TEXT,
    "teleponKontak" TEXT,
    "faxKontak" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "youtube" TEXT,
    "jamOperasional" TEXT,
    "jamIstirahat" TEXT,
    "latlong" TEXT,
    "urlPeta" TEXT,
    "metaKeywords" TEXT,
    "metaDescription" TEXT,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pengaturan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "KepalaDesaPerangkat_jabatan_idx" ON "KepalaDesaPerangkat"("jabatan");

-- CreateIndex
CREATE INDEX "KepalaDesaPerangkat_sedangMenjabat_idx" ON "KepalaDesaPerangkat"("sedangMenjabat");

-- CreateIndex
CREATE UNIQUE INDEX "Berita_slug_key" ON "Berita"("slug");

-- CreateIndex
CREATE INDEX "Berita_slug_idx" ON "Berita"("slug");

-- CreateIndex
CREATE INDEX "Berita_kategori_idx" ON "Berita"("kategori");

-- CreateIndex
CREATE INDEX "Berita_terbit_idx" ON "Berita"("terbit");

-- CreateIndex
CREATE INDEX "Berita_tanggalTerbit_idx" ON "Berita"("tanggalTerbit");

-- CreateIndex
CREATE INDEX "Pertanggungjawaban_tahun_idx" ON "Pertanggungjawaban"("tahun");

-- CreateIndex
CREATE INDEX "Pertanggungjawaban_jenis_idx" ON "Pertanggungjawaban"("jenis");

-- CreateIndex
CREATE INDEX "Pertanggungjawaban_terbit_idx" ON "Pertanggungjawaban"("terbit");

-- CreateIndex
CREATE UNIQUE INDEX "Program_slug_key" ON "Program"("slug");

-- CreateIndex
CREATE INDEX "Program_slug_idx" ON "Program"("slug");

-- CreateIndex
CREATE INDEX "Program_kategori_idx" ON "Program"("kategori");

-- CreateIndex
CREATE INDEX "Program_status_idx" ON "Program"("status");

-- CreateIndex
CREATE INDEX "Program_tanggalMulai_idx" ON "Program"("tanggalMulai");

-- CreateIndex
CREATE UNIQUE INDEX "Layanan_slug_key" ON "Layanan"("slug");

-- CreateIndex
CREATE INDEX "Layanan_slug_idx" ON "Layanan"("slug");

-- CreateIndex
CREATE INDEX "Layanan_aktif_idx" ON "Layanan"("aktif");

-- CreateIndex
CREATE INDEX "Media_jenisMedia_idx" ON "Media"("jenisMedia");

-- CreateIndex
CREATE INDEX "Media_kategori_idx" ON "Media"("kategori");
