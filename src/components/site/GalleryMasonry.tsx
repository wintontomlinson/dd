import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/lib/estate-data";

const spanClass: Record<string, string> = {
  tall: "row-span-2",
  wide: "sm:col-span-2",
  normal: "",
};

export function GalleryMasonry() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((p) => (p! + 1) % galleryImages.length);
      if (e.key === "ArrowLeft")
        setOpen((p) => (p! - 1 + galleryImages.length) % galleryImages.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[260px] lg:grid-cols-4">
          {galleryImages.map((g, idx) => (
            <button
              key={idx}
              onClick={() => setOpen(idx)}
              className={`img-mask group relative overflow-hidden ${spanClass[g.span]}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/30" />
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/95 p-4 backdrop-blur-sm">
          <button
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute right-6 top-6 text-ivory/70 transition-colors hover:text-gold"
          >
            <X strokeWidth={1.4} className="h-8 w-8" />
          </button>
          <button
            aria-label="Previous"
            onClick={() => setOpen((p) => (p! - 1 + galleryImages.length) % galleryImages.length)}
            className="absolute left-4 text-ivory/70 transition-colors hover:text-gold md:left-10"
          >
            <ChevronLeft strokeWidth={1.2} className="h-10 w-10" />
          </button>
          <figure className="max-h-[85vh] max-w-5xl">
            <img
              src={galleryImages[open].src}
              alt={galleryImages[open].alt}
              className="max-h-[80vh] w-auto object-contain"
            />
            <figcaption className="mt-4 text-center text-sm uppercase tracking-[0.18em] text-ivory/60">
              {galleryImages[open].alt}
            </figcaption>
          </figure>
          <button
            aria-label="Next"
            onClick={() => setOpen((p) => (p! + 1) % galleryImages.length)}
            className="absolute right-4 text-ivory/70 transition-colors hover:text-gold md:right-10"
          >
            <ChevronRight strokeWidth={1.2} className="h-10 w-10" />
          </button>
        </div>
      )}
    </section>
  );
}