"use client";

import { useLanguage } from "@/components/LanguageProvider";

const licenses = [
  {
    id: "LIC-1024",
    content: "Movie Trailer A",
    platform: "YouTube",
    region: "Global",
    status: "active",
    expires: "2025-06-30",
  },
  {
    id: "LIC-1025",
    content: "Web Series Episode 3",
    platform: "OTT Platform",
    region: "India",
    status: "expired",
    expires: "2024-12-01",
  },
  {
    id: "LIC-1026",
    content: "Music Track X",
    platform: "Instagram",
    region: "US, EU",
    status: "violation",
    expires: "2025-01-15",
  },
];

const statusStyles: Record<string, string> = {
  active: "text-emerald-400 bg-emerald-400/10",
  expired: "text-amber-400 bg-amber-400/10",
  violation: "text-red-400 bg-red-400/10",
};

export default function LicensesPage() {
  const { t } = useLanguage();

  return (
    <div className="p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          {t("licenses")}
        </h1>
        <p className="mt-2 text-foreground/70 max-w-xl">
          {t("licensesDescription")}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-foreground/70">
            <tr>
              <th className="px-6 py-4 text-left">{t("contractId")}</th>
              <th className="px-6 py-4 text-left">{t("content")}</th>
              <th className="px-6 py-4 text-left">{t("platform")}</th>
              <th className="px-6 py-4 text-left">{t("region")}</th>
              <th className="px-6 py-4 text-left">{t("status")}</th>
              <th className="px-6 py-4 text-left">{t("expires")}</th>
              <th className="px-6 py-4 text-left">{t("action")}</th>
            </tr>
          </thead>

          <tbody>
            {licenses.map((lic) => (
              <tr key={lic.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-6 py-4">{lic.id}</td>
                <td className="px-6 py-4">{lic.content}</td>
                <td className="px-6 py-4">{lic.platform}</td>
                <td className="px-6 py-4">{lic.region}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${statusStyles[lic.status]}`}>
                    {t(lic.status)}
                  </span>
                </td>
                <td className="px-6 py-4">{lic.expires}</td>
                <td className="px-6 py-4">
                  <button className="text-emerald-400 hover:underline">
                    {t("view")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
