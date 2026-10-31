'use client';

import Link from 'next/link';

const WHY_US = [
  { number: '01', title: 'Professional Chauffeurs', desc: 'Every driver is DBS-checked, fully licensed, and trained in executive conduct.' },
  { number: '02', title: 'Immaculate Vehicles', desc: 'Hand-washed and detailed before every journey. Never a dull chrome.' },
  { number: '03', title: 'On-Time Guarantee', desc: 'We track your flight, monitor your route, and are always there waiting.' },
  { number: '04', title: 'Fixed Pricing', desc: 'No surge pricing, no hidden fees. The quote you receive is the price you pay.' },
  { number: '05', title: 'Discreet Service', desc: 'Client confidentiality is paramount. Many of our clients are public figures.' },
  { number: '06', title: '24/7 Dispatch', desc: 'Our operations team is always available, day or night, 365 days a year.' },
];

const TESTIMONIALS = [
  {
    name: 'James Hargreaves',
    role: 'Managing Director, Hargreaves Capital',
    quote:
      'Wimbledon Limousines has been our corporate transfer partner for six years. The level of professionalism is simply unmatched in London.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Event Director',
    quote:
      'We used WL for a 200-person gala — 28 vehicles coordinated flawlessly. Every guest arrived on time, every car was pristine.',
    rating: 5,
  },
  {
    name: 'Oliver & Charlotte Webb',
    role: 'Wedding Clients',
    quote:
      'Our wedding convoy was perfect. The ribbon-dressed S-Classes were exactly what we envisioned. The drivers were calm, kind, and punctual.',
    rating: 5,
  },
];

function WhyHex({ item, delay }: { item: (typeof WHY_US)[0]; delay: number }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: `hexReveal 0.5s ease ${delay}ms both`,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '160px',
          height: '139px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default',
        }}
        className="why-hex"
      >
        {/* Outer border */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#E02020',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            opacity: 0.25,
            transition: 'opacity 0.3s',
          }}
          className="why-border"
        />
        {/* Inner */}
        <div
          style={{
            position: 'absolute',
            inset: '3px',
            background: '#18181F',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            transition: 'background 0.3s',
          }}
          className="why-inner"
        />
        {/* Large number */}
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'Playfair Display, serif',
            fontSize: '48px',
            fontWeight: 700,
            color: '#F0F0F5',
            transition: 'color 0.3s',
          }}
          className="why-number"
        >
          {item.number}
        </span>
      </div>
      {/* Text below */}
      <div style={{ textAlign: 'center', marginTop: '16px', maxWidth: '160px' }}>
        <div
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '13px',
            fontWeight: 700,
            color: '#F0F0F5',
            letterSpacing: '0.06em',
            marginBottom: '6px',
          }}
        >
          {item.title}
        </div>
        <div style={{ fontSize: '12px', color: '#7A7A8A', lineHeight: 1.6 }}>{item.desc}</div>
      </div>
    </div>
  );
}

