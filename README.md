# 💸 Transaksiku — Aplikasi Simulasi Transfer Digital

Aplikasi simulasi transaksi digital modern berbasis **React.js** + **Tailwind CSS**, dilengkapi dengan fitur transfer, riwayat transaksi, dan dashboard interaktif.

---

## 🖥️ Preview

Tampilan aplikasi seperti sistem perbankan digital — dengan **login, dashboard interaktif, form transfer, dan riwayat transaksi real-time.**

---

## 🚀 Fitur Utama

✅ **Autentikasi Dummy Login**  
Masuk menggunakan akun dummy dari file `Dummy.js` (simulasi user login).

✅ **Transfer Uang Digital**  
Form interaktif untuk simulasi pengiriman uang antar pengguna.

✅ **Riwayat Transaksi Dinamis**  
Daftar transaksi otomatis terupdate & tersimpan di `localStorage` (per-user).

✅ **Dashboard Ringkasan Finansial**  
Menampilkan saldo, total transaksi, total transfer, dan aktivitas terbaru.

✅ **Proteksi Halaman (Route Guard)**  
Halaman admin hanya bisa diakses jika user sudah login.

✅ **UI Modern + UX Friendly**  
Desain clean dengan Tailwind + komponen reusable dan validasi form interaktif.

---

## 🧠 Tech Stack

| Kategori | Teknologi |
|-----------|------------|
| 🧩 Frontend | [React.js (Vite)](https://vitejs.dev/) |
| 🎨 Styling | [Tailwind CSS](https://tailwindcss.com/) |
| 🔔 Notifikasi | [React Hot Toast](https://react-hot-toast.com/) |
| ⚡ Interaksi UI | [SweetAlert2](https://sweetalert2.github.io/) |
| 💾 Penyimpanan Data | `localStorage` |
| 🧭 Routing | [React Router DOM v6](https://reactrouter.com/en/main) |

---

## 📂 Struktur Folder
```bash
src/
├── App.jsx
├── main.jsx
├── index.css
│
├── assets/
│ └── (gambar/logo/icon)
│
├── Components/
│ ├── Button.jsx
│ ├── Header.jsx
│ ├── Input.jsx
│ ├── Modal.jsx
│ ├── Sidebar.jsx
│ └── Card.jsx
│
├── Layouts/
│ └── AdminLayout.jsx
│
├── Pages/
│ ├── Auth/
│ │ └── Login.jsx
│ │
│ ├── Dashboard/
│ │ ├── DashboardPage.jsx
│ │ └── Components/
│ │ └──── DashboardCard.jsx
│ │
│ └── Transfer/
│ ├── TransferPage.jsx
│ └── Components/
│ ├──── TransferForm.jsx
│ ├──── TransactionList.jsx
│ └──── TransactionCard.jsx
│
├── Routes/
│ ├── Router.jsx
│ └── ProtectedRoute.jsx
│
├── Data/
│ └── Dummy.js
│
└── Utils/
└── Helpers/
├──── SwalHelpers.js
└──── ToastHelpers.js
```
---

## ⚙️ Cara Menjalankan Proyek

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<username>/transaksiku.git
cd transaksiku
```

### 2️⃣ Clone Repository
```bash
npm install
```

### 3️⃣ Jalankan Project
```bash
npm run dev
```

### 4️⃣ Jalankan Project
```bash
http://localhost:5173
```

