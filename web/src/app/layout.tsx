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
    default: "Газкотел — каталог и сервис",
    template: "%s — Газкотел",
  },
  description: "Каталог продукции, сервисные центры, поддержка и контакты.",
};

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/config/site";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col`}>
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
        <Header />
        <main id="content" className="mx-auto max-w-7xl px-4 py-8 w-full flex-1">
          <Breadcrumbs />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
