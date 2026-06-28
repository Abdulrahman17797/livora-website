import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Livora Kombucha — Live Better, Drink Better",
  description:
    "Premium small-batch kombucha brewed with intention. Real ingredients, real culture, real taste.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Prevent RTL flash on reload when Arabic is stored */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var l=localStorage.getItem('livora-lang');if(l==='ar'){document.documentElement.dir='rtl';document.documentElement.lang='ar';}}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased bg-white text-[#1a1a1a]">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
