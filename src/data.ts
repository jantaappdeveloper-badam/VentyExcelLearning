import { SimulatorWindow, Challenge, LessonModule } from "./types";

// Helper to format currency
export const formatIDR = (num: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
};

// Raw initial data with exactly 10 rows from the CSVs for high-fidelity rendering
export const INITIAL_WINDOWS_DATA: SimulatorWindow[] = [
  {
    id: "prospek_under_100jt",
    title: "1) Template Prospek (Plafond Under 100jt)",
    sheetId: "1E8y2RKosq3NXij7p5_ZwXzTQtdyjStSGDPG1hH5gLeQ",
    sheets: [
      {
        id: "data_nominatif",
        name: "Data nominatif",
        csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRKf0KJNAOjClnAaQlC4YycHAQV2pW5F-7Z3S4UDAisUVFOJWkxuwoI_GoL3W5Pj_5MGboLDZZI4srj/pub?gid=1112420584&single=true&output=csv",
        columns: [
          { key: "CABANG", label: "CABANG", type: "string" },
          { key: "NOFAS", label: "NOFAS", type: "string" },
          { key: "NAMA DEBITUR", label: "NAMA DEBITUR", type: "string" },
          { key: "Tanggal Lahir", label: "Tanggal Lahir", type: "date" },
          { key: "Jenis", label: "Jenis Kredit", type: "string" },
          { key: "Plafond", label: "Plafond", type: "number" },
          { key: "Baki Debet", label: "Baki Debet", type: "number" },
          { key: "Angsuran", label: "Angsuran", type: "number" },
          { key: "Total Pendapatan", label: "Total Pendapatan", type: "number" },
          { key: "Sisa Jangka Waktu", label: "Sisa Jangka Waktu (Bln)", type: "number" },
          { key: "Kolektibilitas", label: "Kolektibilitas", type: "number" },
          { key: "No HP", label: "No HP", type: "string" },
          { key: "Nama AO", label: "Nama AO", type: "string" }
        ],
        initialData: [
          { CABANG: "CABANG AMBON", NOFAS: "0013B48556", "NAMA DEBITUR": "HERMI SALAWANE", "Tanggal Lahir": "07/12/1975", Jenis: "3B - KREDIT PEGAWAI ASN", Plafond: 256000000, "Baki Debet": 227061019, Angsuran: 4226300, "Total Pendapatan": 4732000, "Sisa Jangka Waktu": 88, Kolektibilitas: 1, "No HP": "08123456781", "Nama AO": "AO AMBON" },
          { CABANG: "CABANG AMBON", NOFAS: "1113A41009", "NAMA DEBITUR": "AISA TUASALAMONY", "Tanggal Lahir": "25/12/1972", Jenis: "3B - KREDIT PEGAWAI ASN", Plafond: 184000000, "Baki Debet": 132475463, Angsuran: 2791900, "Total Pendapatan": 3503000, "Sisa Jangka Waktu": 76, Kolektibilitas: 1, "No HP": "08123456782", "Nama AO": "AO AMBON" },
          { CABANG: "CABANG AMBON", NOFAS: "0513L50121", "NAMA DEBITUR": "JACOMINA SALOMI ANTHOMINA AYAL", "Tanggal Lahir": "11/07/1969", Jenis: "3L - KREDIT PEGAWAI PLUS 3a - THT", Plafond: 43040000, "Baki Debet": 43040000, Angsuran: 573867, "Total Pendapatan": 3000000, "Sisa Jangka Waktu": 39, Kolektibilitas: 1, "No HP": "08123456783", "Nama AO": "AO AMBON" },
          { CABANG: "CABANG AMBON", NOFAS: "0013F48521", "NAMA DEBITUR": "JACOMINA SALOMI ANTHOMINA AYAL", "Tanggal Lahir": "11/07/1969", Jenis: "3F - KREDIT PEGAWAI PLUS METODE-1", Plafond: 209251000, "Baki Debet": 183077110, Angsuran: 3557546, "Total Pendapatan": 3000000, "Sisa Jangka Waktu": 156, Kolektibilitas: 1, "No HP": "08123456784", "Nama AO": "AO AMBON" },
          { CABANG: "CABANG AMBON", NOFAS: "0013G48706", "NAMA DEBITUR": "JULIANA BARBALINA SIAHAIJA", "Tanggal Lahir": "29/10/1968", Jenis: "3G - KREDIT PEGAWAI PLUS METODE-2", Plafond: 203328000, "Baki Debet": 194587514, Angsuran: 2639815, "Total Pendapatan": 3300000, "Sisa Jangka Waktu": 158, Kolektibilitas: 1, "No HP": "08123456785", "Nama AO": "AO AMBON" },
          { CABANG: "CABANG AMBON", NOFAS: "0513F49264", "NAMA DEBITUR": "WELSA LOPULALAN", "Tanggal Lahir": "26/04/1968", Jenis: "3F - KREDIT PEGAWAI PLUS METODE-1", Plafond: 138004000, "Baki Debet": 115813727, Angsuran: 3185283, "Total Pendapatan": 3747400, "Sisa Jangka Waktu": 82, Kolektibilitas: 1, "No HP": "08123456786", "Nama AO": "AO AMBON" },
          { CABANG: "CABANG AMBON", NOFAS: "1117A45931", "NAMA DEBITUR": "SAMSIAH RUMEON BAHY", "Tanggal Lahir": "31/05/1980", Jenis: "3B - KREDIT PEGAWAI ASN", Plafond: 247000000, "Baki Debet": 230123759, Angsuran: 3040000, "Total Pendapatan": 3502000, "Sisa Jangka Waktu": 165, Kolektibilitas: 1, "No HP": "08123456787", "Nama AO": "AO AMBON" },
          { CABANG: "CABANG AMBON", NOFAS: "0513F49918", "NAMA DEBITUR": "LA OKE", "Tanggal Lahir": "14/08/1971", Jenis: "3F - KREDIT PEGAWAI PLUS METODE-1", Plafond: 276701000, "Baki Debet": 270099016, Angsuran: 4632340, "Total Pendapatan": 5264200, "Sisa Jangka Waktu": 115, Kolektibilitas: 1, "No HP": "08123456788", "Nama AO": "AO AMBON" },
          { CABANG: "CABANG AMBON", NOFAS: "0013B49159", "NAMA DEBITUR": "MASITA NAHUMARURY", "Tanggal Lahir": "08/04/1978", Jenis: "3B - KREDIT PEGAWAI ASN", Plafond: 278000000, "Baki Debet": 266077685, Angsuran: 3867100, "Total Pendapatan": 4595300, "Sisa Jangka Waktu": 139, Kolektibilitas: 1, "No HP": "08123456789", "Nama AO": "AO AMBON" },
          { CABANG: "CABANG AMBON", NOFAS: "1117A46214", "NAMA DEBITUR": "LENNY DJOKJA", "Tanggal Lahir": "23/03/1980", Jenis: "3B - KREDIT PEGAWAI ASN", Plafond: 266000000, "Baki Debet": 244839982, Angsuran: 3380500, "Total Pendapatan": 4187800, "Sisa Jangka Waktu": 150, Kolektibilitas: 1, "No HP": "08123456790", "Nama AO": "AO AMBON" }
        ]
      },
      {
        id: "prospek",
        name: "Prospek",
        csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRKf0KJNAOjClnAaQlC4YycHAQV2pW5F-7Z3S4UDAisUVFOJWkxuwoI_GoL3W5Pj_5MGboLDZZI4srj/pub?gid=192475242&single=true&output=csv",
        columns: [
          { key: "NOFAS", label: "NOFAS", type: "string" },
          { key: "CABANG", label: "CABANG", type: "string" },
          { key: "Nama", label: "Nama Debitur", type: "string" },
          { key: "Usia", label: "Usia", type: "number" },
          { key: "Jenis", label: "Jenis Kredit", type: "string" },
          { key: "Plafond", label: "Plafond", type: "number" },
          { key: "Baki Debet", label: "Baki Debet", type: "number" },
          { key: "Angsuran", label: "Angsuran", type: "number" },
          { key: "Pendapatan", label: "Pendapatan", type: "number" },
          { key: "% Potongan", label: "% Potongan", type: "formula", formula: "=H2/I2" },
          { key: "Status Potongan", label: "Status Potongan", type: "formula", formula: '=IF(J2>0.9,"TIDAK LAYAK","NORMAL")' },
          { key: "Sisa Tenor", label: "Sisa Tenor (Bln)", type: "number" },
          { key: "Kol", label: "Kol", type: "number" },
          { key: "SKALA PRIORITAS", label: "SKALA PRIORITAS", type: "formula", formula: '=IF(AND(F2<=100000000,M2=1),IF(L2<=24,"PRIORITAS 1","PRIORITAS 2"),"CEK MANUAL")' },
          { key: "No HP", label: "No HP", type: "string" },
          { key: "AO", label: "AO", type: "string" }
        ],
        initialData: [
          { NOFAS: "0013B48556", CABANG: "CABANG AMBON", Nama: "HERMI SALAWANE", Usia: 50, Jenis: "3B - KREDIT PEGAWAI ASN", Plafond: 256000000, "Baki Debet": 227061019, Angsuran: 4226300, Pendapatan: 4732000, "% Potongan": "", "Status Potongan": "", "Sisa Tenor": 88, Kol: 1, "SKALA PRIORITAS": "", "No HP": "08123456781", AO: "AO AMBON" },
          { NOFAS: "1113A41009", CABANG: "CABANG AMBON", Nama: "AISA TUASALAMONY", Usia: 53, Jenis: "3B - KREDIT PEGAWAI ASN", Plafond: 184000000, "Baki Debet": 132475463, Angsuran: 2791900, Pendapatan: 3503000, "% Potongan": "", "Status Potongan": "", "Sisa Tenor": 76, Kol: 1, "SKALA PRIORITAS": "", "No HP": "08123456782", AO: "AO AMBON" },
          { NOFAS: "0513L50121", CABANG: "CABANG AMBON", Nama: "JACOMINA SALOMI ANTHOMINA AYAL", Usia: 57, Jenis: "3L - KREDIT PEGAWAI PLUS 3a - THT", Plafond: 43040000, "Baki Debet": 43040000, Angsuran: 573867, Pendapatan: 3000000, "% Potongan": "", "Status Potongan": "", "Sisa Tenor": 39, Kol: 1, "SKALA PRIORITAS": "", "No HP": "08123456783", AO: "AO AMBON" },
          { NOFAS: "0013F48521", CABANG: "CABANG AMBON", Nama: "JACOMINA SALOMI ANTHOMINA AYAL", Usia: 57, Jenis: "3F - KREDIT PEGAWAI PLUS METODE-1", Plafond: 209251000, "Baki Debet": 183077110, Angsuran: 3557546, Pendapatan: 3000000, "% Potongan": "", "Status Potongan": "", "Sisa Tenor": 156, Kol: 1, "SKALA PRIORITAS": "", "No HP": "08123456784", AO: "AO AMBON" },
          { NOFAS: "0013G48706", CABANG: "CABANG AMBON", Nama: "JULIANA BARBALINA SIAHAIJA", Usia: 57, Jenis: "3G - KREDIT PEGAWAI PLUS METODE-2", Plafond: 203328000, "Baki Debet": 194587514, Angsuran: 2639815, Pendapatan: 3300000, "% Potongan": "", "Status Potongan": "", "Sisa Tenor": 158, Kol: 1, "SKALA PRIORITAS": "", "No HP": "08123456785", AO: "AO AMBON" },
          { NOFAS: "0513F49264", CABANG: "CABANG AMBON", Nama: "WELSA LOPULALAN", Usia: 58, Jenis: "3F - KREDIT PEGAWAI PLUS METODE-1", Plafond: 138004000, "Baki Debet": 115813727, Angsuran: 3185283, Pendapatan: 3747400, "% Potongan": "", "Status Potongan": "", "Sisa Tenor": 82, Kol: 1, "SKALA PRIORITAS": "", "No HP": "08123456786", AO: "AO AMBON" },
          { NOFAS: "1117A45931", CABANG: "CABANG AMBON", Nama: "SAMSIAH RUMEON BAHY", Usia: 46, Jenis: "3B - KREDIT PEGAWAI ASN", Plafond: 247000000, "Baki Debet": 230123759, Angsuran: 3040000, Pendapatan: 3502000, "% Potongan": "", "Status Potongan": "", "Sisa Tenor": 165, Kol: 1, "SKALA PRIORITAS": "", "No HP": "08123456787", AO: "AO AMBON" },
          { NOFAS: "0513F49918", CABANG: "CABANG AMBON", Nama: "LA OKE", Usia: 54, Jenis: "3F - KREDIT PEGAWAI PLUS METODE-1", Plafond: 276701000, "Baki Debet": 270099016, Angsuran: 4632340, Pendapatan: 5264200, "% Potongan": "", "Status Potongan": "", "Sisa Tenor": 115, Kol: 1, "SKALA PRIORITAS": "", "No HP": "08123456788", AO: "AO AMBON" },
          { NOFAS: "0013B49159", CABANG: "CABANG AMBON", Nama: "MASITA NAHUMARURY", Usia: 48, Jenis: "3B - KREDIT PEGAWAI ASN", Plafond: 278000000, "Baki Debet": 266077685, Angsuran: 3867100, Pendapatan: 4595300, "% Potongan": "", "Status Potongan": "", "Sisa Tenor": 139, Kol: 1, "SKALA PRIORITAS": "", "No HP": "08123456789", AO: "AO AMBON" },
          { NOFAS: "1117A46214", CABANG: "CABANG AMBON", Nama: "LENNY DJOKJA", Usia: 46, Jenis: "3B - KREDIT PEGAWAI ASN", Plafond: 266000000, "Baki Debet": 244839982, Angsuran: 3380500, Pendapatan: 4187800, "% Potongan": "", "Status Potongan": "", "Sisa Tenor": 150, Kol: 1, "SKALA PRIORITAS": "", "No HP": "08123456790", AO: "AO AMBON" }
        ]
      }
    ]
  },
  {
    id: "pegawai_plus_bup",
    title: "2) Template Pegawai Plus BUP",
    sheetId: "1v34XbqNNajLJc8SyIdRV3zoRE6VYDflGxRBT44Hm1Zk",
    sheets: [
      {
        id: "pegawai_bup",
        name: "Pegawai Plus BUP",
        csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShdAkwKaKYk1DDjDw5jooFI5JYZwrMvoF8I1pPWbGO9fWYdnmvqAZDcyqIUOXAtyItWeGwsvKvIYVv/pub?gid=1058323550&single=true&output=csv",
        columns: [
          { key: "Nofas", label: "Nofas", type: "string" },
          { key: "Cabang", label: "Cabang", type: "string" },
          { key: "Jenis Kredit", label: "Jenis Kredit", type: "string" },
          { key: "Nama Debitur", label: "Nama Debitur", type: "string" },
          { key: "NIP", label: "NIP", type: "string" },
          { key: "Tgl Lahir", label: "Tgl Lahir", type: "date" },
          { key: "Umur", label: "Umur (Th)", type: "formula", formula: '=DATEDIF(F2,TODAY(),"Y")' },
          { key: "BUP", label: "BUP", type: "number", editable: true },
          { key: "Tgl BUP", label: "Tgl BUP", type: "formula", formula: '=DATE(YEAR(F2)+H2,MONTH(F2),DAY(F2))' },
          { key: "Sisa Masa Dinas (Th)", label: "Sisa Masa Dinas (Th)", type: "formula", formula: '=DATEDIF(TODAY(),I2,"Y")' },
          { key: "Propek Untuk Kredit", label: "Propek Untuk Kredit", type: "formula", formula: '=IF(J2<=5,"Pegawai Plus Skema 2",IF(J2<=8,"Pegawai Plus Skema 1","Belum Pegawai Plus"))' },
          { key: "cek 1", label: "cek 1", type: "formula", formula: '=IF(G2>=H2,"Pensiun","Belum Pensiun")' },
          { key: "Bakidebet Juni", label: "Bakidebet Juni", type: "number" },
          { key: "Prospek", label: "Prospek", type: "formula", formula: '=IF(M2<=100000000,"BISA","TIDAK BISA")' }
        ],
        initialData: [
          { Nofas: "0013B48556", Cabang: "CABANG AMBON", "Jenis Kredit": "3B - KREDIT PEGAWAI ASN", "Nama Debitur": "HERMI SALAWANE", NIP: "197512071995032002", "Tgl Lahir": "07/12/1975", Umur: "", BUP: 58, "Tgl BUP": "", "Sisa Masa Dinas (Th)": "", "Propek Untuk Kredit": "", "cek 1": "", "Bakidebet Juni": 227061019, Prospek: "" },
          { Nofas: "1113A41009", Cabang: "CABANG AMBON", "Jenis Kredit": "3B - KREDIT PEGAWAI ASN", "Nama Debitur": "AISA TUASALAMONY", NIP: "197212252007012025", "Tgl Lahir": "25/12/1972", Umur: "", BUP: 58, "Tgl BUP": "", "Sisa Masa Dinas (Th)": "", "Propek Untuk Kredit": "", "cek 1": "", "Bakidebet Juni": 132475463, Prospek: "" },
          { Nofas: "1117A45931", Cabang: "CABANG AMBON", "Jenis Kredit": "3B - KREDIT PEGAWAI ASN", "Nama Debitur": "SAMSIAH RUMEON BAHY", NIP: "198005312008012018", "Tgl Lahir": "31/05/1980", Umur: "", BUP: 58, "Tgl BUP": "", "Sisa Masa Dinas (Th)": "", "Propek Untuk Kredit": "", "cek 1": "", "Bakidebet Juni": 230123759, Prospek: "" },
          { Nofas: "0013B49159", Cabang: "CABANG AMBON", "Jenis Kredit": "3B - KREDIT PEGAWAI ASN", "Nama Debitur": "MASITA NAHUMARURY", NIP: "197804082007012024", "Tgl Lahir": "08/04/1978", Umur: "", BUP: 58, "Tgl BUP": "", "Sisa Masa Dinas (Th)": "", "Propek Untuk Kredit": "", "cek 1": "", "Bakidebet Juni": 266077685, Prospek: "" },
          { Nofas: "1117A46214", Cabang: "CABANG AMBON", "Jenis Kredit": "3B - KREDIT PEGAWAI ASN", "Nama Debitur": "LENNY DJOKJA", NIP: "198003232008012029", "Tgl Lahir": "23/03/1980", Umur: "", BUP: 58, "Tgl BUP": "", "Sisa Masa Dinas (Th)": "", "Propek Untuk Kredit": "", "cek 1": "", "Bakidebet Juni": 244839982, Prospek: "" },
          { Nofas: "0013B48636", Cabang: "CABANG AMBON", "Jenis Kredit": "3B - KREDIT PEGAWAI ASN", "Nama Debitur": "ELSYELINA UNEPUTTY", NIP: "197504242007012015", "Tgl Lahir": "24/04/1975", Umur: "", BUP: 58, "Tgl BUP": "", "Sisa Masa Dinas (Th)": "", "Propek Untuk Kredit": "", "cek 1": "", "Bakidebet Juni": 169841786, Prospek: "" },
          { Nofas: "0013B48186", Cabang: "CABANG AMBON", "Jenis Kredit": "3B - KREDIT PEGAWAI ASN", "Nama Debitur": "JUBELINA YOHANA SOPACUA", NIP: "198107062008012017", "Tgl Lahir": "06/07/1981", Umur: "", BUP: 58, "Tgl BUP": "", "Sisa Masa Dinas (Th)": "", "Propek Untuk Kredit": "", "cek 1": "", "Bakidebet Juni": 342420192, Prospek: "" },
          { Nofas: "1113A45078", Cabang: "CABANG AMBON", "Jenis Kredit": "3B - KREDIT PEGAWAI ASN", "Nama Debitur": "PHILIANTROPY METEKOHY", NIP: "197902142009041004", "Tgl Lahir": "14/02/1979", Umur: "", BUP: 58, "Tgl BUP": "", "Sisa Masa Dinas (Th)": "", "Propek Untuk Kredit": "", "cek 1": "", "Bakidebet Juni": 166635317, Prospek: "" },
          { Nofas: "1117A46139", Cabang: "CABANG AMBON", "Jenis Kredit": "3B - KREDIT PEGAWAI ASN", "Nama Debitur": "ROSA MARSELIN FRANSISCA SIWALETTE", NIP: "197805122009042002", "Tgl Lahir": "12/05/1978", Umur: "", BUP: 58, "Tgl BUP": "", "Sisa Masa Dinas (Th)": "", "Propek Untuk Kredit": "", "cek 1": "", "Bakidebet Juni": 259802631, Prospek: "" },
          { Nofas: "0013B46848", Cabang: "CABANG AMBON", "Jenis Kredit": "3B - KREDIT PEGAWAI ASN", "Nama Debitur": "DIANA TAHER", NIP: "198105032008042005", "Tgl Lahir": "03/05/1981", Umur: "", BUP: 58, "Tgl BUP": "", "Sisa Masa Dinas (Th)": "", "Propek Untuk Kredit": "", "cek 1": "", "Bakidebet Juni": 243489897, Prospek: "" }
        ]
      }
    ]
  }
];

