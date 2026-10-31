/* ─────────────────────────────────────────────────────────────────────────────
   WIMBLEDON LIMOUSINES — NOIR ABOUT PAGE
   Route: /noir/about  (Why Choose Us + Testimonials)
───────────────────────────────────────────────────────────────────────────── */

const ABOUT_STYLES = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes gridDrift {
    from { background-position: 0 0; }
    to   { background-position: 50px 50px; }
  }

  @keyframes neonPulse {
    0%, 100% { box-shadow: 0 0 6px rgba(0,212,255,0.35), 0 0 20px rgba(0,212,255,0.15); }
    50%       { box-shadow: 0 0 10px rgba(0,212,255,0.7), 0 0 36px rgba(0,212,255,0.3); }
  }

  .abt-bg-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,212,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.015) 1px, transparent 1px);
    background-size: 52px 52px;
    animation: gridDrift 12s linear infinite;
    pointer-events: none;
    z-index: 0;
  }

  .feature-card {
    position: relative;
    background: linear-gradient(155deg, #0D0D0D 0%, #0A0A0A 100%);
    border: 1px solid rgba(0,212,255,0.1);
    border-radius: 6px;
    padding: 36px 28px;
    transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    overflow: hidden;
  }
  .feature-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00D4FF, transparent);
    opacity: 0;
    transition: opacity 0.35s;
  }
  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 56px rgba(0,212,255,0.1);
    border-color: rgba(0,212,255,0.25);
  }
  .feature-card:hover::before { opacity: 1; }

  .feature-icon {
    width: 52px;
    height: 52px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,212,255,0.07);
    border: 1px solid rgba(0,212,255,0.2);
    font-size: 24px;
    margin-bottom: 20px;
    animation: neonPulse 3.5s ease-in-out infinite;
  }

  .testimonial-card {
    position: relative;
    background: linear-gradient(155deg, #0E0E0E 0%, #0B0B0B 100%);
    border: 1px solid rgba(0,212,255,0.12);
    border-radius: 6px;
    padding: 36px 32px;
    overflow: hidden;
    transition: transform 0.35s ease, box-shadow 0.35s ease;
  }
  .testimonial-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 56px rgba(0,212,255,0.1);
  }
  .testimonial-card::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-family: var(--font-playfair), serif;
    font-size: 120px;
    color: rgba(0,212,255,0.07);
    line-height: 1;
    pointer-events: none;
  }

  .star-rating {
    display: flex;
    gap: 4px;
    margin-bottom: 16px;
  }
  .star {
    color: #C4A44A;
    font-size: 16px;
  }

  .abt-fade-1  { animation: fadeSlideUp 0.75s ease-out 0.05s both; }
  .abt-fade-2  { animation: fadeSlideUp 0.75s ease-out 0.12s both; }
  .abt-fade-3  { animation: fadeSlideUp 0.75s ease-out 0.19s both; }
  .abt-fade-4  { animation: fadeSlideUp 0.75s ease-out 0.26s both; }
  .abt-fade-5  { animation: fadeSlideUp 0.75s ease-out 0.33s both; }
  .abt-fade-6  { animation: fadeSlideUp 0.75s ease-out 0.40s both; }
  .abt-fade-t1 { animation: fadeSlideUp 0.8s ease-out 0.1s both; }
  .abt-fade-t2 { animation: fadeSlideUp 0.8s ease-out 0.25s both; }
  .abt-fade-t3 { animation: fadeSlideUp 0.8s ease-out 0.4s both; }

  .cyan-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,212,255,0.35), rgba(139,92,246,0.2), transparent);
  }
