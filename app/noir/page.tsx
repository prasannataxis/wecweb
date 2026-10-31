"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   WIMBLEDON LIMOUSINES — NOIR HERO PAGE
   Route: /noir  (full-screen hero + booking widget + stats)
───────────────────────────────────────────────────────────────────────────── */

const HERO_STYLES = `
  @property --ba {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  @keyframes neonPulse {
    0%, 100% {
      box-shadow: 0 0 4px rgba(0,212,255,0.4), 0 0 12px rgba(0,212,255,0.25), 0 0 28px rgba(0,212,255,0.12);
    }
    50% {
      box-shadow: 0 0 8px rgba(0,212,255,0.8), 0 0 24px rgba(0,212,255,0.5), 0 0 56px rgba(0,212,255,0.25);
    }
  }

  @keyframes borderRun {
    to { --ba: 360deg; }
  }

  @keyframes electricSweep {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  @keyframes gridDrift {
    from { background-position: 0 0; }
    to   { background-position: 50px 50px; }
  }

  @keyframes dotPulse {
    0%, 100% { opacity: 1;   transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.7); }
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,212,255,0.028) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.028) 1px, transparent 1px);
    background-size: 52px 52px;
    animation: gridDrift 8s linear infinite;
    pointer-events: none;
  }

  .hero-radial {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 65% 60% at 72% 50%, rgba(0,80,160,0.38) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-radial-purple {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 40% 45% at 18% 70%, rgba(139,92,246,0.13) 0%, transparent 65%);
    pointer-events: none;
  }

  .headline-white {
    font-size: clamp(80px, 9.5vw, 130px);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.02em;
    color: #ffffff;
    font-family: var(--font-playfair), serif;
    display: block;
  }

  .headline-sweep {
    font-size: clamp(80px, 9.5vw, 130px);
    font-weight: 900;
    line-height: 0.92;
    letter-spacing: -0.02em;
    display: block;
    background: linear-gradient(
      90deg,
      #FFFFFF 0%,
      #00D4FF 20%,
      #FFFFFF 35%,
      #8B5CF6 50%,
      #FFFFFF 65%,
      #00D4FF 80%,
      #FFFFFF 100%
    );
    background-size: 250% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: electricSweep 5s linear infinite;
    font-family: var(--font-playfair), serif;
  }

  .availability-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #00D4FF;
    animation: dotPulse 1.6s ease-in-out infinite;
    flex-shrink: 0;
  }

  .availability-ring {
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1px solid rgba(0,212,255,0.4);
    animation: dotPulse 1.6s ease-in-out infinite reverse;
  }

  .stat-number {
    background: linear-gradient(135deg, #00D4FF, #8B5CF6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-family: var(--font-playfair), serif;
    font-weight: 700;
    font-size: 36px;
    line-height: 1;
  }

  .booking-card-wrap {
    --ba: 0deg;
    padding: 1px;
    border-radius: 4px;
    background: conic-gradient(from var(--ba), transparent 0%, #00D4FF 12%, transparent 24%);
    animation: borderRun 4s linear infinite;
  }

  .booking-card-inner {
    background: rgba(10,10,10,0.97);
    border-radius: 3px;
    overflow: hidden;
  }

  .booking-field {
    background: #111111;
    border: 1px solid rgba(0,212,255,0.12);
    color: #ffffff;
    transition: border-color 0.3s, box-shadow 0.3s;
    outline: none;
    width: 100%;
    font-size: 16px;
    padding: 12px 16px;
    border-radius: 2px;
    font-family: var(--font-montserrat), sans-serif;
    letter-spacing: 0.02em;
  }
  .booking-field::placeholder { color: #3A3A3A; }
  .booking-field:focus {
    border-color: rgba(0,212,255,0.55);
    box-shadow: 0 0 0 3px rgba(0,212,255,0.08), 0 0 12px rgba(0,212,255,0.1);
  }
  .booking-field option { background: #111111; }

  .quote-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #00D4FF 0%, #0099BB 60%, #006688 100%);
    color: #000000;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    border-radius: 2px;
    position: relative;
    overflow: hidden;
    transition: filter 0.3s, transform 0.2s;
    animation: neonPulse 2.5s ease-in-out infinite;
    font-family: var(--font-montserrat), sans-serif;
  }
  .quote-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }
  .quote-btn:hover { filter: brightness(1.12); transform: translateY(-1px); }
  .quote-btn:hover::after { transform: translateX(100%); }

  .fade-up-1 { animation: fadeSlideUp 0.9s ease-out 0.1s both; }
  .fade-up-2 { animation: fadeSlideUp 0.9s ease-out 0.3s both; }
  .fade-up-3 { animation: fadeSlideUp 0.9s ease-out 0.5s both; }
  .fade-up-4 { animation: fadeSlideUp 0.9s ease-out 0.7s both; }
  .fade-up-5 { animation: fadeSlideUp 0.9s ease-out 0.9s both; }
`;

const STATS = [
  { value: "15+",  label: "Years Experience" },
  { value: "24/7", label: "Round the Clock"   },
  { value: "5★",   label: "Rated Service"     },
  { value: "5K+",  label: "Journeys Completed" },
];

