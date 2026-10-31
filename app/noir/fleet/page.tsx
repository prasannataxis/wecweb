/* ─────────────────────────────────────────────────────────────────────────────
   WIMBLEDON LIMOUSINES — NOIR FLEET PAGE
   Route: /noir/fleet
───────────────────────────────────────────────────────────────────────────── */

import Link from "next/link";

const FLEET_STYLES = `
  @property --ba {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  @keyframes borderRun {
    to { --ba: 360deg; }
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes gridDrift {
    from { background-position: 0 0; }
    to   { background-position: 50px 50px; }
  }

  .fleet-bg-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,212,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.018) 1px, transparent 1px);
    background-size: 52px 52px;
    animation: gridDrift 10s linear infinite;
    pointer-events: none;
    z-index: 0;
  }

  .fleet-card {
    position: relative;
    background: linear-gradient(160deg, #0E0E0E 0%, #0A0A0A 100%);
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.4s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.4s;
    border: 1px solid rgba(0,212,255,0.1);
  }
  .fleet-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 28px 72px rgba(0,212,255,0.14), 0 0 0 1px rgba(0,212,255,0.28);
  }

  /* Corner accent lines */
  .fleet-card::before,
  .fleet-card::after {
    content: '';
    position: absolute;
    top: 0;
    width: 28px;
    height: 28px;
    border-color: #00D4FF;
    border-style: solid;
    z-index: 10;
    pointer-events: none;
  }
  .fleet-card::before {
    left: 0;
    border-width: 2px 0 0 2px;
    border-radius: 6px 0 0 0;
  }
  .fleet-card::after {
    right: 0;
    border-width: 2px 2px 0 0;
    border-radius: 0 6px 0 0;
  }

  .fleet-card-img-wrap {
    position: relative;
    height: 220px;
    overflow: hidden;
  }
  .fleet-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 55%;
    transition: transform 0.6s ease;
  }
  .fleet-card:hover .fleet-card-img-wrap img {
    transform: scale(1.06);
  }
  .fleet-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.3) 50%, transparent 100%);
  }

  .request-btn {
    display: inline-block;
    padding: 10px 22px;
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 600;
    color: #00D4FF;
    border: 1px solid rgba(0,212,255,0.4);
    border-radius: 2px;
    background: transparent;
    cursor: pointer;
    transition: background 0.3s, box-shadow 0.3s, color 0.3s;
    font-family: var(--font-montserrat), sans-serif;
    text-decoration: none;
  }
  .request-btn:hover {
    background: rgba(0,212,255,0.1);
    box-shadow: 0 0 20px rgba(0,212,255,0.25);
    color: #ffffff;
  }

  .fleet-fade-1 { animation: fadeSlideUp 0.8s ease-out 0.1s both; }
  .fleet-fade-2 { animation: fadeSlideUp 0.8s ease-out 0.2s both; }
  .fleet-fade-3 { animation: fadeSlideUp 0.8s ease-out 0.3s both; }
  .fleet-fade-4 { animation: fadeSlideUp 0.8s ease-out 0.4s both; }
  .fleet-fade-5 { animation: fadeSlideUp 0.8s ease-out 0.5s both; }

  .cyan-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,212,255,0.35), rgba(139,92,246,0.2), transparent);
  }
`;

