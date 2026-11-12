"use client";
import { useState, useEffect } from "react";

const slides = [
  { name: "Mercedes-Benz S-Class", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=80" },
  { name: "Bentley Continental GT", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80" },
  { name: "Range Rover Autobiography", image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1920&q=80" },
  { name: "Rolls-Royce Ghost", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1920&q=80" },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "24/7", label: "Available" },
  { value: "5★", label: "Google Rating" },
  { value: "5,000+", label: "Trips Completed" },
];

const fieldClass =
  "w-full bg-luxury-black/60 border border-luxury-border text-luxury-text text-base font-sans px-4 py-3 outline-none transition-all focus:border-gold/60 focus:shadow-[0_0_0_3px_rgb(var(--accent)/0.12)]";
const labelClass = "text-xs tracking-[0.2em] uppercase text-gold font-sans font-semibold";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState({ from: "", to: "", date: "", time: "", passengers: "2", luggage: "2" });

  useEffect(() => {
    const interval = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(interval);
  }, [current]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.name}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${slide.image})`, opacity: i === current ? 1 : 0 }}
          aria-hidden
        />
      ))}
      <div className="absolute inset-0 transition-colors duration-500" style={{ background: "rgb(var(--hero-overlay))" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 55% at 70% 45%, rgb(var(--accent) / 0.14), transparent 70%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-luxury-black to-transparent pointer-events-none" />
      <div className="hero-grid" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-36 pb-28 flex flex-col items-center text-center">
        <div className="fade-up-1 mb-8 inline-flex items-center gap-3 px-4 py-2 border border-gold/30 bg-luxury-black/40 backdrop-blur-sm">
          <span className="relative flex items-center justify-center">
            <span className="avail-dot" />
          </span>
          <span className="text-xs sm:text-sm tracking-[0.18em] sm:tracking-[0.3em] uppercase text-gold font-sans font-semibold">
            London&apos;s Premier Chauffeur · Available 24/7
          </span>
        </div>

        <h1 className="fade-up-2 font-serif leading-[0.95] mb-8 select-none">
          <span className="block text-[44px] sm:text-7xl lg:text-[96px] text-luxury-text font-bold tracking-tight">
            Arrive With
          </span>
          <span className="block text-[54px] sm:text-8xl lg:text-[116px] gold-text font-bold italic tracking-tight mt-2 pb-2 px-3">
            Distinction
          </span>
        </h1>

        <p className="fade-up-3 text-luxury-text/85 text-base md:text-lg font-sans font-light max-w-xl mb-14 leading-relaxed">
          Executive chauffeur services across London and the South East. Airport transfers,
          corporate accounts &amp; private events.
        </p>

        <div id="booking" className="fade-up-4 border-run w-full max-w-4xl luxury-card p-6 md:p-8 text-left scroll-mt-28">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-luxury-border" />
            <span className="text-sm tracking-[0.3em] uppercase text-gold font-sans font-semibold">Request a Quote</span>
            <div className="h-px flex-1 bg-luxury-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <label className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
              <span className={labelClass}>Pick-up</span>
              <input type="text" placeholder="Address, airport or hotel..." value={form.from} onChange={set("from")} className={fieldClass} />
            </label>
            <label className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
              <span className={labelClass}>Drop-off</span>
              <input type="text" placeholder="Address, airport or hotel..." value={form.to} onChange={set("to")} className={fieldClass} />
            </label>
            <label className="flex flex-col gap-2">
              <span className={labelClass}>Date</span>
              <input type="date" value={form.date} onChange={set("date")} className={fieldClass} />
            </label>
            <label className="flex flex-col gap-2">
              <span className={labelClass}>Time</span>
              <input type="time" value={form.time} onChange={set("time")} className={fieldClass} />
            </label>
            <label className="flex flex-col gap-2">
              <span className={labelClass}>Passengers</span>
              <select value={form.passengers} onChange={set("passengers")} className={`${fieldClass} cursor-pointer`}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n} Passenger{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className={labelClass}>Luggage</span>
              <select value={form.luggage} onChange={set("luggage")} className={`${fieldClass} cursor-pointer`}>
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "Bag" : "Bags"}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="shine-btn neon-pulse w-full sm:flex-1 py-4 px-8 bg-gold-gradient text-on-accent text-sm tracking-[0.25em] uppercase font-sans font-bold">
              Get an Instant Quote
            </button>
            <p className="text-luxury-muted text-sm font-sans tracking-wide whitespace-nowrap">
              No obligation &nbsp;·&nbsp; 24/7 service
            </p>
          </div>
        </div>

        <div className="fade-up-5 mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl md:text-4xl gold-text font-bold">{stat.value}</div>
              <div className="text-luxury-muted text-xs tracking-[0.2em] uppercase font-sans mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans">{slides[current].name}</span>
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button key={s.name} onClick={() => setCurrent(i)} aria-label={`Show ${s.name}`} className="py-2">
              <div className={`h-px transition-all duration-300 ${i === current ? "w-10 bg-gold" : "w-4 bg-gold/40"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
