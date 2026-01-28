"use client";

import { useLanguage } from "@/components/LanguageProvider";

const liveFeed = [
  { platform: "YouTube", content: "Movie Trailer A", status: "withinLicense", time: "2s ago" },
  { platform: "Instagram", content: "Music Track X", status: "violationDetected", time: "12s ago" },
  { platform: "OTT Platform", content: "Web Series Ep 3", status: "underReview", time: "1m ago" },
];

export default function MonitoringPage() {
  const { t } = useLanguage();

  return (
    <div className="p-10 space-y-10">
      <div>
        <h1 className="text-3xl font-semibold">{t("monitoring")}</h1>
        <p className="mt-2 text-foreground/70 max-w-xl">
          {t("monitoringDescription")}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
        <h2 className="text-lg font-medium mb-4">
          {t("liveMonitoring")}
        </h2>

        <div className="space-y-4">
          {liveFeed.map((item, idx) => (
            <div key={idx} className="flex justify-between rounded-xl border border-white/5 px-5 py-4">
              <div>
                <p className="text-sm font-medium">{item.content}</p>
                <p className="text-xs text-foreground/60">{item.platform}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-emerald-400">
                  {t(item.status)}
                </p>
                <p className="text-xs text-foreground/50">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
