import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Жуковский Машиностроительный Завод ЖМЗ — каталог и сервис",
    template: "%s — Жуковский Машиностроительный Завод ЖМЗ",
  },
  description: "Каталог продукции ЖМЗ, сервисные центры, поддержка и контакты.",
};

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToastProvider } from "@/components/ui/Toast";
import { site } from "@/config/site";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased bg-[var(--background)] text-[var(--foreground)]`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              url: site.url,
              contactPoint: [{
                "@type": "ContactPoint",
                contactType: "customer service",
                telephone: `+${site.contacts.phoneHref}`,
                email: site.contacts.email,
              }],
              sameAs: [
                site.social.telegram,
                site.social.vk,
                site.social.youtube,
                site.social.whatsapp,
              ],
            }),
          }}
        />
        <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--primary-700)] focus:px-4 focus:py-2 focus:text-white">Перейти к содержимому</a>
        <ToastProvider />
        <Header />
        <main
          id="content"
          className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:py-10"
        >
          <Breadcrumbs />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
