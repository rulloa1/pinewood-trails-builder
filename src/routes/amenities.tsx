import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Plug, Zap, Droplet, Wifi, ShowerHead, WashingMachine, Trees, Gamepad2, Dog, PawPrint, Coffee, MapPin } from "lucide-react";

export const Route = createFileRoute("/amenities")({
  head: () => ({
    meta: [
      { title: "Amenities — Pinewood Trails RV Park" },
      { name: "description", content: "Full hookups, 30A/50A, WiFi, laundry, clean showers, playground, and a pet-friendly pine setting." },
    ],
  }),
  component: AmenitiesPage,
});

const amenities = [
  { icon: Plug, title: "Full Hookups", text: "Water, sewer, and electric at every site." },
  { icon: Zap, title: "50A & 30A Service", text: "Power for every rig, big or small." },
  { icon: Droplet, title: "Fresh Water", text: "Clean municipal water at every spot." },
  { icon: Wifi, title: "WiFi Available", text: "Stay connected throughout the park." },
  { icon: ShowerHead, title: "Clean Showers", text: "Spotless, modern bathhouse." },
  { icon: WashingMachine, title: "Laundry Room", text: "Convenient on-site laundry." },
  { icon: Trees, title: "Pine Forest Setting", text: "Shaded sites under tall pines." },
  { icon: Gamepad2, title: "Playground", text: "Family-friendly play area." },
  { icon: PawPrint, title: "Pet Friendly", text: "Bring your furry travel buddies." },
  { icon: Coffee, title: "Friendly Staff", text: "Helpful folks, always ready to assist." },
  { icon: Dog, title: "Pet Boarding Nearby", text: "Dogs Gone Country next door." },
  { icon: MapPin, title: "Great Location", text: "Minutes from Magnolia & Tomball." },
];

function AmenitiesPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <PageHero title="Amenities" subtitle="Everything you need for a comfortable stay." crumb="Amenities" />

      <section className="mx-auto max-w-[1400px] px-6 py-14 md:px-10">
        <SectionTitle>WHAT MAKES US SPECIAL</SectionTitle>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a) => (
            <div key={a.title} className="rounded-xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md">
              <a.icon className="h-9 w-9 text-primary" />
              <div className="mt-4 font-display text-xl text-foreground">{a.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-deep text-cream">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-6 py-12 text-center md:px-10">
          <div className="font-script text-3xl">Ready to enjoy the pines?</div>
          <Link to="/book" className="rounded-md bg-cream px-6 py-3 font-display text-primary-deep hover:bg-cream/90">Book Your Stay</Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
