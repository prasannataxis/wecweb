'use client'

import { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────
   CHAPTER META
───────────────────────────────────────────── */
const CHAPTERS = [
  { id: 'arrival',  label: 'Chapter I',   title: 'Arrival' },
  { id: 'fleet',    label: 'Chapter II',  title: 'Fleet' },
  { id: 'services', label: 'Chapter III', title: 'Services' },
  { id: 'events',   label: 'Chapter IV',  title: 'Events' },
  { id: 'about',    label: 'Chapter V',   title: 'About' },
  { id: 'contact',  label: 'Chapter VI',  title: 'Contact' },
]

/* ─────────────────────────────────────────────
   GLOBAL KEYFRAME CSS (injected once)
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @keyframes amberGlow {
    0%, 100% { opacity: 0.55; }
    50%       { opacity: 0.70; }
  }
  @keyframes warmShimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes chapterFadeIn {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes dotPop {
    0%   { transform: scale(1);   }
    50%  { transform: scale(1.6); }
    100% { transform: scale(1.5); }
  }
  @keyframes scrollBounce {
    0%, 100% { transform: translateY(0);   opacity: 0.9; }
    50%       { transform: translateY(8px); opacity: 0.4; }
  }
  @keyframes navFade {
    from { opacity: 1; }
    to   { opacity: 0.28; }
  }

  .chapter-content.is-visible {
    animation: chapterFadeIn 0.9s ease forwards;
  }

  .shimmer-heading {
    background: linear-gradient(
      90deg,
      #FFF8E8 0%,
      #F4B84A 40%,
      #E8921A 55%,
      #F4B84A 70%,
      #FFF8E8 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: warmShimmer 5s linear infinite;
  }

  .chapter-bg-overlay {
    animation: amberGlow 6s ease-in-out infinite;
  }

  .dot-nav-item {
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .scroll-arrow {
    animation: scrollBounce 1.6s ease-in-out infinite;
  }

  .chapter-section {
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
  }

  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 60px rgba(232,146,26,0.25);
  }

  html {
    scroll-behavior: smooth;
  }
`

/* ─────────────────────────────────────────────
   INLINE STYLE HELPERS
───────────────────────────────────────────── */
function chapterBg(url: string, overlay = 'rgba(15,8,0,0.55)'): React.CSSProperties {
  return {
    backgroundImage: `url(${url})`,
  }
}

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function AmberPage() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [navScrolled, setNavScrolled]     = useState(false)
  const [navHovered, setNavHovered]       = useState(false)
  const [visibleSet, setVisibleSet]       = useState<Set<number>>(new Set())

  const chapterRefs = useRef<(HTMLElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  /* Intersection observer — active chapter for dot nav */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-chapter-idx'))
          if (entry.isIntersecting) {
            setActiveChapter(idx)
          }
        })
      },
      { threshold: 0.45 }
    )
    chapterRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  /* Intersection observer — fade-in content */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-content-idx'))
          if (entry.isIntersecting) {
            setVisibleSet((prev) => { const next = new Set(prev); next.add(idx); return next; })
          }
        })
      },
      { threshold: 0.15 }
    )
    contentRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  /* Nav fade on scroll */
  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function scrollTo(idx: number) {
    chapterRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' })
  }

  function setChapterRef(idx: number) {
    return (el: HTMLElement | null) => {
      chapterRefs.current[idx] = el
    }
  }
  function setContentRef(idx: number) {
    return (el: HTMLDivElement | null) => {
      contentRefs.current[idx] = el
    }
  }

  const contentVisible = (idx: number) =>
    visibleSet.has(idx) ? 'chapter-content is-visible' : 'chapter-content'

  /* ── NAV opacity logic */
  const navOpacity = navHovered ? 1 : navScrolled ? 0.3 : 1

  /* ── Shared text styles */
  const fontPlayfair: React.CSSProperties  = { fontFamily: 'var(--font-playfair, Georgia, serif)' }
  const fontMontserrat: React.CSSProperties = { fontFamily: 'var(--font-montserrat, system-ui, sans-serif)' }

  return (
    <>
      {/* Inject global CSS */}
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* ── TOP NAV ─────────────────────────────── */}
      <header
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          background: 'rgba(16,8,0,0.72)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(232,146,26,0.15)',
          zIndex: 1000,
          opacity: navOpacity,
          transition: 'opacity 0.5s ease',
        }}
      >
        <span
          style={{
            ...fontPlayfair,
            fontSize: 17,
            letterSpacing: '0.12em',
            color: '#F4B84A',
            fontWeight: 700,
            fontStyle: 'italic',
          }}
        >
          Wimbledon Limousines
        </span>

        <button
          onClick={() => scrollTo(5)}
          style={{
            ...fontMontserrat,
            background: '#E8921A',
            color: '#100800',
            border: 'none',
            borderRadius: 2,
            padding: '6px 20px',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Book Now
        </button>
      </header>

      {/* ── DOT NAV ─────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          zIndex: 999,
        }}
        aria-label="Chapter navigation"
      >
        {CHAPTERS.map((ch, i) => (
          <button
            key={ch.id}
            className="dot-nav-item"
            onClick={() => scrollTo(i)}
            title={ch.title}
            aria-label={`Go to ${ch.title}`}
            style={{
              width:  i === activeChapter ? 14 : 8,
              height: i === activeChapter ? 14 : 8,
              borderRadius: '50%',
              border: 'none',
              background: i === activeChapter ? '#E8921A' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              padding: 0,
              boxShadow: i === activeChapter ? '0 0 10px rgba(232,146,26,0.7)' : 'none',
              animation: i === activeChapter ? 'dotPop 0.35s ease forwards' : 'none',
            }}
          />
        ))}
      </nav>

      {/* ════════════════════════════════════════════
          CHAPTER 1 — ARRIVAL
      ════════════════════════════════════════════ */}
      <section
        ref={setChapterRef(0)}
        data-chapter-idx="0"
        className="chapter-section"
        style={{
          ...chapterBg('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1920&q=80'),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Dark overlay */}
        <div
          className="chapter-bg-overlay"
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(15,8,0,0.55)',
            pointerEvents: 'none',
          }}
        />

        <div
          ref={setContentRef(0)}
          data-content-idx="0"
          className={contentVisible(0)}
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 24px',
            maxWidth: 900,
            opacity: 0,
          }}
        >
          {/* Chapter label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <span style={{ width: 48, height: 1, background: '#E8921A', display: 'block' }} />
            <span style={{
              ...fontMontserrat,
              color: '#E8921A',
              fontSize: 13,
              letterSpacing: '0.25em',
              fontVariant: 'small-caps',
              fontWeight: 500,
            }}>Chapter I</span>
            <span style={{ width: 48, height: 1, background: '#E8921A', display: 'block' }} />
          </div>

          <h1
            className="shimmer-heading"
            style={{
              ...fontPlayfair,
              fontSize: 'clamp(72px, 8vw, 110px)',
              fontWeight: 900,
              fontStyle: 'italic',
              lineHeight: 1.0,
              margin: '0 0 24px',
            }}
          >
            Arrive With<br />Distinction
          </h1>

          <p style={{
            ...fontMontserrat,
            fontSize: 18,
            color: 'rgba(255,248,232,0.78)',
            maxWidth: 560,
            lineHeight: 1.7,
            margin: '0 0 48px',
            fontWeight: 300,
          }}>
            London&rsquo;s finest chauffeur service — crafting bespoke journeys
            for those who expect nothing less than excellence.
          </p>

          {/* CTA */}
          <button
            onClick={() => scrollTo(5)}
            style={{
              ...fontMontserrat,
              background: 'transparent',
              color: '#F4B84A',
              border: '1px solid #E8921A',
              padding: '14px 42px',
              fontSize: 14,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginBottom: 64,
              transition: 'background 0.25s, color 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E8921A'
              e.currentTarget.style.color = '#100800'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#F4B84A'
            }}
          >
            Reserve Your Journey
          </button>

          {/* Scroll indicator */}
          <div
            className="scroll-arrow"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
            onClick={() => scrollTo(1)}
          >
            <span style={{ ...fontMontserrat, fontSize: 11, color: 'rgba(255,248,232,0.5)', letterSpacing: '0.2em' }}>
              SCROLL TO EXPLORE
            </span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2v14M4 12l6 6 6-6" stroke="#E8921A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CHAPTER 2 — THE FLEET
      ════════════════════════════════════════════ */}
      <section
        ref={setChapterRef(1)}
        data-chapter-idx="1"
        className="chapter-section"
        style={{
          ...chapterBg('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=80'),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
        }}
      >
        <div
          className="chapter-bg-overlay"
          style={{ position: 'absolute', inset: 0, background: 'rgba(20,10,0,0.70)', pointerEvents: 'none' }}
        />

        <div
          ref={setContentRef(1)}
          data-content-idx="1"
          className={contentVisible(1)}
          style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1100, opacity: 0 }}
        >
          {/* Chapter label */}
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <ChapterLabel label="Chapter II — The Fleet" />
          </div>

          <h2 style={{
            ...fontPlayfair,
            textAlign: 'center',
            fontSize: 'clamp(48px, 6vw, 80px)',
            color: '#FFF8E8',
            fontWeight: 700,
            margin: '0 0 56px',
          }}>
            Our Vehicles
          </h2>

          {/* 3 fleet cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 28,
          }}>
            {FLEET.map((car) => (
              <FleetCard key={car.name} car={car} fontPlayfair={fontPlayfair} fontMontserrat={fontMontserrat} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CHAPTER 3 — SERVICES (solid bg)
      ════════════════════════════════════════════ */}
      <section
        ref={setChapterRef(2)}
        data-chapter-idx="2"
        style={{
          minHeight: '100vh',
          background: '#100800',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          position: 'relative',
        }}
      >
        <div
          ref={setContentRef(2)}
          data-content-idx="2"
          className={contentVisible(2)}
          style={{ width: '100%', maxWidth: 900, opacity: 0 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <ChapterLabel label="Chapter III — Services" />
          </div>

          <h2 style={{
            ...fontPlayfair,
            textAlign: 'center',
            fontSize: 'clamp(48px, 6vw, 80px)',
            color: '#FFF8E8',
            fontWeight: 700,
            margin: '0 0 64px',
          }}>
            What We Offer
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {SERVICES.map((svc, i) => (
              <div
                key={svc.name}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 36,
                  padding: '36px 0',
                  borderBottom: i < SERVICES.length - 1 ? '1px solid rgba(232,146,26,0.18)' : 'none',
                }}
              >
                <span style={{
                  ...fontPlayfair,
                  fontSize: 48,
                  fontWeight: 900,
                  color: 'rgba(232,146,26,0.25)',
                  lineHeight: 1,
                  minWidth: 64,
                  fontStyle: 'italic',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 style={{
                    ...fontPlayfair,
                    fontSize: 40,
                    color: '#F4B84A',
                    fontWeight: 700,
                    margin: '0 0 10px',
                    lineHeight: 1.1,
                  }}>
                    {svc.name}
                  </h3>
                  <p style={{
                    ...fontMontserrat,
                    fontSize: 18,
                    color: 'rgba(255,248,232,0.65)',
                    margin: 0,
                    lineHeight: 1.65,
                    fontWeight: 300,
                  }}>
                    {svc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CHAPTER 4 — EVENTS
      ════════════════════════════════════════════ */}
      <section
        ref={setChapterRef(3)}
        data-chapter-idx="3"
        className="chapter-section"
        style={{
          ...chapterBg('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80'),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
        }}
      >
        <div
          className="chapter-bg-overlay"
          style={{ position: 'absolute', inset: 0, background: 'rgba(10,5,0,0.65)', pointerEvents: 'none' }}
        />

        <div
          ref={setContentRef(3)}
          data-content-idx="3"
          className={contentVisible(3)}
          style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1100, opacity: 0 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <ChapterLabel label="Chapter IV — London Events" />
          </div>

          <h2 style={{
            ...fontPlayfair,
            textAlign: 'center',
            fontSize: 'clamp(48px, 6vw, 80px)',
            color: '#FFF8E8',
            fontWeight: 700,
            margin: '0 0 56px',
          }}>
            Every Occasion
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 28,
          }}>
            {EVENTS.map((ev) => (
              <div
                key={ev.name}
                className="card-hover"
                style={{
                  background: 'rgba(16,8,0,0.82)',
                  border: '1px solid rgba(232,146,26,0.3)',
                  borderRadius: 4,
                  padding: '36px 32px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{ev.icon}</div>
                <h3 style={{
                  ...fontPlayfair,
                  fontSize: 28,
                  color: '#F4B84A',
                  fontWeight: 700,
                  margin: '0 0 12px',
                }}>
                  {ev.name}
                </h3>
                <p style={{
                  ...fontMontserrat,
                  fontSize: 16,
                  color: 'rgba(255,248,232,0.65)',
                  margin: 0,
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}>
                  {ev.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CHAPTER 5 — WHY CHOOSE US (solid)
      ════════════════════════════════════════════ */}
      <section
        ref={setChapterRef(4)}
        data-chapter-idx="4"
        style={{
          minHeight: '100vh',
          background: '#0D0700',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          position: 'relative',
        }}
      >
        <div
          ref={setContentRef(4)}
          data-content-idx="4"
          className={contentVisible(4)}
          style={{ width: '100%', maxWidth: 1000, opacity: 0 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <ChapterLabel label="Chapter V — Our Promise" />
          </div>

          <h2 style={{
            ...fontPlayfair,
            textAlign: 'center',
            fontSize: 'clamp(48px, 6vw, 72px)',
            color: '#FFF8E8',
            fontWeight: 700,
            margin: '0 0 72px',
          }}>
            Why Choose Us
          </h2>

          {/* Giant stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 0,
            borderTop: '1px solid rgba(232,146,26,0.2)',
            marginBottom: 80,
          }}>
            {STATS.map((st, i) => (
              <div
                key={st.label}
                style={{
                  textAlign: 'center',
                  padding: '48px 24px',
                  borderRight: i < STATS.length - 1 ? '1px solid rgba(232,146,26,0.2)' : 'none',
                  borderBottom: '1px solid rgba(232,146,26,0.2)',
                }}
              >
                <div style={{
                  ...fontPlayfair,
                  fontSize: 'clamp(80px, 10vw, 130px)',
                  fontWeight: 900,
                  color: '#E8921A',
                  lineHeight: 1,
                  fontStyle: 'italic',
                }}>
                  {st.value}
                </div>
                <div style={{
                  ...fontMontserrat,
                  fontSize: 13,
                  color: '#9A8060',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginTop: 10,
                  fontWeight: 500,
                }}>
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                style={{
                  background: 'rgba(28,16,0,0.7)',
                  border: '1px solid rgba(232,146,26,0.2)',
                  borderRadius: 4,
                  padding: '36px 32px',
                }}
              >
                <p style={{
                  ...fontPlayfair,
                  fontSize: 18,
                  color: 'rgba(255,248,232,0.82)',
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                  margin: '0 0 20px',
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <span style={{ color: '#E8921A', fontSize: 14 }}>★★★★★</span>
                  <span style={{ ...fontMontserrat, fontSize: 13, color: '#9A8060', fontWeight: 500, letterSpacing: '0.08em' }}>
                    — {t.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CHAPTER 6 — CONTACT
      ════════════════════════════════════════════ */}
      <section
        ref={setChapterRef(5)}
        data-chapter-idx="5"
        className="chapter-section"
        style={{
          ...chapterBg('https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1920&q=80'),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px 0',
        }}
      >
        <div
          className="chapter-bg-overlay"
          style={{ position: 'absolute', inset: 0, background: 'rgba(8,4,0,0.75)', pointerEvents: 'none' }}
        />

        <div
          ref={setContentRef(5)}
          data-content-idx="5"
          className={contentVisible(5)}
          style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 860, opacity: 0 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <ChapterLabel label="Chapter VI — Reach Us" />
          </div>

          <h2 style={{
            ...fontPlayfair,
            textAlign: 'center',
            fontSize: 'clamp(48px, 5vw, 72px)',
            color: '#FFF8E8',
            fontWeight: 700,
            margin: '0 0 8px',
          }}>
            Begin Your Journey
          </h2>

          {/* Large phone */}
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <a
              href="tel:+442012345678"
              style={{
                ...fontPlayfair,
                fontSize: 'clamp(48px, 5vw, 72px)',
                color: '#E8921A',
                textDecoration: 'none',
                fontWeight: 700,
                fontStyle: 'italic',
              }}
            >
              +44 20 1234 5678
            </a>
            <p style={{
              ...fontMontserrat,
              fontSize: 13,
              color: '#9A8060',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginTop: 8,
            }}>
              Available 24 hours · 7 days a week
            </p>
          </div>

          {/* Contact form */}
          <ContactForm fontMontserrat={fontMontserrat} />

          {/* Footer */}
          <footer style={{
            marginTop: 72,
            paddingBottom: 32,
            borderTop: '1px solid rgba(232,146,26,0.15)',
            paddingTop: 28,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}>
            <span style={{ ...fontMontserrat, fontSize: 13, color: 'rgba(154,128,96,0.7)' }}>
              © 2026 Wimbledon Limousines Ltd. All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: 28 }}>
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    ...fontMontserrat,
                    fontSize: 12,
                    color: '#9A8060',
                    textDecoration: 'none',
                    letterSpacing: '0.08em',
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </footer>
        </div>
      </section>
    </>
  )
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

function ChapterLabel({ label }: { label: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
      <span style={{ width: 40, height: 1, background: '#E8921A', display: 'block' }} />
      <span
        style={{
          fontFamily: 'var(--font-montserrat, system-ui, sans-serif)',
          color: '#E8921A',
          fontSize: 12,
          letterSpacing: '0.28em',
          fontVariant: 'small-caps',
          fontWeight: 500,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <span style={{ width: 40, height: 1, background: '#E8921A', display: 'block' }} />
    </div>
  )
}

interface Car {
  name: string
  subtitle: string
  specs: string[]
  img: string
}

function FleetCard({
  car,
  fontPlayfair,
  fontMontserrat,
}: {
  car: Car
  fontPlayfair: React.CSSProperties
  fontMontserrat: React.CSSProperties
}) {
  return (
    <div
      className="card-hover"
      style={{
        background: '#1C1000',
        border: '1px solid rgba(232,146,26,0.35)',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: 200,
          backgroundImage: `url(${car.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div style={{ padding: '24px 24px 28px' }}>
        <h3 style={{ ...fontPlayfair, fontSize: 22, color: '#FFF8E8', fontWeight: 700, margin: '0 0 6px' }}>
          {car.name}
        </h3>
        <p style={{ ...fontMontserrat, fontSize: 13, color: '#9A8060', margin: '0 0 16px', letterSpacing: '0.08em' }}>
          {car.subtitle}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {car.specs.map((s) => (
            <li
              key={s}
              style={{ ...fontMontserrat, fontSize: 13, color: 'rgba(255,248,232,0.6)', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span style={{ color: '#E8921A', fontSize: 10 }}>◆</span>
              {s}
            </li>
          ))}
        </ul>
        <button
          style={{
            ...fontMontserrat,
            background: 'transparent',
            color: '#E8921A',
            border: '1px solid rgba(232,146,26,0.5)',
            padding: '10px 24px',
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Enquire About This Vehicle
        </button>
      </div>
    </div>
  )
}

function ContactForm({ fontMontserrat }: { fontMontserrat: React.CSSProperties }) {
  const inputStyle: React.CSSProperties = {
    ...fontMontserrat,
    width: '100%',
    background: 'rgba(28,16,0,0.6)',
    border: '1px solid rgba(232,146,26,0.3)',
    borderRadius: 2,
    padding: '14px 16px',
    fontSize: 15,
    color: '#FFF8E8',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <input
          type="text"
          placeholder="Your Name"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = '#E8921A')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(232,146,26,0.3)')}
        />
        <input
          type="email"
          placeholder="Email Address"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = '#E8921A')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(232,146,26,0.3)')}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <input
          type="tel"
          placeholder="Phone Number"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = '#E8921A')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(232,146,26,0.3)')}
        />
        <input
          type="text"
          placeholder="Date & Time of Journey"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = '#E8921A')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(232,146,26,0.3)')}
        />
      </div>
      <textarea
        placeholder="Journey details, special requests..."
        rows={4}
        style={{
          ...inputStyle,
          resize: 'vertical',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#E8921A')}
        onBlur={(e) => (e.target.style.borderColor = 'rgba(232,146,26,0.3)')}
      />
      <button
        type="submit"
        style={{
          ...fontMontserrat,
          background: '#E8921A',
          color: '#100800',
          border: 'none',
          padding: '16px',
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#F4B84A')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#E8921A')}
      >
        Request a Booking
      </button>
    </form>
  )
}

/* ─────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────── */

const FLEET: Car[] = [
  {
    name: 'Mercedes S-Class',
    subtitle: 'Executive Saloon',
    specs: ['Up to 3 passengers', 'Full leather interior', 'Climate control', 'Wi-Fi & refreshments'],
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Range Rover Autobiography',
    subtitle: 'Luxury SUV',
    specs: ['Up to 4 passengers', 'Panoramic sunroof', 'Massage seating', 'Bespoke bar setup'],
    img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Mercedes V-Class',
    subtitle: 'Executive MPV',
    specs: ['Up to 7 passengers', 'Conference seating', 'Privacy glass', 'On-board entertainment'],
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
  },
]

const SERVICES = [
  {
    name: 'Airport Transfers',
    desc: 'Seamless collection from all London airports. Meet & greet, real-time flight tracking, and patient waiting at no extra charge.',
  },
  {
    name: 'Corporate Travel',
    desc: 'Discreet, punctual service for executives. Account billing, regular booking management, and dedicated account teams.',
  },
  {
    name: 'Special Events',
    desc: 'Weddings, theatre nights, sporting events and galas. Arrive in style and leave every detail in our hands.',
  },
]

const EVENTS = [
  {
    icon: '🎾',
    name: 'Wimbledon',
    desc: 'The tournament\'s preferred chauffeur partner for over a decade. Enjoy seamless transfers to and from the grounds.',
  },
  {
    icon: '🎭',
    name: 'West End Theatre',
    desc: 'Pre-theatre dining routes and post-show returns. Make the entire evening an experience worth remembering.',
  },
  {
    icon: '🏇',
    name: 'Royal Ascot',
    desc: 'Arrive at the royal enclosure in the manner the occasion demands. Tailored itineraries for race day perfection.',
  },
]

const STATS = [
  { value: '15', label: 'Years of Excellence' },
  { value: '5K+', label: 'Journeys Completed' },
  { value: '5★', label: 'Customer Rating' },
]

const TESTIMONIALS = [
  {
    quote: 'Impeccable service from start to finish. The driver was professional, the vehicle immaculate, and the journey utterly stress-free.',
    author: 'James R., Mayfair',
  },
  {
    quote: 'We use Wimbledon Limousines for all our executive travel. Consistent, reliable, and always a cut above every other service we have tried.',
    author: 'Sarah T., City of London',
  },
]
