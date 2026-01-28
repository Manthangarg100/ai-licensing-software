"use client";

import { useLanguage } from "@/components/LanguageProvider";

const reviewQueue = [
  {
    content: "Music Track X",
    platform: "Instagram",
    issue: "usageBeyondRegion",
    aiConfidence: "96%",
    detectedAt: "2 mins ago",
  },
  {
    content: "Web Series Ep 3",
    platform: "OTT Platform",
    issue: "exceededViews",
    aiConfidence: "88%",
    detectedAt: "10 mins ago",
  },
];

export default function HumanReviewPage() {
  const { t } = useLanguage();

  return (
    <div className="p-10 space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t("humanReview")}
        </h1>
        <p className="mt-2 text-foreground/70 max-w-xl">
          {t("humanReviewDescription")}
        </p>
      </div>

      {/* REVIEW QUEUE */}
      <div className="space-y-6">
        {reviewQueue.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6"
          >
            {/* INFO */}
            <div className="flex justify-between items-start gap-6">
              <div>
                <h3 className="text-lg font-medium">
                  {item.content}
                </h3>

                {/* Platform = DATA (do not translate) */}
                <p className="mt-1 text-sm text-foreground/70">
                  {t("platform")}: {item.platform}
                </p>

                {/* ✅ FIX IS HERE */}
                <p className="mt-1 text-sm text-foreground/70">
                  {t("issue")}: {t(item.issue)}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-emerald-400 font-medium">
                  {t("aiConfidence")}: {item.aiConfidence}
                </p>
                <p className="mt-1 text-xs text-foreground/50">
                  {t("detected")} {item.detectedAt}
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-emerald-600 text-black text-sm font-medium hover:bg-emerald-500 transition">
                {t("approveEnforcement")}
              </button>

              <button className="px-4 py-2 rounded-lg border border-amber-400/40 text-amber-400 text-sm hover:bg-amber-400/10 transition">
                {t("escalate")}
              </button>

              <button className="px-4 py-2 rounded-lg border border-white/20 text-sm text-foreground/70 hover:bg-white/5 transition">
                {t("dismiss")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTNOTE */}
      <p className="text-xs text-foreground/50 max-w-2xl">
        {t("humanReviewFootnote")}
      </p>
    </div>
  );
}
