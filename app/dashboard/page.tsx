"use client";

const mockDashboardData = {
  metrics: {
    activeLicenses: 240,
    regionsCovered: 12,
    activeAlerts: 6,
    violations: 3,
  },
  aiStatus: {
    lastRun: "2 minutes ago",
    rulesApplied: 18,
    confidence: 94,
  },
  humanFeedback: {
    pendingReviews: 2,
    escalations: 1,
  },
};

export default function DashboardOverview() {
  const { metrics, aiStatus, humanFeedback } = mockDashboardData;

  return (
    <div className="px-10 py-10">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-foreground/60">
          Monitor content usage, AI enforcement, and human reviews in one place.
        </p>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <MetricCard
          label="Active Licenses"
          value={metrics.activeLicenses}
        />
        <MetricCard
          label="Regions Covered"
          value={metrics.regionsCovered}
        />
        <MetricCard
          label="Active Alerts"
          value={metrics.activeAlerts}
        />
        <MetricCard
          label="Violations"
          value={metrics.violations}
        />
      </div>

      {/* SYSTEM STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI STATUS */}
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
          <h2 className="text-lg font-medium mb-4">
            Sanrakshak AI Status
          </h2>

          <div className="space-y-3 text-sm text-foreground/80">
            <StatusRow label="Last Evaluation Run" value={aiStatus.lastRun} />
            <StatusRow
              label="Rules Applied"
              value={`${aiStatus.rulesApplied}`}
            />
            <StatusRow
              label="AI Confidence"
              value={`${aiStatus.confidence}%`}
              highlight
            />
          </div>
        </div>

        {/* HUMAN FEEDBACK */}
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
          <h2 className="text-lg font-medium mb-4">
            Human Feedback Loop
          </h2>

          <div className="space-y-3 text-sm text-foreground/80">
            <StatusRow
              label="Pending Reviews"
              value={humanFeedback.pendingReviews}
            />
            <StatusRow
              label="Escalations"
              value={humanFeedback.escalations}
              highlight
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------- SMALL COMPONENTS ----------------- */

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
      <div className="text-sm text-foreground/60">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-emerald-400">
        {value}
      </div>
    </div>
  );
}

function StatusRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-foreground/60">{label}</span>
      <span
        className={`font-medium ${
          highlight ? "text-emerald-400" : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
