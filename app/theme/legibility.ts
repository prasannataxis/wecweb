"use client";
import { useEffect, useState } from "react";
import { Mode, Legibility } from "./config";

const toLinear = (c: number) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

// Average relative luminance of the centre of each photo (where the headline sits).
// Returns null for a photo until measured, or if the browser can't read its pixels.
export function useSlideLuminance(urls: string[]) {
  const [lums, setLums] = useState<(number | null)[]>(() => urls.map(() => null));

  useEffect(() => {
    let alive = true;
    urls.forEach((url, index) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = 48;
          canvas.height = 27;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          ctx.drawImage(img, 0, 0, 48, 27);
          const data = ctx.getImageData(10, 4, 28, 18).data;
          let sum = 0;
          for (let i = 0; i < data.length; i += 4) {
            sum += 0.2126 * toLinear(data[i]) + 0.7152 * toLinear(data[i + 1]) + 0.0722 * toLinear(data[i + 2]);
          }
          const avg = sum / (data.length / 4);
          if (alive) setLums((prev) => prev.map((v, i) => (i === index ? avg : v)));
        } catch {
          // Cross-origin pixels unavailable — fall back to the mode default.
        }
      };
      img.src = url;
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls.join("|")]);

  return lums;
}

const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/**
 * Works out the backdrop luminance behind the text (photo seen through the overlay),
 * picks light or dark text, and how strong a halo is needed to stay readable.
 */
export function legibilityFor(opts: {
  photoLum: number | null;
  mode: Mode;
  overlayPct: number; // admin overlay slider, 0–100
  blurPx: number;
  setting: Legibility;
  haloPct: number; // admin halo slider, 0–100
}) {
  const { photoLum, mode, overlayPct, blurPx, setting, haloPct } = opts;
  const photo = photoLum ?? (mode === "dark" ? 0.12 : 0.35);
  // --hero-overlay is near-black at 55% (dark) or ivory at 74% (light), scaled by the slider
  const overlayLum = mode === "dark" ? 0.002 : 0.91;
  const a = (mode === "dark" ? 0.55 : 0.74) * (overlayPct / 100);
  const backdrop = a * overlayLum + (1 - a) * photo;

  // ~0.18 is where white and navy text give equal contrast
  const tone: "light" | "dark" = setting === "auto" ? (backdrop > 0.18 ? "dark" : "light") : setting;
  const textLum = tone === "light" ? 0.88 : 0.01;
  const ratio = contrast(textLum, backdrop);
  const busy = 1 - Math.min(blurPx / 10, 1); // sharp photos are busier behind text
  const need = Math.min(1, Math.max(0, (8 - ratio) / 7) * 0.85 + busy * 0.3);
  const halo = (haloPct / 100) * (0.2 + 0.8 * need);

  return { tone, halo: Math.round(halo * 100) / 100 };
}
