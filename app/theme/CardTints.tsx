"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Numbers every .luxury-card in page order so the colour sequence continues across
// sections instead of restarting in each grid (CSS nth-child is only the fallback).
export default function CardTints() {
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    const assign = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.querySelectorAll<HTMLElement>(".luxury-card").forEach((el, i) => {
          const v = String(i % 6);
          if (el.style.getPropertyValue("--tint-i") !== v) el.style.setProperty("--tint-i", v);
        });
      });
    };
    assign();
    const observer = new MutationObserver(assign);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
