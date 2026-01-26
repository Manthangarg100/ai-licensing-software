"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    step: "01",
    title: "Contract Understanding",
    desc:
      "The system reads licensing contracts and understands where, when, and how content is allowed to be used.",
  },
  {
    step: "02",
    title: "Real-Time Monitoring",
    desc:
      "Content usage is continuously tracked across platforms to ensure it stays within licensed boundaries.",
  },
  {
    step: "03",
    title: "Violation Detection",
    desc:
      "Any unauthorized usage is detected early, before it turns into legal or revenue loss.",
  },
  {
    step: "04",
    title: "Rights Control",
    desc:
      "You stay in control with clear visibility and the ability to act confidently on your content rights.",
  },
];

export default function HowItWorksScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    intervalRef.current = setInterval(() => {
      if (isPaused.current) return;

      container.scrollLeft += 1;

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollLeft = 0;
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const pause = () => {
    isPaused.current = true;
  };

  const resume = () => {
    setTimeout(() => {
      isPaused.current = false;
    }, 1500);
  };

  return (
    <section className="border-t border-[var(--card-border)] py-32">
      <div className="max-w-7xl mx-auto px-8">
        {/* HEADER */}
        <div className="mb-14 max-w-xl">
          <h2 className="text-4xl font-semibold tracking-tight">
            How it works
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            A simple, automated flow that keeps your content compliant
            without manual effort.
          </p>
        </div>

        {/* SCROLL CONTAINER */}
        <div
          ref={containerRef}
          className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide
                     cursor-grab active:cursor-grabbing"
          onWheel={() => {
            pause();
            resume();
          }}
          onMouseDown={pause}
          onMouseUp={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
        >
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="min-w-[360px] shrink-0 rounded-2xl p-8
                         bg-[var(--card)]
                         border border-[var(--card-border)]
                         backdrop-blur-lg"
            >
              <div className="text-xs tracking-widest text-[var(--accent)]">
                STEP {item.step}
              </div>

              <h3 className="mt-3 text-xl font-medium">
                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
