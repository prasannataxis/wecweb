"use client";
import { useEffect, useRef, useState } from "react";
import { ACCENTS } from "./config";
import { useTheme } from "./ThemeProvider";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" strokeLinejoin="round" />
    </svg>
  );
}

export function ModeToggle() {
  const { mode, setMode } = useTheme();
  const next = mode === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setMode(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="theme-btn"
    >
      {mode === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export function AccentSwatches({ onPick }: { onPick?: () => void }) {
  const { accent, setAccent } = useTheme();
  return (
    <div className="flex items-center gap-3" role="radiogroup" aria-label="Accent colour">
      {ACCENTS.map((a) => (
        <button
          key={a.id}
          type="button"
          role="radio"
          aria-checked={accent === a.id}
          aria-label={a.name}
          title={a.name}
          onClick={() => { setAccent(a.id); onPick?.(); }}
          className={`swatch ${accent === a.id ? "swatch-active" : ""}`}
          style={{ background: a.swatch }}
        />
      ))}
    </div>
  );
}

export function AccentPicker() {
  const { accent } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = ACCENTS.find((a) => a.id === accent) ?? ACCENTS[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Change accent colour"
        title="Change accent colour"
        className="theme-btn"
      >
        <span className="block w-4 h-4 rounded-full ring-1 ring-luxury-text/30" style={{ background: current.swatch }} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-3 p-4 bg-luxury-card border border-gold/30 shadow-2xl fade-in-fast z-50">
          <p className="text-xs tracking-[0.2em] uppercase text-luxury-muted font-sans mb-3 whitespace-nowrap">
            Accent · <span className="text-gold">{current.name}</span>
          </p>
          <AccentSwatches onPick={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
