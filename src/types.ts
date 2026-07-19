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
  
  // Custom columns added during challenges
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
  targetColumn?: string; // e.g. "status" or "usia" for formula insertion, or columns for sorting/filtering
  expectedValueDescription?: string; // e.g. "Rumus =SUM(F2:F7)" atau "Urutan Outstanding Terbesar"
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
