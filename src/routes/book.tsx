import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { BookingWidget } from "@/components/BookingWidget";
import { Check, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { submitBooking } from "@/lib/send-booking-email";
import sitePT from "@/assets/site-pull-through.jpg";

const NIGHTLY_RATE = 52;
const TAX_RATE = 0.09;

function calcPricing(checkin: string, checkout: string) {
  const nights = Math.max(
    1,
    Math.round(
      (new Date(checkout + "T12:00:00").getTime() - new Date(checkin + "T12:00:00").getTime()) /
        86_400_000,
    ),
  );
  const subtotal = nights * NIGHTLY_RATE;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;
  return { nights, subtotal, tax, total };
}

const displayDate = (iso: string) => {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  }).format(new Date(iso + "T12:00:00"));
};

const getDefaultDates = () => {
  const ci = new Date();
  ci.setDate(ci.getDate() + 1);
  const co = new Date(ci);
  co.setDate(co.getDate() + 4);
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return { checkin: fmt(ci), checkout: fmt(co) };
};

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>) => {
    const defaults = getDefaultDates();
    return {
      checkin: (search.checkin as string) || defaults.checkin,
      checkout: (search.checkout as string) || defaults.checkout,
      guests: (search.guests as string) || "2 Adults",
      rvLength: (search.rvLength as string) || "",
    };
  },
  head: () => ({
    meta: [
      { title: "Book Your Stay — Pinewood Trails RV Park" },
      {
        name: "description",
        content:
          "Reserve your RV site at Pinewood Trails RV Park in Magnolia, TX. Quick and easy online booking.",
      },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const { checkin, checkout, guests, rvLength } = Route.useSearch();
  const { nights, subtotal, tax, total } = calcPricing(checkin, checkout);

  const [guest, setGuest] = useState({
    name: "",
    email: "",
    phone: "",
    rvModel: "",
    special: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitBooking({
        data: {
          name: guest.name,
          email: guest.email,
          phone: guest.phone,
          rvModel: guest.rvModel,
          specialRequests: guest.special,
          checkin,
          checkout,
          guests,
          rvLength,
          nights,
          subtotal,
          tax,
          total,
        },
      });
      setSubmitted(true);
      toast.success("Reservation request sent! Check your inbox for confirmation.");
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <PageHero
        title="Book Your Stay"
        subtitle="Reserve your spot under the pines."
        crumb="Book Now"
      />

      <section className="mx-auto max-w-[1400px] px-6 py-10 md:px-10">
        <BookingWidget variant="compact" />
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-8 px-6 pb-16 md:px-10 lg:grid-cols-[1.4fr_1fr]">
        {submitted ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-10 shadow-sm text-center">
            <div className="text-6xl mb-4">🌲</div>
            <h2 className="font-display text-2xl text-primary mb-2">Request Received!</h2>
            <p className="text-muted-foreground max-w-sm">
              We've sent a confirmation to <strong>{guest.email}</strong>. We'll be in touch within
              24 hours to lock in your stay.
            </p>
            <Link
              to="/sites"
              className="mt-6 text-sm text-primary underline-offset-4 hover:underline"
            >
              Browse other sites
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-2xl text-primary">Guest Information</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field
                label="Full Name *"
                value={guest.name}
                onChange={(v) => setGuest({ ...guest, name: v })}
                required
              />
              <Field
                label="Email *"
                type="email"
                value={guest.email}
                onChange={(v) => setGuest({ ...guest, email: v })}
                required
              />
              <Field
                label="Phone *"
                value={guest.phone}
                onChange={(v) => setGuest({ ...guest, phone: v })}
                required
              />
              <Field
                label="RV Make & Model"
                value={guest.rvModel}
                onChange={(v) => setGuest({ ...guest, rvModel: v })}
              />
              <label className="sm:col-span-2 block">
                <span className="text-sm text-foreground">Special Requests</span>
                <textarea
                  rows={4}
                  value={guest.special}
                  onChange={(e) => setGuest({ ...guest, special: e.target.value })}
                  className="mt-1 w-full rounded-md border border-input bg-cream px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
            </div>
            <button
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 font-display text-primary-foreground shadow hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Lock className="h-4 w-4" />
              {loading ? "Sending…" : "Complete Reservation"}
            </button>
            <div className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-primary" /> Free Cancellation up to 48 hours before
              check-in
            </div>
          </form>
        )}

        <aside className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-display text-xl text-primary">Your Booking</h3>
          <img
            src={sitePT}
            alt="RV Site"
            className="mt-4 h-44 w-full rounded-lg object-cover"
            loading="lazy"
          />
          <dl className="mt-4 divide-y divide-border text-sm">
            <Row label="Check-in" value={displayDate(checkin)} />
            <Row label="Check-out" value={displayDate(checkout)} />
            <Row label="Guests" value={guests} />
            {rvLength && <Row label="RV Length" value={rvLength} />}
            <Row label="Nights" value={String(nights)} />
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Taxes & Fees" value={`$${tax.toFixed(2)}`} />
            <Row label="Total" value={`$${total.toFixed(2)}`} bold />
          </dl>
          <Link
            to="/sites"
            className="mt-5 block text-center text-sm text-primary underline-offset-4 hover:underline"
          >
            Choose a different site
          </Link>
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm text-foreground">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-input bg-cream px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between py-2 ${bold ? "text-base font-bold text-primary" : ""}`}>
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
