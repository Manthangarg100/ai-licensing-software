import Navbar from "@/components/Navbar";
import StarsBackground from "@/components/background/StarsBackground";
import HeroVisualStack from "@/components/HeroVisualStack";
import HowItWorksScroll from "@/components/HowItWorksScroll";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <StarsBackground />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-8 pt-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h1 className="text-[52px] leading-[1.15] tracking-tight font-semibold">
              Control your digital content rights
              <br />
              with clarity and confidence.
            </h1>

            <p className="mt-6 text-foreground/70 max-w-xl">
              SanrakshakAI helps platforms manage licensing, monitor usage,
              and prevent rights violations — without complexity.
            </p>
          </div>

          <div className="relative h-[520px] flex items-center justify-center">
            <HeroVisualStack />
          </div>
        </div>
      </section>

      <HowItWorksScroll />
    </main>
  );
}
