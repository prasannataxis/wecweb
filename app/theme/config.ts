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

export type BrandFont = "cinzel" | "bodoni" | "michroma" | "italiana" | "playfair";
export type Legibility = "auto" | "light" | "dark";

export type HeadlineSettings = {
  legibility: Legibility; // text tone over the photo: measured automatically, or forced
  halo: number; // 0–100, strength of the soft backdrop behind the text when needed
  alternate: boolean; // swap between company name and slogan on the booking view
  interval: number; // seconds per swap
  motion: Motion; // shimmer sweep across the highlighted line
  speed: number;
  intensity: number; // 0–100, how bright the shimmer highlight is
  entrance: number; // multiplier for the fade-up entrance speed
};

export type NavEdgeSettings = {
  motion: Motion;
  speed: number;
  width: number; // px
  intensity: number; // 0–100
};

export type BrandSettings = {
  font: BrandFont;
};

export type CardSettings = {
  tint: number; // 0–100, strength of the per-card colour wash
  cycle: Motion; // colours shifting over time; static = fixed colour per position
  speed: number;
};

export type BackgroundSettings = {
  introOverlay: number; // 0–100, how strongly the photo is dimmed/washed on the intro
  homeOverlay: number; // same, on the booking view
  homeBlur: number; // px
  introSlide: number; // seconds per photo
  homeSlide: number;
};

export type HomeFxSettings = {
  enabled: boolean; // photo zoom, streaks, particles and glow on the booking view
  speed: number;
  size: number;
  intensity: number;
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
  slogan1: string;
  slogan2: string; // highlighted line
};

export type Settings = {
  mode: Mode;
  accent: AccentId;
  touchReveal: TouchReveal;
  introReturn: IntroReturn;
  edge: EdgeSettings;
  intro: IntroFxSettings;
  headline: HeadlineSettings;
  navEdge: NavEdgeSettings;
  cards: CardSettings;
  brand: BrandSettings;
  background: BackgroundSettings;
  homeFx: HomeFxSettings;
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
  headline: { legibility: "auto", halo: 60, alternate: true, interval: 6, motion: "slow", speed: 1, intensity: 70, entrance: 1 },
  navEdge: { motion: "slow", speed: 1, width: 1.5, intensity: 70 },
  cards: { tint: 30, cycle: "slow", speed: 1 },
  brand: { font: "cinzel" },
  background: { introOverlay: 70, homeOverlay: 100, homeBlur: 7, introSlide: 7, homeSlide: 7 },
  homeFx: { enabled: false, speed: 0.6, size: 1, intensity: 40 },
  business: {
    companyName: "Wimbledon Executive Chauffeurs Ltd",
    companyNumber: "00000000",
    vatNumber: "GB 000 0000 00",
    registeredAddress: "Registered office address, Wimbledon, London SW19",
    phone: "+44 (0) 7700 000000",
    email: "info@wimbledonexecutivechauffeurs.co.uk",
    whatsapp: "447700000000",
    base: "Wimbledon, London SW19",
    areas: "London, Surrey, Kent, Essex, Hertfordshire, Berkshire",
    slogan1: "Arrive With",
    slogan2: "Distinction",
  },
};

export const BRAND_FONTS: { id: BrandFont; name: string; note: string; cssVar: string }[] = [
  { id: "cinzel", name: "Cinzel", note: "Classic Roman capitals — timeless luxury", cssVar: "--font-cinzel" },
  { id: "bodoni", name: "Bodoni Moda", note: "High-contrast fashion serif", cssVar: "--font-bodoni" },
  { id: "michroma", name: "Michroma", note: "Wide, modern automotive", cssVar: "--font-michroma" },
  { id: "italiana", name: "Italiana", note: "Slender, elegant display", cssVar: "--font-italiana" },
  { id: "playfair", name: "Playfair Display", note: "The site's heading serif", cssVar: "--font-playfair" },
];

export const SLOGAN_PRESETS: { line1: string; line2: string }[] = [
  { line1: "Arrive With", line2: "Distinction" },
  { line1: "Travel In", line2: "Elegance" },
  { line1: "Driven By", line2: "Excellence" },
  { line1: "The Art of", line2: "Arrival" },
  { line1: "Your Journey,", line2: "Perfected" },
  { line1: "London's Finest", line2: "Chauffeurs" },
];

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
  const dur = (base: number, speed: number, m: string) =>
    (base / Math.max(0.1, speed)) * (m === "slow" ? 2 : m === "fast" ? 0.5 : 1) + "s";
  const play = (m: string) => (m === "static" ? "paused" : "running");
  return {
    "--edge-width": s.edge.width + "px",
    "--edge-alpha": String(s.edge.intensity / 100),
    "--edge-dur-idle": dur(6, s.edge.speed, s.edge.idle),
    "--edge-dur-hover": dur(6, s.edge.speed, s.edge.hover),
    "--edge-play-idle": play(s.edge.idle),
    "--edge-play-hover": play(s.edge.hover),
    "--intro-time": String(1 / Math.max(0.1, s.intro.speed)),
    "--intro-size": String(s.intro.size),
    "--intro-alpha": String(s.intro.intensity / 100),
    "--hl-dur": dur(4, s.headline.speed, s.headline.motion),
    "--hl-play": play(s.headline.motion),
    "--hl-pct": s.headline.intensity + "%",
    "--entrance-time": String(1 / Math.max(0.1, s.headline.entrance)),
    "--nav-dur": dur(2, s.navEdge.speed, s.navEdge.motion),
    "--nav-play": play(s.navEdge.motion),
    "--nav-h": s.navEdge.width + "px",
    "--nav-alpha": String(s.navEdge.intensity / 100),
    "--tint-alpha": String((s.cards.tint / 100) * 0.4),
    "--tint-dur": dur(24, s.cards.speed, s.cards.cycle),
    "--tint-play": play(s.cards.cycle),
    "--intro-overlay": String(s.background.introOverlay / 100),
    "--home-overlay": String(s.background.homeOverlay / 100),
    "--home-blur": s.background.homeBlur + "px",
    "--home-fx-alpha": String(s.homeFx.enabled ? s.homeFx.intensity / 100 : 0),
    "--home-time": String(1 / Math.max(0.1, s.homeFx.speed)),
    "--home-size": String(s.homeFx.size),
    "--home-zoom-play": s.homeFx.enabled ? "running" : "paused",
  };
}

// Runs in <head> before paint: applies saved theme and animation settings, and on
// the home page decides whether the intro plays, so nothing flashes the wrong state.
export const themeInitScript = `(function(){try{var mergeSettings=${mergeSettings.toString()};var animationVars=${animationVars.toString()};var d=document.documentElement;var raw=localStorage.getItem("${SETTINGS_KEY}");var s=mergeSettings(${JSON.stringify(DEFAULT_SETTINGS)},raw?JSON.parse(raw):null);d.dataset.mode=s.mode;d.dataset.accent=s.accent;d.dataset.brandFont=s.brand.font;var v=animationVars(s);for(var k in v)d.style.setProperty(k,v[k]);if(location.pathname==="/"){var skip=location.hash==="#booking"||(s.introReturn==="once"&&sessionStorage.getItem("${INTRO_SEEN_KEY}")==="1");d.dataset.intro=skip?"done":"playing";}}catch(e){}})();`;
