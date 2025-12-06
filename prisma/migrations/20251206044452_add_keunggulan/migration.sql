-- CreateTable
CREATE TABLE "Sejarah" (
    "id" TEXT NOT NULL,
    "judulUtama" TEXT NOT NULL DEFAULT 'Sejarah Desa Tababo Selatan',
    "deskripsi" TEXT NOT NULL,
    "judulAsalUsul" TEXT NOT NULL DEFAULT 'Asal Usul Desa',
    "kontenAsalUsul" TEXT NOT NULL,
    "judulBudaya" TEXT NOT NULL DEFAULT 'Budaya dan Tradisi',
    "kontenBudaya" TEXT NOT NULL,
    "judulTokoh" TEXT NOT NULL DEFAULT 'Tokoh Penting dalam Sejarah Desa',
    "kontenTokoh" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sejarah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimelineSejarah" (
    "id" TEXT NOT NULL,
    "tahun" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimelineSejarah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keunggulan" (
    "id" TEXT NOT NULL,
    "judulUtama" TEXT NOT NULL DEFAULT 'Keunggulan Desa Tababo Selatan',
    "deskripsiHero" TEXT NOT NULL DEFAULT 'Desa yang Kaya Akan Potensi',
    "pertanian" JSONB NOT NULL,
    "peternakan" JSONB NOT NULL,
    "umkm" JSONB NOT NULL,
    "wisata" JSONB NOT NULL,
    "infrastruktur" JSONB NOT NULL,
    "sdmJumlahPenduduk" TEXT NOT NULL DEFAULT '2,500+',
    "sdmUsiaProduktif" TEXT NOT NULL DEFAULT '85%',
    "sdmKelompokUsaha" TEXT NOT NULL DEFAULT '50+',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Keunggulan_pkey" PRIMARY KEY ("id")
);
