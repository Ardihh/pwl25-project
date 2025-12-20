# 🖼️ Project Management Frontend (Vue.js 3)
## 📝 Deskripsi
Bagian ini adalah antarmuka pengguna (UI) yang dibangun menggunakan Vue.js 3 dan Vite. Frontend ini berfungsi untuk mengelola interaksi pengguna, mulai dari autentikasi hingga manajemen proyek dan tugas secara visual.

## 📂 Struktur Folder
- src/views/: Berisi halaman utama seperti Dashboard, Login, Register, dan Admin.
- src/components/: Komponen UI yang dapat digunakan kembali (Navbar, Sidebar, Card).
- src/router/: Konfigurasi rute aplikasi menggunakan Vue Router.
- src/services/: Berisi fungsi untuk melakukan request API ke backend.

## ⚙️ Cara Menjalankan
Aplikasi ini sudah dikemas menggunakan Nginx di dalam Docker untuk performa produksi yang stabil.

Pastikan kontainer backend sudah berjalan.

Jalankan dari root folder:
```bash
docker-compose up frontend
```
Akses di browser: http://localhost:5173.

## 💻 Potongan Kode & Penjelasan
1. Interaksi API dengan Axios
Bagian ini menangani pengiriman token JWT ke backend agar user bisa mengakses data terproteksi.

```JavaScript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api' // Menghubungkan ke port backend Express
});

// Menambahkan token JWT secara otomatis ke Header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Format standar JWT
  }
  return config;
});
```
Penjelasan: Interceptor ini memastikan setiap kali aplikasi meminta data (seperti list proyek), token keamanan selalu disertakan agar tidak terkena error 401 Unauthorized.

2. Guarding Routes (Keamanan Halaman)
Memastikan halaman Dashboard atau Admin tidak bisa dibuka jika user belum login.

```JavaScript
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Lempar balik ke login jika tidak ada token
  } else {
    next();
  }
});
```
3. Rendering Relasi (One-to-Many)
Menampilkan daftar tugas (Tasks) yang dimiliki oleh sebuah proyek di halaman Detail.
```HTML
<div v-for="task in project.tasks" :key="task.id">
  <h4>{{ task.name }}</h4>
  <p>{{ task.status }}</p>
</div>
```
Penjelasan: Kode ini membuktikan implementasi relasi database di mana satu proyek memiliki banyak tugas (tasks) yang ditampilkan secara dinamis.