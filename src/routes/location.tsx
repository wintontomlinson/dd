import { asset } from "@/lib/asset";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { SectionHeading } from "@/components/site/PageHero";
import { Reveal, useParallax } from "@/lib/anim";
import { MapPin } from "lucide-react";
import location_ptr from "@/assets/location.jpg.asset.json";
import { LocationMap } from "@/components/site/LocationMap";
const location = asset(location_ptr);

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location | Aranya Grande" },
      {
        name: "description",
        content:
          "Secluded yet connected, three hours from the capital, minutes from the valley township. Discover the setting of Aranya Grande.",
      },
      { property: "og:title", content: "Location | Aranya Grande" },
      {
        property: "og:description",
        content: "Secluded yet connected, the setting of Aranya Grande.",
      },
      { property: "og:image", content: location },
    ],
  }),
  component: Location,
});

const TIMELINE = [
  ["30 min", "Dhanaulti Eco Park & Deodar forests"],
  ["1 hr", "Mussoorie, the Queen of the Hills"],
  ["1.5 hr", "Dehradun city centre"],
  ["1.5 hr", "Jolly Grant Airport, Dehradun"],
  ["6 hr", "New Delhi"],
];

function Location() {
  const ref = useParallax(0.1);
  return (
    <>
      <PageHero
        eyebrow="Location"
        title="Secluded, yet perfectly connected"
        subtitle="Set in the Deodar forests of Dhanaulti, connected to Mussoorie, Dehradun and Delhi."
        image={location}
      />
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 md:grid-cols-2 md:gap-20 md:px-10">
          <Reveal>
            <SectionHeading eyebrow="Nearby" title="Everything, within easy reach" />
            <div className="mt-12 space-y-0">
              {TIMELINE.map(([time, place], i) => (
                <div
                  key={place}
                  className="flex items-baseline gap-8 border-l border-border py-5 pl-8 last:pb-0"
                  style={{ position: "relative" }}
                >
                  <span className="absolute -left-[6px] top-7 h-3 w-3 rounded-full border-2 border-gold bg-background" />
                  <span className="w-16 shrink-0 font-display text-2xl text-gold">{time}</span>
                  <span className="text-lg text-foreground">{place}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="img-mask relative aspect-[3/4] overflow-hidden rounded-sm">
            <img
              ref={ref as never}
              src={location}
              alt="Approach road to Aranya Grande valley"
              loading="lazy"
              className="absolute inset-0 h-[120%] w-full object-cover"
            />
            <div className="glass-dark absolute bottom-6 left-6 flex items-center gap-3 px-5 py-3">
              <MapPin className="h-5 w-5 text-gold" />
              <span className="text-sm text-ivory">Dhanaulti, Uttarakhand, India</span>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-muted py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <SectionHeading eyebrow="Interactive map" title="Explore the approach" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <LocationMap />
            </div>
          </Reveal>
        </div>
      </section>
      <CTABand />
    </>
  );
}