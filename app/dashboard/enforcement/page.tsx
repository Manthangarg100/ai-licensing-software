"use client";

import { ShieldCheck, Gavel, ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const actions = [
  {
    id: "ENF-1023",
    content: "Movie Trailer – Region EU",
    violation: "usageBeyondRegion",
    action: "takedownNoticeSent",
    status: "inProgress",
    date: "12 Sept 2026",
  },
  {
    id: "ENF-1024",
    content: "Series Episode 3",
    violation: "expiredLicenseUsage",
    action: "platformRestriction",
    status: "completed",
    date: "10 Sept 2026",
  },
  {
    id: "ENF-1025",
    content: "Music Track – Ad Campaign",
    violation: "unauthorizedCommercialUse",
    action: "legalEscalation",
    status: "pendingReview",
    date: "9 Sept 2026",
  },
];

export default function EnforcementPage() {
  const { t } = useLanguage();

  return (
    <div className="p-10">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <Gavel className="h-5 w-5 text-emerald-400" />
          {t("enforcementActions")}
        </h1>

        <p className="mt-2 text-sm text-foreground/70 max-w-2xl">
          {t("enforcementDescription")}
        </p>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-border bg-black/40 backdrop-blur-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-foreground/70">
            <tr>
              <th className="px-6 py-4 text-left font-medium">{t("actionId")}</th>
              <th className="px-6 py-4 text-left font-medium">{t("content")}</th>
              <th className="px-6 py-4 text-left font-medium">{t("violation")}</th>
              <th className="px-6 py-4 text-left font-medium">{t("actionTaken")}</th>
              <th className="px-6 py-4 text-left font-medium">{t("status")}</th>
              <th className="px-6 py-4 text-left font-medium">{t("date")}</th>
              <th className="px-6 py-4 text-left font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {actions.map((item) => (
              <tr
                key={item.id}
                className="border-t border-border hover:bg-white/5 transition"
              >
                <td className="px-6 py-4 text-foreground/80">
                  {item.id}
                </td>

                <td className="px-6 py-4">
                  {item.content}
                </td>

                <td className="px-6 py-4 text-foreground/70">
                  {t(item.violation)}
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="h-4 w-4" />
                    {t(item.action)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>

                <td className="px-6 py-4 text-foreground/70">
                  {item.date}
                </td>

                <td className="px-6 py-4">
                  <button className="text-emerald-400 hover:text-emerald-300 transition">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTNOTE */}
      <p className="mt-6 text-xs text-foreground/50 max-w-xl">
        {t("enforcementFootnote")}
      </p>
    </div>
  );
}

/* ---------- STATUS BADGE ---------- */

function StatusBadge({ status }: { status: string }) {
  const { t } = useLanguage();

  const styles: Record<string, string> = {
    completed: "bg-emerald-500/15 text-emerald-400",
    inProgress: "bg-yellow-500/15 text-yellow-400",
    pendingReview: "bg-red-500/15 text-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-white/10 text-foreground/70"
      }`}
    >
      {t(status)}
    </span>
  );
}
