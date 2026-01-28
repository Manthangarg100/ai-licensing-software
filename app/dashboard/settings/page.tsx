"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { languages } from "@/app/lib/i18n";

const languageLabels: Record<string, string> = {
  en: "English",
  hi: "हिंदी",
  te: "తెలుగు",
};

export default function SettingsPage() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full justify-center pt-14">
      <div className="w-full max-w-2xl px-4">
        {/* Header */}
        <h1 className="text-3xl font-semibold tracking-tight">
          {t("languageSettings")}
        </h1>

        <p className="mt-2 text-sm text-foreground/60">
          {t("selectLanguage")}
        </p>

        {/* Language options */}
        <div className="mt-8 space-y-4">
          {languages.map((lng) => {
            const isActive = lang === lng;

            return (
              <button
                key={lng}
                onClick={() => setLang(lng)}
                className={`group relative flex w-full items-center justify-between rounded-2xl px-6 py-5 border transition-all duration-200
                  ${
                    isActive
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-md"
                      : "border-white/10 hover:border-white/20 hover:bg-white/5"
                  }`}
              >
                <span className="text-lg font-medium">
                  {languageLabels[lng]}
                </span>

                {isActive && (
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-400">
                    ACTIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
