"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, arabicUnlocked } = useLanguage();
  const tx = translations[lang].nav;

  const links = [
    { href: "/", label: tx.home },
    { href: "/products", label: tx.products },
    { href: "/about", label: tx.about },
    { href: "/order", label: tx.order },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LangToggle = () => (
    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden text-xs font-semibold">
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 transition-all duration-200 ${
          lang === "en" ? "gradient-bg text-white" : "text-gray-400 hover:text-[#9B5DE5]"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("ar")}
        className={`px-3 py-1.5 transition-all duration-200 ${
          lang === "ar" ? "gradient-bg text-white" : "text-gray-400 hover:text-[#9B5DE5]"
        }`}
      >
        AR
      </button>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">
          <span className="gradient-text">Livora</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors relative group ${
                  pathname === href ? "text-[#9B5DE5]" : "text-[#1a1a1a] hover:text-[#9B5DE5]"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 start-0 h-0.5 rounded-full gradient-bg transition-all duration-300 ${
                    pathname === href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop: lang toggle (preview/dev only) + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {arabicUnlocked && <LangToggle />}
          <Link
            href="/order"
            className="gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          >
            {tx.orderCta}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-[#1a1a1a] rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[#1a1a1a] rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[#1a1a1a] rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 pb-6"
          >
            <ul className="flex flex-col gap-4 pt-4">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm font-medium ${
                      pathname === href ? "text-[#9B5DE5]" : "text-[#1a1a1a]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/order"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                >
                  {tx.orderCta}
                </Link>
              </li>
              {/* Lang toggle: shown on preview/dev builds, or when ?lang=ar override is active */}
              {arabicUnlocked && (
                <li className="pt-1">
                  <LangToggle />
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
