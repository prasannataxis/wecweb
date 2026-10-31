'use client';

import Link from 'next/link';

const SERVICES = [
  {
    icon: '✈',
    title: 'Airport Transfers',
    description:
      'Seamless connections to all London airports — Heathrow, Gatwick, Stansted, Luton & London City. Flight tracking included.',
    detail: 'From £85',
  },
  {
    icon: '◈',
    title: 'Corporate Travel',
    description:
      'Tailored executive transport for directors, C-suite, and client entertaining. Monthly billing available.',
    detail: 'Account rates',
  },
  {
    icon: '♡',
    title: 'Wedding Cars',
    description:
      'Make your special day unforgettable. Ribbon-dressed vehicles, punctual service, and a personal touch.',
    detail: 'Packages from £295',
  },
  {
    icon: '★',
    title: 'VIP & Events',
    description:
      'Premieres, galas, sporting events, concerts. Arrive with presence. Discreet and professional at all times.',
    detail: 'Custom quote',
  },
  {
    icon: '⬡',
    title: 'City Tours',
    description:
      "Private guided tours of London's landmarks in unparalleled comfort. Half-day or full-day options.",
    detail: 'From £250',
  },
  {
    icon: '⚑',
    title: 'Night Out',
    description:
      'Safe, stylish transport for evenings in London. We wait, we return you home — no surge pricing.',
    detail: 'From £75',
  },
];

function ServiceHex({ svc, delay }: { svc: (typeof SERVICES)[0]; delay: number }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: `hexReveal 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '180px',
          height: '156px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        className="svc-hex-cell"
      >
        {/* Scarlet border hex */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#E02020',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            opacity: 0,
            transition: 'opacity 0.25s',
          }}
          className="svc-border"
        />
        {/* Fill hex */}
        <div
          style={{
            position: 'absolute',
            inset: '3px',
            background: '#18181F',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            transition: 'background 0.25s',
          }}
          className="svc-fill"
        />
        {/* Icon */}
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            fontSize: '48px',
            color: '#E02020',
            transition: 'color 0.25s, transform 0.25s',
          }}
          className="svc-icon-el"
        >
          {svc.icon}
        </span>
      </div>

      {/* Label below hex */}
      <div style={{ textAlign: 'center', marginTop: '16px', maxWidth: '160px' }}>
        <div
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            color: '#F0F0F5',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}
        >
          {svc.title}
        </div>
        <div style={{ fontSize: '12px', color: '#E02020', fontWeight: 600, letterSpacing: '0.1em' }}>
          {svc.detail}
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div style={{ background: '#0F0F14', minHeight: '100vh', animation: 'pageEntry 0.6s ease both' }}>
      {/* Header */}
      <section
        style={{
          padding: '64px 80px 56px',
          textAlign: 'center',
          background: 'linear-gradient(to bottom, #18181F, #0F0F14)',
          borderBottom: '1px solid rgba(224,32,32,0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ color: '#E02020' }}>◆</span>
          <span style={{ fontSize: '12px', letterSpacing: '0.28em', color: '#E02020', textTransform: 'uppercase', fontWeight: 700 }}>
            Services
          </span>
          <span style={{ color: '#E02020' }}>◆</span>
        </div>
        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(48px, 6vw, 80px)',
            fontWeight: 700,
            color: '#F0F0F5',
            marginBottom: '16px',
          }}
        >
          Premium{' '}
          <span style={{ color: '#E02020', fontStyle: 'italic' }}>Services</span>
        </h1>
        <p style={{ fontSize: '16px', color: '#7A7A8A', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
          From a single airport run to a bespoke month-long corporate account,
          we shape our service around you.
        </p>
      </section>

      {/* Hex honeycomb — 3×2 */}
      <section
        style={{
          padding: '80px 80px 72px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0',
        }}
      >
        {/* Row 1: items 0,1,2 */}
        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
          {SERVICES.slice(0, 3).map((svc, i) => (
            <ServiceHex key={svc.title} svc={svc} delay={i * 120} />
          ))}
        </div>

        {/* Row 2: items 3,4,5 — offset */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            justifyContent: 'center',
            marginTop: '-42px',
            marginLeft: '110px',
          }}
        >
          {SERVICES.slice(3).map((svc, i) => (
            <ServiceHex key={svc.title} svc={svc} delay={(i + 3) * 120} />
          ))}
        </div>
      </section>

      {/* Service detail cards */}
      <section
        style={{
          padding: '0 80px 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {SERVICES.map((svc, i) => (
          <div
            key={svc.title}
            style={{
              background: '#18181F',
              border: '1px solid rgba(224,32,32,0.15)',
              padding: '32px',
              position: 'relative',
              overflow: 'hidden',
              animation: `hexReveal 0.5s ease ${i * 80}ms both`,
            }}
          >
            {/* Hex accent top-right */}
            <div
              style={{
                position: 'absolute',
                top: '-16px',
                right: '-16px',
                width: '64px',
                height: '55px',
                background: 'rgba(224,32,32,0.12)',
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
              <span style={{ fontSize: '32px', color: '#E02020' }}>{svc.icon}</span>
              <div>
                <h3
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#F0F0F5',
                    letterSpacing: '0.06em',
                    marginBottom: '4px',
                  }}
                >
                  {svc.title}
                </h3>
                <span style={{ fontSize: '12px', color: '#E02020', fontWeight: 600, letterSpacing: '0.1em' }}>
                  {svc.detail}
                </span>
              </div>
            </div>
            <p style={{ fontSize: '15px', color: '#7A7A8A', lineHeight: 1.75 }}>{svc.description}</p>
            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(224,32,32,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '12px', color: '#E02020', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Enquire →
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* CTA band */}
      <section
        style={{
          background: '#E02020',
          padding: '48px 80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '32px',
              fontWeight: 700,
              color: '#F0F0F5',
              marginBottom: '6px',
            }}
          >
            Need a custom service?
          </h3>
          <p style={{ fontSize: '16px', color: 'rgba(240,240,245,0.8)' }}>
            We tailor every journey to your requirements.
          </p>
        </div>
        <Link href="/obsidian/contact" style={{ textDecoration: 'none' }}>
          <div
            style={{
              position: 'relative',
              width: '200px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="svc-cta-btn"
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#F0F0F5',
                clipPath: 'polygon(6% 0%, 94% 0%, 100% 50%, 94% 100%, 6% 100%, 0% 50%)',
                transition: 'background 0.2s',
              }}
              className="svc-cta-fill"
            />
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                fontSize: '12px',
                fontWeight: 700,
                color: '#E02020',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontFamily: 'Montserrat, sans-serif',
                transition: 'color 0.2s',
              }}
              className="svc-cta-label"
            >
              CONTACT US →
            </span>
          </div>
        </Link>
      </section>

      <style>{`
        .svc-hex-cell:hover .svc-border { opacity: 1 !important; animation: hexPulse 1.5s ease-in-out infinite; }
        .svc-hex-cell:hover .svc-fill { background: #E02020 !important; }
        .svc-hex-cell:hover .svc-icon-el { color: #F0F0F5 !important; transform: scale(1.1); }
        .svc-cta-btn:hover .svc-cta-fill { background: #0F0F14 !important; }
        .svc-cta-btn:hover .svc-cta-label { color: #E02020 !important; }
      `}</style>
    </div>
  );
}
