'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';

export default function LaporkanHoaksPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    claimTitle: '',
    claimContent: '',
    sourceUrl: '',
    category: 'politik',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState<any>(null);

  // File upload simulation
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate a beautiful upload progress bar
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
        }
      }, 100);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        ...formData,
        fileName: selectedFile ? selectedFile.name : null,
      };

      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessData(data.data);
        // Reset form
        setFormData({
          name: '',
          email: '',
          claimTitle: '',
          claimContent: '',
          sourceUrl: '',
          category: 'politik',
        });
        setSelectedFile(null);
      } else {
        setErrorMsg(data.error || 'Terjadi kesalahan saat mengirim laporan.');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung dengan server. Silakan periksa koneksi Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative py-12 md:py-16 overflow-hidden">
        {/* Decorative backdrop gradients for premium look */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Header Section */}
          <div className="max-w-3xl mb-12 animate-fade-in">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-red-500/20">
              <Icon name="ShieldExclamationIcon" size={14} className="text-red-500" />
              Portal Pengaduan Hoaks & Klaim
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
              Punya Info Mencurigakan? <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-red-600 via-accent to-primary bg-clip-text text-transparent">
                Laporkan & Kami Verifikasi!
              </span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Bantu kami menjaga ruang digital yang bersih dan sehat. Kirimkan tangkapan layar,
              tautan berita, atau teks desas-desus yang Anda ragukan kebenarannya. Tim jurnalis cek
              fakta kami akan mengaudit secara mendalam.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Guidelines & Stats */}
            <div className="lg:col-span-4 space-y-6">
              {/* Guidelines Card */}
              <div className="bg-background/40 backdrop-blur-xl rounded-lg border border-border p-6 shadow-md shadow-black/[0.02]">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground mb-4 flex items-center gap-2">
                  <Icon name="InformationCircleIcon" size={18} className="text-primary" />
                  Panduan Melapor
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div className="text-xs leading-relaxed text-muted-foreground">
                      <strong className="text-foreground block font-bold mb-0.5">
                        Detail & Lengkap
                      </strong>
                      Berikan ringkasan klaim dan jelaskan di mana/kapan Anda pertama kali
                      melihatnya.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div className="text-xs leading-relaxed text-muted-foreground">
                      <strong className="text-foreground block font-bold mb-0.5">
                        Sertakan Bukti Pendukung
                      </strong>
                      Tautan URL atau screenshot percakapan grup/media sosial sangat membantu tim
                      verifikator kami.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div className="text-xs leading-relaxed text-muted-foreground">
                      <strong className="text-foreground block font-bold mb-0.5">
                        Pantau Status
                      </strong>
                      Anda akan menerima email otomatis berisi ID Tiket Aduan untuk memantau proses
                      verifikasi secara real-time.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Stats Banner */}
              <div className="bg-gradient-to-br from-primary to-blue-900 rounded-lg p-6 text-white shadow-xl">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Icon name="CheckCircleIcon" size={18} className="text-accent" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                    Statistik Cek Fakta
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-3xl font-black tracking-tight">15.204+</h4>
                    <p className="text-[11px] text-white/70">
                      Aduan Publik Diproses & Diverifikasi
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between gap-4">
                    <div>
                      <span className="text-lg font-bold block">92.4%</span>
                      <span className="text-[9px] text-white/60">Aduan Tepat Sasaran</span>
                    </div>
                    <div>
                      <span className="text-lg font-bold block">&lt; 24 Jam</span>
                      <span className="text-[9px] text-white/60">Rata-rata Durasi Verifikasi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Main Form or Success State */}
            <div className="lg:col-span-8">
              {!successData ? (
                <div className="bg-background/60 backdrop-blur-xl border border-border rounded-lg p-6 md:p-8 shadow-xl shadow-black/[0.03]">
                  <h2 className="text-lg font-black uppercase tracking-wider text-foreground mb-6 flex items-center gap-2">
                    <Icon name="DocumentTextIcon" size={20} className="text-accent" />
                    Formulir Laporan
                  </h2>

                  {errorMsg && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center gap-3 text-red-600 text-xs font-semibold">
                      <Icon name="ExclamationCircleIcon" size={18} />
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Nama Lengkap Pelapor *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Masukkan nama Anda"
                          required
                          className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Alamat Email Aktif *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="namalengkap@email.com"
                          required
                          className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Claim Title */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Topik / Judul Rumor Yang Dilaporkan *
                        </label>
                        <input
                          type="text"
                          name="claimTitle"
                          value={formData.claimTitle}
                          onChange={handleInputChange}
                          placeholder="Contoh: RUU AI Disahkan Secara Rahasia"
                          required
                          className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                      </div>

                      {/* Category select */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Kategori Informasi *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm outline-none focus:border-primary transition-all"
                        >
                          <option value="politik">Politik & Pemerintahan</option>
                          <option value="kesehatan">Kesehatan & Medis</option>
                          <option value="teknologi">Teknologi & Keamanan Digital</option>
                          <option value="ekonomi">Ekonomi, Bisnis & Keuangan</option>
                          <option value="sosial">Sosial, Agama & Budaya</option>
                          <option value="lainnya">Lainnya</option>
                        </select>
                      </div>
                    </div>

                    {/* Source URL */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Tautan URL / Sumber Penyebaran (Opsional)
                      </label>
                      <input
                        type="url"
                        name="sourceUrl"
                        value={formData.sourceUrl}
                        onChange={handleInputChange}
                        placeholder="Contoh: https://facebook.com/posts/xyz atau grup WhatsApp"
                        className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    {/* Claim Details Description */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Detail Penjelasan Rumor / Narasi Hoaks *
                      </label>
                      <textarea
                        name="claimContent"
                        rows={5}
                        value={formData.claimContent}
                        onChange={handleInputChange}
                        placeholder="Jelaskan secara mendalam tentang rumor yang Anda temukan. Salin teks narasi hoaks lengkapnya di sini agar kami mudah meneliti keaslian datanya..."
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    {/* Screenshot Upload zone */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Unggah Bukti / Screenshot Pendukung (Opsional)
                      </label>
                      {!selectedFile ? (
                        <div className="relative border-2 border-dashed border-border hover:border-primary rounded-sm p-8 text-center bg-background/40 cursor-pointer transition-all">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="flex flex-col items-center justify-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-1">
                              <Icon name="ArrowUpTrayIcon" size={24} />
                            </div>
                            <p className="text-xs font-bold text-foreground">
                              Klik untuk mengunggah atau seret file gambar
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              Mendukung format PNG, JPG, JPEG (Maks. 5MB)
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-background border border-border rounded-sm flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-sm bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                              <Icon name="PhotoIcon" size={20} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-foreground truncate">
                                {selectedFile.name}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 flex-shrink-0">
                            {isUploading ? (
                              <div className="w-24 bg-muted h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-primary h-full transition-all duration-100"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                            ) : (
                              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                                Siap Kirim
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={handleRemoveFile}
                              className="p-1 rounded-full text-muted-foreground hover:text-red-500 hover:bg-muted transition-all"
                            >
                              <Icon name="TrashIcon" size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading || isUploading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-red-600 to-accent text-white rounded-sm text-sm font-bold uppercase tracking-widest hover:shadow-lg shadow-red-500/20 hover:opacity-95 transition-all disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sedang Mengirim Laporan...
                          </>
                        ) : (
                          <>
                            <Icon name="PaperAirplaneIcon" size={16} />
                            Kirim Aduan Sekarang
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Success Feedback State */
                <div className="bg-background/60 backdrop-blur-xl border border-border rounded-lg p-6 md:p-10 shadow-2xl text-center space-y-6 animate-scale-up">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto border border-green-500/20">
                    <Icon name="CheckBadgeIcon" size={48} className="text-green-500" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black text-foreground">
                      Laporan Berhasil Diterima!
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                      Terima kasih atas kepedulian Anda,{' '}
                      <strong className="text-foreground">{successData.name}</strong>. Tim redaksi
                      ceksaha.com sedang mulai memverifikasi klaim Anda.
                    </p>
                  </div>

                  {/* Ticket Visual representation */}
                  <div className="max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-lg p-6 text-left shadow-lg border border-slate-700/50 relative overflow-hidden">
                    {/* Decorative stamps */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />

                    <div className="flex justify-between items-start gap-4 border-b border-white/10 pb-4 mb-4">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-wider text-accent">
                          Aduan Claim-Review
                        </span>
                        <h4 className="text-sm font-bold text-white truncate max-w-[250px]">
                          {successData.claimTitle}
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold bg-white/10 px-2.5 py-1 rounded text-white border border-white/10 uppercase">
                        {formData.category}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[9px] text-white/50 block uppercase tracking-wider">
                          Nomor Tiket Pengaduan
                        </span>
                        <span className="text-lg font-mono font-bold text-accent tracking-wider select-all">
                          {successData.ticketId}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-1">
                        <div>
                          <span className="text-[9px] text-white/50 block uppercase tracking-wider">
                            Tanggal Diterima
                          </span>
                          <span className="text-xs font-semibold text-white/90">
                            {successData.date}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-white/50 block uppercase tracking-wider">
                            Status Awal
                          </span>
                          <span className="text-xs font-bold text-yellow-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                            Antrean Verifikasi
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 max-w-sm mx-auto flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setSuccessData(null)}
                      className="px-6 py-2.5 bg-muted text-foreground hover:bg-secondary rounded-sm text-xs font-black uppercase tracking-wider transition-all"
                    >
                      Kirim Laporan Lain
                    </button>
                    <Link
                      href="/"
                      className="px-6 py-2.5 bg-primary text-white hover:opacity-95 rounded-sm text-xs font-black uppercase tracking-wider transition-all"
                    >
                      Kembali ke Beranda
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
