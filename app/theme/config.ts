export type Mode = "dark" | "light";
export type AccentId = "gold" | "platinum" | "rose" | "bronze" | "emerald";
export type TouchReveal = "tap" | "auto";
export type IntroReturn = "once" | "idle" | "every";
export type Motion = "static" | "slow" | "fast";

export type EdgeSettings = {
  idle: Motion;
  hover: Motion;
  speed: number; // multiplier, 1 = 6s per lap
  width: number; // px
  intensity: number; // 0–100
};

export type IntroFxSettings = {
  speed: number; // multiplier
  size: number; // multiplier for streak thickness / particle size
  intensity: number; // 0–100
};

export type Business = {
  companyName: string;
  companyNumber: string;
  vatNumber: string;
  registeredAddress: string;
  phone: string;
  email: string;
  whatsapp: string; // international digits, e.g. 447700000000
  base: string;
  areas: string; // comma separated
};

export type Settings = {
  mode: Mode;
  accent: AccentId;
  touchReveal: TouchReveal;
  introReturn: IntroReturn;
  edge: EdgeSettings;
  intro: IntroFxSettings;
  business: Business;
};

export const ACCENTS: { id: AccentId; name: string; swatch: string }[] = [
  { id: "gold", name: "Gold", swatch: "#C4A44A" },
  { id: "platinum", name: "Platinum", swatch: "#B8C2CC" },
  { id: "rose", name: "Rose Gold", swatch: "#C8847A" },
  { id: "bronze", name: "Bronze", swatch: "#CD7F32" },
  { id: "emerald", name: "Emerald", swatch: "#50C896" },
];

export const DEFAULT_SETTINGS: Settings = {
  mode: "dark",
  accent: "gold",
  touchReveal: "tap",
  introReturn: "once",
  edge: { idle: "slow", hover: "fast", speed: 1, width: 1.5, intensity: 60 },
  intro: { speed: 0.7, size: 1, intensity: 55 },
  business: {
    companyName: "Wimbledon Limousines Ltd",
    companyNumber: "00000000",
    vatNumber: "GB 000 0000 00",
    registeredAddress: "Registered office address, Wimbledon, London SW19",
    phone: "+44 (0) 7700 000000",
    email: "info@wimbledonlimousines.co.uk",
    whatsapp: "447700000000",
    base: "Wimbledon, London SW19",
    areas: "London, Surrey, Kent, Essex, Hertfordshire, Berkshire",
  },
};

export const AUTO_REVEAL_MS = 3500;
export const IDLE_RETURN_MS = 12000;

export const SETTINGS_KEY = "wl-settings";
export const INTRO_SEEN_KEY = "wl-intro-seen";

// These two functions are also serialised into the <head> script below, so they
// must stay self-contained and use only plain JS (no imports, spread, or helpers).
export function mergeSettings(defaults: Settings, saved: Record<string, unknown> | null): Settings {
  const out: Record<string, unknown> = {};
  const d = defaults as unknown as Record<string, unknown>;
  for (const k in d) {
    const dv = d[k];
    const sv = saved ? saved[k] : undefined;
    if (dv && typeof dv === "object") {
      const nested: Record<string, unknown> = {};
      const dvo = dv as Record<string, unknown>;
      const svo = (sv && typeof sv === "object" ? sv : {}) as Record<string, unknown>;
      for (const n in dvo) nested[n] = svo[n] !== undefined ? svo[n] : dvo[n];
      out[k] = nested;
    } else {
      out[k] = sv !== undefined ? sv : dv;
    }
  }
  return out as unknown as Settings;
}

export function animationVars(s: Settings): Record<string, string> {
  const base = 6 / Math.max(0.1, s.edge.speed);
  const dur = (m: string) => (m === "slow" ? base * 2 : m === "fast" ? base * 0.5 : base) + "s";
  const play = (m: string) => (m === "static" ? "paused" : "running");
  return {
    "--edge-width": s.edge.width + "px",
    "--edge-alpha": String(s.edge.intensity / 100),
    "--edge-dur-idle": dur(s.edge.idle),
    "--edge-dur-hover": dur(s.edge.hover),
    "--edge-play-idle": play(s.edge.idle),
    "--edge-play-hover": play(s.edge.hover),
    "--intro-time": String(1 / Math.max(0.1, s.intro.speed)),
    "--intro-size": String(s.intro.size),
    "--intro-alpha": String(s.intro.intensity / 100),
  };
}

// Runs in <head> before paint: applies saved theme and animation settings, and on
// the home page decides whether the intro plays, so nothing flashes the wrong state.
export const themeInitScript = `(function(){try{var mergeSettings=${mergeSettings.toString()};var animationVars=${animationVars.toString()};var d=document.documentElement;var raw=localStorage.getItem("${SETTINGS_KEY}");var s=mergeSettings(${JSON.stringify(DEFAULT_SETTINGS)},raw?JSON.parse(raw):null);d.dataset.mode=s.mode;d.dataset.accent=s.accent;var v=animationVars(s);for(var k in v)d.style.setProperty(k,v[k]);if(location.pathname==="/"){var skip=location.hash==="#booking"||(s.introReturn==="once"&&sessionStorage.getItem("${INTRO_SEEN_KEY}")==="1");d.dataset.intro=skip?"done":"playing";}}catch(e){}})();`;
