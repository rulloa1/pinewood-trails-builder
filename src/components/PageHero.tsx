import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import welcomeSign from "@/assets/welcome-sign.jpg";

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
    <section className="relative h-[300px] md:h-[360px] overflow-hidden">
      <img src={welcomeSign} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/85 via-primary-deep/55 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 md:px-10">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-cream">{title}</h1>
        {subtitle && <p className="mt-3 text-lg text-cream/90 max-w-xl">{subtitle}</p>}
        <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-primary-deep/70 px-4 py-2 text-cream backdrop-blur-sm">
          <Link to="/" className="inline-flex items-center gap-1.5 hover:underline"><Home className="h-4 w-4" /> Home</Link>
          <span className="opacity-60">›</span>
          <span className="font-medium">{crumb}</span>
        </div>
      </div>
    </section>
  );
}
