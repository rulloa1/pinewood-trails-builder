import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { BookingWidget } from "@/components/BookingWidget";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Plug, Droplet, Zap, Waves, Wifi, Trees, Star, Ruler, CheckCircle2 } from "lucide-react";
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

type Site = {
  num: number;
  type: string;
  amp: "50A" | "30A";
  price: number;
  weekly: number;
  monthly: number;
  img: string;
  featured: boolean;
  maxLength: number;
  sewer: boolean;
  paved: boolean;
  shaded: boolean;
  slideOuts: boolean;
};

const SITE_NUMS = [12, 14, 17, 19, 23, 24, 28, 31, 33, 35, 44, 46];

const sites: Site[] = SITE_NUMS.map((num, i) => {
  const pullThrough = i % 2 === 0;
  return {
    num,
    type: pullThrough ? "Pull-Through" : "Back-In",
    amp: pullThrough ? "50A" : "30A",
    price: pullThrough ? 52 : 44,
    weekly: pullThrough ? 294 : 250,
    monthly: pullThrough ? 650 : 580,
    img: pullThrough ? sitePT : siteBI,
    featured: num === 35,
    maxLength: pullThrough ? 65 : 40,
    sewer: true,
    paved: true,
    shaded: true,
    slideOuts: pullThrough,
  };
});

function SitesPage() {
  const [selected, setSelected] = useState<Site | null>(null);

  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <PageHero title="Sites & Rates" subtitle="92 spacious sites tucked beneath the pines." crumb="Sites & Rates" />

      <section className="mx-auto max-w-[1400px] px-6 py-10 md:px-10">
        <BookingWidget variant="compact" />
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10">
        <SectionTitle>AVAILABLE SITES</SectionTitle>
        <p className="mt-3 text-center text-muted-foreground">92 sites across 7 rows — featured selection shown below</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sites.map((s) => (
            <button
              key={s.num}
              onClick={() => setSelected(s)}
              className="overflow-hidden rounded-xl bg-card text-left shadow-md ring-1 ring-border transition hover:shadow-xl hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
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
                    <div className="text-sm text-muted-foreground">{s.type} · {s.amp}</div>
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
                <div className="mt-4 w-full rounded-md bg-primary py-2 text-center font-display text-sm text-primary-foreground">
                  View Details
                </div>
              </div>
            </button>
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

      {/* Site detail modal */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg overflow-hidden p-0 bg-cream">
          <DialogTitle className="sr-only">
            {selected ? `Site ${selected.num} Details` : "Site Details"}
          </DialogTitle>
          {selected && <SiteDetail site={selected} onClose={() => setSelected(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SiteDetail({ site, onClose }: { site: Site; onClose: () => void }) {
  const nightlySavings = site.weekly - site.price * 7;
  return (
    <div>
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <img src={site.img} alt={`Site ${site.num}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div>
            <div className="font-display text-2xl font-bold text-white">Site {site.num}</div>
            <div className="text-sm text-white/80">{site.type} · {site.amp} Service</div>
          </div>
          {site.featured && (
            <span className="inline-flex items-center gap-1 rounded-md bg-gold px-2 py-1 text-xs font-bold text-primary-deep">
              <Star className="h-3 w-3" /> Featured
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        {/* Pricing */}
        <div className="grid grid-cols-3 divide-x divide-border rounded-lg border border-border bg-card text-center">
          <PriceCell label="Nightly" value={`$${site.price}`} />
          <PriceCell label="Weekly" value={`$${site.weekly}`} note={`Save $${Math.abs(nightlySavings)}`} />
          <PriceCell label="Monthly" value={`$${site.monthly}`} note="+ metered elec." />
        </div>

        {/* Amenities */}
        <div className="mt-5">
          <div className="mb-2 font-display text-sm tracking-wider text-primary">AMENITIES</div>
          <div className="grid grid-cols-2 gap-2">
            <AmenityRow icon={<Plug className="h-4 w-4" />} label="Full Hookups" />
            <AmenityRow icon={<Droplet className="h-4 w-4" />} label="Water & Sewer" />
            <AmenityRow icon={<Zap className="h-4 w-4" />} label={`${site.amp} Electric`} />
            <AmenityRow icon={<Wifi className="h-4 w-4" />} label="WiFi Available" />
            <AmenityRow icon={<Trees className="h-4 w-4" />} label="Shaded Site" />
            <AmenityRow icon={<CheckCircle2 className="h-4 w-4" />} label="Paved Pad" />
          </div>
        </div>

        {/* Specs */}
        <div className="mt-5">
          <div className="mb-2 font-display text-sm tracking-wider text-primary">SITE SPECS</div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Ruler className="h-4 w-4 text-primary" />
              Max {site.maxLength} ft
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              {site.type === "Pull-Through" ? "Drive-through access" : "Back-in access"}
            </span>
            {site.slideOuts && (
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Slide-outs OK
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/book"
          onClick={onClose}
          className="mt-6 block w-full rounded-lg bg-primary py-3 text-center font-display text-base text-primary-foreground shadow-md transition hover:bg-primary-deep"
        >
          Book Site {site.num} →
        </Link>
      </div>
    </div>
  );
}

function PriceCell({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="py-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-xl font-bold text-primary">{value}</div>
      {note && <div className="text-[11px] text-muted-foreground">{note}</div>}
    </div>
  );
}

function AmenityRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-card px-3 py-2 text-sm text-foreground ring-1 ring-border">
      <span className="text-primary">{icon}</span>
      {label}
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
