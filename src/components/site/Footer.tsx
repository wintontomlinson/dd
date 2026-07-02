import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Youtube, ArrowRight } from "lucide-react";

const COLS = [
  {
    title: "Explore",
    links: [
      { to: "/about", label: "About" },
      { to: "/estate", label: "The Estate" },
      { to: "/villas", label: "Villas" },
      { to: "/amenities", label: "Amenities" },
    ],
  },
  {
    title: "Discover",
    links: [
      { to: "/gallery", label: "Gallery" },
      { to: "/investment", label: "Investment" },
      { to: "/location", label: "Location" },
      { to: "/blogs", label: "Journal" },
    ],
  },
] as const;

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <span className="font-display text-3xl tracking-[0.14em]">ARANYA</span>
            <span className="overline mt-2 block text-gold">Grande Estate</span>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/55">
              A private collection of forty architectural residences set within a
              protected valley of ancient pine and still water.
            </p>
            <div className="mt-8 flex gap-4">
              {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-ivory/15 text-ivory/70 transition-colors duration-500 hover:border-gold hover:text-gold"
                >
                  <Icon strokeWidth={1.4} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="overline text-gold">{col.title}</h4>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-ivory/65 transition-colors hover:text-ivory"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="overline text-gold">Private Newsletter</h4>
            <p className="mt-6 text-sm text-ivory/55">
              Receive release notes, private viewings and estate journal editions.
            </p>
            {sent ? (
              <p className="mt-6 text-sm text-gold">Thank you, you are on the list.</p>
            ) : (
              <form
                className="mt-6 flex items-center border-b border-ivory/20 pb-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSent(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-transparent text-sm text-ivory placeholder:text-ivory/35 focus:outline-none"
                />
                <button
                  aria-label="Subscribe"
                  className="text-gold transition-transform duration-500 hover:translate-x-1"
                >
                  <ArrowRight strokeWidth={1.4} className="h-5 w-5" />
                </button>
              </form>
            )}
            <div className="mt-10 space-y-1 text-sm text-ivory/55">
              <p>+91 98765 43210</p>
              <p>residences@aranyagrande.com</p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-ivory/10 pt-8 text-xs text-ivory/40 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Aranya Grande Estate. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ivory/70">Privacy</a>
            <a href="#" className="hover:text-ivory/70">Terms</a>
            <a href="#" className="hover:text-ivory/70">RERA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}