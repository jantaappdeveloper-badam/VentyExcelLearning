import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client on the server side
  // Default to standard gemini-3.5-flash for educational assistant Q&A
  const geminiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (geminiKey) {
    ai = new GoogleGenAI({
      apiKey: geminiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI Chat assistant will be offline.");
  }

  // API routes
  app.post("/api/gemini/chat", async (req: express.Request, res: express.Response) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        return res.json({ 
          response: "Halo! Maaf, fitur Asisten AI Excel saat ini sedang offline karena kunci API belum dikonfigurasi di lingkungan aplikasi ini. Namun, Anda masih bisa menggunakan seluruh materi interaktif dan simulator spreadsheet di web ini secara offline!" 
        });
      }

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: `Anda adalah asisten AI tutor Excel yang ahli di bidang perbankan (khususnya Kredit / Pembiayaan Bank).
Tugas Anda adalah membantu pengguna mempelajari materi Excel yang sedang dipelajari berdasarkan panduan:
"Pengolahan Data Dasar Menggunakan Microsoft Excel untuk Mendukung Pemasaran Kredit".

Materi pelajaran utama:
1. Mengenal Data Nominatif Kredit (Nofas, Nama, Cabang, Produk, Plafond, Outstanding, Tenor, Tanggal Cair, Jatuh Tempo, Angsuran, Kolektibilitas).
2. Mengelola Data (Sort, Filter, Freeze Panes, Ctrl+T/Table, Hide/Unhide, Autofilter).
3. Membersihkan Data (Remove Duplicate, TRIM, Find & Replace).
4. Rumus Dasar (IF, SUM, COUNT, SUBTOTAL, TODAY, DATEDIF).
5. Analisa Sederhana (Filter plafond, umur dengan DATEDIF, mengurutkan outstanding terbesar, hitung dengan COUNTIF).

Berikan jawaban yang sangat praktis, ramah, dan solutif dalam bahasa Indonesia yang mudah dipahami oleh staf kredit/pemasaran perbankan. Jika pengguna bertanya tentang rumus, berikan contoh rumus yang tepat sesuai dengan nama kolom yang digunakan dalam nominatif kredit, seperti:
- Plafond di kolom E
- Outstanding / Baki Debet di kolom F
- Tanggal Lahir di kolom J
- Tanggal Cair di kolom H
- Rumus: =IF(E2<=100000000,"TARGET","NON TARGET")
- Rumus DATEDIF: =DATEDIF(J2,TODAY(),"Y") untuk menghitung usia debitur.

Gunakan format markdown yang rapi, buat penjelasan singkat dan mudah dicerna.`,
        },
        history: history || []
      });

      const response = await chat.sendMessage({ message });
      return res.json({ response: response.text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      return res.status(500).json({ error: error.message || "Terjadi kesalahan pada server AI." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
