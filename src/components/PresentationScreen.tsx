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
    setSlideIndex(1);
  };

  const prevSlide = () => {
    setSlideIndex(0);
  };

  return (
    <div className="fixed inset-0 bg-slate-50 text-slate-800 z-50 flex flex-col font-sans select-none" id="presentation-overlay">
      {/* Top corporate navigation bar */}
      <div className="bg-white border-b border-slate-200 p-5 px-8 flex justify-between items-center select-none shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <svg className="h-9 md:h-10 w-auto shrink-0" viewBox="0 0 420 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="BPR Modern Express Logo">
            {/* Red diamond outline */}
            <path d="M 35 25 L 60 50 L 35 75 L 10 50 Z" stroke="#CC1B29" strokeWidth="6" strokeLinejoin="miter" fill="none" />
            {/* Blue diamond outline overlapping */}
            <path d="M 55 25 L 80 50 L 55 75 L 30 50 Z" stroke="#0F4C81" strokeWidth="6" strokeLinejoin="miter" fill="none" />
            {/* Inner diagonal stripes */}
            <line x1="24" y1="56" x2="48" y2="32" stroke="#CC1B29" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="34" y1="66" x2="58" y2="42" stroke="#0F4C81" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="44" y1="76" x2="68" y2="52" stroke="#CC1B29" strokeWidth="5.5" strokeLinecap="round" />
            {/* Typography */}
            <text x="105" y="38" fontFamily="'Inter', ui-sans-serif, system-ui, sans-serif" fontSize="19" fontWeight="900" fill="#0F4C81" letterSpacing="-0.5px">BANK</text>
            <text x="170" y="38" fontFamily="'Inter', ui-sans-serif, system-ui, sans-serif" fontSize="17" fontWeight="500" fontStyle="italic" fill="#0F4C81">Perekonomian Rakyat</text>
            <text x="105" y="78" fontFamily="'Inter', ui-sans-serif, system-ui, sans-serif" fontSize="35" fontWeight="850" fill="#0F4C81" letterSpacing="-1px">Modern Express</text>
          </svg>
          <div className="h-7 w-[1px] bg-slate-200 mx-1" />
          <div>
            <h2 className="font-display font-black text-xs tracking-tight text-slate-900 uppercase flex items-center gap-2">
              <span className="text-[9px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 font-extrabold uppercase">Training Center</span>
            </h2>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
              Materi & Penjelasan Kredit &bull; <span className="text-emerald-700 font-bold">Adventsia Imuly | Staf Bisnis Area 1</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-3xs">
            {isWindow1 ? "📌 WINDOW 1: TEMPLATE PROSPEK" : "📌 WINDOW 2: PEGAWAI PLUS BUP"}
          </span>
          <button
            onClick={onExit}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-4 py-2 rounded-xl transition-all border border-slate-200 cursor-pointer shadow-3xs"
          >
            Keluar Sesi
          </button>
        </div>
      </div>

      {/* Main presentation canvas - MAXIMIZED width and padding for beautiful slides */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 flex flex-col justify-between max-w-7xl mx-auto w-full">
        {isWindow1 ? (
          /* =========================================================
             WINDOW 1 SLIDES
             ========================================================= */
          slideIndex === 0 ? (
            <div className="space-y-6 md:space-y-8 animate-fade-in my-auto">
              <div className="space-y-3">
                <span className="text-emerald-700 font-mono text-xs uppercase font-bold tracking-widest bg-emerald-100 border border-emerald-200 px-4 py-1.5 rounded-full shadow-3xs">
                  Bagian 1: Pengenalan Kolom & Bisnis
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-slate-900 leading-tight">
                  Analisa Kredit Konsumer: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Template Prospek (Plafond Under 100jt)</span>
                </h1>
                <p className="text-slate-600 text-sm md:text-base max-w-4xl leading-relaxed">
                  Selamat datang di modul pelatihan staf baru. Pada bagian ini, kita akan mempelajari bagaimana bank memetakan prospek debitur kredit mikro dengan sisa kewajiban lancar agar dapat ditawarkan program optimalisasi (top-up) dengan limit yang aman.
                </p>
              </div>

              {/* Grid Layout explaining the Two Key Columns - Light Theme */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {/* Kolom Usia */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-emerald-500 transition-all flex flex-col justify-between shadow-md hover:shadow-lg">
                  <div>
                    <div className="bg-emerald-50 text-emerald-700 w-12 h-12 rounded-xl flex items-center justify-center font-black mb-5 border border-emerald-100 text-lg shadow-3xs">
                      D
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-900">
                      Kolom Usia (Kolom D)
                    </h3>
                    <p className="text-slate-600 text-sm mt-3.5 leading-relaxed">
                      Menunjukkan <strong>usia riil</strong> nasabah saat pengolahan data. Hal ini krusial untuk memastikan tenor kredit baru tidak melampaui sisa masa bakti kerja aktif nasabah.
                    </p>
                  </div>
                  <div className="mt-8 border-t border-slate-100 pt-4 flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold uppercase">Sumber Data:</span>
                    <span className="bg-slate-100 text-slate-700 border border-slate-200 font-mono px-3 py-1 rounded font-bold">Kolom F (Tgl Lahir)</span>
                  </div>
                </div>

                {/* Kolom Skala Prioritas */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-emerald-500 transition-all flex flex-col justify-between shadow-md hover:shadow-lg">
                  <div>
                    <div className="bg-emerald-50 text-emerald-700 w-12 h-12 rounded-xl flex items-center justify-center font-black mb-5 border border-emerald-100 text-lg shadow-3xs">
                      N
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-900">
                      Kolom Skala Prioritas (Kolom N)
                    </h3>
                    <p className="text-slate-600 text-sm mt-3.5 leading-relaxed">
                      Sistem klasifikasi otomatis untuk menyaring debitur dengan <strong>plafond kecil (&le; 100 juta)</strong> yang memiliki sisa masa angsuran pendek dan berkinerja lancar (Kolektibilitas 1).
                    </p>
                  </div>
                  <div className="mt-8 border-t border-slate-100 pt-4 flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold uppercase">Aturan Utama:</span>
                    <span className="bg-amber-50 text-amber-800 font-bold px-3 py-1 rounded border border-amber-200/80">Lancar & Tenor &le; 24 Bulan</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8 animate-fade-in my-auto">
              <div className="space-y-3">
                <span className="text-emerald-700 font-mono text-xs uppercase font-bold tracking-widest bg-emerald-100 border border-emerald-200 px-4 py-1.5 rounded-full">
                  Bagian 2: Logika Aturan & Rumus Excel
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-slate-900 leading-tight">
                  Rumus Excel & <span className="text-emerald-600">Logika Penerapan</span>
                </h1>
                <p className="text-slate-600 text-sm md:text-base max-w-4xl leading-relaxed">
                  Mari kita telaah aturan penulisan formula Excel yang tepat sesuai dengan standar perbankan agar kalkulasi berjalan akurat secara otomatis pada lembar kerja Anda.
                </p>
              </div>

              {/* Detail Formula Cards - Light Mode */}
              <div className="space-y-6">
                {/* Formula Usia */}
                <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-md">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-100 pb-5 mb-5">
                    <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-3 py-1.5 rounded font-mono font-extrabold">KOLOM D</span>
                      Formula Perhitungan Usia
                    </h3>
                    <code className="bg-slate-900 text-white font-mono text-sm font-bold p-3 px-5 rounded-xl border border-slate-800 shadow-sm flex items-center gap-0.5 select-all">
                      <span className="text-indigo-400 font-black">=DATEDIF</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-emerald-400 font-extrabold">F2</span>
                      <span className="text-slate-400">, </span>
                      <span className="text-amber-400 font-extrabold">TODAY()</span>
                      <span className="text-slate-400">, </span>
                      <span className="text-rose-400 font-extrabold">"Y"</span>
                      <span className="text-slate-400">)</span>
                    </code>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500 uppercase font-black tracking-wider">Aturan Kerja Rumus:</p>
                    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2 leading-relaxed">
                      <li><strong>F2</strong> mereferensikan sel tanggal lahir debitur pada baris berjalan.</li>
                      <li><strong>TODAY()</strong> mengambil tanggal sistem internal hari ini secara dinamis.</li>
                      <li><strong>"Y"</strong> menandakan bahwa output harus dikalkulasi sebagai selisih tahun penuh (bukan bulan atau hari).</li>
                    </ul>
                  </div>
                </div>

                {/* Formula Skala Prioritas */}
                <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-md">
                  <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 mb-5">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                      <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                        <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-3 py-1.5 rounded font-mono font-extrabold">KOLOM N</span>
                        Formula Logika Bersarang Skala Prioritas
                      </h3>
                    </div>
                    <code className="bg-slate-900 text-white font-mono text-xs md:text-sm font-bold p-3.5 px-5 rounded-xl border border-slate-800 block overflow-x-auto whitespace-pre select-all shadow-sm">
                      <span className="text-indigo-400 font-black">=IF</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-indigo-400 font-black">AND</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-emerald-400 font-extrabold">F2</span>
                      <span className="text-slate-400">&le;</span>
                      <span className="text-violet-400 font-bold">100000000</span>
                      <span className="text-slate-400">, </span>
                      <span className="text-emerald-400 font-extrabold">M2</span>
                      <span className="text-slate-400">=</span>
                      <span className="text-violet-400 font-bold">1</span>
                      <span className="text-slate-400">)</span>
                      <span className="text-slate-400">, </span>
                      <span className="text-indigo-400 font-black">IF</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-emerald-400 font-extrabold">L2</span>
                      <span className="text-slate-400">&le;</span>
                      <span className="text-violet-400 font-bold">24</span>
                      <span className="text-slate-400">, </span>
                      <span className="text-amber-400 font-extrabold">"PRIORITAS 1"</span>
                      <span className="text-slate-400">, </span>
                      <span className="text-teal-400 font-extrabold">"PRIORITAS 2"</span>
                      <span className="text-slate-400">)</span>
                      <span className="text-slate-400">, </span>
                      <span className="text-rose-400 font-extrabold">"CEK MANUAL"</span>
                      <span className="text-slate-400">)</span>
                    </code>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500 uppercase font-black tracking-wider">Logika Kondisi (Tiga Saringan Utama):</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-3xs">
                        <span className="text-[10px] text-amber-600 font-black uppercase tracking-wider block mb-1.5">Saringan 1: Kelayakan</span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Memastikan plafond kredit <span className="text-slate-900 font-bold">&le; 100 juta (F2)</span> DAN status pembayaran lancar <span className="text-slate-900 font-bold">(Kolom Kol M2 = 1)</span>.
                        </p>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-3xs">
                        <span className="text-[10px] text-emerald-600 font-black uppercase tracking-wider block mb-1.5">Saringan 2: Sisa Tenor</span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Jika lolos Saringan 1, dievaluasi sisa tenor <span className="text-slate-900 font-bold">(L2)</span>. Jika <span className="text-slate-900 font-bold">&le; 24 bulan</span> diberi label <span className="text-emerald-600 font-bold">"PRIORITAS 1"</span>, jika lebih masuk <span className="text-blue-600 font-bold">"PRIORITAS 2"</span>.
                        </p>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-3xs">
                        <span className="text-[10px] text-rose-600 font-black uppercase tracking-wider block mb-1.5">Saringan 3: Cek Manual</span>
                        <p className="text-xs text-slate-600 leading-relaxed">
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
                <span className="text-emerald-700 font-mono text-xs uppercase font-bold tracking-widest bg-emerald-100 border border-emerald-200 px-4 py-1.5 rounded-full shadow-3xs">
                  Bagian 1: Batas Usia Pensiun & Prospek Pegawai Plus
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-slate-900 leading-tight">
                  Manajemen Kredit ASN: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Pegawai Plus & Sisa Masa Dinas</span>
                </h1>
                <p className="text-slate-600 text-sm md:text-base max-w-4xl leading-relaxed">
                  Pada lembar kerja kedua ini, bank fokus mengelola debitur pegawai aktif/Aparatur Sipil Negara (ASN) yang mendekati Batas Usia Pensiun (BUP). Analis harus memetakan sisa masa dinas ke skema "Pegawai Plus".
                </p>
              </div>

              {/* Grid Layout explaining Window 2 Columns - Light Theme */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {/* Kolom Nofas */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500 transition-all flex flex-col justify-between shadow-md hover:shadow-lg">
                  <div>
                    <div className="bg-emerald-50 text-emerald-700 w-11 h-11 rounded-xl flex items-center justify-center font-black mb-4 border border-emerald-100 text-lg shadow-3xs">
                      A
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-900">
                      Kolom Nofas (Kolom A)
                    </h3>
                    <p className="text-slate-600 text-xs mt-3 leading-relaxed">
                      <strong>Nomor Fasilitas</strong>. Merupakan pengenal unik (Primary Key) dari sistem inti perbankan untuk melacak riwayat pinjaman berjalan secara tunggal tanpa risiko tertukar.
                    </p>
                  </div>
                  <div className="mt-5 border-t border-slate-100 pt-3 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 font-bold uppercase">Sifat:</span>
                    <span className="bg-slate-100 text-slate-700 border border-slate-200 font-mono px-2 py-0.5 rounded font-bold">Unik & Konsisten</span>
                  </div>
                </div>

                {/* Kolom Prospek Untuk Kredit */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500 transition-all flex flex-col justify-between shadow-md hover:shadow-lg">
                  <div>
                    <div className="bg-emerald-50 text-emerald-700 w-11 h-11 rounded-xl flex items-center justify-center font-black mb-4 border border-emerald-100 text-lg shadow-3xs">
                      K
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-900">
                      Prospek Kredit (Kolom K)
                    </h3>
                    <p className="text-slate-600 text-xs mt-3 leading-relaxed">
                      Sistem klasifikasi penawaran program jaminan hari tua pensiun. Dibagi menjadi <strong>Skema 1</strong> (Sisa masa dinas sedang) atau <strong>Skema 2</strong> (Masa dinas pendek).
                    </p>
                  </div>
                  <div className="mt-5 border-t border-slate-100 pt-3 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 font-bold uppercase">Kriteria:</span>
                    <span className="bg-amber-50 text-amber-800 border border-amber-200 font-bold px-2 py-0.5 rounded">Berdasarkan Sisa Dinas</span>
                  </div>
                </div>

                {/* Kolom Prospek */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500 transition-all flex flex-col justify-between shadow-md hover:shadow-lg">
                  <div>
                    <div className="bg-emerald-50 text-emerald-700 w-11 h-11 rounded-xl flex items-center justify-center font-black mb-4 border border-emerald-100 text-lg shadow-3xs">
                      N
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-900">
                      Kolom Prospek (Kolom N)
                    </h3>
                    <p className="text-slate-600 text-xs mt-3 leading-relaxed">
                      Status kelayakan akhir pemasaran berdasarkan sisa limit outstanding nominal pinjaman debitur (Baki Debet berjalan Juni &le; Rp 100 Juta).
                    </p>
                  </div>
                  <div className="mt-5 border-t border-slate-100 pt-3 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 font-bold uppercase">Batas Baki Debet:</span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded">&le; 100.000.000</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8 animate-fade-in my-auto">
              <div className="space-y-3">
                <span className="text-emerald-700 font-mono text-xs uppercase font-bold tracking-widest bg-emerald-100 border border-emerald-200 px-4 py-1.5 rounded-full">
                  Bagian 2: Logika Aturan & Rumus Excel Pegawai Plus
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-slate-900 leading-tight">
                  Kriteria Aturan & <span className="text-emerald-600">Penerapan Rumus</span>
                </h1>
                <p className="text-slate-600 text-sm md:text-base max-w-4xl leading-relaxed">
                  Staf baru harus menuliskan logika IF bertingkat dan perhitungan selisih BUP secara konsisten menggunakan formula berikut.
                </p>
              </div>

              {/* Detail Formula Cards Window 2 - Light Mode */}
              <div className="space-y-5">
                {/* Formula Prospek Untuk Kredit */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md">
                  <div className="flex flex-col gap-2.5 border-b border-slate-100 pb-4 mb-4">
                    <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1.5 rounded font-mono font-extrabold">KOLOM K</span>
                      Formula Klasifikasi Skema Pegawai Plus
                    </h3>
                    <code className="bg-slate-900 text-white font-mono text-xs md:text-sm font-bold p-3.5 px-5 rounded-xl border border-slate-800 block overflow-x-auto whitespace-pre select-all shadow-sm">
                      <span className="text-indigo-400 font-black">=IF</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-emerald-400 font-extrabold">J2</span>
                      <span className="text-slate-400">&le;</span>
                      <span className="text-violet-400 font-bold">5</span>
                      <span className="text-slate-400">, </span>
                      <span className="text-amber-400 font-extrabold">"Pegawai Plus Skema 2"</span>
                      <span className="text-slate-400">, </span>
                      <span className="text-indigo-400 font-black">IF</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-emerald-400 font-extrabold">J2</span>
                      <span className="text-slate-400">&le;</span>
                      <span className="text-violet-400 font-bold">8</span>
                      <span className="text-slate-400">, </span>
                      <span className="text-teal-400 font-extrabold">"Pegawai Plus Skema 1"</span>
                      <span className="text-slate-400">, </span>
                      <span className="text-rose-400 font-extrabold">"Belum Pegawai Plus"</span>
                      <span className="text-slate-400">)</span>
                      <span className="text-slate-400">)</span>
                    </code>
                  </div>
                  <div className="space-y-2.5">
                    <p className="text-xs text-slate-500 uppercase font-black tracking-wider">Logika Evaluasi:</p>
                    <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1.5 leading-relaxed">
                      <li><strong>J2</strong> mereferensikan kolom <strong>Sisa Masa Dinas (Tahun)</strong>.</li>
                      <li>Kondisi 1: Jika sisa masa dinas &le; 5 tahun, sistem melabeli sebagai <strong className="text-slate-900">"Pegawai Plus Skema 2"</strong>.</li>
                      <li>Kondisi 2: Jika sisa masa dinas di antara 6 hingga 8 tahun (&le; 8), sistem menetapkan <strong className="text-slate-900">"Pegawai Plus Skema 1"</strong>.</li>
                      <li>Kondisi 3 (Sisa): Jika sisa masa dinas &gt; 8 tahun, status ditetapkan <strong className="text-slate-500 font-bold">"Belum Pegawai Plus"</strong>.</li>
                    </ul>
                  </div>
                </div>

                {/* Formula Prospek */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                    <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
                      <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2.5 py-1.5 rounded font-mono font-extrabold">KOLOM N</span>
                      Formula Kelayakan Prospek Baki Debet
                    </h3>
                    <code className="bg-slate-900 text-white font-mono text-sm font-bold p-3 px-5 rounded-xl border border-slate-800 shadow-sm flex items-center gap-0.5 select-all">
                      <span className="text-indigo-400 font-black">=IF</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-emerald-400 font-extrabold">M2</span>
                      <span className="text-slate-400">&le;</span>
                      <span className="text-violet-400 font-bold">100000000</span>
                      <span className="text-slate-400">, </span>
                      <span className="text-emerald-400 font-bold">"BISA"</span>
                      <span className="text-slate-400">, </span>
                      <span className="text-rose-400 font-extrabold">"TIDAK BISA"</span>
                      <span className="text-slate-400">)</span>
                    </code>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs text-slate-500 uppercase font-black tracking-wider">Logika Evaluasi:</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Mengevaluasi sisa saldo pokok pinjaman debitur (Baki Debet Juni) di sel <strong className="text-slate-900 font-mono">M2</strong>. Jika sisa saldo <strong className="text-emerald-700 font-bold">&le; Rp 100 Juta</strong>, maka diberi keputusan <strong className="text-emerald-700 font-bold">"BISA"</strong> diprospek ulang. Jika di atas Rp 100 Juta, berstatus <strong className="text-rose-700 font-bold">"TIDAK BISA"</strong> karena limit terlalu tinggi untuk program retail.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {/* Presentation Slide Control Actions Footer - Light Theme */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between mt-8 select-none shrink-0 shadow-md">
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={slideIndex === 0}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed border border-slate-200 text-slate-700"
            >
              <ChevronLeft className="w-4 h-4" /> Sebelumnya
            </button>
            <span className="hidden sm:flex items-center text-xs text-slate-500 px-2 font-mono font-bold">
              Halaman {slideIndex + 1} / 2
            </span>
          </div>

          <div className="flex gap-2">
            {slideIndex === 0 ? (
              <button
                onClick={nextSlide}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                Penjelasan Logika & Rumus <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onStartSimulation(isWindow1 ? "prospek_under_100jt" : "pegawai_plus_bup")}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-600/20 border border-emerald-500/20 animate-pulse"
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
