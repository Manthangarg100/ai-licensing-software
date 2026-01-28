"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import HowItWorksScroll from "@/components/HowItWorksScroll";
import StarsBackground from "@/components/background/StarsBackground";
import HeroVisualStack from "@/components/HeroVisualStack";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <StarsBackground />

      {/* BACKGROUND ATMOSPHERE */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-emerald-900/10 blur-[200px]" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[900px] h-[900px] rounded-full bg-lime-900/10 blur-[180px]" />
      </div>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-8 pt-32 pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT — TEXT */}
          <div className="max-w-4xl">
            <h1 className="text-[52px] leading-[1.15] tracking-tight">
              <span className="font-medium">
                Control your digital content rights
              </span>
              <br />
              <span className="font-semibold">
                with clarity and confidence.
              </span>
            </h1>

            <p className="mt-7 text-[17px] text-foreground/70 max-w-2xl leading-relaxed">
              SanrakshakAI helps platforms manage licensing, monitor usage,
              and prevent rights violations, without complexity.
            </p>

            <div className="mt-11 flex gap-4">
              {/* ✅ CONNECTED BUTTON */}
              <button
                onClick={() => router.push("/login")}
                className="px-7 py-3.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition text-sm font-medium"
              >
                Get Started
              </button>

              <button
                onClick={() => router.push("/how-it-works")}
                className="px-7 py-3.5 rounded-full border border-border text-foreground hover:bg-foreground/5 transition text-sm"
              >
                See How It Works
              </button>
            </div>
          </div>

          {/* RIGHT — VISUAL STACK */}
          <div className="relative h-[520px] flex items-center justify-center -mt-6">
            <HeroVisualStack />
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="border-t border-border" />

      {/* HOW IT WORKS */}
      <HowItWorksScroll />

      {/* FOOTER */}
      <footer className="border-t border-border mt-32">
        <div className="max-w-7xl mx-auto px-8 py-10 text-center text-sm text-foreground/50">
          © {new Date().getFullYear()} SanrakshakAI. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
