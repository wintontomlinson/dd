import { Link } from "@tanstack/react-router";
import { ArrowRight, BedDouble, Maximize } from "lucide-react";
import { villas } from "@/lib/estate-data";
import { SectionHeading } from "./PageHero";
import { Reveal } from "@/lib/anim";

export function VillasShowcase() {
  return (
    <section className="bg-charcoal py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Signature Residences"
            title="Four architectural villas, each a singular work"
            dark
          />
          <Reveal>
            <Link
              to="/villas"
              className="nav-underline inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-gold"
            >
              View all villas <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {villas.map((v) => (
          <article
            key={v.name}
            className="group relative w-[82vw] shrink-0 snap-start sm:w-[62vw] lg:w-[42vw] xl:w-[560px]"
          >
            <div className="img-mask relative aspect-[4/5] w-full">
              <img
                src={v.image}
                alt={v.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="overline text-gold">{v.size}</span>
                <h3 className="mt-3 font-display text-4xl text-ivory">{v.name}</h3>
                <p className="mt-2 max-w-sm text-sm text-ivory/70">{v.tagline}</p>

                <div className="mt-6 flex items-center gap-6 text-[0.7rem] uppercase tracking-[0.16em] text-ivory/60">
                  <span className="flex items-center gap-2">
                    <Maximize className="h-4 w-4 text-gold" /> {v.size}
                  </span>
                  <span className="flex items-center gap-2">
                    <BedDouble className="h-4 w-4 text-gold" /> {v.bedrooms}
                  </span>
                </div>

                <div className="grid max-h-0 grid-cols-2 gap-x-6 gap-y-2 overflow-hidden opacity-0 transition-all duration-700 group-hover:mt-6 group-hover:max-h-40 group-hover:opacity-100">
                  {v.amenities.map((a) => (
                    <span key={a} className="text-xs text-ivory/70">
                      · {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="mx-auto max-w-[1400px] px-6 text-xs uppercase tracking-[0.2em] text-ivory/35 md:px-10">
        Scroll to explore →
      </p>
    </section>
  );
}