# Project Management Backend API (Express + MySQL)

## 📝 Deskripsi
REST API ini berfungsi sebagai otak dari aplikasi Project Management, mengelola resource **Users**, **Projects**, dan **Tasks**. Dibangun menggunakan **Express.js** dengan arsitektur **MVC** (Model-View-Controller) untuk memastikan kode yang terorganisir dan mudah dikelola.

## 📂 Struktur Folder
- `models/`: Definisi skema data dan interaksi langsung ke MySQL.
- `controllers/`: Logika bisnis (Register, Login, CRUD Project/Task).
- `routes/`: Definisi endpoint API.
- `middlewares/`: Autentikasi JWT dan validasi input.

## ⚙️ Cara Menjalankan
Karena proyek ini sudah terintegrasi dengan Docker, Anda tidak perlu menginstal database secara manual di lokal.

1. Pastikan file `.env` sudah dikonfigurasi (sudah tersedia di root proyek).
2. Jalankan perintah dari root folder:
   ```bash
   docker-compose up backend