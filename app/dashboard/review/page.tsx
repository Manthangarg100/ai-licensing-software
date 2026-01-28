"use client";

import { useLanguage } from "@/components/LanguageProvider";

const violations = [
  {
    content: "Music Track X",
    platform: "Instagram",
    issue: "outsideRegion",
    severity: "high",
    confidence: "96%",
    status: "actionRequired",
  },
];

export default function AlertsPage() {
  const { t } = useLanguage();

  return (
    <div className="p-10 space-y-10">
      <div>
        <h1 className="text-3xl font-semibold">
          {t("alerts")}
        </h1>
        <p className="mt-2 text-foreground/70 max-w-xl">
          {t("alertsDescription")}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4">{t("content")}</th>
              <th className="px-6 py-4">{t("platform")}</th>
              <th className="px-6 py-4">{t("issue")}</th>
              <th className="px-6 py-4">{t("severity")}</th>
              <th className="px-6 py-4">{t("aiConfidence")}</th>
              <th className="px-6 py-4">{t("status")}</th>
            </tr>
          </thead>

          <tbody>
            {violations.map((v, i) => (
              <tr key={i} className="border-t border-white/5">
                <td className="px-6 py-4">{v.content}</td>
                <td className="px-6 py-4">{v.platform}</td>
                <td className="px-6 py-4">{t(v.issue)}</td>
                <td className="px-6 py-4">{t(v.severity)}</td>
                <td className="px-6 py-4 text-emerald-400">{v.confidence}</td>
                <td className="px-6 py-4">{t(v.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
