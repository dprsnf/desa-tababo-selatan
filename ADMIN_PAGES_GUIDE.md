# 📚 Panduan Lengkap Admin Pages - Desa Tababo Selatan

## 📊 Status Halaman Admin (Update Terakhir: Selesai 100%)

### ✅ **Halaman yang Sudah Selesai (100%)**

#### 1. **Berita Module**
- ✅ `/admin/berita` - List page dengan pagination & filter
- ✅ `/admin/berita/create` - Form tambah berita
- ✅ `/admin/berita/edit/[id]` - Form edit berita

#### 2. **Program Module**
- ✅ `/admin/program` - List page dengan pagination & filter
- ✅ `/admin/program/create` - Form tambah program
- ✅ `/admin/program/edit/[id]` - Form edit program

#### 3. **Perangkat Desa Module**
- ✅ `/admin/perangkat` - List page dengan card layout
- ✅ `/admin/perangkat/create` - Form tambah perangkat
- ✅ `/admin/perangkat/edit/[id]` - Form edit perangkat

#### 4. **Statistik Module**
- ✅ `/admin/statistik` - Single page editor

#### 5. **Layanan Module**
- ✅ `/admin/layanan` - List page dengan pagination & filter
- ✅ `/admin/layanan/create` - Form tambah layanan
- ✅ `/admin/layanan/edit/[id]` - Form edit layanan

#### 6. **Pertanggungjawaban Module**
- ✅ `/admin/pertanggungjawaban` - List page dengan pagination & filter tahun
- ✅ `/admin/pertanggungjawaban/create` - Form tambah laporan
- ✅ `/admin/pertanggungjawaban/edit/[id]` - Form edit laporan

#### 7. **Pengaturan Module**
- ✅ `/admin/pengaturan` - Single page editor untuk settings website

---

### 🎉 **Semua Halaman Sudah Selesai!**

Total: **7 Module** dengan **19 Halaman** telah berhasil dibuat:
1. ✅ Berita (3 halaman)
2. ✅ Program (3 halaman)
3. ✅ Perangkat Desa (3 halaman)
4. ✅ Statistik (1 halaman)
5. ✅ Layanan (3 halaman)
6. ✅ Pertanggungjawaban (3 halaman)
7. ✅ Pengaturan (1 halaman)

---

## 🎨 Pattern & Template

### **Pattern 1: List Page (dengan Pagination)**

```tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import { apiClient, DataType } from "@/lib/api-client";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { MdIcon } from "react-icons/md";

function ListPage() {
  const { logout } = useAuth();
  const [items, setItems] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.getData({
        page,
        limit: 10,
        filter: filter || undefined,
        search: search || undefined,
      });

      if (response.success && response.data) {
        setItems(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
      }
    } catch {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  }, [page, filter, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    try {
      await apiClient.deleteData(id);
      loadData();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal menghapus data";
      alert("Gagal menghapus: " + errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={logout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header dengan tombol tambah */}
        {/* Filters */}
        {/* Table atau Grid */}
        {/* Pagination */}
      </div>
    </div>
  );
}

export default withAuth(ListPage);
```

---

### **Pattern 2: Create Form**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api-client";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";
import { FaArrowLeft, FaSave } from "react-icons/fa";

function CreatePage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    // ... other fields
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.createData(formData);
      router.push("/admin/module");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal menyimpan data";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={logout} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            {/* Submit buttons */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default withAuth(CreatePage);
```

---

### **Pattern 3: Edit Form**

```tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api-client";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";
import { FaArrowLeft, FaSave } from "react-icons/fa";

