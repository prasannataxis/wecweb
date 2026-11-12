"use client";
import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { useSettings } from "../theme/SettingsProvider";
import { AUTO_REVEAL_MS, IDLE_RETURN_MS, INTRO_SEEN_KEY, Settings } from "../theme/config";
import { CrownLogo } from "./Navbar";

type Phase = "playing" | "done";

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

const particles = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  size: 2 + ((i * 7) % 4),
  duration: 9 + ((i * 13) % 11),
  delay: -((i * 1.9) % 14),
}));

const streaks = [
  { top: 18, delay: 0, duration: 7 },
  { top: 37, delay: -2.5, duration: 9 },
  { top: 58, delay: -5, duration: 8 },
  { top: 76, delay: -1.2, duration: 10 },
  { top: 90, delay: -6.5, duration: 7.5 },
];

const fieldClass = "home-field w-full bg-luxury-black/60 border border-luxury-border text-luxury-text font-sans outline-none transition-all focus:border-gold/60";
const labelClass = "text-xs tracking-[0.2em] uppercase text-gold font-sans font-semibold";

function shouldSkipIntro(s: Settings) {
  return location.hash === "#booking" || (s.introReturn === "once" && sessionStorage.getItem(INTRO_SEEN_KEY) === "1");
}

export default function Hero() {
  const { settings, loaded } = useSettings();
  const [phase, setPhaseState] = useState<Phase>("playing");
  const [current, setCurrent] = useState(0);
  const [finePointer, setFinePointer] = useState<boolean | null>(null);
  const [form, setForm] = useState({ from: "", to: "", date: "", time: "", passengers: "2", luggage: "2" });

  const setPhase = useCallback((p: Phase) => {
    document.documentElement.dataset.intro = p;
    setPhaseState(p);
  }, []);

  const reveal = useCallback(() => {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    setPhase("done");
  }, [setPhase]);

  // On a hard load the head script has already set data-intro; on client-side navigation it hasn't.
  useLayoutEffect(() => {
    const d = document.documentElement.dataset;
    if (!d.intro) d.intro = shouldSkipIntro(settings) ? "done" : "playing";
    setPhaseState(d.intro as Phase);
    setFinePointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    return () => { delete document.documentElement.dataset.intro; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  // Next.js updates the hash via pushState (no hashchange event), so Book Now also
  // dispatches "wl:book", and the hash is re-checked once after client-side navigation.
  useEffect(() => {
    const onBook = () => reveal();
    const onHash = () => { if (location.hash === "#booking") reveal(); };
    const raf = requestAnimationFrame(onHash);
    window.addEventListener("wl:book", onBook);
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wl:book", onBook);
      window.removeEventListener("hashchange", onHash);
    };
  }, [reveal]);

  // Intro → booking view triggers
  useEffect(() => {
    if (phase !== "playing" || !loaded || finePointer === null) return;
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(type: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions) => {
      window.addEventListener(type, fn, opts);
      cleanups.push(() => window.removeEventListener(type, fn, opts));
    };

    if (finePointer) {
      let travelled = 0;
      let last: { x: number; y: number } | null = null;
      on("mousemove", (e) => {
        if (last) travelled += Math.hypot(e.clientX - last.x, e.clientY - last.y);
        last = { x: e.clientX, y: e.clientY };
        if (travelled > 40) reveal();
      });
      on("wheel", reveal, { passive: true });
      on("keydown", reveal);
    } else {
      on("click", reveal);
      on("touchmove", reveal, { passive: true });
      if (settings.touchReveal === "auto") {
        const t = setTimeout(reveal, AUTO_REVEAL_MS);
        cleanups.push(() => clearTimeout(t));
      }
    }
    return () => cleanups.forEach((c) => c());
  }, [phase, loaded, finePointer, settings.touchReveal, reveal]);

  // Booking view → back to intro when idle (if configured)
  useEffect(() => {
    if (phase !== "done" || !loaded || settings.introReturn !== "idle") return;
    let timer: ReturnType<typeof setTimeout>;
    const arm = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const el = document.activeElement;
        if (el && ["INPUT", "SELECT", "TEXTAREA"].includes(el.tagName)) return arm();
        setPhase("playing");
      }, IDLE_RETURN_MS);
    };
    const events = ["mousemove", "pointerdown", "keydown", "wheel", "touchstart", "input"] as const;
    events.forEach((e) => window.addEventListener(e, arm, { passive: true }));
    arm();
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, arm));
    };
  }, [phase, loaded, settings.introReturn, setPhase]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const hint =
    finePointer === null ? "" :
    finePointer ? "Move your mouse to begin" :
    settings.touchReveal === "tap" ? "Tap anywhere to begin" : "";

  return (
    <section id="home" className="home-stage" aria-label="Wimbledon Limousines">
      {/* Background */}
      <div className="home-bg" aria-hidden>
        {slides.map((slide, i) => (
          <div
            key={slide.name}
            className={`home-slide kb-${i % 4}`}
            style={{ backgroundImage: `url(${slide.image})`, opacity: i === current ? 1 : 0 }}
          />
        ))}
        <div className="home-overlay" />
        <div className="home-glow" />
        <div className="hero-grid" />
        {streaks.map((s, i) => (
          <span key={i} className="light-streak" style={{ top: `${s.top}%`, animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }} />
        ))}
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-luxury-black to-transparent pointer-events-none" aria-hidden />

      {/* Intro: logo + name */}
      <div className="intro-layer" aria-hidden={phase === "done"}>
        <div className="intro-crest">
          <span className="intro-corner tl" /><span className="intro-corner tr" />
          <span className="intro-corner bl" /><span className="intro-corner br" />
          <CrownLogo size={84} className="intro-crown" />
        </div>
        <h1 className="intro-title font-serif font-semibold text-luxury-text uppercase" aria-label="Wimbledon">
          {"WIMBLEDON".split("").map((ch, i) => (
            <span key={i} className="intro-letter" style={{ animationDelay: `${0.6 + i * 0.08}s` }}>{ch}</span>
          ))}
        </h1>
        <span className="intro-rule" />
        <p className="intro-sub font-sans font-medium text-gold uppercase">Limousines</p>
        {hint && <p className="intro-hint font-sans text-luxury-text/80 uppercase">{hint}</p>}
        <p className="intro-car font-sans text-gold/80 uppercase">{slides[current].name}</p>
      </div>

      {/* Booking view */}
      <div className="reveal-layer" aria-hidden={phase === "playing"}>
        <div className="reveal-inner">
        <div className="rv rv-1 home-badge inline-flex items-center gap-3 px-4 py-2 border border-gold/30 bg-luxury-black/50 backdrop-blur-sm">
          <span className="avail-dot flex-shrink-0" />
          <span className="text-xs sm:text-sm tracking-[0.18em] sm:tracking-[0.3em] uppercase text-gold font-sans font-semibold">
            <span className="hidden sm:inline">London&apos;s Premier Chauffeur · </span>Available 24/7
          </span>
        </div>

        <h2 className="rv rv-2 font-serif leading-[0.95] text-center select-none">
          <span className="home-h1-a block text-luxury-text font-bold tracking-tight">Arrive With</span>
          <span className="home-h1-b block gold-text font-bold italic tracking-tight px-3 pb-1">Distinction</span>
        </h2>

        <p className="rv rv-3 home-tagline text-luxury-text/85 text-base md:text-lg font-sans font-light max-w-xl text-center leading-relaxed">
          Executive chauffeur services across London and the South East. Airport transfers,
          corporate accounts &amp; private events.
        </p>

        <div id="quote" className="rv rv-4 home-card border-run luxury-card w-full max-w-4xl text-left">
          <div className="flex items-center gap-3 home-card-title">
            <div className="h-px flex-1 bg-luxury-border" />
            <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gold font-sans font-semibold">Request a Quote</span>
            <div className="h-px flex-1 bg-luxury-border" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 home-grid">
            <label className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <span className={labelClass}>Pick-up</span>
              <input type="text" placeholder="Address, airport or hotel..." value={form.from} onChange={set("from")} className={fieldClass} />
            </label>
            <label className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <span className={labelClass}>Drop-off</span>
              <input type="text" placeholder="Address, airport or hotel..." value={form.to} onChange={set("to")} className={fieldClass} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>Date</span>
              <input type="date" value={form.date} onChange={set("date")} className={fieldClass} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>Time</span>
              <input type="time" value={form.time} onChange={set("time")} className={fieldClass} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>Passengers</span>
              <select value={form.passengers} onChange={set("passengers")} className={`${fieldClass} cursor-pointer`}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n} Passenger{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>Luggage</span>
              <select value={form.luggage} onChange={set("luggage")} className={`${fieldClass} cursor-pointer`}>
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "Bag" : "Bags"}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <button className="shine-btn neon-pulse w-full sm:flex-1 home-cta bg-gold-gradient text-on-accent text-sm tracking-[0.25em] uppercase font-sans font-bold">
              Get an Instant Quote
            </button>
            <p className="text-luxury-muted text-sm font-sans tracking-wide whitespace-nowrap">
              No obligation &nbsp;·&nbsp; 24/7 service
            </p>
          </div>
        </div>

        <div className="rv rv-5 home-stats grid grid-cols-4 gap-4 sm:gap-8 w-full max-w-3xl">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-2xl md:text-4xl gold-text font-bold">{stat.value}</div>
              <div className="text-luxury-muted text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-sans mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
