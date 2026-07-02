import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { X, Menu } from "lucide-react";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/estate", label: "The Estate" },
  { to: "/villas", label: "Villas" },
  { to: "/amenities", label: "Amenities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/investment", label: "Investment" },
  { to: "/location", label: "Location" },
  { to: "/blogs", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !onHome;
  const textLight = onHome && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-background/90 backdrop-blur-md border-b border-border py-3 shadow-[0_1px_20px_-12px_rgba(0,0,0,0.5)]"
            : "py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 md:px-10">
          <Link
            to="/"
            aria-label="Aranya Grande, home"
            className={`flex shrink-0 flex-col leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
              textLight ? "text-ivory" : "text-foreground"
            }`}
          >
            <span className="font-display text-2xl tracking-[0.14em]">
              ARANYA
            </span>
            <span className="overline mt-1 text-gold" style={{ fontSize: "0.55rem" }}>
              Grande&nbsp;Estate
            </span>
          </Link>

          <nav className="hidden items-center gap-7 xl:gap-9 lg:flex">
            {LINKS.slice(1, 8).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-underline text-[0.68rem] font-medium uppercase tracking-[0.24em] transition-colors ${
                  textLight
                    ? "text-ivory/85 hover:text-ivory"
                    : "text-foreground/75 hover:text-foreground"
                }`}
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className={`inline-flex items-center border px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] transition-all duration-500 sm:px-6 sm:py-2.5 sm:text-[0.62rem] sm:tracking-[0.24em] ${
                textLight
                  ? "border-ivory/25 text-ivory hover:border-ivory hover:bg-ivory hover:text-charcoal"
                  : "border-gold/40 text-gold hover:border-gold hover:bg-gold hover:text-charcoal"
              }`}
            >
              Enquire
            </Link>
            <button
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className={`group flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
                textLight ? "text-ivory" : "text-foreground"
              } ${textLight ? "border-ivory/20 hover:border-ivory/50" : "border-border hover:border-foreground/40"}`}
            >
              <Menu strokeWidth={1.4} className="h-5 w-5" />
            </button>
            <button
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className={`group hidden flex-col items-end gap-1.5 transition-colors lg:flex ${
                textLight ? "text-ivory" : "text-foreground"
              }`}
            >
              <span className="block h-px w-7 bg-current" />
              <span className="block h-px w-5 bg-current transition-all duration-300 group-hover:w-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-[60] bg-charcoal text-ivory transition-all duration-700 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1400px] flex-col px-6 md:px-10">
          <div className="flex items-center justify-between py-6">
            <span className="font-display text-2xl tracking-[0.14em]">ARANYA</span>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-ivory transition-transform duration-500 hover:rotate-90"
            >
              <X strokeWidth={1.4} className="h-7 w-7" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1 pb-16">
            {LINKS.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-5 py-1.5"
              >
                <span className="overline w-8 text-gold/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-4xl text-ivory/80 transition-colors duration-500 group-hover:text-gold md:text-6xl">
                  {l.label}
                </span>
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 border-t border-ivory/10 py-6 text-sm text-ivory/50 md:flex-row md:justify-between">
            <span>Dhanaulti · Uttarakhand · India</span>
            <span>+91 98765 43210 · residences@aranyagrande.com</span>
          </div>
        </div>
      </div>
    </>
  );
}