// Interactive tutorial chapters and guidelines
export const LESSON_MODULES: LessonModule[] = [
  {
    id: "modul_1_prospek",
    title: "1. Analisis Prospek Plafond Di Bawah 100 Juta",
    subtitle: "Mempelajari pengolahan potongan angsuran & kriteria skala prioritas",
    chapters: [
      {
        id: "ch1_1",
        title: "Pemetaan Potongan Angsuran",
        contentHtml: `
          <p class="mb-2"><strong>Materi Pembelajaran:</strong></p>
          <p class="mb-3 text-slate-600">
            Dalam melakukan pemasaran kredit konsumer/pegawai, bank perlu memastikan beban angsuran nasabah tidak melebihi batas rasio pendapatan (DSR / Debt Service Ratio) yang diijinkan, biasanya maksimal 90% dari total pendapatan untuk portofolio tertentu.
          </p>
          <div class="bg-emerald-50 border-l-4 border-emerald-600 p-3 rounded-r-md mb-4 text-xs">
            <p class="font-semibold text-emerald-950 mb-1">Rumus Persentase Potongan:</p>
            <code class="block bg-white p-1.5 rounded border border-emerald-100 font-mono text-[10px]">=Angsuran / Pendapatan</code>
            <p class="text-slate-600 mt-1 leading-relaxed">Dalam spreadsheet kita, ini ditulis pada kolom <strong>% Potongan (Kolom J)</strong> dengan rumus: <br><strong>=H2/I2</strong> (dimana H adalah Angsuran dan I adalah Pendapatan).</p>
          </div>
          <div class="bg-slate-50 border-l-4 border-slate-500 p-3 rounded-r-md text-xs">
            <p class="font-semibold text-slate-900 mb-1">Rumus Evaluasi Status Potongan:</p>
            <code class="block bg-white p-1.5 rounded border border-slate-200 font-mono text-[10px]">=IF(J2 > 90%, "TIDAK LAYAK", "NORMAL")</code>
            <p class="text-slate-600 mt-1 leading-relaxed">Kolom <strong>Status Potongan (Kolom K)</strong> menggunakan fungsi IF logis untuk memverifikasi rasio DSR tersebut.</p>
          </div>
        `
      },
      {
        id: "ch1_2",
        title: "Kriteria Skala Prioritas",
        contentHtml: `
          <p class="mb-2"><strong>Mengapa Perlu Skala Prioritas?</strong></p>
          <p class="mb-3 text-slate-600 leading-relaxed">
            Pimpinan bank memfokuskan eksposur pemasaran pada nasabah berisiko rendah yang memiliki sisa masa tenor relatif pendek untuk segera di-topup/takeover. Skala Prioritas dikhususkan untuk nasabah dengan <strong>Plafond &le; 100 Juta</strong> dan status pembayaran lancar (Kol = 1).
          </p>
          <div class="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-md text-xs mb-3">
            <p class="font-semibold text-amber-900 mb-1">Logika Bersarang Skala Prioritas:</p>
            <p class="text-slate-700 leading-relaxed">
              Jika Plafond &le; 100.000.000 dan Kol = 1:
              <ul class="list-disc pl-4 mt-1 space-y-0.5">
                <li>Sisa Tenor &le; 24 bulan &rarr; <strong>PRIORITAS 1</strong></li>
                <li>Sisa Tenor > 24 bulan &rarr; <strong>PRIORITAS 2</strong></li>
              </ul>
              Selain itu &rarr; <strong>CEK MANUAL</strong>
            </p>
          </div>
          <p class="text-xs text-slate-600 font-mono bg-slate-100 p-2 rounded">
            Rumus: =IF(AND(F2<=100000000,M2=1), IF(L2<=24,"PRIORITAS 1","PRIORITAS 2"), "CEK MANUAL")
          </p>
        `
      }
    ]
  },
  {
    id: "modul_2_bup",
    title: "2. Pegawai Plus & Batas Usia Pensiun (BUP)",
    subtitle: "Menganalisa usia pensiun dan prospek skema kredit Pegawai Plus",
    chapters: [
      {
        id: "ch2_1",
        title: "DATEDIF & DATE untuk Batas Usia Pensiun",
        contentHtml: `
          <p class="mb-2"><strong>Pengolahan Data Usia Kerja:</strong></p>
          <p class="mb-3 text-slate-600 leading-relaxed">
            Staf kredit wajib memonitor Batas Usia Pensiun (BUP) agar kredit tidak jatuh tempo setelah debitur pensiun tanpa skema jaminan pensiun. Umumnya, BUP pegawai negeri adalah 58 tahun.
          </p>
          <div class="bg-emerald-50 border-l-4 border-emerald-600 p-3 rounded-r-md mb-4 text-xs">
            <p class="font-semibold text-emerald-950 mb-1">Rumus Menghitung Umur saat ini:</p>
            <code class="block bg-white p-1.5 rounded border border-emerald-100 font-mono text-[10px]">=DATEDIF(F2, TODAY(), "Y")</code>
            <p class="text-slate-600 mt-1">F2 adalah kolom <strong>Tgl Lahir</strong>. Rumus ini menghitung selisih tahun penuh dari tanggal lahir hingga hari ini (2026).</p>
          </div>
          <div class="bg-slate-50 border-l-4 border-slate-500 p-3 rounded-r-md text-xs mb-3">
            <p class="font-semibold text-slate-900 mb-1">Menentukan Tanggal BUP:</p>
            <code class="block bg-white p-1.5 rounded border border-slate-200 font-mono text-[10px]">=DATE(YEAR(F2)+H2, MONTH(F2), DAY(F2))</code>
            <p class="text-slate-600 mt-1">Mengambil Tanggal Lahir (F2) dan menambahkan masa bakti pensiun sebanyak 58 tahun (H2).</p>
          </div>
        `
      },
      {
        id: "ch2_2",
        title: "Pemetaan Skema Prospek Kredit",
        contentHtml: `
          <p class="mb-2"><strong>Pemetaan Prospek Pegawai Plus:</strong></p>
          <p class="text-slate-600 mb-3 text-xs leading-relaxed">
            Berdasarkan Sisa Masa Dinas (dalam Tahun, J2), bank membagi skema menjadi:
          </p>
          <ul class="list-disc pl-5 mb-3 text-slate-600 text-xs space-y-1">
            <li>Sisa Masa Dinas &le; 5 Tahun &rarr; <strong>Pegawai Plus Skema 2</strong> (sangat dekat pensiun).</li>
            <li>Sisa Masa Dinas &le; 8 Tahun (6-8 tahun) &rarr; <strong>Pegawai Plus Skema 1</strong>.</li>
            <li>Sisa Masa Dinas > 8 Tahun &rarr; <strong>Belum Pegawai Plus</strong>.</li>
          </ul>
          <p class="text-xs text-slate-600 font-mono bg-slate-100 p-2 rounded mb-3">
            Rumus: =IF(J2<=5,"Pegawai Plus Skema 2",IF(J2<=8,"Pegawai Plus Skema 1","Belum Pegawai Plus"))
          </p>
          <div class="bg-emerald-50 border-l-4 border-emerald-600 p-3 rounded-r-md text-xs">
            <p class="font-semibold text-emerald-950 mb-0.5">Analisis Prospek Baki Debet:</p>
            <p class="text-slate-600">Sesuai kebijakan direksi, prospek jaminan Pegawai Plus hanya <strong>BISA</strong> dilakukan jika sisa <strong>Bakidebet Juni (Kolom M) &le; Rp 100.000.000</strong>.</p>
            <code class="block bg-white p-1 rounded mt-1 font-mono text-[10px]">=IF(M2<=100000000, "BISA", "TIDAK BISA")</code>
          </div>
        `
      }
    ]
  }
];

