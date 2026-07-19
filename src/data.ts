import { Lesson, DebtorRow } from "./types";

// High-fidelity initial dataset of Credit Nominative Data based on the training materials
export const INITIAL_DEBTOR_DATA: DebtorRow[] = [
  {
    id: 1,
    cif: "10001",
    nama: "Andi", // will contain some spaces in certain challenges or start as slightly messy
    cabang: "KC AMBON",
    produk: "Kredit Konsumtif",
    plafond: 75000000,
    outstanding: 25000000,
    tenor: 36,
    tanggalCair: "15/01/2023",
    tanggalJatuhTempo: "15/01/2026",
    tanggalLahir: "15/03/1985",
    instansi: "Pemerintah Daerah",
    kolektibilitas: "Lancar"
  },
  {
    id: 2,
    cif: "10002",
    nama: "Budi",
    cabang: "KC AMBON",
    produk: "Kredit Produktif",
    plafond: 125000000,
    outstanding: 40000000,
    tenor: 24,
    tanggalCair: "20/08/2024",
    tanggalJatuhTempo: "20/08/2026",
    tanggalLahir: "10/08/1990",
    instansi: "Swasta Mandiri",
    kolektibilitas: "Lancar"
  },
  {
    id: 3,
    cif: "10003",
    nama: "Citra",
    cabang: "Kantor Pusat Ambon", // Outdated branch name for Find & Replace practice
    produk: "Kredit Konsumtif",
    plafond: 95000000,
    outstanding: 35000000,
    tenor: 12,
    tanggalCair: "10/03/2025",
    tanggalJatuhTempo: "10/03/2026",
    tanggalLahir: "25/06/1978",
    instansi: "Instansi Pendidikan",
    kolektibilitas: "Dalam Perhatian Khusus"
  },
  {
    id: 4,
    cif: "10004",
    nama: "Dodi",
    cabang: "KC AMBON",
    produk: "Kredit Konsumtif",
    plafond: 150000000,
    outstanding: 20000000,
    tenor: 48,
    tanggalCair: "19/12/2024",
    tanggalJatuhTempo: "19/12/2028",
    tanggalLahir: "05/09/1982",
    instansi: "Pemerintah Daerah",
    kolektibilitas: "Lancar"
  },
  {
    id: 5,
    cif: "10005",
    nama: "Elsa",
    cabang: "KC AMBON",
    produk: "Kredit Produktif",
    plafond: 250000000,
    outstanding: 185500000,
    tenor: 60,
    tanggalCair: "14/03/2023",
    tanggalJatuhTempo: "14/03/2028",
    tanggalLahir: "12/12/1975",
    instansi: "Swasta Mandiri",
    kolektibilitas: "Kurang Lancar"
  },
  {
    id: 6,
    cif: "10006",
    nama: "Fani  ", // has trailing spaces for TRIM practice
    cabang: "KC AMBON",
    produk: "Kredit Konsumtif",
    plafond: 45000000,
    outstanding: 30266246,
    tenor: 24,
    tanggalCair: "03/02/2022",
    tanggalJatuhTempo: "03/02/2024",
    tanggalLahir: "21/07/1995",
    instansi: "Instansi Pendidikan",
    kolektibilitas: "Lancar"
  },
  {
    id: 7,
    cif: "10001", // Duplicate CIF and row of Andi for Remove Duplicate practice
    nama: "Andi",
    cabang: "KC AMBON",
    produk: "Kredit Konsumtif",
    plafond: 75000000,
    outstanding: 25000000,
    tenor: 36,
    tanggalCair: "15/01/2023",
    tanggalJatuhTempo: "15/01/2026",
    tanggalLahir: "15/03/1985",
    instansi: "Pemerintah Daerah",
    kolektibilitas: "Lancar"
  },
  {
    id: 8,
    cif: "10007",
    nama: "Gita",
    cabang: "KC AMBON",
    produk: "Kredit Produktif",
    plafond: 210000000,
    outstanding: 156423000,
    tenor: 48,
    tanggalCair: "21/07/2023",
    tanggalJatuhTempo: "21/07/2027",
    tanggalLahir: "30/10/1988",
    instansi: "Pemerintah Daerah",
    kolektibilitas: "Lancar"
  }
];

