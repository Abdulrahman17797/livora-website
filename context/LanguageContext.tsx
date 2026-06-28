"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ARABIC_ENABLED } from "@/lib/featureFlags";

export type Lang = "en" | "ar";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  arabicUnlocked: boolean; // true when ARABIC_ENABLED OR the ?lang=ar override is active
}>({
  lang: "en",
  setLang: () => {},
  arabicUnlocked: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [override, setOverride] = useState(false);

  useEffect(() => {
    // ── Secret preview override ──────────────────────────────────────────────
    // Adding ?lang=ar to any URL activates the full Arabic experience even on
    // production. The choice is stored in sessionStorage so it persists as
    // you navigate between pages without having to repeat the query param.
    // To exit: close the tab, or toggle back to EN using the toggle that
    // appears in the nav while the override is active.
    // ────────────────────────────────────────────────────────────────────────
    const params = new URLSearchParams(window.location.search);
    if (params.get("lang") === "ar") {
      setLangState("ar");
      setOverride(true);
      try { sessionStorage.setItem("livora-lang-override", "ar"); } catch {}
      return;
    }

    // Persist override across page navigations within the same browser session
    try {
      if (sessionStorage.getItem("livora-lang-override") === "ar") {
        setLangState("ar");
        setOverride(true);
        return;
      }
    } catch {}

    // Normal flow: only honour stored language preference if Arabic is publicly enabled
    if (!ARABIC_ENABLED) return;
    try {
      const stored = localStorage.getItem("livora-lang");
      if (stored === "en" || stored === "ar") setLangState(stored as Lang);
    } catch {}
  }, []);

  const arabicUnlocked = ARABIC_ENABLED || override;

  const setLang = (l: Lang) => {
    if (!arabicUnlocked) return;
    setLangState(l);
    try {
      localStorage.setItem("livora-lang", l);
      // Keep sessionStorage in sync with the toggle so switching back to EN
      // while in override mode doesn't re-activate Arabic on the next page.
      if (l === "ar") {
        sessionStorage.setItem("livora-lang-override", "ar");
      } else {
        sessionStorage.removeItem("livora-lang-override");
        if (!ARABIC_ENABLED) setOverride(false);
      }
    } catch {}
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = l;
  };

  useEffect(() => {
    if (!arabicUnlocked) {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
      return;
    }
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, arabicUnlocked]);

  return (
    <LanguageContext.Provider value={{ lang: arabicUnlocked ? lang : "en", setLang, arabicUnlocked }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
