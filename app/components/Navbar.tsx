"use client";
import { useState, useEffect, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Fleet", href: "/fleet" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function CrownLogo({ size = 28, className }: { size?: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  const stop = (offset: string, color: string) => (
    <stop offset={offset} style={{ stopColor: `rgb(var(${color}))` }} />
  );
  const fill = `url(#${id})`;
  return (
    <svg width={size} height={size * 0.93} viewBox="0 0 56 48" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="56" y2="48" gradientUnits="userSpaceOnUse">
          {stop("0%", "--accent-dark")}
          {stop("30%", "--accent")}
          {stop("55%", "--accent-light")}
          {stop("80%", "--accent")}
          {stop("100%", "--accent-dark")}
        </linearGradient>
      </defs>
      <path d="M28 4 L22 20 L8 14 L14 30 L42 30 L48 14 L34 20 Z" fill={fill} />
      <rect x="11" y="31" width="34" height="4" rx="0.5" fill={fill} />
      <rect x="13" y="37" width="30" height="3" rx="0.5" fill={fill} opacity="0.6" />
      <circle cx="28" cy="3.5" r="2" fill={fill} />
      <circle cx="8" cy="13.5" r="2" fill={fill} />
      <circle cx="48" cy="13.5" r="2" fill={fill} />
      <circle cx="7" cy="29" r="1.5" fill={fill} opacity="0.8" />
      <circle cx="49" cy="29" r="1.5" fill={fill} opacity="0.8" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 sm:gap-4 group flex-shrink-0">
      <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 border border-gold/30 group-hover:border-gold/70 transition-colors duration-300 flex items-center justify-center">
        <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-gold/70" />
        <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-gold/70" />
        <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-gold/70" />
        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-gold/70" />
        <CrownLogo />
      </div>
      <div className="flex flex-col gap-1 leading-none">
        <span className="text-sm sm:text-base tracking-[0.3em] sm:tracking-[0.4em] text-luxury-text font-serif font-semibold uppercase">
          Wimbledon
        </span>
        <span className="block h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <span className="text-[11px] sm:text-xs tracking-[0.42em] sm:tracking-[0.5em] text-gold font-sans font-medium uppercase">
          Limousines
        </span>
      </div>
    </Link>
  );
}

function AdminLink({ active }: { active: boolean }) {
  return (
    <Link
      href="/admin"
      aria-label="Site settings (admin)"
      title="Site settings (admin)"
      className={`w-11 h-11 flex items-center justify-center border transition-colors ${
        active ? "border-gold text-gold" : "border-gold/30 text-luxury-text/80 hover:text-gold hover:border-gold/70"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const solid = scrolled || menuOpen || pathname !== "/";

  return (
    <header
      className={`site-nav fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        solid ? "bg-luxury-black/95 backdrop-blur-md" : "bg-gradient-to-b from-luxury-black/70 to-transparent"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-500 ${scrolled ? "py-3 sm:py-4" : "py-4 sm:py-5"}`}>
        <Logo />

        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`nav-link text-sm tracking-[0.15em] uppercase font-sans font-medium transition-colors duration-200 ${
                pathname === link.href ? "active text-gold" : "text-luxury-text/85 hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <AdminLink active={pathname === "/admin"} />
          <Link
            href="/#booking"
            onClick={() => window.dispatchEvent(new Event("wl:book"))}
            className="neon-pulse inline-block px-6 py-2.5 text-sm tracking-[0.15em] uppercase font-sans font-semibold text-gold border border-gold/60 hover:bg-gold hover:text-on-accent transition-colors duration-300"
          >
            Book Now
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
        <AdminLink active={pathname === "/admin"} />
        <button
          className="w-11 h-11 flex flex-col items-center justify-center gap-[5px] border border-gold/30"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-px bg-gold transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-5 h-px bg-gold transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-gold transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
        </div>
      </div>

      <div className="nav-glow-bar" />

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-luxury-dark border-t border-gold/10 px-6 py-4 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-base tracking-[0.2em] uppercase transition-colors py-3.5 border-b border-luxury-border font-sans font-medium ${
                pathname === link.href ? "text-gold" : "text-luxury-text/85 hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#booking"
            onClick={() => window.dispatchEvent(new Event("wl:book"))}
            className="neon-pulse mt-5 mb-2 text-center px-6 py-3.5 text-sm tracking-[0.2em] uppercase font-sans font-semibold text-gold border border-gold/60 hover:bg-gold hover:text-on-accent transition-colors duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
