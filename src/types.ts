export interface SpreadsheetRow {
  [key: string]: string | number | boolean | undefined;
}

export interface SheetConfig {
  id: string;
  name: string;
  csvUrl: string;
  columns: {
    key: string;
    label: string;
    type: "string" | "number" | "percentage" | "date" | "formula";
    formula?: string; // Standard default Excel formula for display/evaluation
    editable?: boolean;
    format?: string;
  }[];
  initialData: SpreadsheetRow[];
}

export interface SimulatorWindow {
  id: string;
  title: string;
  sheetId: string;
  sheets: SheetConfig[];
}

export interface Challenge {
  id: string;
  windowId: string;
  sheetId: string;
  title: string;
  description: string;
  instructions: string;
  targetColumn: string;
  expectedFormula: string[]; // List of valid formulas in uppercase (e.g. "=H2/I2")
  hint: string;
  successMessage: string;
  completed: boolean;
}

export interface LessonChapter {
  id: string;
  title: string;
  contentHtml: string;
}

export interface LessonModule {
  id: string;
  title: string;
  subtitle: string;
  chapters: LessonChapter[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}
