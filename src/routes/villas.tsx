import { asset } from "@/lib/asset";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { villas } from "@/lib/estate-data";
import { Reveal, useParallax } from "@/lib/anim";
import { BedDouble, Maximize } from "lucide-react";
import villaHero_ptr from "@/assets/villa-2.jpg.asset.json";
const villaHero = asset(villaHero_ptr);
export const Route = createFileRoute("/villas")({
  head: () => ({
    meta: [
      { title: "Signature Villas | Aranya Grande" },
      {
        name: "description",
        content:
          "Four architectural villa typologies, The Cantilever, The Terraces, The Courtyard and more, each a singular residence within Aranya Grande.",
      },
      { property: "og:title", content: "Signature Villas | Aranya Grande" },
      {
        property: "og:description",
        content: "Four architectural villa typologies, each a singular residence.",
      },
      { property: "og:image", content: villaHero },
    ],
  }),
  component: Villas,
});

function VillaRow({ v, i }: { v: (typeof villas)[number]; i: number }) {
  const ref = useParallax(0.09);
  const flip = i % 2 === 1;
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className={`img-mask relative aspect-[4/5] overflow-hidden ${flip ? "md:order-2" : ""}`}>
        <img
          ref={ref as never}
          src={v.image}
          alt={v.name}
          loading="lazy"
          className="absolute inset-0 h-[120%] w-full object-cover"
        />
      </div>
      <Reveal className={flip ? "md:order-1" : ""}>
        <span className="overline text-gold">Residence {String(i + 1).padStart(2, "0")}</span>
        <h2 className="mt-5 text-4xl text-foreground md:text-5xl">{v.name}</h2>
        <p className="mt-4 text-lg font-light text-muted-foreground">{v.tagline}</p>
        <div className="mt-8 flex gap-8 text-sm uppercase tracking-[0.14em] text-foreground">
          <span className="flex items-center gap-2">
            <Maximize className="h-4 w-4 text-gold" /> {v.size}
          </span>
          <span className="flex items-center gap-2">
            <BedDouble className="h-4 w-4 text-gold" /> {v.bedrooms}
          </span>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-3 border-t border-border pt-8">
          {v.amenities.map((a) => (
            <li key={a} className="text-sm text-muted-foreground">
              · {a}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

function Villas() {
  return (
    <>
      <PageHero
        eyebrow="Signature Villas"
        title="Residences of singular character"
        subtitle="Four architectural typologies, each sited to its own view, light and privacy."
        image={villaHero}
      />
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] space-y-24 px-6 md:space-y-32 md:px-10">
          {villas.map((v, i) => (
            <VillaRow key={v.name} v={v} i={i} />
          ))}
        </div>
      </section>
      <CTABand title="Reserve your residence" text="A limited release of villas is available in the first season. Enquire for the current collection." />
    </>
  );
}