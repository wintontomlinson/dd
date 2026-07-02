import { asset } from "@/lib/asset";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ExperienceBlocks } from "@/components/site/ExperienceBlocks";
import { MasterPlan } from "@/components/site/MasterPlan";
import { Amenities } from "@/components/site/Amenities";
import { CTABand } from "@/components/site/CTABand";
import { SectionHeading } from "@/components/site/PageHero";
import { Reveal } from "@/lib/anim";
import hero_ptr from "@/assets/gallery-4.jpg.asset.json";
const hero = asset(hero_ptr);
export const Route = createFileRoute("/estate")({
  head: () => ({
    meta: [
      { title: "The Estate | Aranya Grande" },
      {
        name: "description",
        content:
          "Explore the master plan, experiences and amenities of the Aranya Grande estate across 220 protected acres.",
      },
      { property: "og:title", content: "The Estate | Aranya Grande" },
      {
        property: "og:description",
        content: "Master plan, experiences and amenities across 220 protected acres.",
      },
      { property: "og:image", content: hero },
    ],
  }),
  component: Estate,
});

function Estate() {
  return (
    <>
      <PageHero
        eyebrow="The Estate"
        title="A protected valley, composed by hand"
        subtitle="Every path, clearing and residence positioned to preserve the character of the land."
        image={hero}
      />
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <SectionHeading
            eyebrow="Overview"
            title="Designed to disappear into the landscape"
            align="center"
          />
          <Reveal>
            <p className="mt-8 text-lg font-light leading-relaxed text-muted-foreground">
              Aranya Grande unfolds across 220 acres of ancient pine, spring-fed lakes and
              gentle ridgeline. The estate holds forty private residences, a clubhouse,
              wellness spa and fourteen kilometres of woodland trail, connected by discreet,
              low-impact infrastructure and held in permanent protection.
            </p>
          </Reveal>
        </div>
      </section>
      <MasterPlan />
      <ExperienceBlocks />
      <Amenities />
      <CTABand />
    </>
  );
}