"use client";

import Image from "next/image";

const images = [
  "/image-1.png",
  "/image-1.png",
  "/image-3.png",
];

export default function HeroVisualStack() {
  return (
    <div className="relative w-[280px] h-[520px] overflow-hidden">
      
      {/* Fade masks */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Scrolling track */}
      <div className="absolute inset-0">
        <div className="animate-vertical-scroll space-y-6">
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className="relative w-full h-[180px] rounded-2xl overflow-hidden
                         bg-emerald-950/40 border border-emerald-800/40
                         shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              style={{
                transform: `translateZ(${i * -20}px)`,
              }}
            >
              <Image
                src={src}
                alt="Visual preview"
                fill
                className="object-cover"
                priority={i < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
