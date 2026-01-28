"use client";

const violations = [
  {
    content: "Music Track X",
    platform: "Instagram",
    issue: "Used outside licensed region",
    severity: "High",
    confidence: "96%",
    status: "Action Required",
  },
  {
    content: "Movie Trailer A",
    platform: "YouTube",
    issue: "License expired",
    severity: "Medium",
    confidence: "89%",
    status: "Under Review",
  },
  {
    content: "Web Series Ep 3",
    platform: "OTT Platform",
    issue: "Exceeded allowed views",
    severity: "Low",
    confidence: "72%",
    status: "Logged",
  },
];

const severityStyle: Record<string, string> = {
  High: "text-red-400 bg-red-400/10",
  Medium: "text-amber-400 bg-amber-400/10",
  Low: "text-emerald-400 bg-emerald-400/10",
};

export default function AlertsPage() {
  return (
    <div className="p-10 space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Alerts & Violations
        </h1>
        <p className="mt-2 text-foreground/70 max-w-xl">
          Review detected violations, AI confidence levels, and enforcement status.
        </p>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-foreground/70">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Content</th>
              <th className="px-6 py-4 text-left font-medium">Platform</th>
              <th className="px-6 py-4 text-left font-medium">Issue</th>
              <th className="px-6 py-4 text-left font-medium">Severity</th>
              <th className="px-6 py-4 text-left font-medium">AI Confidence</th>
              <th className="px-6 py-4 text-left font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {violations.map((v, idx) => (
              <tr
                key={idx}
                className="border-t border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-6 py-4 font-medium">{v.content}</td>
                <td className="px-6 py-4 text-foreground/70">{v.platform}</td>
                <td className="px-6 py-4 text-foreground/70">{v.issue}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${severityStyle[v.severity]}`}
                  >
                    {v.severity}
                  </span>
                </td>
                <td className="px-6 py-4 text-emerald-400 font-medium">
                  {v.confidence}
                </td>
                <td className="px-6 py-4 text-foreground/80">{v.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTNOTE */}
      <p className="text-xs text-foreground/50 max-w-2xl">
        Violations are detected automatically using Sanrakshak AI’s monitoring engine.
        High severity alerts may trigger automated enforcement or require human review.
      </p>
    </div>
  );
}
