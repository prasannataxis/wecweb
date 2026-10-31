"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─────────────────────────────────────────────────────────────────────────────
   WIMBLEDON LIMOUSINES — NOIR LAYOUT
   Shared fixed navbar + page-entry animation wrapper
───────────────────────────────────────────────────────────────────────────── */

const LAYOUT_STYLES = `
  @keyframes glowBarSweep {
    0%   { background-position: 0% center; }
    100% { background-position: 200% center; }
  }

  @keyframes neonPulse {
    0%, 100% {
      box-shadow:
        0 0 4px rgba(0,212,255,0.4),
        0 0 12px rgba(0,212,255,0.25),
        0 0 28px rgba(0,212,255,0.12);
    }
    50% {
      box-shadow:
        0 0 8px rgba(0,212,255,0.8),
        0 0 24px rgba(0,212,255,0.5),
        0 0 56px rgba(0,212,255,0.25);
    }
  }

  @keyframes pageEnter {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  .noir-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: rgba(5,5,5,0.92);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(0,212,255,0.15);
  }

  .nav-glow-bar {
    height: 1.5px;
    background: linear-gradient(90deg, transparent 0%, #00D4FF 30%, #8B5CF6 60%, #00D4FF 80%, transparent 100%);
    background-size: 200% auto;
    animation: glowBarSweep 3s linear infinite;
  }

  .nav-link {
    position: relative;
    color: rgba(255,255,255,0.75);
    font-size: 14px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 500;
    transition: color 0.25s;
    padding-bottom: 3px;
    font-family: var(--font-montserrat), sans-serif;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 1px;
    background: #00D4FF;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  .nav-link:hover,
  .nav-link.active { color: #00D4FF; }
  .nav-link:hover::after,
  .nav-link.active::after { transform: scaleX(1); }

  .book-now-btn {
    font-size: 12px;
    letter-spacing: 0.16em;
    font-weight: 600;
    text-transform: uppercase;
    color: #00D4FF;
    border: 1px solid rgba(0,212,255,0.45);
    padding: 8px 20px;
    border-radius: 2px;
    transition: background 0.3s, box-shadow 0.3s, color 0.3s;
    animation: neonPulse 2.4s ease-in-out infinite;
    font-family: var(--font-montserrat), sans-serif;
    background: transparent;
    cursor: pointer;
  }
  .book-now-btn:hover {
    background: rgba(0,212,255,0.1);
    box-shadow: 0 0 20px rgba(0,212,255,0.35);
    color: #ffffff;
  }

  .noir-page-main {
    animation: pageEnter 0.6s ease-out both;
  }
`;

const NAV_LINKS = [
  { label: "Home",     href: "/noir" },
  { label: "Fleet",    href: "/noir/fleet" },
  { label: "Services", href: "/noir/services" },
  { label: "Events",   href: "/noir/events" },
  { label: "About",    href: "/noir/about" },
  { label: "Contact",  href: "/noir/contact" },
];

export default function NoirLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ background: "#050505", minHeight: "100vh", color: "#ffffff", overflowX: "hidden" }}>
      <style>{LAYOUT_STYLES}</style>

      {/* ─── FIXED NAVBAR ─── */}
      <nav className="noir-nav">
        <div
          className="max-w-7xl mx-auto px-6 flex items-center justify-between"
          style={{ height: "68px" }}
        >
          {/* Logo */}
          <Link href="/noir" className="flex flex-col leading-none select-none" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-playfair), serif",
                color: "#ffffff",
                fontWeight: 700,
                letterSpacing: "0.22em",
                fontSize: "17px",
              }}
            >
              WIMBLEDON
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px" }}>
              <span style={{ height: "1px", width: "28px", background: "linear-gradient(90deg, #00D4FF, transparent)", display: "block" }} />
              <span
                style={{
                  color: "#00D4FF",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "12px",
                  letterSpacing: "0.3em",
                  fontWeight: 600,
                  fontVariant: "small-caps",
                }}
              >
                LIMOUSINES
              </span>
              <span style={{ height: "1px", width: "28px", background: "linear-gradient(270deg, #00D4FF, transparent)", display: "block" }} />
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link${pathname === href ? " active" : ""}`}
                style={{ textDecoration: "none" }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link href="/noir" style={{ textDecoration: "none" }}>
            <button className="book-now-btn">Book Now</button>
          </Link>
        </div>

        {/* Animated cyan glow sweep bar */}
        <div className="nav-glow-bar" />
      </nav>

      {/* ─── PAGE CONTENT ─── */}
      <main className="noir-page-main" style={{ paddingTop: "68px" }}>
        {children}
      </main>
    </div>
  );
}
