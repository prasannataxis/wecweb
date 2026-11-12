export type Mode = "dark" | "light";
export type AccentId = "gold" | "platinum" | "rose" | "bronze" | "emerald";
export type TouchReveal = "tap" | "auto";
export type IntroReturn = "once" | "idle" | "every";

export type Settings = {
  mode: Mode;
  accent: AccentId;
  touchReveal: TouchReveal;
  introReturn: IntroReturn;
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
};

export const AUTO_REVEAL_MS = 3500;
export const IDLE_RETURN_MS = 12000;

export const SETTINGS_KEY = "wl-settings";
export const INTRO_SEEN_KEY = "wl-intro-seen";

// Runs in <head> before paint: applies saved theme, and on the home page decides
// whether the intro plays, so neither flashes the wrong state.
export const themeInitScript = `(function(){try{var d=document.documentElement;var s=${JSON.stringify(DEFAULT_SETTINGS)};var raw=localStorage.getItem("${SETTINGS_KEY}");if(raw){var p=JSON.parse(raw);for(var k in p)s[k]=p[k];}d.dataset.mode=s.mode;d.dataset.accent=s.accent;if(location.pathname==="/"){var skip=location.hash==="#booking"||(s.introReturn==="once"&&sessionStorage.getItem("${INTRO_SEEN_KEY}")==="1");d.dataset.intro=skip?"done":"playing";}}catch(e){}})();`;
