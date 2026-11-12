"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AccentId, DEFAULT_ACCENT, DEFAULT_MODE, Mode, STORAGE_KEYS } from "./config";

type ThemeContextValue = {
  mode: Mode;
  accent: AccentId;
  setMode: (m: Mode) => void;
  setAccent: (a: AccentId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>(DEFAULT_MODE);
  const [accent, setAccentState] = useState<AccentId>(DEFAULT_ACCENT);

  useEffect(() => {
    const d = document.documentElement.dataset;
    if (d.mode) setModeState(d.mode as Mode);
    if (d.accent) setAccentState(d.accent as AccentId);
  }, []);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    document.documentElement.dataset.mode = m;
    localStorage.setItem(STORAGE_KEYS.mode, m);
  }, []);

  const setAccent = useCallback((a: AccentId) => {
    setAccentState(a);
    document.documentElement.dataset.accent = a;
    localStorage.setItem(STORAGE_KEYS.accent, a);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, accent, setMode, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
