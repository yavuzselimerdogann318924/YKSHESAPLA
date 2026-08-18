# YKS Pusula 2026 — Dışa Aktarım Paketi

Bu paket YKS puan/sıralama hesaplayıcısını ve 21.493 programlık tercih rehberini içerir.

## Sayfalar

- `/` — TYT, SAY, EA, SÖZ ve DİL puan/sıralama hesaplayıcı
- `/programlar` — Üniversite ve bölüm arama, taban/tavan puandan tahmini sıra

## Yerelde çalıştırma

Node.js 22.13 veya daha yeni bir sürüm gerekir.

```bash
npm install
npm run dev
```

## Üretim derlemesi

```bash
npm run build
```

Derlenmiş çıktı `dist/` klasöründe oluşur. `dist/server/index.js` Cloudflare
Worker uyumlu sunucu girişidir; statik dosyalar `dist/client/` altındadır.

## Veri ve tasarım kredisi

- Program veri seti: `public/data/programs-2026.json`
- Hesaplama motoru: `app/yks-engine.ts`
- Arka plan watermark ve alt bilgi kredisi: `app/globals.css`
- Tasarım kredisi: **Designed by Yavuz Selim Erdoğan**

Sıralama değerleri 2026 yığılımsal dağılımından hesaplanan tahminlerdir.
