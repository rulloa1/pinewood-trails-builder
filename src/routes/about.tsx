import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Trees, Plug, User, ShowerHead, PawPrint, Leaf, Star } from "lucide-react";
import pineRoad from "@/assets/pine-road.jpg";
import teamEloise from "@/assets/team-eloise.jpg";
import teamVictor from "@/assets/team-victor.jpg";
import teamCuder from "@/assets/team-cuder.jpg";
import teamJan from "@/assets/team-jan.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Pinewood Trails RV Park" },
      {
        name: "description",
        content:
          "Our story: a family-owned RV park in Magnolia, TX dedicated to hospitality, community, and the comforts of home.",
      },
    ],
  }),
  component: AboutPage,
});

const special = [
  { icon: Trees, title: "Beautiful Pine\nForest Setting" },
  { icon: Plug, title: "Full Hookups\nat Every Site" },
  { icon: User, title: "Friendly,\nAttentive Staff" },
  { icon: ShowerHead, title: "Clean Facilities\nand Amenities" },
  { icon: PawPrint, title: "Pet-Friendly\nEnvironment" },
  { icon: Leaf, title: "Quiet, Peaceful\nAtmosphere" },
];

const team = [
  { name: "Eloise", role: "Co-Owner", img: teamEloise },
  { name: "Victor", role: "Co-Owner", img: teamVictor },
  { name: "Cuder", role: "Park Staff", img: teamCuder },
  { name: "Jan", role: "Park Staff", img: teamJan },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <PageHero
        title="Welcome to Pinewood Trails RV Park"
        subtitle="A peaceful retreat in the heart of the pines."
        crumb="About Us"
      />

      <section className="mx-auto max-w-[1400px] grid gap-10 px-6 py-14 md:px-10 lg:grid-cols-3">
        <div>
          <SectionTitle className="!justify-start">OUR STORY</SectionTitle>
          <div className="mt-2 font-script text-3xl text-primary">Where folks love to live!</div>
          <div className="mt-5 space-y-4 text-muted-foreground">
            <p>
              Pinewood Trails RV Park sits on a quiet stretch of Pinewood Trails Drive in Magnolia,
              Texas — just minutes from the shops of Tomball and easy driving distance from the Sam
              Houston National Forest. It's the kind of place that feels far from the city without
              being far from anything you need.
            </p>
            <p>
              We're a family-owned park, and it shows. Every site has full hookups, the facilities
              are kept clean, and our staff is here seven days a week to make sure your stay goes
              smoothly. We've welcomed everyone from full-time RVers putting down roots to weekend
              travelers passing through on their way west.
            </p>
            <p>
              Whether you're staying a night, a month, or longer — you're part of the Pinewood
              Trails family while you're here. We're glad to have you.
            </p>
          </div>
          <Link
            to="/book"
            className="mt-6 inline-flex rounded-md bg-primary px-6 py-3 font-display text-primary-foreground hover:bg-primary-deep"
          >
            Book Your Stay
          </Link>
        </div>

        <div className="lg:col-span-1">
          <img
            src={pineRoad}
            alt="Pine road"
            className="h-full max-h-[420px] w-full rounded-xl object-cover shadow-md"
            loading="lazy"
          />
        </div>

        <div>
          <SectionTitle className="!justify-start">WHAT MAKES US SPECIAL</SectionTitle>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {special.map((s) => (
              <div
                key={s.title}
                className="rounded-lg border border-border bg-card p-4 text-center shadow-sm"
              >
                <s.icon className="mx-auto h-7 w-7 text-primary" />
                <div className="mt-2 whitespace-pre-line text-sm font-medium text-foreground">
                  {s.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-[1400px] grid gap-10 px-6 py-14 md:px-10 lg:grid-cols-2">
          <div>
            <SectionTitle>OUR PEOPLE</SectionTitle>
            <h2 className="mt-4 text-center font-display text-4xl md:text-5xl font-bold text-foreground">
              Meet the Team
            </h2>
            <p className="mt-3 text-center text-muted-foreground">
              The folks who make Pinewood Trails feel like home.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {team.map((t) => (
                <div key={t.name} className="text-center">
                  <div className="mx-auto h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full ring-4 ring-primary">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width={512}
                      height={512}
                    />
                  </div>
                  <div className="mt-4 font-display text-lg font-bold text-foreground">
                    {t.name}
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    {t.role}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>GUEST TESTIMONIALS</SectionTitle>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  quote:
                    "Beautiful park with tall pines, clean facilities, and friendly staff. We loved our stay and will definitely be back!",
                  by: "The Johnson Family",
                  from: "Houston, TX",
                },
                {
                  quote:
                    "Quiet, peaceful, and perfect for a long stay. Full hookups, great WiFi, and close to everything we needed.",
                  by: "Richard & Martha P.",
                  from: "Spring, TX",
                },
              ].map((q) => (
                <div key={q.by} className="rounded-lg border border-border bg-cream p-5 shadow-sm">
                  <p className="italic text-foreground">“{q.quote}”</p>
                  <div className="mt-3 flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    — {q.by}, {q.from}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
