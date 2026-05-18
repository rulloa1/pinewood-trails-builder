import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { BookingWidget } from "@/components/BookingWidget";
import { Check, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import sitePT from "@/assets/site-pull-through.jpg";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Your Stay — Pinewood Trails RV Park" },
      { name: "description", content: "Reserve your RV site at Pinewood Trails RV Park in Magnolia, TX. Quick and easy online booking." },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const [guest, setGuest] = useState({ name: "", email: "", phone: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Reservation request received! We'll confirm shortly.");
  };

  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <PageHero title="Book Your Stay" subtitle="Reserve your spot under the pines." crumb="Book Now" />

      <section className="mx-auto max-w-[1400px] px-6 py-10 md:px-10">
        <BookingWidget variant="compact" />
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-8 px-6 pb-16 md:px-10 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={submit} className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-display text-2xl text-primary">Guest Information</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full Name *" value={guest.name} onChange={(v) => setGuest({ ...guest, name: v })} required />
            <Field label="Email *" type="email" value={guest.email} onChange={(v) => setGuest({ ...guest, email: v })} required />
            <Field label="Phone *" value={guest.phone} onChange={(v) => setGuest({ ...guest, phone: v })} required />
            <Field label="RV Make & Model" value="" onChange={() => {}} />
            <label className="sm:col-span-2 block">
              <span className="text-sm text-foreground">Special Requests</span>
              <textarea rows={4} className="mt-1 w-full rounded-md border border-input bg-cream px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring" />
            </label>
          </div>
          <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 font-display text-primary-foreground shadow hover:bg-primary-deep">
            <Lock className="h-4 w-4" /> Complete Reservation
          </button>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Check className="h-3.5 w-3.5 text-primary" /> Free Cancellation up to 48 hours before check-in
          </div>
        </form>

        <aside className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="flex items-center justify-between font-display text-xl text-primary">Your Booking</h3>
          <img src={sitePT} alt="Site 35" className="mt-4 h-44 w-full rounded-lg object-cover" loading="lazy" />
          <dl className="mt-4 divide-y divide-border text-sm">
            <Row label="Site 35" value="Pull-Through • 50A" />
            <Row label="Check-in" value="May 26, 2025" />
            <Row label="Check-out" value="May 30, 2025" />
            <Row label="Guests" value="2 Adults" />
            <Row label="Nights" value="4" />
            <Row label="Subtotal" value="$208.00" />
            <Row label="Taxes & Fees" value="$18.72" />
            <Row label="Total" value="$226.72" bold />
          </dl>
          <Link to="/sites" className="mt-5 block text-center text-sm text-primary underline-offset-4 hover:underline">Choose a different site</Link>
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm text-foreground">{label}</span>
      <input type={type} value={value} required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-input bg-cream px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between py-2 ${bold ? "text-lg font-bold text-primary" : "text-foreground"}`}>
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