export const EXCEL_LESSONS: Lesson[] = [
  {
    id: 1,
    title: "Mengenal Data",
    subtitle: "Dasar data nominatif kredit dan jenis-jenis data di Excel",
    chapters: [
      {
        id: "ch1_1",
        title: "Apa itu Data Nominatif Kredit?",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            <strong>Data nominatif kredit</strong> adalah kumpulan informasi rinci mengenai seluruh debitur yang memiliki fasilitas kredit di bank, yang disajikan secara individual berdasarkan nama atau identitas masing-masing nasabah.
          </p>
          <p class="mb-4 text-slate-600 leading-relaxed">
            Data ini merupakan salah satu sumber informasi utama yang digunakan oleh bank untuk melakukan monitoring portofolio kredit, analisis risiko, serta identifikasi peluang bisnis dan pemasaran.
          </p>
          <div class="bg-emerald-50 border-l-4 border-excel-green p-4 rounded-r-md mb-4">
            <h5 class="font-semibold text-emerald-900 mb-1">Informasi Utama Nominatif Kredit:</h5>
            <ul class="list-disc pl-5 text-sm text-emerald-800 space-y-1">
              <li><strong>Cabang:</strong> Kantor operasional tempat kredit diberikan.</li>
              <li><strong>Nofas (CIF):</strong> Nomor Fasilitas atau nomor identitas nasabah di sistem bank.</li>
              <li><strong>Nama Debitur:</strong> Nama lengkap nasabah penerima fasilitas.</li>
              <li><strong>Jenis Produk Kredit:</strong> Kategori kredit (Konsumtif / Produktif).</li>
              <li><strong>Plafond Kredit:</strong> Limit maksimal pinjaman yang disetujui.</li>
              <li><strong>Outstanding Kredit (Baki Debet):</strong> Sisa saldo pokok pinjaman saat ini.</li>
              <li><strong>Jangka Waktu (Tenor):</strong> Durasi pinjaman dalam satuan bulan/tahun.</li>
              <li><strong>Tanggal Pencairan & Jatuh Tempo:</strong> Tanggal awal realisasi dan batas akhir pelunasan.</li>
              <li><strong>Kolektibilitas:</strong> Status kelancaran pembayaran angsuran (Lancar, Kol-2 sd Kol-5).</li>
            </ul>
          </div>
        `
      },
      {
        id: "ch1_2",
        title: "Mengapa Data Nominatif Penting?",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            Dalam dunia perbankan, data nominatif tidak hanya berfungsi sebagai arsip administrasi, tetapi juga menjadi dasar strategis bagi analis maupun staf pemasaran kredit:
          </p>
          <ul class="list-disc pl-5 mb-4 text-slate-600 space-y-2">
            <li><strong>Monitoring kualitas kredit:</strong> Mendeteksi nasabah dengan kolektibilitas menurun sejak dini agar baki debet tidak berujung macet.</li>
            <li><strong>Menyusun strategi pemasaran:</strong> Mengetahui debitur potensial untuk penawaran produk baru, top up plafon, atau penawaran fasilitas kedua.</li>
            <li><strong>Melakukan Cross Selling:</strong> Menawarkan produk lain seperti tabungan, deposito, asuransi, atau layanan mobile banking kepada debitur eksisting yang berkualitas baik.</li>
          </ul>
        `
      },
      {
        id: "ch1_3",
        title: "Jenis-Jenis Data di Excel",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            Memahami tipe data sangat penting karena memengaruhi cara Excel membaca, mengurutkan, menghitung, maupun menganalisis data Anda. Secara umum dibagi menjadi tiga:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-semibold mb-2">TEXT</span>
              <p class="text-xs text-slate-500">Berupa huruf, kata, atau kombinasi huruf-angka yang tidak digunakan untuk kalkulasi matematis. Karakteristik: Rata kiri secara default, tidak bisa dijumlahkan, bisa diurutkan abjad (A-Z).</p>
            </div>
            <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <span class="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-semibold mb-2">NUMBER</span>
              <p class="text-xs text-slate-500">Berupa angka murni yang dapat dihitung (jumlah, rata-rata, rumus matematika). Karakteristik: Rata kanan secara default, dapat digunakan dalam rumus matematika (SUM, AVERAGE).</p>
            </div>
            <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <span class="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-semibold mb-2">DATE</span>
              <p class="text-xs text-slate-500">Menunjukkan tanggal atau waktu tertentu. Karakteristik: Dapat dihitung selisih harinya, diurutkan dari terlama ke terbaru, serta digunakan untuk menghitung sisa waktu jatuh tempo.</p>
            </div>
          </div>
          <p class="text-sm text-red-600 font-medium italic">
            Peringatan: Kesalahan format data (misalnya angka tersimpan sebagai Text) dapat menyebabkan rumus Excel seperti SUM gagal berjalan atau menghasilkan nilai nol!
          </p>
        `
      }
    ],
    challenges: [
      {
        id: "chal1_1",
        title: "Eksplorasi Dataset",
        description: "Mari kenali tabel data nominatif di samping.",
        instructions: "Gunakan menu navigasi Spreadsheet untuk melihat data. Jika sudah paham isi kolomnya, klik tombol 'Selesaikan Misi' untuk melanjutkan.",
        expectedType: "table", // simple completion
        hint: "Misi ini mengenalkan Anda pada layout tabel. Anda hanya perlu meninjau kolom-kolom seperti Nama, Plafond, Outstanding, Tanggal Cair.",
        successMessage: "Bagus! Anda sekarang telah memahami struktur dasar dari data nominatif kredit.",
        completed: false
      }
    ]
  },
  {
    id: 2,
    title: "Mengelola Data",
    subtitle: "Mengurutkan, memfilter, dan menata data agar rapi dan informatif",
    chapters: [
      {
        id: "ch2_1",
        title: "Mengubah Data Menjadi Table (Ctrl + T)",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            <strong>Table</strong> adalah fitur Excel yang mengubah kumpulan data biasa menjadi terstruktur dan dinamis.
          </p>
          <p class="mb-3 text-slate-600 leading-relaxed"><strong>Fungsi Table:</strong></p>
          <ul class="list-disc pl-5 mb-3 text-sm text-slate-600 space-y-1">
            <li>Menambahkan filter otomatis pada setiap header kolom.</li>
            <li>Zebra striping (baris berwarna selang-seling) secara otomatis agar mudah dibaca.</li>
            <li>Rumus otomatis menurun ke bawah (Calculated Columns) ketika ada baris baru.</li>
          </ul>
          <p class="text-sm font-semibold text-slate-700">Langkah-langkah:</p>
          <div class="bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-600 font-mono mb-4">
            1. Blok seluruh area data (Ctrl + A)<br>
            2. Tekan tombol Ctrl + T<br>
            3. Centang pilihan 'My Table Has Headers'<br>
            4. Klik OK
          </div>
        `
      },
      {
        id: "ch2_2",
        title: "Sort (Mengurutkan Data) & Filter (Menyaring Data)",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            <strong>Sort</strong> digunakan untuk mengurutkan data berdasarkan kriteria tertentu (misalnya mengurutkan baki debet terbesar ke terkecil, atau mengurutkan nama abjad A-Z).
          </p>
          <p class="mb-3 text-slate-600 leading-relaxed">
            <strong>Filter</strong> digunakan untuk menyembunyikan sementara baris data yang tidak memenuhi kriteria tertentu (misalnya hanya menampilkan kredit berproduk "Kredit Konsumtif" saja).
          </p>
          <div class="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r mb-3 text-xs text-amber-800">
            <strong>Tips:</strong> Staf pemasaran sering melakukan filter plafond di bawah Rp100 juta untuk mencari prospek nasabah potensial untuk ditawarkan top up atau fasilitas kredit tambahan.
          </div>
        `
      },
      {
        id: "ch2_3",
        title: "Freeze Panes & Conditional Formatting",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            <strong>Freeze Panes:</strong> Mengunci baris paling atas (header) agar tetap terlihat ketika Anda menggulir tabel ke bawah (scroll down). Sangat berguna ketika mengolah ribuan data nasabah.
          </p>
          <p class="mb-3 text-slate-600 leading-relaxed">
            <strong>Conditional Formatting:</strong> Memberikan warna latar belakang atau teks pada sel secara otomatis jika memenuhi kondisi tertentu. Contohnya mewarnai merah bagi nasabah yang baki debetnya tinggi, atau warna hijau bagi nasabah berplafond kecil.
          </p>
        `
      }
    ],
    challenges: [
      {
        id: "chal2_1",
        title: "Format as Table (Ctrl + T)",
        description: "Ubah kumpulan data dasar menjadi format Excel Table terstruktur.",
        instructions: "Klik tombol 'Ctrl + T (Format Table)' pada panel kendali Spreadsheet di sebelah kanan untuk memicu pemformatan tabel dinamis.",
        expectedType: "table",
        hint: "Gunakan tombol kontrol interaktif di atas tabel untuk memformat spreadsheet menjadi Table terstruktur.",
        successMessage: "Hebat! Tabel sekarang terformat secara profesional dengan zebra striping dan filter otomatis di setiap kolom.",
        completed: false
      },
      {
        id: "chal2_2",
        title: "Sort Plafond Terbesar",
        description: "Urutkan debitur berdasarkan Plafond terbesar (Largest to Smallest).",
        instructions: "Klik header kolom 'Plafond' pada tabel lalu pilih menu 'Urutkan Terbesar' (atau gunakan tombol 'Urutkan Plafond Terbesar' di kontrol).",
        expectedType: "sort",
        hint: "Gunakan tombol urutkan Plafond di samping atau klik kontrol Sort.",
        successMessage: "Sempurna! Anda berhasil menempatkan nasabah dengan eksposur plafon terbesar di baris teratas.",
        completed: false
      },
      {
        id: "chal2_3",
        title: "Aktifkan Freeze Top Row",
        description: "Kunci baris header agar tidak ikut bergeser saat digulir.",
        instructions: "Aktifkan 'Freeze Header' dengan mengklik tombol toggle Freeze Panes di panel spreadsheet.",
        expectedType: "freeze",
        hint: "Membantu Anda melihat nama kolom dengan jelas saat scrolling data panjang.",
        successMessage: "Luar biasa! Header tabel sekarang terkunci di posisi atas (sticky header).",
        completed: false
      }
    ]
  },
  {
    id: 3,
    title: "Membersihkan Data",
    subtitle: "Teknik pembersihan data dari spasi berlebih, duplikat, dan kesalahan entri",
    chapters: [
      {
        id: "ch3_1",
        title: "Remove Duplicate (Hapus Duplikasi)",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            Terkadang sistem atau gabungan laporan menghasilkan baris ganda (duplikat). Untuk menghindari kesalahan perhitungan total baki debet atau pencatatan ganda, kita harus menghapusnya berdasarkan CIF unik.
          </p>
          <p class="text-sm font-semibold text-slate-700">Cara di Excel:</p>
          <ul class="list-disc pl-5 mb-4 text-xs text-slate-600 space-y-1">
            <li>Blok data, buka tab <strong>Data</strong> → klik <strong>Remove Duplicates</strong>.</li>
            <li>Pilih kolom penentu duplikasi (misalnya kolom <strong>CIF</strong> atau <strong>Nofas</strong>), lalu klik OK.</li>
          </ul>
        `
      },
      {
        id: "ch3_2",
        title: "Menghapus Spasi Berlebih dengan TRIM",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            Spasi tersembunyi di awal, akhir, atau spasi ganda di tengah teks (misalnya <code>"Andi  "</code> atau <code>"  Budi"</code>) seringkali menyebabkan fungsi pencarian seperti VLOOKUP atau filter gagal mendeteksi nama tersebut.
          </p>
          <p class="mb-3 text-slate-600 leading-relaxed">
            Fungsi <strong>=TRIM(text)</strong> berguna untuk membersihkan semua spasi berlebih tersebut secara otomatis, menyisakan hanya satu spasi antar kata.
          </p>
          <div class="bg-emerald-50 border-l-4 border-excel-green p-3 rounded mb-3">
            <span class="text-xs font-mono font-bold text-excel-green">=TRIM(A2)</span>
            <p class="text-xs text-slate-500 mt-1">Mengembalikan teks di A2 yang sudah bersih dari spasi awal dan spasi akhir.</p>
          </div>
        `
      },
      {
        id: "ch3_3",
        title: "Find & Replace (Cari & Ganti)",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            Digunakan untuk mengganti data secara massal. Contoh konkrit perbankan: Terdapat perubahan nama unit kerja dari "Kantor Pusat Ambon" menjadi "KC AMBON". Dibanding menggantinya satu-satu secara manual, Anda bisa menggunakan shortcut <strong>Ctrl + H</strong>.
          </p>
          <div class="bg-slate-50 border border-slate-200 rounded p-3 text-xs font-mono text-slate-600 mb-3">
            1. Tekan Ctrl + H<br>
            2. Find What: Kantor Pusat Ambon<br>
            3. Replace With: KC AMBON<br>
            4. Klik 'Replace All'
          </div>
        `
      }
    ],
    challenges: [
      {
        id: "chal3_1",
        title: "Hapus Baris Duplikat",
        description: "Hapus CIF ganda untuk menghindari double counting debitur.",
        instructions: "Identifikasi baris duplikat (debitur 'Andi' dengan CIF 10001 muncul dua kali). Klik tombol 'Hapus Duplikat' di atas tabel spreadsheet.",
        expectedType: "remove_duplicate",
        hint: "Baris dengan CIF 10001 ada dua buah. Menghapusnya menyisakan data unik.",
        successMessage: "Kerja bagus! Baris duplikat Andi berhasil dihapus, total debitur sekarang akurat.",
        completed: false
      },
      {
        id: "chal3_2",
        title: "Ganti Nama Kantor Cabang",
        description: "Lakukan koreksi massal nama cabang 'Kantor Pusat Ambon' menjadi 'KC AMBON'.",
        instructions: "Gunakan tombol input 'Replace' di bagian aksi data: Masukkan kata 'Kantor Pusat Ambon' untuk dicari dan ganti dengan 'KC AMBON'.",
        expectedType: "replace",
        hint: "Ketik 'Kantor Pusat Ambon' di kolom cari dan 'KC AMBON' di kolom ganti lalu klik Replace.",
        successMessage: "Luar biasa! Seluruh nama kantor cabang sekarang seragam menjadi KC AMBON.",
        completed: false
      }
    ]
  },
  {
    id: 4,
    title: "Rumus Dasar",
    subtitle: "Menguasai rumus wajib: IF, SUM, COUNT, SUBTOTAL, TODAY, dan DATEDIF",
    chapters: [
      {
        id: "ch4_1",
        title: "Fungsi Logika IF",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            Fungsi <strong>IF</strong> digunakan untuk menguji suatu kondisi dan menghasilkan nilai tertentu jika kondisi BENAR, dan nilai lain jika SALAH.
          </p>
          <div class="bg-slate-50 border border-slate-200 rounded p-3 text-xs font-mono text-slate-600 mb-3">
            Sintaks: =IF(logical_test, value_if_true, value_if_false)
          </div>
          <p class="mb-3 text-slate-600 leading-relaxed">
            <strong>Contoh Kasus Pemasaran:</strong> Kita ingin menyaring nasabah dengan plafon &le; Rp100 juta sebagai "TARGET" pemasaran kredit mikro tambahan, sedangkan plafon besar sebagai "NON TARGET".
          </p>
          <div class="bg-emerald-50 border border-emerald-200 p-2 rounded text-xs font-mono text-emerald-800 mb-2">
            =IF(E2<=100000000, "TARGET", "NON TARGET")
          </div>
        `
      },
      {
        id: "ch4_2",
        title: "SUM vs SUBTOTAL",
        contentHtml: `
          <p class="mb-2 text-slate-600 leading-relaxed">
            <strong>=SUM(range):</strong> Menjumlahkan seluruh angka di dalam rentang sel, termasuk baris yang disembunyikan oleh filter.
          </p>
          <p class="mb-3 text-slate-600 leading-relaxed">
            <strong>=SUBTOTAL(function_num, range):</strong> Hanya menjumlahkan baris yang <em>terlihat</em> setelah difilter. Ini sangat ideal untuk rekap cepat portofolio kredit per produk atau cabang tanpa merusak tabel.
          </p>
          <div class="bg-amber-50 border border-amber-200 p-3 rounded text-xs text-amber-800 mb-3">
            <strong>Kode fungsi SUBTOTAL yang sering dipakai:</strong><br>
            - <strong>9</strong>: SUM (Penjumlahan)<br>
            - <strong>1</strong>: AVERAGE (Rata-rata)<br>
            - <strong>2</strong>: COUNT (Menghitung jumlah angka)<br>
            - <strong>3</strong>: COUNTA (Menghitung jumlah sel berisi teks/angka)
          </div>
          <p class="text-xs text-slate-500 font-mono">Contoh: =SUBTOTAL(9, F2:F7) &rarr; Menjumlahkan outstanding nasabah yang lolos filter saja.</p>
        `
      },
      {
        id: "ch4_3",
        title: "TODAY & DATEDIF",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            <strong>=TODAY():</strong> Menampilkan tanggal hari ini secara dinamis berdasarkan jam komputer.
          </p>
          <p class="mb-3 text-slate-600 leading-relaxed">
            <strong>=DATEDIF(start_date, end_date, unit):</strong> Menghitung selisih antara dua tanggal dalam satuan tertentu.
          </p>
          <p class="text-xs text-slate-700 font-semibold mb-1">Pilihan Unit DATEDIF:</p>
          <ul class="list-disc pl-5 text-xs text-slate-600 space-y-1 mb-3">
            <li><code>"Y"</code>: Selisih tahun penuh (contoh: untuk menghitung Usia Debitur).</li>
            <li><code>"M"</code>: Selisih bulan penuh (contoh: untuk menghitung masa tenor berjalan).</li>
            <li><code>"D"</code>: Selisih hari penuh (contoh: menghitung usia tunggakan).</li>
          </ul>
          <p class="text-xs text-slate-500 font-mono">Rumus Usia: =DATEDIF(Tanggal_Lahir, TODAY(), "Y")</p>
        `
      }
    ],
    challenges: [
      {
        id: "chal4_1",
        title: "Tulis Rumus IF Target Pemasaran",
        description: "Masukkan rumus IF pada kolom Status untuk memilah target plafond <= Rp100.000.000.",
        instructions: "Ketik rumus ini di bilah formula bar atas atau klik tombol 'Isi Rumus IF' untuk mengaktifkannya: `=IF(E2<=100000000,\"TARGET\",\"NON TARGET\")`",
        expectedType: "formula",
        targetColumn: "status",
        expectedValueDescription: "=IF(E2<=100000000,\"TARGET\",\"NON TARGET\")",
        hint: "Ketik `=IF(E2<=100000000,\"TARGET\",\"NON TARGET\")` pada input formula bar lalu tekan tombol Enter/Apply.",
        successMessage: "Sangat baik! Kolom Status sekarang terisi otomatis. Anda berhasil memilah debitur target mikro (< 100jt).",
        completed: false
      },
      {
        id: "chal4_2",
        title: "Hitung Usia Debitur dengan DATEDIF",
        description: "Gunakan rumus DATEDIF untuk menghitung usia masing-masing debitur.",
        instructions: "Gunakan tanggal lahir nasabah (kolom Tanggal Lahir) dengan rumus: `=DATEDIF(K2,TODAY(),\"Y\")` di kolom Usia.",
        expectedType: "formula",
        targetColumn: "usia",
        expectedValueDescription: "=DATEDIF(K2,TODAY(),\"Y\")",
        hint: "Ketik `=DATEDIF(K2,TODAY(),\"Y\")` di bilah rumus untuk menghitung selisih tahun dari Tanggal Lahir.",
        successMessage: "Hebat! Kolom Usia terisi dengan umur nasabah dalam satuan tahun penuh.",
        completed: false
      }
    ]
  },
  {
    id: 5,
    title: "Analisa Sederhana",
    subtitle: "Menggabungkan semua teknik untuk menghasilkan laporan analisa cepat",
    chapters: [
      {
        id: "ch5_1",
        title: "Studi Kasus Analisis Kredit",
        contentHtml: `
          <p class="mb-3 text-slate-600 leading-relaxed">
            Sekarang Anda telah menguasai dasar-dasar Excel: Sort, Filter, Table, Clean, IF, SUBTOTAL, dan DATEDIF.
          </p>
          <p class="mb-3 text-slate-600 leading-relaxed">
            Mari kita gabungkan kemampuan ini untuk menjawab 3 pertanyaan pimpinan bank secara kilat:
          </p>
          <ol class="list-decimal pl-5 text-sm text-slate-600 space-y-2 mb-4">
            <li><strong>Berapa total outstanding khusus untuk produk "Kredit Konsumtif" setelah difilter?</strong> (Gunakan Filter Produk + Rumus SUBTOTAL).</li>
            <li><strong>Siapa nasabah yang memiliki baki debet tertinggi saat ini?</strong> (Gunakan Sort Outstanding terbesar).</li>
            <li><strong>Berapa jumlah debitur dari instansi "Pemerintah Daerah"?</strong> (Gunakan fungsi COUNTIF).</li>
          </ol>
        `
      },
      {
        id: "ch5_2",
        title: "Menghitung Jumlah dengan COUNTIF",
        contentHtml: `
          <p class="mb-2 text-slate-600 leading-relaxed">
            Fungsi <strong>=COUNTIF(range, kriteria)</strong> berguna untuk menghitung jumlah sel yang memenuhi syarat tertentu tanpa perlu menyaringnya satu per satu.
          </p>
          <p class="text-xs text-slate-700 font-semibold mb-1">Contoh Penggunaan:</p>
          <ul class="list-disc pl-5 text-xs text-slate-600 space-y-1">
            <li><code>=COUNTIF(D2:D8, "Kredit Konsumtif")</code> &rarr; Menghitung jumlah nasabah konsumtif.</li>
            <li><code>=COUNTIF(L2:L8, "Pemerintah Daerah")</code> &rarr; Menghitung nasabah dari instansi pemda.</li>
          </ul>
        `
      }
    ],
    challenges: [
      {
        id: "chal5_1",
        title: "Hitung Jumlah Debitur Konsumtif",
        description: "Gunakan COUNTIF untuk menghitung berapa banyak debitur dengan produk Kredit Konsumtif.",
        instructions: "Di Spreadsheet Simulator, masukkan rumus ini di bilah formula untuk menganalisa: `=COUNTIF(D2:D8,\"Kredit Konsumtif\")`",
        expectedType: "formula",
        expectedValueDescription: "=COUNTIF(D2:D8,\"Kredit Konsumtif\")",
        hint: "Ketik `=COUNTIF(D2:D8,\"Kredit Konsumtif\")` untuk menghitung jumlah baris yang memiliki nilai 'Kredit Konsumtif' pada kolom Produk.",
        successMessage: "Sempurna! Formula mengembalikan nilai 4 nasabah Konsumtif. Analisa Anda sangat akurat!",
        completed: false
      },
      {
        id: "chal5_2",
        title: "Filter Kredit Produktif",
        description: "Tampilkan hanya baris yang memiliki produk Kredit Produktif.",
        instructions: "Gunakan kontrol filter produk di panel tabel atau klik tombol 'Filter Kredit Produktif'.",
        expectedType: "filter",
        hint: "Filter kolom Produk hanya untuk 'Kredit Produktif'.",
        successMessage: "Luar biasa! Tabel sekarang hanya menampilkan portofolio produktif bank.",
        completed: false
      }
    ]
  }
];
