import { asset } from "@/lib/asset";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { journal } from "@/lib/estate-data";
import { RevealGroup } from "@/lib/anim";
import { ArrowUpRight } from "lucide-react";
import blog1_ptr from "@/assets/blog-1.jpg.asset.json";
import gallery1_ptr from "@/assets/gallery-1.jpg.asset.json";
import expTrails_ptr from "@/assets/exp-trails.jpg.asset.json";
const blog1 = asset(blog1_ptr);
const gallery1 = asset(gallery1_ptr);
const expTrails = asset(expTrails_ptr);
const covers = [blog1, gallery1, expTrails];

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Journal | Aranya Grande" },
      {
        name: "description",
        content:
          "Reflections on design, investment and estate life from Aranya Grande, the estate journal.",
      },
      { property: "og:title", content: "Journal | Aranya Grande" },
      {
        property: "og:description",
        content: "Reflections on design, investment and estate life.",
      },
      { property: "og:image", content: blog1 },
    ],
  }),
  component: Blogs,
});

function Blogs() {
  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Notes from the valley"
        subtitle="Perspectives on design, permanence and life at Aranya Grande."
        image={blog1}
      />
      <section className="bg-background py-24 md:py-32">
        <RevealGroup className="mx-auto grid max-w-[1400px] gap-x-8 gap-y-14 px-6 md:grid-cols-3 md:px-10">
          {journal.map((post, i) => (
            <article key={post.title} className="group cursor-pointer">
              <div className="img-mask relative aspect-[4/3] overflow-hidden">
                <img
                  src={covers[i]}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
              </div>
              <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <span className="text-gold">{post.category}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
              <h2 className="mt-3 flex items-start justify-between gap-3 font-display text-2xl text-foreground transition-colors group-hover:text-gold">
                {post.title}
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-gold opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100" />
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
            </article>
          ))}
        </RevealGroup>
      </section>
      <CTABand />
    </>
  );
}