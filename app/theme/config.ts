export type Mode = "dark" | "light";
export type AccentId = "gold" | "platinum" | "rose" | "bronze" | "emerald";

export const ACCENTS: { id: AccentId; name: string; swatch: string }[] = [
  { id: "gold", name: "Gold", swatch: "#C4A44A" },
  { id: "platinum", name: "Platinum", swatch: "#B8C2CC" },
  { id: "rose", name: "Rose Gold", swatch: "#C8847A" },
  { id: "bronze", name: "Bronze", swatch: "#CD7F32" },
  { id: "emerald", name: "Emerald", swatch: "#50C896" },
];

export const DEFAULT_MODE: Mode = "dark";
export const DEFAULT_ACCENT: AccentId = "gold";

export const STORAGE_KEYS = { mode: "wl-mode", accent: "wl-accent" } as const;

// Runs in <head> before paint so the saved theme applies without a flash.
export const themeInitScript = `(function(){try{var d=document.documentElement;d.dataset.mode=localStorage.getItem("${STORAGE_KEYS.mode}")||"${DEFAULT_MODE}";d.dataset.accent=localStorage.getItem("${STORAGE_KEYS.accent}")||"${DEFAULT_ACCENT}";}catch(e){}})();`;
