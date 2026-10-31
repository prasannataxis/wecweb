'use client';

import Link from 'next/link';

const STATS = [
  { value: '15+', label: 'Years Experience' },
  { value: '2,400+', label: 'Journeys/Year' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '24/7', label: 'Available' },
];

function StatHex({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        animation: `hexReveal 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '140px',
          height: '121px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Scarlet border hex */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#E02020',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          }}
        />
        {/* Inner dark hex */}
        <div
          style={{
            position: 'absolute',
            inset: '3px',
            background: 'rgba(15,15,20,0.92)',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          }}
        />
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'Playfair Display, serif',
            fontSize: '28px',
            fontWeight: 700,
            color: '#E02020',
            lineHeight: 1,
          }}
        >
          {value}
        </span>
      </div>
      <span
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '12px',
          letterSpacing: '0.15em',
          color: '#7A7A8A',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function ObsidianHero() {
  return (
    <div style={{ background: '#0F0F14' }}>
      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background photo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(160deg, rgba(15,15,20,0.88) 0%, rgba(15,15,20,0.70) 50%, rgba(15,15,20,0.92) 100%)',
          }}
        />

        {/* Hexagonal grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='104' viewBox='0 0 120 104'%3E%3Cpolygon points='30,2 90,2 120,52 90,102 30,102 0,52' fill='none' stroke='%23E02020' stroke-width='0.5' opacity='0.12'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 104px',
            opacity: 0.6,
          }}
        />

        {/* Scan line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(224,32,32,0.4), transparent)',
            animation: 'scanLine 6s linear infinite',
            zIndex: 2,
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            textAlign: 'center',
            padding: '0 24px',
            maxWidth: '900px',
            animation: 'pageEntry 0.8s cubic-bezier(0.22,1,0.36,1) both',
          }}
        >
          {/* Pre-heading */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '24px',
            }}
          >
            <span style={{ color: '#E02020', fontSize: '18px' }}>◆</span>
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                letterSpacing: '0.3em',
                color: '#E02020',
                fontVariant: 'small-caps',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              London's Premier Chauffeur Service
            </span>
            <span style={{ color: '#E02020', fontSize: '18px' }}>◆</span>
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(80px, 8vw, 110px)',
                color: '#F0F0F5',
              }}
            >
              ARRIVE WITH
            </span>
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(80px, 8vw, 110px)',
                color: '#E02020',
                fontStyle: 'italic',
              }}
            >
              DISTINCTION
            </span>
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '18px',
              color: '#7A7A8A',
              letterSpacing: '0.06em',
              marginBottom: '48px',
              lineHeight: 1.6,
            }}
          >
            Premium chauffeur-driven vehicles for every occasion.
            <br />
            Airport transfers, corporate travel, weddings &amp; beyond.
          </p>

          {/* Booking widget — wide flat hexagonal frame */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '780px',
              margin: '0 auto 60px',
            }}
          >
            {/* Hex frame background */}
            <div
              style={{
                position: 'absolute',
                inset: '-3px',
                background: '#E02020',
                clipPath: 'polygon(2% 0%, 98% 0%, 100% 50%, 98% 100%, 2% 100%, 0% 50%)',
              }}
            />
            <div
              style={{
                position: 'relative',
                background: 'rgba(24,24,31,0.97)',
                clipPath: 'polygon(2% 0%, 98% 0%, 100% 50%, 98% 100%, 2% 100%, 0% 50%)',
                padding: '28px 80px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {/* From field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '140px' }}>
                <label
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    color: '#E02020',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  ◆ From
                </label>
                <input
                  placeholder="Pickup location"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(224,32,32,0.4)',
                    color: '#F0F0F5',
                    fontSize: '14px',
                    padding: '6px 0',
                    outline: 'none',
                    fontFamily: 'Montserrat, sans-serif',
                    width: '160px',
                  }}
                />
              </div>

              {/* Arrow */}
              <span style={{ color: '#E02020', fontSize: '20px', marginTop: '20px' }}>→</span>

              {/* To field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '140px' }}>
                <label
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    color: '#E02020',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  ◆ To
                </label>
                <input
                  placeholder="Destination"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(224,32,32,0.4)',
                    color: '#F0F0F5',
                    fontSize: '14px',
                    padding: '6px 0',
                    outline: 'none',
                    fontFamily: 'Montserrat, sans-serif',
                    width: '160px',
                  }}
                />
              </div>

              {/* Date field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '120px' }}>
                <label
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    color: '#E02020',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  ◆ Date
                </label>
                <input
                  type="date"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(224,32,32,0.4)',
                    color: '#F0F0F5',
                    fontSize: '14px',
                    padding: '6px 0',
                    outline: 'none',
                    fontFamily: 'Montserrat, sans-serif',
                    width: '140px',
                    colorScheme: 'dark',
                  }}
                />
              </div>

              {/* CTA hex button */}
              <Link href="/obsidian/contact" style={{ textDecoration: 'none', marginTop: '20px' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '120px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className="cta-hex-btn"
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: '#E02020',
                      clipPath: 'polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)',
                      transition: 'filter 0.2s',
                    }}
                    className="cta-hex-fill"
                  />
                  <span
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#F0F0F5',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    GET QUOTE
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          {STATS.map((s, i) => (
            <StatHex key={s.label} value={s.value} label={s.label} delay={200 + i * 100} />
          ))}
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: 0.5,
          }}
        >
          <span style={{ fontSize: '10px', letterSpacing: '0.25em', color: '#7A7A8A', textTransform: 'uppercase' }}>Scroll</span>
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, #E02020, transparent)',
              animation: 'scanLine 2s linear infinite',
            }}
          />
        </div>
      </section>

      {/* ── INTRO STRIP ── */}
      <section
        style={{
          padding: '80px 80px 60px',
          display: 'flex',
          alignItems: 'center',
          gap: '80px',
          background: '#18181F',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ color: '#E02020' }}>◆</span>
            <span style={{ fontSize: '12px', letterSpacing: '0.25em', color: '#E02020', textTransform: 'uppercase', fontWeight: 600 }}>
              Why Wimbledon Limousines
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 4vw, 54px)',
              fontWeight: 700,
              color: '#F0F0F5',
              lineHeight: 1.15,
              marginBottom: '24px',
            }}
          >
            Excellence in Every
            <br />
            <span style={{ color: '#E02020', fontStyle: 'italic' }}>Detail</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#7A7A8A', lineHeight: 1.8, marginBottom: '32px', maxWidth: '460px' }}>
            From Heathrow to the City, from Wimbledon to Canary Wharf — our fleet of premium vehicles
            and professional chauffeurs deliver a flawless experience, every single journey.
          </p>
          <Link href="/obsidian/fleet" style={{ textDecoration: 'none' }}>
            <div
              style={{
                position: 'relative',
                width: '180px',
                height: '54px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="cta-hex-btn"
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'transparent',
                  border: '2px solid #E02020',
                  clipPath: 'polygon(6% 0%, 94% 0%, 100% 50%, 94% 100%, 6% 100%, 0% 50%)',
                  transition: 'background 0.2s',
                }}
                className="outline-hex"
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
                VIEW FLEET →
              </span>
            </div>
          </Link>
        </div>

        {/* Feature hexagons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', flex: 1, minWidth: '300px', justifyContent: 'center' }}>
          {[
            { icon: '✈', title: 'Flight Tracking', desc: 'Real-time monitoring' },
            { icon: '⚑', title: 'Meet & Greet', desc: 'Personal welcome' },
            { icon: '◈', title: 'Fixed Rates', desc: 'No hidden charges' },
            { icon: '⬡', title: 'Vetted Drivers', desc: 'DBS checked' },
          ].map((f, i) => (
            <div
              key={f.title}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                animation: `hexReveal 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms both`,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100px',
                  height: '87px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#0F0F14',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: '2px',
                    background: '#18181F',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  }}
                />
                <span style={{ position: 'relative', zIndex: 1, fontSize: '26px', color: '#E02020' }}>{f.icon}</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#F0F0F5', letterSpacing: '0.05em' }}>{f.title}</div>
                <div style={{ fontSize: '12px', color: '#7A7A8A', marginTop: '2px' }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES TEASER ── */}
      <section style={{ padding: '80px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ color: '#E02020' }}>◆</span>
            <span style={{ fontSize: '12px', letterSpacing: '0.25em', color: '#E02020', textTransform: 'uppercase', fontWeight: 600 }}>
              Our Services
            </span>
            <span style={{ color: '#E02020' }}>◆</span>
          </span>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(48px, 5vw, 64px)',
              color: '#F0F0F5',
              fontWeight: 700,
            }}
          >
            Every Journey, <span style={{ color: '#E02020', fontStyle: 'italic' }}>Perfected</span>
          </h2>
        </div>

        {/* Service hex grid — 3 across */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0px',
          }}
        >
          {[
            { icon: '✈', label: 'Airport\nTransfers' },
            { icon: '◈', label: 'Corporate\nTravel' },
            { icon: '♡', label: 'Wedding\nCars' },
            { icon: '★', label: 'VIP\nEvents' },
            { icon: '⬡', label: 'City\nTours' },
            { icon: '⚑', label: 'Night\nOut' },
          ].map((svc, i) => (
            <div
              key={svc.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: i % 2 === 0 ? '0 16px 32px' : '40px 16px 0',
                animation: `hexReveal 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms both`,
              }}
              className="service-hex-wrap"
            >
              <div
                style={{
                  position: 'relative',
                  width: '160px',
                  height: '139px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                }}
                className="service-hex"
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#E02020',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    opacity: 0,
                    transition: 'opacity 0.25s',
                  }}
                  className="svc-hover-bg"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: '3px',
                    background: '#18181F',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    transition: 'background 0.25s',
                  }}
                  className="svc-inner"
                />
                <span style={{ position: 'relative', zIndex: 1, fontSize: '40px', color: '#E02020', transition: 'color 0.25s' }} className="svc-icon">
                  {svc.icon}
                </span>
              </div>
              <span
                style={{
                  marginTop: '14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#F0F0F5',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.4,
                }}
              >
                {svc.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/obsidian/services" style={{ textDecoration: 'none' }}>
            <span
              style={{
                fontSize: '13px',
                letterSpacing: '0.2em',
                color: '#E02020',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(224,32,32,0.4)',
                paddingBottom: '2px',
              }}
            >
              ALL SERVICES →
            </span>
          </Link>
        </div>
      </section>

      <style>{`
        .cta-hex-btn:hover .cta-hex-fill { filter: brightness(1.18); }
        .service-hex:hover { transform: rotate(8deg) scale(1.04); }
        .service-hex:hover .svc-hover-bg { opacity: 1 !important; }
        .service-hex:hover .svc-inner { background: transparent !important; }
        .service-hex:hover .svc-icon { color: #F0F0F5 !important; }
      `}</style>
    </div>
  );
}
