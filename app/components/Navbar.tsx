"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Fleet", href: "/gold/fleet" },
  { label: "Services", href: "/gold/services" },
  { label: "Events", href: "/gold/events" },
  { label: "About", href: "/gold/about" },
  { label: "Contact", href: "/gold/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-luxury-black/96 backdrop-blur-md border-b border-gold/20 py-5"
          : "bg-gradient-to-b from-black/60 to-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group flex-shrink-0">

          {/* Crown mark inside thin frame */}
          <div className="relative flex-shrink-0 w-11 h-11 border border-gold/30 group-hover:border-gold/60 transition-colors duration-300 flex items-center justify-center">
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-gold/60" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-gold/60" />
            <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-gold/60" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-gold/60" />

            <svg width="28" height="26" viewBox="0 0 56 48" fill="none">
              {/* 5-point crown */}
              <path
                d="M28 4 L22 20 L8 14 L14 30 L42 30 L48 14 L34 20 Z"
                fill="url(#cl1)"
                strokeWidth="0"
              />
              {/* Crown base bar */}
              <rect x="11" y="31" width="34" height="4" rx="0.5" fill="url(#cl1)" />
              <rect x="13" y="37" width="30" height="3" rx="0.5" fill="url(#cl1)" opacity="0.6" />
              {/* Jewel orbs on crown points */}
              <circle cx="28" cy="3.5" r="2" fill="url(#cl1)" />
              <circle cx="8"  cy="13.5" r="2" fill="url(#cl1)" />
              <circle cx="48" cy="13.5" r="2" fill="url(#cl1)" />
              <circle cx="7"  cy="29" r="1.5" fill="url(#cl1)" opacity="0.8" />
              <circle cx="49" cy="29" r="1.5" fill="url(#cl1)" opacity="0.8" />
              {/* Decorative dots on base */}
              <circle cx="28" cy="33" r="1" fill="#080808" opacity="0.5" />
              <circle cx="21" cy="33" r="0.8" fill="#080808" opacity="0.4" />
              <circle cx="35" cy="33" r="0.8" fill="#080808" opacity="0.4" />
              <defs>
                <linearGradient id="cl1" x1="0" y1="0" x2="56" y2="48" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#9A7820" />
                  <stop offset="30%"  stopColor="#C4A44A" />
                  <stop offset="55%"  stopColor="#CEAB5A" />
                  <stop offset="80%"  stopColor="#C4A44A" />
                  <stop offset="100%" stopColor="#9A7820" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Brand name */}
          <div className="flex flex-col gap-1 leading-none">
            <span className="text-sm tracking-[0.45em] text-luxury-text font-serif font-semibold uppercase">
              Wimbledon
            </span>
            {/* Thin gold rule */}
            <span className="block h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <span className="text-[11px] tracking-[0.55em] text-gold font-sans font-medium uppercase">
              Limousines
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm tracking-[0.15em] uppercase text-luxury-muted hover:text-gold transition-colors duration-200 font-sans font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/gold#booking"
            className="inline-block px-6 py-2.5 text-sm tracking-[0.15em] uppercase font-sans font-semibold text-gold border border-gold/50 hover:bg-gold hover:text-luxury-black transition-all duration-300"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 flex flex-col gap-[5px]"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[1px] bg-gold transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-6 h-[1px] bg-gold transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-6 h-[1px] bg-gold transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-luxury-dark/98 border-t border-gold/10 px-6 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-[0.22em] uppercase text-luxury-muted hover:text-gold transition-colors py-3 border-b border-luxury-border font-sans font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/gold#booking"
            onClick={() => setMenuOpen(false)}
            className="mt-4 text-center px-6 py-3 text-sm tracking-[0.2em] uppercase font-sans font-semibold text-gold border border-gold/50 hover:bg-gold hover:text-luxury-black transition-all duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
