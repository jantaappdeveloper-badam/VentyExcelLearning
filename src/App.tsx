import React, { useState, useEffect } from "react";
import { 
  Award, BookOpen, Bot, CheckCircle, ChevronDown, Award as CertificateIcon, 
  Sparkles, Layers, RefreshCw, BarChart2, Star, CheckSquare, MessageSquare, X 
} from "lucide-react";
import { EXCEL_LESSONS } from "./data";
import { Lesson, Challenge } from "./types";
import LessonContent from "./components/LessonContent";
import SpreadsheetSimulator from "./components/SpreadsheetSimulator";
import AIAssistant from "./components/AIAssistant";

export default function App() {
  // Curriculum state holding lessons and challenge completions
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  
  // AI Sidebar visibility
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(true);
  
  // Certificate states
  const [studentName, setStudentName] = useState("");
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Initialize curriculum
  useEffect(() => {
    setLessons(JSON.parse(JSON.stringify(EXCEL_LESSONS)));
  }, []);

  // Update active challenge when lesson changes
  useEffect(() => {
    if (lessons.length > 0) {
      const currentLesson = lessons[activeLessonIndex];
      // Select first incomplete challenge, or first challenge
      const firstIncomplete = currentLesson.challenges.find(c => !c.completed);
      setActiveChallenge(firstIncomplete || currentLesson.challenges[0]);
    }
  }, [activeLessonIndex, lessons]);

  // Handle challenge completion
  const handleChallengeComplete = (challengeId: string) => {
    setLessons(prevLessons => {
      const updated = prevLessons.map((les, lIdx) => {
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

    // Auto-complete notification or popup sound if desired
    // Update local active challenge state
    setActiveChallenge(prev => prev ? { ...prev, completed: true } : null);
  };

  // Calculate global academy stats
  const totalChallenges = lessons.reduce((acc, l) => acc + l.challenges.length, 0);
  const totalCompletedChallenges = lessons.reduce((acc, l) => acc + l.challenges.filter(c => c.completed).length, 0);
  const totalProgressPercent = totalChallenges > 0 
    ? Math.round((totalCompletedChallenges / totalChallenges) * 100) 
    : 0;

  const isAcademyFinished = totalChallenges > 0 && totalCompletedChallenges === totalChallenges;

  const triggerCertificatePopup = () => {
    setShowCertificateModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col antialiased">
      
      {/* Academy Premium Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 text-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 select-none shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 text-white p-2 rounded-lg shadow-sm flex items-center justify-center">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg sm:text-xl text-slate-800 tracking-tight flex items-center gap-2">
              Excel Credit Marketing Academy <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            </h1>
            <p className="text-[10px] text-slate-500 font-light max-w-xl leading-snug">
              Bimbingan Praktis Pengolahan Data Nominatif Kredit & Strategi Pemasaran Berdasarkan Panduan Area 1 Bank
            </p>
          </div>
        </div>

        {/* Dynamic Progress Dashboard */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-3 bg-slate-50 p-1.5 px-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-right">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest block">Total Progress</span>
              <span className="text-xs font-mono font-bold text-slate-700">{totalCompletedChallenges}/{totalChallenges} Misi Selesai</span>
            </div>
            <div className="relative flex items-center justify-center">
              <svg className="w-10 h-10 transform -rotate-90">
                <circle 
                  cx="20" cy="20" r="16" 
                  className="stroke-slate-200" 
                  strokeWidth="3.5" fill="transparent" 
                />
                <circle 
                  cx="20" cy="20" r="16" 
                  className="stroke-emerald-600 transition-all duration-500 ease-out" 
                  strokeWidth="3.5" fill="transparent"
                  strokeDasharray={2 * Math.PI * 16}
                  strokeDashoffset={2 * Math.PI * 16 * (1 - totalProgressPercent / 100)}
                />
              </svg>
              <span className="absolute text-[10px] font-mono font-bold text-slate-700">{totalProgressPercent}%</span>
            </div>
          </div>

          {/* Claim Certificate Button (Always available to check or claims when finished) */}
          <button
            onClick={triggerCertificatePopup}
            className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md cursor-pointer ${
              isAcademyFinished 
                ? "bg-amber-500 hover:bg-amber-600 text-slate-950 animate-bounce" 
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Sertifikat Kelulusan</span>
          </button>
        </div>
      </header>

      {/* Curriculum Module Tabs Selectors */}
      <div className="bg-white border-b border-slate-200 text-slate-600 flex overflow-x-auto select-none px-4 text-xs font-medium shadow-sm">
        {lessons.map((les, index) => {
          const isActive = activeLessonIndex === index;
          const isCompleted = les.challenges.every(c => c.completed);
          
          return (
            <button
              key={les.id}
              onClick={() => setActiveLessonIndex(index)}
              className={`px-5 py-3 whitespace-nowrap transition-all flex items-center gap-2 border-b-2 font-semibold cursor-pointer ${
                isActive 
                  ? "bg-emerald-50/50 text-emerald-700 font-bold border-b-emerald-600" 
                  : "hover:bg-slate-50 text-slate-500 hover:text-slate-800 border-b-transparent"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
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

      {/* Main Split Layout Workspace */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Left Side: Interactive Lessons Guide */}
        <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col p-4 bg-slate-50 border-r border-slate-200 overflow-y-auto">
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

        {/* Right Side: Spreadsheet Workspace Simulator */}
        <div className="flex-1 flex flex-col p-4 bg-slate-100 overflow-hidden">
          <SpreadsheetSimulator
            activeChallenge={activeChallenge}
            onChallengeComplete={handleChallengeComplete}
          />
        </div>

        {/* Floating AI chat sidebar overlay or collapsible drawer */}
        <div 
          className={`fixed lg:relative top-0 right-0 h-full w-80 shrink-0 z-40 shadow-2xl lg:shadow-none transition-transform duration-350 ease-in-out ${
            isAiSidebarOpen ? "translate-x-0" : "translate-x-full lg:hidden"
          }`}
        >
          <AIAssistant />
          
          {/* Close button inside drawer for mobile */}
          <button 
            onClick={() => setIsAiSidebarOpen(false)}
            className="absolute top-3 right-3 lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toggle AI Sidebar Floating Action Button (Only when closed or on desktop) */}
        {!isAiSidebarOpen && (
          <button
            onClick={() => setIsAiSidebarOpen(true)}
            className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg shadow-emerald-100 z-50 transition-transform duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
            title="Buka Asisten AI Tutor"
          >
            <MessageSquare className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold pr-1">Asisten AI Excel</span>
          </button>
        )}
      </main>

      {/* Sertifikat Kelulusan Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" id="certificate-modal">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl border border-slate-200">
            
            {/* Close button */}
            <button 
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isAcademyFinished ? (
              // Case: User graduated
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <CertificateIcon className="w-14 h-14 text-amber-500 animate-spin-slow" />
                </div>
                
                <h3 className="font-display font-bold text-xl text-slate-900 mb-1">Selamat! Anda Telah Lulus 🎉</h3>
                <p className="text-xs text-slate-500 mb-4 max-w-md mx-auto">
                  Anda berhasil menyelesaikan seluruh materi latihan, membersihkan data duplikat, menyusun target pemasaran dengan rumus IF, dan melakukan analisis DATEDIF & COUNTIF dengan sempurna.
                </p>

                {/* Name Input */}
                <div className="max-w-xs mx-auto mb-6">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ketik Nama Anda Untuk Sertifikat:</label>
                  <input
                    type="text"
                    placeholder="Nama Lengkap Anda..."
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full text-center px-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-excel-green focus:ring-1 focus:ring-excel-green"
                  />
                </div>

                {/* Certificate Frame Preview */}
                <div className="border-8 border-double border-amber-800 p-6 bg-amber-50/50 rounded-xl text-center relative shadow-inner mb-4 overflow-hidden">
                  
                  {/* Subtle decorative watermark */}
                  <div className="absolute inset-0 opacity-5 flex items-center justify-center select-none pointer-events-none">
                    <CertificateIcon className="w-64 h-64 text-amber-900" />
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 block mb-2">Sertifikat Kelulusan Resmi</span>
                  <h4 className="font-serif italic text-xl text-slate-800 font-bold mb-4">EXCEL CREDIT MARKETING ACADEMY</h4>
                  
                  <span className="text-xs text-slate-500 block">Dengan ini menyatakan bahwa:</span>
                  <p className="font-display font-bold text-lg text-slate-900 border-b border-slate-300 max-w-sm mx-auto py-1 my-2 min-h-[2rem]">
                    {studentName || "[Nama Anda Akan Ditampilkan Di Sini]"}
                  </p>

                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed my-3 font-light">
                    Telah menyelesaikan dengan sangat baik pelatihan interaktif:<br />
                    <strong className="text-slate-900 font-semibold">Pengolahan Data Dasar Microsoft Excel untuk Mendukung Pemasaran Kredit</strong>
                  </p>

                  <div className="flex justify-between items-end mt-6 text-[10px] text-slate-500">
                    <div className="text-left font-mono">
                      <span>Tanggal: {new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}</span>
                    </div>
                    <div className="text-center font-serif">
                      <div className="w-24 border-t border-slate-400 mx-auto mt-2 pt-1 font-bold text-slate-700">
                        Excel AI Tutor
                      </div>
                      <span className="text-[8px] text-slate-400">Kepala Instruktur</span>
                    </div>
                  </div>
                </div>

                {/* Print action helper button */}
                <button
                  onClick={() => window.print()}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs shadow transition-colors cursor-pointer"
                >
                  Cetak Sertifikat 🖨️
                </button>
              </div>
            ) : (
              // Case: User hasn't finished all modules
              <div className="text-center py-6">
                <div className="flex justify-center mb-3">
                  <Award className="w-14 h-14 text-slate-300" />
                </div>
                
                <h3 className="font-display font-bold text-lg text-slate-800 mb-1.5">Sertifikat Belum Tersedia 🔒</h3>
                <p className="text-xs text-slate-500 mb-5 max-w-md mx-auto leading-relaxed">
                  Untuk mengklaim Sertifikat Kelulusan Resmi, Anda harus menyelesaikan terlebih dahulu seluruh tantangan praktik mandiri yang ada di setiap modul pembelajaran.
                </p>

                {/* Progress inside modal */}
                <div className="max-w-xs mx-auto bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-inner mb-4">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Progres Misi</span>
                    <span>{totalCompletedChallenges} dari {totalChallenges} Selesai</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-excel-green h-full rounded-full transition-all duration-500"
                      style={{ width: `${totalProgressPercent}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-xl text-xs shadow transition-colors cursor-pointer"
                >
                  Lanjutkan Belajar &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
