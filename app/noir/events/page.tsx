/* ─────────────────────────────────────────────────────────────────────────────
   WIMBLEDON LIMOUSINES — NOIR EVENTS PAGE
   Route: /noir/events
───────────────────────────────────────────────────────────────────────────── */

const EVENTS_STYLES = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes gridDrift {
    from { background-position: 0 0; }
    to   { background-position: 50px 50px; }
  }

  .evt-bg-grid {
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

  .event-card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    min-height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .event-card:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 32px 80px rgba(0,0,0,0.5);
  }

  .event-card-img {
    position: absolute;
    inset: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: transform 0.6s ease;
  }
  .event-card:hover .event-card-img {
    transform: scale(1.06);
  }

  .event-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.5) 50%, rgba(5,5,5,0.15) 100%);
    transition: background 0.4s ease;
  }
  .event-card:hover .event-card-overlay {
    background: linear-gradient(to top, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.6) 55%, rgba(5,5,5,0.2) 100%);
  }

  .event-card-content {
    position: relative;
    z-index: 2;
    padding: 28px;
  }

  .event-tag {
    display: inline-block;
    padding: 4px 12px;
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 600;
    border-radius: 2px;
    margin-bottom: 12px;
    font-family: var(--font-montserrat), sans-serif;
  }

  .event-title {
    font-family: var(--font-playfair), serif;
    color: #ffffff;
    font-size: 28px;
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: 6px;
  }

  .event-venue {
    font-family: var(--font-montserrat), sans-serif;
    font-size: 14px;
    color: rgba(200,214,229,0.6);
    letter-spacing: 0.08em;
    margin-bottom: 4px;
  }

  .event-dates {
    font-family: var(--font-montserrat), sans-serif;
    font-size: 12px;
    color: rgba(200,214,229,0.4);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .event-cta {
    font-family: var(--font-montserrat), sans-serif;
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 600;
    color: #00D4FF;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: gap 0.25s;
  }
  .event-card:hover .event-cta { gap: 10px; }

  .evt-fade-1 { animation: fadeSlideUp 0.75s ease-out 0.05s both; }
  .evt-fade-2 { animation: fadeSlideUp 0.75s ease-out 0.15s both; }
  .evt-fade-3 { animation: fadeSlideUp 0.75s ease-out 0.25s both; }
  .evt-fade-4 { animation: fadeSlideUp 0.75s ease-out 0.35s both; }
  .evt-fade-5 { animation: fadeSlideUp 0.75s ease-out 0.45s both; }
  .evt-fade-6 { animation: fadeSlideUp 0.75s ease-out 0.55s both; }

  .cyan-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,212,255,0.35), rgba(139,92,246,0.2), transparent);
  }