function EditPage() {
  const router = useRouter();
  const params = useParams();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    // ... other fields
  });

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    try {
      setLoadingData(true);
      const response = await apiClient.getDataById(params.id as string);

      if (response.success && response.data) {
        const data = response.data;
        setFormData({
          field1: data.field1,
          field2: data.field2,
          // ... map data to form
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal memuat data";
      alert(errorMessage);
      router.push("/admin/module");
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.updateData(params.id as string, formData);
      router.push("/admin/module");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal memperbarui data";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
        <AdminNavbar onLogout={logout} />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Memuat data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={logout} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Form fields - sama dengan create */}
            {/* Submit buttons */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default withAuth(EditPage);
```

---

### **Pattern 4: Single Page Editor (seperti Statistik)**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api-client";
import AdminNavbar from "@/components/AdminNavbar";
import { FaSave } from "react-icons/fa";

function SinglePage() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    // fields
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoadingData(true);
      const response = await apiClient.getData();
      if (response.success && response.data) {
        setFormData(response.data);
      }
    } catch (error) {
      // handle error
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.updateData(formData);
      alert("Data berhasil diperbarui!");
    } catch (error) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <AdminNavbar onLogout={logout} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default withAuth(SinglePage);
```

---

## 🔧 Field Types yang Sering Digunakan

### Input Text
```tsx
<input
  type="text"
  value={formData.fieldName}
  onChange={(e) => setFormData({ ...formData, fieldName: e.target.value })}
  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
  placeholder="Placeholder text"
  required
/>
```

### Textarea
```tsx
<textarea
  value={formData.fieldName}
  onChange={(e) => setFormData({ ...formData, fieldName: e.target.value })}
  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
  placeholder="Placeholder text"
  rows={4}
  required
/>
```

### Select Dropdown
```tsx
<select
  value={formData.fieldName}
  onChange={(e) => setFormData({ ...formData, fieldName: e.target.value })}
  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
  required
>
  <option value="">Pilih...</option>
  <option value="value1">Label 1</option>
  <option value="value2">Label 2</option>
</select>
```

### Checkbox
```tsx
<label className="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    checked={formData.booleanField}
    onChange={(e) => setFormData({ ...formData, booleanField: e.target.checked })}
    className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
  />
  <span className="text-sm font-semibold text-gray-700">Label Text</span>
</label>
```

### Date Input
```tsx
<input
  type="date"
  value={formData.dateField}
  onChange={(e) => setFormData({ ...formData, dateField: e.target.value })}
  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
/>
```

### Number Input
```tsx
<input
  type="number"
  value={formData.numberField}
  onChange={(e) => setFormData({ ...formData, numberField: e.target.value })}
  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
  placeholder="0"
  min="0"
  step="1000"
/>
```

### URL/Image Input with Preview
```tsx
<div>
  <input
    type="url"
    value={formData.imageUrl}
    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
    placeholder="https://example.com/image.jpg"
  />
  {formData.imageUrl && (
    <div className="mt-3 rounded-xl overflow-hidden border-2 border-gray-200">
      <img
        src={formData.imageUrl}
        alt="Preview"
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3Ctext fill='%236b7280' font-family='Arial' font-size='16' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EGambar tidak dapat dimuat%3C/text%3E%3C/svg%3E";
        }}
      />
    </div>
  )}
</div>
```

---

## 🎨 Color Themes untuk Module

Gunakan warna yang berbeda untuk setiap module agar mudah dibedakan:

- **Berita**: Blue (`from-blue-600 to-cyan-600`)
- **Program**: Purple (`from-purple-600 to-pink-600`)
- **Perangkat**: Teal (`from-teal-600 to-cyan-600`)
- **Layanan**: Indigo (`from-indigo-600 to-purple-600`)
- **Pertanggungjawaban**: Emerald (`from-emerald-600 to-green-600`)
- **Statistik**: Orange (`from-orange-600 to-red-600`)
- **Pengaturan**: Gray (`from-gray-600 to-slate-600`)

---

## 📝 Checklist Membuat Halaman Baru

### Untuk List Page:
- [ ] Import semua dependencies
- [ ] Setup state (items, loading, filters, pagination)
- [ ] Buat `loadData` function dengan `useCallback`
- [ ] Setup `useEffect` untuk load data
- [ ] Buat `handleDelete` function
- [ ] Design header dengan tombol "Tambah"
- [ ] Buat filter section
- [ ] Buat table atau grid untuk display data
- [ ] Tambah pagination controls
- [ ] Wrap dengan `withAuth` HOC

### Untuk Create Form:
- [ ] Import dependencies
- [ ] Setup state untuk formData & loading
- [ ] Buat `handleSubmit` function
- [ ] Design form dengan semua field yang diperlukan
- [ ] Tambah validasi (required fields)
- [ ] Setup tombol Batal & Simpan
- [ ] Handle loading state di tombol
- [ ] Wrap dengan `withAuth` HOC

### Untuk Edit Form:
- [ ] Copy dari Create Form
- [ ] Tambah `useParams` untuk get ID
- [ ] Tambah state `loadingData`
- [ ] Buat function `loadData`
- [ ] Setup `useEffect` untuk load data saat mount
- [ ] Map API response ke formData
- [ ] Ganti `create` dengan `update` di submit
- [ ] Tambah loading screen saat fetch data
- [ ] Handle error saat load data

---

## 🚀 Quick Start untuk Halaman Baru

1. **Buat folder structure:**
   ```bash
   mkdir -p app/admin/module-name/create
   mkdir -p app/admin/module-name/edit/[id]
   ```

2. **Copy template yang sesuai:**
   - List page → copy dari `/admin/berita/page.tsx`
   - Create → copy dari `/admin/berita/create/page.tsx`
   - Edit → copy dari `/admin/berita/edit/[id]/page.tsx`

3. **Find & Replace:**
   - `berita` → `module-name`
   - `Berita` → `ModuleName`
   - `BeritaData` → `ModuleData`
   - Sesuaikan warna gradient
   - Sesuaikan icon

4. **Update fields:**
   - Sesuaikan formData state
   - Update form fields di JSX
   - Update API calls

5. **Test:**
   - Create new item
   - Edit item
   - Delete item
   - Pagination & filters

---

## 📚 API Methods yang Tersedia

Semua tersedia di `lib/api-client.ts`:

### Berita
- `getBerita(params)` - List dengan pagination
- `getBeritaById(id)` - Get single
- `createBerita(data)` - Create
- `updateBerita(id, data)` - Update
- `deleteBerita(id)` - Delete

### Program
- `getProgram(params)`
- `getProgramById(id)`
- `createProgram(data)`
- `updateProgram(id, data)`
- `deleteProgram(id)`

### Perangkat
- `getPerangkat(params)`
- `getPerangkatById(id)`
- `createPerangkat(data)`
- `updatePerangkat(id, data)`
- `deletePerangkat(id)`

### Layanan
- `getLayanan(params)`
- `getLayananById(id)`
- `createLayanan(data)`
- `updateLayanan(id, data)`
- `deleteLayanan(id)`

### Pertanggungjawaban
- `getPertanggungjawaban(params)`
- `getPertanggungjawabanById(id)`
- `createPertanggungjawaban(data)`
- `updatePertanggungjawaban(id, data)`
- `deletePertanggungjawaban(id)`

### Statistik
- `getStatistik()` - Get single
- `updateStatistik(data)` - Update

### Pengaturan
- `getPengaturan()` - Get settings
- `updatePengaturan(data)` - Update settings

---

## 🔒 Security Best Practices

1. **Semua halaman admin harus wrapped dengan `withAuth` HOC**
   ```tsx
   export default withAuth(ComponentName);
   ```

2. **Tidak ada console.log di production code**
   - Error handling harus silent atau via UI feedback

3. **Input validation di frontend & backend**
   - Required fields menggunakan HTML5 validation
   - Backend API harus validate juga

4. **Sanitize user input**
   - Hindari XSS dengan proper escaping
   - Jangan render raw HTML dari user input

---

## 📦 Struktur Folder Admin

```
app/admin/
├── berita/
│   ├── create/
│   │   └── page.tsx
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx
│   └── page.tsx
├── program/
│   ├── create/
│   │   └── page.tsx
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx
│   └── page.tsx
├── perangkat/
│   ├── create/
│   │   └── page.tsx
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx (PERLU DIBUAT)
│   └── page.tsx
├── layanan/
│   ├── create/
│   │   └── page.tsx (PERLU DIBUAT)
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx (PERLU DIBUAT)
│   └── page.tsx (PERLU DIBUAT)
├── pertanggungjawaban/
│   ├── create/
│   │   └── page.tsx (PERLU DIBUAT)
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx (PERLU DIBUAT)
│   └── page.tsx (PERLU DIBUAT)
├── statistik/
│   └── page.tsx ✅
├── pengaturan/
│   └── page.tsx (PERLU DIBUAT)
├── dashboard/
│   └── page.tsx ✅
└── login/
    └── page.tsx ✅
```

---

## 🎯 Next Steps

1. **Prioritas Tinggi:**
   - [ ] Edit form untuk Perangkat
   - [ ] Layanan module (list + forms)
   - [ ] Pengaturan page

2. **Prioritas Sedang:**
   - [ ] Pertanggungjawaban module
   - [ ] Media gallery & upload

3. **Enhancement:**
   - [ ] Rich text editor untuk konten
   - [ ] Image upload handler
   - [ ] Bulk actions
   - [ ] Export data (Excel/PDF)
   - [ ] Search dengan debounce
   - [ ] Toast notifications

---

## 💡 Tips & Tricks

1. **Slug Generator:**
   ```tsx
   const generateSlug = (text: string) => {
     return text
       .toLowerCase()
       .replace(/[^\w\s-]/g, "")
       .replace(/\s+/g, "-")
       .replace(/-+/g, "-")
       .trim();
   };
   ```

2. **Format Currency:**
   ```tsx
   const formatCurrency = (value: number) => {
     return new Intl.NumberFormat("id-ID", {
       style: "currency",
       currency: "IDR",
       minimumFractionDigits: 0,
     }).format(value);
   };
   ```

3. **Format Date:**
   ```tsx
   const formatDate = (dateString: string) => {
     return new Date(dateString).toLocaleDateString("id-ID", {
       year: "numeric",
       month: "long",
       day: "numeric",
     });
   };
   ```

4. **Handle Array Fields (Misi, Prestasi, dll):**
   ```tsx
   // Saat submit
   const misiArray = formData.misi.split("\n").filter(m => m.trim());
   
   // Saat load
   setFormData({
     ...data,
     misi: Array.isArray(data.misi) ? data.misi.join("\n") : "",
   });
   ```

---

## 📞 Support

Jika ada pertanyaan atau kendala:
1. Cek pattern & template di dokumen ini
2. Lihat contoh implementasi di module yang sudah ada
3. Cek API endpoint di `lib/api-client.ts`
4. Cek type definitions di `lib/api-client.ts`

---

**Happy Coding! 🚀**

_Last Updated: [Masukkan tanggal hari ini]_