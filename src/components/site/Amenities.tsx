import {
  Waves,
  Sparkles,
  Utensils,
  Trees,
  ConciergeBell,
  Dumbbell,
  Wine,
  ShieldCheck,
  Car,
  Film,
  Flower2,
  Plane,
} from "lucide-react";
import { RevealGroup } from "@/lib/anim";

const AMENITIES = [
  { icon: Waves, title: "Infinity Pool", text: "Heated vanishing-edge pool over the valley." },
  { icon: Sparkles, title: "Wellness Spa", text: "Thermal suites, plunge pools & treatments." },
  { icon: Utensils, title: "Fine Dining", text: "Private chef's table and seasonal menus." },
  { icon: Trees, title: "Nature Trails", text: "14km of protected woodland pathways." },
  { icon: ConciergeBell, title: "Private Concierge", text: "24-hour dedicated estate service." },
  { icon: Dumbbell, title: "Athletic Club", text: "Fully equipped gym and movement studio." },
  { icon: Wine, title: "Cellar & Lounge", text: "Curated cellar and members' lounge." },
  { icon: Film, title: "Private Cinema", text: "Screening room for residents and guests." },
  { icon: Car, title: "Valet & Garage", text: "Climate-controlled private garaging." },
  { icon: Flower2, title: "Botanical Gardens", text: "Landscaped native gardens and courts." },
  { icon: Plane, title: "Helipad Access", text: "On-request transfers to the estate." },
  { icon: ShieldCheck, title: "Absolute Security", text: "Gated perimeter and discreet patrol." },
] as const;

export function Amenities({ dark = true }: { dark?: boolean }) {
  return (
    <section className={dark ? "bg-forest py-24 md:py-32" : "bg-background py-24 md:py-32"}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-center">
          <span className="overline text-gold">The Offering</span>
          <h2 className={`mt-5 text-4xl md:text-5xl ${dark ? "text-ivory" : "text-foreground"}`}>
            A private world of amenity
          </h2>
        </div>

        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {AMENITIES.map((a) => (
            <div
              key={a.title}
              className={`group relative p-9 transition-colors duration-500 ${
                dark
                  ? "glass hover:bg-ivory/10"
                  : "bg-card hover:bg-muted"
              }`}
            >
              <a.icon
                strokeWidth={1.1}
                className="h-8 w-8 text-gold transition-transform duration-500 group-hover:-translate-y-1"
              />
              <h3 className={`mt-6 font-display text-2xl ${dark ? "text-ivory" : "text-foreground"}`}>
                {a.title}
              </h3>
              <p className={`mt-2 text-sm ${dark ? "text-ivory/55" : "text-muted-foreground"}`}>
                {a.text}
              </p>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}