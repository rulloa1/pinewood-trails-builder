import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Phone, Clock, AlertCircle, MapPin, Mail, Send, Car, Calendar, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Pinewood Trails RV Park" },
      { name: "description", content: "Get in touch with Pinewood Trails RV Park in Magnolia, TX. Call, email, or send us a message." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll be in touch shortly.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <PageHero title="Contact Us" subtitle="We're here 7 days a week — give us a call or send a message." crumb="Contact Us" />

      <section className="mx-auto max-w-[1400px] grid gap-6 px-6 py-12 md:px-10 lg:grid-cols-[1fr_1.2fr_1fr]">
        {/* Contact info */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 font-display tracking-[0.25em] text-primary">🌲 CONTACT INFORMATION</div>
          <div className="mt-6 space-y-6">
            <Info icon={<Phone />} title="Call Us Today!">
              <div className="text-2xl font-bold text-foreground">832-521-3345</div>
              <div className="text-2xl font-bold text-foreground">832-671-5999</div>
            </Info>
            <Info icon={<Clock />} title="Office Hours">
              <div>Monday – Sunday</div><div>8AM – 5PM</div>
            </Info>
            <Info icon={<AlertCircle />} title="After-Hours Emergency">
              <div className="text-xl font-bold text-foreground">832-671-5999</div>
              <p className="text-xs text-muted-foreground mt-1">For emergencies after office hours, please call the number above.</p>
            </Info>
            <Info icon={<MapPin />} title="Pinewood Trails RV Park">
              <div>19651 Pinewood Trails Dr.</div><div>Magnolia, TX 77355</div>
            </Info>
            <Info icon={<Mail />} title="Email Us">
              <div>info@pinewoodtrailsrv.com</div>
            </Info>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 font-display tracking-[0.25em] text-primary"><Mail className="h-5 w-5" /> SEND US A MESSAGE</div>
          <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Name *" placeholder="Your full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="Email *" type="email" placeholder="Your email address" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <Field label="Phone" placeholder="Your phone number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <label className="block">
              <span className="text-sm text-foreground">Subject *</span>
              <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-cream px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Please select a subject</option>
                <option>Reservation Inquiry</option>
                <option>Amenities Question</option>
                <option>Long-Term Stay</option>
                <option>Other</option>
              </select>
            </label>
            <label className="sm:col-span-2 block">
              <span className="text-sm text-foreground">Message *</span>
              <textarea required rows={6} placeholder="How can we help you?"
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-cream px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <button className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary py-3.5 font-display text-primary-foreground hover:bg-primary-deep">
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>
        </div>

        {/* Side cards */}
        <div className="space-y-4">
          <SideCard icon={<Car />} title="DIRECTIONS" lines={["Easy access off FM 1488.", "Just 5 miles north of Magnolia."]} />
          <SideCard icon={<Calendar />} title="CHECK-IN / CHECK-OUT" lines={["Check-in: 2:00 PM", "Check-out: 12:00 PM"]} />
          <SideCard icon={<MapPin />} title="OFFICE LOCATION" lines={["Our office is located on-site", "and happy to help!"]} />
          <div className="rounded-xl border-2 border-gold/60 bg-primary-deep p-5 text-cream shadow">
            <div className="text-center font-display tracking-[0.2em]">🌲 PARK RULES REMINDER 🌲</div>
            <ul className="mt-3 grid grid-cols-1 gap-1 text-xs sm:grid-cols-2">
              <li>✓ All guests register w/ ID</li>
              <li>✓ No loud music / vehicles</li>
              <li>✓ Max 2 adults per RV</li>
              <li>✓ Max 2 vehicles per RV lot</li>
              <li>✓ Max 2 dogs per RV</li>
              <li>✓ No dogs unattended outside</li>
              <li>✓ No storage under/around RV's</li>
              <li>✓ No outside trash cans</li>
              <li>✓ No fireworks or gun fire</li>
              <li>✓ No sub leases</li>
              <li>✓ No refunds on early departures</li>
              <li>✓ Quiet time 8PM – 8AM</li>
              <li>✓ Laundry room open 24 hrs</li>
              <li>✓ Speed limit 10 MPH</li>
            </ul>
            <div className="mt-3 text-center font-script text-base">Thank you for helping us keep our park beautiful!</div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Info({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 rounded-full bg-primary p-2.5 text-primary-foreground [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      <div>
        <div className="font-display text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm text-foreground">{label}</span>
      <input type={type} value={value} required={required} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-input bg-cream px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}

function SideCard({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-primary/10 p-3 text-primary [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
        <div>
          <div className="font-display tracking-[0.2em] text-primary text-sm">{title}</div>
          {lines.map((l) => <div key={l} className="text-sm text-muted-foreground">{l}</div>)}
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </div>
  );
}
