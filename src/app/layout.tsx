import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin']})

export const metadata: Metadata = {
  title: "Sistema de chamados",
  description: "Sistema de gerenciamento de chamados e demandas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