// Practice challenges to guide user step-by-step
export const TUTORIAL_CHALLENGES: Challenge[] = [
  {
    id: "challenge_potongan",
    windowId: "prospek_under_100jt",
    sheetId: "prospek",
    title: "1. Hitung Rasio % Potongan",
    description: "Masukkan rumus pembagian angsuran terhadap pendapatan di kolom % Potongan.",
    instructions: "Pilih sel di kolom '% Potongan' (Kolom J, mulai baris 2), lalu ketik rumus: =H2/I2 di bilah rumus atas dan tekan Enter/Apply. (H adalah Angsuran, I adalah Pendapatan).",
    targetColumn: "% Potongan",
    expectedFormula: ["=H2/I2", "=H2 / I2", "H2/I2"],
    hint: "Ketik `=H2/I2` pada bilah rumus.",
    successMessage: "Sempurna! Rasio potongan bulanan terhitung otomatis di kolom J.",
    completed: false
  },
  {
    id: "challenge_status_potongan",
    windowId: "prospek_under_100jt",
    sheetId: "prospek",
    title: "2. Tentukan Status Potongan (IF)",
    description: "Evaluasi apakah rasio potongan > 90% (DSR limit).",
    instructions: "Pilih sel di kolom 'Status Potongan' (Kolom K, baris 2), lalu ketik rumus: =IF(J2>0.9,\"TIDAK LAYAK\",\"NORMAL\") dan tekan Enter/Apply.",
    targetColumn: "Status Potongan",
    expectedFormula: ['=IF(J2>0.9,"TIDAK LAYAK","NORMAL")', '=IF(J2>90%,"TIDAK LAYAK","NORMAL")', '=IF(J2>0.9, "TIDAK LAYAK", "NORMAL")'],
    hint: "Gunakan `=IF(J2>0.9,\"TIDAK LAYAK\",\"NORMAL\")`.",
    successMessage: "Bagus sekali! Status potongan berhasil diisi. Debitur di baris 4 (Jacomina) terdeteksi 'TIDAK LAYAK' karena potongan mencapai 118.58%!",
    completed: false
  },
  {
    id: "challenge_skala_prioritas",
    windowId: "prospek_under_100jt",
    sheetId: "prospek",
    title: "3. Evaluasi Skala Prioritas (AND & IF)",
    description: "Saring prioritas pemasaran kredit mikro di bawah 100 juta yang berkolektibilitas lancar.",
    instructions: "Pilih sel di kolom 'SKALA PRIORITAS' (Kolom N, baris 2), lalu ketik rumus: =IF(AND(F2<=100000000,M2=1),IF(L2<=24,\"PRIORITAS 1\",\"PRIORITAS 2\"),\"CEK MANUAL\") dan tekan Enter/Apply.",
    targetColumn: "SKALA PRIORITAS",
    expectedFormula: [
      '=IF(AND(F2<=100000000,M2=1),IF(L2<=24,"PRIORITAS 1","PRIORITAS 2"),"CEK MANUAL")',
      '=IF(AND(F2<=100000000, M2=1), IF(L2<=24, "PRIORITAS 1", "PRIORITAS 2"), "CEK MANUAL")'
    ],
    hint: "Ketik formula panjang AND di atas untuk kolom N.",
    successMessage: "Hebat luar biasa! Skala prioritas berhasil dipetakan secara akurat. Hanya nasabah dengan plafond di bawah 100juta yang berstatus PRIORITAS!",
    completed: false
  },
  {
    id: "challenge_umur_bup",
    windowId: "pegawai_plus_bup",
    sheetId: "pegawai_bup",
    title: "4. Hitung Umur Debitur (DATEDIF)",
    description: "Hitung umur debitur saat ini berdasarkan tanggal lahir.",
    instructions: "Pilih sel di kolom 'Umur' (Kolom G, baris 2), lalu ketik rumus: =DATEDIF(F2,TODAY(),\"Y\") dan tekan Enter/Apply.",
    targetColumn: "Umur",
    expectedFormula: ['=DATEDIF(F2,TODAY(),"Y")', '=DATEDIF(F2, TODAY(), "Y")', '=DATEDIF(F2,TODAY(), "Y")'],
    hint: "Ketik `=DATEDIF(F2,TODAY(),\"Y\")` di bilah rumus untuk mengkalkulasi umur tahun penuh.",
    successMessage: "Hebat! Umur debitur terhitung secara dinamis.",
    completed: false
  },
  {
    id: "challenge_tgl_bup",
    windowId: "pegawai_plus_bup",
    sheetId: "pegawai_bup",
    title: "5. Hitung Tanggal BUP (DATE & YEAR)",
    description: "Hitung tepat tanggal lahir + 58 tahun pensiun.",
    instructions: "Pilih sel di kolom 'Tgl BUP' (Kolom I, baris 2), lalu ketik rumus: =DATE(YEAR(F2)+H2,MONTH(F2),DAY(F2)) dan tekan Enter/Apply.",
    targetColumn: "Tgl BUP",
    expectedFormula: [
      '=DATE(YEAR(F2)+H2,MONTH(F2),DAY(F2))',
      '=DATE(YEAR(F2)+H2, MONTH(F2), DAY(F2))'
    ],
    hint: "Rumus: `=DATE(YEAR(F2)+H2,MONTH(F2),DAY(F2))`.",
    successMessage: "Sempurna! Tanggal Batas Usia Pensiun debitur (Tgl BUP) dihitung tepat waktu.",
    completed: false
  },
  {
    id: "challenge_sisa_dinas",
    windowId: "pegawai_plus_bup",
    sheetId: "pegawai_bup",
    title: "6. Hitung Sisa Masa Dinas",
    description: "Hitung berapa tahun sisa dinas pegawai sebelum masuk masa pensiun.",
    instructions: "Pilih sel di kolom 'Sisa Masa Dinas (Th)' (Kolom J, baris 2), lalu masukkan rumus: =DATEDIF(TODAY(),I2,\"Y\") dan tekan Enter/Apply.",
    targetColumn: "Sisa Masa Dinas (Th)",
    expectedFormula: ['=DATEDIF(TODAY(),I2,"Y")', '=DATEDIF(TODAY(), I2, "Y")', '=DATEDIF(TODAY(),I2, "Y")'],
    hint: "Gunakan `=DATEDIF(TODAY(),I2,\"Y\")`.",
    successMessage: "Sangat baik! Sisa masa dinas dalam tahun penuh berhasil diperoleh.",
    completed: false
  },
  {
    id: "challenge_prospek_kredit",
    windowId: "pegawai_plus_bup",
    sheetId: "pegawai_bup",
    title: "7. Tentukan Skema Pegawai Plus",
    description: "Klasifikasikan skema Pegawai Plus berdasarkan sisa masa dinas.",
    instructions: "Pilih sel di kolom 'Propek Untuk Kredit' (Kolom K, baris 2), lalu masukkan rumus: =IF(J2<=5,\"Pegawai Plus Skema 2\",IF(J2<=8,\"Pegawai Plus Skema 1\",\"Belum Pegawai Plus\")) dan tekan Enter/Apply.",
    targetColumn: "Propek Untuk Kredit",
    expectedFormula: [
      '=IF(J2<=5,"Pegawai Plus Skema 2",IF(J2<=8,"Pegawai Plus Skema 1","Belum Pegawai Plus"))',
      '=IF(J2<=5, "Pegawai Plus Skema 2", IF(J2<=8, "Pegawai Plus Skema 1", "Belum Pegawai Plus"))'
    ],
    hint: "Ketik `=IF(J2<=5,\"Pegawai Plus Skema 2\",IF(J2<=8,\"Pegawai Plus Skema 1\",\"Belum Pegawai Plus\"))`.",
    successMessage: "Sangat bagus! Klasifikasi skema Pegawai Plus terisi otomatis.",
    completed: false
  },
  {
    id: "challenge_bisa_kredit",
    windowId: "pegawai_plus_bup",
    sheetId: "pegawai_bup",
    title: "8. Tentukan Kelayakan Prospek (IF)",
    description: "Cek apakah debitur BISA melakukan jaminan Pegawai Plus (Bakidebet Juni <= 100 Juta).",
    instructions: "Pilih sel di kolom 'Prospek' (Kolom N, baris 2), lalu ketik rumus: =IF(M2<=100000000,\"BISA\",\"TIDAK BISA\") dan tekan Enter/Apply.",
    targetColumn: "Prospek",
    expectedFormula: [
      '=IF(M2<=100000000,"BISA","TIDAK BISA")',
      '=IF(M2<=100000000, "BISA", "TIDAK BISA")'
    ],
    hint: "Rumus: `=IF(M2<=100000000,\"BISA\",\"TIDAK BISA\")`.",
    successMessage: "Luar biasa! Anda berhasil menuntaskan seluruh latihan analisis kredit. Debitur Johana Matital (baris 17) teridentifikasi BISA karena sisa bakidebet hanya ~68 Juta!",
    completed: false
  }
];
