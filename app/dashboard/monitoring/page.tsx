"use client";

const liveFeed = [
  {
    platform: "YouTube",
    content: "Movie Trailer A",
    status: "Within License",
    time: "2s ago",
  },
  {
    platform: "Instagram",
    content: "Music Track X",
    status: "Violation Detected",
    time: "12s ago",
  },
  {
    platform: "OTT Platform",
    content: "Web Series Ep 3",
    status: "Under Review",
    time: "1m ago",
  },
];

const alerts = [
  {
    content: "Music Track X",
    issue: "Unauthorized region usage",
    severity: "High",
  },
  {
    content: "Movie Trailer A",
    issue: "License expiring soon",
    severity: "Medium",
  },
];

const statusStyle = (status: string) => {
  if (status === "Within License") return "text-emerald-400";
  if (status === "Violation Detected") return "text-red-400";
  return "text-amber-400";
};

const severityStyle: Record<string, string> = {
  High: "text-red-400 bg-red-400/10",
  Medium: "text-amber-400 bg-amber-400/10",
};

export default function MonitoringPage() {
  return (
    <div className="p-10 space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Monitoring
        </h1>
        <p className="mt-2 text-foreground/70 max-w-xl">
          Live tracking of content usage, AI detection, and enforcement alerts.
        </p>
      </div>

      {/* LIVE FEED */}
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
        <h2 className="text-lg font-medium mb-4">
          Live Content Monitoring
        </h2>

        <div className="space-y-4">
          {liveFeed.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl border border-white/5 px-5 py-4"
            >
              <div>
                <p className="text-sm font-medium">
                  {item.content}
                </p>
                <p className="text-xs text-foreground/60">
                  {item.platform}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`text-sm font-medium ${statusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </p>
                <p className="text-xs text-foreground/50">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
          <h2 className="text-lg font-medium mb-4">
            Active Alerts
          </h2>

          <div className="space-y-4">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/5 px-5 py-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    {alert.content}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${severityStyle[alert.severity]}`}
                  >
                    {alert.severity}
                  </span>
                </div>

                <p className="mt-2 text-xs text-foreground/70">
                  {alert.issue}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SYSTEM STATE */}
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
          <h2 className="text-lg font-medium mb-4">
            Enforcement Status
          </h2>

          <ul className="space-y-3 text-sm text-foreground/70">
            <li>✔ AI Rules Engine: Active</li>
            <li>✔ Continuous Platform Scanning</li>
            <li>⚠ Human Review Queue: 2 Pending</li>
            <li>✔ Auto Enforcement Enabled</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
