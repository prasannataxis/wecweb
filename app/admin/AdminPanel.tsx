"use client";
import { useState } from "react";
import Link from "next/link";
import { useSettings } from "../theme/SettingsProvider";
import { ACCENTS, AUTO_REVEAL_MS, Business, DEFAULT_SETTINGS as D, IDLE_RETURN_MS, INTRO_SEEN_KEY, Motion, Settings, SLOGAN_PRESETS } from "../theme/config";

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
    <section className="border-run luxury-card p-6 sm:p-8">
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

export default function AdminPanel() {
  const { loaded } = useSettings();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("look");

  return (
    <div className="bg-luxury-dark min-h-screen pt-32 sm:pt-36 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-xs tracking-[0.4em] uppercase text-gold font-sans font-medium mb-3">Admin</p>
          <h1 className="font-serif text-4xl md:text-5xl text-luxury-text font-bold">Site Settings</h1>
          <p className="mt-4 text-base text-luxury-muted font-sans leading-relaxed">
            Changes apply instantly. Until the database is connected, settings are saved in this browser only —
            visitors on other devices see the defaults.
          </p>
        </div>

        <div className="flex border-b border-luxury-border mb-8" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`relative px-5 sm:px-8 py-4 text-sm tracking-[0.18em] uppercase font-sans font-semibold transition-colors ${
                tab === t.id ? "text-gold" : "text-luxury-muted hover:text-luxury-text"
              }`}
            >
              {t.label}
              <span className={`absolute left-0 right-0 -bottom-px h-0.5 bg-gold transition-transform duration-300 ${tab === t.id ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          ))}
        </div>

        {loaded && (tab === "look" ? <LookTab /> : <BusinessTab />)}
      </div>
    </div>
  );
}
