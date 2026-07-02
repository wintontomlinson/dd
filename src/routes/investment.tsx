import { asset } from "@/lib/asset";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Investment } from "@/components/site/Investment";
import { CTABand } from "@/components/site/CTABand";
import { SectionHeading } from "@/components/site/PageHero";
import { Reveal } from "@/lib/anim";
import villa2_ptr from "@/assets/villa-2.jpg.asset.json";
const villa2 = asset(villa2_ptr);
export const Route = createFileRoute("/investment")({
  head: () => ({
    meta: [
      { title: "Investment | Aranya Grande" },
      {
        name: "description",
        content:
          "Appreciation potential, managed rental yield and prime location advantages of owning at Aranya Grande.",
      },
      { property: "og:title", content: "Investment | Aranya Grande" },
      {
        property: "og:description",
        content: "The investment case for owning at Aranya Grande.",
      },
      { property: "og:image", content: villa2 },
    ],
  }),
  component: InvestmentPage,
});

const FAQ = [
  ["Is ownership freehold?", "Yes. Every residence is offered on an absolute freehold basis, with title held directly by the owner."],
  ["Is there a managed rental programme?", "A fully managed, opt-in programme handles bookings, housekeeping and guest services for premium hands-off returns."],
  ["What is the payment structure?", "A structured plan is offered across construction milestones, with private financing partners available on request."],
];

function InvestmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Investment"
        title="Beauty that also endures in value"
        subtitle="Scarcity, protection and prime access make Aranya Grande a residence and an asset."
        image={villa2}
      />
      <Investment />
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <SectionHeading eyebrow="Considerations" title="Ownership, answered" />
          <div className="mt-12 divide-y divide-border border-y border-border">
            {FAQ.map(([q, a], i) => (
              <Reveal key={q} delay={i * 0.08} className="py-8">
                <h3 className="font-display text-2xl text-foreground">{q}</h3>
                <p className="mt-3 text-muted-foreground">{a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand title="Request the investment memorandum" text="A detailed brochure and pricing schedule is available to qualified enquiries." />
    </>
  );
}