import React, { useState, useEffect } from "react";
import { 
  Award, BookOpen, Bot, CheckCircle, ChevronDown, Sparkles, Layers, RefreshCw, BarChart2, Star, 
  CheckSquare, MessageSquare, X, Table, Snowflake, ArrowUpDown, Filter, Paintbrush, Trash2, 
  Search, Play, PlusCircle, Database, BarChart3, Send, ChevronRight, ChevronLeft, HelpCircle, 
  AlertCircle, User, FileSpreadsheet, Layers3, Activity, Landmark, GraduationCap
} from "lucide-react";
import { SpreadsheetSimulator } from "./components/SpreadsheetSimulator";
import { LessonContent } from "./components/LessonContent";
import { AIAssistant } from "./components/AIAssistant";
import { Challenge } from "./types";
import { TUTORIAL_CHALLENGES } from "./data";

export default function App() {
  // Navigation states
  const [activeWindowId, setActiveWindowId] = useState<string>("prospek_under_100jt");
  const [activeSheetId, setActiveSheetId] = useState<string>("data_nominatif");
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  
  // Challenges list loaded in state to track progress dynamically
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  
  // Sidebar toggles
  const [showAiAssistant, setShowAiAssistant] = useState<boolean>(true);

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

  // Overall statistics
  const totalChallenges = challenges.length;
  const completedChallenges = challenges.filter(c => c.completed).length;
  const overallProgress = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800" id="main-app">
      {/* Top Professional Header Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 select-none px-6 py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-emerald-700 text-white p-2.5 rounded-xl shadow-md shadow-emerald-100 flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-black text-[15px] tracking-tight leading-tight text-slate-900 flex items-center gap-1.5">
                Bank Mandiri Pratama <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">Simulator Kredit v2</span>
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">Latihan Microsoft Excel Untuk Pemasaran & Analisa Kredit</p>
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
        <section className="col-span-1 lg:col-span-4 flex flex-col gap-5 min-h-0">
          
          {/* File Selection Card (2 Window Simulators) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-sm select-none">
            <h3 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Layers3 className="w-4 h-4 text-slate-500" /> Pilih File Simulasi (2 Windows)
            </h3>
            
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

        {/* Center: Excel Grid Simulator Canvas (Span 5 to 8 depending on AI sidebar) */}
        <section className={`col-span-1 flex flex-col min-h-0 ${showAiAssistant ? "lg:col-span-5" : "lg:col-span-8"}`}>
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
            <AIAssistant />
          </section>
        )}

      </main>
    </div>
  );
}
