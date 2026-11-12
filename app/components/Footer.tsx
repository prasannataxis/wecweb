"use client";
import Link from "next/link";
import { useBusiness } from "../theme/SettingsProvider";
import { CrownLogo } from "./Navbar";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Fleet", href: "/fleet" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  "Heathrow Transfers",
  "Gatwick Transfers",
  "Corporate Accounts",
  "Event Chauffeur",
  "Wedding Hire",
  "As Directed",
];

const legalLinks = ["Privacy Policy", "Terms & Conditions", "Cookie Policy"];

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="text-xs tracking-[0.25em] uppercase text-gold font-sans font-semibold mb-5">{children}</h4>;
}

export default function Footer() {
  const b = useBusiness();

  return (
    <footer className="bg-luxury-black border-t border-luxury-border">
      <div className="nav-glow-bar opacity-60" />

      <div className="py-14 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <span className="w-10 h-10 border border-gold/30 flex items-center justify-center"><CrownLogo size={24} /></span>
              <span className="flex flex-col gap-1 leading-none">
                <span className="text-sm tracking-[0.4em] text-luxury-text font-serif font-semibold uppercase">Wimbledon</span>
                <span className="text-[11px] tracking-[0.2em] text-gold font-sans font-medium uppercase">Executive Chauffeurs</span>
              </span>
            </Link>
            <p className="text-luxury-muted text-sm font-sans font-light leading-relaxed max-w-xs">
              London&apos;s premier luxury chauffeur service. Serving the capital and the South East since 2009.
            </p>
          </div>

          <div>
            <ColumnTitle>Quick Links</ColumnTitle>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-luxury-muted hover:text-gold transition-colors font-sans">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnTitle>Services</ColumnTitle>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((l) => (
                <li key={l}>
                  <Link href="/services" className="text-sm text-luxury-muted hover:text-gold transition-colors font-sans">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <ColumnTitle>Coverage</ColumnTitle>
            <p className="text-sm text-luxury-muted font-sans font-light leading-relaxed mb-4">
              Based in {b.base}. We serve all of Greater London and the South East of England.
            </p>
            <div className="flex flex-wrap gap-2">
              {b.areaList.map((area) => (
                <span key={area} className="text-xs tracking-[0.1em] uppercase px-2.5 py-1 border border-luxury-border text-luxury-muted font-sans">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-luxury-border py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-center lg:text-left">
          <div className="text-xs text-luxury-subtle font-sans leading-relaxed">
            <p className="text-sm text-luxury-muted">&copy; {new Date().getFullYear()} {b.companyName}. All rights reserved.</p>
            <p className="mt-1">
              Registered in England &amp; Wales, Company No. {b.companyNumber} &nbsp;·&nbsp; VAT No. {b.vatNumber}
            </p>
            <p className="mt-1">Registered office: {b.registeredAddress}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <a key={l} href="#" className="text-xs text-luxury-subtle hover:text-gold transition-colors font-sans">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
