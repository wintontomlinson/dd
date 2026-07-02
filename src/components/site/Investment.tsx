import { useCountUp, Reveal } from "@/lib/anim";
import { SectionHeading } from "./PageHero";

function Stat({
  value,
  suffix,
  prefix,
  label,
  decimals,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}) {
  const ref = useCountUp(value, { decimals });
  return (
    <div className="border-t border-ivory/15 pt-6">
      <div className="flex items-baseline font-display text-5xl text-ivory md:text-6xl">
        {prefix && <span className="text-gold">{prefix}</span>}
        <span ref={ref}>0</span>
        {suffix && <span className="text-gold">{suffix}</span>}
      </div>
      <p className="mt-3 text-sm uppercase tracking-[0.16em] text-ivory/55">{label}</p>
    </div>
  );
}

const POINTS = [
  {
    title: "Appreciation Potential",
    text: "Protected land, a capped release of forty residences and rising demand for private hill estates underpin long-term value.",
  },
  {
    title: "Rental Yield",
    text: "A fully managed residence programme delivers premium, hands-off returns from ultra-high-net-worth stays.",
  },
  {
    title: "Prime Location",
    text: "Three hours from the capital, minutes from the valley township, connected, yet entirely secluded.",
  },
] as const;

export function Investment() {
  return (
    <section className="bg-charcoal py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Investment"
          title="A residence that endures, and appreciates"
          dark
        />

        <div className="mt-16 grid grid-cols-2 gap-x-10 gap-y-12 lg:grid-cols-4">
          <Stat value={18} suffix="%" label="Avg. annual appreciation" />
          <Stat value={9.4} suffix="%" label="Managed rental yield" decimals={1} />
          <Stat value={40} label="Total residences" />
          <Stat value={220} suffix=" acres" label="Protected estate land" />
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <span className="overline text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-2xl text-ivory">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/55">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}