'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '/obsidian' },
  { label: 'Fleet', href: '/obsidian/fleet' },
  { label: 'Services', href: '/obsidian/services' },
  { label: 'Events', href: '/obsidian/events' },
  { label: 'About', href: '/obsidian/about' },
  { label: 'Contact', href: '/obsidian/contact' },
];

function HexButton({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          position: 'relative',
          width: '90px',
          height: '78px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        className="hex-nav-btn"
      >
        {/* Outer scarlet hex (border effect) */}
        <div
          style={{
            position: 'absolute',
            inset: '-2px',
            background: '#E02020',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            opacity: active ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
          className="hex-border-layer"
        />
        {/* Inner filled hex */}
        <div
          style={{
            position: 'absolute',
            inset: '2px',
            background: active ? '#E02020' : '#18181F',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            transition: 'background 0.2s',
          }}
          className="hex-fill-layer"
        />
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            fontSize: '11px',
            color: '#F0F0F5',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}

function BookHex() {
  return (
    <Link href="/obsidian/contact" style={{ textDecoration: 'none' }}>
      <div
        style={{
          position: 'relative',
          width: '110px',
          height: '95px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        className="hex-book-btn"
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#E02020',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            transition: 'filter 0.2s',
          }}
          className="hex-book-fill"
        />
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            fontSize: '11px',
            color: '#F0F0F5',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          BOOK<br />NOW
        </span>
      </div>
    </Link>
  );
}

export default function ObsidianLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ background: '#0F0F14', color: '#F0F0F5', minHeight: '100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Montserrat:wght@400;500;600;700;800&display=swap');`}</style>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body {
            background: #0F0F14;
            color: #F0F0F5;
            font-family: Montserrat, sans-serif;
            overflow-x: hidden;
          }

          /* Hex nav hover effects */
          .hex-nav-btn:hover .hex-border-layer { opacity: 1 !important; }
          .hex-nav-btn:hover .hex-fill-layer { background: #E02020 !important; }
          .hex-book-btn:hover .hex-book-fill { filter: brightness(1.15); }

          /* Scrollbar */
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #0F0F14; }
          ::-webkit-scrollbar-thumb { background: #E02020; border-radius: 3px; }

          /* Global page entry animation */
          @keyframes pageEntry {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .page-entry {
            animation: pageEntry 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
          }

          /* Hex reveal animation */
          @keyframes hexReveal {
            from { opacity: 0; transform: scale(0.6) rotate(-8deg); }
            to { opacity: 1; transform: scale(1) rotate(0deg); }
          }
          .hex-reveal {
            animation: hexReveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
          }

          /* Hex pulse */
          @keyframes hexPulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }

          /* Scan line */
          @keyframes scanLine {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
        `}
        </style>
        {/* ── NAVBAR ── */}
        <nav
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: 'rgba(15,15,20,0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(224,32,32,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 48px',
            gap: '16px',
          }}
        >
          {/* Logo */}
          <Link href="/obsidian" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Geometric W */}
            <svg width="42" height="36" viewBox="0 0 42 36" fill="none">
              <polygon points="2,2 10,34 21,16 32,34 40,2" stroke="#E02020" strokeWidth="3" fill="none" strokeLinejoin="round" />
              <polygon points="6,2 14,26 21,12 28,26 36,2" fill="#E02020" opacity="0.2" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 800,
                  fontSize: '15px',
                  color: '#F0F0F5',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                WIMBLEDON
              </span>
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 500,
                  fontSize: '10px',
                  color: '#7A7A8A',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}
              >
                LIMOUSINES
              </span>
            </div>
          </Link>

          {/* Hex nav row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '-8px' }}>
            {NAV_ITEMS.map((item) => (
              <HexButton
                key={item.href}
                label={item.label}
                href={item.href}
                active={
                  item.href === '/obsidian'
                    ? pathname === '/obsidian'
                    : pathname.startsWith(item.href)
                }
              />
            ))}
          </div>

          <BookHex />
        </nav>

        {/* ── PAGE CONTENT ── */}
        <main style={{ paddingTop: '94px' }}>
          {children}
        </main>

        {/* ── FOOTER ── */}
        <footer
          style={{
            background: '#0A0A0F',
            borderTop: '1px solid rgba(224,32,32,0.25)',
            padding: '56px 80px 32px',
            marginTop: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '40px',
              marginBottom: '48px',
            }}
          >
            {/* Brand */}
            <div style={{ maxWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <svg width="34" height="28" viewBox="0 0 42 36" fill="none">
                  <polygon points="2,2 10,34 21,16 32,34 40,2" stroke="#E02020" strokeWidth="3" fill="none" strokeLinejoin="round" />
                </svg>
                <span style={{ fontWeight: 800, fontSize: '14px', letterSpacing: '0.2em', color: '#F0F0F5' }}>WIMBLEDON LIMOUSINES</span>
              </div>
              <p style={{ fontSize: '14px', color: '#7A7A8A', lineHeight: 1.7 }}>
                London's premier chauffeur service. Arrive with distinction, every time.
              </p>
            </div>

            {/* Links */}
            {[
              { title: 'SERVICES', links: ['Airport Transfers', 'Corporate Travel', 'Wedding Cars', 'Events'] },
              { title: 'COMPANY', links: ['About Us', 'Fleet', 'Testimonials', 'Careers'] },
              { title: 'CONTACT', links: ['+44 20 1234 5678', 'info@wimbledonlimos.co.uk', 'WhatsApp', '24/7 Dispatch'] },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    color: '#E02020',
                    fontWeight: 700,
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                  }}
                >
                  {col.title}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map((l) => (
                    <li key={l}>
                      <span style={{ fontSize: '14px', color: '#7A7A8A', cursor: 'pointer' }}>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(122,122,138,0.2)',
              paddingTop: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <span style={{ fontSize: '12px', color: '#7A7A8A' }}>
              © 2026 Wimbledon Limousines Ltd. All rights reserved.
            </span>
            <span style={{ fontSize: '12px', color: '#7A7A8A' }}>
              Licensed · Insured · SIA Approved
            </span>
          </div>
        </footer>
    </div>
  );
}
