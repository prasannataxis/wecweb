"use client";
import { useState } from "react";

type BubbleId = "fleet" | "services" | "events" | "about" | "contact";

const BUBBLES: Array<{ id: BubbleId; label: string; top: string; left: string; delay: string }> = [
  { id: "fleet",    label: "Fleet",    top: "35%", left: "20%", delay: "0s"   },
  { id: "services", label: "Services", top: "60%", left: "35%", delay: "0.8s" },
  { id: "events",   label: "Events",   top: "40%", left: "65%", delay: "1.4s" },
  { id: "about",    label: "About",    top: "65%", left: "72%", delay: "0.4s" },
  { id: "contact",  label: "Contact",  top: "72%", left: "50%", delay: "1.1s" },
];

const CORNER_POS = [
  { top: "10%", left: "4%"  },
  { top: "10%", left: "90%" },
  { top: "84%", left: "4%"  },
  { top: "84%", left: "90%" },
];

const CARS = [
  { name: "Rolls-Royce Phantom",      category: "Ultra Luxury",  img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80" },
  { name: "Mercedes S-Class",         category: "Executive",     img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80" },
  { name: "Range Rover Autobiography",category: "Premium SUV",   img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80" },
  { name: "Bentley Flying Spur",      category: "Grand Touring", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80" },
];

const SERVICES = [
  { num: "01", name: "Airport Transfers",   desc: "Seamless door-to-terminal service with real-time flight monitoring across all London airports." },
  { num: "02", name: "Corporate Accounts",  desc: "Tailored executive travel programmes with monthly billing and dedicated account managers." },
  { num: "03", name: "Wedding Hire",        desc: "Ribbon-dressed Rolls-Royce and Bentley classics for your unforgettable entrance." },
  { num: "04", name: "Events & Premieres",  desc: "From BAFTA nights to Wimbledon finals — discreet, elegant, efficient." },
  { num: "05", name: "As-Directed Service", desc: "A chauffeur at your disposal, hour by hour, across the city." },
  { num: "06", name: "Roadshows & Tours",   desc: "Multi-day executive travel across the UK and Europe." },
];

const EVENTS = [
  { name: "The Championships, Wimbledon", venue: "All England Lawn Tennis Club, SW19", date: "30 Jun – 13 Jul 2025", desc: "The world's most prestigious tennis tournament. Arrive courtside in unhurried elegance." },
  { name: "Royal Ascot",                  venue: "Ascot Racecourse, Berkshire",        date: "17–21 Jun 2025",       desc: "Britain's most glamorous flat racing festival. We handle the queues; you handle the champagne." },
  { name: "Chelsea Flower Show",          venue: "Royal Hospital Chelsea, SW3",        date: "20–24 May 2025",       desc: "The world's greatest horticultural show, effortlessly curated." },
  { name: "BAFTA Film Awards",            venue: "Royal Festival Hall, SE1",           date: "9 Feb 2025",           desc: "London's glittering night for film. Red carpet arrivals that merit the occasion." },
  { name: "Goodwood Festival of Speed",   venue: "Goodwood Estate, West Sussex",       date: "10–13 Jul 2025",       desc: "The world's greatest automotive celebration. Let us be the finest car you travel in all weekend." },
  { name: "Lord's Cricket — Test Matches",venue: "Lord's Cricket Ground, NW8",         date: "Jul–Sep 2025",         desc: "Arrive through the Grace Gates with the calm only a Rolls-Royce affords." },
];

const TESTIMONIALS = [
  { quote: "Wimbledon Limousines have been our corporate partner for seven years. The standard never wavers — which is precisely why we keep them.", author: "Managing Director, Private Equity Firm", location: "Mayfair, London" },
  { quote: "On our wedding morning, the chauffeur arrived fifteen minutes early with chilled Perrier and white roses. That thoughtfulness set the tone for the entire day.", author: "Sarah & James", location: "Married at Claridge's, 2024" },
  { quote: "I travel London extensively for client meetings. This is the only car service I trust not to make me late — or embarrassed.", author: "Senior Partner, International Law Firm", location: "City of London" },
];

/* ── Shared section header ── */
function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: 56, textAlign: "center" }}>
      <p style={{
        fontFamily: "var(--font-montserrat)",
        fontSize: 12,
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: "#C8847A",
        margin: "0 0 14px",
      }}>{eyebrow}</p>
      <h2 style={{
        fontFamily: "var(--font-playfair)",
        fontSize: "clamp(48px, 6vw, 72px)",
        fontWeight: 700,
        color: "#FFF5F0",
        margin: 0,
        lineHeight: 1.1,
      }}>{title}</h2>
      <div style={{
        width: 120,
        height: 1,
        background: "linear-gradient(90deg, transparent, #C8847A, transparent)",
        margin: "20px auto 0",
      }} />
    </div>
  );
}

