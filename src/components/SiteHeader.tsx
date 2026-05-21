import { Link, useLocation } from "@tanstack/react-router";
import { Calendar, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/sites", label: "Sites & Rates" },
  { to: "/map", label: "Park Map" },
  { to: "/amenities", label: "Amenities" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md shadow-[0_2px_18px_-6px_rgba(92,32,24,0.25)] border-b border-accent/30"
          : "bg-cream/95 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 md:px-8 md:py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-end gap-1 text-primary">
            <svg viewBox="0 0 24 32" className="h-10 w-7 md:h-12 md:w-9" fill="currentColor">
              <path d="M12 0 L4 12 L8 12 L2 22 L8 22 L0 32 L24 32 L16 22 L22 22 L16 12 L20 12 Z" />
            </svg>
            <svg viewBox="0 0 24 32" className="h-8 w-6 md:h-10 md:w-7 opacity-80" fill="currentColor">
              <path d="M12 0 L4 12 L8 12 L2 22 L8 22 L0 32 L24 32 L16 22 L22 22 L16 12 L20 12 Z" />
            </svg>
          </div>
          <div className="leading-none">
            <div className="font-display text-2xl md:text-3xl font-bold tracking-wide text-primary">
              PINEWOOD TRAILS
            </div>
            <div className="border-y border-primary/40 my-1 text-center text-[10px] md:text-xs tracking-[0.4em] text-primary py-0.5">
              RV PARK
            </div>
            <div className="font-script text-base md:text-lg text-primary text-center">
              Where folks love to live!
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`font-display text-lg transition-colors ${
                  active
                    ? "text-primary font-semibold underline underline-offset-8 decoration-2"
                    : "text-primary/80 hover:text-primary"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/book"
            className="hidden md:inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-display text-base text-primary-foreground shadow-md transition hover:bg-primary-deep"
          >
            <Calendar className="h-5 w-5" /> Book Now
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden rounded-md p-2 text-primary"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-primary/10 bg-cream px-4 pb-4">
          <div className="flex flex-col gap-2 pt-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 font-display text-lg text-primary hover:bg-primary/5"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-display text-primary-foreground"
            >
              <Calendar className="h-5 w-5" /> Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
