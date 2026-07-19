import React, { useState, useEffect } from "react";
import { 
  Table, RefreshCw, Grid, ArrowUpDown, Filter, Search, CheckSquare, 
  HelpCircle, CheckCircle2, ChevronRight, Play, Eye, FileSpreadsheet, Lock, Unlock, HelpCircle as HelpIcon, Sparkles
} from "lucide-react";
import { SimulatorWindow, SheetConfig, Challenge, SpreadsheetRow } from "../types";
import { INITIAL_WINDOWS_DATA, formatIDR, TUTORIAL_CHALLENGES } from "../data";

interface SpreadsheetSimulatorProps {
  activeWindowId: string;
  activeSheetId: string;
  setActiveSheetId: (id: string) => void;
  activeChallenge: Challenge | null;
  onChallengeComplete: (id: string) => void;
}

export function SpreadsheetSimulator({
  activeWindowId,
  activeSheetId,
  setActiveSheetId,
  activeChallenge,
  onChallengeComplete
}: SpreadsheetSimulatorProps) {
  // Get active window configuration
  const windowConfig = INITIAL_WINDOWS_DATA.find(w => w.id === activeWindowId) || INITIAL_WINDOWS_DATA[0];
  const activeSheet = windowConfig.sheets.find(s => s.id === activeSheetId) || windowConfig.sheets[0];

  // Spreadsheet states
  const [data, setData] = useState<SpreadsheetRow[]>([]);
  const [practiceMode, setPracticeMode] = useState<boolean>(true); // Default to practice mode so they can type formulas!
  const [selectedCell, setSelectedCell] = useState<{ rIdx: number; cIdx: number; key: string } | null>(null);
  const [formulaBarInput, setFormulaBarInput] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "info" | "error" } | null>(null);
  
  // Grid/UI Preferences
  const [isHeaderFrozen, setIsHeaderFrozen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterBranch, setFilterBranch] = useState<string>("ALL");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  // Load sheet data on change
  useEffect(() => {
    setData(JSON.parse(JSON.stringify(activeSheet.initialData)));
    setSelectedCell(null);
    setFormulaBarInput("");
    setStatusMessage(null);
    setSortConfig(null);
    setSearchQuery("");
    setFilterBranch("ALL");
  }, [activeWindowId, activeSheetId]);



  // Formula Evaluator Helper (High-fidelity simulator logic)
  const evaluateCellFormula = (formula: string, row: SpreadsheetRow, rowIndex: number): string | number => {
    // Normalize formula
    let normalized = formula.trim().toUpperCase();
    
    // Convert curly/typographic quotes to plain ones
    normalized = normalized.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
    
    // Convert semicolon to comma (the Indonesian local Excel convention separator!)
    normalized = normalized.replace(/;/g, ",");
    
    // Remove all spaces for reliable keyword checking
    const val = normalized.replace(/\s+/g, "");
    
    // Row indicator (1-based sheet row for formula reference, headers are Row 1, data starts at Row 2)
    const r = rowIndex + 2;

    // 1) Ratio % Potongan: H/I (Angsuran / Pendapatan)
    const isRatio = val === `=H${r}/I${r}` || val === `=H2/I2` || val === "=H/I" || 
                    /^[=]?H\d*\/I\d*$/.test(val);
    if (isRatio) {
      const angsuran = Number(row["Angsuran"]) || 0;
      const pendapatan = Number(row["Pendapatan"] || row["Total Pendapatan"]) || 1;
      return angsuran / pendapatan;
    }

    // 2) Status Potongan: IF(% Potongan > 90%, "TIDAK LAYAK", "NORMAL")
    const isStatusPotongan = val.includes("IF") && 
                             (val.includes("J" + r) || val.includes("J2") || val.includes("%POTONGAN")) &&
                             (val.includes("0.9") || val.includes("90%")) &&
                             val.includes("TIDAKLAYAK") &&
                             val.includes("NORMAL");
    if (isStatusPotongan) {
      const angsuran = Number(row["Angsuran"]) || 0;
      const pendapatan = Number(row["Pendapatan"] || row["Total Pendapatan"]) || 1;
      const dsr = angsuran / pendapatan;
      return dsr > 0.9 ? "TIDAK LAYAK" : "NORMAL";
    }

    // 3) SKALA PRIORITAS: IF(AND(Plafond <= 100M, Kol == 1), IF(Sisa Tenor <= 24, "PRIORITAS 1", "PRIORITAS 2"), "CEK MANUAL")
    const isSkalaPrioritas = val.includes("IF") && val.includes("AND") &&
                             (val.includes("F" + r) || val.includes("F2") || val.includes("PLAFOND")) &&
                             (val.includes("100000000") || val.includes("100M") || val.includes("100.000.000")) &&
                             (val.includes("M" + r) || val.includes("M2") || val.includes("KOL")) &&
                             (val.includes("L" + r) || val.includes("L2") || val.includes("TENOR") || val.includes("SISA")) &&
                             val.includes("PRIORITAS1") &&
                             val.includes("PRIORITAS2") &&
                             val.includes("CEKMANUAL");
    if (isSkalaPrioritas) {
      const plafond = Number(row["Plafond"]) || 0;
      const kol = Number(row["Kol"] || row["Kolektibilitas"]) || 1;
      const sisaTenor = Number(row["Sisa Tenor"] || row["Sisa Jangka Waktu"]) || 0;
      
      if (plafond <= 100000000 && kol === 1) {
        return sisaTenor <= 24 ? "PRIORITAS 1" : "PRIORITAS 2";
      }
      return "CEK MANUAL";
    }

    // 4) Umur: DATEDIF(Tgl Lahir, TODAY(), "Y") -> Tgl Lahir is column F (6th column)
    const isUmur = val.includes("DATEDIF") && 
                   (val.includes("F" + r) || val.includes("F2") || val.includes("LAHIR") || val.includes("F")) &&
                   val.includes("TODAY") &&
                   (val.includes('"Y"') || val.includes("'Y'") || val.includes(",Y,") || val.includes("Y"));
    if (isUmur) {
      const tglLahir = String(row["Tgl Lahir"] || row["Tanggal Lahir"]);
      const parts = tglLahir.split("/");
      if (parts.length === 3) {
        const birthYear = Number(parts[2]);
        return 2026 - birthYear; // Reference context year is 2026
      }
      return 50;
    }

    // 5) Tgl BUP: DATE(YEAR(Tgl Lahir) + BUP, MONTH, DAY)
    const isTglBup = val.includes("DATE") && val.includes("YEAR") && val.includes("MONTH") && val.includes("DAY") &&
                     (val.includes("F" + r) || val.includes("F2") || val.includes("LAHIR")) &&
                     (val.includes("H" + r) || val.includes("H2") || val.includes("BUP"));
    if (isTglBup) {
      const tglLahir = String(row["Tgl Lahir"] || row["Tanggal Lahir"]);
      const bup = Number(row["BUP"]) || 58;
      const parts = tglLahir.split("/");
      if (parts.length === 3) {
        const day = parts[0];
        const month = parts[1];
        const year = Number(parts[2]) + bup;
        return `${day}/${month}/${year}`;
      }
      return "07/12/2033";
    }

    // 6) Sisa Masa Dinas: DATEDIF(TODAY(), Tgl BUP, "Y") -> Tgl BUP is column I
    const isSisaMasaDinas = val.includes("DATEDIF") && val.includes("TODAY") &&
                            (val.includes("I" + r) || val.includes("I2") || val.includes("BUP")) &&
                            (val.includes('"Y"') || val.includes("'Y'") || val.includes("Y"));
    if (isSisaMasaDinas) {
      const tglLahir = String(row["Tgl Lahir"] || row["Tanggal Lahir"]);
      const bup = Number(row["BUP"]) || 58;
      const parts = tglLahir.split("/");
      if (parts.length === 3) {
        const bupYear = Number(parts[2]) + bup;
        return Math.max(0, bupYear - 2026); // Today is 2026
      }
      return 7;
    }

    // 7) Propek Untuk Kredit: IF(Sisa Masa Dinas <= 5, "Skema 2", IF(Sisa Masa Dinas <= 8, "Skema 1", "Belum"))
    const isProspekKreditType = val.includes("IF") &&
                                (val.includes("J" + r) || val.includes("J2") || val.includes("DINAS") || val.includes("SISA")) &&
                                val.includes("SKEMA2") && val.includes("SKEMA1");
    if (isProspekKreditType) {
      const tglLahir = String(row["Tgl Lahir"] || row["Tanggal Lahir"]);
      const bup = Number(row["BUP"]) || 58;
      const parts = tglLahir.split("/");
      let sisa = 7;
      if (parts.length === 3) {
        sisa = (Number(parts[2]) + bup) - 2026;
      }
      if (sisa <= 5) return "Pegawai Plus Skema 2";
      if (sisa <= 8) return "Pegawai Plus Skema 1";
      return "Belum Pegawai Plus";
    }

    // 8) cek 1: IF(Umur >= BUP, "Pensiun", "Belum Pensiun")
    const isCek1 = val.includes("IF") &&
                   (val.includes("G" + r) || val.includes("G2") || val.includes("UMUR")) &&
                   (val.includes("H" + r) || val.includes("H2") || val.includes("BUP")) &&
                   val.includes("PENSIUN");
    if (isCek1) {
      const tglLahir = String(row["Tgl Lahir"] || row["Tanggal Lahir"]);
      const parts = tglLahir.split("/");
      let umur = 50;
      if (parts.length === 3) {
        umur = 2026 - Number(parts[2]);
      }
      const bup = Number(row["BUP"]) || 58;
      return umur >= bup ? "Pensiun" : "Belum Pensiun";
    }

    // 9) Prospek: IF(Bakidebet Juni <= 100,000,000, "BISA", "TIDAK BISA")
    const isProspekKelayakan = val.includes("IF") &&
                               (val.includes("M" + r) || val.includes("M2") || val.includes("BAKIDEBET") || val.includes("DEBET")) &&
                               (val.includes("100000000") || val.includes("100M") || val.includes("100.000.000")) &&
                               val.includes("BISA") && val.includes("TIDAKBISA");
    if (isProspekKelayakan) {
      const bakiDebet = Number(row["Bakidebet Juni"] || row["Baki Debet"]) || 0;
      return bakiDebet <= 100000000 ? "BISA" : "TIDAK BISA";
    }

    return "#VALUE!";
  };

  // Check cell display value depending on practiceMode vs solutionMode
  const getCellDisplayValue = (row: SpreadsheetRow, colConfig: any, rIdx: number): string | number => {
    if (colConfig.type === "formula") {
      // If we are in practice mode and the user hasn't typed a custom formula for this column, keep it blank!
      const userFormula = row[`_user_formula_${colConfig.key}`] as string;
      
      if (practiceMode && !userFormula) {
        return " "; // Blank for training, forcing them to write the formula!
      }

      // Otherwise evaluate the formula (either the typed user formula or the template default solution formula)
      const formulaToEval = userFormula || colConfig.formula || "";
      const result = evaluateCellFormula(formulaToEval, row, rIdx);

      if (colConfig.key === "% Potongan" && typeof result === "number") {
        return `${(result * 100).toFixed(2).replace(".", ",")}%`;
      }
      if ((colConfig.key === "Plafond" || colConfig.key === "Baki Debet" || colConfig.key === "Bakidebet Juni") && typeof result === "number") {
        return formatIDR(result);
      }
      return result;
    }

    // Standard column formatting
    const rawVal = row[colConfig.key];
    if (colConfig.type === "number" && typeof rawVal === "number") {
      if (colConfig.key.toLowerCase().includes("plafond") || colConfig.key.toLowerCase().includes("debet") || colConfig.key.toLowerCase().includes("angsuran") || colConfig.key.toLowerCase().includes("pendapatan")) {
        return formatIDR(rawVal);
      }
      return rawVal;
    }
    return String(rawVal ?? "");
  };

  // Convert Column Index (0, 1, 2...) to Excel Column Letter (A, B, C...)
  const getExcelColumnLetter = (colIdx: number): string => {
    return String.fromCharCode(65 + colIdx);
  };

  // Cell Click Action
  const handleCellClick = (rIdx: number, cIdx: number, colKey: string) => {
    const colConfig = activeSheet.columns[cIdx];
    const row = data[rIdx];
    const excelCol = getExcelColumnLetter(cIdx);
    const excelRow = rIdx + 2; // Row 1 is headers

    setSelectedCell({ rIdx, cIdx, key: `${excelCol}${excelRow}` });

    if (colConfig.type === "formula") {
      // Show user formula if already written, or suggest equal sign to write one!
      const writtenFormula = row[`_user_formula_${colKey}`] as string;
      setFormulaBarInput(writtenFormula || "=");
    } else {
      // Normal values show their content directly
      setFormulaBarInput(String(row[colKey] ?? ""));
    }
  };

  // Formula Apply Action
  const handleApplyFormula = () => {
    if (!selectedCell) return;
    const { rIdx, cIdx } = selectedCell;
    const colConfig = activeSheet.columns[cIdx];
    
    if (colConfig.type !== "formula") {
      // Normal column manual value change
      const updatedData = [...data];
      const parsedVal = isNaN(Number(formulaBarInput)) ? formulaBarInput : Number(formulaBarInput);
      updatedData[rIdx][colConfig.key] = parsedVal;
      setData(updatedData);
      setStatusMessage({ text: `Mengubah nilai sel ${selectedCell.key} menjadi "${formulaBarInput}"`, type: "info" });
      return;
    }

    const userInput = formulaBarInput.trim();
    if (!userInput.startsWith("=")) {
      setStatusMessage({ text: "Penulisan rumus Excel harus diawali dengan '=' (misal: =H2/I2)", type: "error" });
      return;
    }

    // Helper to normalize formulas for clean validation
    const normalizeForComparison = (str: string) => {
      return str
        .toUpperCase()
        .replace(/\s+/g, "")
        .replace(/;/g, ",")
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, "'");
    };

    const inputUpper = normalizeForComparison(userInput);
    
    // Check if there's an active challenge matching this column
    const matchingChallenge = TUTORIAL_CHALLENGES.find(
      c => c.windowId === activeWindowId && c.sheetId === activeSheetId && c.targetColumn === colConfig.key
    );

    let isCorrect = false;
    if (matchingChallenge) {
      isCorrect = matchingChallenge.expectedFormula.some(expected => {
        const expectedUpper = normalizeForComparison(expected);
        return inputUpper === expectedUpper || inputUpper.startsWith(expectedUpper.substring(0, 10)); // forgiving prefix matching
      });
    } else {
      // Generic check if it matches default formula template
      const defaultUpper = normalizeForComparison(colConfig.formula || "");
      isCorrect = inputUpper === defaultUpper || inputUpper.substring(0, 8) === defaultUpper.substring(0, 8);
    }

    if (isCorrect) {
      // Propagate formula to all rows in this column
      const updatedData = data.map((row) => {
        // Adapt formula for individual row indices
        return {
          ...row,
          [`_user_formula_${colConfig.key}`]: userInput
        };
      });

      setData(updatedData);
      setStatusMessage({ 
        text: `Sukses! Rumus "${userInput}" diterapkan pada seluruh kolom ${colConfig.label}!`, 
        type: "success" 
      });

      // Notify parent to complete challenge
      if (matchingChallenge) {
        onChallengeComplete(matchingChallenge.id);
      }
    } else {
      setStatusMessage({ 
        text: `Salah Rumus! Silakan tinjau panduan Modul atau tanya AI Coach. Petunjuk: gunakan nama sel baris 2 (misal: H2, I2, F2, dst.)`, 
        type: "error" 
      });
    }
  };

  // Fill solutions for current sheet instantly (Helpful for quick viewing)
  const handleShowAllSolutions = () => {
    const updatedData = data.map((row) => {
      const rowUpdates: any = {};
      activeSheet.columns.forEach(col => {
        if (col.type === "formula") {
          rowUpdates[`_user_formula_${col.key}`] = col.formula;
        }
      });
      return { ...row, ...rowUpdates };
    });
    setData(updatedData);
    setPracticeMode(false);
    setStatusMessage({ text: "Seluruh solusi rumus diterapkan pada spreadsheet ini!", type: "success" });
    
    // Autocomplete challenges for this sheet
    TUTORIAL_CHALLENGES.forEach(c => {
      if (c.windowId === activeWindowId && c.sheetId === activeSheetId) {
        onChallengeComplete(c.id);
      }
    });
  };

  // Switch back to Practice Mode and clear solutions/user formulas
  const handleSwitchToPractice = () => {
    const cleanedData = data.map((row) => {
      const cleanedRow = { ...row };
      activeSheet.columns.forEach(col => {
        if (col.type === "formula") {
          delete cleanedRow[`_user_formula_${col.key}`];
        }
      });
      return cleanedRow;
    });
    setData(cleanedData);
    setPracticeMode(true);
    setSelectedCell(null);
    setFormulaBarInput("");
    setStatusMessage({ text: "Masuk ke Mode Latihan. Kolom rumus telah dikosongkan agar Anda dapat berlatih menulis rumus sendiri!", type: "info" });
  };

  // Reset current sheet
  const handleResetSheet = () => {
    setData(JSON.parse(JSON.stringify(activeSheet.initialData)));
    setSelectedCell(null);
    setFormulaBarInput("");
    setStatusMessage({ text: "Tabel dikembalikan ke kondisi awal.", type: "info" });
  };

  // Filtering & Sorting Logic
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (typeof valA === "number" && typeof valB === "number") {
        return direction === "asc" ? valA - valB : valB - valA;
      }
      return direction === "asc" 
        ? String(valA).localeCompare(String(valB)) 
        : String(valB).localeCompare(String(valA));
    });
    setData(sortedData);
  };

  // List unique branches for filtering
  const branches = ["ALL", ...Array.from(new Set(activeSheet.initialData.map(r => String(r.CABANG || r.Cabang || "")) || []))];

  // Apply filters
  const filteredRows = data.filter((row, idx) => {
    // Search filter
    const rowString = Object.values(row).join(" ").toLowerCase();
    const matchesSearch = rowString.includes(searchQuery.toLowerCase());

    // Branch filter
    const branchVal = String(row.CABANG || row.Cabang || "").toUpperCase();
    const matchesBranch = filterBranch === "ALL" || branchVal === filterBranch.toUpperCase();

    return matchesSearch && matchesBranch;
  });

  // Listen for arrow keys to navigate the grid ("krusor ke kiri dan ke kanan")
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;
      
      // If user is focused on the formula bar input, don't hijack arrow keys!
      if (document.activeElement?.tagName === "INPUT") {
        return;
      }

      const { rIdx, cIdx } = selectedCell;
      let nextRIdx = rIdx;
      let nextCIdx = cIdx;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextCIdx = Math.min(activeSheet.columns.length - 1, cIdx + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        nextCIdx = Math.max(0, cIdx - 1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        nextRIdx = Math.min(filteredRows.length - 1, rIdx + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        nextRIdx = Math.max(0, rIdx - 1);
      } else {
        return;
      }

      const nextCol = activeSheet.columns[nextCIdx];
      const excelCol = getExcelColumnLetter(nextCIdx);
      const excelRow = nextRIdx + 2;

      setSelectedCell({ rIdx: nextRIdx, cIdx: nextCIdx, key: `${excelCol}${excelRow}` });
      
      // Update formula bar input
      const nextRow = filteredRows[nextRIdx];
      if (nextCol.type === "formula") {
        const writtenFormula = nextRow[`_user_formula_${nextCol.key}`] as string;
        setFormulaBarInput(writtenFormula || "=");
      } else {
        setFormulaBarInput(String(nextRow[nextCol.key] ?? ""));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCell, filteredRows, activeSheet]);

  return (
    <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm" id="spreadsheet-simulator">
      {/* Tab Selector / Spreadsheet Window Header */}
      <div className="bg-[#107c41] text-white p-3.5 flex flex-wrap items-center justify-between select-none shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-emerald-200" />
          <h4 className="font-display font-bold text-xs tracking-wide">
            {windowConfig.title}
          </h4>
          <span className="text-[10px] bg-[#0d6434] text-emerald-100 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-700">
            ID: {windowConfig.sheetId.substring(0, 8)}...
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Practice/Solution Mode Switcher */}
          <div className="bg-[#0b5930] p-0.5 rounded-lg flex border border-emerald-700">
            <button
              onClick={handleSwitchToPractice}
              className={`px-3 py-1 text-[10px] font-extrabold rounded-md flex items-center gap-1.5 cursor-pointer transition-all ${
                practiceMode 
                  ? "bg-amber-500 text-slate-950 shadow-sm" 
                  : "text-emerald-200 hover:text-white"
              }`}
            >
              <Lock className="w-3 h-3" /> Mode Latihan (Kosongkan Jawaban)
            </button>
            <button
              onClick={() => {
                setPracticeMode(false);
                handleShowAllSolutions();
              }}
              className={`px-3 py-1 text-[10px] font-extrabold rounded-md flex items-center gap-1.5 cursor-pointer transition-all ${
                !practiceMode 
                  ? "bg-emerald-600 text-white shadow-sm" 
                  : "text-emerald-200 hover:text-white"
              }`}
            >
              <Eye className="w-3 h-3" /> Mode Solusi (Tampilkan Jawaban)
            </button>
          </div>

          <button 
            onClick={handleResetSheet} 
            className="bg-[#0b5930] hover:bg-[#073c20] text-white text-[10px] font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer transition-colors border border-emerald-700"
          >
            <RefreshCw className="w-3 h-3" /> Reset Sheet
          </button>
        </div>
      </div>

      {/* Sheet Selection Tab (if multiple sheets exist like Window 1) */}
      {windowConfig.sheets.length > 1 && (
        <div className="bg-slate-100 border-b border-slate-200 flex select-none text-[11px] font-semibold text-slate-600 shrink-0">
          {windowConfig.sheets.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSheetId(s.id)}
              className={`px-5 py-2.5 border-r border-slate-200 cursor-pointer flex items-center gap-1.5 transition-all ${
                activeSheetId === s.id 
                  ? "bg-white text-[#107c41] font-bold border-b-2 border-b-[#107c41]" 
                  : "hover:bg-slate-200"
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-[#107c41]" />
              Sheet: <span className="font-mono">{s.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Current Mode Badge Indicator */}
      <div className={`p-2.5 px-4 select-none font-sans text-xs flex items-center justify-between border-b shrink-0 ${
        practiceMode 
          ? "bg-amber-50/90 border-amber-200 text-amber-900" 
          : "bg-emerald-50/90 border-emerald-200 text-emerald-900"
      }`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${practiceMode ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`} />
          <span className="font-extrabold tracking-wide uppercase text-[10px]">
            {practiceMode ? "⚠️ STATUS: MODE LATIHAN (JAWABAN KOSONG)" : "✅ STATUS: MODE SOLUSI (ADA JAWABAN)"}
          </span>
        </div>
        <p className="text-[10px] text-slate-500 font-bold hidden sm:block">
          {practiceMode ? "Silakan ketik rumus Excel yang benar untuk memecahkan tantangan." : "Jawaban rumus diisi otomatis untuk keperluan presentasi & pengauditan."}
        </p>
      </div>

      {/* Interactive Ribbon Controls */}
      <div className="bg-slate-50 border-b border-slate-200 p-2.5 flex flex-wrap items-center justify-between gap-3 select-none text-xs shrink-0">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari debitur..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 pl-8 pr-3 py-1.5 rounded-lg text-[11px] w-40 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-100 placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Branch Filter dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cabang:</span>
            <select
              value={filterBranch}
              onChange={e => setFilterBranch(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 focus:outline-none focus:border-emerald-600"
            >
              {branches.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Freeze panes toggle */}
          <button
            onClick={() => setIsHeaderFrozen(!isHeaderFrozen)}
            className={`px-3 py-1.5 border rounded-lg text-[10.5px] font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
              isHeaderFrozen 
                ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold" 
                : "bg-white hover:bg-slate-100 border-slate-200 text-slate-600"
            }`}
          >
            {isHeaderFrozen ? "Kunci Header (Frozen)" : "Buka Header (Scroll)"}
          </button>
        </div>

        {/* Info label */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10.5px] text-slate-500 font-medium">
          <CheckSquare className="w-4 h-4 text-emerald-600" />
          <span>Hanya menampilkan 10 baris latihan</span>
        </div>
      </div>

      {/* Excel Formula Bar */}
      <div className="bg-slate-50/70 border-b border-slate-200 p-2 flex items-center gap-2 select-none shrink-0 font-mono text-[11px]">
        <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-md font-semibold text-slate-700 min-w-14 text-center shadow-2xs">
          {selectedCell ? selectedCell.key : "A1"}
        </div>
        <div className="text-slate-400 font-display font-bold text-sm select-none px-1">
          fx
        </div>
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={formulaBarInput}
            onChange={e => setFormulaBarInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") handleApplyFormula();
            }}
            placeholder="Masukkan nilai atau rumus Excel (mulai dengan = )"
            className="flex-1 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg text-[11px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-100 placeholder:text-slate-400 font-semibold"
          />
          <button
            onClick={handleApplyFormula}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded-lg cursor-pointer flex items-center gap-1 transition-colors text-[10.5px] shadow-xs"
          >
            <Play className="w-3 h-3 fill-white" /> Terapkan
          </button>
        </div>
      </div>

      {/* Feedback/Status Message Banner */}
      {statusMessage && (
        <div className={`p-3 px-4 border-b flex items-center gap-2.5 transition-all text-xs font-semibold ${
          statusMessage.type === "success" 
            ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
            : statusMessage.type === "error"
              ? "bg-rose-50 border-rose-100 text-rose-800"
              : "bg-blue-50 border-blue-100 text-blue-800"
        }`}>
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : (
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusMessage.type === "error" ? "bg-rose-500" : "bg-blue-500"}`} />
          )}
          <span className="flex-1 leading-snug">{statusMessage.text}</span>
          <button 
            onClick={() => setStatusMessage(null)} 
            className="text-slate-400 hover:text-slate-700 font-bold px-1"
          >
            &times;
          </button>
        </div>
      )}

      {/* Spreadsheet Main Grid Canvas */}
      <div className="flex-1 overflow-auto custom-scrollbar select-none bg-slate-100 max-w-full">
        <table className="border-collapse table-auto min-w-max bg-white text-[11px] font-semibold text-slate-800">
          {/* Header Row */}
          <thead className={isHeaderFrozen ? "sticky top-0 z-10 shadow-xs" : ""}>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-semibold text-[10.5px]">
              {/* Row index indicator header */}
              <th className="w-10 border-r border-b border-slate-200 text-center p-2 bg-slate-100 select-none font-semibold"></th>
              {activeSheet.columns.map((col, idx) => {
                const excelLetter = getExcelColumnLetter(idx);
                const colWidth = col.key === "NAMA DEBITUR" || col.key === "Nama" || col.key === "Nama Debitur" || col.key === "Jenis" || col.key.toLowerCase().includes("kredit") ? "min-w-[240px]" : "min-w-[160px]";
                return (
                  <th 
                    key={col.key} 
                    className={`border-r border-b border-slate-200 px-3.5 py-2.5 text-center bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors relative ${colWidth} group select-none font-bold text-slate-700`}
                    onClick={() => handleSort(col.key)}
                  >
                    <div className="text-[9.5px] text-slate-400 font-mono font-medium block">
                      {excelLetter}
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-0.5">
                      <span className="truncate">{col.label}</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400 shrink-0 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Grid Rows */}
          <tbody>
            {filteredRows.map((row, rIdx) => {
              const excelRowIdx = rIdx + 2; // Row 1 is header
              return (
                <tr 
                  key={row.NOFAS as string || row.Nofas as string || rIdx} 
                  className="hover:bg-slate-50/70 border-b border-slate-200 font-medium text-slate-700 font-mono transition-colors"
                >
                  {/* Row index label */}
                  <td className="border-r border-slate-200 bg-slate-100 p-2 text-center text-slate-400 font-bold font-mono">
                    {excelRowIdx}
                  </td>
                  
                  {activeSheet.columns.map((col, cIdx) => {
                    const cellKey = `${getExcelColumnLetter(cIdx)}${excelRowIdx}`;
                    const isSelected = selectedCell && selectedCell.rIdx === rIdx && selectedCell.cIdx === cIdx;
                    
                    // Format output
                    const displayVal = getCellDisplayValue(row, col, rIdx);
                    const isFormulaCol = col.type === "formula";
                    const isFilled = displayVal !== " " && displayVal !== "";

                    // Dynamic styles depending on value or status
                    let cellBg = "";
                    let cellText = "";
                    
                    if (isFormulaCol) {
                      if (practiceMode && !row[`_user_formula_${col.key}`]) {
                        cellBg = "bg-emerald-50/20 hover:bg-emerald-50/40 cursor-pointer border-dashed border-emerald-300";
                        cellText = "text-emerald-600/50 italic text-[10px] text-center font-semibold";
                      } else {
                        cellBg = "bg-emerald-50/30";
                        cellText = "text-emerald-800 font-bold";
                      }
                    }

                    // Highlight Status and Scale Priorities in the Prospect sheet
                    if (displayVal === "TIDAK LAYAK" || displayVal === "TIDAK BISA") {
                      cellBg = "bg-red-50 font-bold";
                      cellText = "text-red-700";
                    } else if (displayVal === "NORMAL" || displayVal === "BISA") {
                      cellBg = "bg-emerald-50/50 font-bold";
                      cellText = "text-emerald-700";
                    } else if (displayVal === "PRIORITAS 1") {
                      cellBg = "bg-amber-100 font-bold text-center";
                      cellText = "text-amber-800 scale-105";
                    } else if (displayVal === "PRIORITAS 2") {
                      cellBg = "bg-blue-50 font-bold text-center";
                      cellText = "text-blue-800";
                    } else if (displayVal === "CEK MANUAL") {
                      cellBg = "bg-slate-100 font-semibold text-center";
                      cellText = "text-slate-600";
                    }

                    const isLongCol = col.key === "NAMA DEBITUR" || col.key === "Nama" || col.key === "Nama Debitur" || col.key === "Jenis" || col.key.toLowerCase().includes("kredit");

                    return (
                      <td 
                        key={col.key}
                        onClick={() => handleCellClick(rIdx, cIdx, col.key)}
                        className={`border-r border-slate-200 px-3.5 py-2.5 whitespace-nowrap overflow-hidden relative cursor-pointer select-none ${cellBg} ${cellText} ${
                          isSelected ? "ring-2 ring-emerald-600 bg-white z-10 shadow-sm" : ""
                        }`}
                        style={{ minWidth: isLongCol ? "240px" : "160px" }}
                        title={`${col.label} (Baris ${excelRowIdx}): ${displayVal}`}
                      >
                        {isFormulaCol && practiceMode && !row[`_user_formula_${col.key}`] ? (
                          <span className="flex items-center justify-center gap-0.5 text-[9.5px]">
                            <span className="font-sans font-bold text-emerald-700">+ Tulis Rumus</span>
                          </span>
                        ) : (
                          displayVal
                        )}
                        
                        {/* Selected cell marker dot */}
                        {isSelected && (
                           <div className="absolute right-0 bottom-0 w-1.5 h-1.5 bg-emerald-700 border border-white" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Active Challenge Guide bar at bottom */}
      {activeChallenge && !activeChallenge.completed && (
        <div className="bg-amber-50 border-t border-amber-200 p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs">
          <div className="flex items-start gap-2 select-none">
            <Sparkles className="w-4.5 h-4.5 text-amber-500 mt-0.5 shrink-0 animate-bounce" />
            <div>
              <p className="font-bold text-amber-900">
                Tantangan Aktif: {activeChallenge.title}
              </p>
              <p className="text-amber-800 text-[11px] mt-0.5 font-semibold">
                Selesaikan dengan mengetik rumus di kolom <span className="bg-white px-1.5 py-0.5 rounded border border-amber-200 font-mono font-bold">{activeChallenge.targetColumn}</span>. 
                Saran rumus: <code className="bg-white px-1 py-0.5 rounded border border-amber-200 font-mono text-[10px] font-bold">{activeChallenge.expectedFormula[0]}</code>
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              setFormulaBarInput(activeChallenge.expectedFormula[0]);
              setStatusMessage({ text: "Rumus disalin ke formula bar. Klik 'Terapkan' untuk mencoba!", type: "info" });
            }}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-1.5 px-3 rounded-lg text-[10.5px] cursor-pointer transition-colors shadow-xs"
          >
            Gunakan Solusi Rumus
          </button>
        </div>
      )}
    </div>
  );
}
