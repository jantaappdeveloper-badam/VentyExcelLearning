import React, { useState, useEffect } from "react";
import { 
  Grid, Table, ArrowUpDown, Filter, EyeOff, Snowflake, 
  Trash2, RefreshCw, CheckCircle2, Paintbrush, Play, Search, Replace, AlertCircle
} from "lucide-react";
import { DebtorRow, Challenge } from "../types";
import { INITIAL_DEBTOR_DATA } from "../data";

interface SpreadsheetSimulatorProps {
  activeChallenge: Challenge | null;
  onChallengeComplete: (challengeId: string) => void;
}

export default function SpreadsheetSimulator({ 
  activeChallenge, 
  onChallengeComplete 
}: SpreadsheetSimulatorProps) {
  // Core spreadsheet states
  const [data, setData] = useState<DebtorRow[]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>({ row: 2, col: "M" });
  const [formulaInput, setFormulaInput] = useState("");
  
  // Feature states corresponding to Excel features taught in PDF
  const [isTableFormatted, setIsTableFormatted] = useState(false);
  const [isHeaderFrozen, setIsHeaderFrozen] = useState(false);
  const [productFilter, setProductFilter] = useState<string>("ALL");
  const [sortConfig, setSortConfig] = useState<{ col: keyof DebtorRow; direction: "asc" | "desc" } | null>(null);
  const [isConditionalFormattingActive, setIsConditionalFormattingActive] = useState(false);
  
  // Find and replace states
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [replaceMessage, setReplaceMessage] = useState<string | null>(null);

  // Stats showing at the bottom of spreadsheet
  const [sumOutstanding, setSumOutstanding] = useState<number>(0);
  const [countDebtors, setCountDebtors] = useState<number>(0);
  
  // Extra interactive inputs
  const [customSumFormula, setCustomSumFormula] = useState("");
  const [customSumResult, setCustomSumResult] = useState<number | null>(null);
  const [customCountifResult, setCustomCountifResult] = useState<number | null>(null);

  // Initialize data
  useEffect(() => {
    resetSpreadsheet();
  }, []);

  const resetSpreadsheet = () => {
    // Deep clone initial data
    const clone = JSON.parse(JSON.stringify(INITIAL_DEBTOR_DATA));
    setData(clone);
    setIsTableFormatted(false);
    setIsHeaderFrozen(false);
    setProductFilter("ALL");
    setSortConfig(null);
    setIsConditionalFormattingActive(false);
    setFormulaInput("");
    setCustomSumFormula("");
    setCustomSumResult(null);
    setCustomCountifResult(null);
    setReplaceMessage(null);
  };

  // Recalculate spreadsheet-wide stats (SUM and COUNT baki debet)
  useEffect(() => {
    const visibleData = data.filter(row => productFilter === "ALL" || row.produk === productFilter);
    const sum = visibleData.reduce((acc, row) => acc + row.outstanding, 0);
    setSumOutstanding(sum);
    setCountDebtors(visibleData.length);
  }, [data, productFilter]);

  // Handle cell click
  const handleCellClick = (rowId: number, colLetter: string) => {
    setSelectedCell({ row: rowId, col: colLetter });
    
    // Auto-fill formula input if cell has an existing formula or to assist user
    const row = data.find(r => r.id === rowId);
    if (row) {
      if (colLetter === "M") {
        setFormulaInput(row.status ? `=IF(E${rowId}<=100000000,"TARGET","NON TARGET")` : "");
      } else if (colLetter === "N") {
        setFormulaInput(row.usia ? `=DATEDIF(K${rowId},TODAY(),"Y")` : "");
      } else {
        // Show raw value
        const val = getCellValue(row, colLetter);
        setFormulaInput(val !== undefined ? String(val) : "");
      }
    }
  };

  // Get cell value based on column letter
  const getCellValue = (row: DebtorRow, colLetter: string) => {
    switch (colLetter) {
      case "A": return row.cif;
      case "B": return row.nama;
      case "C": return row.cabang;
      case "D": return row.produk;
      case "E": return row.plafond;
      case "F": return row.outstanding;
      case "G": return row.tenor;
      case "H": return row.tanggalCair;
      case "I": return row.tanggalJatuhTempo;
      case "J": return row.kolektibilitas;
      case "K": return row.tanggalLahir;
      case "L": return row.instansi;
      case "M": return row.status || "";
      case "N": return row.usia || "";
      default: return "";
    }
  };

  // Formula parser & execution engine
  const handleApplyFormula = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formulaInput.startsWith("=")) {
      // Just plain text entry, not an Excel formula
      return;
    }

    const cleanFormula = formulaInput.toUpperCase().replace(/\s/g, "");
    
    // 1. Check for IF Formula: =IF(E2<=100000000,"TARGET","NON TARGET")
    // Support semicolons as well (Indonesian style)
    if (cleanFormula.startsWith("=IF(E2<=100000000") || cleanFormula.startsWith("=IF(E2<=100000000;")) {
      const updated = data.map(row => {
        const isTarget = row.plafond <= 100000000;
        return {
          ...row,
          status: isTarget ? "TARGET" : "NON TARGET"
        };
      });
      setData(updated);
      
      // Trigger challenge completion if active
      if (activeChallenge && activeChallenge.id === "chal4_1" && selectedCell?.col === "M") {
        onChallengeComplete("chal4_1");
      }
    }
    
    // 2. Check for DATEDIF Formula: =DATEDIF(K2,TODAY(),"Y") or with K column index
    // Note: Tanggal Lahir is column K in our layout
    else if (cleanFormula.includes("=DATEDIF(K2") || cleanFormula.includes("=DATEDIF(K2,TODAY(),\"Y\")") || cleanFormula.includes("DATEDIF(K2,TODAY()")) {
      const updated = data.map(row => {
        // Parse DD/MM/YYYY birth date
        const parts = row.tanggalLahir.split("/");
        if (parts.length === 3) {
          const birthYear = parseInt(parts[2]);
          // Assuming simulated current year is 2026 based on metadata
          const age = 2026 - birthYear;
          return { ...row, usia: age };
        }
        return row;
      });
      setData(updated);

      if (activeChallenge && activeChallenge.id === "chal4_2" && selectedCell?.col === "N") {
        onChallengeComplete("chal4_2");
      }
    }

    // 3. Check for COUNTIF Formula: =COUNTIF(D2:D8,"Kredit Konsumtif")
    else if (cleanFormula.startsWith("=COUNTIF(D2:D8,") || cleanFormula.startsWith("=COUNTIF(D2:D8;")) {
      let valToCount = "KREDIT KONSUMTIF";
      if (cleanFormula.includes("KREDITPRODUKTIF")) {
        valToCount = "KREDIT PRODUKTIF";
      }
      
      const count = data.filter(r => r.produk.toUpperCase() === valToCount).length;
      setCustomCountifResult(count);

      if (activeChallenge && activeChallenge.id === "chal5_1" && valToCount === "KREDIT KONSUMTIF") {
        onChallengeComplete("chal5_1");
      }
    }

    // 4. Custom SUM Formula entered in general bar
    else if (cleanFormula.startsWith("=SUM(F2:F")) {
      // Outstanding sum (column F)
      const sum = data.reduce((acc, row) => acc + row.outstanding, 0);
      setCustomSumResult(sum);
    }
  };

  // Excel Menu Actions taught in lessons:
  
  // A. Ctrl + T (Format Table)
  const applyTableFormat = () => {
    setIsTableFormatted(!isTableFormatted);
    if (activeChallenge && activeChallenge.id === "chal2_1") {
      onChallengeComplete("chal2_1");
    }
  };

  // B. Sort Column Plafond / Outstanding
  const applySort = (column: keyof DebtorRow, order: "asc" | "desc") => {
    setSortConfig({ col: column, direction: order });
    const sorted = [...data].sort((a, b) => {
      const valA = a[column] as number;
      const valB = b[column] as number;
      return order === "asc" ? valA - valB : valB - valA;
    });
    setData(sorted);

    if (activeChallenge && activeChallenge.id === "chal2_2" && column === "plafond" && order === "desc") {
      onChallengeComplete("chal2_2");
    }
  };

  // C. Filter Column
  const toggleProductFilter = () => {
    const nextFilter = productFilter === "ALL" ? "Kredit Konsumtif" : productFilter === "Kredit Konsumtif" ? "Kredit Produktif" : "ALL";
    setProductFilter(nextFilter);

    if (activeChallenge && activeChallenge.id === "chal5_2" && nextFilter === "Kredit Produktif") {
      onChallengeComplete("chal5_2");
    }
  };

  // D. Freeze Panes
  const toggleFreezeHeader = () => {
    setIsHeaderFrozen(!isHeaderFrozen);
    if (activeChallenge && activeChallenge.id === "chal2_3") {
      onChallengeComplete("chal2_3");
    }
  };

  // E. Conditional Formatting
  const toggleConditionalFormatting = () => {
    setIsConditionalFormattingActive(!isConditionalFormattingActive);
  };

  // F. Remove Duplicate
  const applyRemoveDuplicates = () => {
    // We remove duplicate Andi (CIF 10001, id 7 is duplicate of id 1)
    const unique = data.filter((row, idx, self) => 
      self.findIndex(r => r.cif === row.cif) === idx
    );
    const deletedCount = data.length - unique.length;
    setData(unique);

    if (activeChallenge && activeChallenge.id === "chal3_1") {
      onChallengeComplete("chal3_1");
    }
  };

  // G. Find & Replace
  const handleFindReplace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!findText.trim()) return;

    let matchCount = 0;
    const updated = data.map(row => {
      let rowMatch = false;
      let newCabang = row.cabang;
      
      // Perform replace in Cabang
      if (row.cabang.toLowerCase().includes(findText.toLowerCase())) {
        newCabang = row.cabang.replace(new RegExp(findText, 'gi'), replaceText);
        rowMatch = true;
        matchCount++;
      }

      return {
        ...row,
        cabang: newCabang
      };
    });

    setData(updated);
    setReplaceMessage(`Berhasil mengganti ${matchCount} kecocokan dari "${findText}" menjadi "${replaceText}".`);

    if (activeChallenge && activeChallenge.id === "chal3_2" && findText.toLowerCase() === "kantor pusat ambon" && replaceText.toUpperCase() === "KC AMBON") {
      onChallengeComplete("chal3_2");
    }
  };

  // Quick helper buttons to instantly execute challenges for beginners
  const handleQuickIF = () => {
    setFormulaInput(`=IF(E2<=100000000,"TARGET","NON TARGET")`);
    setSelectedCell({ row: 2, col: "M" });
  };

  const handleQuickDatedif = () => {
    setFormulaInput(`=DATEDIF(K2,TODAY(),"Y")`);
    setSelectedCell({ row: 2, col: "N" });
  };

  const handleQuickCountif = () => {
    setFormulaInput(`=COUNTIF(D2:D8,"Kredit Konsumtif")`);
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm" id="spreadsheet-workspace">
      
      {/* Title bar - Mac style with dots and clean layout */}
      <div className="bg-slate-800 text-slate-300 py-2.5 px-4 flex items-center justify-between text-xs font-medium border-b border-slate-700 select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Workbook_Latihan_01.xlsx</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2.5 py-0.5 rounded-full font-bold">Mode Praktik</span>
          <button 
            onClick={resetSpreadsheet}
            className="flex items-center gap-1 hover:text-white text-slate-300 transition-colors bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-600 cursor-pointer text-[11px]"
            title="Reset Spreadsheet"
          >
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      {/* Excel Ribbon Tabs */}
      <div className="bg-slate-50 border-b border-slate-200 flex items-center px-4 py-1.5 text-xs text-slate-500 font-medium select-none shadow-sm">
        <span className="px-3 py-1 font-bold text-emerald-600 border-b-2 border-b-emerald-600">Beranda (Home)</span>
        <span className="px-3 py-1 hover:text-slate-800 cursor-pointer transition-colors">Sisipkan (Insert)</span>
        <span className="px-3 py-1 hover:text-slate-800 cursor-pointer transition-colors">Formula</span>
        <span className="px-3 py-1 hover:text-slate-800 cursor-pointer transition-colors">Data</span>
        <span className="px-3 py-1 hover:text-slate-800 cursor-pointer transition-colors">Tampilan (View)</span>
      </div>

      {/* Excel Sub-ribbon with interactive feature buttons */}
      <div className="bg-white border-b border-slate-200 p-3 flex flex-wrap gap-2 items-center text-xs text-slate-700 shadow-xs select-none">
        {/* Ctrl+T table format button */}
        <button
          onClick={applyTableFormat}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all shadow-xs cursor-pointer ${
            isTableFormatted 
              ? "bg-emerald-50 border-emerald-300 text-emerald-700 ring-2 ring-emerald-100" 
              : "bg-slate-50 hover:bg-slate-100 border-slate-200"
          }`}
          title="Ubah format menjadi Excel Table terstruktur"
        >
          <Table className="w-4 h-4 text-emerald-600" />
          <span>Ctrl + T (Table)</span>
        </button>

        {/* Freeze row toggle */}
        <button
          onClick={toggleFreezeHeader}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all shadow-xs cursor-pointer ${
            isHeaderFrozen 
              ? "bg-blue-50 border-blue-300 text-blue-700 ring-2 ring-blue-100" 
              : "bg-slate-50 hover:bg-slate-100 border-slate-200"
          }`}
          title="Kunci Baris Atas (Header)"
        >
          <Snowflake className="w-4 h-4 text-blue-500" />
          <span>Freeze Top Row</span>
        </button>

        {/* Sort descending Plafond */}
        <button
          onClick={() => applySort("plafond", "desc")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold bg-slate-50 hover:bg-slate-100 border-slate-200 transition-all shadow-xs cursor-pointer ${
            sortConfig?.col === "plafond" && sortConfig?.direction === "desc" ? "bg-emerald-50 border-emerald-300 text-emerald-700" : ""
          }`}
          title="Urutkan plafon dari terbesar ke terkecil"
        >
          <ArrowUpDown className="w-4 h-4 text-emerald-600" />
          <span>Sort Plafond Terbesar</span>
        </button>

        {/* Sort descending Outstanding */}
        <button
          onClick={() => applySort("outstanding", "desc")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold bg-slate-50 hover:bg-slate-100 border-slate-200 transition-all shadow-xs cursor-pointer ${
            sortConfig?.col === "outstanding" && sortConfig?.direction === "desc" ? "bg-emerald-50 border-emerald-300 text-emerald-700" : ""
          }`}
          title="Urutkan outstanding terbesar ke terkecil"
        >
          <ArrowUpDown className="w-4 h-4 text-orange-600" />
          <span>Sort Outstanding Terbesar</span>
        </button>

        {/* Filter product categories */}
        <button
          onClick={toggleProductFilter}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all shadow-xs cursor-pointer ${
            productFilter !== "ALL" 
              ? "bg-amber-50 border-amber-300 text-amber-700 ring-2 ring-amber-100" 
              : "bg-slate-50 hover:bg-slate-100 border-slate-200"
          }`}
          title="Filter jenis produk"
        >
          <Filter className="w-4 h-4 text-amber-500" />
          <span>Filter Produk: {productFilter === "ALL" ? "Semua" : productFilter}</span>
        </button>

        {/* Conditional formatting toggle */}
        <button
          onClick={toggleConditionalFormatting}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all shadow-xs cursor-pointer ${
            isConditionalFormattingActive 
              ? "bg-purple-50 border-purple-300 text-purple-700 ring-2 ring-purple-100" 
              : "bg-slate-50 hover:bg-slate-100 border-slate-200"
          }`}
          title="Mewarnai sel otomatis berdasarkan kriteria"
        >
          <Paintbrush className="w-4 h-4 text-purple-500" />
          <span>Conditional Formatting: {isConditionalFormattingActive ? "Aktif" : "Nonaktif"}</span>
        </button>

        {/* Remove Duplicate button */}
        <button
          onClick={applyRemoveDuplicates}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold bg-slate-50 hover:bg-red-50 border-slate-200 hover:border-red-200 transition-all shadow-xs cursor-pointer text-slate-700 hover:text-red-700"
          title="Hapus baris yang memuat CIF ganda"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
          <span>Hapus Duplikat CIF</span>
        </button>
      </div>

      {/* Find & Replace Tools Panel */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-4 text-xs select-none">
        <form onSubmit={handleFindReplace} className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-500 flex items-center gap-1">
            <Search className="w-3.5 h-3.5" /> Cari & Ganti (Ctrl + H):
          </span>
          <input 
            type="text" 
            placeholder="Kata dicari..." 
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            className="px-2 py-1 bg-white border border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none w-32 shadow-xs"
          />
          <span className="text-slate-400">&rarr;</span>
          <input 
            type="text" 
            placeholder="Ganti dengan..." 
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            className="px-2 py-1 bg-white border border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none w-32 shadow-xs"
          />
          <button 
            type="submit" 
            className="bg-slate-800 text-white hover:bg-slate-700 px-3 py-1 rounded-lg cursor-pointer transition-colors font-semibold shadow-xs"
          >
            Ganti Semua
          </button>
        </form>

        {replaceMessage && (
          <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-1 border border-emerald-200 rounded-lg animate-fade-in text-[11px]">
            {replaceMessage}
          </span>
        )}
      </div>

      {/* Excel Formula Bar Section */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 px-4 flex items-center gap-2.5 select-none">
        {/* Name Box (Current Cell Indicator) */}
        <div className="bg-white border border-slate-200 px-3 py-1 font-mono text-xs text-slate-700 min-w-[50px] text-center rounded-lg shadow-xs select-none">
          {selectedCell ? `${selectedCell.col}${selectedCell.row}` : "A1"}
        </div>
        
        {/* fx symbol */}
        <span className="font-serif italic font-bold text-slate-400 text-sm px-1">fx</span>
        
        {/* Real Input box for Excel formulas */}
        <form onSubmit={handleApplyFormula} className="flex-1 flex gap-1.5">
          <input
            type="text"
            value={formulaInput}
            onChange={(e) => setFormulaInput(e.target.value)}
            placeholder="Tulis rumus di sini (Contoh: =IF(E2<=100000000,&quot;TARGET&quot;,&quot;NON TARGET&quot;)) atau klik cell di kolom M / N"
            className="flex-1 bg-white border border-slate-200 px-3 py-1.5 font-mono text-xs text-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 shadow-xs"
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <Play className="w-3 h-3 fill-white" /> Terapkan
          </button>
        </form>
      </div>

      {/* Interactive Helper Alerts on Challenge Context */}
      {activeChallenge && (
        <div className="bg-emerald-50 border-b border-emerald-200 p-2 px-4 flex items-center justify-between text-xs text-emerald-950">
          <div className="flex items-center gap-2">
            <span className="bg-excel-green text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse">Tantangan Aktif</span>
            <p className="font-semibold text-emerald-900">{activeChallenge.title}:</p>
            <p className="text-slate-600 font-normal italic">{activeChallenge.description}</p>
          </div>
          
          <div className="flex gap-2">
            {/* Quick helper buttons to instantly execute challenges for beginners */}
            {activeChallenge.id === "chal4_1" && (
              <button 
                onClick={handleQuickIF}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[10px] px-2 py-0.5 rounded shadow-sm"
              >
                Auto-Tulis Rumus IF 💡
              </button>
            )}
            {activeChallenge.id === "chal4_2" && (
              <button 
                onClick={handleQuickDatedif}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[10px] px-2 py-0.5 rounded shadow-sm"
              >
                Auto-Tulis Rumus DATEDIF 📅
              </button>
            )}
            {activeChallenge.id === "chal5_1" && (
              <button 
                onClick={handleQuickCountif}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[10px] px-2 py-0.5 rounded shadow-sm"
              >
                Auto-Tulis COUNTIF 📊
              </button>
            )}
            <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-medium">
              Target: {activeChallenge.expectedValueDescription || "Aksi interaktif"}
            </div>
          </div>
        </div>
      )}

      {/* Spreadsheet Workspace Table */}
      <div className="flex-1 overflow-auto custom-scrollbar bg-white">
        <table className="w-full text-left border-collapse border-spacing-0 text-xs font-sans relative">
          
          {/* Header Row */}
          <thead className={isHeaderFrozen ? "sticky top-0 z-25 bg-slate-100 shadow-sm" : "bg-slate-100"}>
            {/* Grid Coordinates (A, B, C...) */}
            <tr className="bg-slate-200 text-slate-500 font-mono text-[10px] text-center border-b border-slate-300 select-none">
              <th className="w-8 py-1 border-r border-slate-300 bg-slate-300 font-sans text-center">#</th>
              <th className="w-20 border-r border-slate-300">A (CIF)</th>
              <th className="w-36 border-r border-slate-300">B (Nama)</th>
              <th className="w-40 border-r border-slate-300">C (Cabang)</th>
              <th className="w-36 border-r border-slate-300">D (Produk)</th>
              <th className="w-32 border-r border-slate-300">E (Plafond)</th>
              <th className="w-32 border-r border-slate-300">F (Outstanding)</th>
              <th className="w-20 border-r border-slate-300">G (Tenor)</th>
              <th className="w-28 border-r border-slate-300">H (Cair)</th>
              <th className="w-28 border-r border-slate-300">I (Jatuh Tempo)</th>
              <th className="w-28 border-r border-slate-300">J (Kolektibilitas)</th>
              <th className="w-28 border-r border-slate-300">K (Tgl Lahir)</th>
              <th className="w-36 border-r border-slate-300">L (Instansi)</th>
              <th className="w-36 border-r border-slate-300 bg-emerald-50 text-emerald-800 font-bold">M (Status)</th>
              <th className="w-24 border-r border-slate-300 bg-emerald-50 text-emerald-800 font-bold">N (Usia)</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200">
            {data
              .filter(row => productFilter === "ALL" || row.produk === productFilter)
              .map((row, index) => {
                const rowNum = index + 2; // Excel coordinates start at Row 2 since Row 1 is header
                const isSelectedRow = selectedCell?.row === rowNum;
                
                // Plafond conditionally highlighted green if Plafond <= 100M
                const isPlafondHighlighted = isConditionalFormattingActive && row.plafond <= 100000000;
                
                // Outstanding highlighted red if outstanding > 150M
                const isOutstandingHighlighted = isConditionalFormattingActive && row.outstanding > 150000000;

                // Alternate row color for Table mode
                const rowBgClass = isTableFormatted 
                  ? index % 2 === 0 ? "bg-white" : "bg-emerald-50/40"
                  : "bg-white";

                return (
                  <tr 
                    key={`${row.id}-${index}`} 
                    className={`${rowBgClass} hover:bg-slate-50 transition-colors border-b border-slate-200`}
                  >
                    {/* Row Indicator */}
                    <td className="bg-slate-200 text-slate-500 font-mono text-[10px] text-center font-bold py-1.5 border-r border-slate-300 select-none">
                      {rowNum}
                    </td>

                    {/* A. CIF */}
                    <td 
                      onClick={() => handleCellClick(rowNum, "A")}
                      className={`px-2 py-1.5 font-mono border-r border-slate-200 text-slate-600 cursor-pointer ${
                        selectedCell?.row === rowNum && selectedCell?.col === "A" ? "bg-emerald-50 ring-2 ring-excel-green" : ""
                      }`}
                    >
                      {row.cif}
                    </td>

                    {/* B. Nama */}
                    <td 
                      onClick={() => handleCellClick(rowNum, "B")}
                      className={`px-2 py-1.5 font-medium border-r border-slate-200 cursor-pointer ${
                        selectedCell?.row === rowNum && selectedCell?.col === "B" ? "bg-emerald-50 ring-2 ring-excel-green" : ""
                      }`}
                    >
                      {row.nama}
                    </td>

                    {/* C. Cabang */}
                    <td 
                      onClick={() => handleCellClick(rowNum, "C")}
                      className={`px-2 py-1.5 border-r border-slate-200 cursor-pointer ${
                        selectedCell?.row === rowNum && selectedCell?.col === "C" ? "bg-emerald-50 ring-2 ring-excel-green" : ""
                      } ${row.cabang.includes("Kantor Pusat") ? "text-amber-600 bg-amber-50" : "text-slate-800"}`}
                    >
                      {row.cabang}
                    </td>

                    {/* D. Produk */}
                    <td 
                      onClick={() => handleCellClick(rowNum, "D")}
                      className={`px-2 py-1.5 border-r border-slate-200 cursor-pointer text-[11px] ${
                        selectedCell?.row === rowNum && selectedCell?.col === "D" ? "bg-emerald-50 ring-2 ring-excel-green" : ""
                      } ${row.produk === "Kredit Produktif" ? "text-blue-700" : "text-slate-700"}`}
                    >
                      {row.produk}
                    </td>

                    {/* E. Plafond */}
                    <td 
                      onClick={() => handleCellClick(rowNum, "E")}
                      className={`px-2 py-1.5 font-mono text-right border-r border-slate-200 cursor-pointer ${
                        selectedCell?.row === rowNum && selectedCell?.col === "E" ? "bg-emerald-50 ring-2 ring-excel-green" : ""
                      } ${isPlafondHighlighted ? "bg-green-100 text-green-900 font-semibold" : "text-slate-800"}`}
                    >
                      Rp {row.plafond.toLocaleString("id-ID")}
                    </td>

                    {/* F. Outstanding */}
                    <td 
                      onClick={() => handleCellClick(rowNum, "F")}
                      className={`px-2 py-1.5 font-mono text-right border-r border-slate-200 cursor-pointer ${
                        selectedCell?.row === rowNum && selectedCell?.col === "F" ? "bg-emerald-50 ring-2 ring-excel-green" : ""
                      } ${isOutstandingHighlighted ? "bg-red-100 text-red-900 font-semibold animate-pulse" : "text-slate-800"}`}
                    >
                      Rp {row.outstanding.toLocaleString("id-ID")}
                    </td>

                    {/* G. Tenor */}
                    <td 
                      onClick={() => handleCellClick(rowNum, "G")}
                      className={`px-2 py-1.5 font-mono text-center border-r border-slate-200 cursor-pointer ${
                        selectedCell?.row === rowNum && selectedCell?.col === "G" ? "bg-emerald-50 ring-2 ring-excel-green" : ""
                      }`}
                    >
                      {row.tenor} Bln
                    </td>

                    {/* H. Cair */}
                    <td 
                      onClick={() => handleCellClick(rowNum, "H")}
                      className={`px-2 py-1.5 font-mono text-center border-r border-slate-200 cursor-pointer ${
                        selectedCell?.row === rowNum && selectedCell?.col === "H" ? "bg-emerald-50 ring-2 ring-excel-green" : ""
                      }`}
                    >
                      {row.tanggalCair}
                    </td>

                    {/* I. Jatuh Tempo */}
                    <td 
                      onClick={() => handleCellClick(rowNum, "I")}
                      className={`px-2 py-1.5 font-mono text-center border-r border-slate-200 cursor-pointer ${
                        selectedCell?.row === rowNum && selectedCell?.col === "I" ? "bg-emerald-50 ring-2 ring-excel-green" : ""
                      }`}
                    >
                      {row.tanggalJatuhTempo}
                    </td>

                    {/* J. Kolektibilitas */}
                    <td 
                      onClick={() => handleCellClick(rowNum, "J")}
                      className={`px-2 py-1.5 border-r border-slate-200 text-center font-medium cursor-pointer ${
                        selectedCell?.row === rowNum && selectedCell?.col === "J" ? "bg-emerald-50 ring-2 ring-excel-green" : ""
                      } ${
                        row.kolektibilitas === "Lancar" 
                          ? "text-green-700 bg-green-50" 
                          : "text-red-700 bg-red-50"
                      }`}
                    >
                      {row.kolektibilitas}
                    </td>

                    {/* K. Tgl Lahir */}
                    <td 
                      onClick={() => handleCellClick(rowNum, "K")}
                      className={`px-2 py-1.5 font-mono text-center border-r border-slate-200 cursor-pointer ${
                        selectedCell?.row === rowNum && selectedCell?.col === "K" ? "bg-emerald-50 ring-2 ring-excel-green" : ""
                      }`}
                    >
                      {row.tanggalLahir}
                    </td>

                    {/* L. Instansi */}
                    <td 
                      onClick={() => handleCellClick(rowNum, "L")}
                      className={`px-2 py-1.5 border-r border-slate-200 cursor-pointer ${
                        selectedCell?.row === rowNum && selectedCell?.col === "L" ? "bg-emerald-50 ring-2 ring-excel-green" : ""
                      }`}
                    >
                      {row.instansi}
                    </td>

                    {/* M. Status (IF TARGET/NON TARGET) */}
                    <td 
                      onClick={() => handleCellClick(rowNum, "M")}
                      className={`px-2 py-1.5 font-bold border-r border-slate-200 bg-emerald-50/30 text-center cursor-pointer ${
                        selectedCell?.row === rowNum && selectedCell?.col === "M" ? "bg-emerald-100 ring-2 ring-excel-green" : ""
                      } ${
                        row.status === "TARGET" 
                          ? "text-emerald-700" 
                          : row.status === "NON TARGET" 
                            ? "text-slate-400 font-normal" 
                            : "text-slate-300 italic font-normal"
                      }`}
                    >
                      {row.status || "[Kosong]"}
                    </td>

                    {/* N. Usia */}
                    <td 
                      onClick={() => handleCellClick(rowNum, "N")}
                      className={`px-2 py-1.5 font-mono font-bold text-center border-r border-slate-200 bg-emerald-50/30 cursor-pointer ${
                        selectedCell?.row === rowNum && selectedCell?.col === "N" ? "bg-emerald-100 ring-2 ring-excel-green" : ""
                      } ${
                        row.usia 
                          ? "text-emerald-800" 
                          : "text-slate-300 italic font-normal"
                      }`}
                    >
                      {row.usia ? `${row.usia} Thn` : "[Kosong]"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Spreadsheet Formula Playground Sidebar/Section for custom formulas */}
      <div className="bg-white border-t border-slate-200 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs select-none">
        {/* SUM Simulator */}
        <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-200 flex flex-col gap-2 shadow-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1">📊 Hitung Total Baki Debet (SUM)</span>
          <p className="text-slate-500 text-[11px]">Masukkan rumus <code>=SUM(F2:F8)</code> untuk menjumlahkan kolom Outstanding:</p>
          <div className="flex gap-1.5">
            <input 
              type="text" 
              placeholder="=SUM(F2:F8)"
              value={customSumFormula}
              onChange={(e) => setCustomSumFormula(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500 shadow-xs"
            />
            <button 
              onClick={() => {
                if (customSumFormula.toUpperCase().replace(/\s/g, "") === "=SUM(F2:F8)") {
                  const sum = data.reduce((acc, r) => acc + r.outstanding, 0);
                  setCustomSumResult(sum);
                } else {
                  alert("Ketik rumus dengan tepat: =SUM(F2:F8)");
                }
              }}
              className="bg-slate-800 text-white hover:bg-slate-700 px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer shadow-xs transition-colors"
            >
              Hitung
            </button>
          </div>
          {customSumResult !== null && (
            <div className="mt-1.5 font-mono text-emerald-800 font-bold bg-emerald-50/70 p-2 border border-emerald-150 rounded-lg text-xs">
              Hasil: Rp {customSumResult.toLocaleString("id-ID")}
            </div>
          )}
        </div>

        {/* COUNTIF Simulator */}
        <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-200 flex flex-col gap-2 shadow-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1">📊 Hitung COUNTIF (Jumlah Konsumtif)</span>
          <p className="text-slate-500 text-[11px]">Ketik rumus <code>=COUNTIF(D2:D8,"Kredit Konsumtif")</code>:</p>
          <div className="flex gap-1.5">
            <input 
              type="text" 
              placeholder="=COUNTIF(D2:D8,&quot;Kredit Konsumtif&quot;)"
              className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500 shadow-xs"
              onChange={(e) => {
                const clean = e.target.value.toUpperCase().replace(/\s/g, "");
                if (clean === '=COUNTIF(D2:D8,"KREDITKONSUMTIF")' || clean === '=COUNTIF(D2:D8;\"KREDITKONSUMTIF\")') {
                  const count = data.filter(r => r.produk === "Kredit Konsumtif").length;
                  setCustomCountifResult(count);
                  if (activeChallenge && activeChallenge.id === "chal5_1") {
                    onChallengeComplete("chal5_1");
                  }
                }
              }}
            />
          </div>
          {customCountifResult !== null && (
            <div className="mt-1.5 font-mono text-emerald-800 font-bold bg-emerald-50/70 p-2 border border-emerald-150 rounded-lg text-xs">
              Hasil COUNTIF: {customCountifResult} Debitur
            </div>
          )}
        </div>

        {/* Dynamic bottom status bar summary */}
        <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-200 flex flex-col justify-center shadow-xs">
          <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider mb-2">Status Bar Terpilih</span>
          <div className="grid grid-cols-2 gap-2 text-slate-700">
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-400 block font-semibold">COUNT (Nasabah)</span>
              <span className="font-mono font-bold text-sm text-emerald-800">{countDebtors}</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-400 block font-semibold">SUM (Total Outstanding)</span>
              <span className="font-mono font-bold text-xs text-emerald-800" style={{ fontSize: '11px' }}>
                Rp {sumOutstanding.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom info strip */}
      <div className="bg-[#107c41] text-emerald-50/95 px-5 py-2 text-[11px] flex items-center justify-between select-none rounded-b-2xl">
        <div className="flex items-center gap-4">
          <span className="font-bold uppercase tracking-wider text-[9px] bg-emerald-800 px-1.5 py-0.5 rounded">Ready</span>
          <span>|</span>
          <span className="flex items-center gap-1 font-mono">
            SUM outstanding: Rp {sumOutstanding.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex items-center gap-2 font-medium">
          <span>Indikator Pembelajaran: 100% Offline Compatible</span>
        </div>
      </div>
    </div>
  );
}
