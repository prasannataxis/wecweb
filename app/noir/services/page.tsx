/* ─────────────────────────────────────────────────────────────────────────────
   WIMBLEDON LIMOUSINES — NOIR SERVICES PAGE
   Route: /noir/services
───────────────────────────────────────────────────────────────────────────── */

const SERVICES_STYLES = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes gridDrift {
    from { background-position: 0 0; }
    to   { background-position: 50px 50px; }
  }

  @keyframes neonPulse {
    0%, 100% { box-shadow: 0 0 4px rgba(0,212,255,0.3), 0 0 16px rgba(0,212,255,0.15); }
    50%       { box-shadow: 0 0 8px rgba(0,212,255,0.7), 0 0 32px rgba(0,212,255,0.3); }
  }

  .srv-bg-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,212,255,0.016) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.016) 1px, transparent 1px);
    background-size: 52px 52px;
    animation: gridDrift 12s linear infinite;
    pointer-events: none;
    z-index: 0;
  }

  .service-card {
    position: relative;
    background: linear-gradient(155deg, #0D0D0D 0%, #0A0A0A 100%);
    border: 1px solid rgba(0,212,255,0.1);
    border-radius: 6px;
    padding: 40px 32px 36px;
    overflow: hidden;
    transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  }
  .service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 24px 64px rgba(0,212,255,0.12);
    border-color: rgba(0,212,255,0.3);
  }
  .service-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00D4FF, transparent);
    opacity: 0;
    transition: opacity 0.35s;
  }
  .service-card:hover::before { opacity: 1; }

  .service-numeral {
    font-family: var(--font-playfair), serif;
    font-size: 72px;
    font-weight: 800;
    line-height: 1;
    background: linear-gradient(135deg, rgba(0,212,255,0.35), rgba(139,92,246,0.25));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 16px;
    display: block;
  }

  .service-icon {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,212,255,0.08);
    border: 1px solid rgba(0,212,255,0.2);
    margin-bottom: 20px;
    font-size: 22px;
    animation: neonPulse 3s ease-in-out infinite;
  }

  .srv-fade-1 { animation: fadeSlideUp 0.75s ease-out 0.05s both; }
  .srv-fade-2 { animation: fadeSlideUp 0.75s ease-out 0.15s both; }
  .srv-fade-3 { animation: fadeSlideUp 0.75s ease-out 0.25s both; }
  .srv-fade-4 { animation: fadeSlideUp 0.75s ease-out 0.35s both; }
  .srv-fade-5 { animation: fadeSlideUp 0.75s ease-out 0.45s both; }
  .srv-fade-6 { animation: fadeSlideUp 0.75s ease-out 0.55s both; }

  .cyan-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,212,255,0.35), rgba(139,92,246,0.2), transparent);
  }
`;

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

const SERVICES = [
  {
    icon: "✈",
    title: "Airport Transfers",
    body: "Seamless collection from all major London airports — Heathrow, Gatwick, Stansted, Luton and London City. Flight tracking included as standard. Meet and greet in arrivals. No extra charge for delays.",
    tags: ["Meet & Greet", "Flight Tracking", "All Airports"],
    fade: "srv-fade-1",
  },
  {
    icon: "⬡",
    title: "Corporate Accounts",
    body: "Dedicated account management, consolidated monthly invoicing and a 24-hour priority line for your entire organisation. Discreet, professional and always on time.",
    tags: ["Monthly Invoicing", "Priority Line", "Account Manager"],
    fade: "srv-fade-2",
  },
  {
    icon: "◈",
    title: "Wedding Chauffeur",
    body: "Make your entrance truly unforgettable. Ribbons, white gloves and a choice of the finest vehicles in our fleet. We co-ordinate with your venue so every detail is perfect.",
    tags: ["Ribbons & Bows", "White Gloves", "Route Planning"],
    fade: "srv-fade-3",
  },
  {
    icon: "✦",
    title: "Events & Premieres",
    body: "Arrive at theatre openings, film premieres, award ceremonies and gala dinners in the manner they deserve. Our chauffeurs know London's event calendar intimately.",
    tags: ["Red Carpet", "BAFTA", "Royal Albert Hall"],
    fade: "srv-fade-4",
  },
  {
    icon: "⊛",
    title: "As Directed",
    body: "A chauffeur at your disposal for a full or half day. Shopping in Mayfair, meetings across the City, or a chauffeured tour of London — your schedule, our privilege.",
    tags: ["Half or Full Day", "Flexible Route", "Waiting Included"],
    fade: "srv-fade-5",
  },
  {
    icon: "⊡",
    title: "VIP Protection",
    body: "Close protection drivers combining advanced evasive driving with SIA-licensed security. Serving HNWIs, diplomats and high-profile clients requiring the highest level of discretion.",
    tags: ["SIA Licensed", "Evasive Driving", "Discreet"],
    fade: "srv-fade-6",
  },
];

export default function ServicesPage() {
  return (
    <>
      <style>{SERVICES_STYLES}</style>
      <div className="srv-bg-grid" />

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

          {/* Heading */}
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
                What We Offer
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
                marginBottom: "20px",
              }}
            >
              OUR SERVICES
            </h1>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "16px",
                color: "rgba(200,214,229,0.55)",
                maxWidth: "560px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Every journey is a statement. From airport transfers to bespoke full-day hire, we deliver white-glove service across every occasion.
            </p>
          </div>

          {/* Cyan divider */}
          <div className="cyan-divider" style={{ marginBottom: "72px" }} />

          {/* Services grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "24px",
            }}
          >
            {SERVICES.map((svc, i) => (
              <div key={i} className={`service-card ${svc.fade}`}>
                {/* Roman numeral */}
                <span className="service-numeral">{ROMAN[i]}</span>

                {/* Icon */}
                <div className="service-icon">{svc.icon}</div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    color: "#ffffff",
                    fontSize: "24px",
                    fontWeight: 700,
                    marginBottom: "14px",
                    lineHeight: 1.2,
                  }}
                >
                  {svc.title}
                </h2>

                {/* Body */}
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "16px",
                    color: "rgba(200,214,229,0.6)",
                    lineHeight: 1.7,
                    marginBottom: "22px",
                  }}
                >
                  {svc.body}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {svc.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      style={{
                        padding: "4px 12px",
                        fontSize: "12px",
                        letterSpacing: "0.1em",
                        color: "#00D4FF",
                        border: "1px solid rgba(0,212,255,0.25)",
                        background: "rgba(0,212,255,0.06)",
                        borderRadius: "2px",
                        fontFamily: "var(--font-montserrat), sans-serif",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: "center", marginTop: "80px" }}>
            <div className="cyan-divider" style={{ marginBottom: "48px" }} />
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "16px",
                color: "rgba(200,214,229,0.5)",
                marginBottom: "28px",
              }}
            >
              Ready to experience London at its finest?
            </p>
            <a
              href="/noir"
              style={{
                display: "inline-block",
                padding: "14px 40px",
                background: "linear-gradient(135deg, #00D4FF 0%, #0099BB 60%, #006688 100%)",
                color: "#000000",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                borderRadius: "2px",
                textDecoration: "none",
                fontFamily: "var(--font-montserrat), sans-serif",
                transition: "filter 0.3s",
              }}
            >
              Book Your Journey →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