/* ── Fleet ── */
function FleetContent() {
  return (
    <div style={{ padding: "100px 60px 80px", minHeight: "100vh" }}>
      <SectionHeader eyebrow="Our Collection" title="The Fleet" />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 48,
        maxWidth: 760,
        margin: "0 auto",
      }}>
        {CARS.map((car) => (
          <div key={car.name} style={{ textAlign: "center" }}>
            <div
              className="fleet-circle"
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid rgba(200,132,122,0.4)",
                boxShadow: "0 0 40px rgba(200,132,122,0.2)",
                marginBottom: 20,
              }}
            >
              <img
                src={car.img}
                alt={car.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <h3 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 20,
              fontWeight: 700,
              color: "#FFF5F0",
              margin: "0 0 6px",
            }}>{car.name}</h3>
            <p style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: 13,
              color: "#C8847A",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              margin: 0,
            }}>{car.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Services ── */
function ServicesContent() {
  return (
    <div style={{ padding: "100px 60px 80px", minHeight: "100vh" }}>
      <SectionHeader eyebrow="What We Offer" title="Our Services" />
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 900,
        margin: "0 auto",
      }}>
        {SERVICES.map((s) => (
          <div
            key={s.num}
            className="pill-card"
            style={{
              borderRadius: 100,
              padding: "24px 48px",
              background: "rgba(45,10,78,0.7)",
              border: "1px solid rgba(200,132,122,0.25)",
              display: "flex",
              alignItems: "center",
              gap: 32,
              transition: "background 0.3s, border-color 0.3s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.background = "rgba(45,10,78,0.9)";
              el.style.borderColor = "rgba(200,132,122,0.6)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.background = "rgba(45,10,78,0.7)";
              el.style.borderColor = "rgba(200,132,122,0.25)";
            }}
          >
            <span style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 52,
              fontWeight: 700,
              color: "rgba(200,132,122,0.35)",
              flexShrink: 0,
              lineHeight: 1,
              width: 76,
              textAlign: "center",
            }}>{s.num}</span>
            <div>
              <h3 style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 22,
                fontWeight: 700,
                color: "#FFF5F0",
                margin: "0 0 6px",
              }}>{s.name}</h3>
              <p style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: 16,
                fontWeight: 300,
                color: "#C0A8B8",
                margin: 0,
                lineHeight: 1.5,
              }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Events ── */