const FLEET = [
  {
    name: "Mercedes S-Class",
    category: "Executive Saloon",
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    passengers: "4 Passengers",
    luggage: "3 Items",
    features: ["Leather Interior", "Climate Control", "Wi-Fi", "Refreshments"],
    desc: "The pinnacle of executive travel. Whisper-quiet cabin, massage seats, ambient lighting and star-ceiling ambience.",
    accent: "#00D4FF",
    delay: "fleet-fade-1",
  },
  {
    name: "Bentley Continental GT",
    category: "Grand Tourer",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    passengers: "2+2 Passengers",
    luggage: "2 Items",
    features: ["Handcrafted Cabin", "Diamond Quilted", "Naim Audio", "626 bhp"],
    desc: "Hand-stitched leather, diamond-quilted seats and 626 bhp of effortless British power.",
    accent: "#8B5CF6",
    delay: "fleet-fade-2",
  },
  {
    name: "Range Rover Autobiography",
    category: "Luxury SUV",
    img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
    passengers: "4 Passengers",
    luggage: "4 Items",
    features: ["Panoramic Roof", "Heated Seats", "Air Suspension", "Privacy Glass"],
    desc: "Supreme commanding presence on the road. Ideal for families, VIP arrivals and countryside escapes.",
    accent: "#00D4FF",
    delay: "fleet-fade-3",
  },
  {
    name: "BMW 7 Series",
    category: "Business Saloon",
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    passengers: "4 Passengers",
    luggage: "3 Items",
    features: ["Executive Lounge", "iDrive 8", "Massage Seats", "Wireless Charging"],
    desc: "Cutting-edge technology meets refined German craftsmanship for the modern executive.",
    accent: "#8B5CF6",
    delay: "fleet-fade-4",
  },
  {
    name: "Rolls-Royce Ghost",
    category: "Ultra Luxury",
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
    passengers: "4 Passengers",
    luggage: "4 Items",
    features: ["Starlight Headliner", "Lambswool Carpets", "Bespoke Champagne", "Starlight Doors"],
    desc: "The whisper of effortless power. An alchemist's blend of silk, lambswool and open-pore walnut.",
    accent: "#C4A44A",
    delay: "fleet-fade-5",
  },
];

export default function FleetPage() {
  return (
    <>
      <style>{FLEET_STYLES}</style>
      <div className="fleet-bg-grid" />

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

          {/* Section heading */}
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
                Our Fleet
                <span style={{ height: "1px", width: "32px", background: "linear-gradient(270deg, #00D4FF, transparent)", display: "block" }} />
              </div>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                color: "#ffffff",
                fontSize: "clamp(48px, 6vw, 80px)",
                fontWeight: 700,
                marginBottom: "20px",
                lineHeight: 1.05,
              }}
            >
              THE FLEET
            </h1>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "16px",
                color: "rgba(200,214,229,0.55)",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              A curated selection of the world&apos;s finest automobiles, maintained to concours condition and delivered with exemplary service.
            </p>
          </div>

          {/* Fleet grid — responsive 1 → 2 → 3 cols */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "28px",
            }}
          >
            {FLEET.map((car, i) => (
              <div key={i} className={`fleet-card ${car.delay}`}>
                {/* Photo */}
                <div className="fleet-card-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={car.img} alt={car.name} />
                  <div className="fleet-img-overlay" />

                  {/* Category badge on image */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "14px",
                      left: "16px",
                      display: "inline-block",
                      padding: "4px 12px",
                      fontSize: "12px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: car.accent,
                      border: `1px solid ${car.accent}44`,
                      background: `${car.accent}14`,
                      borderRadius: "2px",
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontVariant: "small-caps",
                    }}
                  >
                    {car.category}
                  </div>
                </div>

                {/* Card content */}
                <div style={{ padding: "24px" }}>
                  {/* Name */}
                  <h2
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      color: "#ffffff",
                      fontSize: "24px",
                      fontWeight: 700,
                      marginBottom: "10px",
                      lineHeight: 1.2,
                    }}
                  >
                    {car.name}
                  </h2>

                  {/* Desc */}
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "16px",
                      color: "rgba(200,214,229,0.6)",
                      lineHeight: 1.65,
                      marginBottom: "18px",
                    }}
                  >
                    {car.desc}
                  </p>

                  {/* Specs row */}
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      marginBottom: "16px",
                      fontSize: "12px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(200,214,229,0.5)",
                      fontFamily: "var(--font-montserrat), sans-serif",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ color: car.accent }}>⊛</span> {car.passengers}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ color: car.accent }}>⊡</span> {car.luggage}
                    </span>
                  </div>

                  {/* Feature tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "22px" }}>
                    {car.features.map((f, fi) => (
                      <span
                        key={fi}
                        style={{
                          padding: "4px 10px",
                          fontSize: "12px",
                          letterSpacing: "0.08em",
                          color: "rgba(200,214,229,0.55)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          background: "rgba(255,255,255,0.03)",
                          borderRadius: "2px",
                          fontFamily: "var(--font-montserrat), sans-serif",
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="cyan-divider" style={{ marginBottom: "20px" }} />

                  {/* CTA */}
                  <Link href="/noir" className="request-btn">
                    Request Vehicle →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
