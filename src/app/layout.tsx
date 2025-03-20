import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FooterNavigationBar } from "./components/FooterNavigationBar";
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
       <img    
              src="/phone_status_bar.png"
              alt="phone_status"
              className="h-12 w-auto ml-auto"/>
        <header className="bg-white text-white shadow-md border-b border-gray-100">
       
          <div className="container mx-auto px-6">
            <img
              src="/syngenta_biologicals.png"
              alt="Syngenta Logo"
              className="h-12 w-auto ml-auto"
            />
          </div>
        </header>

        <main className="flex-grow container mx-auto p-4 px-4 pb-16">
          {children}
        </main>

        {/* <footer className="bg-[var(--footer-bg)] text-white p-4 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} Syngenta. All rights reserved.</p>
          </div>
        </footer> */}

        {/* Mobile app-like sticky navigation bar with shadcn/ui */}
        <FooterNavigationBar />
      </body>
    </html>
  );
}
