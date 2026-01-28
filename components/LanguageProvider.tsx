"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { languages, translations, type Language } from "@/app/lib/i18n";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Language>("en");

  // Load saved language
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null;
    if (saved && languages.includes(saved)) {
      setLang(saved);
    }
  }, []);

  // Persist language
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = (key: string) =>
    translations[lang]?.[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}
