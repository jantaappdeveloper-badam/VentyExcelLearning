import React, { useState } from "react";
import { BookOpen, Award, CheckCircle, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import { LessonModule, Challenge } from "../types";
import { LESSON_MODULES } from "../data";

interface LessonContentProps {
  activeModuleIndex: number;
  setActiveModuleIndex: (idx: number) => void;
  activeChallenge: Challenge | null;
  setActiveChallenge: (ch: Challenge | null) => void;
  challenges: Challenge[];
  onChallengeSelect: (ch: Challenge) => void;
}

export function LessonContent({
  activeModuleIndex,
  setActiveModuleIndex,
  activeChallenge,
  setActiveChallenge,
  challenges,
  onChallengeSelect
}: LessonContentProps) {
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);

  const activeModule = LESSON_MODULES[activeModuleIndex] || LESSON_MODULES[0];
  const chapters = activeModule.chapters;
  
  // Filter challenges for this module
  const moduleWindowId = activeModuleIndex === 0 ? "prospek_under_100jt" : "pegawai_plus_bup";
  const moduleChallenges = challenges.filter(c => c.windowId === moduleWindowId);
  const completedCount = moduleChallenges.filter(c => c.completed).length;
  const progressPercent = moduleChallenges.length > 0 
    ? Math.round((completedCount / moduleChallenges.length) * 100) 
    : 0;

  const handleNext = () => {
    if (activeChapterIdx < chapters.length - 1) {
      setActiveChapterIdx(activeChapterIdx + 1);
    } else if (activeModuleIndex < LESSON_MODULES.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
      setActiveChapterIdx(0);
    }
  };

  const handleBack = () => {
    if (activeChapterIdx > 0) {
      setActiveChapterIdx(activeChapterIdx - 1);
    } else if (activeModuleIndex > 0) {
      setActiveModuleIndex(activeModuleIndex - 1);
      const prevModule = LESSON_MODULES[activeModuleIndex - 1];
      setActiveChapterIdx(prevModule.chapters.length - 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm" id="lesson-module">
      {/* Header */}
      <div className="p-5 bg-emerald-900 text-white select-none">
        <div className="flex items-center gap-2 mb-1.5">
          <BookOpen className="w-4 h-4 text-emerald-300" />
          <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
            Modul {activeModuleIndex + 1} dari {LESSON_MODULES.length}
          </span>
        </div>
        <h3 className="font-display font-bold text-base tracking-tight leading-tight mb-1">
          {activeModule.title}
        </h3>
        <p className="text-[11px] text-emerald-100 font-light leading-normal">
          {activeModule.subtitle}
        </p>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[10px] font-semibold text-emerald-200 mb-1">
            <span>Progres Latihan Rumus</span>
            <span>{completedCount} / {moduleChallenges.length} Selesai ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-emerald-950/60 h-1.5 rounded-full overflow-hidden border border-emerald-800/40">
            <div 
              className="bg-emerald-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chapters Tabs */}
      <div className="bg-slate-50 border-b border-slate-200 flex overflow-x-auto custom-scrollbar select-none text-[11px] font-medium text-slate-500 shrink-0">
        {chapters.map((ch, idx) => {
          const isSelected = activeChapterIdx === idx;
          return (
            <button
              key={ch.id}
              onClick={() => setActiveChapterIdx(idx)}
              className={`px-4 py-3 border-r border-slate-200 whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected 
                  ? "bg-white text-emerald-700 font-bold border-b-2 border-b-emerald-600" 
                  : "hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                isSelected ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
              }`}>
                {idx + 1}
              </span>
              {ch.title}
            </button>
          );
        })}
      </div>

      {/* Chapter Contents */}
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <h4 className="font-display font-bold text-sm text-slate-900 mb-2.5 tracking-tight flex items-center gap-2 select-none">
          <span className="text-emerald-600 font-mono">#{activeChapterIdx + 1}</span> 
          {chapters[activeChapterIdx]?.title}
        </h4>
        
        <div 
          className="prose prose-sm max-w-none text-slate-600 text-xs leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: chapters[activeChapterIdx]?.contentHtml || "" }}
        />

        {/* Practice Section inside Module */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 shadow-xs">
          <div className="bg-slate-800 p-3 px-4 text-white flex items-center justify-between select-none">
            <h5 className="font-display font-bold text-xs tracking-tight flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Tantangan Praktik Mandiri
            </h5>
            <span className="text-[10px] bg-slate-700 text-slate-300 px-2.5 py-0.5 rounded-full font-bold">
              {completedCount} / {moduleChallenges.length} Selesai
            </span>
          </div>
          
          <div className="p-3 space-y-2">
            {moduleChallenges.map((ch) => {
              const isActive = activeChallenge?.id === ch.id;
              return (
                <div 
                  key={ch.id}
                  onClick={() => onChallengeSelect(ch)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    ch.completed 
                      ? "bg-emerald-50/40 border-emerald-100 text-slate-500" 
                      : isActive
                        ? "bg-white border-emerald-500 shadow-sm ring-2 ring-emerald-100 text-slate-900 font-medium"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  <div className="flex gap-2.5 items-start">
                    <div className="mt-0.5 shrink-0 select-none">
                      {ch.completed ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          isActive ? "border-emerald-600" : "border-slate-300"
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-[11px] font-bold ${ch.completed ? "line-through text-slate-400" : ""}`}>
                        {ch.title}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                        {ch.description}
                      </p>
                      
                      {isActive && !ch.completed && (
                        <div className="mt-2.5 bg-slate-50 border border-slate-200 p-3 rounded-lg text-[10.5px] text-slate-600 space-y-1.5">
                          <p className="font-semibold text-slate-800 flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5 text-slate-500" /> Petunjuk Langkah:
                          </p>
                          <p className="leading-relaxed">{ch.instructions}</p>
                          <div className="bg-emerald-50 border border-emerald-100 p-2 rounded text-[10px] text-emerald-950">
                            <span className="font-bold">Target Penulisan Rumus:</span>
                            <code className="block font-mono mt-1 text-[9.5px] bg-white p-1 rounded border border-emerald-100 font-bold">
                              {ch.expectedFormula[0]}
                            </code>
                          </div>
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

      {/* Footer Navigation */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between select-none shrink-0">
        <button
          onClick={handleBack}
          disabled={activeModuleIndex === 0 && activeChapterIdx === 0}
          className="flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-800 disabled:opacity-40 px-3 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Kembali
        </button>

        <span className="text-[10px] text-slate-400 font-mono">
          Hal {activeChapterIdx + 1} / {chapters.length}
        </span>

        <button
          onClick={handleNext}
          disabled={activeModuleIndex === LESSON_MODULES.length - 1 && activeChapterIdx === chapters.length - 1}
          className="flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 px-3.5 py-1.5 rounded-lg cursor-pointer disabled:cursor-not-allowed transition-colors"
        >
          Lanjut <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
