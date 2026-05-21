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
  { icon: Plug, title: "Full Hookups", text: "Every site at Pinewood Trails comes with full hookups — water, sewer, and electric. No need to hunt for a dump station or worry about running dry.", color: "bg-emerald-50 text-emerald-700" },
  { icon: Zap, title: "50A & 30A Electric", text: "We accommodate rigs of all sizes with both 50-amp and 30-amp service. Whether you're in a Class A diesel pusher or a compact travel trailer, you'll have the power you need.", color: "bg-amber-50 text-amber-700" },
  { icon: Droplet, title: "Fresh Municipal Water", text: "Clean, city-quality water runs to every site. No tanks to fill or water quality concerns — just reliable, fresh water right at your hookup.", color: "bg-sky-50 text-sky-700" },
  { icon: Wifi, title: "WiFi Available", text: "Stay connected throughout the park with our on-site WiFi. Whether you're working remotely or streaming after a long day on the road, we keep you linked in.", color: "bg-violet-50 text-violet-700" },
  { icon: ShowerHead, title: "Clean Showers", text: "Our bathhouse is kept spotless and stocked. Hot showers, private stalls, and a welcoming space — we take pride in maintaining facilities you'll actually want to use.", color: "bg-cyan-50 text-cyan-700" },
  { icon: WashingMachine, title: "On-Site Laundry", text: "Our on-site laundry room is open 24 hours a day. Coin-operated washers and dryers mean you never have to leave the park to keep your clothes fresh on a long trip.", color: "bg-teal-50 text-teal-700" },
  { icon: Trees, title: "Pine Forest Setting", text: "Set among the tall pines of Magnolia, Texas, our park offers natural shade, fresh air, and a serene atmosphere you won't find at a concrete lot. Nature is right outside your door.", color: "bg-green-50 text-green-700" },
  { icon: Gamepad2, title: "Playground", text: "Families love our on-site playground area. Kids have a safe, shaded space to run around and burn off energy while parents relax at the site.", color: "bg-orange-50 text-orange-700" },
  { icon: PawPrint, title: "Pet Friendly", text: "Your four-legged travel buddies are welcome here. We accept up to two dogs per RV — just keep them on a leash and never leave them unattended outside.", color: "bg-rose-50 text-rose-700" },
  { icon: Coffee, title: "Friendly On-Site Staff", text: "Our team is on-site Monday through Sunday, 8 AM to 5 PM. We're always happy to help with anything from directions to local dining recommendations.", color: "bg-yellow-50 text-yellow-700" },
  { icon: Dog, title: "Pet Boarding Nearby", text: "Dogs Gone Country, a well-regarded pet boarding facility, is right next door. Need a pet-free outing? You have convenient, trusted care just steps away.", color: "bg-pink-50 text-pink-700" },
  { icon: MapPin, title: "Convenient Location", text: "We're just minutes from Magnolia and Tomball — close to grocery stores, restaurants, Home Depot, and local attractions. Everything you need is never more than a short drive away.", color: "bg-indigo-50 text-indigo-700" },
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
            <div key={a.title} className="rounded-xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
              <div className={`inline-flex rounded-lg p-2.5 ${a.color}`}>
                <a.icon className="h-6 w-6" />
              </div>
              <div className="mt-4 font-display text-xl text-foreground">{a.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
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
