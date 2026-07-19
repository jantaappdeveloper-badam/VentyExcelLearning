import React, { useState, useEffect, useRef } from "react";
import { Bot, Send, User, RefreshCw, MessageSquare, AlertCircle, X } from "lucide-react";
import { ChatMessage } from "../types";

interface AIAssistantProps {
  onClose?: () => void;
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "ai",
      text: "Halo! Saya adalah **Asisten AI Excel Kredit Bank**.\n\nSaya di sini untuk membantu Anda menguasai pengolahan data kredit menggunakan Microsoft Excel berdasarkan kedua simulator di samping.\n\nAnda bisa menanyakan pertanyaan seperti:\n- *Bagaimana logika rumus SKALA PRIORITAS pada Template Prospek?*\n- *Bagaimana cara menghitung Tanggal Lahir + 58 tahun pensiun dengan DATE & YEAR?*\n- *Mengapa baki debet Juni Johana Matital berstatus BISA sedangkan Hermi TIDAK BISA?*\n- *Jelaskan cara kerja rumus DATEDIF untuk sisa masa dinas.*",
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
      formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
      formattedLine = formattedLine.replace(/\*(.*?)\*/g, '<em class="text-slate-800 italic">$1</em>');
      
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const clean = line.replace(/^[-*]\s+/, "");
        return <li key={idx} className="ml-4 list-disc text-[11px] text-slate-700 mb-0.5" dangerouslySetInnerHTML={{ __html: clean }} />;
      }
      if (line.trim().startsWith("=")) {
        return <div key={idx} className="bg-slate-900 text-emerald-400 font-mono text-[10px] p-2 rounded-lg my-1 border-l-4 border-emerald-500 overflow-x-auto">{line}</div>;
      }
      return <p key={idx} className="text-[11px] text-slate-700 leading-relaxed mb-1" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 border-l border-slate-200" id="ai-assistant-container">
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between shadow-sm border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-emerald-400 animate-pulse" />
          <div>
            <h4 className="font-display font-bold text-xs tracking-wider uppercase text-slate-200">AI Excel Tutor</h4>
            <span className="text-[9px] text-slate-400">Gemini 3.5 Assistant</span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Tutup Panel AI"
            aria-label="Tutup Panel AI"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map(m => (
          <div key={m.id} className={`flex gap-2 max-w-[90%] ${m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${m.sender === "user" ? "bg-emerald-600 text-white font-bold shadow-sm" : "bg-emerald-100 text-emerald-700 font-bold border border-emerald-200"}`}>
              {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className={`p-3 rounded-2xl border text-xs shadow-xs ${m.sender === "user" ? "bg-emerald-50 border-emerald-200 text-emerald-950 rounded-tr-none" : "bg-white border-slate-200 text-slate-800 rounded-tl-none"}`}>
                {formatText(m.text)}
              </div>
              <span className={`text-[8px] text-slate-400 ${m.sender === "user" ? "text-right" : ""}`}>{m.timestamp}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-[10px] text-slate-500 italic flex items-center gap-1.5 pl-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" /> 
            Tutor sedang menganalisis rumus...
          </div>
        )}
        {error && (
          <div className="text-[10px] text-red-500 font-semibold flex items-center gap-1 bg-red-50 p-2.5 rounded-lg border border-red-200">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="px-4 pb-3 pt-2 bg-slate-50 border-t border-slate-200 select-none">
          <p className="text-[9px] font-bold text-slate-500 mb-1.5 uppercase tracking-widest">Pertanyaan Populer:</p>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => handleQuickQuestion("Bagaimana logika rumus SKALA PRIORITAS pada Template Prospek?")}
              className="text-left text-[11px] bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 p-2 rounded-xl transition-all text-slate-700 shadow-xs cursor-pointer font-semibold"
            >
              💡 Logika Rumus SKALA PRIORITAS
            </button>
            <button
              onClick={() => handleQuickQuestion("Jelaskan rumus untuk menghitung Tanggal Lahir + 58 tahun pensiun dengan DATE & YEAR.")}
              className="text-left text-[11px] bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 p-2 rounded-xl transition-all text-slate-700 shadow-xs cursor-pointer font-semibold"
            >
              📅 Rumus Tanggal BUP (Pensiun 58 Thn)
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Tanya tutor Excel..."
          className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 placeholder:text-slate-400"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || loading}
          className="bg-emerald-600 text-white p-2.5 rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
