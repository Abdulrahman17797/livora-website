"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ARABIC_ENABLED } from "@/lib/featureFlags";

export type Lang = "en" | "ar";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (!ARABIC_ENABLED) return; // production: stay English
    try {
      const stored = localStorage.getItem("livora-lang");
      if (stored === "en" || stored === "ar") setLangState(stored as Lang);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    if (!ARABIC_ENABLED) return; // production: ignore any toggle calls
    setLangState(l);
    try { localStorage.setItem("livora-lang", l); } catch {}
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = l;
  };

  useEffect(() => {
    if (!ARABIC_ENABLED) {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
      return;
    }
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang: ARABIC_ENABLED ? lang : "en", setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
