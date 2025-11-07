# 💸 Transaksiku — Aplikasi Simulasi Transfer Digital

Aplikasi simulasi transaksi digital modern berbasis **React.js** + **Tailwind CSS**, dilengkapi dengan fitur transfer, riwayat transaksi, dan dashboard interaktif.

---

## 🖥️ Preview

Tampilan aplikasi seperti sistem perbankan digital — dengan **login, dashboard interaktif, form transfer, dan riwayat transaksi real-time.**
**Login**
<img width="1920" height="931" alt="image" src="https://github.com/user-attachments/assets/5f437b00-fe58-4daf-a8f6-477a4f31978c" />

**Dashboard**
<img width="1911" height="920" alt="image" src="https://github.com/user-attachments/assets/8c1ecf47-6a5c-4791-a316-5e2cea9ddcd3" />

**Transfer**
<img width="1890" height="913" alt="image" src="https://github.com/user-attachments/assets/c7391429-6b14-4c76-a142-f052897c84ec" />
<img width="1882" height="913" alt="image" src="https://github.com/user-attachments/assets/ab59c3c7-6d44-4d32-856c-7dc51e8858dc" />
<img width="1897" height="912" alt="image" src="https://github.com/user-attachments/assets/9c8fc406-9e86-44ae-bf56-735689dbf8d8" />





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

