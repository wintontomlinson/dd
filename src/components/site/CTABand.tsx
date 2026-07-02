import { asset } from "@/lib/asset";
import { Link } from "@tanstack/react-router";
import { Reveal, useParallax } from "@/lib/anim";
import location_ptr from "@/assets/location.jpg.asset.json";
const location = asset(location_ptr);
export function CTABand({
  title = "Arrange a private viewing",
  text = "Visits are hosted privately, by appointment, for a limited number of guests each season.",
}: {
  title?: string;
  text?: string;
}) {
  const ref = useParallax(0.12);
  return (
    <section className="relative overflow-hidden bg-charcoal">
      <div className="absolute inset-0 img-mask opacity-40">
        <img
          ref={ref as never}
          src={location}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-[128%] w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-charcoal/60" />
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
        <Reveal>
          <span className="overline text-gold">Private Viewing</span>
          <h2 className="mt-6 text-4xl text-ivory md:text-6xl">{title}</h2>
          <p className="mx-auto mt-6 max-w-lg text-lg font-light text-ivory/70">{text}</p>
          <Link to="/contact" className="btn-gold mt-10">
            Begin Your Enquiry
          </Link>
        </Reveal>
      </div>
    </section>
  );
}