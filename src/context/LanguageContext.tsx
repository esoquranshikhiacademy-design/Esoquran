"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { dictionary, type Locale, type Dictionary } from "@/lib/i18n/dictionary";

interface LanguageContextValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "eqs_locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bn");

  useEffect(() => {
    // ব্রাউজারে আগের পছন্দ থাকলে সেটা লোড করা
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && (saved === "bn" || saved === "en")) {
      setLocaleState(saved);
    }
  }, []);

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale);
    window.localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
  }

  const t = dictionary[locale];

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage অবশ্যই LanguageProvider এর ভেতরে ব্যবহার করতে হবে");
  }
  return context;
}
