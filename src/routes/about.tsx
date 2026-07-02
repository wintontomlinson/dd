import { asset } from "@/lib/asset";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { AboutSplit } from "@/components/site/AboutSplit";
import { Testimonials } from "@/components/site/Testimonials";
import { CTABand } from "@/components/site/CTABand";
import { Reveal } from "@/lib/anim";
import gallery_ptr from "@/assets/gallery-1.jpg.asset.json";
const gallery = asset(gallery_ptr);
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Aranya Grande Estate" },
      {
        name: "description",
        content:
          "The philosophy, craftsmanship and stewardship behind Aranya Grande, a private estate of forty architectural residences.",
      },
      { property: "og:title", content: "About | Aranya Grande Estate" },
      {
        property: "og:description",
        content: "The philosophy and craftsmanship behind Aranya Grande.",
      },
      { property: "og:image", content: gallery },
    ],
  }),
  component: About,
});

const PILLARS = [
  {
    title: "Restraint",
    text: "We build less, and build it better. Forty homes, each given room to breathe within the forest.",
  },
  {
    title: "Craft",
    text: "Local stone, aged timber and hand-finished detail, materials chosen to weather beautifully over decades.",
  },
  {
    title: "Stewardship",
    text: "220 acres held in permanent protection, so that the valley remains exactly as it is found.",
  },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="A quiet philosophy, built to last generations"
        subtitle="Aranya Grande began with a single conviction, that true luxury is space, silence and time."
        image={gallery}
      />
      <AboutSplit />
      <section className="bg-forest py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <span className="overline text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-display text-3xl text-ivory">{p.title}</h3>
                <span className="rule-gold my-6" />
                <p className="text-ivory/60">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
      <CTABand />
    </>
  );
}