const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Fleet", href: "/fleet" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Heathrow Transfers", href: "/services" },
  { label: "Gatwick Transfers", href: "/services" },
  { label: "Corporate Accounts", href: "/services" },
  { label: "Event Chauffeur", href: "/services" },
  { label: "Wedding Hire", href: "/services" },
  { label: "As Directed", href: "/services" },
];

import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/447700000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
        style={{ background: "#25D366" }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      <footer id="contact" className="bg-luxury-black border-t border-luxury-border">

        {/* CTA Banner */}
        <div className="border-b border-luxury-border py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-luxury-text font-bold">
                Ready to Arrive with Distinction?
              </h3>
              <p className="text-luxury-muted text-sm font-sans font-light mt-1 tracking-wide">
                Book your luxury chauffeur in minutes.
              </p>
            </div>
            <Link
              href="/#booking"
              className="flex-shrink-0 px-10 py-4 bg-gold-gradient text-on-accent shine-btn neon-pulse text-sm tracking-[0.25em] uppercase font-sans font-bold hover:opacity-90 transition-opacity"
            >
              Get a Quote Now
            </Link>
          </div>
        </div>

        {/* Main footer columns */}
        <div className="py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand column */}
            <div className="lg:col-span-1">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-5">
                <div className="relative flex-shrink-0 w-9 h-9 border border-gold/30 flex items-center justify-center">
                  <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-gold/60" />
                  <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-gold/60" />
                  <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-gold/60" />
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-gold/60" />
                  <svg width="22" height="20" viewBox="0 0 56 48" fill="none">
                    <path d="M28 4 L22 20 L8 14 L14 30 L42 30 L48 14 L34 20 Z" fill="url(#fl1)" />
                    <rect x="11" y="31" width="34" height="4" rx="0.5" fill="url(#fl1)" />
                    <rect x="13" y="37" width="30" height="3" rx="0.5" fill="url(#fl1)" opacity="0.6" />
                    <circle cx="28" cy="3.5" r="2" fill="url(#fl1)" />
                    <circle cx="8"  cy="13.5" r="2" fill="url(#fl1)" />
                    <circle cx="48" cy="13.5" r="2" fill="url(#fl1)" />
                    <defs>
                      <linearGradient id="fl1" x1="0" y1="0" x2="56" y2="48" gradientUnits="userSpaceOnUse">
                        <stop offset="0%"   style={{ stopColor: "rgb(var(--accent-dark))" }} />
                        <stop offset="50%"  style={{ stopColor: "rgb(var(--accent-light))" }} />
                        <stop offset="100%" style={{ stopColor: "rgb(var(--accent-dark))" }} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-xs tracking-[0.45em] text-luxury-text font-serif font-semibold uppercase">Wimbledon</span>
                  <span className="block h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                  <span className="text-xs tracking-[0.5em] text-gold font-sans font-medium uppercase">Limousines</span>
                </div>
              </div>
              <p className="text-luxury-muted text-xs font-sans font-light leading-relaxed mb-6">
                London&apos;s premier luxury chauffeur service. Serving the capital and South East since 2009.
              </p>
              {/* Contact details */}
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+447700000000"
                  className="flex items-center gap-2.5 text-luxury-muted hover:text-gold transition-colors group"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-3.5 h-3.5 text-gold/50 group-hover:text-gold flex-shrink-0 transition-colors">
                    <path d="M2 2.5a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 .77l.5 2a1 1 0 0 1-.23.95L5 6a9.06 9.06 0 0 0 5 5l.78-.78a1 1 0 0 1 .95-.23l2 .5a1 1 0 0 1 .77 1V13a1 1 0 0 1-1 1C6.37 14 2 9.63 2 3.5V2.5z" />
                  </svg>
                  <span className="text-xs font-sans">+44 (0) 7700 000000</span>
                </a>
                <a
                  href="mailto:info@wimbledonlimousines.co.uk"
                  className="flex items-center gap-2.5 text-luxury-muted hover:text-gold transition-colors group"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-3.5 h-3.5 text-gold/50 group-hover:text-gold flex-shrink-0 transition-colors">
                    <rect x="1" y="3" width="14" height="10" rx="1" />
                    <path d="M1 4l7 5 7-5" />
                  </svg>
                  <span className="text-xs font-sans">info@wimbledonlimousines.co.uk</span>
                </a>
                <a
                  href="https://wa.me/447700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-luxury-muted hover:text-gold transition-colors group"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-gold/50 group-hover:text-gold flex-shrink-0 transition-colors">
                    <path d="M8 0C3.58 0 0 3.58 0 8a7.97 7.97 0 0 0 1.06 3.97L0 16l4.14-1.05A7.96 7.96 0 0 0 8 16c4.42 0 8-3.58 8-8s-3.58-8-8-8zm3.87 11.08c-.16.45-1.02.9-1.39.93-.37.04-.7.17-2.35-.48-1.97-.77-3.22-2.78-3.32-2.91-.1-.14-.83-1.1-.83-2.09 0-1 .52-1.48.71-1.69.19-.2.42-.25.56-.25h.4c.13 0 .3-.05.47.36.17.41.57 1.38.62 1.48.05.1.08.21.02.34-.06.14-.1.22-.19.34-.1.12-.2.26-.28.35-.1.1-.2.2-.08.4.12.2.52.86 1.12 1.39.77.68 1.41.9 1.61.99.2.1.31.08.43-.05.12-.14.5-.58.63-.78.14-.2.27-.17.46-.1.18.07 1.17.55 1.37.65.2.1.33.15.38.23.05.09.05.5-.11.95z"/>
                  </svg>
                  <span className="text-xs font-sans">WhatsApp Available</span>
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-xs tracking-[0.25em] uppercase text-gold font-sans font-semibold mb-5">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-2.5">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-xs text-luxury-muted hover:text-gold transition-colors font-sans tracking-wide"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs tracking-[0.25em] uppercase text-gold font-sans font-semibold mb-5">
                Services
              </h4>
              <ul className="flex flex-col gap-2.5">
                {services.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-xs text-luxury-muted hover:text-gold transition-colors font-sans tracking-wide"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coverage */}
            <div>
              <h4 className="text-xs tracking-[0.25em] uppercase text-gold font-sans font-semibold mb-5">
                Coverage
              </h4>
              <p className="text-xs text-luxury-muted font-sans font-light leading-relaxed mb-4">
                Based in Wimbledon, SW19. We serve all of Greater London and the South East of England.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["London", "Surrey", "Kent", "Essex", "Hertfordshire", "Berkshire"].map((area) => (
                  <span
                    key={area}
                    className="text-xs tracking-[0.1em] uppercase px-2 py-1 border border-luxury-border text-luxury-subtle font-sans"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-luxury-border py-6 px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-luxury-subtle font-sans tracking-wide">
              &copy; {new Date().getFullYear()} Wimbledon Limousines. All rights reserved.
            </p>
            <div className="flex gap-5">
              {["Privacy Policy", "Terms & Conditions", "Cookie Policy"].map((l) => (
                <a key={l} href="#" className="text-xs text-luxury-subtle hover:text-gold transition-colors font-sans tracking-wide">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
