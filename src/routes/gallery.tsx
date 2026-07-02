import { asset } from "@/lib/asset";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { GalleryMasonry } from "@/components/site/GalleryMasonry";
import { CTABand } from "@/components/site/CTABand";
import galleryHero_ptr from "@/assets/gallery-2.jpg.asset.json";
const galleryHero = asset(galleryHero_ptr);
export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Aranya Grande" },
      {
        name: "description",
        content:
          "A visual portrait of Aranya Grande, architecture, interiors, landscape and light across the estate.",
      },
      { property: "og:title", content: "Gallery | Aranya Grande" },
      {
        property: "og:description",
        content: "A visual portrait of Aranya Grande.",
      },
      { property: "og:image", content: galleryHero },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A portrait of the estate"
        subtitle="Architecture, interiors and landscape, captured across the seasons."
        image={galleryHero}
      />
      <GalleryMasonry />
      <CTABand />
    </>
  );
}