export default function NoirHeroPage() {
  const [form, setForm] = useState({ from: "", to: "", date: "", time: "", passengers: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <style>{HERO_STYLES}</style>

      {/* ─── HERO SECTION ─── */}
      <section
        className="relative flex flex-col justify-center min-h-screen overflow-hidden"
        style={{ background: "#050505" }}
      >
        {/* Hero photo background + dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1920&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.62)" }} />

        {/* Animated grid */}
        <div className="hero-grid" />
        {/* Radial glows */}
        <div className="hero-radial" />
        <div className="hero-radial-purple" />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">

          {/* 24/7 badge */}
          <div className="fade-up-1" style={{ marginBottom: "36px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(0,212,255,0.2)",
                background: "rgba(0,212,255,0.05)",
              }}
            >
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="availability-ring" />
                <div className="availability-dot" />
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C8D6E5",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Available 24 / 7
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="fade-up-2" style={{ marginBottom: "28px" }}>
            <span className="headline-white">ARRIVE WITH</span>
            <span className="headline-sweep">DISTINCTION</span>
          </div>

          {/* Tagline */}
          <p
            className="fade-up-3"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "18px",
              fontWeight: 300,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(200,214,229,0.85)",
              marginBottom: "56px",
              maxWidth: "480px",
            }}
          >
            London&apos;s Premier Chauffeur Service
          </p>

          {/* Stats bar */}
          <div className="fade-up-4">
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.25), rgba(139,92,246,0.15), transparent)", marginBottom: "28px" }} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
              }}
            >
              {STATS.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "16px 0",
                    borderRight: i < STATS.length - 1 ? "1px solid rgba(0,212,255,0.1)" : undefined,
                  }}
                >
                  <span className="stat-number">{s.value}</span>
                  <span
                    style={{
                      fontSize: "12px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(200,214,229,0.5)",
                      fontWeight: 500,
                      marginTop: "6px",
                      fontFamily: "var(--font-montserrat), sans-serif",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.25), rgba(139,92,246,0.15), transparent)" }} />
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to top, #050505, transparent)", pointerEvents: "none" }} />
      </section>

      {/* ─── BOOKING WIDGET ─── */}
      <section
        className="relative z-10"
        style={{ background: "#050505", padding: "80px 0" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          {/* Section label */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
            <div
              style={{
                fontSize: "12px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#00D4FF",
                fontWeight: 600,
                fontFamily: "var(--font-montserrat), sans-serif",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ height: "1px", width: "32px", background: "linear-gradient(90deg, #00D4FF, transparent)", display: "block" }} />
              Instant Quote
              <span style={{ height: "1px", width: "32px", background: "linear-gradient(270deg, #00D4FF, transparent)", display: "block" }} />
            </div>
          </div>

          {/* Running-border card */}
          <div className="booking-card-wrap">
            <div className="booking-card-inner" style={{ padding: "40px" }}>
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "32px" }}>
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      color: "#ffffff",
                      fontSize: "28px",
                      fontWeight: 700,
                      marginBottom: "6px",
                    }}
                  >
                    Plan Your Journey
                  </h2>
                  <p
                    style={{
                      fontSize: "12px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "rgba(200,214,229,0.4)",
                      fontFamily: "var(--font-montserrat), sans-serif",
                    }}
                  >
                    Luxury at your schedule
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "12px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(0,212,255,0.6)",
                    fontFamily: "var(--font-montserrat), sans-serif",
                  }}
                >
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00D4FF", opacity: 0.7 }} />
                  No booking fee
                </div>
              </div>

              {/* Form grid — 2 cols */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                {[
                  { name: "from", label: "Pickup Location", placeholder: "Heathrow Terminal 5, London…", type: "text" },
                  { name: "to",   label: "Destination",     placeholder: "The Savoy, Strand, London…",   type: "text" },
                  { name: "date", label: "Date",            placeholder: "",                               type: "date" },
                  { name: "time", label: "Time",            placeholder: "",                               type: "time" },
                ].map(({ name, label, placeholder, type }) => (
                  <div key={name}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(0,212,255,0.7)",
                        marginBottom: "8px",
                        fontWeight: 500,
                        fontFamily: "var(--font-montserrat), sans-serif",
                      }}
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={form[name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="booking-field"
                      style={type === "date" || type === "time" ? { colorScheme: "dark" } : undefined}
                    />
                  </div>
                ))}
              </div>

              {/* Passengers + CTA */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "16px",
                  alignItems: "flex-end",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(0,212,255,0.7)",
                      marginBottom: "8px",
                      fontWeight: 500,
                      fontFamily: "var(--font-montserrat), sans-serif",
                    }}
                  >
                    Passengers
                  </label>
                  <select
                    name="passengers"
                    value={form.passengers}
                    onChange={handleChange}
                    className="booking-field"
                  >
                    <option value="" disabled>Select…</option>
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n}>{n} Passenger{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <button className="quote-btn">Get Instant Quote →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
