import React, { useState, useEffect } from "react";
import { 
  Award, BookOpen, Bot, CheckCircle, ChevronDown, Sparkles, Layers, RefreshCw, BarChart2, Star, 
  CheckSquare, MessageSquare, X, Table, Snowflake, ArrowUpDown, Filter, Paintbrush, Trash2, 
  Search, Play, PlusCircle, Database, BarChart3, Send, ChevronRight, ChevronLeft, HelpCircle, 
  AlertCircle, User, FileSpreadsheet, Layers3, Activity, Landmark, GraduationCap, CheckCircle2, ArrowRight
} from "lucide-react";
import { SpreadsheetSimulator } from "./components/SpreadsheetSimulator";
import { LessonContent } from "./components/LessonContent";
import { AIAssistant } from "./components/AIAssistant";
import { PresentationScreen } from "./components/PresentationScreen";
import { Challenge } from "./types";
import { TUTORIAL_CHALLENGES } from "./data";

export default function App() {
  // Training state tracker
  const [trainingState, setTrainingState] = useState<"HOME" | "W1_PRESENTATION" | "W1_SIMULATION" | "W2_PRESENTATION" | "W2_SIMULATION" | "SUMMARY">("HOME");

  // Navigation states
  const [activeWindowId, setActiveWindowId] = useState<string>("prospek_under_100jt");
  const [activeSheetId, setActiveSheetId] = useState<string>("data_nominatif");
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  
  // Challenges list loaded in state to track progress dynamically
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  
  // Sidebar toggles
  const [showAiAssistant, setShowAiAssistant] = useState<boolean>(true);
  const [showLeftSidebar, setShowLeftSidebar] = useState<boolean>(true);

  // Initialize challenges
  useEffect(() => {
    setChallenges(JSON.parse(JSON.stringify(TUTORIAL_CHALLENGES)));
  }, []);

  // Update active sheet or modules when changing windows
  const handleWindowChange = (windowId: string) => {
    setActiveWindowId(windowId);
    if (windowId === "prospek_under_100jt") {
      setActiveSheetId("data_nominatif");
      setActiveModuleIndex(0);
    } else {
      setActiveSheetId("pegawai_bup");
      setActiveModuleIndex(1);
    }
    setActiveChallenge(null);
  };

  // Sync active module index with window state (or vice-versa)
  const handleModuleChange = (moduleIdx: number) => {
    setActiveModuleIndex(moduleIdx);
    if (moduleIdx === 0) {
      setActiveWindowId("prospek_under_100jt");
      setActiveSheetId("prospek"); // Open the simulation sheet directly for practice
    } else {
      setActiveWindowId("pegawai_plus_bup");
      setActiveSheetId("pegawai_bup");
    }
    setActiveChallenge(null);
  };

  // Select a challenge
  const handleChallengeSelect = (challenge: Challenge) => {
    setActiveChallenge(challenge);
    setActiveWindowId(challenge.windowId);
    setActiveSheetId(challenge.sheetId);
  };

  // Challenge completion handler from simulator
  const handleChallengeComplete = (challengeId: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        return { ...c, completed: true };
      }
      return c;
    }));

    // Update the active challenge state if it's the completed one
    setActiveChallenge(prev => {
      if (prev && prev.id === challengeId) {
        return { ...prev, completed: true };
      }
      return prev;
    });
  };

  // Start specific simulation from presentation slide
  const handleStartSimulation = (windowId: "prospek_under_100jt" | "pegawai_plus_bup") => {
    if (windowId === "prospek_under_100jt") {
      setActiveWindowId("prospek_under_100jt");
      setActiveSheetId("prospek");
      setActiveModuleIndex(0);
      setTrainingState("W1_SIMULATION");
    } else {
      setActiveWindowId("pegawai_plus_bup");
      setActiveSheetId("pegawai_bup");
      setActiveModuleIndex(1);
      setTrainingState("W2_SIMULATION");
    }
    // Auto-select first matching challenge
    const matched = challenges.find(c => c.windowId === windowId && !c.completed);
    if (matched) {
      setActiveChallenge(matched);
    }
  };

  // Reset progress and return to home
  const handleResetAndHome = () => {
    setChallenges(JSON.parse(JSON.stringify(TUTORIAL_CHALLENGES)));
    setActiveChallenge(null);
    setActiveWindowId("prospek_under_100jt");
    setActiveSheetId("data_nominatif");
    setActiveModuleIndex(0);
    setTrainingState("HOME");
  };

  // Overall statistics
  const totalChallenges = challenges.length;
  const completedChallenges = challenges.filter(c => c.completed).length;
  const overallProgress = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0;

  // =========================================================================
  // VIEW RENDERER BASED ON STATE
  // =========================================================================

  // 1. HOME SCREEN / HALAMAN AWAL WEBSITE
  if (trainingState === "HOME") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-none relative overflow-hidden" id="landing-home">
        {/* Decorative background gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-100/40 to-transparent pointer-events-none" />
        
        {/* Header */}
        <header className="p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center z-10 gap-4 shrink-0">
          <div className="flex items-center gap-3 bg-white p-3 px-5 rounded-2xl border border-slate-200 shadow-xs">
            <svg className="h-10 md:h-11 w-auto shrink-0" viewBox="0 0 420 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="BPR Modern Express Logo">
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
            <div className="h-8 w-[1px] bg-slate-200 mx-1.5" />
            <span className="text-[10px] font-black tracking-widest text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-3 py-1.5 rounded-lg uppercase">
              ACADEMY
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1 text-center sm:text-right">
            <span className="text-[11px] font-mono bg-white text-slate-700 px-3 py-1.5 rounded-full border border-slate-200 shadow-3xs">
              Modern Express Academy v2.5
            </span>
            <span className="text-[10px] text-slate-500 font-bold">
              Oleh: <strong className="text-emerald-700">Adventsia Imuly | Staf Bisnis Area 1</strong>
            </span>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col justify-center items-center max-w-5xl mx-auto w-full px-6 md:px-12 py-8 z-10 text-center space-y-8 my-auto">
          <div className="space-y-4 max-w-3xl">
            <span className="text-emerald-800 font-mono text-xs uppercase font-bold tracking-widest bg-emerald-100 border border-emerald-200 p-2 px-4 rounded-full shadow-3xs">
              SISTEM PELATIHAN STAF BARU (PEMASARAN & ANALISA KREDIT)
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-tight text-slate-900">
              Simulator Pengisian Rumus <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Microsoft Excel Kredit</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              Selamat datang di portal pembelajaran interaktif BPR Modern Express. Modul ini dirancang secara khusus untuk membimbing staf baru dalam menguasai logika, kriteria bisnis perbankan, dan penulisan rumus Excel yang telah ditetapkan untuk analisis kredit.
            </p>
          </div>

          {/* Cards detailing the two study windows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left pt-4">
            {/* Window 1 Preview Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-emerald-500 transition-all shadow-md hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black tracking-wider px-3 py-1 rounded-full uppercase border border-emerald-200">
                    MODUL 1
                  </span>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-emerald-600 shadow-3xs">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="font-display font-black text-xl text-slate-900">Window 1: Template Prospek</h4>
                <p className="text-slate-600 text-xs mt-2.5 leading-relaxed">
                  Pelajari penyaringan debitur potensial under 100 juta. Fokus pada penguasaan perhitungan:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1.5" />
                    <span><strong>Kolom Usia (Kolom D)</strong>: Rumus DATEDIF & kriteria batas umur.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1.5" />
                    <span><strong>Kolom Skala Prioritas (Kolom N)</strong>: Logika IF Bersarang & AND.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Window 2 Preview Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-emerald-500 transition-all shadow-md hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black tracking-wider px-3 py-1 rounded-full uppercase border border-emerald-200">
                    MODUL 2
                  </span>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-emerald-600 shadow-3xs">
                    <Layers className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="font-display font-black text-xl text-slate-900">Window 2: Pegawai Plus BUP</h4>
                <p className="text-slate-600 text-xs mt-2.5 leading-relaxed">
                  Kelola data debitur aktif (ASN) menjelang pensiun. Fokus pada penentuan:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1.5" />
                    <span><strong>Kolom Nofas (Kolom A)</strong>: Definisi ID unik transaksi kredit.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1.5" />
                    <span><strong>Kolom Prospek Untuk Kredit (Kolom K)</strong>: Skema Pegawai Plus 1 & 2.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1.5" />
                    <span><strong>Kolom Prospek (Kolom N)</strong>: Evaluasi kelayakan limit baki debet &le; 100jt.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-6">
            <button
              onClick={() => setTrainingState("W1_PRESENTATION")}
              className="p-4 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-bold text-sm md:text-base flex items-center gap-2.5 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Mulai Sesi Presentasi & Training Staf Baru</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </main>

        <footer className="p-6 text-center text-xs text-slate-500 border-t border-slate-200 select-none flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full z-10">
          <span>&copy; {new Date().getFullYear()} BPR Modern Express Academy. Hak Cipta Dilindungi Undang-Undang.</span>
          <span className="text-slate-600 font-bold">Pembuat Aplikasi Training: <strong className="text-emerald-700">Adventsia Imuly | Staf Bisnis Area 1</strong></span>
        </footer>
      </div>
    );
  }

  // 2. WINDOW 1 PRESENTATION (Full screen explanation)
  if (trainingState === "W1_PRESENTATION") {
    return (
      <PresentationScreen
        activeWindowId="prospek_under_100jt"
        onStartSimulation={handleStartSimulation}
        onExit={handleResetAndHome}
      />
    );
  }

  // 3. WINDOW 2 PRESENTATION (Full screen explanation)
  if (trainingState === "W2_PRESENTATION") {
    return (
      <PresentationScreen
        activeWindowId="pegawai_plus_bup"
        onStartSimulation={handleStartSimulation}
        onExit={handleResetAndHome}
      />
    );
  }

  // 4. TRAINING SUMMARY SCREEN (Lulus / Selesai)
  if (trainingState === "SUMMARY") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-none relative overflow-hidden" id="training-summary">
        {/* Decorative background gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-100/40 to-transparent pointer-events-none" />
        
        <main className="flex-1 flex flex-col justify-center items-center max-w-4xl mx-auto w-full px-6 md:px-12 py-12 text-center space-y-8 my-auto z-10">
          <div className="bg-white border border-slate-200 p-10 rounded-3xl shadow-xl relative overflow-hidden w-full space-y-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl" />

            <div className="bg-emerald-600 text-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-emerald-700 font-mono text-xs uppercase tracking-widest font-black">
                SERTIFIKAT KELULUSAN AKADEMI
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-slate-900 leading-tight">
                Pelatihan Rumus Excel Selesai!
              </h2>
              <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
                Selamat! Anda telah menyelesaikan seluruh sesi pembelajaran, memahami logika bisnis, serta berhasil mensimulasikan rumus-rumus Excel kredit penting di BPR Modern Express.
              </p>
              <p className="text-xs text-emerald-700 font-bold pt-2 uppercase tracking-wider">
                Pembuat Aplikasi: Adventsia Imuly | Staf Bisnis Area 1
              </p>
            </div>

            {/* Structured review of mastered topics */}
            <div className="border border-slate-200 rounded-2xl bg-slate-50/50 p-6 text-left space-y-4 max-w-2xl mx-auto">
              <h4 className="font-display font-bold text-xs text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-2">
                REKAPITULASI MATERI YANG TELAH DIKUASAI
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* W1 topics */}
                <div className="space-y-2.5">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded font-black uppercase">
                    WINDOW 1: TEMPLATE PROSPEK
                  </span>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Usia (Kolom D)</strong>: Menggunakan selisih tanggal penuh dengan formula <code className="text-emerald-700 font-mono font-bold font-black bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200/50">=DATEDIF</code>.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Skala Prioritas (Kolom N)</strong>: Logika bertingkat <code className="text-emerald-700 font-mono font-bold font-black bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200/50">=IF(AND())</code> menyaring plafond &le; 100 juta.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* W2 topics */}
                <div className="space-y-2.5">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded font-black uppercase">
                    WINDOW 2: PEGAWAI PLUS BUP
                  </span>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Nofas (Kolom A)</strong>: Penggunaan ID unik fasilitas dalam pengauditan kredit.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Prospek Kredit (Kolom K)</strong>: Skema bertingkat Pegawai Plus 1 & 2 berdasarkan sisa masa dinas.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Prospek (Kolom N)</strong>: Evaluasi kelayakan limit nominal outstanding baki debet &le; 100 Juta.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleResetAndHome}
            className="p-4 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Kembali ke Beranda Utama</span>
          </button>
        </main>
      </div>
    );
  }

  // 5. ACTIVE SIMULATION PRACTICE (WINDOW 1 OR WINDOW 2)
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 animate-fade-in" id="main-app">
      {/* Top Banner indicating active simulation training state */}
      <div className="bg-emerald-900 text-white px-6 py-3 border-b border-emerald-800 shrink-0 select-none flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <GraduationCap className="w-5 h-5 text-emerald-300 animate-bounce" />
          <p className="text-xs md:text-sm font-semibold tracking-wide">
            {trainingState === "W1_SIMULATION" ? (
              <span>🎯 <strong>Sesi Praktek Window 1:</strong> Silakan lengkapi kolom <strong>Usia (Kolom D)</strong> dan <strong>Skala Prioritas (Kolom N)</strong> di lembar kerja.</span>
            ) : (
              <span>🎯 <strong>Sesi Praktek Window 2:</strong> Silakan lengkapi kolom <strong>Nofas (Kolom A)</strong>, <strong>Prospek Kredit (Kolom K)</strong>, dan <strong>Prospek (Kolom N)</strong>.</span>
            )}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Toggle Panel Kiri (Selayar Penuh) */}
          <button
            onClick={() => setShowLeftSidebar(!showLeftSidebar)}
            className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 border border-emerald-700/60 text-white text-xs font-black rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            title="Sembunyikan / Tampilkan Panel Kiri (Materi & File)"
          >
            {showLeftSidebar ? "🖥️ Sembunyikan Panel Kiri (Selayar Penuh)" : "📁 Tampilkan Panel Kiri"}
          </button>

          {trainingState === "W1_SIMULATION" ? (
            <button
              onClick={() => setTrainingState("W2_PRESENTATION")}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1 font-bold"
            >
              <span>Lanjut ke Penjelasan Window 2</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setTrainingState("SUMMARY")}
              className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1 font-bold"
            >
              <span>Selesaikan Training & Lihat Hasil</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleResetAndHome}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>

      {/* Top Professional Header Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 select-none px-6 py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo Brand */}
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
              <h1 className="font-display font-black text-xs md:text-sm tracking-tight leading-tight text-slate-900 flex items-center gap-1.5">
                <span className="text-[9px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 font-extrabold uppercase">Simulator Kredit v2.5</span>
              </h1>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                Latihan Pemasaran &Analisa &bull; <span className="text-emerald-700 font-bold">Adventsia Imuly | Staf Bisnis Area 1</span>
              </p>
            </div>
          </div>

          {/* Core Applet stats */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2 px-3.5">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Misi Praktik Mandiri</p>
                <p className="text-xs font-bold text-slate-800">{completedChallenges} / {totalChallenges} Rumus Selesai ({overallProgress}%)</p>
              </div>
            </div>

            {/* Left Sidebar Toggle */}
            <button
              onClick={() => setShowLeftSidebar(!showLeftSidebar)}
              className={`p-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs border ${
                !showLeftSidebar 
                  ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700" 
                  : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
              }`}
              title="Sembunyikan atau Tampilkan Panel Teori & File Pembelajaran"
            >
              <FileSpreadsheet className="w-4 h-4 text-slate-500" />
              <span>{showLeftSidebar ? "Sembunyikan Panel Kiri" : "Tampilkan Panel Kiri"}</span>
            </button>

            {/* AI Coaching Toggle */}
            <button
              onClick={() => setShowAiAssistant(!showAiAssistant)}
              className={`p-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs border ${
                showAiAssistant 
                  ? "bg-slate-900 text-white border-slate-900" 
                  : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
              }`}
            >
              <Bot className={`w-4 h-4 ${showAiAssistant ? "text-emerald-400" : "text-slate-500"}`} />
              <span>{showAiAssistant ? "Sembunyikan AI Coach" : "Tanya AI Coach"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* Left Hand: Window/Task Selector + Learning Theory Module (Span 4) */}
        {showLeftSidebar && (
          <section className="col-span-1 lg:col-span-4 flex flex-col gap-5 min-h-0">
            
            {/* File Selection Card (2 Window Simulators) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-sm select-none">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers3 className="w-4 h-4 text-slate-500" /> Pilih File Simulasi (2 Windows)
                </h3>
                <button
                  onClick={() => setShowLeftSidebar(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                  title="Sembunyikan Panel Kiri (Selayar Penuh)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex flex-col gap-2.5">
                {/* Window 1 */}
                <button
                  onClick={() => handleWindowChange("prospek_under_100jt")}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    activeWindowId === "prospek_under_100jt"
                      ? "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs ring-2 ring-emerald-50"
                      : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${activeWindowId === "prospek_under_100jt" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-xs">Window 1: Template Prospek</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-normal font-semibold">Plafond Under 100juta (Data nominatif & Prospek)</p>
                  </div>
                </button>

                {/* Window 2 */}
                <button
                  onClick={() => handleWindowChange("pegawai_plus_bup")}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    activeWindowId === "pegawai_plus_bup"
                      ? "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs ring-2 ring-emerald-50"
                      : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${activeWindowId === "pegawai_plus_bup" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-xs">Window 2: Pegawai Plus BUP</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-normal font-semibold">Batas Usia Pensiun & Sisa Masa Dinas Pegawai</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Theory and Chapter Selector Module */}
            <div className="flex-1 min-h-0">
              <LessonContent
                activeModuleIndex={activeModuleIndex}
                setActiveModuleIndex={handleModuleChange}
                activeChallenge={activeChallenge}
                setActiveChallenge={setActiveChallenge}
                challenges={challenges}
                onChallengeSelect={handleChallengeSelect}
              />
            </div>
          </section>
        )}

        {/* Center: Excel Grid Simulator Canvas (Span 5 to 12 depending on sidebar toggles) */}
        <section className={`col-span-1 flex flex-col min-h-0 ${
          showLeftSidebar 
            ? (showAiAssistant ? "lg:col-span-5" : "lg:col-span-8")
            : (showAiAssistant ? "lg:col-span-9" : "lg:col-span-12")
        }`}>
          {/* Quick toggle to show Left Sidebar if it was closed */}
          {!showLeftSidebar && (
            <div className="mb-3 bg-slate-100 p-2.5 px-4 rounded-xl border border-slate-200 flex items-center justify-between gap-4 select-none">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span className="text-xs text-slate-600 font-medium">Panel pembelajaran tersembunyi. Silakan tampilkan kembali jika Anda membutuhkan panduan materi atau ingin berganti Window latihan.</span>
              </div>
              <button
                onClick={() => setShowLeftSidebar(true)}
                className="p-1 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Tampilkan Materi Pembelajaran
              </button>
            </div>
          )}

          <SpreadsheetSimulator
            activeWindowId={activeWindowId}
            activeSheetId={activeSheetId}
            setActiveSheetId={setActiveSheetId}
            activeChallenge={activeChallenge}
            onChallengeComplete={handleChallengeComplete}
          />
        </section>

        {/* Right Hand Sidebar: AI Coach Assistant (Span 3, collapsible) */}
        {showAiAssistant && (
          <section className="col-span-1 lg:col-span-3 flex flex-col min-h-0 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <AIAssistant onClose={() => setShowAiAssistant(false)} />
          </section>
        )}

      </main>
    </div>
  );
}

