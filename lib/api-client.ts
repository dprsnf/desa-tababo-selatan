const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface BeritaData {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  konten: string;
  gambarUtama?: string;
  kategori: string;
  penulis: string;
  terbit: boolean;
  dilihat: number;
  tags?: unknown;
  tanggalTerbit?: string | null;
  dibuat: string;
  diperbarui: string;
}

interface StatistikData {
  jumlahPenduduk: number;
  lakiLaki: number;
  perempuan: number;
  jumlahKeluarga: number;
  luasWilayah: string;
  jumlahRW: number;
  jumlahRT: number;
  jumlahDusun: number;
}

interface ProgramData {
  id: string;
  namaProgram: string;
  slug: string;
  deskripsi: string;
  kategori: string;
  sumberDana?: string;
  anggaran?: number;
  realisasi?: number;
  status: string;
  tanggalMulai: string;
  tanggalSelesai?: string | null;
  lokasiKegiatan?: string;
  penanggungJawab?: string;
  targetPenerima?: string;
  galeri?: unknown;
  terbit: boolean;
  dibuat: string;
  diperbarui: string;
}

interface PerangkatData {
  id: string;
  namaLengkap: string;
  jabatan: string;
  nip?: string;
  tempatLahir?: string;
  tanggalLahir?: string | null;
  pendidikan?: string;
  foto?: string;
  periode?: string;
  tahunMulai?: number;
  tahunSelesai?: number;
  visi?: string;
  misi?: unknown;
  prestasi?: unknown;
  programUnggulan?: unknown;
  namaDusun?: string;
  sedangMenjabat: boolean;
  urutan: number;
  dibuat: string;
  diperbarui: string;
}

interface LayananData {
  id: string;
  namaLayanan: string;
  slug: string;
  deskripsi: string;
  kategori: string;
  persyaratan?: unknown;
  prosedur?: string;
  waktuPenyelesaian?: string;
  biaya?: string;
  kontak?: string;
  jamPelayanan?: string;
  lokasiPelayanan?: string;
  downloadBerkas?: unknown;
  icon?: string;
  aktif: boolean;
  terbit: boolean;
  dibuat: string;
  diperbarui: string;
}

interface PertanggungjawabanData {
  id: string;
  judul: string;
  slug: string;
  tahunAnggaran: number;
  jenisDokumen: string;
  kategori?: string;
  ringkasan?: string;
  fileDokumen?: string;
  tanggalUpload: string;
  terbit: boolean;
  dibuat: string;
  diperbarui: string;
}

interface HeroSectionData {
  id: string;
  judul: string;
  subjudul?: string;
  deskripsi?: string;
  gambar: string;
  tombolText?: string;
  tombolUrl?: string;
  urutan: number;
  aktif: boolean;
  dibuat: string;
  diperbarui: string;
}

interface ProfileDesaData {
  id: string;
  judul: string;
  konten: string;
  gambar?: string;
  urutan: number;
  section: string;
  visi?: string;
  misi?: unknown;
  aktif: boolean;
  dibuat: string;
  diperbarui: string;
}

interface GalleryData {
  id: string;
  judul: string;
  deskripsi?: string;
  gambar: string;
  kategori: string;
  tags?: unknown;
  urutan: number;
  tampilHome: boolean;
  dibuat: string;
  diperbarui: string;
}

interface FAQData {
  id: string;
  pertanyaan: string;
  jawaban: string;
  kategori?: string;
  urutan: number;
  aktif: boolean;
  dibuat: string;
  diperbarui: string;
}

interface SliderData {
  id: string;
  judul: string;
  konten?: string;
  gambar?: string;
  link?: string;
  tipe: string;
  urutan: number;
  aktif: boolean;
  tanggalMulai?: string;
  tanggalSelesai?: string;
  dibuat: string;
  diperbarui: string;
}

interface PengaduanData {
  id: string;
  nama: string;
  email?: string;
  telepon?: string;
  subjek: string;
  pesan: string;
  kategori: string;
  status: string;
  prioritas: string;
  tanggapan?: string;
  ditanggapiOleh?: string;
  tanggalTanggap?: string;
  dibuat: string;
  diperbarui: string;
}