`;

// Using illustrative placeholder images from Unsplash for London events
const EVENTS = [
  {
    title: "Wimbledon Championships",
    venue: "All England Lawn Tennis Club, SW19",
    dates: "Late June – Mid July",
    tag: "Tennis",
    tagColor: "#00D4FF",
    tagBg: "rgba(0,212,255,0.1)",
    tagBorder: "rgba(0,212,255,0.3)",
    accent: "#00D4FF",
    img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80",
    desc: "The most prestigious tennis tournament in the world, right on our doorstep in SW19.",
    fade: "evt-fade-1",
  },
  {
    title: "Royal Ascot",
    venue: "Ascot Racecourse, Berkshire",
    dates: "Third Week of June",
    tag: "Racing",
    tagColor: "#C4A44A",
    tagBg: "rgba(196,164,74,0.1)",
    tagBorder: "rgba(196,164,74,0.3)",
    accent: "#C4A44A",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    desc: "Five days of the finest thoroughbred racing under Royal patronage. Hat boxes welcome.",
    fade: "evt-fade-2",
  },
  {
    title: "Glastonbury Festival",
    venue: "Worthy Farm, Pilton, Somerset",
    dates: "Late June",
    tag: "Music",
    tagColor: "#8B5CF6",
    tagBg: "rgba(139,92,246,0.1)",
    tagBorder: "rgba(139,92,246,0.3)",
    accent: "#8B5CF6",
    img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80",
    desc: "Arrive at the world's greatest music festival in comfort and style — without the queues.",
    fade: "evt-fade-3",
  },
  {
    title: "Notting Hill Carnival",
    venue: "Notting Hill, London W11",
    dates: "August Bank Holiday Weekend",
    tag: "Culture",
    tagColor: "#F59E0B",
    tagBg: "rgba(245,158,11,0.1)",
    tagBorder: "rgba(245,158,11,0.3)",
    accent: "#F59E0B",
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80",
    desc: "Europe's largest street festival. We navigate London so you can focus on the celebration.",
    fade: "evt-fade-4",
  },
  {
    title: "London Fashion Week",
    venue: "Various Venues, London",
    dates: "February & September",
    tag: "Fashion",
    tagColor: "#EC4899",
    tagBg: "rgba(236,72,153,0.1)",
    tagBorder: "rgba(236,72,153,0.3)",
    accent: "#EC4899",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
    desc: "A front row arrival deserves a front row vehicle. Discreet, punctual, impeccably presented.",
    fade: "evt-fade-5",
  },
  {
    title: "Chelsea Flower Show",
    venue: "Royal Hospital Chelsea, SW3",
    dates: "Late May",
    tag: "Garden",
    tagColor: "#34D399",
    tagBg: "rgba(52,211,153,0.1)",
    tagBorder: "rgba(52,211,153,0.3)",
    accent: "#34D399",
    img: "https://images.unsplash.com/photo-1490750967868-88df5691cc43?auto=format&fit=crop&w=800&q=80",
    desc: "The world's most celebrated horticultural show, held under Royal Horticultural Society patronage.",
    fade: "evt-fade-6",
  },
];

export default function EventsPage() {
  return (
    <>
      <style>{EVENTS_STYLES}</style>
      <div className="evt-bg-grid" />

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
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
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
                London Events
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
              ARRIVE IN STYLE
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
              From the Championships to Fashion Week, we transport discerning clients to London&apos;s most celebrated events with precision and grace.
            </p>
          </div>

          {/* Events grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: "24px",
            }}
          >
            {EVENTS.map((evt, i) => (
              <div key={i} className={`event-card ${evt.fade}`}>
                {/* Background image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="event-card-img" src={evt.img} alt={evt.title} />
                <div className="event-card-overlay" />

                {/* Content */}
                <div className="event-card-content">
                  {/* Tag */}
                  <div
                    className="event-tag"
                    style={{ color: evt.tagColor, background: evt.tagBg, border: `1px solid ${evt.tagBorder}` }}
                  >
                    {evt.tag}
                  </div>

                  {/* Title */}
                  <div className="event-title">{evt.title}</div>

                  {/* Venue */}
                  <div className="event-venue">{evt.venue}</div>

                  {/* Dates */}
                  <div className="event-dates">{evt.dates}</div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "16px",
                      color: "rgba(200,214,229,0.6)",
                      lineHeight: 1.6,
                      marginBottom: "20px",
                    }}
                  >
                    {evt.desc}
                  </p>

                  {/* CTA */}
                  <a href="/noir" className="event-cta" style={{ color: evt.accent }}>
                    Book Chauffeur <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom message */}
          <div style={{ textAlign: "center", marginTop: "80px" }}>
            <div className="cyan-divider" style={{ marginBottom: "40px" }} />
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "16px",
                color: "rgba(200,214,229,0.45)",
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0 auto 32px",
              }}
            >
              Don&apos;t see your event listed? We provide bespoke chauffeur services for any occasion across London and the Home Counties.
            </p>
            <a
              href="/noir/contact"
              style={{
                display: "inline-block",
                padding: "12px 36px",
                color: "#00D4FF",
                border: "1px solid rgba(0,212,255,0.4)",
                borderRadius: "2px",
                fontSize: "12px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                fontFamily: "var(--font-montserrat), sans-serif",
                textDecoration: "none",
                transition: "background 0.3s, box-shadow 0.3s",
              }}
            >
              Enquire About Your Event
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
