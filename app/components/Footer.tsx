import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Fleet", href: "/fleet" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-luxury-black border-t border-luxury-border">
      <div className="nav-glow-bar opacity-60" />
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link text-sm tracking-[0.12em] uppercase text-luxury-muted hover:text-gold transition-colors font-sans"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-luxury-subtle font-sans text-center">
          &copy; {new Date().getFullYear()} Wimbledon Limousines. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
