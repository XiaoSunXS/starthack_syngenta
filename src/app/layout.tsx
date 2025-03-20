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
  title: "Syngenta",
  description: "Nature-powered innovation to improve global farming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="bg-[var(--header-bg)] text-white p-4 shadow-md">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Syngenta</h1>
            <p className="text-sm">Nature-powered innovation to improve global farming</p>
          </div>
        </header>

        <main className="flex-grow container mx-auto p-4 px-4">
          {children}
        </main>

        <footer className="bg-[var(--footer-bg)] text-white p-4 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} Syngenta. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}