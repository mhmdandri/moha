This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy with Docker

Container berjalan di port internal `3000` dan di-expose ke port host `3001`. Menggunakan external network `moha_network`.

1. Pastikan network docker sudah ada:
```bash
docker network create moha_network 2>/dev/null || true
```

2. Buat file `.env` di server (bisa copy dari `.env.example` atau `.env.local`):
```env
NEXT_PUBLIC_SITE_URL=https://www.mohaproject.tech
NEXT_PUBLIC_SUPABASE_URL=https://kdvwuymbzipjuvvcvxmw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_vhyjqQUX_Ndom1vO_07XVQ_vQf6UXpk
```

3. Build dan jalankan container:
```bash
docker compose up -d --build
```

4. Hentikan container:
```bash
docker compose down
```

## Deploy on Vercel / Cloud Provider

Jika menggunakan Vercel, Coolify, Railway, dsb:
1. Pastikan menambahkan Environment Variables di dashboard hosting:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.mohaproject.tech`
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://kdvwuymbzipjuvvcvxmw.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sb_publishable_vhyjqQUX_Ndom1vO_07XVQ_vQf6UXpk`
2. Lakukan trigger **Redeploy** (Pastikan centang "Clear Cache" jika ada).
