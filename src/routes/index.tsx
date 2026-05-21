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
          <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/50 via-primary-deep/15 to-transparent" />
          {/* Right-side dark gradient for text readability */}
          <div className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-gradient-to-l from-primary-deep/85 via-primary-deep/55 to-transparent" />
          <div className="relative mx-auto grid h-full max-w-[1400px] grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 md:px-10">
            <div className="order-2 md:order-1 reveal">
              <BookingWidget />
            </div>
            <div className="order-1 md:order-2 text-cream reveal">
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] drop-shadow-lg">
                Relax. Explore.<br />
                <span className="font-script text-6xl md:text-8xl font-medium text-accent drop-shadow-lg">Stay Awhile.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-cream drop-shadow-md">
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
      <section className="border-y border-border bg-cream">
        <div className="mx-auto grid max-w-[1400px] items-center gap-6 px-6 py-6 md:grid-cols-4 md:px-10">
          <InfoItem icon={<Phone />} title="Call Us Today!" text="832-521-3345  ·  832-671-5999" />
          <InfoItem icon={<Clock />} title="Office Hours" text="Monday – Sunday · 8AM – 5PM" />
          <InfoItem icon={<Calendar />} title="Ready to Reserve?" text="Book online or call — we're happy to help." />
          <Link to="/book" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-display text-primary-foreground hover:bg-primary-deep">
            Book Now
          </Link>
        </div>
      </section>

      {/* Park rules / location */}
      <section className="bg-primary-deep text-cream">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-12 md:grid-cols-3 md:px-10">
          <div>
            <div className="font-display tracking-[0.3em] text-sm mb-3">PARK RULES</div>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• No trespassing — Tenants & invited guests only</li>
              <li>• All guests must register in office w/ ID</li>
              <li>• Ask about $200 move in — We have RV rentals</li>
              <li>• No loud music • No loud vehicles</li>
              <li>• No storage under or around RV's</li>
              <li>• No outside trash cans at RV's</li>
              <li>• No more than 2 adults / 2 vehicles / 2 dogs per RV</li>
              <li>• No refunds on early departures • No sub leases</li>
              <li>• No fireworks • No gun fire in park</li>
              <li>• No dogs unattended outside</li>
              <li>• Quiet time 8PM – 8AM • Laundry room open 24 hrs</li>
              <li>• Speed limit 10 MPH</li>
            </ul>
            <Link to="/contact" className="mt-3 inline-block text-sm underline-offset-4 hover:underline">See more rules at check-in.</Link>
          </div>
          <div className="text-center">
            <div className="font-display text-2xl tracking-wide">PINEWOOD TRAILS</div>
            <div className="border-y border-cream/30 my-2 text-center text-xs tracking-[0.4em] py-0.5 mx-auto max-w-[160px]">RV PARK</div>
            <div className="font-script text-xl">Where folks love to live!</div>
          </div>
          <div>
            <div className="flex items-center gap-2 font-display text-xl"><MapPin className="h-5 w-5" /> Magnolia, Texas</div>
            <p className="mt-2 text-sm opacity-90">19651 Pinewood Trails Dr., Magnolia, TX 77355 — minutes from Tomball shopping, dining, and easy access to the Sam Houston National Forest.</p>
            <img src={welcomeSign} alt="Welcome sign" className="mt-4 h-32 w-full rounded object-cover" loading="lazy" />
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
      <span className="rounded-full bg-primary p-3 text-primary-foreground [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
      <div>
        <div className="font-display text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">{text}</div>
      </div>
    </div>
  );
}
