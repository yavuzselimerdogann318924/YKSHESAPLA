import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YKS 2026 Puan ve Sıralama Hesaplama",
  description:
    "2026 TYT, AYT ve YDT puan-sıralama hesaplama; 21.493 ön lisans ve lisans programında üniversite, bölüm, taban puan ve tahmini sıra arama aracı.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
