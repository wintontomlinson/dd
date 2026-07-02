import { asset } from "@/lib/asset";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Amenities } from "@/components/site/Amenities";
import { ExperienceBlocks } from "@/components/site/ExperienceBlocks";
import { CTABand } from "@/components/site/CTABand";
import expSpa_ptr from "@/assets/exp-spa.jpg.asset.json";
const expSpa = asset(expSpa_ptr);
export const Route = createFileRoute("/amenities")({
  head: () => ({
    meta: [
      { title: "Amenities | Aranya Grande" },
      {
        name: "description",
        content:
          "Infinity pool, wellness spa, fine dining, private cinema, concierge and more, the private world of amenity at Aranya Grande.",
      },
      { property: "og:title", content: "Amenities | Aranya Grande" },
      {
        property: "og:description",
        content: "The private world of amenity at Aranya Grande.",
      },
      { property: "og:image", content: expSpa },
    ],
  }),
  component: AmenitiesPage,
});

function AmenitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Amenities"
        title="Every comfort, held privately"
        subtitle="A curated collection of spaces and services, reserved entirely for residents."
        image={expSpa}
      />
      <Amenities dark={false} />
      <ExperienceBlocks />
      <CTABand />
    </>
  );
}