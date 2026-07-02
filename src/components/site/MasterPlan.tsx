import { asset } from "@/lib/asset";
import { useState } from "react";
import masterplan_ptr from "@/assets/masterplan.jpg.asset.json";
import { SectionHeading } from "./PageHero";
const masterplan = asset(masterplan_ptr);

const HOTSPOTS = [
  { x: 40, y: 30, name: "The Cantilever", detail: "8,200 sq ft · 4 suites · Ravine edge" },
  { x: 74, y: 20, name: "The Terraces", detail: "9,600 sq ft · 5 suites · Water line" },
  { x: 88, y: 40, name: "The Courtyard", detail: "11,400 sq ft · 6 suites · Still water" },
  { x: 58, y: 46, name: "The Pavilion", detail: "7,800 sq ft · 4 suites · Forest core" },
  { x: 44, y: 70, name: "Clubhouse & Spa", detail: "Wellness, dining & residents' lounge" },
  { x: 78, y: 76, name: "The Grove", detail: "6,900 sq ft · 3 suites · Private grove" },
] as const;

export function MasterPlan() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Master Plan"
          title="Forty residences, woven into 220 acres of forest"
        />
        <p className="mt-6 max-w-xl text-muted-foreground">
          Hover a marker to preview each residence and its position within the valley.
        </p>

        <div className="img-mask relative mt-12 aspect-[16/11] w-full overflow-hidden rounded-sm md:aspect-[16/9]">
          <img
            src={masterplan}
            alt="Estate master plan"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/25" />
          {HOTSPOTS.map((h, idx) => (
            <button
              key={h.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === idx ? null : idx)}
              aria-label={h.name}
            >
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
                <span className="relative inline-flex h-3 w-3 rounded-full border border-ivory bg-gold" />
              </span>
              <div
                className={`glass-dark absolute left-1/2 top-6 z-10 w-52 -translate-x-1/2 p-4 text-left transition-all duration-500 ${
                  active === idx
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-2 opacity-0"
                }`}
              >
                <p className="font-display text-lg text-ivory">{h.name}</p>
                <p className="mt-1 text-xs text-ivory/60">{h.detail}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}