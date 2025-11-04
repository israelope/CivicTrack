import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import Link from 'next/link'
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ['latin'] })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CivicTrak",
  description: "Report and track civic issues in your community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. ADD THIS HEADER SECTION */}
        <Navbar/>

        {/* 3. YOUR PAGE CONTENT WILL RENDER HERE */}
        <main className="bg-black-50 min-h-screen pt-16">
          {children}
        </main>
        
      </body>
    </html>
  );
}