`;

const FEATURES = [
  {
    icon: "⬡",
    title: "Professional Chauffeurs",
    body: "SIA-licensed, immaculately presented and trained to five-star hotel standards. Each driver undergoes extensive background checks and ongoing performance reviews.",
    fade: "abt-fade-1",
  },
  {
    icon: "✈",
    title: "Flight Monitoring",
    body: "We track every flight in real time. Delays don't cost you a penny — we adjust your pickup automatically and wait at no additional charge.",
    fade: "abt-fade-2",
  },
  {
    icon: "◈",
    title: "Instant Confirmation",
    body: "Booking confirmed within minutes. Vehicle details, chauffeur photo and real-time tracking sent straight to your phone via SMS and email.",
    fade: "abt-fade-3",
  },
  {
    icon: "✦",
    title: "Fleet of Excellence",
    body: "Every vehicle is maintained to concours standard. Full valet before each journey, in-car refreshments, phone chargers and Wi-Fi as standard.",
    fade: "abt-fade-4",
  },
  {
    icon: "⊛",
    title: "Fixed-Price Guarantee",
    body: "No surge pricing. No hidden fees. The price we quote is the price you pay — guaranteed in writing before you confirm your booking.",
    fade: "abt-fade-5",
  },
  {
    icon: "⊡",
    title: "15 Years Experience",
    body: "Founded in 2009, Wimbledon Limousines has transported royalty, heads of state and discerning travellers across London and beyond for over a decade.",
    fade: "abt-fade-6",
  },
];

const TESTIMONIALS = [
  {
    quote: "Exceptional service from start to finish. Our chauffeur met us at Heathrow with a name board, helped with every bag, and had chilled water waiting in the car. We felt like royalty. Will never use any other service.",
    author: "Lady S. Harrington",
    role: "Regular Client since 2018",
    initials: "SH",
    fade: "abt-fade-t1",
  },
  {
    quote: "I rely on Wimbledon Limousines for all my client transfers. They're the only chauffeur service I've found that combines genuine five-star presentation with absolute reliability. Not a single late arrival in four years.",
    author: "James Whitmore",
    role: "Managing Partner, Mayfair Capital",
    initials: "JW",
    fade: "abt-fade-t2",
  },
  {
    quote: "Our wedding day was perfect, in no small part thanks to this brilliant team. The Rolls-Royce Ghost was immaculate, the driver impeccably dressed, and they timed everything flawlessly. I can't recommend them highly enough.",
    author: "Arabella & Thomas Chen",
    role: "Wedding Client, 2024",
    initials: "AC",
    fade: "abt-fade-t3",
  },
];

export default function AboutPage() {
  return (
    <>
      <style>{ABOUT_STYLES}</style>
      <div className="abt-bg-grid" />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          background: "linear-gradient(180deg, #050505 0%, #080808 100%)",
          padding: "72px 0 96px",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* Intro heading */}
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
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
                Our Story
                <span style={{ height: "1px", width: "32px", background: "linear-gradient(270deg, #00D4FF, transparent)", display: "block" }} />
              </div>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                color: "#ffffff",
                fontSize: "clamp(48px, 6vw, 80px)",
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: "24px",
              }}
            >
              WHY CHOOSE US
            </h1>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "18px",
                color: "rgba(200,214,229,0.6)",
                maxWidth: "640px",
                margin: "0 auto",
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              Since 2009, we have been London&apos;s most trusted name in luxury chauffeur hire — combining the finest vehicles with an unwavering dedication to white-glove service.
            </p>
          </div>

          {/* Cyan divider */}
          <div className="cyan-divider" style={{ marginBottom: "72px" }} />

          {/* Why Choose Us grid — 6 features */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px",
              marginBottom: "96px",
            }}
          >
            {FEATURES.map((feat, i) => (
              <div key={i} className={`feature-card ${feat.fade}`}>
                <div className="feature-icon">{feat.icon}</div>
                <h2
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    color: "#ffffff",
                    fontSize: "24px",
                    fontWeight: 700,
                    marginBottom: "12px",
                    lineHeight: 1.2,
                  }}
                >
                  {feat.title}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "16px",
                    color: "rgba(200,214,229,0.6)",
                    lineHeight: 1.7,
                  }}
                >
                  {feat.body}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonials heading */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
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
                Client Testimonials
                <span style={{ height: "1px", width: "32px", background: "linear-gradient(270deg, #00D4FF, transparent)", display: "block" }} />
              </div>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                color: "#ffffff",
                fontSize: "clamp(48px, 5vw, 64px)",
                fontWeight: 700,
                lineHeight: 1.05,
              }}
            >
              WHAT CLIENTS SAY
            </h2>
          </div>

          {/* Testimonials grid — 3 cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "24px",
              marginBottom: "80px",
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`testimonial-card ${t.fade}`}>
                {/* Star rating */}
                <div className="star-rating">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <span key={si} className="star">★</span>
                  ))}
                </div>

                {/* Quote text */}
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "16px",
                    color: "rgba(200,214,229,0.75)",
                    lineHeight: 1.75,
                    marginBottom: "28px",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(0,212,255,0.15)", marginBottom: "20px" }} />

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #00D4FF22, #8B5CF622)",
                      border: "1px solid rgba(0,212,255,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-playfair), serif",
                      color: "#00D4FF",
                      fontSize: "14px",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        color: "#ffffff",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      {t.author}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "12px",
                        color: "rgba(200,214,229,0.4)",
                        letterSpacing: "0.08em",
                        marginTop: "2px",
                      }}
                    >
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Awards / trust signals */}
          <div className="cyan-divider" style={{ marginBottom: "48px" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "48px",
            }}
          >
            {["5,000+ Journeys Completed", "15+ Years in London", "Rated 5★ on Google", "SIA Licensed Drivers", "No Hidden Fees"].map((trust, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "12px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(200,214,229,0.45)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ color: "#00D4FF", fontSize: "14px" }}>✦</span>
                {trust}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
