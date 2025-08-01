# TodoTask App 📝

Aplikasi TodoTask sederhana yang memungkinkan pengguna untuk mencatat, mengedit, dan menghapus daftar tugas. Project ini dibangun menggunakan stack Laravel sebagai backend dan React (Vite) sebagai frontend.

---

## 🚀 Instruksi Setup Project

### 📦 Backend (Laravel + Vite)

1. Masuk ke folder `backend`:
- cd backend

2. Install dependency PHP:
- composer install

3. Copy file environment:
- cp .env.example .env
- php artisan key:generate

4. Konfigurasi database di file `.env`, lalu jalankan migrasi dan seeder:
- php artisan migrate --seed

Catatan: Pastikan seeder kamu sudah terdaftar di DatabaseSeeder.php, misalnya:
``$this->call(UserSeeder::class);

5. Install dependency frontend Laravel (Vite, Tailwind, dsb):
- npm install


6. Jalankan Vite:
npm run dev

7. Jalankan Laravel server:
php artisan serve

8. Akses backend melalui:
http://127.0.0.1:8000


---

### 🎨 Frontend (React + Vite)

1. Masuk ke folder `frontend`:
cd frontend

2. Install dependency:
npm install

3. Jalankan frontend:
npm run dev

4. Buka browser dan akses:
http://localhost:5173

---

## 📁 Struktur Folder Proyek

todotask-app/
├── frontend/ # React + Vite app
│ ├── index.html
│ └── src/
├── backend/ # Laravel API
│ ├── app/
│ ├── resources/
│ └── routes/api.php
├── README.md

---

## 🛠️ Teknologi yang Digunakan

### Backend:
- Laravel 10
- Vite (untuk asset build)
- MySQL
- Composer
- PHP 8.x

### Frontend:
- React.js
- Vite
- Tailwind CSS
- Axios

---

## ✅ Fitur

- Tambah tugas
- Edit tugas
- Hapus tugas
- Tandai tugas selesai (opsional)
- Integrasi backend & frontend melalui REST API

---

## 🧑‍💻 Developer

> Dibuat oleh Anisa — untuk belajar dan mengembangkan aplikasi produktivitas sederhana berbasis full