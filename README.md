# ToolVerse — Green Glass Toolkit

Starter website statis berisi katalog 50 tools, UI green/white glassmorphism, bubble ambience, animasi ringan, pencarian, filter kategori, favorit sesi, modal tools, dan mode gelap.

## Deploy ke Vercel
1. Ekstrak ZIP ini.
2. Upload folder project ke repository GitHub.
3. Di Vercel pilih **Add New → Project**, lalu import repository.
4. Framework preset: **Other**. Build Command dan Output Directory bisa dikosongkan (atau Output Directory `.`).
5. Deploy.

Alternatif: jalankan `npx vercel` dari folder project jika Vercel CLI sudah terpasang.

## Catatan fitur
- Banyak tool browser sudah memiliki fungsi dasar; beberapa kartu merupakan starter/roadmap dan ditandai di panelnya.
- Direct Video Downloader hanya mendukung direct URL file video publik yang memang bisa diakses, bukan ekstraksi dari URL halaman TikTok/Instagram/YouTube/Facebook.
- Jangan melewati login, DRM, paywall, atau batasan platform. Pastikan kamu memiliki hak/izin atas konten.
- QR generator memakai layanan pihak ketiga dan mengirim teks/URL yang dimasukkan ke layanan tersebut. Jangan masukkan informasi sensitif.
- Google Fonts dan QR generator memerlukan koneksi internet.
- Tidak ada backend/database dalam starter statis ini. Untuk fitur server-side/API, tambahkan backend dan ikuti aturan platform serta hukum yang berlaku.

## Struktur
- `index.html` — struktur halaman
- `style.css` — gaya glassmorphism, responsive layout, animasi
- `app.js` — katalog 50 tools dan fungsi browser
- `vercel.json` — header keamanan dasar untuk Vercel
