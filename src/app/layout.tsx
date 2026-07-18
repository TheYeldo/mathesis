import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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
    default: "Mathesis — математика с пониманием",
    template: "%s · Mathesis",
  },
  description:
    "Интерактивная платформа по алгебре и геометрии для 7–11 классов: понятные уроки, практика и домашние задания.",
  keywords: [
    "математика",
    "алгебра",
    "геометрия",
    "7 класс",
    "8 класс",
    "9 класс",
    "10 класс",
    "11 класс",
  ],
  openGraph: {
    title: "Mathesis — математика с пониманием",
    description: "Алгебра и геометрия 7–11 классов как связная система идей.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
