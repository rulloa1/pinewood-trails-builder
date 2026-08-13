import { Facebook, Instagram, MapPin, Phone, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-primary-deep text-cream border-t-4 border-accent">
      <div className="mx-auto max-w-[1400px] grid gap-10 px-6 py-12 md:grid-cols-4 md:px-10">
        <div>
          <div className="font-display text-2xl font-bold tracking-wide">PINEWOOD TRAILS</div>
          <div className="border-y border-primary-foreground/30 my-2 text-center text-xs tracking-[0.4em] py-0.5">
            RV PARK
          </div>
          <div className="font-script text-xl text-center">Where folks love to live!</div>
        </div>
        <div>
          <div className="font-display text-sm tracking-[0.3em] mb-3">CONTACT US</div>
          <div className="flex items-center gap-2 text-sm py-1">
            <Phone className="h-4 w-4" /> 832-521-3345
          </div>
          <div className="flex items-center gap-2 text-sm py-1">
            <Phone className="h-4 w-4" /> 832-671-5999
          </div>
          <div className="flex items-center gap-2 text-sm py-1 mt-2">info@pinewoodtrailsrv.com</div>
        </div>
        <div>
          <div className="font-display text-sm tracking-[0.3em] mb-3">VISIT US</div>
          <div className="flex items-start gap-2 text-sm py-1">
            <MapPin className="h-4 w-4 mt-0.5" />
            <span>
              19651 Pinewood Trails Dr.
              <br />
              Magnolia, TX 77355
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm py-1 mt-2">
            <Clock className="h-4 w-4" /> 8AM – 5PM, 7 Days a Week
          </div>
        </div>
        <div>
          <div className="font-display text-sm tracking-[0.3em] mb-3">STAY CONNECTED</div>
          <p className="text-sm opacity-90">Follow us for park updates, events & special offers!</p>
          <div className="flex gap-3 mt-3">
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full bg-cream/10 p-2.5 ring-1 ring-cream/20 transition-all duration-300 hover:bg-accent hover:text-primary-deep hover:scale-110 hover:ring-accent"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="rounded-full bg-cream/10 p-2.5 ring-1 ring-cream/20 transition-all duration-300 hover:bg-accent hover:text-primary-deep hover:scale-110 hover:ring-accent"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <Link to="/sites" className="underline-offset-4 hover:underline">
              Sites
            </Link>
            <Link to="/amenities" className="underline-offset-4 hover:underline">
              Amenities
            </Link>
            <Link to="/contact" className="underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-4 text-center text-sm opacity-80">
        © {new Date().getFullYear()} Pinewood Trails RV Park. All Rights Reserved.
      </div>
    </footer>
  );
}
