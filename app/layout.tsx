import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raquel & Davi - Casamento 21 de Setembro 2025",
  description:
    "Celebre conosco nosso casamento! Confirme sua presença, veja nossa lista de presentes e acompanhe todos os detalhes do nosso grande dia.",
  keywords: [
    "casamento Raquel Davi",
    "casamento 21 setembro 2025",
    "lista de presentes",
    "confirmação presença",
    "Fazenda Vista Alegre",
  ],
  authors: [{ name: "Raquel & Davi" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Raquel & Davi - Casamento 21 de Setembro 2025",
    description:
      "Celebre conosco nosso casamento! Confirme sua presença e acompanhe todos os detalhes.",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${montserrat.variable}`}
    >
      <body className="font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
