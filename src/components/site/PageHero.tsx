import { useParallax, Reveal } from "@/lib/anim";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  const ref = useParallax(0.12);
  return (
    <section className="relative flex h-[68vh] min-h-[460px] items-end overflow-hidden bg-charcoal">
      <div className="absolute inset-0 img-mask">
        <img
          ref={ref as never}
          src={image}
          alt={title}
          className="absolute inset-0 h-[128%] w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/20" />
      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10 md:pb-24">
        <Reveal>
          <span className="overline text-gold">{eyebrow}</span>
          <h1 className="display-hero mt-5 max-w-4xl text-5xl text-ivory md:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-ivory/70">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  dark = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={`${align === "center" ? "text-center" : ""} ${className}`}
    >
      <span className="overline text-gold">{eyebrow}</span>
      <h2
        className={`mt-5 text-4xl leading-tight md:text-5xl ${
          dark ? "text-ivory" : "text-foreground"
        } ${align === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"}`}
      >
        {title}
      </h2>
    </Reveal>
  );
}