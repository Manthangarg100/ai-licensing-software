export default function DashboardPage() {
  return (
    <div>
      {/* HEADER */}
      <h1 className="text-3xl font-semibold tracking-tight text-white">
        Dashboard Overview
      </h1>

      <p className="mt-2 text-slate-400">
        Monitor content usage and licensing status at a glance.
      </p>

      {/* STATS */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Active Licenses" value="240" />
        <StatCard title="Regions Covered" value="12" />
        <StatCard title="Active Alerts" value="6" />
        <StatCard title="Violations" value="3" />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-[#0b1210] border border-white/10 p-6 shadow-lg">
      <p className="text-sm text-slate-400">{title}</p>

      <p className="mt-4 text-3xl font-semibold text-emerald-400">
        {value}
      </p>
    </div>
  );
}
