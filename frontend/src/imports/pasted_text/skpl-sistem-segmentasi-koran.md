# Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SKPL)
**Nama Sistem:** Sistem Segmentasi Layout Koran Berbasis AI
**Versi:** 1.0

---

## 1. Pendahuluan

### 1.1 Tujuan Penulisan Dokumen
Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SKPL) ini bertujuan untuk menjabarkan seluruh kebutuhan fungsional dan non-fungsional dari **Sistem Segmentasi Layout Koran Berbasis AI**. Dokumen ini akan menjadi acuan dasar dalam proses pengembangan, pengujian, dan pemeliharaan antarmuka serta fungsionalitas sistem.

### 1.2 Lingkup Masalah
Sistem ini merupakan aplikasi berbasis web yang berfungsi untuk mengekstraksi dan mensegmentasi tata letak (layout) pada citra koran digital. Sistem ini memanfaatkan model *Artificial Intelligence* (AI) di latar belakang (Python) yang dipanggil melalui antarmuka web (Laravel). Terdapat dua aktor utama dalam sistem ini, yaitu **Admin** dan **User**.

### 1.3 Definisi dan Singkatan
- **AI (Artificial Intelligence):** Kecerdasan buatan yang memproses gambar koran untuk mendeteksi area tata letaknya.
- **Admin:** Pengelola sistem yang memiliki hak akses penuh terhadap manajemen pengguna dan analisis data agregat.
- **User:** Pengguna akhir yang menggunakan sistem untuk mengunggah dan memproses citra koran miliknya.
- **ZIP/JSON:** Format luaran dari proses segmentasi yang dapat diunduh pengguna.

---

## 2. Deskripsi Umum Sistem

### 2.1 Proses Bisnis Secara Umum
1. Pengguna (Admin/User) masuk ke dalam sistem menggunakan otentikasi (Username dan Password).
2. Pengguna mengunggah gambar/dokumen koran (PNG, JPG, PDF, ZIP) melalui *Workspace*.
3. Sistem menyimpan unggahan dan statusnya menjadi *Pending*.
4. Pengguna menekan tombol proses, sistem akan memanggil API AI. Status berubah menjadi *Processing*.
5. Setelah selesai, status berubah menjadi *Completed*. Pengguna dapat melihat *preview* hasil segmentasi dan mengunduh format ZIP beserta anotasinya.
6. Admin memiliki hak tambahan untuk memantau aktivitas unggahan secara global dan mengelola data User.

### 2.2 Karakteristik Pengguna
| Kategori Pengguna | Hak Akses Utama |
| :--- | :--- |
| **Admin** | Memiliki akses ke Dashboard Analitik, Manajemen Pengguna (CRUD), dan fitur *Workspace* (proses koran) secara penuh. |
| **User** | Hanya memiliki akses ke *Workspace* milik pribadinya untuk mengunggah, memproses, melihat riwayat, dan menghapus filenya sendiri. |

### 2.3 Karakteristik Model AI (Artificial Intelligence)
Sistem ini memisahkan beban kerja komputasi cerdas (AI) ke dalam sebuah API terpisah berbasis **Python** (menggunakan *framework* Flask). Adapun karakteristik teknis dari model AI yang digunakan adalah sebagai berikut:
1. **Arsitektur Model:** Menggunakan model **YOLO** (*You Only Look Once*), secara spesifik menggunakan *library* `ultralytics` (YOLOv8) yang sangat tangguh dalam mendeteksi objek dan melakukan segmentasi (*Instance Segmentation* / *Object Detection*).
2. **Framework Deep Learning:** Model dijalankan di atas *framework* **PyTorch** (`torch`, `torchvision`) yang memungkinkan komputasi berjalan di CPU maupun GPU (jika tersedia).
3. **Pemrosesan PDF:** Jika pengguna mengunggah file koran berformat PDF, sistem AI menggunakan pustaka `PyMuPDF` untuk membaca dan mengubah halaman PDF menjadi representasi gambar sebelum di-inferensi oleh model YOLO.
4. **Alur Inferensi:**
   - Aplikasi web (Laravel) mengirimkan gambar ke *endpoint* API Flask.
   - Model YOLO memproses gambar tersebut untuk mengidentifikasi tata letak koran (seperti: judul, artikel, gambar, iklan).
   - Python memotong (*crop*) bagian-bagian tersebut berdasarkan *bounding box* hasil segmentasi.
   - Hasil akhirnya dikompresi menjadi file **ZIP** yang berisi gambar potongan dan metadata berformat **JSON**. JSON ini berisi informasi koordinat dan label kelas yang kompatibel dengan perangkat lunak pengguna.

---

## 3. Spesifikasi Kebutuhan Fungsional

Kebutuhan fungsional dijabarkan berdasarkan fitur yang dapat diakses oleh masing-masing peran (aktor).

### 3.1 Kebutuhan Fungsional Administrator (Admin)

