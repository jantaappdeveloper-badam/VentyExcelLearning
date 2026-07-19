import React, { useState } from "react";
import { 
  Play, BookOpen, ChevronRight, ChevronLeft, Award, HelpCircle, 
  ArrowRight, FileSpreadsheet, Layers, User, ShieldCheck, CheckSquare, Sparkles, CheckCircle
} from "lucide-react";

interface PresentationScreenProps {
  onStartSimulation: (windowId: "prospek_under_100jt" | "pegawai_plus_bup") => void;
  activeWindowId: string;
  onExit: () => void;
}

export function PresentationScreen({
  onStartSimulation,
  activeWindowId,
  onExit
}: PresentationScreenProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  // Slides configuration
  // For Window 1, we show Slide index 0 and 1
  // For Window 2, we show Slide index 2 and 3
  const isWindow1 = activeWindowId === "prospek_under_100jt";

  const nextSlide = () => {
    if (isWindow1 && slideIndex === 0) {
      setSlideIndex(1);
    } else if (!isWindow1 && slideIndex === 0) {
      setSlideIndex(1); // Slide 2 of Window 2
    }
  };

  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950 text-white z-50 flex flex-col font-sans" id="presentation-overlay">
      {/* Top corporate navigation bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 px-8 flex justify-between items-center select-none shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-xl text-white">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-black text-sm tracking-tight text-white uppercase">
              Bank Mandiri Pratama <span className="text-xs bg-emerald-950 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold border border-emerald-800">Training Center</span>
            </h2>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Interactive Slides & Academy</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono font-bold bg-slate-800 text-slate-300 px-3 py-1 rounded-full">
            {isWindow1 ? "WINDOW 1: TEMPLATE PROSPEK" : "WINDOW 2: PEGAWAI PLUS BUP"}
          </span>
          <button
            onClick={onExit}
            className="text-xs font-bold text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 px-4 py-2 rounded-xl transition-all border border-slate-700/60 cursor-pointer"
          >
            Keluar Sesi
          </button>
        </div>
      </div>

      {/* Main presentation canvas */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 flex flex-col justify-between max-w-5xl mx-auto w-full">
        {isWindow1 ? (
          /* =========================================================
             WINDOW 1 SLIDES
             ========================================================= */
          slideIndex === 0 ? (
            <div className="space-y-6 md:space-y-8 animate-fade-in my-auto">
              <div className="space-y-3">
                <span className="text-emerald-400 font-mono text-xs uppercase font-bold tracking-widest bg-emerald-950/50 border border-emerald-800/50 px-3 py-1 rounded-full">
                  Bagian 1: Pengenalan Kolom & Bisnis
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-tight">
                  Analisa Kredit Konsumer: <br />
                  <span className="text-emerald-400">Template Prospek (Plafond Under 100jt)</span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg max-w-3xl leading-relaxed">
                  Selamat datang di modul pelatihan staf baru. Pada bagian ini, kita akan mempelajari bagaimana bank memetakan prospek debitur kredit mikro dengan sisa kewajiban lancar agar dapat ditawarkan program optimalisasi (top-up).
                </p>
              </div>

              {/* Grid Layout explaining the Two Key Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Kolom Usia */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="bg-emerald-500/10 text-emerald-400 w-10 h-10 rounded-xl flex items-center justify-center font-black mb-4">
                      D
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-100">
                      Kolom Usia (Kolom D)
                    </h3>
                    <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                      Menunjukkan <strong>usia riil</strong> nasabah saat pengolahan data. Hal ini krusial untuk memastikan tenor kredit baru tidak melampaui sisa masa bakti kerja aktif nasabah.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-slate-800 pt-4 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase">Sumber Data:</span>
                    <span className="bg-slate-800 text-slate-300 font-mono px-2.5 py-0.5 rounded">Kolom F (Tgl Lahir)</span>
                  </div>
                </div>

                {/* Kolom Skala Prioritas */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="bg-emerald-500/10 text-emerald-400 w-10 h-10 rounded-xl flex items-center justify-center font-black mb-4">
                      N
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-100">
                      Kolom Skala Prioritas (Kolom N)
                    </h3>
                    <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                      Sistem klasifikasi otomatis untuk menyaring debitur dengan <strong>plafond kecil (&le; 100 juta)</strong> yang memiliki sisa masa angsuran pendek dan berkinerja lancar (Kolektibilitas 1).
                    </p>
                  </div>
                  <div className="mt-6 border-t border-slate-800 pt-4 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase">Aturan Utama:</span>
                    <span className="bg-amber-950/40 text-amber-400 font-semibold px-2.5 py-0.5 rounded border border-amber-900/50">Lancar & Tenor &le; 24 Bulan</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8 animate-fade-in my-auto">
              <div className="space-y-3">
                <span className="text-emerald-400 font-mono text-xs uppercase font-bold tracking-widest bg-emerald-950/50 border border-emerald-800/50 px-3 py-1 rounded-full">
                  Bagian 2: Logika Aturan & Rumus Excel
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-tight">
                  Rumus Excel & <span className="text-emerald-400">Logika Penerapan</span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg max-w-3xl leading-relaxed">
                  Mari kita telaah aturan penulisan formula Excel yang tepat sesuai dengan standar perbankan agar kalkulasi berjalan akurat secara otomatis pada lembar kerja Anda.
                </p>
              </div>

              {/* Detail Formula Cards */}
              <div className="space-y-6">
                {/* Formula Usia */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 border-b border-slate-800 pb-4 mb-4">
                    <h3 className="font-display font-bold text-lg text-slate-100 flex items-center gap-2">
                      <span className="bg-emerald-900 text-emerald-400 text-xs px-2.5 py-1 rounded font-mono">KOLOM D</span>
                      Formula Perhitungan Usia
                    </h3>
                    <code className="text-emerald-400 font-mono text-sm font-black bg-slate-950 p-2 px-3 rounded-lg border border-slate-800">
                      =DATEDIF(F2, TODAY(), "Y")
                    </code>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 uppercase font-black tracking-wider">Aturan Kerja Rumus:</p>
                    <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1.5 leading-relaxed">
                      <li><strong>F2</strong> mereferensikan sel tanggal lahir debitur pada baris berjalan.</li>
                      <li><strong>TODAY()</strong> mengambil tanggal sistem internal hari ini secara dinamis.</li>
                      <li><strong>"Y"</strong> menandakan bahwa output harus dikalkulasi sebagai selisih tahun penuh (bukan bulan atau hari).</li>
                    </ul>
                  </div>
                </div>

                {/* Formula Skala Prioritas */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex flex-col gap-3 border-b border-slate-800 pb-4 mb-4">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                      <h3 className="font-display font-bold text-lg text-slate-100 flex items-center gap-2">
                        <span className="bg-amber-900 text-amber-400 text-xs px-2.5 py-1 rounded font-mono">KOLOM N</span>
                        Formula Logika Bersarang Skala Prioritas
                      </h3>
                    </div>
                    <code className="text-emerald-400 font-mono text-[11px] md:text-xs font-black bg-slate-950 p-3 rounded-lg border border-slate-800 block overflow-x-auto whitespace-nowrap">
                      =IF(AND(F2&le;100000000, M2=1), IF(L2&le;24, "PRIORITAS 1", "PRIORITAS 2"), "CEK MANUAL")
                    </code>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400 uppercase font-black tracking-wider">Logika Kondisi (Tiga Saringan Utama):</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider block mb-1">Saringan 1: Kelayakan</span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Memastikan plafond kredit <span className="text-white font-bold">&le; 100 juta (F2)</span> DAN status pembayaran lancar <span className="text-white font-bold">(Kolom Kol M2 = 1)</span>.
                        </p>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider block mb-1">Saringan 2: Sisa Tenor</span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Jika lolos Saringan 1, dievaluasi sisa tenor <span className="text-white font-bold">(L2)</span>. Jika <span className="text-white font-bold">&le; 24 bulan</span> diberi label <span className="text-emerald-400 font-bold">"PRIORITAS 1"</span>, jika lebih masuk <span className="text-blue-400 font-bold">"PRIORITAS 2"</span>.
                        </p>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider block mb-1">Saringan 3: Cek Manual</span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Debitur dengan plafond besar &gt; 100 juta ATAU memiliki riwayat tunggakan (Kol &gt; 1) otomatis dilabeli <span className="text-slate-400 font-bold">"CEK MANUAL"</span>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          /* =========================================================
             WINDOW 2 SLIDES
             ========================================================= */
          slideIndex === 0 ? (
            <div className="space-y-6 md:space-y-8 animate-fade-in my-auto">
              <div className="space-y-3">
                <span className="text-emerald-400 font-mono text-xs uppercase font-bold tracking-widest bg-emerald-950/50 border border-emerald-800/50 px-3 py-1 rounded-full">
                  Bagian 1: Batas Usia Pensiun & Prospek Pegawai Plus
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-tight">
                  Manajemen Kredit ASN: <br />
                  <span className="text-emerald-400">Pegawai Plus & Sisa Masa Dinas</span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg max-w-3xl leading-relaxed">
                  Pada lembar kerja kedua ini, bank fokus mengelola debitur pegawai aktif/Aparatur Sipil Negara (ASN) yang mendekati Batas Usia Pensiun (BUP). Analis harus memetakan sisa masa dinas ke skema "Pegawai Plus".
                </p>
              </div>

              {/* Grid Layout explaining Window 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Kolom Nofas */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="bg-emerald-500/10 text-emerald-400 w-10 h-10 rounded-xl flex items-center justify-center font-black mb-3">
                      A
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-100">
                      Kolom Nofas (Kolom A)
                    </h3>
                    <p className="text-slate-400 text-xs mt-2.5 leading-relaxed">
                      <strong>Nomor Fasilitas</strong>. Merupakan pengenal unik (Primary Key) dari sistem inti perbankan untuk melacak riwayat pinjaman berjalan secara tunggal tanpa risiko tertukar.
                    </p>
                  </div>
                  <div className="mt-4 border-t border-slate-800 pt-3 flex justify-between items-center text-[10px]">
                    <span className="text-slate-400 font-bold uppercase">Sifat:</span>
                    <span className="bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded font-bold">Unik & Konsisten</span>
                  </div>
                </div>

                {/* Kolom Prospek Untuk Kredit */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="bg-emerald-500/10 text-emerald-400 w-10 h-10 rounded-xl flex items-center justify-center font-black mb-3">
                      K
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-100">
                      Prospek Kredit (Kolom K)
                    </h3>
                    <p className="text-slate-400 text-xs mt-2.5 leading-relaxed">
                      Sistem klasifikasi penawaran program jaminan hari tua pensiun. Dibagi menjadi <strong>Skema 1</strong> (Sisa masa dinas sedang) atau <strong>Skema 2</strong> (Masa dinas pendek).
                    </p>
                  </div>
                  <div className="mt-4 border-t border-slate-800 pt-3 flex justify-between items-center text-[10px]">
                    <span className="text-slate-400 font-bold uppercase">Kriteria:</span>
                    <span className="bg-amber-950/40 text-amber-400 font-semibold px-2 py-0.5 rounded border border-amber-900/50">Berdasarkan Sisa Dinas</span>
                  </div>
                </div>

                {/* Kolom Prospek */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="bg-emerald-500/10 text-emerald-400 w-10 h-10 rounded-xl flex items-center justify-center font-black mb-3">
                      N
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-100">
                      Kolom Prospek (Kolom N)
                    </h3>
                    <p className="text-slate-400 text-xs mt-2.5 leading-relaxed">
                      Status kelayakan akhir pemasaran berdasarkan sisa limit outstanding nominal pinjaman debitur (Baki Debet berjalan Juni &le; Rp 100 Juta).
                    </p>
                  </div>
                  <div className="mt-4 border-t border-slate-800 pt-3 flex justify-between items-center text-[10px]">
                    <span className="text-slate-400 font-bold uppercase">Batas Cabang:</span>
                    <span className="bg-emerald-950/40 text-emerald-400 font-semibold px-2 py-0.5 rounded border border-emerald-900/50">&le; 100.000.000</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8 animate-fade-in my-auto">
              <div className="space-y-3">
                <span className="text-emerald-400 font-mono text-xs uppercase font-bold tracking-widest bg-emerald-950/50 border border-emerald-800/50 px-3 py-1 rounded-full">
                  Bagian 2: Logika Aturan & Rumus Excel Pegawai Plus
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-tight">
                  Kriteria Aturan & <span className="text-emerald-400">Penerapan Rumus</span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg max-w-3xl leading-relaxed">
                  Staf baru harus menuliskan logika IF bertingkat dan perhitungan selisih BUP secara konsisten menggunakan formula berikut.
                </p>
              </div>

              {/* Detail Formula Cards Window 2 */}
              <div className="space-y-5">
                {/* Formula Prospek Untuk Kredit */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <div className="flex flex-col gap-2.5 border-b border-slate-800 pb-3 mb-3">
                    <h3 className="font-display font-bold text-base text-slate-100 flex items-center gap-2">
                      <span className="bg-emerald-900 text-emerald-400 text-xs px-2.5 py-1 rounded font-mono">KOLOM K</span>
                      Formula Klasifikasi Skema Pegawai Plus
                    </h3>
                    <code className="text-emerald-400 font-mono text-[10px] md:text-xs font-black bg-slate-950 p-2.5 rounded border border-slate-800 block overflow-x-auto whitespace-nowrap">
                      =IF(J2&le;5, "Pegawai Plus Skema 2", IF(J2&le;8, "Pegawai Plus Skema 1", "Belum Pegawai Plus"))
                    </code>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 uppercase font-black tracking-wider">Logika Evaluasi:</p>
                    <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1 leading-relaxed">
                      <li><strong>J2</strong> mereferensikan kolom <strong>Sisa Masa Dinas (Tahun)</strong>.</li>
                      <li>Kondisi 1: Jika sisa masa dinas &le; 5 tahun, sistem melabeli sebagai <strong className="text-white">"Pegawai Plus Skema 2"</strong> (tenor jangka pendek).</li>
                      <li>Kondisi 2: Jika sisa masa dinas di antara 6 hingga 8 tahun (&le; 8), sistem menetapkan <strong className="text-white">"Pegawai Plus Skema 1"</strong>.</li>
                      <li>Kondisi 3 (Sisa): Jika sisa masa dinas &gt; 8 tahun, status ditetapkan <strong className="text-slate-400 font-bold">"Belum Pegawai Plus"</strong>.</li>
                    </ul>
                  </div>
                </div>

                {/* Formula Prospek */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2.5 border-b border-slate-800 pb-3 mb-3">
                    <h3 className="font-display font-bold text-base text-slate-100 flex items-center gap-2">
                      <span className="bg-amber-900 text-amber-400 text-xs px-2.5 py-1 rounded font-mono">KOLOM N</span>
                      Formula Kelayakan Prospek Baki Debet
                    </h3>
                    <code className="text-emerald-400 font-mono text-xs font-black bg-slate-950 p-2 px-3 rounded border border-slate-800">
                      =IF(M2&le;100000000, "BISA", "TIDAK BISA")
                    </code>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 uppercase font-black tracking-wider">Logika Evaluasi:</p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Mengevaluasi sisa saldo pokok pinjaman debitur (Baki Debet Juni) di sel <strong className="text-white font-mono">M2</strong>. Jika sisa saldo <strong className="text-emerald-400">&le; Rp 100 Juta</strong>, maka diberi keputusan <strong className="text-emerald-400 font-bold">"BISA"</strong> diprospek ulang. Jika di atas Rp 100 Juta, berstatus <strong className="text-rose-400 font-bold">"TIDAK BISA"</strong> karena harus dilimpahkan ke kantor pusat operasional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {/* Presentation Slide Control Actions Footer */}
        <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center justify-between mt-8 select-none shrink-0 shadow-lg">
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={slideIndex === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Sebelumnya
            </button>
            <span className="hidden sm:flex items-center text-xs text-slate-400 px-2 font-mono">
              Halaman {slideIndex + 1} / 2
            </span>
          </div>

          <div className="flex gap-2">
            {slideIndex === 0 ? (
              <button
                onClick={nextSlide}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-emerald-950/20"
              >
                Penjelasan Logika & Rumus <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onStartSimulation(isWindow1 ? "prospek_under_100jt" : "pegawai_plus_bup")}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-950/40 animate-pulse border border-emerald-500/30"
              >
                <Play className="w-4 h-4 fill-white" /> Buka Simulasi Praktek {isWindow1 ? "Window 1" : "Window 2"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
