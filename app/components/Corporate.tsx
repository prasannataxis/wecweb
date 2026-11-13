"use client";
import { useState } from "react";
import Link from "next/link";

const offerings = [
  {
    title: "Dedicated Account Management",
    text: "A named account manager who knows your team, your preferences and your diary — one point of contact for every booking, change and query.",
  },
  {
    title: "Monthly Consolidated Invoicing",
    text: "One itemised invoice per month with cost-centre and passenger references, so finance teams can reconcile travel in minutes.",
  },
  {
    title: "Priority 24/7 Dispatch",
    text: "Corporate accounts jump the queue for short-notice and out-of-hours bookings, with a direct line to our dispatch team.",
  },
  {
    title: "Executive Airport Transfers",
    text: "Meet & greet at Heathrow, Gatwick, City, Stansted, Luton and Farnborough, with live flight tracking and free waiting time.",
  },
  {
    title: "Roadshows & Multi-Stop Days",
    text: "Chauffeur-on-standby for investor roadshows, site visits and client days, with drivers who know the City, Canary Wharf and the West End.",
  },
  {
    title: "Events & Conference Logistics",
    text: "Coordinated multi-vehicle movements for conferences, AGMs and hospitality events, managed end-to-end by our events desk.",
  },
  {
    title: "Duty of Care & Discretion",
    text: "DBS-checked, fully licensed chauffeurs, confidentiality agreements on request, and real-time journey tracking for travel managers.",
  },
  {
    title: "Preferred Rates",
    text: "Fixed, pre-agreed pricing for regular routes and volume-based rates for frequent travellers — no surge pricing, ever.",
  },
];

const steps = [
  { n: "01", title: "Register", text: "Tell us about your company and travel needs." },
  { n: "02", title: "Meet your account manager", text: "We agree preferences, billing and rates." },
  { n: "03", title: "Book & travel", text: "Book by phone, email, WhatsApp — or online once accounts launch." },
];

export default function Corporate() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <section id="corporate" className="bg-luxury-dark pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="gold-divider mb-6" />
          <p className="text-xs tracking-[0.4em] uppercase text-gold font-sans font-medium mb-4">For Business</p>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-text font-bold">Corporate Accounts</h2>
          <p className="mt-4 text-luxury-muted text-base font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Reliable, discreet executive travel for companies that can&apos;t afford to be late. One account for your whole
            organisation, with the service levels your clients and leadership expect.
          </p>
        </div>

        <div className="border-run luxury-card p-6 sm:p-10 mb-12 sm:mb-16 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          <div className="flex-1 text-center lg:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl text-luxury-text font-semibold">Open a corporate account</h3>
            <p className="text-base text-luxury-muted font-sans font-light mt-2">
              Register your company, or log in to manage bookings, passengers and invoices.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setNotice("register")}
              className="shine-btn neon-pulse px-10 py-4 bg-gold-gradient text-on-accent text-sm tracking-[0.25em] uppercase font-sans font-bold"
            >
              Register Now
            </button>
            <button
              type="button"
              onClick={() => setNotice("login")}
              className="px-10 py-4 border border-gold/60 text-gold text-sm tracking-[0.25em] uppercase font-sans font-semibold hover:bg-gold/10 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
        {notice && (
          <p role="status" className="-mt-8 sm:-mt-10 mb-12 text-center text-sm text-luxury-muted font-sans">
            Online {notice === "login" ? "account access" : "registration"} is launching soon. In the meantime,{" "}
            <Link href="/contact" className="text-gold underline underline-offset-2">contact us</Link> and we&apos;ll set up your account.
          </p>
        )}

        <h3 className="font-serif text-3xl text-luxury-text font-semibold text-center mb-8">What&apos;s included</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 sm:mb-20">
          {offerings.map((o) => (
            <div key={o.title} className="border-run luxury-card lift-glow p-6 flex flex-col gap-3">
              <h4 className="font-serif text-lg text-luxury-text font-semibold leading-snug">{o.title}</h4>
              <p className="text-sm text-luxury-muted font-sans font-light leading-relaxed">{o.text}</p>
            </div>
          ))}
        </div>

        <h3 className="font-serif text-3xl text-luxury-text font-semibold text-center mb-8">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="border-run luxury-card p-6 sm:p-8 text-center">
              <div className="font-serif text-4xl gold-text font-bold mb-3">{s.n}</div>
              <h4 className="font-serif text-xl text-luxury-text font-semibold mb-2">{s.title}</h4>
              <p className="text-sm text-luxury-muted font-sans font-light leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
