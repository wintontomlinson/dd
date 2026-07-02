import { asset } from "@/lib/asset";
import { Link } from "@tanstack/react-router";
import about_ptr from "@/assets/about.jpg.asset.json";
import { Reveal, useParallax } from "@/lib/anim";
const about = asset(about_ptr);

export function AboutSplit() {
  const ref = useParallax(0.1);
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-10">
        <div className="img-mask relative aspect-[4/5] overflow-hidden">
          <img
            ref={ref as never}
            src={about}
            alt="Interior of an Aranya Grande residence"
            loading="lazy"
            className="absolute inset-0 h-[120%] w-full object-cover"
          />
        </div>

        <Reveal>
          <span className="overline text-gold">The Estate</span>
          <h2 className="mt-6 text-4xl leading-tight text-foreground md:text-5xl">
            A rare kind of permanence, drawn from the land itself
          </h2>
          <span className="rule-gold my-8" />
          <p className="text-lg font-light leading-relaxed text-muted-foreground">
            Aranya Grande was conceived as an act of restraint. Forty residences,
            no more, each positioned by hand to honour the contours of the valley,
            the fall of light and the privacy of every owner.
          </p>
          <p className="mt-5 text-lg font-light leading-relaxed text-muted-foreground">
            The result is not a development, but a place: quiet, enduring, and built
            to be inherited rather than merely owned.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              ["40", "Residences"],
              ["220", "Acres"],
              ["2026", "First Release"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-4xl text-foreground">{n}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {l}
                </p>
              </div>
            ))}
          </div>
          <Link to="/about" className="btn-outline-dark mt-10">
            Our Story
          </Link>
        </Reveal>
      </div>
    </section>
  );
}