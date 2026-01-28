"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [language, setLanguage] = useState("en");

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
        <h2 className="text-lg font-medium mb-4">Language</h2>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-black/60 text-white px-4 py-2 rounded-lg border border-white/20"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="te">తెలుగు</option>
        </select>
      </div>
    </div>
  );
}
