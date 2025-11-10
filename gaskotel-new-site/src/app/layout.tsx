import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ЖМЗ — Современное отопительное оборудование",
  description: "Жуковский Машиностроительный Завод производит газовые и твердотопливные котлы, газогорелочные устройства и другое отопительное оборудование для дома и промышленности.",
  keywords: "газовые котлы, твердотопливные котлы, отопительное оборудование, газогорелочные устройства, ЖМЗ, Жуковский машиностроительный завод",
  authors: [{ name: "Жуковский Машиностроительный Завод" }],
  creator: "Жуковский Машиностроительный Завод",
  publisher: "Жуковский машиностроительный завод",
  openGraph: {
    title: "ЖМЗ — Современное отопительное оборудование",
    description: "Жуковский Машиностроительный Завод: газовые котлы, твердотопливные котлы, газогорелочные устройства.",
    url: "https://gaskotel.ru",
    siteName: "ЖМЗ",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ЖМЗ — Современное отопительное оборудование",
    description: "Газовые котлы, твердотопливные котлы, газогорелочные устройства от ЖМЗ.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "fSVnw3SzrM4CXPt5usclJ-ly9qXyS88_ETVfaPdjpDE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased font-sans`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
