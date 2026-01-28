"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import StarsBackground from "@/components/background/StarsBackground";

const STEPS = [
  {
    title: "Upload Contracts & Content",
    desc:
      "Licensing agreements and content metadata are securely uploaded into the system for analysis.",
  },
  {
    title: "AI Understands Rights",
    desc:
      "The system reads contracts and understands regions, platforms, duration, and usage permissions.",
  },
  {
    title: "Real-Time Monitoring",
    desc:
      "Content usage is continuously monitored across platforms and territories.",
  },
  {
    title: "Violation Detection",
    desc:
      "Any usage outside licensed boundaries is detected early and flagged instantly.",
  },
  {
    title: "Enforcement & Control",
    desc:
      "Confirmed violations are restricted, escalated, or acted upon to protect rights and revenue.",
  },
];

export default function HowItWorksPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <StarsBackground />

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-emerald-900/10 blur-[200px]" />
      </div>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-8 pt-32 pb-24">
        <h1 className="text-5xl font-semibold tracking-tight">
          How SanrakshakAI Works
        </h1>

        <p className="mt-6 text-lg text-foreground/70 max-w-2xl leading-relaxed">
          A simple, automated workflow that helps platforms manage content
          licensing, monitor usage, and stay compliant, without manual effort.
        </p>
      </section>

      {/* WORKFLOW */}
      <section className="max-w-6xl mx-auto px-8 pb-32">
        <div className="space-y-10">
          {STEPS.map((step, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-black/30 backdrop-blur-xl p-8 hover:border-emerald-500/40 transition"
            >
              <div className="text-xs tracking-widest text-emerald-400">
                STEP {String(index + 1).padStart(2, "0")}
              </div>

              <h3 className="mt-3 text-2xl font-medium">
                {step.title}
              </h3>

              <p className="mt-4 text-foreground/70 leading-relaxed max-w-3xl">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-8 py-24">
          <h2 className="text-3xl font-semibold">
            Why this matters
          </h2>

          <ul className="mt-8 space-y-4 text-foreground/70">
            <li>• Prevents licensing violations and legal risk</li>
            <li>• Reduces manual contract review effort</li>
            <li>• Protects revenue from unauthorized usage</li>
            <li>• Enables confident scaling of content libraries</li>
          </ul>

          <div className="mt-12 flex gap-4">
            <button
              onClick={() => router.push("/login")}
              className="px-7 py-3.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition text-sm font-medium"
            >
              Try the Dashboard
            </button>

            <button
              onClick={() => router.push("/")}
              className="px-7 py-3.5 rounded-full border border-border text-foreground hover:bg-foreground/5 transition text-sm"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-8 py-10 text-center text-sm text-foreground/50">
          © {new Date().getFullYear()} SanrakshakAI. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
