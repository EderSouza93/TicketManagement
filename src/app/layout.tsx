import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ['latin']})

export const metadata: Metadata = {
  title: "Cohab Inovação",
  description: "Sistema de gerenciamento de chamados e demandas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
