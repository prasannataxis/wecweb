"use client";
import { useState } from "react";
import { WhatsAppIcon } from "./contact-info";
import { useBusiness } from "../theme/SettingsProvider";

const fieldClass =
  "w-full bg-luxury-black/60 border border-luxury-border text-luxury-text text-base font-sans px-4 py-3 outline-none transition-all focus:border-gold/60";
const labelClass = "text-xs tracking-[0.2em] uppercase text-gold font-sans font-semibold";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6" aria-hidden>
      <path d="M2 2.5a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 .77l.5 2a1 1 0 0 1-.23.95L5 6a9.06 9.06 0 0 0 5 5l.78-.78a1 1 0 0 1 .95-.23l2 .5a1 1 0 0 1 .77 1V13a1 1 0 0 1-1 1C6.37 14 2 9.63 2 3.5V2.5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6" aria-hidden>
      <rect x="1" y="3" width="14" height="10" rx="1" />
      <path d="M1 4l7 5 7-5" />
    </svg>
  );
}


export default function Contact() {
  const b = useBusiness();
  const methods = [
    { title: "Call Us", value: b.phone, href: b.phoneHref, note: "24 hours a day, 7 days a week", icon: <PhoneIcon /> },
    { title: "WhatsApp", value: "Message us instantly", href: b.whatsappHref, note: "Fastest way to get a quote", icon: <WhatsAppIcon className="w-6 h-6" />, external: true },
    { title: "Email", value: b.email, href: `mailto:${b.email}`, note: "We reply within the hour", icon: <MailIcon /> },
  ];

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // No backend yet (Phase 2): hand the enquiry to the visitor's mail app.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`;
    window.location.href = `mailto:${b.email}?subject=${encodeURIComponent("Chauffeur enquiry")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="bg-luxury-dark pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="gold-divider mb-6" />
          <p className="text-xs tracking-[0.4em] uppercase text-gold font-sans font-medium mb-4">Get In Touch</p>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-text font-bold">Contact Us</h2>
          <p className="mt-4 text-luxury-muted text-base font-sans font-light max-w-lg mx-auto leading-relaxed">
            London&apos;s premier luxury chauffeur service, serving the capital and the South East since 2009.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 sm:mb-14">
          {methods.map((m) => (
            <a
              key={m.title}
              href={m.href}
              {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="border-run luxury-card lift-glow p-6 sm:p-8 flex flex-col items-center text-center gap-3 group"
            >
              <span className="w-14 h-14 border border-gold/40 flex items-center justify-center text-gold group-hover:bg-gold/10 transition-colors">
                {m.icon}
              </span>
              <span className="text-xs tracking-[0.25em] uppercase text-gold font-sans font-semibold">{m.title}</span>
              <span className="font-serif text-lg sm:text-xl text-luxury-text break-all sm:break-normal">{m.value}</span>
              <span className="text-sm text-luxury-muted font-sans">{m.note}</span>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <form onSubmit={submit} className="border-run luxury-card lg:col-span-3 p-6 sm:p-8 flex flex-col gap-4">
            <h3 className="font-serif text-2xl text-luxury-text font-semibold">Send an Enquiry</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className={labelClass}>Name</span>
                <input required value={form.name} onChange={set("name")} className={fieldClass} autoComplete="name" />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelClass}>Phone</span>
                <input type="tel" value={form.phone} onChange={set("phone")} className={fieldClass} autoComplete="tel" />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className={labelClass}>Email</span>
              <input type="email" required value={form.email} onChange={set("email")} className={fieldClass} autoComplete="email" />
            </label>
            <label className="flex flex-col gap-2">
              <span className={labelClass}>Message</span>
              <textarea required rows={5} value={form.message} onChange={set("message")} className={`${fieldClass} resize-y`} placeholder="Journey details, dates, vehicle preference..." />
            </label>
            <button type="submit" className="shine-btn neon-pulse mt-2 py-4 bg-gold-gradient text-on-accent text-sm tracking-[0.25em] uppercase font-sans font-bold">
              Send Enquiry
            </button>
          </form>

          <div className="border-run luxury-card lg:col-span-2 p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <h3 className="font-serif text-2xl text-luxury-text font-semibold mb-2">Coverage</h3>
              <p className="text-base text-luxury-muted font-sans font-light leading-relaxed">
                Based in {b.base}. We serve all of Greater London and the South East of England.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {b.areaList.map((area) => (
                <span key={area} className="text-xs tracking-[0.12em] uppercase px-3 py-1.5 border border-gold/30 text-luxury-text/80 font-sans">
                  {area}
                </span>
              ))}
            </div>
            <div className="pt-6 border-t border-luxury-border">
              <h3 className="font-serif text-2xl text-luxury-text font-semibold mb-2">Hours</h3>
              <p className="text-base text-luxury-muted font-sans font-light">Open 24 hours, 365 days a year — including bank holidays.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
