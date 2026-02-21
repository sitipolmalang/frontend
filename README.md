# Frontend (Next.js 16 App Router)

Frontend ini bertanggung jawab untuk:
- Menampilkan halaman publik (`/`)
- Menampilkan halaman login (`/login`)
- Menangani transit callback OAuth (`/auth/callback`)
- Menampilkan dashboard privat (`/dashboard`)
- Proteksi route menggunakan `proxy.ts`

## 1. Alur Frontend

1. Pengguna membuka `/login`
2. Klik `Continue with Google` -> diarahkan ke backend OAuth
3. Setelah backend selesai autentikasi, pengguna kembali ke `/auth/callback?login=success`
4. Halaman callback mengarahkan ke `/dashboard`
5. Dashboard mengambil data pengguna dari backend `GET /api/me`

## 2. Route Utama

- `app/page.tsx` -> Beranda
- `app/login/page.tsx` -> Login
- `app/auth/callback/page.tsx` -> Halaman transit callback OAuth
- `app/dashboard/page.tsx` -> Dashboard (terproteksi)
- `app/dashboard/loading.tsx` -> Skeleton loading dashboard
- `app/dashboard/LogoutButton.tsx` -> Tombol logout client-side
- `proxy.ts` -> Route guard untuk `/login` dan `/dashboard`

## 3. Library Reusable

Helper reusable sudah dipisah ke:

- `lib/ui.tsx`
  - `AppLinkButton`
  - `AppAnchorButton`
  - `AppPanel`
  - `InfoTile`

- `lib/env.ts`
  - `getApiBaseUrl()`

Tujuannya agar komponen dan helper mudah dipakai ulang saat UI berkembang.

## 4. Variabel Environment

`frontend/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 5. Menjalankan Frontend

```bash
npm install
npm run dev
```

Buka:
- `http://localhost:3000`

## 6. Lint

```bash
npm run lint
```

## 7. Catatan Proteksi Route

Perilaku `proxy.ts`:
- Jika pengguna belum login dan mengakses `/dashboard` -> redirect ke `/login`
- Jika pengguna sudah login dan mengakses `/login` -> redirect ke `/dashboard`

Status login ditentukan dari keberadaan kuki `auth_token`.

## 8. Pemecahan Masalah Cepat

### Masih tertahan di `/auth/callback`
- pastikan query callback `login=success`
- cek kuki `auth_token` terbentuk

### Dashboard redirect terus ke login
- cek endpoint backend `/api/me`
- cek pengaturan kuki backend (`AUTH_COOKIE_*`)
- cek `NEXT_PUBLIC_API_URL` sudah benar

### Warning preload font di console
- proyek sudah set `preload: false` pada font utama untuk menghindari warning preload tidak terpakai
