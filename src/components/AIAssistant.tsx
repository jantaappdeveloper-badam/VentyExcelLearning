import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, User, AlertCircle, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIAssistant() {
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

  // Auto-scroll to bottom on new messages
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
      // Build history format expected by gemini chat.
      // Format should contain parts: [{ text: "..." }]
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

      const data = await response.json();
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.response || "Maaf, saya tidak menerima respons yang valid.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi masalah jaringan.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "init",
        sender: "ai",
        text: "Halo! Saya adalah **Asisten AI Excel Kredit**. Saya siap membantu Anda menguasai pengolahan data kredit perbankan menggunakan Excel. Silakan tanyakan apa saja!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setError(null);
  };

  // Convert markdown-style bold/bullet to HTML simple styling
  const formatMessageText = (text: string) => {
    return text.split("\n").map((line, idx) => {
      let formattedLine = line;
      
      // Bold text formatting **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      formattedLine = formattedLine.replace(boldRegex, '<strong class="font-semibold text-emerald-950">$1</strong>');
      
      // Italic text formatting *text*
      const italicRegex = /\*(.*?)\*/g;
      formattedLine = formattedLine.replace(italicRegex, '<em class="text-slate-800 italic">$1</em>');

      // Bullet points - or *
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const cleanContent = line.replace(/^[-*]\s+/, "");
        return (
          <li key={idx} className="ml-4 list-disc text-sm text-slate-700 leading-relaxed mb-1"
              dangerouslySetInnerHTML={{ __html: cleanContent.replace(boldRegex, '<strong>$1</strong>') }} />
        );
      }

      // Check if it's a code block/formula block (starts with `=` or wrapped in backticks)
      if (line.trim().startsWith("=") || (line.trim().startsWith("`") && line.trim().endsWith("`"))) {
        const cleanFormula = line.replace(/`/g, "");
        return (
          <div key={idx} className="bg-slate-900 text-emerald-400 font-mono text-xs p-2 rounded my-1 overflow-x-auto shadow-inner border-l-4 border-excel-green">
            {cleanFormula}
          </div>
        );
      }

      return (
        <p key={idx} className="text-sm text-slate-700 leading-relaxed mb-2 min-h-[1rem]"
           dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 border-l border-slate-200" id="ai-assistant-container">
      {/* Header - Sleek Dark Gray with gold/emerald accent */}
      <div className="p-4 bg-slate-800 text-slate-100 flex items-center justify-between shadow-sm border-b border-slate-700 select-none">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-emerald-400 animate-pulse" />
          <div>
            <h4 className="font-display font-bold text-xs tracking-wider uppercase text-slate-200 flex items-center gap-1">
              AI Excel Coach <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h4>
            <span className="text-[9px] text-slate-400">Powered by Gemini 1.5 Flash</span>
          </div>
        </div>
        <button 
          onClick={clearChat}
          title="Reset Obrolan"
          className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-700 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 max-w-[85%] ${
              msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              msg.sender === "user" ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-700"
            }`}>
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            
            <div className="flex flex-col gap-1">
              <div className={`p-3 rounded-2xl shadow-xs border ${
                msg.sender === "user"
                  ? "bg-emerald-50 border-emerald-100 text-emerald-950 rounded-tr-none"
                  : "bg-white border-slate-200 text-slate-800 rounded-tl-none"
              }`}>
                {formatMessageText(msg.text)}
              </div>
              <span className={`text-[9px] text-slate-400 px-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5 max-w-[85%] mr-auto">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center animate-bounce">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-xs text-slate-500 text-xs flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-[11px] italic text-slate-400">Tutor sedang berpikir...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Terjadi kesalahan</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-3 pt-2 bg-slate-50 border-t border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Pertanyaan Populer:</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleQuickQuestion("Bagaimana cara menulis rumus IF untuk Target Pemasaran?")}
              className="text-left text-xs bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 p-2.5 rounded-xl transition-all text-slate-700 shadow-xs cursor-pointer font-semibold"
            >
              💡 Rumus IF Target Pemasaran (Plafond &le; 100jt)
            </button>
            <button
              onClick={() => handleQuickQuestion("Bagaimana cara menghitung umur menggunakan rumus DATEDIF?")}
              className="text-left text-xs bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 p-2.5 rounded-xl transition-all text-slate-700 shadow-xs cursor-pointer font-semibold"
            >
              📅 Rumus DATEDIF untuk Usia Debitur
            </button>
            <button
              onClick={() => handleQuickQuestion("Kapan saya harus pakai rumus SUBTOTAL dibanding SUM?")}
              className="text-left text-xs bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 p-2.5 rounded-xl transition-all text-slate-700 shadow-xs cursor-pointer font-semibold"
            >
              📊 Perbedaan SUM vs SUBTOTAL di Excel
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2 select-none">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanyakan rumus, cara mengurutkan, dll..."
          className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-xs"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white p-2.5 rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center justify-center shadow-md shadow-emerald-50 cursor-pointer"
          disabled={!input.trim() || loading}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
