"use client";
import { useState, useEffect } from "react";

const slides = [
  {
    name: "Mercedes-Benz S-Class",
    category: "Executive Saloon",
    bg: "radial-gradient(ellipse at 60% 40%, #0D1628 0%, #06090F 60%, #040608 100%)",
    beam: "rgba(120,160,220,0.04)",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=80",
  },
  {
    name: "Bentley Continental GT",
    category: "Grand Tourer",
    bg: "radial-gradient(ellipse at 40% 50%, #1A0C0A 0%, #0E0706 60%, #080504 100%)",
    beam: "rgba(200,120,80,0.03)",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80",
  },
  {
    name: "Range Rover Autobiography",
    category: "Luxury SUV",
    bg: "radial-gradient(ellipse at 50% 60%, #0C1610 0%, #070E08 60%, #050806 100%)",
    beam: "rgba(80,140,80,0.04)",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1920&q=80",
  },
  {
    name: "Rolls-Royce Ghost",
    category: "Ultra-Luxury Saloon",
    bg: "radial-gradient(ellipse at 55% 45%, #161410 0%, #0D0C0A 60%, #080806 100%)",
    beam: "rgba(196,164,74,0.04)",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1920&q=80",
  },
];

function CarSilhouette({ opacity = 0.13 }: { opacity?: number }) {
  return (
    <svg
      viewBox="0 0 600 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-3xl"
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="carBodyGrad" x1="0" y1="0" x2="600" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9A7820" />
          <stop offset="50%" stopColor="#CEAB5A" />
          <stop offset="100%" stopColor="#9A7820" />
        </linearGradient>
        <linearGradient id="windowGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#CEAB5A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#CEAB5A" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Main body */}
      <path
        d="M 22,162
           Q 10,150 8,132
           Q 10,112 26,108
           L 58,104
           L 88,88
           Q 108,60 136,52
           L 200,46
           L 380,46
           Q 418,46 448,64
           L 480,88
           L 510,104
           Q 536,110 548,126
           Q 554,144 548,158
           L 22,162 Z"
        fill="url(#carBodyGrad)"
      />

      {/* Windshield */}
      <path d="M 92,90 Q 110,62 136,55 L 198,50 L 198,90 Z" fill="url(#windowGrad)" />
      <rect x="203" y="50" width="170" height="40" fill="url(#windowGrad)" />
      <path d="M 378,50 Q 414,50 442,66 L 472,90 L 378,90 Z" fill="url(#windowGrad)" />

      {/* Window dividers */}
      <line x1="200" y1="50" x2="200" y2="90" stroke="#CEAB5A" strokeWidth="1.5" opacity="0.4" />
      <line x1="375" y1="50" x2="375" y2="90" stroke="#CEAB5A" strokeWidth="1.5" opacity="0.4" />

      {/* Front wheel */}
      <circle cx="122" cy="162" r="34" fill="#0A0A0A" />
      <circle cx="122" cy="162" r="26" stroke="#CEAB5A" strokeWidth="1" fill="none" opacity="0.4" />
      <circle cx="122" cy="162" r="10" fill="#CEAB5A" opacity="0.15" />

      {/* Rear wheel */}
      <circle cx="448" cy="162" r="34" fill="#0A0A0A" />
      <circle cx="448" cy="162" r="26" stroke="#CEAB5A" strokeWidth="1" fill="none" opacity="0.4" />
      <circle cx="448" cy="162" r="10" fill="#CEAB5A" opacity="0.15" />

      {/* Headlight */}
      <ellipse cx="18" cy="124" rx="6" ry="10" fill="#CEAB5A" opacity="0.5" />

      {/* Tail light */}
      <rect x="549" y="118" width="5" height="18" rx="1" fill="#C44A4A" opacity="0.4" />

      {/* Ground shadow */}
      <ellipse cx="285" cy="196" rx="240" ry="6" fill="#000" opacity="0.5" />
    </svg>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    passengers: "2",
    luggage: "2",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setTransitioning(false);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Slideshow backgrounds */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {/* Photo layer */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Dark overlay so text remains readable */}
          <div className="absolute inset-0" style={{ background: "rgba(4,6,8,0.50)" }} />
          {/* Gradient tint per slide */}
          <div className="absolute inset-0" style={{ background: slide.bg, opacity: 0.45 }} />
          {/* Subtle light beam */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(130deg, transparent 30%, ${slide.beam} 50%, transparent 70%)` }}
          />
          {/* Fine grid texture */}
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(196,164,74,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,164,74,1) 1px, transparent 1px)",
              backgroundSize: "100px 100px",
            }}
          />
        </div>
      ))}

      {/* Horizon line */}
      <div className="absolute bottom-[22%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">

        {/* Pre-heading */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px w-10 bg-gold/40" />
          <span className="text-xs tracking-[0.4em] uppercase text-gold font-sans font-medium">
            London&apos;s Premier Chauffeur Service
          </span>
          <div className="h-px w-10 bg-gold/40" />
        </div>

        {/* Headline */}
        <h1 className="font-serif leading-none mb-6 select-none">
          <span className="block text-5xl md:text-7xl lg:text-[90px] text-luxury-text font-bold tracking-tight">
            Arrive With
          </span>
          <span className="block text-6xl md:text-8xl lg:text-[110px] gold-text font-bold tracking-tight mt-1">
            Distinction
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-luxury-muted text-sm md:text-base tracking-wider font-sans font-light max-w-md mb-14 leading-relaxed">
          Executive chauffeur services across London and the South East.
          Airport transfers, corporate accounts &amp; private events.
        </p>

        {/* Booking Widget */}
        <div id="booking" className="w-full max-w-4xl luxury-card rounded-none p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-luxury-border" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium">
              Request a Quote
            </span>
            <div className="h-px flex-1 bg-luxury-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
              <label className="text-xs tracking-[0.2em] uppercase text-gold font-sans font-medium">Pick-up</label>
              <input
                type="text"
                placeholder="Address, airport or hotel..."
                value={form.from}
                onChange={(e) => setForm((f) => ({ ...f, from: e.target.value }))}
                className="bg-luxury-black/70 border border-luxury-border text-luxury-text text-sm font-sans px-4 py-3 outline-none focus:border-gold/40 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
              <label className="text-xs tracking-[0.2em] uppercase text-gold font-sans font-medium">Drop-off</label>
              <input
                type="text"
                placeholder="Address, airport or hotel..."
                value={form.to}
                onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))}
                className="bg-luxury-black/70 border border-luxury-border text-luxury-text text-sm font-sans px-4 py-3 outline-none focus:border-gold/40 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-[0.2em] uppercase text-gold font-sans font-medium">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="bg-luxury-black/70 border border-luxury-border text-luxury-text text-sm font-sans px-4 py-3 outline-none focus:border-gold/40 transition-colors [color-scheme:dark]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-[0.2em] uppercase text-gold font-sans font-medium">Time</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                className="bg-luxury-black/70 border border-luxury-border text-luxury-text text-sm font-sans px-4 py-3 outline-none focus:border-gold/40 transition-colors [color-scheme:dark]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-[0.2em] uppercase text-gold font-sans font-medium">Passengers</label>
              <select
                value={form.passengers}
                onChange={(e) => setForm((f) => ({ ...f, passengers: e.target.value }))}
                className="bg-luxury-black/70 border border-luxury-border text-luxury-text text-sm font-sans px-4 py-3 outline-none focus:border-gold/40 transition-colors appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n} className="bg-luxury-dark">
                    {n} Passenger{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-[0.2em] uppercase text-gold font-sans font-medium">Luggage</label>
              <select
                value={form.luggage}
                onChange={(e) => setForm((f) => ({ ...f, luggage: e.target.value }))}
                className="bg-luxury-black/70 border border-luxury-border text-luxury-text text-sm font-sans px-4 py-3 outline-none focus:border-gold/40 transition-colors appearance-none cursor-pointer"
              >
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n} className="bg-luxury-dark">
                    {n} {n === 1 ? "Bag" : "Bags"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:flex-1 py-4 px-8 bg-gold-gradient text-luxury-black text-sm tracking-[0.25em] uppercase font-sans font-bold hover:opacity-90 active:opacity-80 transition-opacity">
              Get an Instant Quote
            </button>
            <p className="text-luxury-subtle text-xs font-sans font-light tracking-wide whitespace-nowrap">
              No obligation &nbsp;·&nbsp; 24/7 service
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-xl">
          {[
            { value: "15+", label: "Years Experience" },
            { value: "24/7", label: "Available" },
            { value: "5★", label: "Google Rating" },
            { value: "5,000+", label: "Trips Completed" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-2xl md:text-3xl gold-text font-bold">{stat.value}</div>
              <div className="text-luxury-muted text-[11px] tracking-[0.22em] uppercase font-sans mt-1.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <div className="flex items-center gap-2 opacity-60">
          <div className="h-px w-6 bg-gold/50" />
          <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans">
            {slides[current].name}
          </span>
          <div className="h-px w-6 bg-gold/50" />
        </div>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setTransitioning(false); }}
              className="transition-all duration-300"
              aria-label={`Slide ${i + 1}`}
            >
              <div className={`h-px transition-all duration-300 ${i === current ? "w-8 bg-gold" : "w-3 bg-gold/30"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
