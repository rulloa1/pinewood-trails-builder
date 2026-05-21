import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingWidget } from "@/components/BookingWidget";
import { SectionTitle } from "@/components/SectionTitle";
import { Calendar, Clock, Phone, Plug, Zap, WashingMachine, Wifi, ShowerHead, Gamepad2, Heart, MapPin, ChevronDown, TreePine } from "lucide-react";
import heroImg from "@/assets/hero-sunset.webp";
import mapImg from "@/assets/park-map.jpg";
import sitePT from "@/assets/site-pull-through.jpg";
import siteBI from "@/assets/site-back-in.jpg";
import welcomeSign from "@/assets/welcome-sign.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pinewood Trails RV Park — Magnolia, TX | Home" },
      { name: "description", content: "Spacious RV sites, modern amenities, and the peace of the pines in Magnolia, Texas. Book your stay at Pinewood Trails RV Park." },
    ],
  }),
  component: HomePage,
});

const amenities = [
  { icon: Plug, label: "Full\nHookups" },
  { icon: Zap, label: "50A/30A\nService" },
  { icon: WashingMachine, label: "Laundry\nRoom" },
  { icon: Wifi, label: "WiFi\nAvailable" },
  { icon: ShowerHead, label: "Clean\nShowers" },
  { icon: Gamepad2, label: "Playground\nArea" },
];

