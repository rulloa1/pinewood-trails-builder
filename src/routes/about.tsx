import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Trees, Plug, User, ShowerHead, PawPrint, Leaf, Star } from "lucide-react";
import pineRoad from "@/assets/pine-road.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Pinewood Trails RV Park" },
      { name: "description", content: "Our story: a family-owned RV park in Magnolia, TX dedicated to hospitality, community, and the comforts of home." },
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
  { name: "James Martin", role: "Park Manager" },
  { name: "Sarah Johnson", role: "Office Manager" },
  { name: "Mike Thompson", role: "Maintenance" },
  { name: "Lisa Rodriguez", role: "Guest Services" },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <PageHero title="Welcome to Pinewood Trails RV Park" subtitle="A peaceful retreat in the heart of the pines." crumb="About Us" />

      <section className="mx-auto max-w-[1400px] grid gap-10 px-6 py-14 md:px-10 lg:grid-cols-3">
        <div>
          <SectionTitle className="!justify-start">OUR STORY</SectionTitle>
          <div className="mt-2 font-script text-3xl text-primary">Where folks love to live!</div>
          <div className="mt-5 space-y-4 text-muted-foreground">
            <p>Pinewood Trails RV Park has been a beloved destination for travelers and long-term guests alike. Nestled among towering pine trees, we offer a peaceful escape with the comforts of home.</p>
            <p>Our family-owned park is built on the values of hospitality, community, and care. We're committed to providing a clean, safe, and welcoming environment where guests can relax, recharge, and feel right at home.</p>
            <p>Whether you're here for a weekend or a season, we're glad you're part of the Pinewood Trails family.</p>
          </div>
          <Link to="/book" className="mt-6 inline-flex rounded-md bg-primary px-6 py-3 font-display text-primary-foreground hover:bg-primary-deep">Book Your Stay</Link>
        </div>

        <div className="lg:col-span-1">
          <img src={pineRoad} alt="Pine road" className="h-full max-h-[420px] w-full rounded-xl object-cover shadow-md" loading="lazy" />
        </div>

        <div>
          <SectionTitle className="!justify-start">WHAT MAKES US SPECIAL</SectionTitle>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {special.map((s) => (
              <div key={s.title} className="rounded-lg border border-border bg-card p-4 text-center shadow-sm">
                <s.icon className="mx-auto h-7 w-7 text-primary" />
                <div className="mt-2 whitespace-pre-line text-sm font-medium text-foreground">{s.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-[1400px] grid gap-10 px-6 py-14 md:px-10 lg:grid-cols-2">
          <div>
            <SectionTitle>MEET THE TEAM</SectionTitle>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {team.map((t) => (
                <div key={t.name} className="text-center">
                  <div className="mx-auto h-24 w-24 rounded-md bg-primary/15 ring-2 ring-primary/30" />
                  <div className="mt-2 font-display text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">Our team is here to make your stay comfortable and memorable!</p>
          </div>

          <div>
            <SectionTitle>GUEST TESTIMONIALS</SectionTitle>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { quote: "Beautiful park with tall pines, clean facilities, and friendly staff. We loved our stay and will definitely be back!", by: "The Johnson Family", from: "Houston, TX" },
                { quote: "Quiet, peaceful, and perfect for a long stay. Full hookups, great WiFi, and close to everything we needed.", by: "Richard & Martha P.", from: "Spring, TX" },
              ].map((q) => (
                <div key={q.by} className="rounded-lg border border-border bg-cream p-5 shadow-sm">
                  <p className="italic text-foreground">“{q.quote}”</p>
                  <div className="mt-3 flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">— {q.by}, {q.from}</div>
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
