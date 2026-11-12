"use client";
import { useState } from "react";
import Link from "next/link";
import { useSettings } from "../theme/SettingsProvider";
import { ACCENTS, AUTO_REVEAL_MS, Business, IDLE_RETURN_MS, INTRO_SEEN_KEY, Motion, Settings } from "../theme/config";

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

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="border-run luxury-card p-6 sm:p-8">
      <h2 className="font-serif text-2xl text-luxury-text font-semibold">{title}</h2>
      <p className="text-sm text-luxury-muted font-sans mt-1 mb-6">{subtitle}</p>
      {children}
    </section>
  );
}

const times = (v: number) => `${v.toFixed(2).replace(/\.?0+$/, "")}×`;
const percent = (v: number) => `${v}%`;

function LookTab() {
  const { settings, update, reset } = useSettings();
  const { edge, intro } = settings;

  return (
    <div className="flex flex-col gap-8">
      <Panel title="Appearance" subtitle="Background mode and accent colour used across the whole site.">
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

      <Panel title="Card Edge Light" subtitle="The running light around boxes on every page. Hover the preview to test.">
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

      <Panel title="Home Intro Background" subtitle="Photo zoom, light streaks, glowing particles and the centre glow behind the logo.">
        <div className="grid sm:grid-cols-3 gap-6">
          <Slider label="Speed" value={intro.speed} min={0.25} max={2} step={0.05} format={times} onChange={(speed) => update({ intro: { speed } })} />
          <Slider label="Size" value={intro.size} min={0.5} max={2} step={0.1} format={times} onChange={(size) => update({ intro: { size } })} />
          <Slider label="Intensity" value={intro.intensity} min={0} max={100} step={5} format={percent} onChange={(intensity) => update({ intro: { intensity } })} />
        </div>
      </Panel>

      <Panel title="Home Intro — Touch Devices" subtitle="Phones and tablets have no mouse, so choose what reveals the booking view.">
        <Choice name="touchReveal" options={touchOptions} value={settings.touchReveal} onChange={(touchReveal) => update({ touchReveal })} />
      </Panel>

      <Panel title="Home Intro — When It Returns" subtitle="Whether the logo intro plays again after the booking view has been shown.">
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

function BusinessTab() {
  const { settings, update, reset } = useSettings();
  const b = settings.business;

  return (
    <div className="flex flex-col gap-8">
      <Panel title="Business Details" subtitle="Shown in the footer and on the Contact page. Saved as you type.">
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
