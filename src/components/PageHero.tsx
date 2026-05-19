import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import heroBg from "@/assets/page-hero-pines.jpg";

export function PageHero({
  title,
  subtitle,
  crumb,
}: {
  title: string;
  subtitle?: string;
  crumb: string;
}) {
  return (
    <section className="relative h-[260px] md:h-[320px] overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-primary-deep/75" />
      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 md:px-10">
        <nav className="mb-4 flex items-center gap-2 text-sm text-cream/80">
          <Link to="/" className="inline-flex items-center gap-1.5 hover:text-cream"><Home className="h-3.5 w-3.5" /> Home</Link>
          <span className="opacity-50">/</span>
          <span className="text-cream">{crumb}</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-cream tracking-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-base md:text-lg text-cream/80 max-w-xl">{subtitle}</p>}
      </div>
    </section>
  );
}
