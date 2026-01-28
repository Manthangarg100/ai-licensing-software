"use client";

const licenses = [
  {
    id: "LIC-1024",
    content: "Movie Trailer A",
    platform: "YouTube",
    region: "Global",
    status: "Active",
    expires: "2025-06-30",
  },
  {
    id: "LIC-1025",
    content: "Web Series Episode 3",
    platform: "OTT Platform",
    region: "India",
    status: "Expired",
    expires: "2024-12-01",
  },
  {
    id: "LIC-1026",
    content: "Music Track X",
    platform: "Instagram",
    region: "US, EU",
    status: "Violation",
    expires: "2025-01-15",
  },
];

const statusStyles: Record<string, string> = {
  Active: "text-emerald-400 bg-emerald-400/10",
  Expired: "text-amber-400 bg-amber-400/10",
  Violation: "text-red-400 bg-red-400/10",
};

export default function LicensesPage() {
  return (
    <div className="p-10">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Licenses
        </h1>
        <p className="mt-2 text-foreground/70 max-w-xl">
          Manage and monitor all active, expired, and violated content licenses.
        </p>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-foreground/70">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Contract ID</th>
              <th className="px-6 py-4 text-left font-medium">Content</th>
              <th className="px-6 py-4 text-left font-medium">Platform</th>
              <th className="px-6 py-4 text-left font-medium">Region</th>
              <th className="px-6 py-4 text-left font-medium">Status</th>
              <th className="px-6 py-4 text-left font-medium">Expires</th>
              <th className="px-6 py-4 text-left font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {licenses.map((lic) => (
              <tr
                key={lic.id}
                className="border-t border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-6 py-4">{lic.id}</td>
                <td className="px-6 py-4">{lic.content}</td>
                <td className="px-6 py-4">{lic.platform}</td>
                <td className="px-6 py-4">{lic.region}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[lic.status]}`}
                  >
                    {lic.status}
                  </span>
                </td>
                <td className="px-6 py-4">{lic.expires}</td>
                <td className="px-6 py-4">
                  <button className="text-emerald-400 hover:underline">
                    View
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
