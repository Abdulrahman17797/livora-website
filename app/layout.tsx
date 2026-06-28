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
  // Server-side env check: inject RTL anti-flicker script only on non-production
  // (production visitors are always English — no flash possible)
  const arabicEnabled = process.env.VERCEL_ENV !== "production";

  return (
    <html lang="en">
      <head>
        {arabicEnabled && (
          <script
            dangerouslySetInnerHTML={{
              __html: `try{var l=localStorage.getItem('livora-lang');if(l==='ar'){document.documentElement.dir='rtl';document.documentElement.lang='ar';}}catch(e){}`,
            }}
          />
        )}
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
