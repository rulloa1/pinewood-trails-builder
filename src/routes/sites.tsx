import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { BookingWidget } from "@/components/BookingWidget";
import { Plug, Droplet, Zap, Waves, Wifi, Trees, Star } from "lucide-react";
import sitePT from "@/assets/site-pull-through.jpg";
import siteBI from "@/assets/site-back-in.jpg";

export const Route = createFileRoute("/sites")({
  head: () => ({
    meta: [
      { title: "Sites & Rates — Pinewood Trails RV Park" },
      { name: "description", content: "Browse our pull-through and back-in RV sites with full hookups, 30A and 50A service. Nightly, weekly, and monthly rates available." },
    ],
  }),
  component: SitesPage,
});

const sites = Array.from({ length: 12 }).map((_, i) => {
  const num = [12, 14, 17, 19, 23, 24, 28, 31, 33, 35, 44, 46][i];
  const pullThrough = i % 2 === 0;
  return {
    num,
    type: pullThrough ? "Pull-Through" : "Back-In",
    amp: pullThrough ? "50A" : "30A",
    price: pullThrough ? 52 : 44,
    img: pullThrough ? sitePT : siteBI,
    featured: num === 35,
  };
});

function SitesPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <PageHero title="Sites & Rates" subtitle="29 spacious sites tucked beneath the pines." crumb="Sites & Rates" />

      <section className="mx-auto max-w-[1400px] px-6 py-10 md:px-10">
        <BookingWidget variant="compact" />
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10">
        <SectionTitle>AVAILABLE SITES</SectionTitle>
        <p className="mt-3 text-center text-muted-foreground">29 sites available</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sites.map((s) => (
            <div key={s.num} className="overflow-hidden rounded-xl bg-card shadow-md ring-1 ring-border transition hover:shadow-xl">
              <div className="relative">
                <img src={s.img} alt={`Site ${s.num}`} className="h-48 w-full object-cover" loading="lazy" />
                <span className="absolute left-3 top-3 rounded-md bg-primary px-2 py-1 text-sm font-bold text-primary-foreground">Site {s.num}</span>
                {s.featured && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-gold px-2 py-1 text-xs font-bold text-primary-deep">
                    <Star className="h-3 w-3" /> Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg text-foreground">Site {s.num}</div>
                    <div className="text-sm text-muted-foreground">{s.type} • {s.amp}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">${s.price}</div>
                    <div className="text-xs text-muted-foreground">/ night</div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <Badge icon={<Plug className="h-3 w-3" />}>Full Hookup</Badge>
                  <Badge icon={<Droplet className="h-3 w-3" />}>Water</Badge>
                  <Badge icon={<Zap className="h-3 w-3" />}>{s.amp}</Badge>
                  <Badge icon={<Wifi className="h-3 w-3" />}>WiFi</Badge>
                </div>
                <Link to="/book" className="mt-4 block rounded-md bg-primary py-2.5 text-center font-display text-primary-foreground hover:bg-primary-deep">Select Site</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rates table */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
          <SectionTitle>RATES</SectionTitle>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { label: "Nightly", price: "$52", note: "Pull-Through 50A", icon: Trees },
              { label: "Weekly", price: "$294", note: "7 nights — save 20%", icon: Waves },
              { label: "Monthly", price: "$650", note: "Plus metered electric", icon: Plug },
            ].map((r) => (
              <div key={r.label} className="rounded-xl border border-border bg-cream p-6 text-center shadow-sm">
                <r.icon className="mx-auto h-7 w-7 text-primary" />
                <div className="mt-3 font-display text-2xl tracking-wider text-primary">{r.label}</div>
                <div className="mt-2 text-4xl font-bold text-foreground">{r.price}</div>
                <div className="mt-1 text-sm text-muted-foreground">{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5">
      {icon}{children}
    </span>
  );
}
