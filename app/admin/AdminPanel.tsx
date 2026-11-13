"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSettings } from "../theme/SettingsProvider";
import { ACCENTS, AUTO_REVEAL_MS, BRAND_FONTS, Business, DEFAULT_SETTINGS as D, IDLE_RETURN_MS, INTRO_SEEN_KEY, Legibility, Motion, Settings, SLOGAN_PRESETS } from "../theme/config";
import BrandEmblem from "../components/BrandEmblem";
import { useAdminSession } from "./AdminGate";

type Option<V> = { value: V; label: string; description: string };

const modeOptions: Option<Settings["mode"]>[] = [
  { value: "dark", label: "Dark", description: "Black background with metallic accents." },
  { value: "light", label: "Light", description: "Warm ivory background with navy text." },
];

const motionOptions: Option<Motion>[] = [
  { value: "static", label: "Static", description: "Light stays still" },
  { value: "slow", label: "Slow", description: "Gentle drift" },
  { value: "fast", label: "Fast", description: "Quick sweep" },
];

const legibilityOptions: Option<Legibility>[] = [
  { value: "auto", label: "Auto", description: "Measures each photo and picks light or dark text" },
  { value: "light", label: "Light text", description: "Always cream text" },
  { value: "dark", label: "Dark text", description: "Always navy text" },
];

const onOffOptions: Option<"on" | "off">[] = [
  { value: "on", label: "On", description: "Enabled" },
  { value: "off", label: "Off", description: "Disabled" },
];

const touchOptions: Option<Settings["touchReveal"]>[] = [
  { value: "tap", label: "Tap or swipe anywhere", description: "The first touch on the screen reveals the booking view." },
  { value: "auto", label: "Automatically", description: `The intro plays for ${AUTO_REVEAL_MS / 1000} seconds, then the booking view appears. A tap skips the wait.` },
];

const returnOptions: Option<Settings["introReturn"]>[] = [
  { value: "once", label: "Once per visit", description: "The intro plays the first time Home is opened; after that Home goes straight to booking until the browser tab is closed." },
  { value: "idle", label: "After being idle", description: `If there's no activity for ${IDLE_RETURN_MS / 1000} seconds on Home, it fades back to the logo intro (never while typing in the form).` },
  { value: "every", label: "Every time Home opens", description: "The intro plays on every visit to Home, but doesn't come back while the visitor is on it." },
];

const businessFields: { key: keyof Business; label: string; hint?: string; wide?: boolean }[] = [
  { key: "companyName", label: "Company name", wide: true },
  { key: "companyNumber", label: "Company registration number" },
  { key: "vatNumber", label: "VAT number" },
  { key: "registeredAddress", label: "Registered office address", wide: true },
  { key: "phone", label: "Phone (as displayed)" },
  { key: "email", label: "Email" },
  { key: "whatsapp", label: "WhatsApp number", hint: "International format, digits only — e.g. 447700000000" },
  { key: "base", label: "Base location" },
  { key: "areas", label: "Coverage areas", hint: "Comma separated", wide: true },
];

const sectionLabel = "text-xs tracking-[0.2em] uppercase text-gold font-sans font-semibold mb-3";

function Choice<V extends string>({ name, options, value, onChange, compact }: {
  name: string; options: Option<V>[]; value: V; onChange: (v: V) => void; compact?: boolean;
}) {
  return (
    <div className={compact ? "grid grid-cols-3 gap-2" : "grid gap-3"} role="radiogroup">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <label
            key={o.value}
            className={`flex items-start gap-3 border cursor-pointer transition-colors ${compact ? "p-3" : "p-4"} ${
              active ? "border-gold bg-gold/10" : "border-luxury-border hover:border-gold/50"
            }`}
          >
            <input type="radio" name={name} value={o.value} checked={active} onChange={() => onChange(o.value)} className="sr-only" />
            <span className={`mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${active ? "border-gold" : "border-luxury-subtle"}`}>
              {active && <span className="w-2 h-2 rounded-full bg-gold" />}
            </span>
            <span>
              <span className="block text-base text-luxury-text font-sans font-semibold">{o.label}</span>
              <span className="block text-sm text-luxury-muted font-sans mt-1 leading-relaxed">{o.description}</span>
            </span>
          </label>
        );
      })}
    </div>
  );
}

