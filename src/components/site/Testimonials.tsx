import { useState, useEffect, useCallback } from "react";
import { testimonials } from "@/lib/estate-data";

export function Testimonials() {
  const [i, setI] = useState(0);
  const next = useCallback(() => setI((p) => (p + 1) % testimonials.length), []);
  useEffect(() => {
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="bg-forest py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <span className="overline text-gold">In Their Words</span>
        <div className="relative mt-12 min-h-[280px] md:min-h-[240px]">
          {testimonials.map((t, idx) => (
            <figure
              key={t.name}
              className={`absolute inset-0 transition-all duration-1000 ${
                idx === i ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <blockquote className="font-display text-3xl font-light italic leading-snug text-ivory md:text-[2.75rem]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-10">
                <p className="text-sm uppercase tracking-[0.2em] text-gold">{t.name}</p>
                <p className="mt-1 text-sm text-ivory/50">{t.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 flex justify-center gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Testimonial ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-[3px] transition-all duration-500 ${
                idx === i ? "w-10 bg-gold" : "w-5 bg-ivory/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}