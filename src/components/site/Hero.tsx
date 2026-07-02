import { asset } from "@/lib/asset";
import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import hero_ptr from "@/assets/hero.jpg.asset.json";
import { useParallax } from "@/lib/anim";
const hero = asset(hero_ptr);

export function Hero() {
  const imgRef = useParallax(0.14);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = el.querySelectorAll("[data-reveal]");
    if (reduce) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    const tl = gsap.timeline({ delay: 0.35 });
    tl.fromTo(
      items,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.3, ease: "power3.out", stagger: 0.18 },
    );
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0 img-mask">
        <img
          ref={imgRef as never}
          src={hero}
          alt="Drone view of the Dhanaulti mountains at dawn"
          className="ken-burns absolute inset-0 h-[128%] w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-charcoal/30" />
      {/* animated mountain fog */}
      <div aria-hidden className="fog-layer absolute inset-x-0 bottom-0 z-[5] h-2/3" />
      <div
        aria-hidden
        className="fog-layer absolute inset-x-0 top-1/4 z-[5] h-1/2"
        style={{ animationDelay: "-13s", animationDuration: "32s" }}
      />

      {/* top scrim so the headline never collides with the fixed nav */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-[6] h-40 bg-gradient-to-b from-charcoal/70 to-transparent"
      />

      {/* Left-aligned editorial content */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-28 pb-20 md:px-10 md:pt-32 md:pb-28">
        <div ref={textRef} className="max-w-2xl text-ivory">
          <span
            data-reveal
            className="overline inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-gold"
            style={{ opacity: 0 }}
          >
            <span className="hidden h-px w-10 bg-gold/60 sm:inline-block" />
            A Legacy in the Clouds · Dhanaulti
          </span>
          <h1
            data-reveal
            className="display-hero mt-6 text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ opacity: 0 }}
          >
            Own Your Private
            <br />
            <span className="italic font-light text-ivory/90">Himalayan Sanctuary</span>
          </h1>
          <p
            data-reveal
            className="mt-7 max-w-lg text-base font-light leading-relaxed text-ivory/70 md:text-lg"
            style={{ opacity: 0 }}
          >
            Beyond the reach of the everyday, a limited collection of architectural
            residences etched into the serene majesty of the Himalayas.
          </p>
          <div
            data-reveal
            className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
            style={{ opacity: 0 }}
          >
            <Link to="/estate" className="btn-gold">
              Explore the Estate
            </Link>
            <Link to="/contact" className="btn-glass group">
              Schedule a Private Visit
              <ArrowRight
                strokeWidth={1.5}
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Stat row */}
          <div
            data-reveal
            className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-ivory/15 pt-7 sm:mt-12 sm:gap-x-12"
            style={{ opacity: 0 }}
          >
            {[
              ["40", "Private Residences"],
              ["220", "Acres of Forest"],
              ["2,050m", "Elevation"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-3xl text-ivory md:text-4xl">{n}</p>
                <p className="mt-1 overline text-ivory/55" style={{ fontSize: "0.55rem" }}>
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="float-slow absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/70 md:flex">
        <span className="overline" style={{ fontSize: "0.55rem" }}>
          Scroll
        </span>
        <span className="block h-12 w-px bg-gradient-to-b from-ivory/60 to-transparent" />
      </div>
    </section>
  );
}