function Slider({ label, value, min, max, step, format, onChange }: {
  label: string; value: number; min: number; max: number; step: number; format: (v: number) => string; onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between mb-2">
        <span className="text-xs tracking-[0.2em] uppercase text-gold font-sans font-semibold">{label}</span>
        <span className="text-sm text-luxury-text font-sans tabular-nums">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[rgb(var(--accent))] cursor-pointer"
      />
    </label>
  );
}

function Panel({ title, subtitle, onReset, children }: {
  title: string; subtitle: string; onReset?: () => void; children: React.ReactNode;
}) {
  return (
    <section id={panelId(title)} className="border-run luxury-card p-6 sm:p-8 scroll-mt-[200px] lg:scroll-mt-[120px]">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-serif text-2xl text-luxury-text font-semibold">{title}</h2>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            title={`Reset ${title} to defaults`}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 border border-gold/40 text-gold text-xs tracking-[0.15em] uppercase font-sans font-semibold hover:bg-gold/10 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5" aria-hidden>
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Reset
          </button>
        )}
      </div>
      <p className="text-sm text-luxury-muted font-sans mt-1 mb-6">{subtitle}</p>
      {children}
    </section>
  );
}

const panelId = (title: string) => "panel-" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type IconName = "palette" | "spark" | "drop" | "type" | "crown" | "line" | "image" | "photo" | "hand" | "loop" | "quote" | "building";

const shortcuts: Record<"look" | "business", { title: string; label: string; icon: IconName }[]> = {
  look: [
    { title: "Appearance", label: "Appearance", icon: "palette" },
    { title: "Brand Typography", label: "Brand Font", icon: "crown" },
    { title: "Home Headline", label: "Headline", icon: "type" },
    { title: "Card Edge Light", label: "Edge Light", icon: "spark" },
    { title: "Card Colours", label: "Card Colours", icon: "drop" },
    { title: "Header Edge", label: "Header Edge", icon: "line" },
    { title: "Home Intro Background", label: "Intro Background", icon: "image" },
    { title: "Home Page Background", label: "Home Background", icon: "photo" },
    { title: "Home Intro — Touch Devices", label: "Touch Reveal", icon: "hand" },
    { title: "Home Intro — When It Returns", label: "Intro Return", icon: "loop" },
  ],
  business: [
    { title: "Slogan", label: "Slogan", icon: "quote" },
    { title: "Business Details", label: "Business Details", icon: "building" },
  ],
};

const iconPaths: Record<IconName, string> = {
  palette: "M12 3a9 9 0 1 0 0 18c1 0 1.6-.8 1.6-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.7-1.7H16a5 5 0 0 0 5-5C21 6.6 17 3 12 3zM7.5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
  spark: "M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8",
  drop: "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z",
  type: "M4 7V5h16v2M9 19h6M12 5v14",
  crown: "M3 18h18M4 16l2-9 4 4 2-6 2 6 4-4 2 9H4z",
  line: "M3 12h18M3 8h4M17 16h4",
  image: "M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4M15 9h.01",
  photo: "M3 7h4l2-2h6l2 2h4v12H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  hand: "M8 13V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-.5A5.5 5.5 0 0 1 5 16.5L4 14a1.5 1.5 0 0 1 2.6-1.4L8 14.5",
  loop: "M4 12a8 8 0 0 1 13.7-5.7L20 9M20 4v5h-5M20 12a8 8 0 0 1-13.7 5.7L4 15M4 20v-5h5",
  quote: "M7 17h3l2-4V7H6v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z",
  building: "M4 21V5l8-3 8 3v16M9 21v-4h6v4M8 8h1M8 12h1M15 8h1M15 12h1",
};

