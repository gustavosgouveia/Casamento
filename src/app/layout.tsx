import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Samira & Gustavo",
  description: "nas ditas linhas em que nos encontramos — 01 de Agosto de 2027",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${inter.variable} antialiased`}>
      <head>
        {/* Adobe Fonts (Typekit) — freight-big-pro, bickham-script-pro-3, imbue-variable */}
        <link rel="stylesheet" href="https://use.typekit.net/gja5cdy.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
