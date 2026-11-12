"use client";
import Link from "next/link";
import { useSettings } from "../theme/SettingsProvider";
import { ACCENTS, AUTO_REVEAL_MS, IDLE_RETURN_MS, INTRO_SEEN_KEY, Settings } from "../theme/config";

type Option<V> = { value: V; label: string; description: string };

const modeOptions: Option<Settings["mode"]>[] = [
  { value: "dark", label: "Dark", description: "Black background with metallic accents." },
  { value: "light", label: "Light", description: "Warm ivory background with navy text." },
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

function Choice<V extends string>({ name, options, value, onChange }: { name: string; options: Option<V>[]; value: V; onChange: (v: V) => void }) {
  return (
    <div className="grid gap-3" role="radiogroup">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <label
            key={o.value}
            className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${
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

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="border-run luxury-card p-6 sm:p-8">
      <h2 className="font-serif text-2xl text-luxury-text font-semibold">{title}</h2>
      <p className="text-sm text-luxury-muted font-sans mt-1 mb-6">{subtitle}</p>
      {children}
    </section>
  );
}

export default function AdminPanel() {
  const { settings, loaded, update, reset } = useSettings();

  const previewIntro = () => sessionStorage.removeItem(INTRO_SEEN_KEY);

  return (
    <div className="bg-luxury-dark min-h-screen pt-32 sm:pt-36 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-xs tracking-[0.4em] uppercase text-gold font-sans font-medium mb-3">Admin</p>
          <h1 className="font-serif text-4xl md:text-5xl text-luxury-text font-bold">Site Settings</h1>
          <p className="mt-4 text-base text-luxury-muted font-sans leading-relaxed">
            Changes apply instantly. Until the booking backend is connected, settings are saved in this browser only —
            visitors on other devices see the defaults.
          </p>
        </div>

        {!loaded ? null : (
          <div className="flex flex-col gap-8">
            <Panel title="Appearance" subtitle="Background mode and accent colour used across the whole site.">
              <div className="grid gap-8">
                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-gold font-sans font-semibold mb-3">Mode</h3>
                  <Choice name="mode" options={modeOptions} value={settings.mode} onChange={(mode) => update({ mode })} />
                </div>
                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-gold font-sans font-semibold mb-3">Accent colour</h3>
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

            <Panel title="Home Intro — Touch Devices" subtitle="Phones and tablets have no mouse, so choose what reveals the booking view.">
              <Choice name="touchReveal" options={touchOptions} value={settings.touchReveal} onChange={(touchReveal) => update({ touchReveal })} />
            </Panel>

            <Panel title="Home Intro — When It Returns" subtitle="Whether the logo intro plays again after the booking view has been shown.">
              <Choice name="introReturn" options={returnOptions} value={settings.introReturn} onChange={(introReturn) => update({ introReturn })} />
            </Panel>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                onClick={previewIntro}
                className="shine-btn neon-pulse flex-1 text-center py-4 bg-gold-gradient text-on-accent text-sm tracking-[0.25em] uppercase font-sans font-bold"
              >
                Preview Home Intro
              </Link>
              <button
                type="button"
                onClick={reset}
                className="flex-1 py-4 border border-gold/50 text-gold text-sm tracking-[0.25em] uppercase font-sans font-semibold hover:bg-gold/10 transition-colors"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
