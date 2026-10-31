"use client";
import { useState, useRef, useCallback } from "react";

// ─── Colour tokens ─────────────────────────────────────────────────────────────
const C = {
  bg:      "#030B1F",
  surface: "#061228",
  card:    "#091830",
  accent:  "#7EB8D8",
  silver:  "#C8D8E8",
  text:    "#EEF4F8",
  muted:   "#6A80A0",
  border:  "rgba(126,184,216,0.12)",
  sidebar: "#020B18",
};

// ─── Global keyframe styles ────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @keyframes sectionIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes sidebarPulse {
    0%,100% { box-shadow: inset -3px 0 8px 0 rgba(126,184,216,0.40); }
    50%      { box-shadow: inset -3px 0 18px 4px rgba(126,184,216,0.90); }
  }
  @keyframes editorialReveal {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes navHoverLine {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
`;

// ─── Data ──────────────────────────────────────────────────────────────────────
const FLEET = [
  {
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    name: "Mercedes S-Class",
    category: "Executive Saloon",
    specs: "AMG Line · 2024 · 3 Passengers",
    features: ["Heated massaging seats", "Ambient lighting system", "Chilled refreshments"],
  },
  {
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    name: "Range Rover Autobiography",
    category: "Luxury SUV",
    specs: "LWB · 2024 · 4 Passengers",
    features: ["Executive rear seating", "Privacy glass", "Premium audio"],
  },
  {
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    name: "Bentley Flying Spur",
    category: "Ultra-Luxury Saloon",
    specs: "V8 · 2023 · 3 Passengers",
    features: ["Handcrafted interior", "Naim audio system", "Champagne cooler"],
  },
  {
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    name: "Mercedes V-Class",
    category: "Executive MPV",
    specs: "Extra Long · 2024 · 6 Passengers",
    features: ["Conference seating", "Individual climate zones", "Wi-Fi hotspot"],
  },
];

const SERVICES = [
  { name: "Airport Transfers",  desc: "Meet-and-greet at arrivals, flight tracking, complimentary waiting time. Heathrow, Gatwick, London City and beyond." },
  { name: "Corporate Travel",   desc: "Dedicated account management, monthly invoicing, and a fleet calibrated for the most discerning corporate clients." },
  { name: "Wedding Chauffeur",  desc: "Arrive in timeless elegance. Ribbons, complimentary flowers and a chauffeur dressed to match your occasion." },
  { name: "Event & Theatre",    desc: "Door-to-door for Wimbledon, Ascot, the O2, West End premieres and private member clubs across London." },
  { name: "Cruise & Rail",      desc: "Port transfers to Southampton, Portsmouth and beyond. On-time collection from any London terminal." },
  { name: "Long-Distance",      desc: "Intercity journeys across the UK and Europe. Rest in comfort while your chauffeur navigates for you." },
];

const EVENTS = [
  { name: "The Championships, Wimbledon",  venue: "All England Club, SW19",          date: "30 Jun – 13 Jul 2026" },
  { name: "Royal Ascot",                    venue: "Ascot Racecourse, Berkshire",      date: "16 – 20 Jun 2026" },
  { name: "Henley Royal Regatta",           venue: "Henley-on-Thames",                 date: "1 – 5 Jul 2026" },
  { name: "Glyndebourne Festival Opera",    venue: "Lewes, East Sussex",               date: "17 May – 28 Aug 2026" },
  { name: "Chelsea Flower Show",            venue: "Royal Hospital Chelsea, SW3",      date: "19 – 23 May 2026" },
  { name: "Goodwood Festival of Speed",     venue: "Chichester, West Sussex",          date: "10 – 13 Jul 2026" },
];

type Section = "home" | "fleet" | "services" | "events" | "about" | "contact";

const NAV_ITEMS: { label: string; id: Section }[] = [
  { label: "Home",     id: "home"     },
  { label: "Fleet",    id: "fleet"    },
  { label: "Services", id: "services" },
  { label: "Events",   id: "events"   },
  { label: "About",    id: "about"    },
  { label: "Contact",  id: "contact"  },
];

// ─── Sidebar nav item ──────────────────────────────────────────────────────────
function NavItem({
  label, isActive, onClick,
}: { label: string; isActive: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const hot = isActive || hovered;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        background: hot ? "rgba(126,184,216,0.05)" : "none",
        border: "none",
        cursor: "pointer",
        padding: "14px 28px 14px 44px",
        textAlign: "left",
        position: "relative",
        display: "flex",
        alignItems: "center",
        transition: "background 0.2s",
      }}
    >
      {/* Left border — slides in on hover/active */}
      <div style={{
        position: "absolute",
        left: 0, top: 0, bottom: 0,
        width: 3,
        background: C.accent,
        transform: hot ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "top",
        transition: "transform 0.25s ease",
        ...(isActive ? { animation: "sidebarPulse 2.5s ease infinite" } : {}),
      }} />

      <span style={{
        fontFamily: "var(--font-montserrat)",
        fontSize: 14,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: hot ? C.accent : C.silver,
        fontWeight: hot ? 600 : 400,
        transition: "color 0.2s",
      }}>
        {label}
      </span>
    </button>
  );
}

// ─── HOME SECTION ──────────────────────────────────────────────────────────────
function HomeSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [fields, setFields] = useState({ from: "", to: "", date: "", time: "" });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 18;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
    setParallax({ x, y });
  }, []);

  const inputS: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${C.border}`,
    borderRadius: 2,
    padding: "12px 14px",
    color: C.text,
    fontFamily: "var(--font-montserrat)",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelS: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-montserrat)",
    fontSize: 10,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: C.muted,
    marginBottom: 6,
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      {/* Parallax hero image */}
      <div style={{
        position: "absolute",
        inset: "-5%",
        backgroundImage: "url(https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1920&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: `translate(${parallax.x}px, ${parallax.y}px)`,
        transition: "transform 0.12s ease-out",
      }} />

      {/* Left-dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(105deg, rgba(2,11,24,0.93) 0%, rgba(2,11,24,0.62) 55%, rgba(2,11,24,0.28) 100%)",
      }} />
      {/* Bottom-dark lift for booking card */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(3,11,31,0.97) 0%, transparent 50%)",
      }} />

      {/* Editorial headline — overlaps image */}
      <div style={{
        position: "relative", zIndex: 2,
        paddingTop: 120,
        paddingLeft: 60,
        paddingRight: 40,
      }}>
        <p style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: 12,
          letterSpacing: "0.32em",
          color: C.silver,
          textTransform: "uppercase",
          marginBottom: 28,
          animation: "editorialReveal 0.8s ease 0.1s both",
          opacity: 0,
        }}>
          London's Premier Chauffeur Service
        </p>

        {/* "ARRIVE WITH" */}
        <div style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(80px, 7vw, 110px)",
          fontWeight: 700,
          color: C.text,
          lineHeight: 0.92,
          letterSpacing: "-0.02em",
          animation: "editorialReveal 0.8s ease 0.2s both",
          opacity: 0,
        }}>
          ARRIVE<br />WITH
        </div>

        {/* "DISTINCTION" — italic ice-blue, offset */}
        <div style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(80px, 7vw, 110px)",
          fontWeight: 800,
          fontStyle: "italic",
          lineHeight: 0.92,
          letterSpacing: "-0.02em",
          marginLeft: 60,
          marginTop: 8,
          background: `linear-gradient(90deg, ${C.accent}, #B8DEF2, ${C.accent}, #A2CEEC, ${C.accent})`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "editorialReveal 0.8s ease 0.35s both, shimmer 5s linear 1s infinite",
          opacity: 0,
        }}>
          DISTINCTION
        </div>

        {/* Ornament rule */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginTop: 44,
          animation: "fadeUp 0.8s ease 0.5s both",
          opacity: 0,
        }}>
          <div style={{ height: 1, width: 56, background: `linear-gradient(90deg, transparent, ${C.silver})` }} />
          <span style={{ color: C.accent, fontSize: 8 }}>◆</span>
          <div style={{ height: 1, width: 56, background: `linear-gradient(90deg, ${C.silver}, transparent)` }} />
        </div>
      </div>

      {/* Booking card — bottom of section */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        zIndex: 3,
        padding: "0 60px 48px",
        animation: "fadeUp 0.9s ease 0.7s both",
        opacity: 0,
      }}>
        <div style={{
          background: "rgba(6,18,40,0.90)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${C.border}`,
          borderRadius: 4,
          padding: "28px 32px",
          maxWidth: 800,
        }}>
          <p style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: 10,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: C.muted,
            marginBottom: 18,
          }}>
            Instant Booking
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 140px 120px auto",
            gap: 12,
            alignItems: "end",
          }}>
            <div>
              <label style={labelS}>From</label>
              <input type="text" placeholder="Pickup location" value={fields.from}
                onChange={e => setFields(f => ({ ...f, from: e.target.value }))} style={inputS} />
            </div>
            <div>
              <label style={labelS}>To</label>
              <input type="text" placeholder="Destination" value={fields.to}
                onChange={e => setFields(f => ({ ...f, to: e.target.value }))} style={inputS} />
            </div>
            <div>
              <label style={labelS}>Date</label>
              <input type="date" value={fields.date}
                onChange={e => setFields(f => ({ ...f, date: e.target.value }))}
                style={{ ...inputS, colorScheme: "dark" }} />
            </div>
            <div>
              <label style={labelS}>Time</label>
              <input type="time" value={fields.time}
                onChange={e => setFields(f => ({ ...f, time: e.target.value }))}
                style={{ ...inputS, colorScheme: "dark" }} />
            </div>
            <button
              style={{
                background: C.accent,
                border: "none",
                borderRadius: 2,
                color: C.bg,
                fontFamily: "var(--font-montserrat)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "13px 20px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Book Now
            </button>
          </div>
          <p style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: 11,
            color: C.muted,
            marginTop: 12,
            letterSpacing: "0.1em",
          }}>
            24 / 7 &nbsp;·&nbsp; Fixed prices &nbsp;·&nbsp; No obligation
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── FLEET SECTION ─────────────────────────────────────────────────────────────
function FleetSection() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding: "72px 60px 60px" }}>
        <p style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: C.accent,
          marginBottom: 16,
          animation: "editorialReveal 0.6s ease both",
          opacity: 0,
        }}>The Fleet</p>
        <h2 style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(48px, 5vw, 72px)",
          fontWeight: 700,
          color: C.text,
          lineHeight: 1,
          animation: "editorialReveal 0.6s ease 0.1s both",
          opacity: 0,
        }}>
          Vehicles of{" "}
          <em style={{ color: C.accent }}>Distinction</em>
        </h2>
      </div>

      {/* Alternating asymmetric cards */}
      {FLEET.map((car, i) => {
        const even = i % 2 === 0;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: even ? "row" : "row-reverse",
              minHeight: 360,
              marginBottom: 6,
              position: "relative",
              animation: `editorialReveal 0.7s ease ${0.12 * i}s both`,
              opacity: 0,
            }}
          >
            {/* Photo 60% */}
            <div style={{ flex: "0 0 60%", position: "relative", overflow: "hidden" }}>
              <img
                src={car.img}
                alt={car.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 360 }}
              />
              {/* Bleed gradient into text panel */}
              <div style={{
                position: "absolute", inset: 0,
                background: even
                  ? "linear-gradient(to right, transparent 60%, rgba(9,24,48,0.97) 100%)"
                  : "linear-gradient(to left,  transparent 60%, rgba(9,24,48,0.97) 100%)",
              }} />
            </div>

            {/* Text 40% — overlaps photo by 80px */}
            <div style={{
              flex: "0 0 40%",
              background: C.card,
              padding: "48px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              zIndex: 2,
              marginLeft: even ? -80 : 0,
              marginRight: even ? 0 : -80,
              boxShadow: even
                ? "-6px 0 48px rgba(3,11,31,0.85)"
                : "6px 0 48px rgba(3,11,31,0.85)",
            }}>
              <p style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: 10,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: C.accent,
                marginBottom: 12,
              }}>{car.category}</p>

              <h3 style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 48,
                fontWeight: 700,
                color: C.text,
                lineHeight: 1,
                marginBottom: 8,
              }}>{car.name}</h3>

              <p style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: 13,
                color: C.muted,
                marginBottom: 24,
              }}>{car.specs}</p>

              <div style={{ width: 40, height: 1, background: C.accent, marginBottom: 24 }} />

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
                {car.features.map((f, fi) => (
                  <li key={fi} style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: 14,
                    color: C.silver,
                    paddingBottom: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}>
                    <span style={{ color: C.accent, fontSize: 6, flexShrink: 0 }}>◆</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.accent,
                background: "transparent",
                border: `1px solid ${C.accent}`,
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: 2,
                alignSelf: "flex-start",
              }}>
                Enquire
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── SERVICES SECTION ──────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingBottom: 80 }}>
      <div style={{ padding: "72px 60px 60px" }}>
        <p style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: C.accent,
          marginBottom: 16,
          animation: "editorialReveal 0.6s ease both",
          opacity: 0,
        }}>Our Specialisations</p>
        <h2 style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(48px, 5vw, 72px)",
          fontWeight: 700,
          color: C.text,
          lineHeight: 1,
          animation: "editorialReveal 0.6s ease 0.1s both",
          opacity: 0,
        }}>Services</h2>
      </div>

      {/* Editorial list — service name spans full width, description in right column */}
      <div style={{ padding: "0 60px" }}>
        {SERVICES.map((s, i) => (
          <div
            key={i}
            style={{
              borderTop: `1px solid ${C.border}`,
              padding: "40px 0",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "start",
              animation: `fadeUp 0.6s ease ${0.08 * i}s both`,
              opacity: 0,
            }}
          >
            <div>
              <h3 style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 40,
                fontWeight: 700,
                color: C.text,
                lineHeight: 1,
                margin: 0,
              }}>{s.name}</h3>
              <div style={{ width: 48, height: 2, background: C.accent, marginTop: 16 }} />
            </div>
            <p style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: 18,
              color: C.muted,
              lineHeight: 1.7,
              paddingTop: 6,
              margin: 0,
            }}>{s.desc}</p>
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${C.border}` }} />
      </div>
    </div>
  );
}

// ─── EVENTS SECTION ────────────────────────────────────────────────────────────
function EventsSection() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingBottom: 80 }}>
      <div style={{ padding: "72px 60px 60px" }}>
        <p style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: C.accent,
          marginBottom: 16,
          animation: "editorialReveal 0.6s ease both",
          opacity: 0,
        }}>2026 Season</p>
        <h2 style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(48px, 5vw, 72px)",
          fontWeight: 700,
          color: C.text,
          lineHeight: 1,
          animation: "editorialReveal 0.6s ease 0.1s both",
          opacity: 0,
        }}>
          London{" "}
          <em style={{ color: C.accent }}>Events</em>
        </h2>
      </div>

      {/* Timeline */}
      <div style={{ padding: "0 60px", position: "relative" }}>
        {/* Vertical ice-blue line */}
        <div style={{
          position: "absolute",
          left: 86,
          top: 0,
          bottom: 0,
          width: 1,
          background: `linear-gradient(to bottom, ${C.accent}, rgba(126,184,216,0.06))`,
        }} />

        {EVENTS.map((ev, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 32,
              paddingBottom: 56,
              animation: `fadeUp 0.6s ease ${0.1 * i}s both`,
              opacity: 0,
            }}
          >
            {/* Index number */}
            <div style={{ flex: "0 0 26px", textAlign: "right", paddingTop: 10 }}>
              <span style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: 11,
                color: C.accent,
                letterSpacing: "0.08em",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Timeline dot */}
            <div style={{
              flex: "0 0 12px",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: C.accent,
              border: `2px solid ${C.bg}`,
              marginTop: 8,
              boxShadow: `0 0 8px ${C.accent}`,
              position: "relative",
              zIndex: 1,
            }} />

            {/* Event info */}
            <div style={{ flex: 1 }}>
              <p style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.muted,
                marginBottom: 8,
              }}>{ev.date}</p>
              <h3 style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 32,
                fontWeight: 700,
                color: C.text,
                lineHeight: 1.1,
                marginBottom: 8,
              }}>{ev.name}</h3>
              <p style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: 14,
                color: C.muted,
                margin: 0,
              }}>{ev.venue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT SECTION ─────────────────────────────────────────────────────────────
function AboutSection() {
  const stats = [
    {
      num: "15",
      label: "Years of Excellence",
      desc: "Established in 2010, Wimbledon Limousines has served London's most discerning private clients, corporations, and visiting dignitaries for over a decade and a half.",
    },
    {
      num: "24/7",
      label: "Always Available",
      desc: "Round-the-clock reservations, on-road support and real-time tracking. A dedicated duty manager is on call at every hour.",
    },
    {
      num: "5★",
      label: "Rated Service",
      desc: "Consistently perfect ratings across all platforms. Our SIA-licensed chauffeurs hold advanced driving qualifications and impeccable local knowledge.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingBottom: 80 }}>
      <div style={{ padding: "72px 60px 60px" }}>
        <p style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: C.accent,
          marginBottom: 16,
          animation: "editorialReveal 0.6s ease both",
          opacity: 0,
        }}>Our Story</p>
        <h2 style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(48px, 5vw, 72px)",
          fontWeight: 700,
          color: C.text,
          lineHeight: 1,
          animation: "editorialReveal 0.6s ease 0.1s both",
          opacity: 0,
        }}>
          About{" "}
          <em style={{ color: C.accent, display: "block" }}>
            Wimbledon<br />Limousines
          </em>
        </h2>
      </div>

      {/* Editorial numbered blocks */}
      <div style={{ padding: "0 60px" }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              borderTop: `1px solid ${C.border}`,
              padding: "56px 0 56px 200px",
              overflow: "hidden",
              animation: `fadeUp 0.6s ease ${0.15 * i}s both`,
              opacity: 0,
            }}
          >
            {/* Enormous ghost number — editorial background figure */}
            <div style={{
              position: "absolute",
              left: -16,
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "var(--font-playfair)",
              fontSize: 160,
              fontWeight: 800,
              color: "rgba(126,184,216,0.055)",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}>{s.num}</div>

            {/* Foreground text */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: 11,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: C.accent,
                marginBottom: 12,
              }}>{s.label}</p>
              <p style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: 18,
                color: C.muted,
                lineHeight: 1.7,
                maxWidth: 560,
                margin: 0,
              }}>{s.desc}</p>
            </div>
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${C.border}` }} />
      </div>
    </div>
  );
}

