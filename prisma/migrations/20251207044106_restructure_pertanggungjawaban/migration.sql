/*
  Warnings:

  - You are about to drop the `Keunggulan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sejarah` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimelineSejarah` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Keunggulan";

-- DropTable
DROP TABLE "Sejarah";

-- DropTable
DROP TABLE "TimelineSejarah";

-- CreateTable
CREATE TABLE "HalamanPertanggungjawaban" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL DEFAULT 'Pertanggungjawaban Desa',
    "konten" TEXT NOT NULL,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HalamanPertanggungjawaban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APBDes" (
    "id" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "totalAnggaran" DOUBLE PRECISION NOT NULL,
    "pendapatan" DOUBLE PRECISION NOT NULL,
    "belanja" DOUBLE PRECISION NOT NULL,
    "pembiayaan" DOUBLE PRECISION NOT NULL,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "APBDes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealisasiAPBDes" (
    "id" TEXT NOT NULL,
    "apbdesId" TEXT NOT NULL,
    "uraian" TEXT NOT NULL,
    "anggaran" DOUBLE PRECISION NOT NULL,
    "realisasi" DOUBLE PRECISION NOT NULL,
    "persentase" DOUBLE PRECISION NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RealisasiAPBDes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramBidang" (
    "id" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "bidang" TEXT NOT NULL,
    "kegiatan" JSONB NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramBidang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DokumenPertanggungjawaban" (
    "id" TEXT NOT NULL,
    "apbdesId" TEXT,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "fileUrl" TEXT NOT NULL,
    "namaFile" TEXT NOT NULL,
    "ukuranFile" INTEGER,
    "tipeFile" TEXT,
    "kategori" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "jumlahUnduhan" INTEGER NOT NULL DEFAULT 0,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbarui" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DokumenPertanggungjawaban_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "APBDes_tahun_key" ON "APBDes"("tahun");

-- CreateIndex
CREATE INDEX "APBDes_tahun_idx" ON "APBDes"("tahun");

-- CreateIndex
CREATE INDEX "APBDes_aktif_idx" ON "APBDes"("aktif");

-- CreateIndex
CREATE INDEX "RealisasiAPBDes_apbdesId_idx" ON "RealisasiAPBDes"("apbdesId");

-- CreateIndex
CREATE INDEX "RealisasiAPBDes_urutan_idx" ON "RealisasiAPBDes"("urutan");

-- CreateIndex
CREATE INDEX "ProgramBidang_tahun_idx" ON "ProgramBidang"("tahun");

-- CreateIndex
CREATE INDEX "ProgramBidang_aktif_idx" ON "ProgramBidang"("aktif");

-- CreateIndex
CREATE INDEX "ProgramBidang_urutan_idx" ON "ProgramBidang"("urutan");

-- CreateIndex
CREATE INDEX "DokumenPertanggungjawaban_apbdesId_idx" ON "DokumenPertanggungjawaban"("apbdesId");

-- CreateIndex
CREATE INDEX "DokumenPertanggungjawaban_tahun_idx" ON "DokumenPertanggungjawaban"("tahun");

-- CreateIndex
CREATE INDEX "DokumenPertanggungjawaban_kategori_idx" ON "DokumenPertanggungjawaban"("kategori");

-- CreateIndex
CREATE INDEX "DokumenPertanggungjawaban_aktif_idx" ON "DokumenPertanggungjawaban"("aktif");

-- AddForeignKey
ALTER TABLE "RealisasiAPBDes" ADD CONSTRAINT "RealisasiAPBDes_apbdesId_fkey" FOREIGN KEY ("apbdesId") REFERENCES "APBDes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DokumenPertanggungjawaban" ADD CONSTRAINT "DokumenPertanggungjawaban_apbdesId_fkey" FOREIGN KEY ("apbdesId") REFERENCES "APBDes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
