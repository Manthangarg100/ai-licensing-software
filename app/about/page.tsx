export default function AboutPage() {
  return (
    <section className="relative min-h-screen bg-background text-foreground pt-32 pb-40">
      {/* SOFT BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-emerald-900/10 blur-[180px]" />
      </div>

      <div className="max-w-5xl mx-auto px-8">
        {/* HEADER */}
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            About Sanrakshak<span className="text-emerald-500">AI</span>
          </h1>

          <p className="mt-6 text-lg text-foreground/70 leading-relaxed">
            SanrakshakAI is an intelligent digital rights management platform
            designed to bring clarity, control, and confidence to content
            licensing and compliance. <br /> <br />
            <p><b><i>India has millions of developers and startups who ignore licenses because they don’t understand legal English. Sanrakshak Ai explains software licenses in Indian languages so people can comply without fear</i></b></p>
          </p>
        </div>

        {/* DIVIDER */}
        <div className="mt-16 h-px bg-border" />

        {/* MISSION */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-medium tracking-tight">
              Our Mission
            </h2>
          </div>

          <p className="text-foreground/70 leading-relaxed">
            Our mission is to eliminate the complexity and risk associated with
            managing digital content rights. By automating contract
            understanding and real-time compliance, we help platforms prevent
            violations before they occur.
          </p>
        </section>

        {/* VISION */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-medium tracking-tight">
              Our Vision
            </h2>
          </div>

          <p className="text-foreground/70 leading-relaxed">
            We envision a future where digital content ecosystems scale
            confidently, without legal uncertainty, revenue leakage, or
            operational overload, powered by intelligent, proactive systems.
          </p>
        </section>

        {/* WHY IT MATTERS */}
        <section className="mt-24">
          <h2 className="text-2xl font-medium tracking-tight">
            Why SanrakshakAI Matters
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Prevents licensing violations and legal disputes",
              "Reduces manual compliance and legal effort",
              "Protects revenue and brand reputation",
              "Enables confident scaling of content platforms",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border bg-black/30 backdrop-blur px-6 py-5 text-foreground/80"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
