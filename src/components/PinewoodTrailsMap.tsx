import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { MapPin, Phone, Navigation } from "lucide-react";

const ADDRESS = "Magnolia, TX 77354";
const MAP_QUERY = encodeURIComponent("Magnolia, Texas");

export default function PinewoodTrailsMap() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <PageHero
        eyebrow="Find Us"
        title="Pinewood Trails on the Map"
        subtitle="Tucked into the pines of Magnolia, Texas — easy to reach, hard to leave."
      />

      <section className="mx-auto max-w-[1400px] px-6 py-12 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="overflow-hidden rounded-lg border border-border shadow-md">
            <iframe
              title="Pinewood Trails RV Park location"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              className="h-[520px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 font-display text-xl text-primary">
                <MapPin className="h-5 w-5" /> Address
              </div>
              <p className="mt-2 text-foreground">{ADDRESS}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-display text-primary-foreground hover:bg-primary-deep"
              >
                <Navigation className="h-4 w-4" /> Get Directions
              </a>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 font-display text-xl text-primary">
                <Phone className="h-5 w-5" /> Call the Office
              </div>
              <p className="mt-2 text-foreground">832-521-3345</p>
              <p className="text-foreground">832-671-5999</p>
              <p className="mt-2 text-sm text-muted-foreground">Open 8AM – 5PM, 7 days a week</p>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary-deep p-6 text-cream shadow-sm">
              <div className="font-script text-2xl">Where folks love to live!</div>
              <p className="mt-2 text-sm opacity-90">
                Minutes from local shopping, dining, and the natural beauty of the Sam Houston National Forest.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
