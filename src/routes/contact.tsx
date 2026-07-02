import { asset } from "@/lib/asset";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Reveal } from "@/lib/anim";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import galleryHero_ptr from "@/assets/gallery-4.jpg.asset.json";
const galleryHero = asset(galleryHero_ptr);
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Private Viewings | Aranya Grande" },
      {
        name: "description",
        content:
          "Arrange a private viewing of Aranya Grande. Speak with a private client director about residences, investment and availability.",
      },
      { property: "og:title", content: "Contact | Aranya Grande" },
      {
        property: "og:description",
        content: "Arrange a private viewing of Aranya Grande.",
      },
      { property: "og:image", content: galleryHero },
    ],
  }),
  component: Contact,
});

const DETAILS = [
  { icon: MapPin, label: "Estate Sales Gallery", value: "Aranya Grande, Himalayan Foothills, India" },
  { icon: Phone, label: "Private Line", value: "+91 98765 43210" },
  { icon: Mail, label: "Email", value: "residences@aranyagrande.com" },
  { icon: Clock, label: "Viewings", value: "By appointment · Mon – Sat" },
];

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Enquire"
        title="Begin a private conversation"
        subtitle="Tell us a little about what you are looking for, and we will arrange the rest."
        image={galleryHero}
      />
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-20 md:px-10">
          <Reveal>
            <span className="overline text-gold">Get in touch</span>
            <h2 className="mt-5 text-4xl text-foreground md:text-5xl">
              We host a limited number of viewings each season
            </h2>
            <p className="mt-6 text-muted-foreground">
              Our private client team will guide you through the collection, pricing and
              the estate itself, entirely at your pace.
            </p>
            <div className="mt-12 space-y-8">
              {DETAILS.map((d) => (
                <div key={d.label} className="flex items-start gap-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-gold">
                    <d.icon strokeWidth={1.3} className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {d.label}
                    </p>
                    <p className="mt-1 text-foreground">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <InquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}