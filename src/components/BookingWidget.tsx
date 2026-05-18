import { Calendar, Users, Truck } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function BookingWidget({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    checkin: "2025-05-26",
    checkout: "2025-05-30",
    guests: "2 Adults",
    length: "Up to 40 ft",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/book" });
  };

  if (variant === "compact") {
    return (
      <form onSubmit={submit} className="grid gap-3 rounded-lg bg-primary-deep p-4 md:grid-cols-5 md:items-end">
        <Field icon={<Calendar />} label="Check-in" type="date" value={form.checkin}
          onChange={(v) => setForm({ ...form, checkin: v })} />
        <Field icon={<Calendar />} label="Check-out" type="date" value={form.checkout}
          onChange={(v) => setForm({ ...form, checkout: v })} />
        <Field icon={<Users />} label="Guests" value={form.guests}
          onChange={(v) => setForm({ ...form, guests: v })} />
        <Field icon={<Truck />} label="RV Length" value={form.length}
          onChange={(v) => setForm({ ...form, length: v })} />
        <button className="rounded-md bg-cream px-5 py-3 font-display text-primary-deep hover:bg-cream/90">
          Update Search
        </button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-md rounded-xl bg-primary-deep/95 p-7 text-cream shadow-2xl ring-1 ring-cream/10 backdrop-blur">
      <div className="flex items-center justify-center gap-2">
        <span>🌲</span>
        <h3 className="font-display text-2xl font-bold tracking-wider">BOOK YOUR STAY</h3>
        <span>🌲</span>
      </div>
      <p className="text-center font-script text-lg text-cream/90">Find your perfect spot in the pines</p>
      <form onSubmit={submit} className="mt-5 grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Field icon={<Calendar />} label="Check-in" type="date" value={form.checkin}
            onChange={(v) => setForm({ ...form, checkin: v })} />
          <Field icon={<Calendar />} label="Check-out" type="date" value={form.checkout}
            onChange={(v) => setForm({ ...form, checkout: v })} />
        </div>
        <Field icon={<Users />} label="Guests" value={form.guests}
          onChange={(v) => setForm({ ...form, guests: v })} />
        <Field icon={<Truck />} label="RV Length" value={form.length}
          onChange={(v) => setForm({ ...form, length: v })} />
        <button className="mt-2 rounded-md bg-primary px-5 py-3.5 font-display text-lg text-primary-foreground shadow ring-1 ring-cream/15 hover:bg-primary/90">
          Search Availability
        </button>
      </form>
    </div>
  );
}

function Field({
  icon, label, value, onChange, type = "text",
}: {
  icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-cream/80">{label}</span>
      <div className="mt-1 flex items-center gap-2 rounded-md bg-primary/40 px-3 py-2.5 ring-1 ring-cream/10 focus-within:ring-cream/40">
        <span className="text-cream/70 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-cream placeholder:text-cream/50 focus:outline-none"
        />
      </div>
    </label>
  );
}
