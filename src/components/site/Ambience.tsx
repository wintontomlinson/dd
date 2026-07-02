import { useEffect, useRef, useState } from "react";

/** Page-load intro with logo reveal, shown once per session. */
export function IntroLoader() {
  const [gone, setGone] = useState(false);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("aranya-intro")) {
      setGone(true);
      return;
    }
    sessionStorage.setItem("aranya-intro", "1");
    const t1 = setTimeout(() => setHide(true), 2100);
    const t2 = setTimeout(() => setGone(true), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  if (gone) return null;
  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-charcoal transition-opacity duration-700 ${
        hide ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <div className="overflow-hidden">
          <div className="animate-fade-in font-display text-5xl tracking-[0.2em] text-ivory md:text-7xl">
            ARANYA
          </div>
        </div>
        <div className="mx-auto mt-4 h-px w-0 bg-gold" style={{ animation: "intro-line 1.6s ease-out 0.4s forwards" }} />
        <div className="mt-4 overline text-gold/80">Himalayan Luxury Living</div>
      </div>
      <style>{`@keyframes intro-line{to{width:180px}}`}</style>
    </div>
  );
}

/** Thin gold scroll progress indicator fixed to the top. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[150] h-0.5 bg-transparent">
      <div ref={ref} className="h-full origin-left bg-gold" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

/** Mouse-follow custom cursor with a dot and lagging ring. Desktop only. */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let rx = 0, ry = 0, x = 0, y = 0, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      const t = e.target as HTMLElement;
      const interactive = !!t.closest("a, button, [data-cursor]");
      if (ring.current) {
        ring.current.style.width = interactive ? "64px" : "42px";
        ring.current.style.height = interactive ? "64px" : "42px";
        ring.current.style.background = interactive
          ? "color-mix(in oklab, var(--gold) 14%, transparent)"
          : "transparent";
      }
    };
    const loop = () => {
      rx += (x - rx) * 0.15; ry += (y - ry) * 0.15;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    document.body.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
    };
  }, []);
  return (
    <>
      <div ref={ring} className="cursor-ring hidden md:block" />
      <div ref={dot} className="cursor-dot hidden md:block" />
    </>
  );
}

/** Slowly drifting champagne leaves across the viewport. */
export function DriftingLeaves() {
  const leaves = Array.from({ length: 9 });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {leaves.map((_, i) => (
        <span
          key={i}
          className="leaf"
          style={{
            left: `${(i * 11 + 5) % 100}%`,
            animationDuration: `${16 + (i % 5) * 4}s`,
            animationDelay: `${i * 2.4}s`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}