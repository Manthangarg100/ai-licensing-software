"use client";

import { useLanguage } from "@/components/LanguageProvider";

const violations = [
  {
    content: "Music Track X",
    platform: "Instagram",
    territory: "EU",
    exclusivity: "Exclusive",
    issue: "usageBeyondRegion",
    severity: "high",
    confidence: "96%",
    status: "actionRequired",
  },
  {
    content: "Movie Trailer A",
    platform: "YouTube",
    territory: "Global",
    exclusivity: "Non-Exclusive",
    issue: "expiredLicenseUsage",
    severity: "medium",
    confidence: "89%",
    status: "underReview",
  },
  {
    content: "Web Series Ep 3",
    platform: "OTT Platform",
    territory: "India",
    exclusivity: "Exclusive",
    issue: "exceededViews",
    severity: "low",
    confidence: "72%",
    status: "logged",
  },
];

const severityStyle: Record<string, string> = {
  high: "text-red-400 bg-red-400/10",
  medium: "text-amber-400 bg-amber-400/10",
  low: "text-emerald-400 bg-emerald-400/10",
};

export default function AlertsPage() {
  const { t } = useLanguage();

  return (
    <div className="p-10 space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t("alerts")}
        </h1>
        <p className="mt-2 text-foreground/70 max-w-xl">
          {t("alertsDescription")}
        </p>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-foreground/70">
            <tr>
              <th className="px-6 py-4 text-left font-medium">{t("content")}</th>
              <th className="px-6 py-4 text-left font-medium">{t("platform")}</th>
              <th className="px-6 py-4 text-left font-medium">{t("territory")}</th>
              <th className="px-6 py-4 text-left font-medium">{t("exclusivity")}</th>
              <th className="px-6 py-4 text-left font-medium">{t("issue")}</th>
              <th className="px-6 py-4 text-left font-medium">{t("severity")}</th>
              <th className="px-6 py-4 text-left font-medium">
                {t("aiConfidence")}
              </th>
              <th className="px-6 py-4 text-left font-medium">{t("status")}</th>
            </tr>
          </thead>

          <tbody>
            {violations.map((v, idx) => (
              <tr
                key={idx}
                className="border-t border-white/5 hover:bg-white/5 transition"
              >
                {/* DATA (DO NOT TRANSLATE) */}
                <td className="px-6 py-4 font-medium">{v.content}</td>
                <td className="px-6 py-4 text-foreground/70">{v.platform}</td>
                <td className="px-6 py-4 text-foreground/70">{v.territory}</td>
                <td className="px-6 py-4 text-foreground/70">
                  {t(v.exclusivity.toLowerCase())}
                </td>

                {/* UI TRANSLATIONS */}
                <td className="px-6 py-4 text-foreground/70">
                  {t(v.issue)}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${severityStyle[v.severity]}`}
                  >
                    {t(v.severity)}
                  </span>
                </td>

                <td className="px-6 py-4 text-emerald-400 font-medium">
                  {v.confidence}
                </td>

                <td className="px-6 py-4 text-foreground/80">
                  {t(v.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTNOTE */}
      <p className="text-xs text-foreground/50 max-w-2xl">
        {t("alertsFootnote")}
      </p>
    </div>
  );
}
