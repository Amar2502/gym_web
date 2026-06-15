import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Peters Gym — Mumbai's Premier Bodybuilding Gym",
  description:
    "Train at Peters Gym in Oshiwara, Mumbai. Founded by 2x Mr. India Vipin Peters. Hardcore bodybuilding, strength training, and personal coaching.",
  keywords: [
    "bodybuilding gym Mumbai",
    "Peters Gym",
    "strength training Oshiwara",
    "Vipin Peters",
    "gym near Oshiwara Bus Depot",
  ],
  openGraph: {
    title: "Peters Gym — Where Champions Are Forged",
    description:
      "Mumbai's premier bodybuilding gym. Strength training, coaching, and nutrition guidance under champion-level leadership.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="fixed inset-0 grid-pattern pointer-events-none opacity-30" aria-hidden />
        {children}
      </body>
    </html>
  );
}