function Icon({ name, className = "w-4 h-4" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={iconPaths[name]} />
    </svg>
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    setActive(ids[0]);
    const update = () => {
      // the panel whose top has passed under the pinned header area
      const line = window.innerWidth >= 1024 ? 140 : 240;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - line <= 0) current = id;
      }
      // at the very bottom, the last panel may never reach the line
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = ids[ids.length - 1] ?? current;
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);
  return [active, setActive] as const;
}

const times = (v: number) => `${v.toFixed(2).replace(/\.?0+$/, "")}×`;
const percent = (v: number) => `${v}%`;

function LookTab() {
  const { settings, update, reset } = useSettings();
  const { edge, intro, headline, navEdge, cards, background, homeFx } = settings;

  return (
    <div className="flex flex-col gap-8">
      <Panel title="Appearance" subtitle="Background mode and accent colour used across the whole site." onReset={() => update({ mode: D.mode, accent: D.accent })}>
        <div className="grid gap-8">
          <div>
            <h3 className={sectionLabel}>Mode</h3>
            <Choice name="mode" options={modeOptions} value={settings.mode} onChange={(mode) => update({ mode })} />
          </div>
          <div>
            <h3 className={sectionLabel}>Accent colour</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3" role="radiogroup">
              {ACCENTS.map((a) => {
                const active = settings.accent === a.id;
                return (
                  <button
                    key={a.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => update({ accent: a.id })}
                    className={`flex flex-col items-center gap-3 p-4 border transition-colors ${
                      active ? "border-gold bg-gold/10" : "border-luxury-border hover:border-gold/50"
                    }`}
                  >
                    <span className={`w-10 h-10 rounded-full ${active ? "ring-2 ring-offset-2 ring-offset-luxury-card ring-luxury-text" : ""}`} style={{ background: a.swatch }} />
                    <span className="text-sm text-luxury-text font-sans">{a.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Brand Typography" subtitle="Typeface for the company name everywhere it appears — logo, intro and booking view." onReset={() => update({ brand: D.brand })}>
        <div className="grid sm:grid-cols-2 gap-3" role="radiogroup">
          {BRAND_FONTS.map((f) => {
            const on = settings.brand.font === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => update({ brand: { font: f.id } })}
                className={`p-4 border text-left transition-colors ${on ? "border-gold bg-gold/10" : "border-luxury-border hover:border-gold/50"}`}
              >
                <span className="flex items-center gap-3">
                  <BrandEmblem className="h-8" />
                  <span
                    className="text-luxury-text uppercase whitespace-nowrap"
                    style={{ fontFamily: `var(${f.cssVar})`, fontWeight: 600, fontSize: f.id === "michroma" ? 14 : 19, letterSpacing: f.id === "michroma" ? "0.12em" : "0.24em" }}
                  >
                    Wimbledon
                  </span>
                </span>
                <span className="block text-sm text-luxury-text font-sans font-semibold mt-3">{f.name}</span>
                <span className="block text-xs text-luxury-muted font-sans mt-0.5">{f.note}</span>
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel title="Card Edge Light" subtitle="The running light around boxes on every page. Hover the preview to test." onReset={() => update({ edge: D.edge })}>
        <div className="grid gap-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className={sectionLabel}>When not hovered</h3>
              <Choice compact name="edgeIdle" options={motionOptions} value={edge.idle} onChange={(idle) => update({ edge: { idle } })} />
            </div>
            <div>
              <h3 className={sectionLabel}>On hover</h3>
              <Choice compact name="edgeHover" options={motionOptions} value={edge.hover} onChange={(hover) => update({ edge: { hover } })} />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <Slider label="Speed" value={edge.speed} min={0.25} max={2} step={0.05} format={times} onChange={(speed) => update({ edge: { speed } })} />
            <Slider label="Width" value={edge.width} min={1} max={5} step={0.5} format={(v) => `${v}px`} onChange={(width) => update({ edge: { width } })} />
            <Slider label="Intensity" value={edge.intensity} min={0} max={100} step={5} format={percent} onChange={(intensity) => update({ edge: { intensity } })} />
          </div>
          <div className="border-run luxury-card lift-glow p-8 text-center">
            <p className="font-serif text-xl text-luxury-text">Preview card</p>
            <p className="text-sm text-luxury-muted font-sans mt-1">Hover to see the hover behaviour</p>
          </div>
        </div>
      </Panel>

      <Panel title="Card Colours" subtitle="Each card starts on its own colour in page order, then slowly cycles through the set. Static keeps the fixed order." onReset={() => update({ cards: D.cards })}>
        <div className="grid gap-8">
          <div>
            <h3 className={sectionLabel}>Colour cycling</h3>
            <Choice compact name="tintCycle" options={motionOptions} value={cards.cycle} onChange={(cycle) => update({ cards: { cycle } })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <Slider label="Colour intensity" value={cards.tint} min={0} max={100} step={5} format={percent} onChange={(tint) => update({ cards: { tint } })} />
            <Slider label="Cycling speed" value={cards.speed} min={0.25} max={3} step={0.05} format={times} onChange={(speed) => update({ cards: { speed } })} />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="luxury-card h-16" />
            ))}
          </div>
        </div>
      </Panel>

      <Panel title="Home Headline" subtitle={`The "${settings.business.slogan1} ${settings.business.slogan2}" headline on the booking view.`} onReset={() => update({ headline: D.headline })}>
        <div className="grid gap-8">
          <div>
            <h3 className={sectionLabel}>Text legibility over the photo</h3>
            <Choice compact name="hlLegible" options={legibilityOptions} value={headline.legibility} onChange={(legibility) => update({ headline: { legibility } })} />
            <div className="mt-5">
              <Slider label="Backdrop halo (applied only as much as needed)" value={headline.halo} min={0} max={100} step={5} format={percent} onChange={(halo) => update({ headline: { halo } })} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 items-end">
            <div>
              <h3 className={sectionLabel}>Alternate with company name</h3>
              <Choice compact name="hlAlt" options={onOffOptions} value={headline.alternate ? "on" : "off"} onChange={(v) => update({ headline: { alternate: v === "on" } })} />
            </div>
            <Slider label="Swap every" value={headline.interval} min={3} max={20} step={1} format={(v) => `${v}s`} onChange={(interval) => update({ headline: { interval } })} />
          </div>
          <div>
            <h3 className={sectionLabel}>Shimmer</h3>
            <Choice compact name="hlMotion" options={motionOptions} value={headline.motion} onChange={(motion) => update({ headline: { motion } })} />
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <Slider label="Shimmer speed" value={headline.speed} min={0.25} max={2} step={0.05} format={times} onChange={(speed) => update({ headline: { speed } })} />
            <Slider label="Shimmer strength" value={headline.intensity} min={0} max={100} step={5} format={percent} onChange={(intensity) => update({ headline: { intensity } })} />
            <Slider label="Entrance speed" value={headline.entrance} min={0.25} max={2} step={0.05} format={times} onChange={(entrance) => update({ headline: { entrance } })} />
          </div>
          <p className="font-serif text-4xl sm:text-5xl font-bold italic text-center gold-text headline-fx py-2">{settings.business.slogan2}</p>
        </div>
      </Panel>

      <Panel title="Header Edge" subtitle="The glowing line under the top menu (also used above the footer)." onReset={() => update({ navEdge: D.navEdge })}>
        <div className="grid gap-8">
          <div>
            <h3 className={sectionLabel}>Motion</h3>
            <Choice compact name="navMotion" options={motionOptions} value={navEdge.motion} onChange={(motion) => update({ navEdge: { motion } })} />
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <Slider label="Speed" value={navEdge.speed} min={0.25} max={2} step={0.05} format={times} onChange={(speed) => update({ navEdge: { speed } })} />
            <Slider label="Thickness" value={navEdge.width} min={1} max={5} step={0.5} format={(v) => `${v}px`} onChange={(width) => update({ navEdge: { width } })} />
            <Slider label="Intensity" value={navEdge.intensity} min={0} max={100} step={5} format={percent} onChange={(intensity) => update({ navEdge: { intensity } })} />
          </div>
        </div>
      </Panel>

      <Panel
        title="Home Intro Background"
        subtitle="Behind the logo intro: photo slideshow plus zoom, light streaks, particles and glow. Higher overlay = photo more subdued."
        onReset={() => update({ intro: D.intro, background: { introOverlay: D.background.introOverlay, introSlide: D.background.introSlide } })}
      >
        <div className="grid gap-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <Slider label="Background overlay" value={background.introOverlay} min={0} max={100} step={5} format={percent} onChange={(introOverlay) => update({ background: { introOverlay } })} />
            <Slider label="Slideshow: each photo" value={background.introSlide} min={3} max={20} step={1} format={(v) => `${v}s`} onChange={(introSlide) => update({ background: { introSlide } })} />
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <Slider label="Effects speed" value={intro.speed} min={0.25} max={2} step={0.05} format={times} onChange={(speed) => update({ intro: { speed } })} />
            <Slider label="Effects size" value={intro.size} min={0.5} max={2} step={0.1} format={times} onChange={(size) => update({ intro: { size } })} />
            <Slider label="Effects intensity" value={intro.intensity} min={0} max={100} step={5} format={percent} onChange={(intensity) => update({ intro: { intensity } })} />
          </div>
        </div>
      </Panel>

      <Panel
        title="Home Page Background"
        subtitle="Behind the booking view, after the intro. Effects are the same zoom, streaks, particles and glow — off by default."
        onReset={() => update({ homeFx: D.homeFx, background: { homeOverlay: D.background.homeOverlay, homeBlur: D.background.homeBlur, homeSlide: D.background.homeSlide } })}
      >
        <div className="grid gap-6">
          <div className="grid sm:grid-cols-3 gap-6">
            <Slider label="Background overlay" value={background.homeOverlay} min={0} max={100} step={5} format={percent} onChange={(homeOverlay) => update({ background: { homeOverlay } })} />
            <Slider label="Background blur" value={background.homeBlur} min={0} max={16} step={1} format={(v) => `${v}px`} onChange={(homeBlur) => update({ background: { homeBlur } })} />
            <Slider label="Slideshow: each photo" value={background.homeSlide} min={3} max={20} step={1} format={(v) => `${v}s`} onChange={(homeSlide) => update({ background: { homeSlide } })} />
          </div>
          <div>
            <h3 className={sectionLabel}>Background effects</h3>
            <Choice compact name="homeFx" options={onOffOptions} value={homeFx.enabled ? "on" : "off"} onChange={(v) => update({ homeFx: { enabled: v === "on" } })} />
          </div>
          {homeFx.enabled && (
            <div className="grid sm:grid-cols-3 gap-6">
              <Slider label="Effects speed" value={homeFx.speed} min={0.25} max={2} step={0.05} format={times} onChange={(speed) => update({ homeFx: { speed } })} />
              <Slider label="Effects size" value={homeFx.size} min={0.5} max={2} step={0.1} format={times} onChange={(size) => update({ homeFx: { size } })} />
              <Slider label="Effects intensity" value={homeFx.intensity} min={0} max={100} step={5} format={percent} onChange={(intensity) => update({ homeFx: { intensity } })} />
            </div>
          )}
        </div>
      </Panel>

      <Panel title="Home Intro — Touch Devices" subtitle="Phones and tablets have no mouse, so choose what reveals the booking view." onReset={() => update({ touchReveal: D.touchReveal })}>
        <Choice name="touchReveal" options={touchOptions} value={settings.touchReveal} onChange={(touchReveal) => update({ touchReveal })} />
      </Panel>

      <Panel title="Home Intro — When It Returns" subtitle="Whether the logo intro plays again after the booking view has been shown." onReset={() => update({ introReturn: D.introReturn })}>
        <Choice name="introReturn" options={returnOptions} value={settings.introReturn} onChange={(introReturn) => update({ introReturn })} />
      </Panel>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          onClick={() => sessionStorage.removeItem(INTRO_SEEN_KEY)}
          className="shine-btn neon-pulse flex-1 text-center py-4 bg-gold-gradient text-on-accent text-sm tracking-[0.25em] uppercase font-sans font-bold"
        >
          Preview Home Intro
        </Link>
        <button
          type="button"
          onClick={() => reset("look")}
          className="flex-1 py-4 border border-gold/50 text-gold text-sm tracking-[0.25em] uppercase font-sans font-semibold hover:bg-gold/10 transition-colors"
        >
          Reset Look &amp; Motion
        </button>
      </div>
    </div>
  );
}

function SloganPicker() {
  const { settings, update } = useSettings();
  const { slogan1, slogan2 } = settings.business;
  const presetIndex = SLOGAN_PRESETS.findIndex((p) => p.line1 === slogan1 && p.line2 === slogan2);
  const [custom, setCustom] = useState(presetIndex === -1);
  const optionClass = (active: boolean) =>
    `p-4 border text-left transition-colors ${active ? "border-gold bg-gold/10" : "border-luxury-border hover:border-gold/50"}`;

  return (
    <div className="grid gap-5">
      <div className="grid sm:grid-cols-2 gap-3" role="radiogroup">
        {SLOGAN_PRESETS.map((p, i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={!custom && presetIndex === i}
            onClick={() => { setCustom(false); update({ business: { slogan1: p.line1, slogan2: p.line2 } }); }}
            className={optionClass(!custom && presetIndex === i)}
          >
            <span className="font-serif text-lg text-luxury-text">{p.line1} </span>
            <span className="font-serif text-lg italic text-gold">{p.line2}</span>
          </button>
        ))}
        <button type="button" role="radio" aria-checked={custom} onClick={() => setCustom(true)} className={`${optionClass(custom)} sm:col-span-2`}>
          <span className="font-sans text-base font-semibold text-luxury-text">Custom slogan</span>
          <span className="block text-sm text-luxury-muted font-sans mt-1">Write your own two lines</span>
        </button>
      </div>
      {custom && (
        <div className="grid sm:grid-cols-2 gap-4">
          {([["slogan1", "First line"], ["slogan2", "Highlighted line"]] as const).map(([key, label]) => (
            <label key={key} className="flex flex-col gap-2">
              <span className="text-xs tracking-[0.2em] uppercase text-gold font-sans font-semibold">{label}</span>
              <input
                value={settings.business[key]}
                maxLength={28}
                onChange={(e) => update({ business: { [key]: e.target.value } })}
                className="w-full bg-luxury-black/60 border border-luxury-border text-luxury-text text-base font-sans px-4 py-3 outline-none focus:border-gold/60"
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function BusinessTab() {
  const { settings, update, reset } = useSettings();
  const b = settings.business;

  return (
    <div className="flex flex-col gap-8">
      <Panel title="Slogan" subtitle="The two-line headline on the home page. The second line is highlighted." onReset={() => update({ business: { slogan1: D.business.slogan1, slogan2: D.business.slogan2 } })}>
        <SloganPicker />
      </Panel>

      <Panel title="Business Details" subtitle="Shown in the footer and on the Contact page. Saved as you type." onReset={() => update({ business: { ...D.business, slogan1: settings.business.slogan1, slogan2: settings.business.slogan2 } })}>
        <div className="grid sm:grid-cols-2 gap-5">
          {businessFields.map((f) => (
            <label key={f.key} className={`flex flex-col gap-2 ${f.wide ? "sm:col-span-2" : ""}`}>
              <span className="text-xs tracking-[0.2em] uppercase text-gold font-sans font-semibold">{f.label}</span>
              <input
                value={b[f.key]}
                onChange={(e) => update({ business: { [f.key]: e.target.value } })}
                className="w-full bg-luxury-black/60 border border-luxury-border text-luxury-text text-base font-sans px-4 py-3 outline-none focus:border-gold/60"
              />
              {f.hint && <span className="text-xs text-luxury-muted font-sans">{f.hint}</span>}
            </label>
          ))}
        </div>
      </Panel>
      <button
        type="button"
        onClick={() => reset("business")}
        className="py-4 border border-gold/50 text-gold text-sm tracking-[0.25em] uppercase font-sans font-semibold hover:bg-gold/10 transition-colors"
      >
        Reset Business Data
      </button>
    </div>
  );
}

const tabs = [
  { id: "look", label: "Look & Motion" },
  { id: "business", label: "Business Data" },
] as const;

function SectionNav({ sections, active, onJump }: {
  sections: { title: string; label: string; icon: IconName }[];
  active: string;
  onJump: (id: string) => void;
}) {
  const index = Math.max(0, sections.findIndex((x) => panelId(x.title) === active));
  return (
    <nav aria-label="Sections" className="relative pl-5">
      <span className="absolute left-[7px] top-2 bottom-2 w-px bg-luxury-border" aria-hidden />
      <span
        className="absolute left-[7px] top-2 w-px bg-gold transition-all duration-500"
        style={{ height: `calc(${((index + 0.5) / sections.length) * 100}% - 8px)`, boxShadow: "0 0 8px rgb(var(--accent) / 0.8)" }}
        aria-hidden
      />
      <ul className="flex flex-col gap-1">
        {sections.map((x, i) => {
          const id = panelId(x.title);
          const on = id === active;
          const done = i < index;
          return (
            <li key={id} className="relative">
              <span
                className={`absolute -left-5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] rounded-full border-2 transition-colors ${
                  on ? "border-gold bg-gold shadow-[0_0_10px_rgb(var(--accent)/0.8)]" : done ? "border-gold bg-luxury-dark" : "border-luxury-border bg-luxury-dark"
                }`}
                aria-hidden
              />
              <button
                type="button"
                onClick={() => onJump(id)}
                aria-current={on ? "true" : undefined}
                className={`w-full flex items-center gap-2.5 pl-3 pr-2 py-2 text-left text-sm font-sans transition-colors ${
                  on ? "text-gold font-semibold bg-gold/10" : "text-luxury-muted hover:text-luxury-text"
                }`}
              >
                <Icon name={x.icon} />
                {x.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobileSectionPicker({ sections, active, onJump }: {
  sections: { title: string; label: string; icon: IconName }[];
  active: string;
  onJump: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = sections.find((x) => panelId(x.title) === active) ?? sections[0];
  const index = Math.max(0, sections.indexOf(current));
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 py-3 text-left"
      >
        <span className="w-9 h-9 flex items-center justify-center border border-gold/50 text-gold"><Icon name={current.icon} /></span>
        <span className="flex-1 min-w-0">
          <span className="block text-xs tracking-[0.2em] uppercase text-luxury-muted font-sans">Section {index + 1} of {sections.length}</span>
          <span className="block text-base text-luxury-text font-sans font-semibold truncate">{current.label}</span>
        </span>
        <span className="text-xs tracking-[0.15em] uppercase text-gold font-sans font-semibold flex items-center gap-1">
          All sections
          <svg viewBox="0 0 24 24" className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M6 9l6 6 6-6" /></svg>
        </span>
      </button>
      <span className="absolute left-0 bottom-0 h-0.5 bg-gold transition-all duration-500" style={{ width: `${((index + 1) / sections.length) * 100}%` }} aria-hidden />
      {open && (
        <div className="absolute left-0 right-0 top-full mt-px z-40 grid grid-cols-2 gap-2 p-3 bg-luxury-card border border-gold/30 shadow-2xl">
          {sections.map((x) => {
            const id = panelId(x.title);
            const on = id === active;
            return (
              <button
                key={id}
                type="button"
                onClick={() => { setOpen(false); onJump(id); }}
                className={`flex items-center gap-2 p-3 border text-left text-sm font-sans transition-colors ${
                  on ? "border-gold bg-gold/15 text-gold font-semibold" : "border-luxury-border text-luxury-text hover:border-gold/50"
                }`}
              >
                <Icon name={x.icon} />
                <span className="truncate">{x.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminPanel() {
  const { loaded } = useSettings();
  const session = useAdminSession();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("look");
  const sections = shortcuts[tab];
  const [active, setActive] = useActiveSection(loaded ? sections.map((x) => panelId(x.title)) : []);

  const jump = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const switchTab = (id: (typeof tabs)[number]["id"]) => {
    setTab(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tabButtons = (vertical: boolean) => (
    <div className={vertical ? "grid grid-cols-2 gap-1 p-1 border border-luxury-border mb-6" : "flex border-b border-luxury-border"} role="tablist">
      {tabs.map((t) => {
        const on = tab === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => switchTab(t.id)}
            className={
              vertical
                ? `py-2.5 text-xs tracking-[0.14em] uppercase font-sans font-semibold transition-colors ${on ? "bg-gold text-on-accent" : "text-luxury-muted hover:text-luxury-text"}`
                : `relative flex-1 px-3 py-3.5 text-sm tracking-[0.16em] uppercase font-sans font-semibold transition-colors ${on ? "text-gold" : "text-luxury-muted hover:text-luxury-text"}`
            }
          >
            {t.label}
            {!vertical && <span className={`absolute left-0 right-0 -bottom-px h-0.5 bg-gold transition-transform duration-300 ${on ? "scale-x-100" : "scale-x-0"}`} />}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="bg-luxury-dark min-h-screen pt-32 sm:pt-36 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 lg:pl-[290px]">
          <div className="flex items-center justify-between gap-4 mb-3">
            <p className="text-xs tracking-[0.4em] uppercase text-gold font-sans font-medium">Admin</p>
            {session && (
              <div className="flex items-center gap-3 text-sm font-sans">
                <span className="text-luxury-muted hidden sm:inline">Signed in as <span className="text-luxury-text font-semibold">{session.username}</span></span>
                <button
                  type="button"
                  onClick={session.logout}
                  className="px-3 py-1.5 border border-gold/50 text-gold text-xs tracking-[0.15em] uppercase font-semibold hover:bg-gold/10 transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-luxury-text font-bold">Site Settings</h1>
          <p className="mt-4 text-base text-luxury-muted font-sans leading-relaxed max-w-3xl">
            Changes apply instantly. Until the database is connected, settings are saved in this browser only —
            visitors on other devices see the defaults.
          </p>
        </div>

        {/* Phones & tablets: pinned tabs + current section with a picker for all sections */}
        <div className="lg:hidden sticky top-[68px] sm:top-[80px] z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 mb-8 bg-luxury-dark/95 backdrop-blur-md border-b border-luxury-border">
          {tabButtons(false)}
          {loaded && <MobileSectionPicker sections={sections} active={active} onJump={jump} />}
        </div>

        <div className="lg:grid lg:grid-cols-[250px_1fr] lg:gap-10">
          {/* Desktop: pinned sidebar with every section always visible */}
          <aside className="hidden lg:block">
            <div className="sticky top-[112px] max-h-[calc(100vh-130px)] overflow-y-auto pr-1">
              {tabButtons(true)}
              {loaded && <SectionNav sections={sections} active={active} onJump={jump} />}
            </div>
          </aside>
          <div className="min-w-0">{loaded && (tab === "look" ? <LookTab /> : <BusinessTab />)}</div>
        </div>
      </div>
    </div>
  );
}