// ─── CONTACT SECTION ───────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const inputS: React.CSSProperties = {
    width: "100%",
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 2,
    padding: "12px 16px",
    color: C.text,
    fontFamily: "var(--font-montserrat)",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelS: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-montserrat)",
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: C.muted,
    marginBottom: 8,
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingBottom: 80 }}>
      <div style={{ padding: "72px 60px 48px" }}>
        <p style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: C.accent,
          marginBottom: 16,
          animation: "editorialReveal 0.6s ease both",
          opacity: 0,
        }}>Reach Out</p>
        <h2 style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(48px, 5vw, 72px)",
          fontWeight: 700,
          color: C.text,
          lineHeight: 1,
          marginBottom: 0,
          animation: "editorialReveal 0.6s ease 0.1s both",
          opacity: 0,
        }}>CONTACT US</h2>
      </div>

      <div style={{ padding: "0 60px" }}>
        {/* Large editorial phone number */}
        <a
          href="tel:+442089461234"
          style={{ textDecoration: "none" }}
        >
          <div style={{
            fontFamily: "var(--font-playfair)",
            fontSize: 56,
            fontWeight: 700,
            color: C.accent,
            lineHeight: 1,
            marginBottom: 12,
            animation: "editorialReveal 0.7s ease 0.2s both",
            opacity: 0,
          }}>
            +44 20 8946 1234
          </div>
        </a>
        <p style={{
          fontFamily: "var(--font-montserrat)",
          fontSize: 14,
          color: C.muted,
          marginBottom: 56,
          animation: "fadeUp 0.6s ease 0.3s both",
          opacity: 0,
        }}>
          Available 24 hours, 7 days a week
        </p>

        {/* Contact form */}
        <div style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 4,
          padding: "48px",
          maxWidth: 680,
          animation: "fadeUp 0.7s ease 0.4s both",
          opacity: 0,
        }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 40, color: C.accent, marginBottom: 16 }}>✓</div>
              <h3 style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 28,
                color: C.text,
                margin: "0 0 12px",
              }}>Message Received</h3>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: 16, color: C.muted, margin: 0 }}>
                Our reservations team will contact you within one hour.
              </p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
              <h3 style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 28,
                color: C.text,
                margin: "0 0 32px",
                textAlign: "center",
              }}>Send an Enquiry</h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={labelS}>Full Name</label>
                  <input type="text" placeholder="Your name"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputS} />
                </div>
                <div>
                  <label style={labelS}>Email Address</label>
                  <input type="email" placeholder="your@email.com"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputS} />
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={labelS}>Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your journey requirements..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ ...inputS, resize: "vertical" }}
                />
              </div>

              <button type="submit" style={{
                width: "100%",
                background: C.accent,
                border: "none",
                borderRadius: 2,
                color: C.bg,
                fontFamily: "var(--font-montserrat)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "16px",
                cursor: "pointer",
              }}>
                Send Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function AzurePage() {
  const [active, setActive] = useState<Section>("home");

  const navigate = (id: Section) => {
    setActive(id);
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* ── FIXED SIDEBAR (220 px) ──────────────────────────────── */}
        <aside style={{
          position: "fixed",
          left: 0, top: 0, bottom: 0,
          width: 220,
          zIndex: 50,
          background: C.sidebar,
          borderRight: `1px solid rgba(126,184,216,0.12)`,
          display: "flex",
          flexDirection: "column",
          padding: "40px 0",
        }}>

          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0 28px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 6,
            }}
          >
            {/* W monogram circle */}
            <div style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: `1.5px solid ${C.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}>
              <span style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 20,
                fontWeight: 700,
                color: C.accent,
                lineHeight: 1,
              }}>W</span>
            </div>
            <span style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 13,
              fontWeight: 700,
              color: C.text,
              letterSpacing: "0.12em",
              lineHeight: 1,
            }}>WIMBLEDON</span>
            <span style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: 10,
              letterSpacing: "0.3em",
              color: C.accent,
              textTransform: "uppercase",
            }}>LIMOUSINES</span>
          </button>

          {/* Divider */}
          <div style={{
            width: "100%",
            height: 1,
            background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`,
            marginBottom: 8,
          }} />

          {/* Nav items with timeline line on their left edge */}
          <nav style={{ flex: 1, position: "relative", paddingTop: 4 }}>
            {/* Vertical timeline ice-blue line */}
            <div style={{
              position: "absolute",
              left: 28,
              top: 8,
              bottom: 8,
              width: 1,
              background: `linear-gradient(to bottom, ${C.accent}, rgba(126,184,216,0.08))`,
              pointerEvents: "none",
            }} />

            {NAV_ITEMS.map(({ label, id }) => (
              <NavItem
                key={id}
                label={label}
                isActive={active === id}
                onClick={() => navigate(id)}
              />
            ))}
          </nav>

          {/* Bottom CTA + phone */}
          <div style={{ padding: "16px 24px 0" }}>
            <div style={{
              width: "100%",
              height: 1,
              background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`,
              marginBottom: 20,
            }} />
            <button
              onClick={() => navigate("contact")}
              style={{
                width: "100%",
                background: C.accent,
                border: "none",
                borderRadius: 2,
                color: C.bg,
                fontFamily: "var(--font-montserrat)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "13px",
                cursor: "pointer",
                marginBottom: 14,
              }}
            >
              Book Now
            </button>
            <a href="tel:+442089461234" style={{ textDecoration: "none" }}>
              <p style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: 12,
                color: C.muted,
                textAlign: "center",
                letterSpacing: "0.05em",
                margin: 0,
              }}>
                +44 20 8946 1234
              </p>
            </a>
          </div>
        </aside>

        {/* ── CONTENT AREA (margin-left: 220px) ───────────────────── */}
        <main style={{ marginLeft: 220, flex: 1, minHeight: "100vh" }}>
          {/* key prop re-mounts on section change → triggers sectionIn animation */}
          <div key={active} style={{ animation: "sectionIn 0.4s ease-out" }}>
            {active === "home"     && <HomeSection onNavigate={navigate} />}
            {active === "fleet"    && <FleetSection />}
            {active === "services" && <ServicesSection />}
            {active === "events"   && <EventsSection />}
            {active === "about"    && <AboutSection />}
            {active === "contact"  && <ContactSection />}
          </div>
        </main>

      </div>
    </>
  );
}
