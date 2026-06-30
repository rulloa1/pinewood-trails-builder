import { Calendar, Users, Truck } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const formatDateInputValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getDefaultDates = () => {
  const checkinDate = new Date();
  checkinDate.setDate(checkinDate.getDate() + 1);

  const checkoutDate = new Date(checkinDate);
  checkoutDate.setDate(checkoutDate.getDate() + 4);

  return {
    checkin: formatDateInputValue(checkinDate),
    checkout: formatDateInputValue(checkoutDate),
  };
};

const isEarlierThan = (leftDate: string, rightDate: string) =>
  new Date(leftDate).getTime() < new Date(rightDate).getTime();

const getNextDate = (date: string) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);
  return formatDateInputValue(nextDate);
};

export function BookingWidget({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(() => ({
    ...getDefaultDates(),
    guests: "2 Adults",
    length: "Up to 40 ft",
  }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/book",
      search: {
        checkin: form.checkin,
        checkout: form.checkout,
        guests: form.guests,
        rvLength: form.length,
      },
    });
  };

  const onCheckinChange = (checkin: string) => {
    const minCheckoutDate = getNextDate(checkin);
    setForm((currentForm) => ({
      ...currentForm,
      checkin,
      checkout: isEarlierThan(currentForm.checkout, minCheckoutDate)
        ? minCheckoutDate
        : currentForm.checkout,
    }));
  };

  const checkoutMinDate = getNextDate(form.checkin);

  if (variant === "compact") {
    return (
      <form
        onSubmit={submit}
        className="grid gap-3 rounded-lg bg-primary-deep p-4 md:grid-cols-5 md:items-end"
      >
        <Field
          icon={<Calendar />}
          label="Check-in"
          type="date"
          value={form.checkin}
          onChange={onCheckinChange}
        />
        <Field
          icon={<Calendar />}
          label="Check-out"
          type="date"
          value={form.checkout}
          min={checkoutMinDate}
          onChange={(checkout) => setForm({ ...form, checkout })}
        />
        <Field
          icon={<Users />}
          label="Guests"
          value={form.guests}
          onChange={(guests) => setForm({ ...form, guests })}
        />
        <Field
          icon={<Truck />}
          label="RV Length"
          value={form.length}
          onChange={(length) => setForm({ ...form, length })}
        />
        <button className="rounded-md bg-cream px-5 py-3 font-display text-primary-deep hover:bg-cream/90">
          Update Search
        </button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-md rounded-3xl bg-primary-deep/40 p-7 text-cream shadow-2xl ring-1 ring-accent/40 border border-accent/30 backdrop-blur-2xl">
      <div className="flex items-center justify-center gap-2">
        <span>🌲</span>
        <h3 className="font-display text-2xl font-bold tracking-wider">BOOK YOUR STAY</h3>
        <span>🌲</span>
      </div>
      <p className="text-center font-script text-lg text-cream/90">
        Find your perfect spot in the pines
      </p>
      <form onSubmit={submit} className="mt-5 grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Field
            icon={<Calendar />}
            label="Check-in"
            type="date"
            value={form.checkin}
            onChange={onCheckinChange}
          />
          <Field
            icon={<Calendar />}
            label="Check-out"
            type="date"
            value={form.checkout}
            min={checkoutMinDate}
            onChange={(checkout) => setForm({ ...form, checkout })}
          />
        </div>
        <Field
          icon={<Users />}
          label="Guests"
          value={form.guests}
          onChange={(guests) => setForm({ ...form, guests })}
        />
        <Field
          icon={<Truck />}
          label="RV Length"
          value={form.length}
          onChange={(length) => setForm({ ...form, length })}
        />
        <button className="mt-2 rounded-xl bg-accent px-5 py-3.5 font-display text-lg font-semibold text-accent-foreground shadow-lg ring-1 ring-cream/15 transition-all duration-300 hover:bg-accent/90 hover:shadow-xl hover:-translate-y-0.5">
          Search Availability
        </button>
      </form>
    </div>
  );
}

function Field({
  icon,
  label,
  value,
  onChange,
  type = "text",
  min,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  min?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-cream/80">{label}</span>
      <div className="mt-1 flex items-center gap-2 rounded-md bg-primary/40 px-3 py-2.5 ring-1 ring-cream/10 focus-within:ring-cream/40">
        <span className="text-cream/70 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        <input
          type={type}
          value={value}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-cream placeholder:text-cream/50 focus:outline-none"
        />
      </div>
    </label>
  );
}
