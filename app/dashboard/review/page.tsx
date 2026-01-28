"use client";

const reviewQueue = [
  {
    content: "Music Track X",
    platform: "Instagram",
    issue: "Used outside licensed region",
    aiConfidence: "96%",
    detectedAt: "2 mins ago",
  },
  {
    content: "Web Series Ep 3",
    platform: "OTT Platform",
    issue: "Exceeded allowed views",
    aiConfidence: "88%",
    detectedAt: "10 mins ago",
  },
];

export default function HumanReviewPage() {
  return (
    <div className="p-10 space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Human Review & Escalation
        </h1>
        <p className="mt-2 text-foreground/70 max-w-xl">
          AI-detected issues that require human verification before enforcement.
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
                <p className="mt-1 text-sm text-foreground/70">
                  Platform: {item.platform}
                </p>
                <p className="mt-1 text-sm text-foreground/70">
                  Issue: {item.issue}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-emerald-400 font-medium">
                  AI Confidence: {item.aiConfidence}
                </p>
                <p className="mt-1 text-xs text-foreground/50">
                  Detected {item.detectedAt}
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-emerald-600 text-black text-sm font-medium hover:bg-emerald-500 transition">
                Approve Enforcement
              </button>

              <button className="px-4 py-2 rounded-lg border border-amber-400/40 text-amber-400 text-sm hover:bg-amber-400/10 transition">
                Escalate
              </button>

              <button className="px-4 py-2 rounded-lg border border-white/20 text-sm text-foreground/70 hover:bg-white/5 transition">
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTNOTE */}
      <p className="text-xs text-foreground/50 max-w-2xl">
        Human decisions override automated actions and are logged for compliance
        and audit purposes.
      </p>
    </div>
  );
}
