import React, { useState, useEffect, useRef } from "react";
import { 
  Award, BookOpen, Bot, CheckCircle, ChevronDown, Sparkles, Layers, RefreshCw, BarChart2, Star, 
  CheckSquare, MessageSquare, X, Table, Snowflake, ArrowUpDown, Filter, Paintbrush, Trash2, 
  Search, Play, PlusCircle, Database, BarChart3, Send, ChevronRight, ChevronLeft, HelpCircle, AlertCircle, User 
} from "lucide-react";

// ==========================================
// 1. TYPES & INTERFACES DEFINITIONS
// ==========================================
export interface DebtorRow {
  id: number;
  cif: string;
  nama: string;
  cabang: string;
  produk: "Kredit Konsumtif" | "Kredit Produktif";
  plafond: number;
  outstanding: number; // baki debet
  tenor: number; // dalam bulan
  tanggalCair: string; // DD/MM/YYYY
  tanggalJatuhTempo: string; // DD/MM/YYYY
  tanggalLahir: string; // DD/MM/YYYY
  instansi: string;
  kolektibilitas: "Lancar" | "Dalam Perhatian Khusus" | "Kurang Lancar" | "Diragukan" | "Macet";
  status?: string; // TARGET / NON TARGET
  usia?: number; // dihitung dari tanggal lahir
  lamaKreditBulan?: number; // dihitung dari tanggal cair
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  instructions: string;
  expectedType: "formula" | "sort" | "filter" | "table" | "freeze" | "conditional_format" | "remove_duplicate" | "trim" | "replace";
  targetColumn?: string;
  expectedValueDescription?: string;
  hint: string;
  successMessage: string;
  completed: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  contentHtml: string;
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  chapters: Chapter[];
  challenges: Challenge[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

// ==========================================
// 2. HIGH-FIDELITY LESSONS DATA
// ==========================================
export const INITIAL_DEBTOR_DATA: DebtorRow[] = [
  { id: 1, cif: "10001", nama: "Andi", cabang: "KC AMBON", produk: "Kredit Konsumtif", plafond: 75000000, outstanding: 25000000, tenor: 36, tanggalCair: "15/01/2023", tanggalJatuhTempo: "15/01/2026", tanggalLahir: "15/03/1985", instansi: "Pemerintah Daerah", kolektibilitas: "Lancar" },
  { id: 2, cif: "10002", nama: "Budi", cabang: "KC AMBON", produk: "Kredit Produktif", plafond: 125000000, outstanding: 40000000, tenor: 24, tanggalCair: "20/08/2024", tanggalJatuhTempo: "20/08/2026", tanggalLahir: "10/08/1990", instansi: "Swasta Mandiri", kolektibilitas: "Lancar" },
  { id: 3, cif: "10003", nama: "Citra", cabang: "Kantor Pusat Ambon", produk: "Kredit Konsumtif", plafond: 95000000, outstanding: 35000000, tenor: 12, tanggalCair: "10/03/2025", tanggalJatuhTempo: "10/03/2026", tanggalLahir: "25/06/1978", instansi: "Instansi Pendidikan", kolektibilitas: "Dalam Perhatian Khusus" },
  { id: 4, cif: "10004", nama: "Dodi", cabang: "KC AMBON", produk: "Kredit Konsumtif", plafond: 150000000, outstanding: 20000000, tenor: 48, tanggalCair: "19/12/2024", tanggalJatuhTempo: "19/12/2028", tanggalLahir: "05/09/1982", instansi: "Pemerintah Daerah", kolektibilitas: "Lancar" },
  { id: 5, cif: "10005", nama: "Elsa", cabang: "KC AMBON", produk: "Kredit Produktif", plafond: 250000000, outstanding: 185500000, tenor: 60, tanggalCair: "14/03/2023", tanggalJatuhTempo: "14/03/2028", tanggalLahir: "12/12/1975", instansi: "Swasta Mandiri", kolektibilitas: "Kurang Lancar" },
  { id: 6, cif: "10006", nama: "Fani  ", cabang: "KC AMBON", produk: "Kredit Konsumtif", plafond: 45000000, outstanding: 30266246, tenor: 24, tanggalCair: "03/02/2022", tanggalJatuhTempo: "03/02/2024", tanggalLahir: "21/07/1995", instansi: "Instansi Pendidikan", kolektibilitas: "Lancar" },
  { id: 7, cif: "10001", nama: "Andi", cabang: "KC AMBON", produk: "Kredit Konsumtif", plafond: 75000000, outstanding: 25000000, tenor: 36, tanggalCair: "15/01/2023", tanggalJatuhTempo: "15/01/2026", tanggalLahir: "15/03/1985", instansi: "Pemerintah Daerah", kolektibilitas: "Lancar" },
  { id: 8, cif: "10007", nama: "Gita", cabang: "KC AMBON", produk: "Kredit Produktif", plafond: 210000000, outstanding: 156423000, tenor: 48, tanggalCair: "21/07/2023", tanggalJatuhTempo: "21/07/2027", tanggalLahir: "30/10/1988", instansi: "Pemerintah Daerah", kolektibilitas: "Lancar" }
];

export const EXCEL_LESSONS: Lesson[] = [
  {
    id: 1,
    title: "Mengenal Data",
    subtitle: "Dasar data nominatif kredit dan jenis-jenis data di Excel",
    chapters: [
      {
        id: "ch1_1",
        title: "Apa itu Data Nominatif Kredit?",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            <strong>Data nominatif kredit</strong> adalah kumpulan informasi rinci mengenai seluruh debitur yang memiliki fasilitas kredit di bank, yang disajikan secara individual berdasarkan nama atau identitas masing-masing nasabah.
          </p>
          <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-md mb-4 text-xs">
            <h5 class="font-semibold text-emerald-900 mb-1">Informasi Utama Nominatif Kredit:</h5>
            <ul class="list-disc pl-5 text-emerald-800 space-y-1">
              <li><strong>Cabang:</strong> Kantor operasional tempat kredit diberikan.</li>
              <li><strong>Nofas (CIF):</strong> Nomor Fasilitas atau nomor identitas nasabah di sistem bank.</li>
              <li><strong>Nama Debitur:</strong> Nama lengkap nasabah penerima fasilitas.</li>
              <li><strong>Jenis Produk Kredit:</strong> Kategori kredit (Konsumtif / Produktif).</li>
              <li><strong>Plafond Kredit:</strong> Limit maksimal pinjaman yang disetujui.</li>
              <li><strong>Outstanding Kredit (Baki Debet):</strong> Sisa pokok pinjaman saat ini.</li>
            </ul>
          </div>
        `
      },
      {
        id: "ch1_2",
        title: "Mengapa Data Nominatif Penting?",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            Dalam dunia perbankan, data nominatif menjadi dasar bagi staf pemasaran kredit untuk:
          </p>
          <ul class="list-disc pl-5 mb-4 text-slate-600 space-y-2 text-xs">
            <li><strong>Monitoring kualitas kredit:</strong> Mendeteksi nasabah dengan kolektibilitas menurun sejak dini agar baki debet tidak berujung macet.</li>
            <li><strong>Menyusun strategi pemasaran:</strong> Mengetahui debitur potensial untuk penawaran produk baru atau top up plafon.</li>
          </ul>
        `
      }
    ],
    challenges: [
      {
        id: "chal1_1",
        title: "Eksplorasi Dataset",
        description: "Mari kenali tabel data nominatif di samping.",
        instructions: "Gunakan menu navigasi Spreadsheet untuk melihat data. Jika sudah paham isi kolomnya, klik tombol 'Selesaikan Misi' untuk melanjutkan.",
        expectedType: "table",
        hint: "Misi ini mengenalkan Anda pada layout tabel. Anda hanya perlu meninjau kolom-kolom seperti Nama, Plafond, Outstanding, Tanggal Cair.",
        successMessage: "Bagus! Anda sekarang telah memahami struktur dasar dari data nominatif kredit.",
        completed: false
      }
    ]
  },
  {
    id: 2,
    title: "Mengelola Data",
    subtitle: "Mengurutkan, memfilter, dan menata data agar rapi dan informatif",
    chapters: [
      {
        id: "ch2_1",
        title: "Mengubah Data Menjadi Table (Ctrl + T)",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            <strong>Table</strong> adalah fitur Excel yang mengubah kumpulan data biasa menjadi terstruktur dan dinamis.
          </p>
          <ul class="list-disc pl-5 mb-3 text-xs text-slate-600 space-y-1">
            <li>Menambahkan filter otomatis pada setiap header kolom.</li>
            <li>Zebra striping (baris berwarna selang-seling) secara otomatis agar mudah dibaca.</li>
          </ul>
        `
      },
      {
        id: "ch2_2",
        title: "Sort (Mengurutkan Data) & Filter (Menyaring Data)",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            <strong>Sort</strong> digunakan untuk mengurutkan data berdasarkan kriteria tertentu (misalnya mengurutkan baki debet terbesar ke terkecil, atau mengurutkan nama abjad A-Z).
          </p>
          <p class="mb-3 text-slate-600 leading-relaxed">
            <strong>Filter</strong> digunakan untuk menyembunyikan sementara baris data yang tidak memenuhi kriteria tertentu.
          </p>
        `
      }
    ],
    challenges: [
      {
        id: "chal2_1",
        title: "Format as Table (Ctrl + T)",
        description: "Ubah kumpulan data dasar menjadi format Excel Table terstruktur.",
        instructions: "Klik tombol 'Ctrl + T (Format Table)' pada panel kendali Spreadsheet di sebelah kanan untuk memicu pemformatan tabel dinamis.",
        expectedType: "table",
        hint: "Gunakan tombol kontrol interaktif di atas tabel untuk memformat spreadsheet menjadi Table terstruktur.",
        successMessage: "Hebat! Tabel sekarang terformat secara profesional dengan zebra striping dan filter otomatis di setiap kolom.",
        completed: false
      },
      {
        id: "chal2_2",
        title: "Sort Plafond Terbesar",
        description: "Urutkan debitur berdasarkan Plafond terbesar (Largest to Smallest).",
        instructions: "Klik header kolom 'Plafond' pada tabel lalu pilih menu 'Urutkan Terbesar' (atau gunakan tombol 'Urutkan Plafond Terbesar' di kontrol).",
        expectedType: "sort",
        hint: "Gunakan tombol urutkan Plafond di samping atau klik kontrol Sort.",
        successMessage: "Sempurna! Anda berhasil menempatkan nasabah dengan eksposur plafon terbesar di baris teratas.",
        completed: false
      },
      {
        id: "chal2_3",
        title: "Aktifkan Freeze Top Row",
        description: "Kunci baris header agar tidak ikut bergeser saat digulir.",
        instructions: "Aktifkan 'Freeze Header' dengan mengklik tombol toggle Freeze Panes di panel spreadsheet.",
        expectedType: "freeze",
        hint: "Membantu Anda melihat nama kolom dengan jelas saat scrolling data panjang.",
        successMessage: "Luar biasa! Header tabel sekarang terkunci di posisi atas (sticky header).",
        completed: false
      }
    ]
  },
  {
    id: 3,
    title: "Membersihkan Data",
    subtitle: "Teknik pembersihan data dari spasi berlebih, duplikat, dan kesalahan entri",
    chapters: [
      {
        id: "ch3_1",
        title: "Remove Duplicate & TRIM",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            Menghapus baris ganda (duplikat) penting untuk menghindari double counting baki debet nasabah. Begitupun <strong>=TRIM(text)</strong> untuk membuang spasi berlebih.
          </p>
        `
      }
    ],
    challenges: [
      {
        id: "chal3_1",
        title: "Hapus Baris Duplikat",
        description: "Hapus CIF ganda untuk menghindari double counting debitur.",
        instructions: "Identifikasi baris duplikat (debitur 'Andi' dengan CIF 10001 muncul dua kali). Klik tombol 'Hapus Duplikat' di atas tabel spreadsheet.",
        expectedType: "remove_duplicate",
        hint: "Baris dengan CIF 10001 ada dua buah. Menghapusnya menyisakan data unik.",
        successMessage: "Kerja bagus! Baris duplikat Andi berhasil dihapus, total debitur sekarang akurat.",
        completed: false
      },
      {
        id: "chal3_2",
        title: "Ganti Nama Kantor Cabang",
        description: "Lakukan koreksi massal nama cabang 'Kantor Pusat Ambon' menjadi 'KC AMBON'.",
        instructions: "Gunakan tombol input 'Replace' di bagian aksi data: Masukkan kata 'Kantor Pusat Ambon' untuk dicari dan ganti dengan 'KC AMBON'.",
        expectedType: "replace",
        hint: "Ketik 'Kantor Pusat Ambon' di kolom cari dan 'KC AMBON' di kolom ganti lalu klik Replace.",
        successMessage: "Luar biasa! Seluruh nama kantor cabang sekarang seragam menjadi KC AMBON.",
        completed: false
      }
    ]
  },
  {
    id: 4,
    title: "Rumus Dasar",
    subtitle: "Menguasai rumus wajib: IF, SUM, COUNT, SUBTOTAL, TODAY, dan DATEDIF",
    chapters: [
      {
        id: "ch4_1",
        title: "Fungsi Logika IF & DATEDIF",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            Fungsi <strong>IF</strong> digunakan untuk menguji suatu kondisi (misalnya memilah TARGET vs NON TARGET). Sedangkan <strong>DATEDIF</strong> untuk mencari selisih tahun penuh (usia debitur).
          </p>
          <p class="text-xs font-mono bg-slate-100 p-2 rounded mb-2">=IF(E2<=100000000, "TARGET", "NON TARGET")</p>
          <p class="text-xs font-mono bg-slate-100 p-2 rounded mb-2">=DATEDIF(Tanggal_Lahir, TODAY(), "Y")</p>
        `
      }
    ],
    challenges: [
      {
        id: "chal4_1",
        title: "Tulis Rumus IF Target Pemasaran",
        description: "Masukkan rumus IF pada kolom Status untuk memilah target plafond <= Rp100.000.000.",
        instructions: "Ketik rumus ini di bilah formula bar atas atau klik tombol 'Isi Rumus IF' untuk mengaktifkannya: `=IF(E2<=100000000,\"TARGET\",\"NON TARGET\")`",
        expectedType: "formula",
        targetColumn: "status",
        expectedValueDescription: "=IF(E2<=100000000,\"TARGET\",\"NON TARGET\")",
        hint: "Ketik `=IF(E2<=100000000,\"TARGET\",\"NON TARGET\")` pada input formula bar lalu tekan tombol Enter/Apply.",
        successMessage: "Sangat baik! Kolom Status sekarang terisi otomatis. Anda berhasil memilah debitur target mikro (< 100jt).",
        completed: false
      },
      {
        id: "chal4_2",
        title: "Hitung Usia Debitur dengan DATEDIF",
        description: "Gunakan rumus DATEDIF untuk menghitung usia masing-masing debitur.",
        instructions: "Gunakan tanggal lahir nasabah (kolom Tanggal Lahir) dengan rumus: `=DATEDIF(K2,TODAY(),\"Y\")` di kolom Usia.",
        expectedType: "formula",
        targetColumn: "usia",
        expectedValueDescription: "=DATEDIF(K2,TODAY(),\"Y\")",
        hint: "Ketik `=DATEDIF(K2,TODAY(),\"Y\")` di bilah rumus untuk menghitung selisih tahun dari Tanggal Lahir.",
        successMessage: "Hebat! Kolom Usia terisi dengan umur nasabah dalam satuan tahun penuh.",
        completed: false
      }
    ]
  },
  {
    id: 5,
    title: "Analisa Sederhana",
    subtitle: "Menggabungkan semua teknik untuk menghasilkan laporan analisa cepat",
    chapters: [
      {
        id: "ch5_1",
        title: "Studi Kasus Analisis Kredit",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            Mari gabungkan seluruh pengetahuan Anda untuk menjawab kriteria laporan pimpinan bank menggunakan rumus <strong>COUNTIF</strong>.
          </p>
          <p class="text-xs font-mono bg-slate-100 p-2 rounded mb-2">=COUNTIF(D2:D8, "Kredit Konsumtif")</p>
        `
      }
    ],
    challenges: [
      {
        id: "chal5_1",
        title: "Hitung Jumlah Debitur Konsumtif",
        description: "Gunakan COUNTIF untuk menghitung berapa banyak debitur dengan produk Kredit Konsumtif.",
        instructions: "Di Spreadsheet Simulator, masukkan rumus ini di bilah formula untuk menganalisa: `=COUNTIF(D2:D8,\"Kredit Konsumtif\")`",
        expectedType: "formula",
        expectedValueDescription: "=COUNTIF(D2:D8,\"Kredit Konsumtif\")",
        hint: "Ketik `=COUNTIF(D2:D8,\"Kredit Konsumtif\")` untuk menghitung jumlah baris yang memiliki nilai 'Kredit Konsumtif' pada kolom Produk.",
        successMessage: "Sempurna! Formula mengembalikan nilai 4 nasabah Konsumtif. Analisa Anda sangat akurat!",
        completed: false
      },
      {
        id: "chal5_2",
        title: "Filter Kredit Produktif",
        description: "Tampilkan hanya baris yang memiliki produk Kredit Produktif.",
        instructions: "Gunakan kontrol filter produk di panel tabel atau klik tombol 'Filter Kredit Produktif'.",
        expectedType: "filter",
        hint: "Filter kolom Produk hanya untuk 'Kredit Produktif'.",
        successMessage: "Luar biasa! Tabel sekarang hanya menampilkan portofolio produktif bank.",
        completed: false
      }
    ]
  }
];

// ==========================================
// 3. COMPONENT: LESSON CONTENT (Modul Belajar)
// ==========================================
interface LessonContentProps {
  lessons: Lesson[];
  activeLessonIndex: number;
  setActiveLessonIndex: (index: number) => void;
  activeChallenge: Challenge | null;
  setActiveChallenge: (challenge: Challenge | null) => void;
}

export function LessonContent({
  lessons,
  activeLessonIndex,
  setActiveLessonIndex,
  activeChallenge,
  setActiveChallenge
}: LessonContentProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const lesson = lessons[activeLessonIndex] || lessons[0];
  const chapters = lesson.chapters;
  const challenges = lesson.challenges;

  const completedCount = challenges.filter(c => c.completed).length;
  const progressPercent = Math.round((completedCount / challenges.length) * 100) || 0;

  const handleNextChapter = () => {
    if (activeChapterIndex < chapters.length - 1) {
      setActiveChapterIndex(activeChapterIndex + 1);
    } else if (activeLessonIndex < lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
      setActiveChapterIndex(0);
    }
  };

  const handlePrevChapter = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex(activeChapterIndex - 1);
    } else if (activeLessonIndex > 0) {
      const prevLesson = lessons[activeLessonIndex - 1];
      setActiveLessonIndex(activeLessonIndex - 1);
      setActiveChapterIndex(prevLesson.chapters.length - 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm" id="lesson-module">
      <div className="p-5 bg-emerald-900 text-white select-none">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-4 h-4 text-emerald-300" />
          <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Modul {lesson.id} dari {lessons.length}</span>
        </div>
        <h3 className="font-display font-bold text-base tracking-tight leading-tight mb-1">{lesson.title}</h3>
        <p className="text-[11px] text-emerald-100 font-light">{lesson.subtitle}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-[10px] font-semibold text-emerald-200 mb-1">
            <span>Progres Praktik Modul</span>
            <span>{progressPercent}% Selesai</span>
          </div>
          <div className="w-full bg-emerald-950/60 h-1.5 rounded-full overflow-hidden border border-emerald-800/40">
            <div 
              className="bg-emerald-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border-b border-slate-200 flex overflow-x-auto custom-scrollbar select-none text-[11px] font-medium text-slate-500">
        {chapters.map((ch, idx) => {
          const isSelected = activeChapterIndex === idx;
          return (
            <button
              key={ch.id}
              onClick={() => setActiveChapterIndex(idx)}
              className={`px-4 py-3 border-r border-slate-200 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                isSelected 
                  ? "bg-white text-emerald-700 font-bold border-b-2 border-b-emerald-600" 
                  : "hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                isSelected ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
              }`}>
                {idx + 1}
              </span>
              {ch.title}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <h4 className="font-display font-bold text-sm text-slate-900 mb-2 tracking-tight flex items-center gap-2">
          <span className="text-emerald-600 font-mono">#{activeChapterIndex + 1}</span> 
          {chapters[activeChapterIndex]?.title}
        </h4>
        
        <div 
          className="prose prose-sm max-w-none text-slate-600 text-xs leading-relaxed"
          dangerouslySetInnerHTML={{ __html: chapters[activeChapterIndex]?.contentHtml || "" }}
        />

        <div className="mt-5 border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
          <div className="bg-slate-800 p-2.5 px-3.5 text-white flex items-center justify-between">
            <h5 className="font-display font-bold text-xs tracking-tight flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Tantangan Praktik Mandiri
            </h5>
            <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-bold">
              {completedCount} / {challenges.length} Selesai
            </span>
          </div>
          
          <div className="p-3 space-y-2">
            {challenges.map((ch) => {
              const isActive = activeChallenge?.id === ch.id;
              return (
                <div 
                  key={ch.id}
                  onClick={() => setActiveChallenge(ch)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    ch.completed 
                      ? "bg-emerald-50/30 border-emerald-100 text-slate-500" 
                      : isActive
                        ? "bg-white border-emerald-500 shadow-sm ring-2 ring-emerald-100 text-slate-900 font-medium"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  <div className="flex gap-2 items-start">
                    <div className="mt-0.5 shrink-0">
                      {ch.completed ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <div className={`w-3.5 h-3.5 rounded-full border-2 ${
                          isActive ? "border-emerald-600" : "border-slate-300"
                        }`} />
                      )}
                    </div>
                    <div>
                      <p className={`text-[11px] font-semibold ${ch.completed ? "line-through text-slate-400" : ""}`}>
                        {ch.title}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                        {ch.description}
                      </p>
                      
                      {isActive && !ch.completed && (
                        <div className="mt-2 bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-[10px] text-slate-600">
                          <p className="font-semibold text-slate-800 mb-0.5">Petunjuk Langkah:</p>
                          <p>{ch.instructions}</p>
                          <p className="text-emerald-700 font-mono mt-1 text-[9px] bg-emerald-50 p-1 rounded border border-emerald-100">
                            Target Aksi: {ch.expectedValueDescription || "Gunakan tombol kontrol di atas tabel."}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between select-none">
        <button
          onClick={handlePrevChapter}
          disabled={activeLessonIndex === 0 && activeChapterIndex === 0}
          className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-800 disabled:opacity-40 px-3 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Kembali
        </button>

        <span className="text-[10px] text-slate-400 font-mono">
          Hal {activeChapterIndex + 1} / {chapters.length}
        </span>

        <button
          onClick={handleNextChapter}
          className="flex items-center gap-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 rounded-lg cursor-pointer"
        >
          {activeChapterIndex === chapters.length - 1 && activeLessonIndex === lessons.length - 1 ? (
            "Selesai Pelajaran 🎉"
          ) : (
            <>
              Lanjut <ChevronRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 4. COMPONENT: AI TUTOR COACH ASSISTANT
// ==========================================
export function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "ai",
      text: "Halo! Saya adalah **Asisten AI Excel Kredit**. \n\nAda yang bisa saya bantu terkait pengolahan data kredit di Excel hari ini? Anda bisa menanyakan:\n- *Bagaimana cara menghitung usia debitur dengan DATEDIF?*\n- *Apa bedanya SUM dengan SUBTOTAL saat melakukan filter?*\n- *Berikan contoh rumus IF untuk memilah kolektibilitas Lancar vs Macet.*",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsgText = input;
    setInput("");
    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const formattedHistory = messages.map(m => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMsgText,
          history: formattedHistory
        })
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung dengan server AI. Silakan coba lagi.");
      }

      const resData = await response.json();
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: resData.response || "Maaf, saya tidak menerima respons yang valid.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      setError(err.message || "Terjadi masalah jaringan.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const formatText = (text: string) => {
    return text.split("\n").map((line, idx) => {
      let formattedLine = line;
      formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-emerald-950">$1</strong>');
      formattedLine = formattedLine.replace(/\*(.*?)\*/g, '<em class="text-slate-800 italic">$1</em>');
      
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const clean = line.replace(/^[-*]\s+/, "");
        return <li key={idx} className="ml-4 list-disc text-[11px] text-slate-700 mb-0.5" dangerouslySetInnerHTML={{ __html: clean }} />;
      }
      if (line.trim().startsWith("=")) {
        return <div key={idx} className="bg-slate-900 text-emerald-400 font-mono text-[10px] p-1.5 rounded my-1 border-l-4 border-excel-green">{line}</div>;
      }
      return <p key={idx} className="text-[11px] text-slate-700 leading-relaxed mb-1" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 border-l border-slate-200" id="ai-assistant-container">
      <div className="p-3 bg-slate-800 text-slate-100 flex items-center justify-between shadow-sm border-b border-slate-700 select-none">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
          <div>
            <h4 className="font-display font-bold text-[10px] tracking-wider uppercase text-slate-200">AI Excel Coach</h4>
            <span className="text-[8px] text-slate-400">Gemini 1.5 Assistant</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {messages.map(m => (
          <div key={m.id} className={`flex gap-2 max-w-[85%] ${m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs ${m.sender === "user" ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-700"}`}>
              {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className={`p-2.5 rounded-2xl border text-[11px] ${m.sender === "user" ? "bg-emerald-50 border-emerald-100 text-emerald-950" : "bg-white border-slate-200 text-slate-800"}`}>
                {formatText(m.text)}
              </div>
              <span className="text-[8px] text-slate-400 px-1">{m.timestamp}</span>
            </div>
          </div>
        ))}
        {loading && <div className="text-[10px] text-slate-400 italic flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin text-emerald-600" /> Sedang berpikir...</div>}
        {error && <div className="text-[10px] text-red-500 font-semibold">{error}</div>}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="px-3 pb-3 pt-2 bg-slate-50 border-t border-slate-200">
          <p className="text-[8px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Pertanyaan Populer:</p>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => handleQuickQuestion("Bagaimana cara menulis rumus IF untuk Target Pemasaran?")}
              className="text-left text-[10px] bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 p-2 rounded-xl transition-all text-slate-700 shadow-xs cursor-pointer font-semibold"
            >
              💡 Rumus IF Target Pemasaran (Plafond &le; 100jt)
            </button>
            <button
              onClick={() => handleQuickQuestion("Bagaimana cara menghitung umur menggunakan rumus DATEDIF?")}
              className="text-left text-[10px] bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 p-2 rounded-xl transition-all text-slate-700 shadow-xs cursor-pointer font-semibold"
            >
              📅 Rumus DATEDIF untuk Usia Debitur
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-slate-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Tanya tutor..."
          className="flex-1 px-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
        />
        <button type="submit" className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700"><Send className="w-3.5 h-3.5" /></button>
      </form>
    </div>
  );
}

// ==========================================
// 5. COMPONENT: SPREADSHEET WORKSPACE SIMULATOR
// ==========================================
interface SpreadsheetSimulatorProps {
  activeChallenge: Challenge | null;
  onChallengeComplete: (id: string) => void;
}

export function SpreadsheetSimulator({
  activeChallenge,
  onChallengeComplete
}: SpreadsheetSimulatorProps) {
  const [data, setData] = useState<DebtorRow[]>(() => JSON.parse(JSON.stringify(INITIAL_DEBTOR_DATA)));
  const [activeRibbonTab, setActiveRibbonTab] = useState("home");
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null);
  const [cellStyles, setCellStyles] = useState<Record<string, any>>({});
  
  const [isHeaderFrozen, setIsHeaderFrozen] = useState(false);
  const [showGridlines, setShowGridlines] = useState(true);
  const [showFormulaBar, setShowFormulaBar] = useState(true);
  const [zoomLevel, setZoomLevel] = useState("md");
  
  const [isTableFormatted, setIsTableFormatted] = useState(false);
  const [isConditionalFormattingActive, setIsConditionalFormattingActive] = useState(false);
  const [productFilter, setProductFilter] = useState("ALL");
  const [showAddRowForm, setShowAddRowForm] = useState(false);
  const [showPivotSummary, setShowPivotSummary] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const [replaceSource, setReplaceSource] = useState("");
  const [replaceDest, setReplaceDest] = useState("");
  const [formulaInput, setFormulaInput] = useState("");
  const [formulaResult, setFormulaResult] = useState("");

  const [newCif, setNewCif] = useState("");
  const [newNama, setNewNama] = useState("");
  const [newCabang, setNewCabang] = useState("KC Ambon");
  const [newProduk, setNewProduk] = useState<"Kredit Konsumtif" | "Kredit Produktif">("Kredit Produktif");
  const [newPlafond, setNewPlafond] = useState("100000000");
  const [newOutstanding, setNewOutstanding] = useState("80000000");
  const [newTenor, setNewTenor] = useState("24");

  const handleCellClick = (row: number, col: string) => {
    setSelectedCell({ row, col });
    const rowData = data[row - 2];
    if (!rowData) return;
    
    let val = "";
    if (col === "A") val = rowData.cif;
    else if (col === "B") val = rowData.nama;
    else if (col === "C") val = rowData.cabang;
    else if (col === "D") val = rowData.produk;
    else if (col === "E") val = `Rp ${rowData.plafond.toLocaleString("id-ID")}`;
    else if (col === "F") val = `Rp ${rowData.outstanding.toLocaleString("id-ID")}`;
    else if (col === "G") val = `${rowData.tenor} Bln`;
    else if (col === "H") val = rowData.tanggalCair;
    else if (col === "I") val = rowData.tanggalJatuhTempo;
    else if (col === "J") val = rowData.kolektibilitas;
    else if (col === "K") val = rowData.tanggalLahir;
    else if (col === "L") val = rowData.instansi;
    else if (col === "M") val = rowData.status || "";
    else if (col === "N") val = rowData.usia ? `${rowData.usia} Thn` : "";
    
    setFormulaInput(val);
    setFormulaResult("");
  };

  const applyStyleToSelected = (prop: string, value: any) => {
    if (!selectedCell) return;
    const cellKey = `${selectedCell.col}${selectedCell.row}`;
    setCellStyles(prev => {
      const current = prev[cellKey] || {};
      return {
        ...prev,
        [cellKey]: {
          ...current,
          [prop]: current[prop] === value ? null : value
        }
      };
    });
  };

  const resetSpreadsheet = () => {
    setData(JSON.parse(JSON.stringify(INITIAL_DEBTOR_DATA)));
    setCellStyles({});
    setIsTableFormatted(false);
    setIsConditionalFormattingActive(false);
    setProductFilter("ALL");
    setShowAddRowForm(false);
    setShowPivotSummary(false);
    setShowChart(false);
    setFormulaInput("");
    setFormulaResult("");
    setSelectedCell(null);
  };

  const handleSortOutstanding = () => {
    setData(prev => [...prev].sort((a, b) => b.outstanding - a.outstanding));
    if (activeChallenge?.id === "chal2_2") {
      onChallengeComplete("chal2_2");
    }
  };

  const handleSortPlafond = () => {
    setData(prev => [...prev].sort((a, b) => b.plafond - a.plafond));
    if (activeChallenge?.id === "chal2_2") {
      onChallengeComplete("chal2_2");
    }
  };

  const handleSortName = () => {
    setData(prev => [...prev].sort((a, b) => a.nama.localeCompare(b.nama)));
  };

  const handleRemoveDuplicates = () => {
    const seen = new Set();
    const unique = data.filter(row => {
      if (seen.has(row.cif)) return false;
      seen.add(row.cif);
      return true;
    });
    setData(unique);
    if (activeChallenge?.id === "chal3_1") {
      onChallengeComplete("chal3_1");
    }
  };

  const handleTrimNames = () => {
    const cleaned = data.map(row => ({
      ...row,
      nama: row.nama.trim()
    }));
    setData(cleaned);
  };

  const handleReplaceValues = () => {
    if (!replaceSource) return;
    const replaced = data.map(row => ({
      ...row,
      cabang: row.cabang === replaceSource ? replaceDest : row.cabang
    }));
    setData(replaced);
    if (activeChallenge?.id === "chal3_2" && replaceSource === "Kantor Pusat Ambon" && replaceDest === "KC AMBON") {
      onChallengeComplete("chal3_2");
    }
    setReplaceSource("");
    setReplaceDest("");
  };

  const handleApplyFormula = () => {
    const formula = formulaInput.trim().toUpperCase();
    
    if (formula === "=IF(E2<=100000000,\"TARGET\",\"NON TARGET\")" || formula === `=IF(E2<=100000000,"TARGET","NON TARGET")`) {
      const updated = data.map(row => ({
        ...row,
        status: row.plafond <= 100000000 ? "TARGET" : "NON TARGET"
      }));
      setData(updated);
      setFormulaResult("Sukses: Rumus diaplikasikan ke kolom Status (M)!");
      if (activeChallenge?.id === "chal4_1") {
        onChallengeComplete("chal4_1");
      }
    } 
    else if (formula === "=DATEDIF(K2,TODAY(),\"Y\")" || formula === `=DATEDIF(K2,TODAY(),"Y")`) {
      const updated = data.map(row => {
        const birthParts = row.tanggalLahir.split("/");
        if (birthParts.length === 3) {
          const birthYear = parseInt(birthParts[2]);
          const age = 2026 - birthYear;
          return { ...row, usia: age };
        }
        return { ...row, usia: 35 };
      });
      setData(updated);
      setFormulaResult("Sukses: Rumus diaplikasikan ke kolom Usia (N)!");
      if (activeChallenge?.id === "chal4_2") {
        onChallengeComplete("chal4_2");
      }
    } 
    else if (formula === "=COUNTIF(D2:D8,\"Kredit Konsumtif\")" || formula === `=COUNTIF(D2:D8,"Kredit Konsumtif")`) {
      const count = data.filter(r => r.produk === "Kredit Konsumtif").length;
      setFormulaResult(`Hasil Analisa COUNTIF: ${count} Debitur.`);
      if (activeChallenge?.id === "chal5_1") {
        onChallengeComplete("chal5_1");
      }
    } 
    else {
      setFormulaResult("Error: Penulisan rumus salah / tidak didukung di materi modul ini.");
    }
  };

  const handleAddNewRow = (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newCif || !newNama) return;
    
    const newRow: DebtorRow = {
      id: Date.now(),
      cif: newCif,
      nama: newNama,
      cabang: newCabang,
      produk: newProduk,
      plafond: parseFloat(newPlafond) || 0,
      outstanding: parseFloat(newOutstanding) || 0,
      tenor: parseInt(newTenor) || 12,
      tanggalCair: "19/07/2026",
      tanggalJatuhTempo: "19/07/2028",
      tanggalLahir: "20/05/1991",
      instansi: "Swasta Mandiri",
      kolektibilitas: "Lancar"
    };
    
    setData(prev => [...prev, newRow]);
    setShowAddRowForm(false);
    setNewCif("");
    setNewNama("");
  };

  const getPivotCabangStats = () => {
    const stats: Record<string, any> = {};
    data.forEach(r => {
      if (!stats[r.cabang]) stats[r.cabang] = { count: 0, plafond: 0, outstanding: 0 };
      stats[r.cabang].count++;
      stats[r.cabang].plafond += r.plafond;
      stats[r.cabang].outstanding += r.outstanding;
    });
    return Object.keys(stats).map(k => ({ cabang: k, ...stats[k] }));
  };

  const getPivotKolStats = () => {
    const stats: Record<string, any> = {};
    data.forEach(r => {
      if (!stats[r.kolektibilitas]) stats[r.kolektibilitas] = { count: 0, outstanding: 0 };
      stats[r.kolektibilitas].count++;
      stats[r.kolektibilitas].outstanding += r.outstanding;
    });
    return Object.keys(stats).map(k => ({ kolektibilitas: k, ...stats[k] }));
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm" id="spreadsheet-app">
      <div className="bg-[#107c41] text-white p-2.5 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-1.5">
          <Table className="w-5 h-5" />
          <span className="font-display font-bold text-xs tracking-wide">Excel Simulator Latihan v2026</span>
        </div>
        <button onClick={resetSpreadsheet} className="bg-[#0b5930] hover:bg-[#073c20] text-white text-[10px] font-bold py-1 px-3 rounded-lg flex items-center gap-1 cursor-pointer transition-colors">
          <RefreshCw className="w-3 h-3" /> Reset Data & Latihan
        </button>
      </div>

      <div className="bg-slate-50 border-b border-slate-200 flex select-none text-[11px] font-bold text-slate-600 shrink-0">
        <button onClick={() => setActiveRibbonTab("home")} className={`px-4 py-2 border-r border-slate-200 cursor-pointer hover:bg-slate-100 ${activeRibbonTab === "home" ? "bg-white text-emerald-700 border-b-2 border-b-emerald-600" : ""}`}>Beranda (Home)</button>
        <button onClick={() => setActiveRibbonTab("insert")} className={`px-4 py-2 border-r border-slate-200 cursor-pointer hover:bg-slate-100 ${activeRibbonTab === "insert" ? "bg-white text-emerald-700 border-b-2 border-b-emerald-600" : ""}`}>Sisipkan (Insert)</button>
        <button onClick={() => setActiveRibbonTab("formula")} className={`px-4 py-2 border-r border-slate-200 cursor-pointer hover:bg-slate-100 ${activeRibbonTab === "formula" ? "bg-white text-emerald-700 border-b-2 border-b-emerald-600" : ""}`}>Rumus (Formula)</button>
        <button onClick={() => setActiveRibbonTab("data")} className={`px-4 py-2 border-r border-slate-200 cursor-pointer hover:bg-slate-100 ${activeRibbonTab === "data" ? "bg-white text-emerald-700 border-b-2 border-b-emerald-600" : ""}`}>Data (Data)</button>
        <button onClick={() => setActiveRibbonTab("view")} className={`px-4 py-2 border-r border-slate-200 cursor-pointer hover:bg-slate-100 ${activeRibbonTab === "view" ? "bg-white text-emerald-700 border-b-2 border-b-emerald-600" : ""}`}>Tampilan (View)</button>
      </div>

      <div className="bg-slate-50/70 border-b border-slate-200 p-2.5 flex flex-wrap items-center gap-3 select-none text-[11px] shrink-0">
        {activeRibbonTab === "home" && (
          <div className="flex flex-wrap items-center gap-2 animate-fade-in">
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-xs">
              <button onClick={() => applyStyleToSelected("bold", true)} className="px-2 py-1 font-bold hover:bg-slate-100 rounded cursor-pointer" title="Bold">B</button>
              <button onClick={() => applyStyleToSelected("italic", true)} className="px-2 py-1 italic hover:bg-slate-100 rounded cursor-pointer" title="Italic">I</button>
            </div>
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-xs">
              <button onClick={() => applyStyleToSelected("align", "left")} className="px-2 py-1 hover:bg-slate-100 rounded cursor-pointer">Rata Kiri</button>
              <button onClick={() => applyStyleToSelected("align", "center")} className="px-2 py-1 hover:bg-slate-100 rounded cursor-pointer">Rata Tengah</button>
              <button onClick={() => applyStyleToSelected("align", "right")} className="px-2 py-1 hover:bg-slate-100 rounded cursor-pointer">Rata Kanan</button>
            </div>
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 gap-1 shadow-xs">
              <span className="text-[9px] text-slate-400 font-bold uppercase ml-1">Warna Isi:</span>
              <button onClick={() => applyStyleToSelected("bg", "yellow")} className="w-5 h-5 bg-yellow-200 border border-slate-300 rounded cursor-pointer" />
              <button onClick={() => applyStyleToSelected("bg", "green")} className="w-5 h-5 bg-green-200 border border-slate-300 rounded cursor-pointer" />
              <button onClick={() => applyStyleToSelected("bg", "blue")} className="w-5 h-5 bg-blue-200 border border-slate-300 rounded cursor-pointer" />
              <button onClick={() => applyStyleToSelected("bg", "red")} className="w-5 h-5 bg-red-200 border border-slate-300 rounded cursor-pointer" />
            </div>
            <button onClick={() => { setIsConditionalFormattingActive(!isConditionalFormattingActive); if (activeChallenge?.id === "chal2_1") onChallengeComplete("chal2_1"); }} className={`px-3 py-1.5 rounded-lg border font-bold cursor-pointer transition-all shadow-xs ${isConditionalFormattingActive ? "bg-amber-100 border-amber-400 text-amber-800" : "bg-white border-slate-200 hover:bg-slate-100"}`}>🎨 Conditional Formatting</button>
            <button onClick={() => { setIsTableFormatted(!isTableFormatted); if (activeChallenge?.id === "chal2_1") onChallengeComplete("chal2_1"); }} className={`px-3 py-1.5 rounded-lg border font-bold cursor-pointer transition-all shadow-xs ${isTableFormatted ? "bg-emerald-100 border-emerald-400 text-emerald-800" : "bg-white border-slate-200 hover:bg-slate-100"}`}>🟩 Ctrl + T (Format Table)</button>
          </div>
        )}

        {activeRibbonTab === "insert" && (
          <div className="flex items-center gap-2 animate-fade-in">
            <button onClick={() => setShowAddRowForm(!showAddRowForm)} className="bg-white border border-slate-200 hover:bg-slate-100 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer shadow-xs">
              <PlusCircle className="w-3.5 h-3.5 text-emerald-600" /> Sisipkan Baris (Tambah Debitur)
            </button>
            <button onClick={() => setShowPivotSummary(!showPivotSummary)} className={`px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1 cursor-pointer transition-all shadow-xs ${showPivotSummary ? "bg-blue-100 border-blue-400 text-blue-800" : "bg-white border-slate-200 hover:bg-slate-100"}`}>
              <Database className="w-3.5 h-3.5 text-blue-600" /> Buat Pivot Table
            </button>
            <button onClick={() => setShowChart(!showChart)} className={`px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1 cursor-pointer transition-all shadow-xs ${showChart ? "bg-amber-100 border-amber-400 text-amber-800" : "bg-white border-slate-200 hover:bg-slate-100"}`}>
              <BarChart3 className="w-3.5 h-3.5 text-amber-600" /> Sisipkan Grafik (Outstanding)
            </button>
          </div>
        )}

        {activeRibbonTab === "formula" && (
          <div className="flex items-center gap-2.5 animate-fade-in w-full">
            <div className="text-[10px] bg-slate-200 px-2 py-1 rounded font-bold text-slate-500 uppercase tracking-wider">Quick Formula Helper:</div>
            <button onClick={() => setFormulaInput(`=IF(E2<=100000000,"TARGET","NON TARGET")`)} className="bg-white border border-slate-200 hover:bg-slate-50 p-1.5 px-2.5 rounded text-[10px] font-mono cursor-pointer shadow-xs">IF Target</button>
            <button onClick={() => setFormulaInput(`=DATEDIF(K2,TODAY(),"Y")`)} className="bg-white border border-slate-200 hover:bg-slate-50 p-1.5 px-2.5 rounded text-[10px] font-mono cursor-pointer shadow-xs">DATEDIF Usia</button>
            <button onClick={() => setFormulaInput(`=COUNTIF(D2:D8,"Kredit Konsumtif")`)} className="bg-white border border-slate-200 hover:bg-slate-50 p-1.5 px-2.5 rounded text-[10px] font-mono cursor-pointer shadow-xs">COUNTIF Konsumtif</button>
          </div>
        )}

        {activeRibbonTab === "data" && (
          <div className="flex flex-wrap items-center gap-2 animate-fade-in w-full">
            <button onClick={handleSortPlafond} className="bg-white border border-slate-200 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" /> Urutkan Plafond Terbesar
            </button>
            <button onClick={handleSortOutstanding} className="bg-white border border-slate-200 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" /> Urutkan Outstanding Terbesar
            </button>
            <button onClick={handleSortName} className="bg-white border border-slate-200 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer shadow-xs">
              A-Z Nama
            </button>
            <div className="h-5 w-px bg-slate-300" />
            
            <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg shadow-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400 ml-1" />
              <span className="text-[9px] text-slate-400 font-bold uppercase">Filter Produk:</span>
              <select 
                value={productFilter} 
                onChange={e => {
                  setProductFilter(e.target.value);
                  if (activeChallenge?.id === "chal5_2" && e.target.value === "Kredit Produktif") {
                    onChallengeComplete("chal5_2");
                  }
                }} 
                className="bg-transparent border-none text-[10px] font-bold focus:outline-none"
              >
                <option value="ALL">Semua Produk</option>
                <option value="Kredit Konsumtif">Kredit Konsumtif Only</option>
                <option value="Kredit Produktif">Kredit Produktif Only</option>
              </select>
            </div>

            <button onClick={handleRemoveDuplicates} className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-800 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer shadow-xs">
              <Trash2 className="w-3.5 h-3.5" /> Hapus Duplikat
            </button>
            <button onClick={handleTrimNames} className="bg-white border border-slate-200 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg font-bold cursor-pointer shadow-xs">
              <Paintbrush className="w-3.5 h-3.5 text-emerald-600 inline mr-1" /> TRIM Spasi Nama
            </button>

            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg p-1 shadow-xs">
              <input type="text" placeholder="Cari..." value={replaceSource} onChange={e => setReplaceSource(e.target.value)} className="w-24 bg-white px-1.5 py-0.5 border border-slate-200 rounded text-[10px]" />
              <span className="text-[9px] font-bold text-slate-400">Ganti ke:</span>
              <input type="text" placeholder="KC AMBON..." value={replaceDest} onChange={e => setReplaceDest(e.target.value)} className="w-24 bg-white px-1.5 py-0.5 border border-slate-200 rounded text-[10px]" />
              <button onClick={handleReplaceValues} className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded text-[9px] cursor-pointer">Replace</button>
            </div>
          </div>
        )}

        {activeRibbonTab === "view" && (
          <div className="flex items-center gap-3.5 animate-fade-in select-none">
            <label className="flex items-center gap-1.5 font-semibold cursor-pointer">
              <input type="checkbox" checked={showGridlines} onChange={e => setShowGridlines(e.target.checked)} className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5" /> Tampilkan Garis Kisi (Gridlines)
            </label>
            <label className="flex items-center gap-1.5 font-semibold cursor-pointer">
              <input type="checkbox" checked={showFormulaBar} onChange={e => setShowFormulaBar(e.target.checked)} className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5" /> Formula Bar
            </label>
            <label className="flex items-center gap-1.5 font-semibold cursor-pointer">
              <input type="checkbox" checked={isHeaderFrozen} onChange={e => {
                setIsHeaderFrozen(e.target.checked);
                if (activeChallenge?.id === "chal2_3" && e.target.checked) {
                  onChallengeComplete("chal2_3");
                }
              }} className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5" /> Freeze Header Row
            </label>
            <div className="h-5 w-px bg-slate-300" />
            <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg shadow-xs">
              <span className="text-[9px] text-slate-400 font-bold uppercase ml-1">Zoom:</span>
              <button onClick={() => setZoomLevel("sm")} className={`px-2 py-0.5 rounded text-[9px] font-bold ${zoomLevel === "sm" ? "bg-emerald-600 text-white" : "hover:bg-slate-100"}`}>Kecil</button>
              <button onClick={() => setZoomLevel("md")} className={`px-2 py-0.5 rounded text-[9px] font-bold ${zoomLevel === "md" ? "bg-emerald-600 text-white" : "hover:bg-slate-100"}`}>Normal</button>
              <button onClick={() => setZoomLevel("lg")} className={`px-2 py-0.5 rounded text-[9px] font-bold ${zoomLevel === "lg" ? "bg-emerald-600 text-white" : "hover:bg-slate-100"}`}>Besar</button>
            </div>
          </div>
        )}
      </div>

      {showFormulaBar && (
        <div className="bg-slate-50 border-b border-slate-200 p-1.5 px-3 flex items-center gap-2 select-none shrink-0">
          <span className="font-mono text-[10px] text-slate-400 font-bold bg-slate-200 px-2 py-1 rounded select-none shadow-xs">
            {selectedCell ? `${selectedCell.col}${selectedCell.row}` : "A1"}
          </span>
          <span className="font-serif italic font-bold text-xs text-slate-400">fx</span>
          <input 
            type="text" 
            value={formulaInput} 
            onChange={e => setFormulaInput(e.target.value)}
            placeholder="Ketik rumus di sini... (Contoh: =IF(E2<=100000000,'TARGET','NON TARGET'))" 
            className="flex-1 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-excel-green"
          />
          <button onClick={handleApplyFormula} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer transition-all">
            <Play className="w-3 h-3" /> Jalankan
          </button>
        </div>
      )}

      {formulaResult && (
        <div className="bg-blue-50 border-b border-blue-200 p-2.5 px-4 text-xs font-medium text-blue-900 flex items-center gap-2 select-none animate-fade-in shrink-0">
          <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{formulaResult}</span>
        </div>
      )}

      {showAddRowForm && (
        <div className="bg-slate-50 border-b border-slate-200 p-4 animate-fade-in select-none">
          <form onSubmit={handleAddNewRow} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">CIF</label>
              <input type="text" placeholder="Contoh: 1009" value={newCif} onChange={e => setNewCif(e.target.value)} className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Nama Debitur</label>
              <input type="text" placeholder="Contoh: Aditya" value={newNama} onChange={e => setNewNama(e.target.value)} className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Cabang</label>
              <select value={newCabang} onChange={e => setNewCabang(e.target.value)} className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs">
                <option value="KC Ambon">KC Ambon</option>
                <option value="KCP Masohi">KCP Masohi</option>
                <option value="KCP Piru">KCP Piru</option>
                <option value="Kantor Pusat">Kantor Pusat</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Produk</label>
              <select value={newProduk} onChange={e => setNewProduk(e.target.value as any)} className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs">
                <option value="Kredit Produktif">Kredit Produktif</option>
                <option value="Kredit Konsumtif">Kredit Konsumtif</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Plafond (Rp)</label>
              <input type="number" value={newPlafond} onChange={e => setNewPlafond(e.target.value)} className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Outstanding (Rp)</label>
              <input type="number" value={newOutstanding} onChange={e => setNewOutstanding(e.target.value)} className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Tenor (Bulan)</label>
              <input type="number" value={newTenor} onChange={e => setNewTenor(e.target.value)} className="w-full mt-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs" />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-lg text-xs cursor-pointer shadow-sm transition-all">
                Tambahkan Debitur
              </button>
            </div>
          </form>
        </div>
      )}

      {showPivotSummary && (
        <div className="bg-blue-50/75 border-b border-blue-200 p-4 animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-4 select-none">
          <div>
            <h4 className="font-bold text-blue-900 text-xs mb-2 uppercase tracking-wide flex items-center gap-1">
              <Database className="w-3.5 h-3.5" /> Pivot 1: Summary Berdasarkan Cabang
            </h4>
            <table className="w-full bg-white rounded-lg border border-blue-200 text-[11px] overflow-hidden">
              <thead>
                <tr className="bg-blue-100/50 text-blue-900 font-bold border-b border-blue-200">
                  <th className="px-2 py-1.5 text-left">Row Labels (Cabang)</th>
                  <th className="px-2 py-1.5 text-center">Count of CIF</th>
                  <th className="px-2 py-1.5 text-right">Sum of Plafond</th>
                  <th className="px-2 py-1.5 text-right">Sum of Outstanding</th>
                </tr>
              </thead>
              <tbody>
                {getPivotCabangStats().map(s => (
                  <tr key={s.cabang} className="border-b border-blue-100/50 hover:bg-slate-50">
                    <td className="px-2 py-1.5 font-medium text-slate-800">{s.cabang}</td>
                    <td className="px-2 py-1.5 text-center font-mono">{s.count}</td>
                    <td className="px-2 py-1.5 text-right font-mono">Rp {s.plafond.toLocaleString("id-ID")}</td>
                    <td className="px-2 py-1.5 text-right font-mono text-emerald-800 font-semibold">Rp {s.outstanding.toLocaleString("id-ID")}</td>
                  </tr>
                ))}
                <tr className="bg-blue-50/70 font-bold text-blue-950">
                  <td className="px-2 py-1.5">Grand Total</td>
                  <td className="px-2 py-1.5 text-center font-mono">{data.length}</td>
                  <td className="px-2 py-1.5 text-right font-mono">Rp {data.reduce((acc, r) => acc + r.plafond, 0).toLocaleString("id-ID")}</td>
                  <td className="px-2 py-1.5 text-right font-mono text-emerald-900">Rp {data.reduce((acc, r) => acc + r.outstanding, 0).toLocaleString("id-ID")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="font-bold text-blue-900 text-xs mb-2 uppercase tracking-wide flex items-center gap-1">
              <Database className="w-3.5 h-3.5" /> Pivot 2: Summary Berdasarkan Kolektibilitas
            </h4>
            <table className="w-full bg-white rounded-lg border border-blue-200 text-[11px] overflow-hidden">
              <thead>
                <tr className="bg-blue-100/50 text-blue-900 font-bold border-b border-blue-200">
                  <th className="px-2 py-1.5 text-left">Row Labels (Kolektibilitas)</th>
                  <th className="px-2 py-1.5 text-center">Count of CIF</th>
                  <th className="px-2 py-1.5 text-right">Sum of Outstanding</th>
                </tr>
              </thead>
              <tbody>
                {getPivotKolStats().map(s => (
                  <tr key={s.kolektibilitas} className="border-b border-blue-100/50 hover:bg-slate-50">
                    <td className="px-2 py-1.5 font-medium text-slate-800">{s.kolektibilitas}</td>
                    <td className="px-2 py-1.5 text-center font-mono">{s.count}</td>
                    <td className="px-2 py-1.5 text-right font-mono text-emerald-800 font-semibold">Rp {s.outstanding.toLocaleString("id-ID")}</td>
                  </tr>
                ))}
                <tr className="bg-blue-50/70 font-bold text-blue-950">
                  <td className="px-2 py-1.5">Grand Total</td>
                  <td className="px-2 py-1.5 text-center font-mono">{data.length}</td>
                  <td className="px-2 py-1.5 text-right font-mono text-emerald-900">Rp {data.reduce((acc, r) => acc + r.outstanding, 0).toLocaleString("id-ID")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showChart && (
        <div className="bg-amber-50/40 border-b border-amber-200 p-4 animate-fade-in flex flex-col items-center select-none">
          <h4 className="font-bold text-amber-900 text-xs mb-3 uppercase tracking-wide flex items-center gap-1 self-start">
            <BarChart3 className="w-3.5 h-3.5" /> Grafik Visualisasi Outstanding Debitur (Top 10)
          </h4>
          <div className="w-full bg-white p-5 rounded-xl border border-amber-100 shadow-xs h-64 flex items-end gap-3 px-6 pb-4">
            {data.slice(0, 10).map((r, i) => {
              const maxOut = Math.max(...data.map(d => d.outstanding));
              const pct = maxOut > 0 ? (r.outstanding / maxOut) * 100 : 0;
              return (
                <div key={r.id} className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-help">
                  <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[9px] p-1.5 rounded-lg font-mono pointer-events-none transition-opacity duration-200 z-30 whitespace-nowrap shadow-md">
                    {r.nama}: Rp {r.outstanding.toLocaleString("id-ID")}
                  </div>
                  <div className="w-full bg-emerald-500 rounded-t-md hover:bg-emerald-600 transition-all shadow-xs" style={{ height: `${pct * 0.8 || 5}%` }}></div>
                  <span className="text-[10px] text-slate-500 font-semibold truncate w-full text-center mt-2">{r.nama}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div 
        className="flex-1 overflow-auto custom-scrollbar bg-white" 
        style={{ fontSize: zoomLevel === 'sm' ? '11px' : zoomLevel === 'lg' ? '13px' : '12px' }}
      >
        <table className="w-full text-left border-collapse border-spacing-0 text-xs font-sans relative">
          <thead className={isHeaderFrozen ? "sticky top-0 z-25 bg-slate-100 shadow-sm" : "bg-slate-100"}>
            <tr className="bg-slate-200 text-slate-500 font-mono text-[10px] text-center border-b border-slate-300 select-none">
              <th className={`w-8 py-1 border-r bg-slate-300 font-sans text-center ${showGridlines ? "border-slate-300" : "border-transparent"}`}>#</th>
              <th className={`w-20 border-r ${showGridlines ? "border-slate-300" : "border-transparent"}`}>A (CIF)</th>
              <th className={`w-36 border-r ${showGridlines ? "border-slate-300" : "border-transparent"}`}>B (Nama)</th>
              <th className={`w-40 border-r ${showGridlines ? "border-slate-300" : "border-transparent"}`}>C (Cabang)</th>
              <th className={`w-36 border-r ${showGridlines ? "border-slate-300" : "border-transparent"}`}>D (Produk)</th>
              <th className={`w-32 border-r ${showGridlines ? "border-slate-300" : "border-transparent"}`}>E (Plafond)</th>
              <th className={`w-32 border-r ${showGridlines ? "border-slate-300" : "border-transparent"}`}>F (Outstanding)</th>
              <th className={`w-20 border-r ${showGridlines ? "border-slate-300" : "border-transparent"}`}>G (Tenor)</th>
              <th className={`w-28 border-r ${showGridlines ? "border-slate-300" : "border-transparent"}`}>H (Cair)</th>
              <th className={`w-28 border-r ${showGridlines ? "border-slate-300" : "border-transparent"}`}>I (Jatuh Tempo)</th>
              <th className={`w-28 border-r ${showGridlines ? "border-slate-300" : "border-transparent"}`}>J (Kolektibilitas)</th>
              <th className={`w-28 border-r ${showGridlines ? "border-slate-300" : "border-transparent"}`}>K (Tgl Lahir)</th>
              <th className={`w-36 border-r ${showGridlines ? "border-slate-300" : "border-transparent"}`}>L (Instansi)</th>
              <th className={`w-36 border-r bg-emerald-50 text-emerald-800 font-bold ${showGridlines ? "border-slate-300" : "border-transparent"}`}>M (Status)</th>
              <th className={`w-24 border-r bg-emerald-50 text-emerald-800 font-bold ${showGridlines ? "border-slate-300" : "border-transparent"}`}>N (Usia)</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {data
              .filter(row => productFilter === "ALL" || row.produk === productFilter)
              .map((row, index) => {
                const rowNum = index + 2;
                const isPlafondHighlighted = isConditionalFormattingActive && row.plafond <= 100000000;
                const isOutstandingHighlighted = isConditionalFormattingActive && row.outstanding > 150000000;
                const rowBgClass = isTableFormatted ? (index % 2 === 0 ? "bg-white" : "bg-emerald-50/40") : "bg-white";
                const cellBorderClass = showGridlines ? "border-r border-slate-200" : "border-r border-transparent";

                const getCellStyle = (colLetter: string) => {
                  const cellStyleObj = cellStyles[`${colLetter}${rowNum}`] || {};
                  const customStyle: React.CSSProperties = {};
                  if (cellStyleObj.bold) customStyle.fontWeight = "bold";
                  if (cellStyleObj.italic) customStyle.fontStyle = "italic";
                  if (cellStyleObj.align) customStyle.textAlign = cellStyleObj.align;
                  if (cellStyleObj.bg) {
                    if (cellStyleObj.bg === "yellow") customStyle.backgroundColor = "#FEF08A";
                    if (cellStyleObj.bg === "green") customStyle.backgroundColor = "#BBF7D0";
                    if (cellStyleObj.bg === "blue") customStyle.backgroundColor = "#BFDBFE";
                    if (cellStyleObj.bg === "red") customStyle.backgroundColor = "#FECACA";
                  }
                  return customStyle;
                };

                return (
                  <tr key={`${row.id}-${index}`} className={`${rowBgClass} hover:bg-slate-50 transition-colors border-b border-slate-200`}>
                    <td className={`bg-slate-200 text-slate-500 font-mono text-[10px] text-center font-bold py-1.5 select-none ${cellBorderClass}`}>{rowNum}</td>
                    
                    <td onClick={() => handleCellClick(rowNum, "A")} className={`px-2 py-1.5 font-mono text-slate-600 cursor-pointer ${cellBorderClass} ${selectedCell?.row === rowNum && selectedCell?.col === "A" ? "bg-emerald-50 ring-2 ring-emerald-600" : ""}`} style={getCellStyle("A")}>{row.cif}</td>
                    <td onClick={() => handleCellClick(rowNum, "B")} className={`px-2 py-1.5 font-medium cursor-pointer ${cellBorderClass} ${selectedCell?.row === rowNum && selectedCell?.col === "B" ? "bg-emerald-50 ring-2 ring-emerald-600" : ""}`} style={getCellStyle("B")}>{row.nama}</td>
                    <td onClick={() => handleCellClick(rowNum, "C")} className={`px-2 py-1.5 cursor-pointer ${cellBorderClass} ${selectedCell?.row === rowNum && selectedCell?.col === "C" ? "bg-emerald-50 ring-2 ring-emerald-600" : ""} ${row.cabang.includes("Kantor Pusat") ? "text-amber-600 bg-amber-50" : "text-slate-800"}`} style={getCellStyle("C")}>{row.cabang}</td>
                    <td onClick={() => handleCellClick(rowNum, "D")} className={`px-2 py-1.5 cursor-pointer text-[11px] ${cellBorderClass} ${selectedCell?.row === rowNum && selectedCell?.col === "D" ? "bg-emerald-50 ring-2 ring-emerald-600" : ""} ${row.produk === "Kredit Produktif" ? "text-blue-700" : "text-slate-700"}`} style={getCellStyle("D")}>{row.produk}</td>
                    
                    <td onClick={() => handleCellClick(rowNum, "E")} className={`px-2 py-1.5 font-mono text-right cursor-pointer ${cellBorderClass} ${selectedCell?.row === rowNum && selectedCell?.col === "E" ? "bg-emerald-50 ring-2 ring-emerald-600" : ""} ${isPlafondHighlighted ? "bg-green-100 text-green-900 font-semibold" : "text-slate-800"}`} style={getCellStyle("E")}>Rp {row.plafond.toLocaleString("id-ID")}</td>
                    <td onClick={() => handleCellClick(rowNum, "F")} className={`px-2 py-1.5 font-mono text-right cursor-pointer ${cellBorderClass} ${selectedCell?.row === rowNum && selectedCell?.col === "F" ? "bg-emerald-50 ring-2 ring-emerald-600" : ""} ${isOutstandingHighlighted ? "bg-red-100 text-red-900 font-semibold animate-pulse" : "text-slate-800"}`} style={getCellStyle("F")}>Rp {row.outstanding.toLocaleString("id-ID")}</td>
                    
                    <td onClick={() => handleCellClick(rowNum, "G")} className={`px-2 py-1.5 font-mono text-center cursor-pointer ${cellBorderClass} ${selectedCell?.row === rowNum && selectedCell?.col === "G" ? "bg-emerald-50 ring-2 ring-emerald-600" : ""}`} style={getCellStyle("G")}>{row.tenor} Bln</td>
                    <td onClick={() => handleCellClick(rowNum, "H")} className={`px-2 py-1.5 font-mono text-center cursor-pointer ${cellBorderClass} ${selectedCell?.row === rowNum && selectedCell?.col === "H" ? "bg-emerald-50 ring-2 ring-emerald-600" : ""}`} style={getCellStyle("H")}>{row.tanggalCair}</td>
                    <td onClick={() => handleCellClick(rowNum, "I")} className={`px-2 py-1.5 font-mono text-center cursor-pointer ${cellBorderClass} ${selectedCell?.row === rowNum && selectedCell?.col === "I" ? "bg-emerald-50 ring-2 ring-emerald-600" : ""}`} style={getCellStyle("I")}>{row.tanggalJatuhTempo}</td>
                    <td onClick={() => handleCellClick(rowNum, "J")} className={`px-2 py-1.5 text-center font-medium cursor-pointer ${cellBorderClass} ${selectedCell?.row === rowNum && selectedCell?.col === "J" ? "bg-emerald-50 ring-2 ring-emerald-600" : ""} ${row.kolektibilitas === "Lancar" ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"}`} style={getCellStyle("J")}>{row.kolektibilitas}</td>
                    <td onClick={() => handleCellClick(rowNum, "K")} className={`px-2 py-1.5 font-mono text-center cursor-pointer ${cellBorderClass} ${selectedCell?.row === rowNum && selectedCell?.col === "K" ? "bg-emerald-50 ring-2 ring-emerald-600" : ""}`} style={getCellStyle("K")}>{row.tanggalLahir}</td>
                    <td onClick={() => handleCellClick(rowNum, "L")} className={`px-2 py-1.5 cursor-pointer ${cellBorderClass} ${selectedCell?.row === rowNum && selectedCell?.col === "L" ? "bg-emerald-50 ring-2 ring-emerald-600" : ""}`} style={getCellStyle("L")}>{row.instansi}</td>
                    
                    <td onClick={() => handleCellClick(rowNum, "M")} className={`px-2 py-1.5 font-bold bg-emerald-50/30 text-center cursor-pointer ${cellBorderClass} ${selectedCell?.row === rowNum && selectedCell?.col === "M" ? "bg-emerald-100 ring-2 ring-emerald-600" : ""} ${row.status === "TARGET" ? "text-emerald-700" : row.status === "NON TARGET" ? "text-slate-400 font-normal" : "text-slate-300 italic font-normal"}`} style={getCellStyle("M")}>{row.status || "[Kosong]"}</td>
                    <td onClick={() => handleCellClick(rowNum, "N")} className={`px-2 py-1.5 font-mono font-bold text-center bg-emerald-50/30 cursor-pointer ${cellBorderClass} ${selectedCell?.row === rowNum && selectedCell?.col === "N" ? "bg-emerald-100 ring-2 ring-emerald-600" : ""} ${row.usia ? "text-emerald-800" : "text-slate-300 italic font-normal"}`} style={getCellStyle("N")}>{row.usia ? `${row.usia} Thn` : "[Kosong]"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 6. MAIN ORCHESTRATOR COMPONENT (App)
// ==========================================
export default function App() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  useEffect(() => {
    setLessons(JSON.parse(JSON.stringify(EXCEL_LESSONS)));
  }, []);

  useEffect(() => {
    if (lessons.length > 0) {
      const currentLesson = lessons[activeLessonIndex];
      const firstIncomplete = currentLesson.challenges.find(c => !c.completed);
      setActiveChallenge(firstIncomplete || currentLesson.challenges[0]);
    }
  }, [activeLessonIndex, lessons]);

  const handleChallengeComplete = (challengeId: string) => {
    setLessons(prevLessons => {
      const updated = prevLessons.map((les) => {
        const uChallenges = les.challenges.map(ch => {
          if (ch.id === challengeId) {
            return { ...ch, completed: true };
          }
          return ch;
        });
        return { ...les, challenges: uChallenges };
      });
      return updated;
    });

    setActiveChallenge(prev => prev ? { ...prev, completed: true } : null);
  };

  const totalChallenges = lessons.reduce((acc, l) => acc + l.challenges.length, 0);
  const totalCompletedChallenges = lessons.reduce((acc, l) => acc + l.challenges.filter(c => c.completed).length, 0);
  const totalProgressPercent = totalChallenges > 0 
    ? Math.round((totalCompletedChallenges / totalChallenges) * 100) 
    : 0;

  const isAcademyFinished = totalChallenges > 0 && totalCompletedChallenges === totalChallenges;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col antialiased">
      <header className="bg-white border-b border-slate-200 px-5 py-2.5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 select-none shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-600 text-white p-1.5 rounded-lg shadow-sm flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-base text-slate-800 tracking-tight flex items-center gap-1">
              Excel Credit Marketing Academy <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            </h1>
            <p className="text-[10px] text-slate-400">
              Bimbingan Praktis Pengolahan Data Nominatif Kredit & Strategi Pemasaran Berdasarkan Panduan Bank
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2.5 bg-slate-50 p-1 px-2.5 rounded-xl border border-slate-200 shadow-inner">
            <div className="text-right">
              <span className="text-[8px] text-slate-400 uppercase font-bold block">Total Progres</span>
              <span className="text-[10px] font-mono font-bold text-slate-700">{totalCompletedChallenges}/{totalChallenges} Selesai</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600">{totalProgressPercent}%</span>
          </div>

          <button
            onClick={() => setShowCertificateModal(true)}
            className={`flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer ${
              isAcademyFinished 
                ? "bg-amber-500 hover:bg-amber-600 text-slate-900 animate-bounce" 
                : "bg-white border border-slate-200 text-slate-600"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Sertifikat</span>
          </button>
        </div>
      </header>

      <div className="bg-white border-b border-slate-200 flex overflow-x-auto select-none px-3 text-[11px] font-medium shadow-xs shrink-0">
        {lessons.map((les, index) => {
          const isActive = activeLessonIndex === index;
          const isCompleted = les.challenges.every(c => c.completed);
          
          return (
            <button
              key={les.id}
              onClick={() => setActiveLessonIndex(index)}
              className={`px-4 py-2 whitespace-nowrap transition-all flex items-center gap-1.5 border-b-2 cursor-pointer font-bold ${
                isActive 
                  ? "bg-emerald-50/50 text-emerald-700 border-b-emerald-600" 
                  : "text-slate-500 border-b-transparent hover:bg-slate-50"
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                isCompleted 
                  ? "bg-emerald-100 text-emerald-700" 
                  : isActive 
                    ? "bg-emerald-600 text-white" 
                    : "bg-slate-100 text-slate-500"
              }`}>
                {isCompleted ? "✓" : les.id}
              </span>
              <span>{les.title}</span>
            </button>
          );
        })}
      </div>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <div className="w-full lg:w-[35%] flex flex-col p-3.5 bg-slate-50 border-r border-slate-200 overflow-y-auto custom-scrollbar">
          {lessons.length > 0 && (
            <LessonContent
              lessons={lessons}
              activeLessonIndex={activeLessonIndex}
              setActiveLessonIndex={setActiveLessonIndex}
              activeChallenge={activeChallenge}
              setActiveChallenge={setActiveChallenge}
            />
          )}
        </div>

        <div className="flex-1 flex flex-col p-3.5 bg-slate-100 overflow-hidden">
          <SpreadsheetSimulator
            activeChallenge={activeChallenge}
            onChallengeComplete={handleChallengeComplete}
          />
        </div>

        <div 
          className={`fixed lg:relative top-0 right-0 h-full w-72 shrink-0 z-40 shadow-2xl lg:shadow-none transition-transform duration-350 ${
            isAiSidebarOpen ? "translate-x-0" : "translate-x-full lg:hidden"
          }`}
        >
          <AIAssistant />
          <button 
            onClick={() => setIsAiSidebarOpen(false)}
            className="absolute top-2.5 right-2.5 lg:hidden text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isAiSidebarOpen && (
          <button
            onClick={() => setIsAiSidebarOpen(true)}
            className="fixed bottom-5 right-5 bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-full shadow-lg z-50 flex items-center gap-1.5 cursor-pointer font-bold text-[10px]"
          >
            <MessageSquare className="w-4 h-4 animate-pulse" />
            <span>Tutor AI</span>
          </button>
        )}
      </main>

      {showCertificateModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 relative shadow-2xl border border-slate-200">
            <button 
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>

            {isAcademyFinished ? (
              <div className="text-center">
                <Award className="w-10 h-10 text-amber-500 mx-auto mb-2" />
                <h3 className="font-display font-bold text-base text-slate-900 mb-1">Selamat! Anda Telah Lulus 🎉</h3>
                <p className="text-[10px] text-slate-400 mb-3 max-w-sm mx-auto">
                  Anda berhasil menyelesaikan seluruh materi latihan, membersihkan data duplikat, menyusun target pemasaran dengan rumus IF, dan melakukan analisis DATEDIF & COUNTIF dengan sempurna.
                </p>

                <div className="max-w-xs mx-auto mb-4">
                  <label className="block text-[8px] font-bold text-slate-400 uppercase mb-1">Ketik Nama Anda Untuk Sertifikat:</label>
                  <input
                    type="text"
                    placeholder="Nama Lengkap Anda..."
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full text-center px-3 py-1.5 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-excel-green focus:ring-1 focus:ring-excel-green"
                  />
                </div>

                <div className="border-4 border-double border-amber-800 p-4 bg-amber-50/50 rounded-xl text-center relative shadow-inner mb-3">
                  <span className="text-[8px] uppercase font-bold tracking-widest text-amber-800 block mb-1">Sertifikat Kelulusan Resmi</span>
                  <h4 className="font-serif italic text-sm text-slate-800 font-bold mb-1">EXCEL CREDIT MARKETING ACADEMY</h4>
                  <span className="text-[10px] text-slate-400 block">Dengan ini menyatakan bahwa:</span>
                  <p className="font-display font-bold text-base text-slate-900 border-b border-slate-300 max-w-xs mx-auto py-0.5 my-1 min-h-[1.5rem]">
                    {studentName || "[Nama Anda]"}
                  </p>
                  <p className="text-[10px] text-slate-600 my-1 leading-normal">
                    Telah menyelesaikan pelatihan:<br />
                    <strong className="text-slate-900">Pengolahan Data Microsoft Excel untuk Mendukung Pemasaran Kredit</strong>
                  </p>
                </div>

                <button
                  onClick={() => window.print()}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs shadow cursor-pointer"
                >
                  Cetak Sertifikat 🖨️
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <Award className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="font-display font-bold text-sm text-slate-800 mb-1">Sertifikat Belum Tersedia 🔒</h3>
                <p className="text-[10px] text-slate-400 mb-4 font-medium">
                  Selesaikan seluruh tantangan praktik mandiri di setiap modul untuk mengklaim Sertifikat.
                </p>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-1.5 rounded-lg text-xs cursor-pointer"
                >
                  Lanjutkan Belajar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
