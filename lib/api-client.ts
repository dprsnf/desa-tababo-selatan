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
  User,
  LoginResponse,
  MeResponse,
};