function EventsContent() {
  return (
    <div style={{ padding: "100px 60px 80px", minHeight: "100vh" }}>
      <SectionHeader eyebrow="London's Finest Occasions" title="Events & Occasions" />
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 860, margin: "0 auto" }}>
        {EVENTS.map((ev, i) => (
          <div
            key={ev.name}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 28,
              padding: "28px 0",
              borderBottom: "1px solid rgba(200,132,122,0.15)",
            }}
          >
            <div style={{
              flexShrink: 0,
              width: 4,
              alignSelf: "stretch",
              background: "linear-gradient(to bottom, #C8847A, rgba(200,132,122,0.1))",
              borderRadius: 2,
            }} />
            <div style={{ flexShrink: 0, paddingTop: 2 }}>
              <span style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 36,
                fontWeight: 700,
                color: "rgba(200,132,122,0.3)",
                lineHeight: 1,
              }}>{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div>
              <h3 style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 24,
                fontWeight: 700,
                color: "#FFF5F0",
                margin: "0 0 6px",
              }}>{ev.name}</h3>
              <p style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C8847A",
                margin: "0 0 10px",
              }}>{ev.venue} &nbsp;·&nbsp; {ev.date}</p>
              <p style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: 16,
                fontWeight: 300,
                color: "#C0A8B8",
                margin: 0,
                lineHeight: 1.65,
              }}>{ev.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── About ── */
function AboutContent() {
  return (
    <div style={{ padding: "100px 60px 80px", minHeight: "100vh" }}>
      <SectionHeader eyebrow="Our Story" title="Why Choose Us" />

      {/* Stats */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 64,
        flexWrap: "wrap",
        marginBottom: 72,
      }}>
        {[
          { num: "16+",    label: "Years Established" },
          { num: "4,800+", label: "Annual Journeys" },
          { num: "98%",    label: "On-Time Record" },
          { num: "24/7",   label: "Concierge Support" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 64,
              fontWeight: 700,
              color: "#C8847A",
              lineHeight: 1,
              marginBottom: 8,
            }}>{s.num}</div>
            <div style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: 12,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C0A8B8",
            }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <h3 style={{
        fontFamily: "var(--font-playfair)",
        fontSize: "clamp(36px, 4vw, 52px)",
        fontWeight: 700,
        color: "#FFF5F0",
        textAlign: "center",
        margin: "0 0 40px",
      }}>What Our Clients Say</h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 24,
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} style={{
            padding: "36px 32px",
            background: "rgba(34,8,64,0.8)",
            border: "1px solid rgba(200,132,122,0.2)",
            position: "relative",
          }}>
            <span style={{
              fontFamily: "Georgia, serif",
              fontSize: 80,
              color: "rgba(200,132,122,0.25)",
              lineHeight: 1,
              position: "absolute",
              top: 8,
              left: 20,
              userSelect: "none",
              pointerEvents: "none",
            }}>&ldquo;</span>
            <p style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 17,
              fontStyle: "italic",
              color: "#FFF5F0",
              lineHeight: 1.7,
              margin: "0 0 20px",
              paddingTop: 28,
            }}>&ldquo;{t.quote}&rdquo;</p>
            <p style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: 13,
              fontWeight: 500,
              color: "#E8A89E",
              margin: "0 0 4px",
            }}>{t.author}</p>
            <p style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: 12,
              color: "#C0A8B8",
              margin: 0,
            }}>{t.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Contact ── */
function ContactContent() {
  return (
    <div style={{ padding: "100px 60px 80px", minHeight: "100vh" }}>
      <SectionHeader eyebrow="Get In Touch" title="Contact Us" />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 56,
        maxWidth: 960,
        margin: "0 auto",
        alignItems: "start",
      }}>
        {/* Info */}
        <div>
          {[
            { icon: "✆", label: "Telephone", value: "+44 (0) 20 8946 1234", href: "tel:+442089461234" },
            { icon: "◎", label: "WhatsApp",  value: "+44 (0) 7700 900456",   href: "https://wa.me/447700900456" },
            { icon: "✉", label: "Email",     value: "reservations@wimbledonlimousines.co.uk", href: "mailto:reservations@wimbledonlimousines.co.uk" },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: 32 }}>
              <p style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C8847A",
                margin: "0 0 8px",
              }}>{item.icon}  {item.label}</p>
              <a
                href={item.href}
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: 16,
                  color: "#FFF5F0",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#E8A89E"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#FFF5F0"; }}
              >{item.value}</a>
            </div>
          ))}
          <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(200,132,122,0.2)" }}>
            <p style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C8847A",
              margin: "0 0 10px",
            }}>Operations Hours</p>
            <p style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: 16,
              fontWeight: 300,
              color: "#C0A8B8",
              margin: 0,
              lineHeight: 1.7,
            }}>24 hours · 7 days a week<br />365 days a year</p>
          </div>
        </div>

        {/* Form */}
        <div style={{
          background: "rgba(34,8,64,0.8)",
          border: "1px solid rgba(200,132,122,0.2)",
          padding: "36px 32px",
        }}>
          <h3 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: 26,
            fontWeight: 700,
            color: "#FFF5F0",
            margin: "0 0 24px",
          }}>Send an Enquiry</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Full Name",      type: "text",  ph: "Your name" },
              { label: "Email Address",  type: "email", ph: "your@email.com" },
              { label: "Telephone",      type: "tel",   ph: "+44 …" },
            ].map((f) => (
              <div key={f.label}>
                <label style={{
                  display: "block",
                  fontFamily: "var(--font-montserrat)",
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#C8847A",
                  marginBottom: 6,
                }}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.ph}
                  style={{
                    width: "100%",
                    background: "#1A0828",
                    border: "1px solid rgba(200,132,122,0.3)",
                    padding: "10px 12px",
                    color: "#FFF5F0",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
            <div>
              <label style={{
                display: "block",
                fontFamily: "var(--font-montserrat)",
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#C8847A",
                marginBottom: 6,
              }}>Your Message</label>
              <textarea
                rows={4}
                placeholder="Describe your journey or event…"
                style={{
                  width: "100%",
                  background: "#1A0828",
                  border: "1px solid rgba(200,132,122,0.3)",
                  padding: "10px 12px",
                  color: "#FFF5F0",
                  fontFamily: "var(--font-montserrat)",
                  fontSize: 14,
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              style={{
                padding: "14px 0",
                background: "linear-gradient(135deg, #C8847A, #E8A89E)",
                border: "none",
                color: "#1A0828",
                fontFamily: "var(--font-montserrat)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "opacity 0.3s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            >Send Enquiry</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════════════ */
export default function VelvetPage() {
  const [activeBubble, setActiveBubble] = useState<BubbleId | null>(null);

  const openBubble = (id: BubbleId) => setActiveBubble(id);
  const closeBubble = () => setActiveBubble(null);

  return (
    <>
      <style>{`
        /* ── Bubble bob animation (large) ── */
        @keyframes bobFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-14px) scale(1.02); }
        }

        /* ── Bubble bob animation (mini) ── */
        @keyframes bobFloatMini {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }

        /* ── Rose gold glow pulse ── */
        @keyframes bubbleGlow {
          0%, 100% {
            box-shadow:
              0 0 20px rgba(200,132,122,0.35),
              0 0 40px rgba(200,132,122,0.12),
              inset 0 1px 0 rgba(255,245,240,0.12);
          }
          50% {
            box-shadow:
              0 0 40px rgba(200,132,122,0.7),
              0 0 80px rgba(200,132,122,0.28),
              inset 0 1px 0 rgba(255,245,240,0.18);
          }
        }

        /* ── Rose shimmer on "Distinction" ── */
        @keyframes roseShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        /* ── Section content fade-in (delayed 0.4s for bubble to expand first) ── */
        @keyframes contentFadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Hero text entrance ── */
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Large bubble ── */
        .bubble-large {
          animation: bobFloat 4s ease-in-out infinite, bubbleGlow 3s ease-in-out infinite;
        }
        .bubble-large:hover {
          box-shadow:
            0 0 60px rgba(200,132,122,0.9),
            0 0 120px rgba(200,132,122,0.4),
            inset 0 1px 0 rgba(255,245,240,0.2) !important;
        }

        /* ── Mini bubble (when a section is active) ── */
        .bubble-mini {
          animation: bobFloatMini 3s ease-in-out infinite, bubbleGlow 3s ease-in-out infinite;
        }

        /* ── Distinction shimmer ── */
        .hero-distinction {
          background: linear-gradient(
            90deg,
            #C8847A 0%, #FFF5F0 30%, #E8A89E 50%, #FFF5F0 70%, #C8847A 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: roseShimmer 5s linear infinite;
        }

        /* ── Section content (fades in after bubble expands) ── */
        .section-content {
          opacity: 0;
          animation: contentFadeIn 0.6s ease 0.4s forwards;
        }

        /* ── Hero headline entrance ── */
        .hero-h1 { animation: heroFadeIn 1s ease 0.2s both; }
        .hero-tag { animation: heroFadeIn 1s ease 0.5s both; }

        /* ── Section overlay clip-path transition ── */
        .section-overlay {
          transition: clip-path 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .section-overlay::-webkit-scrollbar { width: 4px; }
        .section-overlay::-webkit-scrollbar-track { background: #1A0828; }
        .section-overlay::-webkit-scrollbar-thumb {
          background: rgba(200,132,122,0.4);
          border-radius: 2px;
        }

        /* ── Fleet circle hover pulse ── */
        .fleet-circle { transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .fleet-circle:hover {
          transform: scale(1.04);
          box-shadow: 0 0 60px rgba(200,132,122,0.4) !important;
        }

        /* ── Input placeholders ── */
        input::placeholder, textarea::placeholder { color: rgba(192,168,184,0.5); }
      `}</style>

      <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>

        {/* ════════════════════ HERO BACKGROUND ════════════════════ */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury limousine"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Plum overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(26,8,40,0.65)",
          }} />
        </div>

        {/* ════════════════════ LOGO (top-center) ════════════════════ */}
        <div style={{
          position: "fixed",
          top: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 65,
          textAlign: "center",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}>
          <div style={{
            fontFamily: "var(--font-playfair)",
            fontSize: 18,
            fontWeight: 700,
            color: "#FFF5F0",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}>
            WIMBLEDON LIMOUSINES
          </div>
          <div style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, #C8847A, transparent)",
            marginTop: 6,
          }} />
        </div>

        {/* ════════════════════ HERO HEADLINE ════════════════════ */}
        {/* Fades away when a bubble is active */}
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          pointerEvents: "none",
          transition: "opacity 0.5s ease, transform 0.5s ease",
          opacity: activeBubble ? 0 : 1,
          transform: activeBubble ? "translateY(-12px)" : "translateY(0)",
        }}>
          <h1
            className="hero-h1"
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(80px, 8vw, 110px)",
              color: "#FFF5F0",
              margin: "0 0 20px",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Arrive With{" "}
            <span className="hero-distinction">Distinction</span>
          </h1>
          <p
            className="hero-tag"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: 18,
              fontWeight: 300,
              color: "#C0A8B8",
              letterSpacing: "0.06em",
              margin: 0,
            }}
          >
            London&rsquo;s premier chauffeur service
          </p>
        </div>

        {/* ════════════════════ FLOATING BUBBLES ════════════════════ */}
        {BUBBLES.map((bubble) => {
          const isActive = activeBubble === bubble.id;
          const hasActive = activeBubble !== null;
          const isMini = hasActive && !isActive;

          // When a bubble is active, assign other 4 to corner slots
          const nonActiveIndex = isMini
            ? BUBBLES.filter((b) => b.id !== activeBubble).indexOf(bubble)
            : -1;
          const cornerPos = nonActiveIndex >= 0 ? CORNER_POS[nonActiveIndex] : null;

          const size = isMini ? 64 : 160;
          const top = cornerPos ? cornerPos.top : bubble.top;
          const left = cornerPos ? cornerPos.left : bubble.left;

          return (
            <div
              key={bubble.id}
              className={isMini ? "bubble-mini" : "bubble-large"}
              onClick={() => { if (!isActive) openBubble(bubble.id); }}
              style={{
                position: "fixed",
                top,
                left,
                width: size,
                height: size,
                // Center the bubble on its top/left coordinate via negative margin
                marginLeft: -(size / 2),
                marginTop: -(size / 2),
                borderRadius: "50%",
                background: "rgba(45,10,78,0.85)",
                border: `2px solid ${isActive ? "transparent" : "#C8847A"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isActive ? "default" : "pointer",
                zIndex: hasActive ? 55 : 20,
                // Active bubble becomes invisible — the overlay takes over
                opacity: isActive ? 0 : 1,
                animationDelay: bubble.delay,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                // Smooth transition for all size/position changes
                transition:
                  "opacity 0.4s ease, width 0.5s ease, height 0.5s ease, " +
                  "top 0.5s ease, left 0.5s ease, margin 0.5s ease, border-color 0.3s ease",
              }}
            >
              <span style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: isMini ? 9 : 14,
                fontWeight: 500,
                color: "#C8847A",
                letterSpacing: isMini ? "0.1em" : "0.2em",
                textTransform: "uppercase",
                textAlign: "center",
                userSelect: "none",
                lineHeight: 1.3,
                transition: "font-size 0.3s ease",
              }}>
                {bubble.label}
              </span>
            </div>
          );
        })}

        {/* ════════════════════ SECTION OVERLAYS ════════════════════ */}
        {/*
          Each overlay sits full-screen but is clipped to a circle at the
          bubble's position. When a bubble is activated, clip-path expands
          from circle(0px) to circle(200%) — filling the entire screen.
          The clip origin matches the bubble's top/left percentages exactly
          because the hero is fixed full-screen (percentages = viewport %).
        */}
        {BUBBLES.map((bubble) => {
          const isActive = activeBubble === bubble.id;
          const clipOrigin = `${bubble.left} ${bubble.top}`;

          return (
            <div
              key={bubble.id}
              className="section-overlay"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 40,
                background: "linear-gradient(160deg, #2D0A4E 0%, #1A0828 55%, #220840 100%)",
                clipPath: isActive
                  ? `circle(200% at ${clipOrigin})`
                  : `circle(0px at ${clipOrigin})`,
                overflowY: isActive ? "auto" : "hidden",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {isActive && (
                <div className="section-content">
                  {bubble.id === "fleet"    && <FleetContent />}
                  {bubble.id === "services" && <ServicesContent />}
                  {bubble.id === "events"   && <EventsContent />}
                  {bubble.id === "about"    && <AboutContent />}
                  {bubble.id === "contact"  && <ContactContent />}
                </div>
              )}
            </div>
          );
        })}

        {/* ════════════════════ CLOSE BUTTON ════════════════════ */}
        {activeBubble && (
          <button
            onClick={closeBubble}
            style={{
              position: "fixed",
              top: 22,
              right: 28,
              zIndex: 70,
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(26,8,40,0.85)",
              border: "1px solid rgba(200,132,122,0.55)",
              color: "#C8847A",
              fontFamily: "var(--font-montserrat)",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              transition: "background 0.25s, color 0.25s, transform 0.25s",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "rgba(200,132,122,0.25)";
              btn.style.color = "#E8A89E";
              btn.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "rgba(26,8,40,0.85)";
              btn.style.color = "#C8847A";
              btn.style.transform = "scale(1)";
            }}
          >
            ✕
          </button>
        )}

      </div>
    </>
  );
}
