import { asset } from "@/lib/asset";
import { Link } from "@tanstack/react-router";
import { Reveal, RevealGroup, useParallax } from "@/lib/anim";
import lifestyleImg_ptr from "@/assets/location.jpg.asset.json";
import gallery2_ptr from "@/assets/gallery-2.jpg.asset.json";
import gallery3_ptr from "@/assets/gallery-3.jpg.asset.json";
const lifestyleImg = asset(lifestyleImg_ptr);
const gallery2 = asset(gallery2_ptr);
const gallery3 = asset(gallery3_ptr);
const MOMENTS = [
  {
    time: "06:30",
    title: "First light",
    text: "Mist lifts off the valley as the forest wakes. Coffee on the stone deck, entirely alone with the hills.",
  },
  {
    time: "13:00",
    title: "The long lunch",
    text: "Slow, seasonal and forest-facing. Hours that stretch without a single reason to hurry.",
  },
  {
    time: "18:45",
    title: "Golden hour",
    text: "The last sun catches the pines. A quiet walk, a warm plunge, the day folding gently into evening.",
  },
] as const;

export function Lifestyle() {
  const ref = useParallax(0.12);
  return (
    <section className="bg-forest py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Editorial header */}
        <div className="max-w-3xl">
          <span className="overline text-gold">The Life</span>
          <h2 className="mt-5 text-4xl leading-tight text-ivory md:text-6xl">
            Not a home you visit, but a rhythm you keep
          </h2>
          <span className="rule-gold my-8" />
          <p className="text-lg font-light leading-relaxed text-ivory/60">
            Life at Aranya Grande is measured in light and season rather than
            hours. This is what an unhurried day looks like when the valley is
            yours alone.
          </p>
        </div>

        {/* Feature editorial image with overlapping caption */}
        <div className="relative mt-16 grid gap-6 md:mt-20 md:grid-cols-12">
          <div className="img-mask relative col-span-12 aspect-[16/10] overflow-hidden md:col-span-8 md:aspect-[16/9]">
            <img
              ref={ref as never}
              src={lifestyleImg}
              alt="A morning across the valley at Aranya Grande"
              loading="lazy"
              className="absolute inset-0 h-[122%] w-full object-cover"
            />
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-6 md:col-span-4 md:grid-cols-1">
            <div className="img-mask relative aspect-[4/5] overflow-hidden md:aspect-auto md:flex-1">
              <img
                src={gallery2}
                alt="Interior detail of a residence"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="img-mask relative aspect-[4/5] overflow-hidden md:aspect-auto md:flex-1">
              <img
                src={gallery3}
                alt="Evening light on the estate"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Day rhythm */}
        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-ivory/10 md:mt-20 md:grid-cols-3"
          stagger={0.08}
        >
          {MOMENTS.map((m) => (
            <div key={m.time} className="glass p-9 md:p-10">
              <p className="font-display text-3xl text-gold">{m.time}</p>
              <h3 className="mt-5 font-display text-2xl text-ivory">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/55">{m.text}</p>
            </div>
          ))}
        </RevealGroup>

        <Reveal className="mt-14 md:mt-16">
          <Link to="/gallery" className="btn-outline-light">
            Step inside the gallery
          </Link>
        </Reveal>
      </div>
    </section>
  );
}