interface DokumenPublikData {
  id: string;
  judul: string;
  deskripsi?: string;
  namaFile: string;
  urlFile: string;
  ukuranFile?: number;
  kategori: string;
  tahun?: number;
  nomorDokumen?: string;
  tanggalTerbit?: string;
  jumlahUnduhan: number;
  aktif: boolean;
  dibuat: string;
  diperbarui: string;
}

interface PotensiDesaData {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  gambar?: string;
  lokasi?: string;
  kontak?: string;
  urutan: number;
  aktif: boolean;
  dibuat: string;
  diperbarui: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  namaLengkap: string;
  role: string;
  fotoProfil?: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface MeResponse {
  user: User;
}

class ApiClient {
  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return headers;
  }

  public getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminToken");
    }
    return null;
  }

  setToken(token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("adminToken", token);
    }
  }

  removeToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
    }
  }

  async request<T = unknown>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...this.getHeaders(false),
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Terjadi kesalahan");
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async login(
    username: string,
    password: string,
  ): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async getMe(): Promise<ApiResponse<MeResponse>> {
    return this.request<MeResponse>("/auth/me", {
      headers: this.getHeaders(true),
    });
  }

  async logout() {
    this.removeToken();
  }

  async getBerita(params?: {
    page?: number;
    limit?: number;
    kategori?: string;
    terbit?: boolean;
    search?: string;
  }): Promise<ApiResponse<BeritaData[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.kategori) queryParams.append("kategori", params.kategori);
    if (params?.terbit !== undefined)
      queryParams.append("terbit", params.terbit.toString());
    if (params?.search) queryParams.append("search", params.search);

    return this.request<BeritaData[]>(`/berita?${queryParams.toString()}`);
  }

  async getBeritaById(id: string): Promise<ApiResponse<BeritaData>> {
    return this.request<BeritaData>(`/berita/${id}`);
  }

  async createBerita(
    data: Partial<BeritaData>,
  ): Promise<ApiResponse<BeritaData>> {
    return this.request<BeritaData>("/berita", {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async updateBerita(
    id: string,
    data: Partial<BeritaData>,
  ): Promise<ApiResponse<BeritaData>> {
    return this.request<BeritaData>(`/berita/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async deleteBerita(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/berita/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  async getStatistik(): Promise<ApiResponse<StatistikData>> {
    return this.request<StatistikData>("/statistik");
  }

  async updateStatistik(
    data: Partial<StatistikData>,
  ): Promise<ApiResponse<StatistikData>> {
    return this.request<StatistikData>("/statistik", {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async getPengaturan(): Promise<ApiResponse<Record<string, unknown>>> {
    return this.request<Record<string, unknown>>("/pengaturan");
  }

  async updatePengaturan(
    data: Record<string, unknown>,
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return this.request<Record<string, unknown>>("/pengaturan", {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  // Hero Section
  async getHeroSection(params?: {
    aktif?: boolean;
    search?: string;
  }): Promise<ApiResponse<HeroSectionData[]>> {
    const query = new URLSearchParams();
    if (params?.aktif !== undefined)
      query.append("aktif", String(params.aktif));
    if (params?.search) query.append("search", params.search);
    return this.request<HeroSectionData[]>(`/hero-section?${query}`);
  }

  async getHeroSectionById(id: string): Promise<ApiResponse<HeroSectionData>> {
    return this.request<HeroSectionData>(`/hero-section/${id}`);
  }

  async createHeroSection(
    data: Partial<HeroSectionData>,
  ): Promise<ApiResponse<HeroSectionData>> {
    return this.request<HeroSectionData>("/hero-section", {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async updateHeroSection(
    id: string,
    data: Partial<HeroSectionData>,
  ): Promise<ApiResponse<HeroSectionData>> {
    return this.request<HeroSectionData>(`/hero-section/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async deleteHeroSection(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/hero-section/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  // Profile Desa
  async getProfileDesa(params?: {
    section?: string;
    aktif?: boolean;
  }): Promise<ApiResponse<ProfileDesaData[]>> {
    const query = new URLSearchParams();
    if (params?.section) query.append("section", params.section);
    if (params?.aktif !== undefined)
      query.append("aktif", String(params.aktif));
    return this.request<ProfileDesaData[]>(`/profil-desa?${query}`);
  }

  async getProfileDesaById(id: string): Promise<ApiResponse<ProfileDesaData>> {
    return this.request<ProfileDesaData>(`/profil-desa/${id}`);
  }

  async createProfileDesa(
    data: Partial<ProfileDesaData>,
  ): Promise<ApiResponse<ProfileDesaData>> {
    return this.request<ProfileDesaData>("/profil-desa", {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async updateProfileDesa(
    id: string,
    data: Partial<ProfileDesaData>,
  ): Promise<ApiResponse<ProfileDesaData>> {
    return this.request<ProfileDesaData>(`/profil-desa/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async deleteProfileDesa(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/profil-desa/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  // Gallery
  async getGallery(params?: {
    kategori?: string;
    tampilHome?: boolean;
  }): Promise<ApiResponse<GalleryData[]>> {
    const query = new URLSearchParams();
    if (params?.kategori) query.append("kategori", params.kategori);
    if (params?.tampilHome !== undefined)
      query.append("tampilHome", String(params.tampilHome));
    return this.request<GalleryData[]>(`/gallery?${query}`);
  }

  async getGalleryById(id: string): Promise<ApiResponse<GalleryData>> {
    return this.request<GalleryData>(`/gallery/${id}`);
  }

  async createGallery(
    data: Partial<GalleryData>,
  ): Promise<ApiResponse<GalleryData>> {
    return this.request<GalleryData>("/gallery", {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async updateGallery(
    id: string,
    data: Partial<GalleryData>,
  ): Promise<ApiResponse<GalleryData>> {
    return this.request<GalleryData>(`/gallery/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async deleteGallery(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/gallery/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  // FAQ
  async getFAQ(params?: {
    kategori?: string;
    aktif?: boolean;
  }): Promise<ApiResponse<FAQData[]>> {
    const query = new URLSearchParams();
    if (params?.kategori) query.append("kategori", params.kategori);
    if (params?.aktif !== undefined)
      query.append("aktif", String(params.aktif));
    return this.request<FAQData[]>(`/faq?${query}`);
  }

  async getFAQById(id: string): Promise<ApiResponse<FAQData>> {
    return this.request<FAQData>(`/faq/${id}`);
  }

  async createFAQ(data: Partial<FAQData>): Promise<ApiResponse<FAQData>> {
    return this.request<FAQData>("/faq", {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async updateFAQ(
    id: string,
    data: Partial<FAQData>,
  ): Promise<ApiResponse<FAQData>> {
    return this.request<FAQData>(`/faq/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async deleteFAQ(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/faq/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  // Slider
  async getSlider(params?: {
    aktif?: boolean;
    tipe?: string;
  }): Promise<ApiResponse<SliderData[]>> {
    const query = new URLSearchParams();
    if (params?.aktif !== undefined)
      query.append("aktif", String(params.aktif));
    if (params?.tipe) query.append("tipe", params.tipe);
    return this.request<SliderData[]>(`/slider?${query}`);
  }

  async getSliderById(id: string): Promise<ApiResponse<SliderData>> {
    return this.request<SliderData>(`/slider/${id}`);
  }

  async createSlider(
    data: Partial<SliderData>,
  ): Promise<ApiResponse<SliderData>> {
    return this.request<SliderData>("/slider", {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async updateSlider(
    id: string,
    data: Partial<SliderData>,
  ): Promise<ApiResponse<SliderData>> {
    return this.request<SliderData>(`/slider/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async deleteSlider(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/slider/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  // Pengaduan
  async getPengaduan(params?: {
    status?: string;
    kategori?: string;
    prioritas?: string;
  }): Promise<ApiResponse<PengaduanData[]>> {
    const query = new URLSearchParams();
    if (params?.status) query.append("status", params.status);
    if (params?.kategori) query.append("kategori", params.kategori);
    if (params?.prioritas) query.append("prioritas", params.prioritas);
    return this.request<PengaduanData[]>(`/pengaduan?${query}`);
  }

  async getPengaduanById(id: string): Promise<ApiResponse<PengaduanData>> {
    return this.request<PengaduanData>(`/pengaduan/${id}`);
  }

  async createPengaduan(
    data: Partial<PengaduanData>,
  ): Promise<ApiResponse<PengaduanData>> {
    return this.request<PengaduanData>("/pengaduan", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updatePengaduan(
    id: string,
    data: Partial<PengaduanData>,
  ): Promise<ApiResponse<PengaduanData>> {
    return this.request<PengaduanData>(`/pengaduan/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async deletePengaduan(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/pengaduan/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  // Dokumen Publik
  async getDokumen(params?: {
    kategori?: string;
    tahun?: number;
    aktif?: boolean;
  }): Promise<ApiResponse<DokumenPublikData[]>> {
    const query = new URLSearchParams();
    if (params?.kategori) query.append("kategori", params.kategori);
    if (params?.tahun) query.append("tahun", String(params.tahun));
    if (params?.aktif !== undefined)
      query.append("aktif", String(params.aktif));
    return this.request<DokumenPublikData[]>(`/dokumen?${query}`);
  }

  async getDokumenById(id: string): Promise<ApiResponse<DokumenPublikData>> {
    return this.request<DokumenPublikData>(`/dokumen/${id}`);
  }

  async createDokumen(
    data: Partial<DokumenPublikData>,
  ): Promise<ApiResponse<DokumenPublikData>> {
    return this.request<DokumenPublikData>("/dokumen", {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async updateDokumen(
    id: string,
    data: Partial<DokumenPublikData>,
  ): Promise<ApiResponse<DokumenPublikData>> {
    return this.request<DokumenPublikData>(`/dokumen/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async deleteDokumen(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/dokumen/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  // Potensi Desa
  async getPotensiDesa(params?: {
    kategori?: string;
    aktif?: boolean;
  }): Promise<ApiResponse<PotensiDesaData[]>> {
    const query = new URLSearchParams();
    if (params?.kategori) query.append("kategori", params.kategori);
    if (params?.aktif !== undefined)
      query.append("aktif", String(params.aktif));
    return this.request<PotensiDesaData[]>(`/potensi-desa?${query}`);
  }

  async getPotensiDesaById(id: string): Promise<ApiResponse<PotensiDesaData>> {
    return this.request<PotensiDesaData>(`/potensi-desa/${id}`);
  }

  async createPotensiDesa(
    data: Partial<PotensiDesaData>,
  ): Promise<ApiResponse<PotensiDesaData>> {
    return this.request<PotensiDesaData>("/potensi-desa", {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async updatePotensiDesa(
    id: string,
    data: Partial<PotensiDesaData>,
  ): Promise<ApiResponse<PotensiDesaData>> {
    return this.request<PotensiDesaData>(`/potensi-desa/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async deletePotensiDesa(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/potensi-desa/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  async getProgram(params?: {
    page?: number;
    limit?: number;
    kategori?: string;
    status?: string;
    search?: string;
    tahun?: string;
  }): Promise<ApiResponse<ProgramData[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.kategori) queryParams.append("kategori", params.kategori);
    if (params?.status) queryParams.append("status", params.status);
    if (params?.search) queryParams.append("search", params.search);
    if (params?.tahun) queryParams.append("tahun", params.tahun);

    return this.request<ProgramData[]>(`/program?${queryParams.toString()}`);
  }

  async getProgramById(id: string): Promise<ApiResponse<ProgramData>> {
    return this.request<ProgramData>(`/program/${id}`);
  }

  async createProgram(
    data: Partial<ProgramData>,
  ): Promise<ApiResponse<ProgramData>> {
    return this.request<ProgramData>("/program", {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async updateProgram(
    id: string,
    data: Partial<ProgramData>,
  ): Promise<ApiResponse<ProgramData>> {
    return this.request<ProgramData>(`/program/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async deleteProgram(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/program/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  async getPerangkat(params?: {
    jabatan?: string;
    sedangMenjabat?: boolean;
    namaDusun?: string;
  }): Promise<ApiResponse<PerangkatData[]>> {
    const queryParams = new URLSearchParams();
    if (params?.jabatan) queryParams.append("jabatan", params.jabatan);
    if (params?.sedangMenjabat !== undefined)
      queryParams.append("sedangMenjabat", params.sedangMenjabat.toString());
    if (params?.namaDusun) queryParams.append("namaDusun", params.namaDusun);

    return this.request<PerangkatData[]>(
      `/kepala-desa?${queryParams.toString()}`,
    );
  }

  async getPerangkatById(id: string): Promise<ApiResponse<PerangkatData>> {
    return this.request<PerangkatData>(`/kepala-desa/${id}`);
  }

  async createPerangkat(
    data: Partial<PerangkatData>,
  ): Promise<ApiResponse<PerangkatData>> {
    return this.request<PerangkatData>("/kepala-desa", {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async updatePerangkat(
    id: string,
    data: Partial<PerangkatData>,
  ): Promise<ApiResponse<PerangkatData>> {
    return this.request<PerangkatData>(`/kepala-desa/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async deletePerangkat(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/kepala-desa/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  async getLayanan(params?: {
    kategori?: string;
    aktif?: boolean;
    search?: string;
  }): Promise<ApiResponse<LayananData[]>> {
    const queryParams = new URLSearchParams();
    if (params?.kategori) queryParams.append("kategori", params.kategori);
    if (params?.aktif !== undefined)
      queryParams.append("aktif", params.aktif.toString());
    if (params?.search) queryParams.append("search", params.search);

    return this.request<LayananData[]>(`/layanan?${queryParams.toString()}`);
  }

  async getLayananById(id: string): Promise<ApiResponse<LayananData>> {
    return this.request<LayananData>(`/layanan/${id}`);
  }

  async createLayanan(
    data: Partial<LayananData>,
  ): Promise<ApiResponse<LayananData>> {
    return this.request<LayananData>("/layanan", {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async updateLayanan(
    id: string,
    data: Partial<LayananData>,
  ): Promise<ApiResponse<LayananData>> {
    return this.request<LayananData>(`/layanan/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async deleteLayanan(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/layanan/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  async getPertanggungjawaban(params?: {
    page?: number;
    limit?: number;
    tahunAnggaran?: number;
    jenisDokumen?: string;
    kategori?: string;
  }): Promise<ApiResponse<PertanggungjawabanData[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.tahunAnggaran)
      queryParams.append("tahunAnggaran", params.tahunAnggaran.toString());
    if (params?.jenisDokumen)
      queryParams.append("jenisDokumen", params.jenisDokumen);
    if (params?.kategori) queryParams.append("kategori", params.kategori);

    return this.request<PertanggungjawabanData[]>(
      `/pertanggungjawaban?${queryParams.toString()}`,
    );
  }

  async getPertanggungjawabanById(
    id: string,
  ): Promise<ApiResponse<PertanggungjawabanData>> {
    return this.request<PertanggungjawabanData>(`/pertanggungjawaban/${id}`);
  }

  async createPertanggungjawaban(
    data: Partial<PertanggungjawabanData>,
  ): Promise<ApiResponse<PertanggungjawabanData>> {
    return this.request<PertanggungjawabanData>("/pertanggungjawaban", {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async updatePertanggungjawaban(
    id: string,
    data: Partial<PertanggungjawabanData>,
  ): Promise<ApiResponse<PertanggungjawabanData>> {
    return this.request<PertanggungjawabanData>(`/pertanggungjawaban/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async deletePertanggungjawaban(
    id: string,
  ): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/pertanggungjawaban/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }
}

export const apiClient = new ApiClient();
export type {
  BeritaData,
  StatistikData,
  ProgramData,
  PerangkatData,
  LayananData,
  PertanggungjawabanData,
  HeroSectionData,
  ProfileDesaData,
  GalleryData,
  FAQData,
  SliderData,
  PengaduanData,
  DokumenPublikData,
  PotensiDesaData,
  User,
  LoginResponse,
  MeResponse,
};