function TestimonialCard({ t, i }: { t: (typeof TESTIMONIALS)[0]; i: number }) {
  return (
    <div
      style={{
        background: '#18181F',
        border: '1px solid rgba(224,32,32,0.15)',
        padding: '36px 32px',
        position: 'relative',
        overflow: 'hidden',
        animation: `hexReveal 0.5s ease ${i * 150}ms both`,
      }}
    >
      {/* Large hex decoration */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '120px',
          height: '104px',
          background: 'rgba(224,32,32,0.06)',
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '-20px',
          width: '80px',
          height: '69px',
          background: 'rgba(224,32,32,0.04)',
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        }}
      />

      {/* Stars */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
        {Array.from({ length: t.rating }).map((_, si) => (
          <span key={si} style={{ color: '#E02020', fontSize: '16px' }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <blockquote
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '17px',
          fontStyle: 'italic',
          color: '#F0F0F5',
          lineHeight: 1.75,
          marginBottom: '24px',
          position: 'relative',
        }}
      >
        <span style={{ color: '#E02020', fontSize: '48px', lineHeight: 0.5, verticalAlign: 'sub', fontFamily: 'serif' }}>"</span>
        {t.quote}
      </blockquote>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
        {/* Mini hex avatar */}
        <div
          style={{
            width: '40px',
            height: '35px',
            background: '#E02020',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#F0F0F5', fontWeight: 700, fontSize: '14px' }}>
            {t.name[0]}
          </span>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#F0F0F5' }}>{t.name}</div>
          <div style={{ fontSize: '12px', color: '#7A7A8A', marginTop: '2px' }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
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
            About Us
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
          A Legacy of{' '}
          <span style={{ color: '#E02020', fontStyle: 'italic' }}>Excellence</span>
        </h1>
        <p style={{ fontSize: '16px', color: '#7A7A8A', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
          Founded in Wimbledon over fifteen years ago, we have grown into one of London's
          most trusted luxury chauffeur companies — built on punctuality, discretion, and care.
        </p>
      </section>

      {/* Story section */}
      <section
        style={{
          padding: '80px 80px 72px',
          display: 'flex',
          gap: '80px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* Big hex composition */}
        <div style={{ position: 'relative', width: '340px', height: '320px', flexShrink: 0 }}>
          {/* Back large hex */}
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '30px',
              width: '280px',
              height: '243px',
              background: 'rgba(224,32,32,0.08)',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              animation: 'hexPulse 4s ease-in-out infinite',
            }}
          />
          {/* Front large hex */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '280px',
              height: '243px',
              background: '#E02020',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '3px',
                background: '#18181F',
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '64px',
                  fontWeight: 700,
                  color: '#E02020',
                  lineHeight: 1,
                }}
              >
                15
              </span>
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  color: '#7A7A8A',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Years of Service
              </span>
            </div>
          </div>

          {/* Small hex accent */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              width: '80px',
              height: '69px',
              background: '#E02020',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#F0F0F5', fontSize: '24px' }}>◈</span>
          </div>
        </div>

        {/* Story text */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 700,
              color: '#F0F0F5',
              marginBottom: '20px',
              lineHeight: 1.15,
            }}
          >
            Our Story
          </h2>
          <p style={{ fontSize: '16px', color: '#7A7A8A', lineHeight: 1.85, marginBottom: '20px' }}>
            What began as a single S-Class and a commitment to punctuality has grown into a fleet
            of fifteen premium vehicles serving London's most discerning clients. We've driven
            CEOs, celebrities, diplomats, and countless families celebrating life's most important moments.
          </p>
          <p style={{ fontSize: '16px', color: '#7A7A8A', lineHeight: 1.85 }}>
            Our approach has never changed: we treat every journey — whether a 10-minute hop
            to Wimbledon Village or a cross-country transfer — with the same meticulous attention
            that earned us a 4.9-star reputation.
          </p>
        </div>
      </section>

      {/* Why Choose Us — hex grid */}
      <section
        style={{
          padding: '0 80px 80px',
          background: '#18181F',
          paddingTop: '72px',
          paddingBottom: '80px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(48px, 5vw, 64px)',
              fontWeight: 700,
              color: '#F0F0F5',
            }}
          >
            Why Choose <span style={{ color: '#E02020', fontStyle: 'italic' }}>Us</span>
          </h2>
        </div>

        {/* Row 1: 3 hexes */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '0' }}>
          {WHY_US.slice(0, 3).map((item, i) => (
            <WhyHex key={item.number} item={item} delay={i * 100} />
          ))}
        </div>

        {/* Row 2: 3 hexes offset */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginTop: '-40px',
            marginLeft: '100px',
          }}
        >
          {WHY_US.slice(3).map((item, i) => (
            <WhyHex key={item.number} item={item} delay={(i + 3) * 100} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ color: '#E02020' }}>◆</span>
            <span style={{ fontSize: '12px', letterSpacing: '0.25em', color: '#E02020', textTransform: 'uppercase', fontWeight: 700 }}>
              Testimonials
            </span>
            <span style={{ color: '#E02020' }}>◆</span>
          </div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(48px, 5vw, 64px)',
              fontWeight: 700,
              color: '#F0F0F5',
            }}
          >
            What Our Clients <span style={{ color: '#E02020', fontStyle: 'italic' }}>Say</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} i={i} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/obsidian/contact" style={{ textDecoration: 'none' }}>
            <div
              style={{
                position: 'relative',
                width: '220px',
                height: '54px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
              }}
              className="about-cta-btn"
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#E02020',
                  clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)',
                  transition: 'filter 0.2s',
                }}
                className="about-cta-fill"
              />
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#F0F0F5',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                BOOK YOUR JOURNEY →
              </span>
            </div>
          </Link>
        </div>
      </section>

      <style>{`
        .why-hex:hover .why-border { opacity: 1 !important; }
        .why-hex:hover .why-inner { background: #E02020 !important; }
        .why-hex:hover .why-number { color: #F0F0F5 !important; }
        .about-cta-btn:hover .about-cta-fill { filter: brightness(1.18); }
      `}</style>
    </div>
  );
}
