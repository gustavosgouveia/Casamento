import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const description = "nas ditas linhas em que nos encontramos — 01 de Agosto de 2027";

export const metadata: Metadata = {
  // TODO casal: trocar pelo domínio definitivo (ou definir NEXT_PUBLIC_SITE_URL).
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Samira & Gustavo",
  description,
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Samira & Gustavo",
    description,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/samiragustavo/03.jpg", alt: "Samira & Gustavo" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR"className={`${inter.variable} antialiased`}>
      <head>
        {/* Adobe Fonts (Typekit) — freight-big-pro, bickham-script-pro-3, imbue-variable */}
        <link rel="stylesheet" href="https://use.typekit.net/gja5cdy.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
