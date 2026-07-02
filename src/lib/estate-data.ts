import { asset } from "@/lib/asset";
import villa1_ptr from "@/assets/villa-1.jpg.asset.json";
import villa2_ptr from "@/assets/villa-2.jpg.asset.json";
import villa3_ptr from "@/assets/villa-3.jpg.asset.json";
import expPool_ptr from "@/assets/exp-pool.jpg.asset.json";
import expSpa_ptr from "@/assets/exp-spa.jpg.asset.json";
import expDining_ptr from "@/assets/exp-dining.jpg.asset.json";
import expTrails_ptr from "@/assets/exp-trails.jpg.asset.json";
import gallery1_ptr from "@/assets/gallery-1.jpg.asset.json";
import gallery4_ptr from "@/assets/gallery-4.jpg.asset.json";
const villa1 = asset(villa1_ptr);
const villa2 = asset(villa2_ptr);
const villa3 = asset(villa3_ptr);
const expPool = asset(expPool_ptr);
const expSpa = asset(expSpa_ptr);
const expDining = asset(expDining_ptr);
const expTrails = asset(expTrails_ptr);
const gallery1 = asset(gallery1_ptr);
const gallery4 = asset(gallery4_ptr);
export const villas = [
  {
    name: "The Cantilever",
    image: villa1,
    size: "8,200 sq ft",
    bedrooms: "4 Suites",
    tagline: "A glass residence suspended over the ravine",
    amenities: ["Private infinity edge", "Cellar & tasting room", "Panoramic study", "Heated stone deck"],
  },
  {
    name: "The Terraces",
    image: villa2,
    size: "9,600 sq ft",
    bedrooms: "5 Suites",
    tagline: "Sun-washed stone terraces above the water line",
    amenities: ["50m private pool", "Outdoor kitchen", "Wellness annexe", "Olive courtyard"],
  },
  {
    name: "The Courtyard",
    image: villa3,
    size: "11,400 sq ft",
    bedrooms: "6 Suites",
    tagline: "A serene single-level estate around still water",
    amenities: ["Reflecting pool", "Private cinema", "Meditation pavilion", "Staff residence"],
  },
] as const;

export const experiences = [
  {
    name: "The Infinity Pool",
    image: expPool,
    text: "A vanishing edge of still water meets the valley at first light, heated year-round, reserved entirely for residents.",
  },
  {
    name: "The Wellness Spa",
    image: expSpa,
    text: "Candlelit thermal chambers, cold plunge and treatment suites drawn from centuries of alpine ritual.",
  },
  {
    name: "Fine Dining",
    image: expDining,
    text: "A private chef's table with a seasonal tasting menu, forest-facing and by reservation only.",
  },
  {
    name: "Nature Trails",
    image: expTrails,
    text: "Fourteen kilometres of curated woodland trails winding through protected ancient pine.",
  },
] as const;

export const galleryImages = [
  { src: gallery1, alt: "Double-height clubhouse lounge", span: "tall" },
  { src: villa2, alt: "Villa with infinity pool at sunset", span: "wide" },
  { src: expSpa, alt: "Candlelit thermal spa", span: "normal" },
  { src: gallery4, alt: "Illuminated villa exterior at night", span: "tall" },
  { src: villa1, alt: "Cantilevered forest villa", span: "normal" },
  { src: expPool, alt: "Infinity pool over the valley", span: "wide" },
  { src: villa3, alt: "Courtyard residence and reflecting pool", span: "normal" },
  { src: expDining, alt: "Private forest-facing dining room", span: "normal" },
] as const;

export const testimonials = [
  {
    quote:
      "We have owned homes on three continents. Nothing has come close to the stillness of waking here, it is a different order of luxury entirely.",
    name: "A. & M. Rao",
    detail: "Owners, The Cantilever",
  },
  {
    quote:
      "The architecture disappears into the landscape. You feel held by the mountain rather than placed upon it.",
    name: "Sir Julian Hart",
    detail: "Owner, The Terraces",
  },
  {
    quote:
      "An investment that also happens to be the most beautiful place our family gathers. Faultless from first viewing to handover.",
    name: "Priya Menon",
    detail: "Owner, The Courtyard",
  },
] as const;

export const journal = [
  {
    title: "The Architecture of Stillness",
    category: "Design",
    date: "June 2026",
    excerpt:
      "How restraint, natural stone and framed views define the enduring language of Aranya Grande.",
  },
  {
    title: "Why Scarcity Defines Value in the Hills",
    category: "Investment",
    date: "May 2026",
    excerpt:
      "A closer look at land protection, limited release and the economics of true privacy.",
  },
  {
    title: "A Year in the Valley",
    category: "Estate Life",
    date: "April 2026",
    excerpt:
      "From first snow to the summer bloom, a season-by-season portrait of life at the estate.",
  },
] as const;