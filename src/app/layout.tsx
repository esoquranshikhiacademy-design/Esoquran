import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "এসো কুরআন শিখি একাডেমি",
    template: "%s | এসো কুরআন শিখি একাডেমি",
  },
  description:
    "একটি স্মার্ট ইসলামিক লার্নিং প্ল্যাটফর্ম - ধাপে ধাপে সঠিক তাজবীদসহ কুরআন শিখুন। মাখরাজ, তাজবীদ, আরবি বর্ণমালা এবং কুরআন পাঠ শেখার সম্পূর্ণ ব্যবস্থা।",
  keywords: [
    "কুরআন শিক্ষা",
    "তাজবীদ",
    "মাখরাজ",
    "আরবি শিক্ষা",
    "কুরআন তেলাওয়াত",
    "Quran Learning",
    "Tajweed",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#186447",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="font-bengali antialiased">
        <a href="#main-content" className="skip-link">
          মূল কনটেন্টে যান
        </a>
        <Providers>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
