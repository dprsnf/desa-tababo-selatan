'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api-client';

export default function PengaturanPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    namaDesa: '',
    tagline: '',
    alamat: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    kodePos: '',
    email: '',
    telepon: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    youtube: '',
    logo: '',
    visi: '',
    misi: '',
    sejarah: '',
    jamOperasional: '',
    kepalaDesaNama: '',
    kepalaDesaNIP: '',
    kepalaDesaFoto: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoadingData(true);
      const response = await apiClient.getPengaturan();

      if (response.success && response.data) {
        const data = response.data;
        setFormData({
          namaDesa: (data.namaDesa as string) || '',
          tagline: (data.tagline as string) || '',
          alamat: (data.alamat as string) || '',
          kecamatan: (data.kecamatan as string) || '',
          kabupaten: (data.kabupaten as string) || '',
          provinsi: (data.provinsi as string) || '',
          kodePos: (data.kodePos as string) || '',
          email: (data.email as string) || '',
          telepon: (data.telepon as string) || '',
          whatsapp: (data.whatsapp as string) || '',
          facebook: (data.facebook as string) || '',
          instagram: (data.instagram as string) || '',
          youtube: (data.youtube as string) || '',
          logo: (data.logo as string) || '',
          visi: (data.visi as string) || '',
          misi: (data.misi as string) || '',
          sejarah: (data.sejarah as string) || '',
          jamOperasional: (data.jamOperasional as string) || '',
          kepalaDesaNama: (data.kepalaDesaNama as string) || '',
          kepalaDesaNIP: (data.kepalaDesaNIP as string) || '',
          kepalaDesaFoto: (data.kepalaDesaFoto as string) || ''
        });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Gagal memuat pengaturan';
      alert(errorMessage);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await apiClient.updatePengaturan(formData);
      alert('Pengaturan berhasil disimpan');
      loadData();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Gagal menyimpan pengaturan';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pengaturan Website</h1>
            <p className="text-gray-600 mt-1">Kelola informasi dan konfigurasi website desa</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Dashboard
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informasi Desa */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-200">
                📍 Informasi Desa
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Desa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.namaDesa}
                      onChange={(e) => setFormData({ ...formData, namaDesa: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      placeholder="Contoh: Tababo Selatan"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      placeholder="Contoh: Desa Maju dan Sejahtera"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap
                  </label>
                  <textarea
                    rows={2}
                    value={formData.alamat}
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="Jalan, nomor, dusun/dukuh"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kecamatan
                    </label>
                    <input
                      type="text"
                      value={formData.kecamatan}
                      onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kabupaten/Kota
                    </label>
                    <input
                      type="text"
                      value={formData.kabupaten}
                      onChange={(e) => setFormData({ ...formData, kabupaten: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provinsi
                    </label>
                    <input
                      type="text"
                      value={formData.provinsi}
                      onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kode Pos
                    </label>
                    <input
                      type="text"
                      value={formData.kodePos}
                      onChange={(e) => setFormData({ ...formData, kodePos: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jam Operasional
                  </label>
                  <input
                    type="text"
                    value={formData.jamOperasional}
                    onChange={(e) => setFormData({ ...formData, jamOperasional: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="Contoh: Senin - Jumat, 08.00 - 16.00 WIB"
                  />
                </div>
              </div>
            </div>

            {/* Kontak */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-200">
                📞 Kontak
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="email@desa.id"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telepon
                  </label>
                  <input
                    type="tel"
                    value={formData.telepon}
                    onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="(0xxx) xxxxxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>
            </div>

            {/* Media Sosial */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-200">
                🌐 Media Sosial
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={formData.facebook}
                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="https://instagram.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={formData.youtube}
                    onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
            </div>

            {/* Logo */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-200">
                🎨 Logo Desa
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Logo
                </label>
                <input
                  type="url"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  placeholder="https://example.com/logo.png"
                />
                {formData.logo && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <img
                      src={formData.logo}
                      alt="Logo Desa"
                      className="w-32 h-32 object-contain border-2 border-gray-200 rounded-lg p-2 bg-white"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/128?text=Error';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Profil Kepala Desa */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-200">
                👤 Kepala Desa
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Kepala Desa
                    </label>
                    <input
                      type="text"
                      value={formData.kepalaDesaNama}
                      onChange={(e) => setFormData({ ...formData, kepalaDesaNama: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIP Kepala Desa
                    </label>
                    <input
                      type="text"
                      value={formData.kepalaDesaNIP}
                      onChange={(e) => setFormData({ ...formData, kepalaDesaNIP: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Foto Kepala Desa
                  </label>
                  <input
                    type="url"
                    value={formData.kepalaDesaFoto}
                    onChange={(e) => setFormData({ ...formData, kepalaDesaFoto: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="https://example.com/foto-kades.jpg"
                  />
                  {formData.kepalaDesaFoto && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <img
                        src={formData.kepalaDesaFoto}
                        alt="Foto Kepala Desa"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/128?text=Error';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Visi & Misi */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-200">
                🎯 Visi & Misi
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visi
                  </label>
                  <textarea
                    rows={4}
                    value={formData.visi}
                    onChange={(e) => setFormData({ ...formData, visi: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="Tuliskan visi desa..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Misi
                  </label>
                  <textarea
                    rows={6}
                    value={formData.misi}
                    onChange={(e) => setFormData({ ...formData, misi: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="Tuliskan misi desa (pisahkan dengan enter untuk setiap poin)..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Tip: Pisahkan setiap poin misi dengan enter/new line
                  </p>
                </div>
              </div>
            </div>

            {/* Sejarah */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-200">
                📖 Sejarah Desa
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sejarah
                </label>
                <textarea
                  rows={8}
                  value={formData.sejarah}
                  onChange={(e) => setFormData({ ...formData, sejarah: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  placeholder="Tuliskan sejarah singkat desa..."
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-slate-600 text-white py-3 rounded-lg hover:bg-slate-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {loading ? 'Menyimpan...' : '💾 Simpan Semua Pengaturan'}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p className="text-sm text-slate-800">
            <strong>Info:</strong> Pengaturan ini akan mempengaruhi tampilan di seluruh website desa.
            Pastikan semua informasi sudah benar sebelum menyimpan.
          </p>
        </div>
      </div>
    </div>
  );
}
