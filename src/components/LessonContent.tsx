import React, { useState } from "react";
import { BookOpen, CheckCircle, ChevronLeft, ChevronRight, Award, HelpCircle, ArrowRight } from "lucide-react";
import { Lesson, Challenge } from "../types";

interface LessonContentProps {
  lessons: Lesson[];
  activeLessonIndex: number;
  setActiveLessonIndex: (index: number) => void;
  activeChallenge: Challenge | null;
  setActiveChallenge: (challenge: Challenge | null) => void;
}

export default function LessonContent({
  lessons,
  activeLessonIndex,
  setActiveLessonIndex,
  activeChallenge,
  setActiveChallenge
}: LessonContentProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const lesson = lessons[activeLessonIndex];
  const chapters = lesson.chapters;
  const challenges = lesson.challenges;

  // Calculate lesson progress percentage
  const completedCount = challenges.filter(c => c.completed).length;
  const progressPercent = Math.round((completedCount / challenges.length) * 100);

  const handleNextChapter = () => {
    if (activeChapterIndex < chapters.length - 1) {
      setActiveChapterIndex(activeChapterIndex + 1);
    } else if (activeLessonIndex < lessons.length - 1) {
      // Go to next lesson
      setActiveLessonIndex(activeLessonIndex + 1);
      setActiveChapterIndex(0);
    }
  };

  const handlePrevChapter = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex(activeChapterIndex - 1);
    } else if (activeLessonIndex > 0) {
      // Go to previous lesson
      const prevLesson = lessons[activeLessonIndex - 1];
      setActiveLessonIndex(activeLessonIndex - 1);
      setActiveChapterIndex(prevLesson.chapters.length - 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm" id="lesson-module">
      
      {/* Lesson Header */}
      <div className="p-5 bg-emerald-900 text-white select-none">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-4 h-4 text-emerald-300" />
          <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Modul {lesson.id} dari {lessons.length}</span>
        </div>
        <h3 className="font-display font-bold text-base tracking-tight leading-tight mb-1">{lesson.title}</h3>
        <p className="text-[11px] text-emerald-100 font-light">{lesson.subtitle}</p>
        
        {/* Progress bar */}
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

      {/* Chapters Tabs */}
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

      {/* Chapter Main Content */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <h4 className="font-display font-bold text-sm text-slate-900 mb-3 tracking-tight flex items-center gap-2">
          <span className="text-emerald-600 font-mono">#{activeChapterIndex + 1}</span> 
          {chapters[activeChapterIndex].title}
        </h4>
        
        <div 
          className="prose prose-sm max-w-none text-slate-600 text-xs leading-relaxed"
          dangerouslySetInnerHTML={{ __html: chapters[activeChapterIndex].contentHtml }}
        />

        {/* Challenge Board / Practice Target */}
        <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-slate-50/50">
          <div className="bg-slate-800 p-3 px-4 text-white flex items-center justify-between">
            <h5 className="font-display font-bold text-xs tracking-tight flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Tantangan Praktik Mandiri
            </h5>
            <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-bold">
              {completedCount} / {challenges.length} Selesai
            </span>
          </div>
          
          <div className="p-4 space-y-3">
            {challenges.map((ch) => {
              const isActive = activeChallenge?.id === ch.id;
              return (
                <div 
                  key={ch.id}
                  onClick={() => setActiveChallenge(ch)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    ch.completed 
                      ? "bg-emerald-50/30 border-emerald-100 text-slate-600" 
                      : isActive
                        ? "bg-white border-emerald-500 shadow-sm ring-2 ring-emerald-100 text-slate-900"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-2.5">
                      <div className="mt-0.5">
                        {ch.completed ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                        ) : (
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            isActive ? "border-emerald-600 animate-pulse" : "border-slate-300"
                          }`} />
                        )}
                      </div>
                      <div>
                        <p className={`text-xs font-semibold ${ch.completed ? "line-through text-slate-400" : ""}`}>
                          {ch.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                          {ch.description}
                        </p>
                        
                        {/* Interactive instructions when selected */}
                        {isActive && !ch.completed && (
                          <div className="mt-2.5 bg-slate-50 border border-slate-200 p-3 rounded-lg text-[11px] text-slate-600">
                            <p className="font-semibold text-slate-800 mb-1 flex items-center gap-1">
                              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" /> Petunjuk Langkah:
                            </p>
                            <p className="leading-normal">{ch.instructions}</p>
                            <p className="text-emerald-700 font-mono mt-2 text-[10px] bg-emerald-50 p-1.5 rounded border border-emerald-100">
                              Target Aksi: {ch.expectedValueDescription || "Gunakan tombol kontrol di atas tabel."}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {!ch.completed && !isActive && (
                      <span className="text-[10px] text-emerald-600 hover:underline shrink-0 font-medium">
                        Mulai &rarr;
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chapter Navigation Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between select-none rounded-b-2xl">
        <button
          onClick={handlePrevChapter}
          disabled={activeLessonIndex === 0 && activeChapterIndex === 0}
          className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Kembali
        </button>

        <span className="text-xs text-slate-400 font-mono">
          Hal {activeChapterIndex + 1} / {chapters.length}
        </span>

        <button
          onClick={handleNextChapter}
          className="flex items-center gap-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          {activeChapterIndex === chapters.length - 1 && activeLessonIndex === lessons.length - 1 ? (
            "Selesai Pelajaran 🎉"
          ) : (
            <>
              Lanjut <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
