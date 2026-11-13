"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { animationVars, DEFAULT_SETTINGS, mergeSettings, Settings, SETTINGS_KEY } from "./config";

type Patch = {
  [K in keyof Settings]?: Settings[K] extends object ? Partial<Settings[K]> : Settings[K];
};

type SettingsContextValue = {
  settings: Settings;
  loaded: boolean;
  update: (patch: Patch) => void;
  reset: (section?: "look" | "business") => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

function apply(s: Settings) {
  const root = document.documentElement;
  root.dataset.mode = s.mode;
  root.dataset.accent = s.accent;
  root.dataset.brandFont = s.brand.font;
  const vars = animationVars(s);
  for (const k in vars) root.style.setProperty(k, vars[k]);
}

function save(s: Settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  apply(s);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      const loadedSettings = mergeSettings(DEFAULT_SETTINGS, raw ? JSON.parse(raw) : null);
      setSettings(loadedSettings);
      // Re-apply in case React re-rendered <html> and dropped what the head script set
      apply(loadedSettings);
    } catch {}
    setLoaded(true);
  }, []);

  const update = useCallback((patch: Patch) => {
    setSettings((prev) => {
      const next = { ...prev } as Record<string, unknown>;
      const p = patch as Record<string, unknown>;
      for (const k in p) {
        const cur = next[k];
        next[k] = cur && typeof cur === "object" ? { ...(cur as object), ...(p[k] as object) } : p[k];
      }
      save(next as Settings);
      return next as Settings;
    });
  }, []);

  const reset = useCallback((section?: "look" | "business") => {
    setSettings((prev) => {
      const next: Settings =
        section === "business" ? { ...prev, business: DEFAULT_SETTINGS.business }
        : section === "look" ? { ...DEFAULT_SETTINGS, business: prev.business }
        : DEFAULT_SETTINGS;
      save(next);
      return next;
    });
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loaded, update, reset }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}

export function useBusiness() {
  const b = useSettings().settings.business;
  return {
    ...b,
    phoneHref: `tel:${b.phone.replace(/[^\d+]/g, "").replace(/^\+440/, "+44")}`,
    whatsappHref: `https://wa.me/${b.whatsapp.replace(/\D/g, "")}`,
    areaList: b.areas.split(",").map((a) => a.trim()).filter(Boolean),
  };
}
