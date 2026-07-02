import { experiences } from "@/lib/estate-data";
import { Reveal, useParallax } from "@/lib/anim";

function Block({
  item,
  index,
}: {
  item: (typeof experiences)[number];
  index: number;
}) {
  const ref = useParallax(0.1);
  const flip = index % 2 === 1;
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className={`img-mask relative aspect-[5/4] overflow-hidden ${flip ? "md:order-2" : ""}`}>
        <img
          ref={ref as never}
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="absolute inset-0 h-[122%] w-full object-cover"
        />
      </div>
      <Reveal className={flip ? "md:order-1" : ""}>
        <span className="overline text-gold">
          {String(index + 1).padStart(2, "0")} / Experience
        </span>
        <h3 className="mt-5 text-4xl leading-tight text-foreground md:text-5xl">
          {item.name}
        </h3>
        <span className="rule-gold my-7" />
        <p className="max-w-md text-lg font-light leading-relaxed text-muted-foreground">
          {item.text}
        </p>
      </Reveal>
    </div>
  );
}

export function ExperienceBlocks() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] space-y-24 px-6 md:space-y-32 md:px-10">
        {experiences.map((item, i) => (
          <Block key={item.name} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}