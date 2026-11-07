INDONESIAN TOBACCO — Dashboard Katalog Informasi
==================================

Struktur:
- index.html        Struktur halaman
- css/style.css     Seluruh styling
- js/app.js         Data katalog, pencarian, dan filter
- assets/products/  Simpan foto produk Anda di sini

Cara memasang foto:
1. Salin foto produk ke folder assets/products/.
2. Buka js/app.js.
3. Ubah properti image pada setiap produk. Contoh:
   image: "assets/products/foto-kretek.jpg"
4. Ubah name, category, dan description sesuai data katalog Anda.
5. Simpan lalu buka index.html di browser.

Kategori yang tersedia pada contoh:
- Kretek
- Filter
- Linting

Untuk menambah produk:
Tambahkan objek baru ke array `products` di js/app.js dan pastikan
nilai category sesuai salah satu opsi filter, atau tambahkan opsi kategori
baru pada elemen select di index.html.

Catatan:
- Pencarian memeriksa nama, kategori, dan deskripsi.
- Filter kategori dapat digunakan bersamaan dengan pencarian.
- Tombol Reset menghapus kata kunci dan mengembalikan kategori ke Semua.
- Gambar contoh belum disertakan; gunakan foto katalog milik Anda.
- Konten katalog ini disusun sebagai direktori informasi netral, bukan
  ajakan atau klaim bahwa produk tembakau aman.
