/*
  Warnings:

  - You are about to drop the column `created_at` on the `Keunggulan` table. All the data in the column will be lost.
  - You are about to drop the column `sdmJumlahPenduduk` on the `Keunggulan` table. All the data in the column will be lost.
  - You are about to drop the column `sdmKelompokUsaha` on the `Keunggulan` table. All the data in the column will be lost.
  - You are about to drop the column `sdmUsiaProduktif` on the `Keunggulan` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Keunggulan` table. All the data in the column will be lost.
  - Added the required column `diperbarui` to the `Keunggulan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Keunggulan" DROP COLUMN "created_at",
DROP COLUMN "sdmJumlahPenduduk",
DROP COLUMN "sdmKelompokUsaha",
DROP COLUMN "sdmUsiaProduktif",
DROP COLUMN "updated_at",
ADD COLUMN     "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "diperbarui" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sdm" JSONB,
ALTER COLUMN "deskripsiHero" DROP DEFAULT,
ALTER COLUMN "pertanian" DROP NOT NULL,
ALTER COLUMN "peternakan" DROP NOT NULL,
ALTER COLUMN "umkm" DROP NOT NULL,
ALTER COLUMN "wisata" DROP NOT NULL,
ALTER COLUMN "infrastruktur" DROP NOT NULL;
