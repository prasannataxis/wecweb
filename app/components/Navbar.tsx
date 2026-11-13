"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandEmblem from "./BrandEmblem";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Fleet", href: "/fleet" },
  { label: "Services", href: "/services" },
  { label: "Corporate", href: "/corporate" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink min-w-0" aria-label="Wimbledon Executive Chauffeurs — home">
      <BrandEmblem className="h-9 sm:h-12 transition-transform duration-300 group-hover:scale-105" />
      <span className="flex flex-col gap-1 leading-none">
        <span className="wm-nav text-luxury-text uppercase">
          Wimbledon
        </span>
        <span className="block h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <span className="text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] text-gold font-sans font-medium uppercase whitespace-nowrap">
          Executive Chauffeurs
        </span>
      </span>
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
      <div className={`max-w-[1600px] mx-auto px-4 sm:px-8 flex nav:grid nav:grid-cols-[auto_1fr_auto] items-center justify-between transition-all duration-500 ${scrolled ? "py-3 sm:py-4" : "py-4 sm:py-5"}`}>
        <Logo />

        <nav className="hidden nav:flex items-center justify-center gap-8 px-12">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`nav-link text-sm tracking-[0.14em] uppercase whitespace-nowrap font-sans font-medium transition-colors duration-200 ${
                pathname === link.href ? "active text-gold" : "text-luxury-text/85 hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden nav:flex items-center gap-3">
          <AdminLink active={pathname === "/admin"} />
          <Link
            href="/#booking"
            onClick={() => window.dispatchEvent(new Event("wl:book"))}
            className="neon-pulse inline-block whitespace-nowrap px-6 py-2.5 text-sm tracking-[0.15em] uppercase font-sans font-semibold text-gold border border-gold/60 hover:bg-gold hover:text-on-accent transition-colors duration-300"
          >
            Book Now
          </Link>
        </div>

        <div className="nav:hidden flex items-center gap-2 flex-shrink-0 ml-3">
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

      <div className={`nav:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
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