const sampleSites = [
  { num: 35, type: "Pull-Through", amp: "50A", price: 52, img: sitePT },
  { num: 8, type: "Back-In", amp: "30A", price: 44, img: siteBI },
  { num: 27, type: "Pull-Through", amp: "50A", price: 52, img: sitePT },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />

      {/* HERO */}
      <section className="relative">
        <div className="relative h-[560px] md:h-[640px] overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={heroImg}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            <img src={heroImg} alt="Pinewood Trails RV Park" className="absolute inset-0 h-full w-full object-cover" />
          </video>
          {/* Base wash */}
          <div className="absolute inset-1 bg-gradient-to-r from-primary-deep/60 via-primary-deep/20 to-transparent" />
          {/* Localized dark gradient behind text for readability */}
          <div className="absolute inset-y-0 right-0 w-full md:w-[55%] bg-gradient-to-l from-primary-deep/90 via-primary-deep/65 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-[1400px] grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 md:px-10">
            <div className="order-2 md:order-1 reveal">
              <BookingWidget />
            </div>
            <div className="order-1 md:order-2 flex flex-col items-center md:items-end text-cream reveal">
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] drop-shadow-lg text-center md:text-right">
                Relax. Explore.<br />
                <span className="font-script text-6xl md:text-8xl font-medium text-accent drop-shadow-lg">Stay Awhile.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-cream drop-shadow-md text-center md:text-right">
                92 sites tucked beneath the East Texas pines. Full hookups, 50A/30A service, and friendly staff ready to welcome you.
              </p>
              <Link to="/amenities" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-display font-semibold text-accent-foreground shadow-lg transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-xl">
                View Amenities <TreePine className="h-5 w-5" />
              </Link>
            </div>
          </div>
          {/* Bouncing scroll arrow */}
          <a
            href="#welcome"
            aria-label="Scroll down"
            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-cream/15 text-cream ring-1 ring-cream/30 backdrop-blur-md animate-bounce-down hover:bg-cream/25 transition"
          >
            <ChevronDown className="h-6 w-6" />
          </a>
        </div>
      </section>

      {/* WELCOME / AMENITIES STRIP + MAP */}
      <section id="welcome" className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 grid gap-12 lg:grid-cols-2 reveal">
        <div>
          <SectionTitle className="!justify-start">Welcome to Pinewood Trails</SectionTitle>
          <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-6">
            {amenities.map((a) => (
              <div
                key={a.label}
                className="group flex flex-col items-center gap-3 rounded-xl border border-accent/25 bg-gradient-to-b from-card to-accent/10 p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent/60"
              >
                <a.icon className="h-10 w-10 text-accent transition-transform duration-300 group-hover:scale-110" />
                <span className="whitespace-pre-line text-sm font-semibold text-primary-deep">{a.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-accent/40 bg-card px-6 py-3 shadow-sm">
            <TreePine className="h-5 w-5 text-accent" />
            <span className="font-script text-2xl text-primary-deep">Where folks love to live!</span>
            <TreePine className="h-5 w-5 text-accent" />
          </div>
        </div>

        <div>
          <SectionTitle className="!justify-start">Available Sites</SectionTitle>
          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_280px]">
            <div className="relative overflow-hidden rounded-2xl ring-2 ring-accent/30 shadow-lg">
              <img src={mapImg} alt="Park map" className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
              <Link to="/sites" className="absolute bottom-3 right-3 rounded-lg bg-cream/95 px-3 py-1.5 text-sm font-medium text-primary-deep shadow-md hover:bg-accent hover:text-accent-foreground transition">View All Sites</Link>
            </div>
            <div className="flex flex-col gap-3">
              {sampleSites.map((s) => (
                <div
                  key={s.num}
                  className="group flex gap-3 rounded-xl border border-border bg-card p-2 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02] hover:border-accent/50"
                >
                  <img src={s.img} alt={`Site ${s.num}`} className="h-20 w-24 rounded-lg object-cover" loading="lazy" />
                  <div className="flex flex-1 flex-col justify-between py-1 pr-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-primary-deep px-1.5 py-0.5 text-xs font-bold text-cream">{s.num}</span>
                        <span className="font-semibold text-primary-deep">Site {s.num}</span>
                        <Heart className="ml-auto h-4 w-4 text-accent" />
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-deep">{s.type}</span>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">{s.amp}</span>
                      </div>
                      <div className="mt-1 text-sm"><span className="font-bold text-primary-deep">${s.price}</span> <span className="text-xs text-muted-foreground">/night</span></div>
                    </div>
                  </div>
                  <Link to="/book" className="self-center rounded-lg bg-accent px-3 py-2 text-xs font-semibold uppercase tracking-wider text-accent-foreground shadow transition-all duration-300 hover:bg-primary-deep hover:text-cream hover:-translate-y-0.5">
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="border-y border-accent/40 bg-gradient-to-r from-cream via-accent/10 to-cream">
        <div className="mx-auto grid max-w-[1400px] items-center gap-6 px-6 py-8 md:grid-cols-4 md:px-10">
          <InfoItem icon={<Phone />} title="Call Us Today!" text="832-521-3345  ·  832-671-5999" />
          <InfoItem icon={<Clock />} title="Office Hours" text="Monday – Sunday · 8AM – 5PM" />
          <InfoItem icon={<Calendar />} title="Ready to Reserve?" text="Book online or call — we're happy to help." />
          <Link to="/book" className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 font-display font-semibold text-accent-foreground shadow-md transition-all duration-300 hover:bg-primary-deep hover:text-cream hover:-translate-y-0.5 hover:shadow-xl">
            Book Now
          </Link>
        </div>
      </section>

      {/* Park rules / location */}
      <section className="bg-cream py-20 reveal">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionTitle>Park Rules &amp; Location</SectionTitle>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Park rules card — parchment */}
            <div className="rounded-2xl border-2 border-accent/30 bg-gradient-to-b from-cream to-accent/10 p-7 shadow-lg">
              <div className="section-heading text-sm text-primary-deep mb-4 flex items-center gap-2">
                <TreePine className="h-4 w-4 text-accent" /> Park Rules
              </div>
              <ul className="space-y-2 text-sm text-foreground">
                {[
                  "No trespassing — Tenants & invited guests only",
                  "All guests must register in office w/ ID",
                  "Ask about $200 move in — We have RV rentals",
                  "No loud music • No loud vehicles",
                  "No storage under or around RV's",
                  "No outside trash cans at RV's",
                  "No more than 2 adults / 2 vehicles / 2 dogs per RV",
                  "No refunds on early departures • No sub leases",
                  "No fireworks • No gun fire in park",
                  "No dogs unattended outside",
                  "Quiet time 8PM – 8AM • Laundry room open 24 hrs",
                  "Speed limit 10 MPH",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-2">
                    <TreePine className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-4 inline-block text-sm font-semibold text-primary-deep underline-offset-4 hover:underline hover:text-accent transition">
                See more rules at check-in →
              </Link>
            </div>

            {/* Brand mark center */}
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-accent/30 bg-primary-deep p-7 text-cream shadow-lg">
              <TreePine className="h-12 w-12 text-accent" />
              <div className="mt-3 font-display text-2xl font-bold tracking-wide">PINEWOOD TRAILS</div>
              <div className="border-y border-accent/40 my-2 text-center text-xs tracking-[0.4em] py-0.5 px-4 text-accent">RV PARK</div>
              <div className="font-script text-2xl mt-1">Where folks love to live!</div>
            </div>

            {/* Location */}
            <div className="rounded-2xl border-2 border-accent/30 bg-gradient-to-b from-cream to-accent/10 p-7 shadow-lg">
              <div className="section-heading text-sm text-primary-deep mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" /> Magnolia, Texas
              </div>
              <p className="text-sm text-foreground">19651 Pinewood Trails Dr., Magnolia, TX 77355 — minutes from Tomball shopping, dining, and easy access to the Sam Houston National Forest.</p>
              <img src={welcomeSign} alt="Welcome sign" className="mt-4 h-40 w-full rounded-xl object-cover shadow-md" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function InfoItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="rounded-full bg-accent p-3 text-accent-foreground shadow-md transition-transform duration-300 hover:scale-110 [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
      <div>
        <div className="font-display font-semibold text-primary-deep">{title}</div>
        <div className="text-sm text-muted-foreground">{text}</div>
      </div>
    </div>
  );
}
