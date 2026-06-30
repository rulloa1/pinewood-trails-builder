import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const BookingInput = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone is required"),
  rvModel: z.string().optional().default(""),
  specialRequests: z.string().optional().default(""),
  checkin: z.string(),
  checkout: z.string(),
  guests: z.string(),
  rvLength: z.string().optional().default(""),
  nights: z.number(),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
});

export type BookingData = z.infer<typeof BookingInput>;

const PARK_EMAIL = "rory.ulloa@students.maestrocollege.edu";
const PARK_NAME = "Pinewood Trails RV Park";
// Use onboarding@resend.dev for testing; set RESEND_FROM_EMAIL in production
const FROM_EMAIL = () =>
  process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/Chicago",
});

async function sendEmail(apiKey: string, payload: object) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend error ${res.status}: ${text}`);
  }
}

const tr = (label: string, value: string) =>
  `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;font-size:14px;white-space:nowrap">${label}</td>` +
  `<td style="padding:4px 0;font-size:14px;color:#111827">${value}</td></tr>`;

export const submitBooking = createServerFn({ method: "POST" })
  .validator(BookingInput)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

    const checkinFmt = dateFmt.format(new Date(data.checkin + "T12:00:00"));
    const checkoutFmt = dateFmt.format(new Date(data.checkout + "T12:00:00"));
    const from = FROM_EMAIL();

    // ── Park owner notification ──────────────────────────────
    await sendEmail(apiKey, {
      from: `${PARK_NAME} <${from}>`,
      to: [PARK_EMAIL],
      reply_to: data.email,
      subject: `🏕️ New Reservation Request — ${data.name} · ${checkinFmt}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#5c2018;margin-bottom:4px">New Reservation Request</h2>
          <p style="color:#6b7280;margin-top:0">Submitted via pinewoodtrailsrv.com</p>
          <table style="border-collapse:collapse;width:100%">
            ${tr("Name", data.name)}
            ${tr("Email", `<a href="mailto:${data.email}">${data.email}</a>`)}
            ${tr("Phone", data.phone)}
            ${data.rvModel ? tr("RV Make/Model", data.rvModel) : ""}
            ${data.rvLength ? tr("RV Length", data.rvLength) : ""}
            ${tr("Check-in", checkinFmt)}
            ${tr("Check-out", checkoutFmt)}
            ${tr("Guests", data.guests)}
            ${tr("Nights", String(data.nights))}
            ${tr("Subtotal", `$${data.subtotal.toFixed(2)}`)}
            ${tr("Tax (9%)", `$${data.tax.toFixed(2)}`)}
            ${tr("Total", `<strong>$${data.total.toFixed(2)}</strong>`)}
            ${data.specialRequests ? tr("Special Requests", data.specialRequests) : ""}
          </table>
          <p style="margin-top:24px;font-size:13px;color:#9ca3af">Reply to this email to contact the guest directly.</p>
        </div>`,
    });

    // ── Guest confirmation ───────────────────────────────────
    await sendEmail(apiKey, {
      from: `${PARK_NAME} <${from}>`,
      to: [data.email],
      subject: `Your Reservation Request at Pinewood Trails — ${checkinFmt}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#5c2018">We received your request, ${data.name.split(" ")[0]}!</h2>
          <p style="color:#374151">Thanks for choosing <strong>${PARK_NAME}</strong>.
          We'll review your request and reach out to confirm within 24&nbsp;hours.</p>
          <h3 style="color:#5c2018;margin-top:24px">Booking Summary</h3>
          <table style="border-collapse:collapse;width:100%">
            ${tr("Check-in", checkinFmt)}
            ${tr("Check-out", checkoutFmt)}
            ${tr("Guests", data.guests)}
            ${tr("Nights", String(data.nights))}
            ${tr("Subtotal", `$${data.subtotal.toFixed(2)}`)}
            ${tr("Tax (9%)", `$${data.tax.toFixed(2)}`)}
            ${tr("Total", `<strong>$${data.total.toFixed(2)}</strong>`)}
            ${data.specialRequests ? tr("Special Requests", data.specialRequests) : ""}
          </table>
          <p style="margin-top:24px;color:#374151">Questions? Just reply to this email.</p>
          <p style="color:#374151">See you under the pines! 🌲<br/>
          <strong>${PARK_NAME}</strong><br/>Magnolia, TX</p>
        </div>`,
    });

    return { ok: true };
  });
