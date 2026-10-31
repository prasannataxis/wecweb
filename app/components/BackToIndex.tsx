"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BackToIndex() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <Link
      href="/"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 16px",
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "100px",
        color: "rgba(255,255,255,0.8)",
        textDecoration: "none",
        fontSize: "12px",
        letterSpacing: "0.08em",
        fontFamily: "var(--font-montserrat), sans-serif",
        fontWeight: 500,
        transition: "background 0.2s, border-color 0.2s, color 0.2s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(30,30,30,0.95)";
        (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.35)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(10,10,10,0.85)";
        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
      }}
    >
      ← All Designs
    </Link>
  );
}
