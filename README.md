# Project Management Application (PWL UAS)

Aplikasi manajemen proyek berbasis web yang dibangun dengan **Vue.js (Frontend)**, **Express.js (Backend)**, dan **MySQL (Database)**. Seluruh ekosistem aplikasi ini dijalankan menggunakan **Docker Compose** untuk memastikan kemudahan deployment.

## 🚀 Fitur Utama
* **Autentikasi & Otorisasi**: Login dan Register menggunakan JWT (JSON Web Token).
* **Manajemen Proyek**: Fitur CRUD (Create, Read, Update, Delete) untuk data proyek.
* **Relasi One-to-Many**: Setiap proyek dapat memiliki banyak tugas (Tasks).
* **Role Management**: Admin dapat mengubah role user dan memiliki akses penuh untuk menghapus data.

## 🛠️ Stack Teknologi
* **Frontend**: Vue.js 3, Vite, Tailwind CSS.
* **Backend**: Node.js, Express.js, MySQL.
* **Database**: MySQL 8.0.
* **Containerization**: Docker & Docker Compose.

## 📦 Cara Menjalankan Aplikasi

Pastikan Anda sudah menginstal [Docker Desktop](https://www.docker.com/products/docker-desktop/).

1. **Clone Repository**
   ```bash
   git clone <link-repo-anda>
   cd pwl25-project

2. **Jalankan Docker Compose**
    ```bash
    docker-compose up --build
    ```

3. **Akses Aplikasi**
* **Frontend**: https://localhost:5173
* **Backend**: https://localhost:3000

## Akun Default (Uji Coba)
Jika anda tidak ingin melakukan registrasi manual, anda dapat mengubah user biasa menjadi admin melalui terminal
```bash
docker exec -it mysql_db mysql -u root pm_app -e "UPDATE users SET role = 'admin' WHERE email = 'email_anda@mail.com';"
```