| ID Kebutuhan | Deskripsi Fitur | Keterangan |
| :--- | :--- | :--- |
| **F-ADM-01** | **Login Admin** | Admin dapat melakukan *login* menggunakan *username* dan *password* untuk masuk ke *Admin Dashboard*. |
| **F-ADM-02** | **Melihat Statistik Global** | Admin dapat melihat total unggahan, total proses berjalan, proses selesai, dan jumlah pengguna terdaftar pada kartu metrik. |
| **F-ADM-03** | **Melihat Grafik Analitik** | Admin dapat melihat visualisasi data berupa *Line Chart* (Tren Upload) dan *Doughnut Chart* (Rasio Status Pemrosesan). |
| **F-ADM-04** | **Filter Rentang Waktu** | Admin dapat menyaring data pada *Dashboard* berdasarkan rentang waktu tertentu (7, 14, 30 hari terakhir). |
| **F-ADM-05** | **Manajemen Pengguna (C)** | Admin dapat menambahkan data pengguna baru melalui *pop-up modal*. |
| **F-ADM-06** | **Manajemen Pengguna (R)** | Admin dapat melihat seluruh daftar pengguna, melakukan pencarian (*search*), dan melihat detail pengguna (*pop-up detail*). |
| **F-ADM-07** | **Manajemen Pengguna (U)** | Admin dapat mengubah data pengguna melalui *pop-up modal edit*. |
| **F-ADM-08** | **Manajemen Pengguna (D)** | Admin dapat menghapus data pengguna (*soft delete*) yang akan menampilkan *pop-up* konfirmasi penghapusan. |
| **F-ADM-09** | **Akses Workspace Sistem** | Admin dapat mengakses halaman *Workspace* untuk melakukan unggahan atau pemrosesan secara langsung. |

### 3.2 Kebutuhan Fungsional Pengguna (User)

| ID Kebutuhan | Deskripsi Fitur | Keterangan |
| :--- | :--- | :--- |
| **F-USR-01** | **Login User** | User dapat melakukan *login* menggunakan *username* dan *password* yang telah dibuat oleh Admin. Setelah *login* akan diarahkan ke *User Workspace*. |
| **F-USR-02** | **Melihat Statistik Personal** | User dapat melihat jumlah unggahannya sendiri (Total unggah, sedang diproses, selesai, dan waktu pembaruan terakhir). |
| **F-USR-03** | **Mengunggah File (Dropzone)** | User dapat melakukan *drag-and-drop* atau klik untuk mengunggah file gambar (PNG, JPG), PDF, atau file ZIP arsip koran. |
| **F-USR-04** | **Melihat Riwayat Unggahan** | User dapat melihat tabel riwayat file miliknya (Nama file, waktu unggah, status). Tabel ini dilengkapi fitur pencarian data (*search*). |
| **F-USR-05** | **Menjalankan Pemrosesan AI** | User dapat menekan tombol untuk memerintahkan sistem memproses (*segmenting*) gambar yang bersatus *Pending*. |
| **F-USR-06** | **Melihat Preview Hasil** | User dapat mengklik ikon mata untuk membuka *pop-up modal* yang menampilkan gambar pratinjau (*preview*) dari hasil segmentasi AI. |
| **F-USR-07** | **Mengunduh Hasil** | User dapat menekan tombol unduh untuk menyimpan hasil AI berupa file ZIP terstruktur (berisi gambar ter-crop dan metadata JSON). |
| **F-USR-08** | **Menghapus File** | User dapat menghapus unggahannya. Proses ini akan menampilkan *pop-up modal* konfirmasi "Yakin mau menghapus?". |
| **F-USR-09** | **Logout** | User dapat keluar dari sistem (*logout*). |

---

## 4. Spesifikasi Kebutuhan Antarmuka (UI/UX)

Kebutuhan antarmuka secara spesifik didesain untuk memberikan pengalaman pengguna yang modern dan ramah:

- **Tema Desain:** Menggunakan pendekatan modern minimalis dengan sudut-sudut komponen yang melengkung (*rounded corners*) dan efek bayangan lembut (*soft drop shadow*).
- **Palet Warna:** Menggunakan dominasi warna latar putih dan abu-abu terang, dipadukan dengan warna-warna pastel (*soft pink, orange, mint green, lavender*) untuk *badge*, tombol aksi, dan kartu metrik.
- **Interaksi Modal (Pop-up):** Seluruh aksi penting (*Preview* gambar, konfirmasi penghapusan, detail pengguna, tambah pengguna, edit pengguna) harus dilakukan tanpa pindah halaman, melainkan menggunakan sistem lapisan (*overlay modal*).
- **Tipografi:** Menggunakan *font sans-serif* modern dan bersih seperti *Plus Jakarta Sans* atau *Inter* untuk keterbacaan tingkat tinggi.
- **Navigasi:** Navigasi dilakukan melalui *Sidebar* di sisi kiri. Untuk admin terdapat menu **Dashboard** (Analitik), **Workspace**, dan **Manajemen Pengguna**. Untuk User hanya terdapat **Workspace**. Search *global* ditiadakan dan difokuskan pada fungsional *search* per tabel.

---

## 5. Kebutuhan Non-Fungsional

1. **Keamanan:** Sistem mengimplementasikan otentikasi pengguna berbasis *role* (RBAC) dan *Soft-Delete* agar rekam jejak data tidak benar-benar hilang dari pangkalan data. Data antar-user saling terisolasi.
2. **Kinerja:** Sistem harus dapat menangani proses unggahan yang cukup besar (maks 50MB) dan memberikan *feedback loading* (indikator proses) pada antarmuka saat AI memproses data.
3. **Ketersediaan Akses:** Desain antarmuka harus *responsive* agar fungsionalitas utama (*Workspace* dan tabel) tetap dapat digunakan minimal pada tampilan *Tablet*. 
