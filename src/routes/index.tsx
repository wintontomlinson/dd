import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { AboutSplit } from "@/components/site/AboutSplit";
import { VillasShowcase } from "@/components/site/VillasShowcase";
import { MasterPlan } from "@/components/site/MasterPlan";
import { Lifestyle } from "@/components/site/Lifestyle";
import { Investment } from "@/components/site/Investment";
import { Testimonials } from "@/components/site/Testimonials";
import { CTABand } from "@/components/site/CTABand";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <AboutSplit />
      <VillasShowcase />
      <MasterPlan />
      <Lifestyle />
      <Investment />
      <Testimonials />
      <CTABand />
    </>
  );
}
