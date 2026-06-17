# Notes App — Frontend

Frontend aplikasi catatan dengan React + Vite.

## Persyaratan

- Node.js 20 atau lebih baru
- Salah satu backend Notes API berjalan (Express di port 5000 atau Django di port 8000)

## Menjalankan Secara Lokal

1. Salin file contoh environment lalu sesuaikan isinya:

   ```bash
   cp .env.example .env
   ```

2. Pasang dependensi lalu jalankan server pengembangan:

   ```bash
   npm install
   npm run dev
   ```

3. Buka `http://localhost:5173`.

## Build Produksi

```bash
npm run build     # menghasilkan folder dist/
npm run preview   # mencoba hasil build secara lokal
```

## Halaman

| Rute | Halaman | Butuh login |
|---|---|---|
| `/login` | Masuk | — |
| `/register` | Daftar | — |
| `/` | Daftar catatan | ✓ |
| `/notes/:id` | Detail catatan | ✓ |
| `/add` | Tambah catatan | ✓ |
