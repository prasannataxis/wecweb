"use client";
import { useState, useCallback, useEffect, useRef } from "react";

type Section = 'home' | 'fleet' | 'services' | 'events' | 'about' | 'contact';
type Phase = 'idle' | 'out' | 'in';
type Direction = 'next' | 'prev';

/* ─── DATA ─── */
const FLEET = [
  {
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    name: "Mercedes-Benz S-Class",
    category: "Executive Saloon",
    passengers: 4, luggage: 3,
    features: ["Massage Seats", "Panoramic Roof", "Champagne Bar"],
  },
  {
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    name: "Bentley Continental GT",
    category: "Grand Tourer",
    passengers: 2, luggage: 2,
    features: ["Soft-Close Doors", "Rear Camera", "Heated Seats"],
  },
  {
    img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    name: "Range Rover LWB",
    category: "Premium SUV",
    passengers: 4, luggage: 4,
    features: ["All-Terrain Capability", "Raised Seating", "Privacy Glass"],
  },
  {
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    name: "BMW 7 Series",
    category: "Executive Saloon",
    passengers: 4, luggage: 3,
    features: ["Rear Entertainment", "Ambient Lighting", "Head-Up Display"],
  },
  {
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    name: "Rolls-Royce Ghost",
    category: "Ultra-Luxury",
    passengers: 4, luggage: 3,
    features: ["Starlight Headliner", "Bespoke Audio", "Picnic Tables"],
  },
];

const SERVICES = [
  {
    numeral: "I",
    name: "Airport Transfers",
    desc: "Seamless, stress-free journeys to and from all major London airports. Our chauffeurs monitor your flight in real time — if you land early or late, we are there. Meet-and-greet, luggage assistance, and a chilled refreshment await.",
    features: ["Heathrow, Gatwick, Stansted & City", "Flight tracking included", "Meet & greet service", "24/7 availability"],
    bg: "#FAF6EF",
  },
  {
    numeral: "II",
    name: "Corporate Accounts",
    desc: "Bespoke travel management for businesses of every scale. A dedicated account manager, consolidated monthly billing, and priority dispatch ensure your executives are never kept waiting.",
    features: ["Dedicated account manager", "Priority dispatch", "Monthly invoicing", "Confidential & discreet"],
    bg: "#F2EDE5",
  },
  {
    numeral: "III",
    name: "Wedding Hire",
    desc: "Make your arrival unforgettable. Beautifully decorated vehicles, red-carpet presentation, and a chauffeur immaculately attired — because every detail of your wedding day matters.",
    features: ["Decorated vehicles", "Red carpet arrival", "Ribbon & bow dressing", "Complimentary champagne"],
    bg: "#FAF6EF",
  },
  {
    numeral: "IV",
    name: "Event Chauffeur",
    desc: "Wimbledon, Ascot, Glyndebourne, The Proms — arrive in consummate style, trusted by London's most discerning for the occasions that matter most.",
    features: ["Priority routing", "Venue door pickup", "Timing precision", "Advance route planning"],
    bg: "#F2EDE5",
  },
  {
    numeral: "V",
    name: "As Directed",
    desc: "Your chauffeur, your schedule. Whether shopping on Bond Street, dining in Mayfair, or conducting a series of meetings across the City — we wait, we drive, we serve.",
    features: ["Hourly or full-day hire", "Flexible itinerary", "Multiple stops", "Concierge assistance"],
    bg: "#FAF6EF",
  },
  {
    numeral: "VI",
    name: "VIP Protection",
    desc: "Discrete, professional close-protection transport for high-profile individuals. Working alongside security teams or independently, our vetted drivers prioritise your safety above all.",
    features: ["Vetted, licensed drivers", "Armoured options available", "Works with security teams", "Absolute discretion"],
    bg: "#F2EDE5",
  },
];

const EVENTS = [
  {
    name: "Royal Ascot",
    venue: "Ascot Racecourse, Berkshire",
    date: "June 2025",
    desc: "Arrive at the Royal Enclosure as befits the occasion. We handle every detail — timing, routing, and the quiet confidence that only comes from fifteen years of Ascot experience.",
  },
  {
    name: "Wimbledon Championships",
    venue: "All England Club, SW19",
    date: "July 2025",
    desc: "Navigate the Championships effortlessly. Priority routes, Centre Court timing, and post-match transfers ensure you focus entirely on the tennis.",
  },
  {
    name: "Glyndebourne Opera",
    venue: "Glyndebourne, East Sussex",
    date: "May–August 2025",
    desc: "The journey is part of the occasion. A Bentley to the Sussex countryside, champagne en route, and a chauffeur who knows the estate as well as the programme.",
  },
  {
    name: "Chelsea Flower Show",
    venue: "Royal Hospital Chelsea, SW3",
    date: "May 2025",
    desc: "Unhurried luxury for the RHS's most prestigious event. Kerbside drop at the main gate, collection at any hour, and a day entirely your own.",
  },
  {
    name: "Goodwood Festival of Speed",
    venue: "Goodwood Estate, West Sussex",
    date: "July 2025",
    desc: "The finest celebration of motoring arriving in the finest manner. Our chauffeurs know every back route and parking arrangement that avoids the crowds.",
  },
  {
    name: "The Lord's Test",
    venue: "Lord's Cricket Ground, NW8",
    date: "August 2025",
    desc: "Lunch in the pavilion, play on the field, and a flawless transfer at close of play. Lord's Test cricket served by London's premier chauffeur.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Quite simply the finest chauffeur service I have encountered in twenty years of London travel. An exemplary standard in every regard.",
    author: "Sir James Caldwell",
    title: "Senior Partner, Clifford Chance",
  },
  {
    quote: "The Bentley arrived with four minutes to spare. The chauffeur was dressed immaculately and knew precisely which entrance to use. Nothing short of perfect.",
    author: "Lady Eleanor Ashworth",
    title: "Guest, Royal Ascot",
  },
  {
    quote: "Our entire executive team relies on Wimbledon Limousines for transfers. Consistent, discreet, dependable — everything one needs.",
    author: "Charlotte Hayes",
    title: "Head of Operations, KPMG UK",
  },
];

/* ─── STYLES ─── */
const STYLES = `
  @keyframes goldLeafShimmer {
    0%   { background-position: -300% center; }
    100% { background-position:  300% center; }
  }
  @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fadeUp  { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideOutLeft  { from { transform: translateX(0); }     to { transform: translateX(-100%); } }
  @keyframes slideInRight  { from { transform: translateX(100%); }  to { transform: translateX(0); } }
  @keyframes slideOutRight { from { transform: translateX(0); }     to { transform: translateX(100%); } }
  @keyframes slideInLeft   { from { transform: translateX(-100%); } to { transform: translateX(0); } }

  /* Gallery title */
  .gallery-title {
    font-family: var(--font-playfair, 'Playfair Display'), serif;
    font-size: clamp(56px, 5vw, 80px);
    font-weight: 700; color: #0A1628; line-height: 1.05; letter-spacing: -0.01em;
  }

  /* Hero headline */
  .hero-line-1 {
    font-family: var(--font-playfair, 'Playfair Display'), serif;
    font-size: clamp(80px, 7vw, 110px); font-weight: 800;
    line-height: 0.92; letter-spacing: -0.01em; color: #0A1628; display: block;
  }
  .hero-line-2 {
    font-family: var(--font-playfair, 'Playfair Display'), serif;
    font-size: clamp(80px, 7vw, 110px); font-weight: 800; font-style: italic;
    line-height: 0.95; letter-spacing: -0.01em; display: block;
    background: linear-gradient(90deg, #9A7820 0%, #C4A44A 18%, #F0D885 34%, #C4A44A 50%, #9A7820 66%, #C4A44A 82%, #9A7820 100%);
    background-size: 300% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: goldLeafShimmer 7s linear infinite;
  }

  /* Service numeral */
  .service-numeral {
    font-family: var(--font-playfair, 'Playfair Display'), serif;
    font-size: 120px; font-weight: 700; font-style: italic; line-height: 0.85;
    background: linear-gradient(135deg, #9A7820, #C4A44A);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    display: block; margin-bottom: 12px;
  }

  /* Phone gold gradient */
  .phone-gold {
    font-family: var(--font-playfair, 'Playfair Display'), serif;
    font-size: clamp(40px, 4vw, 56px); font-weight: 700;
    background: linear-gradient(135deg, #9A7820, #C4A44A);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    letter-spacing: 0.02em; display: block;
  }

  /* Nav tab */
  .nav-tab {
    position: relative;
    font-family: var(--font-montserrat, 'Montserrat'), sans-serif;
    font-size: 14px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
    color: #8A8278; background: none; border: none; cursor: pointer; padding: 4px 0 8px;
    transition: color 0.25s;
  }
  .nav-tab::after {
    content: ''; position: absolute; bottom: 0; left: 0;
    width: 0; height: 3px;
    background: linear-gradient(90deg, #9A7820, #C4A44A);
    transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .nav-tab:hover { color: #0A1628; }
  .nav-tab.active { color: #0A1628; font-weight: 700; }
  .nav-tab.active::after { width: 100%; }

  /* Arrow button */
  .arrow-btn {
    width: 52px; height: 52px; display: flex; align-items: center; justify-content: center;
    background: #FFFFFF; border: 1px solid rgba(10,22,40,0.15); color: #0A1628; font-size: 22px;
    cursor: pointer; border-radius: 2px; flex-shrink: 0;
    transition: transform 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 2px 8px rgba(10,22,40,0.06);
    font-family: var(--font-montserrat, 'Montserrat'), sans-serif;
  }
  .arrow-btn:hover {
    transform: scale(1.15); color: #9A7820;
    border-color: #C4A44A; box-shadow: 0 4px 16px rgba(154,120,32,0.2);
  }

  /* Buttons */
  .book-now-btn {
    padding: 10px 24px; background: #0A1628; color: #FFFFFF;
    font-family: var(--font-montserrat, 'Montserrat'), sans-serif;
    font-size: 13px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
    border: none; cursor: pointer; border-radius: 2px; transition: background 0.25s;
  }
  .book-now-btn:hover { background: rgba(10,22,40,0.8); }

  .gold-btn {
    padding: 15px 36px;
    background: linear-gradient(135deg, #9A7820 0%, #C4A44A 50%, #9A7820 100%);
    background-size: 200% auto; color: #FFFFFF;
    font-family: var(--font-montserrat, 'Montserrat'), sans-serif;
    font-size: 12px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    border: none; cursor: pointer; border-radius: 2px;
    transition: filter 0.3s, transform 0.2s, box-shadow 0.3s;
  }
  .gold-btn:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 4px 20px rgba(154,120,32,0.3); }

  .navy-outline-btn {
    padding: 14px 32px; background: transparent; border: 1px solid #0A1628; color: #0A1628;
    font-family: var(--font-montserrat, 'Montserrat'), sans-serif;
    font-size: 12px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
    cursor: pointer; border-radius: 2px; transition: background 0.25s, color 0.25s;
  }
  .navy-outline-btn:hover { background: #0A1628; color: #FFFFFF; }

  .request-btn {
    padding: 14px 32px; background: transparent; border: 1px solid #0A1628; color: #0A1628;
    font-family: var(--font-montserrat, 'Montserrat'), sans-serif;
    font-size: 12px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
    cursor: pointer; border-radius: 2px; transition: background 0.25s, color 0.25s; align-self: flex-start;
  }
  .request-btn:hover { background: #0A1628; color: #FFFFFF; }

  /* Form fields */
  .booking-field {
    width: 100%; padding: 13px 16px; background: #FFFFFF;
    border: 1px solid rgba(10,22,40,0.15); color: #0A1628;
    font-family: var(--font-montserrat, 'Montserrat'), sans-serif;
    font-size: 16px; outline: none; border-radius: 2px;
    transition: border-color 0.25s, box-shadow 0.25s;
  }
  .booking-field::placeholder { color: rgba(10,22,40,0.35); }
  .booking-field:focus { border-color: rgba(10,22,40,0.4); box-shadow: 0 0 0 3px rgba(10,22,40,0.06); }
  .booking-field option { background: #FFFFFF; color: #0A1628; }

  .contact-field {
    width: 100%; padding: 14px 16px; background: #FFFFFF;
    border: 1px solid rgba(10,22,40,0.15); color: #0A1628;
    font-family: var(--font-montserrat, 'Montserrat'), sans-serif;
    font-size: 16px; outline: none; border-radius: 2px;
    transition: border-color 0.25s, box-shadow 0.25s;
  }
  .contact-field::placeholder { color: rgba(10,22,40,0.35); }
  .contact-field:focus { border-color: rgba(10,22,40,0.4); box-shadow: 0 0 0 3px rgba(10,22,40,0.05); }

  /* Utilities */
  .gold-rule { width: 40px; height: 1px; background: linear-gradient(90deg, #9A7820, #C4A44A); display: block; }
  .section-heading {
    font-family: var(--font-playfair, 'Playfair Display'), serif;
    font-size: clamp(48px, 5vw, 64px); font-weight: 700; color: #0A1628; line-height: 1.05; letter-spacing: -0.01em;
  }
  .ivory-scroll::-webkit-scrollbar { width: 4px; }
  .ivory-scroll::-webkit-scrollbar-track { background: #F5F0E8; }
  .ivory-scroll::-webkit-scrollbar-thumb { background: rgba(10,22,40,0.2); border-radius: 4px; }

  /* Slide animation classes */
  .slide-out-left  { animation: slideOutLeft  0.45s ease forwards; }
  .slide-in-right  { animation: slideInRight  0.45s ease forwards; }
  .slide-out-right { animation: slideOutRight 0.45s ease forwards; }
  .slide-in-left   { animation: slideInLeft   0.45s ease forwards; }
  .section-fade    { animation: fadeIn 0.4s ease both; }

  /* Stagger fade-up */
  .fu1 { animation: fadeUp 0.8s ease-out 0.05s both; }
  .fu2 { animation: fadeUp 0.8s ease-out 0.2s  both; }
  .fu3 { animation: fadeUp 0.8s ease-out 0.35s both; }
  .fu4 { animation: fadeUp 0.8s ease-out 0.5s  both; }
  .fu5 { animation: fadeUp 0.8s ease-out 0.65s both; }
`;

/* ─── HOOK ─── */
function useGalleryNav(total: number) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [direction, setDirection] = useState<Direction>('next');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const navigate = useCallback((dir: Direction) => {
    if (phase !== 'idle') return;
    setDirection(dir);
    setPhase('out');
    const t1 = setTimeout(() => {
      setIndex(prev => dir === 'next' ? (prev + 1) % total : (prev - 1 + total) % total);
      setPhase('in');
    }, 225);
    const t2 = setTimeout(() => setPhase('idle'), 450);
    timers.current.push(t1, t2);
  }, [phase, total]);

  const animClass =
    phase === 'out' && direction === 'next' ? 'slide-out-left'  :
    phase === 'out' && direction === 'prev' ? 'slide-out-right' :
    phase === 'in'  && direction === 'next' ? 'slide-in-right'  :
    phase === 'in'  && direction === 'prev' ? 'slide-in-left'   : '';

  return { index, navigate, animClass };
}

/* ─── NAV ARROWS ─── */
function NavArrows({ onPrev, onNext, current, total }: {
  onPrev: () => void; onNext: () => void; current: number; total: number;
}) {
  return (
    <div style={{
      position: 'fixed', bottom: '36px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 40, display: 'flex', alignItems: 'center', gap: '20px',
      background: 'rgba(250,246,239,0.9)', backdropFilter: 'blur(8px)',
      padding: '12px 20px', borderRadius: '4px',
      boxShadow: '0 2px 20px rgba(10,22,40,0.12)',
    }}>
      <button className="arrow-btn" onClick={onPrev} aria-label="Previous">←</button>
      <span style={{
        fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
        fontSize: '15px', fontWeight: 600, letterSpacing: '0.1em',
        color: '#0A1628', minWidth: '54px', textAlign: 'center',
      }}>
        {current + 1} / {total}
      </span>
      <button className="arrow-btn" onClick={onNext} aria-label="Next">→</button>
    </div>
  );
}

/* ─── FLEET VIEW ─── */
function FleetView({ nav, onContact }: { nav: ReturnType<typeof useGalleryNav>; onContact: () => void }) {
  const car = FLEET[nav.index];
  return (
    <div style={{ height: 'calc(100vh - 72px)', overflow: 'hidden', position: 'relative' }}>
      <div key={nav.index} className={nav.animClass} style={{ display: 'flex', height: '100%' }}>
        {/* Photo: left 60% */}
        <div style={{ width: '60%', position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
          <img
            src={car.img} alt={car.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
          {/* Blend edge into ivory panel */}
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '180px',
            background: 'linear-gradient(to right, transparent, rgba(250,246,239,0.55))',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Right details panel: ivory */}
        <div className="ivory-scroll" style={{
          flex: 1, background: '#FAF6EF', padding: '60px',
          overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <p style={{
            fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
            fontSize: '13px', fontWeight: 600, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: '#C4A44A', marginBottom: '16px',
          }}>
            {car.category}
          </p>
          <h2 className="gallery-title" style={{ marginBottom: '20px' }}>{car.name}</h2>
          <span className="gold-rule" style={{ marginBottom: '32px' }} />

          {/* Specs */}
          <div style={{ display: 'flex', gap: '36px', marginBottom: '36px', alignItems: 'flex-start' }}>
            {[
              { label: 'Passengers', value: car.passengers },
              { label: 'Luggage', value: car.luggage },
            ].map((spec, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{
                  fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
                  fontSize: '13px', fontWeight: 600, letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: '#8A8278',
                }}>
                  {spec.label}
                </span>
                <span style={{
                  fontFamily: "var(--font-playfair, 'Playfair Display'), serif",
                  fontSize: '36px', fontWeight: 700, color: '#0A1628', lineHeight: 1,
                }}>
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{
              fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
              fontSize: '13px', fontWeight: 600, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#8A8278', marginBottom: '14px',
            }}>
              Features
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {car.features.map((f, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
                  fontSize: '18px', color: '#0A1628',
                }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #9A7820, #C4A44A)', flexShrink: 0,
                  }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <button className="request-btn" onClick={onContact}>Request This Vehicle</button>
        </div>
      </div>
      <NavArrows onPrev={() => nav.navigate('prev')} onNext={() => nav.navigate('next')} current={nav.index} total={FLEET.length} />
    </div>
  );
}

/* ─── SERVICES VIEW ─── */
function ServicesView({ nav }: { nav: ReturnType<typeof useGalleryNav> }) {
  const svc = SERVICES[nav.index];
  return (
    <div style={{ height: 'calc(100vh - 72px)', overflow: 'hidden', position: 'relative' }}>
      <div key={nav.index} className={nav.animClass} style={{ height: '100%', background: svc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 80px' }}>
        <div style={{ maxWidth: '860px', width: '100%' }}>
          <span className="service-numeral">{svc.numeral}</span>
          <h2 className="gallery-title" style={{ marginBottom: '24px' }}>{svc.name}</h2>
          <p style={{
            fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
            fontSize: '20px', color: '#8A8278', lineHeight: 1.75,
            marginBottom: '36px', maxWidth: '680px',
          }}>
            {svc.desc}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {svc.features.map((f, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
                fontSize: '18px', color: '#0A1628',
              }}>
                <span style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, #9A7820, #C4A44A)', flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <NavArrows onPrev={() => nav.navigate('prev')} onNext={() => nav.navigate('next')} current={nav.index} total={SERVICES.length} />
    </div>
  );
}

/* ─── EVENTS VIEW ─── */
function EventsView({ nav }: { nav: ReturnType<typeof useGalleryNav> }) {
  const ev = EVENTS[nav.index];
  return (
    <div style={{ height: 'calc(100vh - 72px)', overflow: 'hidden', position: 'relative' }}>
      <div key={nav.index} className={nav.animClass} style={{ height: '100%', background: '#FAF6EF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 80px' }}>
        <div style={{ maxWidth: '860px', width: '100%', borderLeft: '4px solid #C4A44A', paddingLeft: '52px' }}>
          <p style={{
            fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
            fontSize: '13px', fontWeight: 600, letterSpacing: '0.26em',
            textTransform: 'uppercase', color: '#9A7820', marginBottom: '16px',
          }}>
            London Events
          </p>
          <h2 className="gallery-title" style={{ marginBottom: '10px' }}>{ev.name}</h2>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '28px' }}>
            <span style={{
              fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
              fontSize: '18px', color: '#8A8278',
            }}>
              {ev.venue}
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#C4A44A', flexShrink: 0 }} />
            <span style={{
              fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
              fontSize: '18px', fontWeight: 500, color: '#C4A44A',
            }}>
              {ev.date}
            </span>
          </div>
          <p style={{
            fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
            fontSize: '20px', color: '#8A8278', lineHeight: 1.75,
            marginBottom: '40px', maxWidth: '640px',
          }}>
            {ev.desc}
          </p>
          <button className="navy-outline-btn">Enquire About This Event</button>
        </div>
      </div>
      <NavArrows onPrev={() => nav.navigate('prev')} onNext={() => nav.navigate('next')} current={nav.index} total={EVENTS.length} />
    </div>
  );
}

/* ─── ABOUT VIEW ─── */
function AboutView() {
  const [tIdx, setTIdx] = useState(0);
  const [tPhase, setTPhase] = useState<Phase>('idle');
  const [tDir, setTDir] = useState<Direction>('next');
  const tTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => tTimers.current.forEach(clearTimeout), []);

  const navigateTestim = (dir: Direction) => {
    if (tPhase !== 'idle') return;
    setTDir(dir);
    setTPhase('out');
    const t1 = setTimeout(() => {
      setTIdx(prev => dir === 'next' ? (prev + 1) % TESTIMONIALS.length : (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      setTPhase('in');
    }, 225);
    const t2 = setTimeout(() => setTPhase('idle'), 450);
    tTimers.current.push(t1, t2);
  };

  const tAnim =
    tPhase === 'out' && tDir === 'next' ? 'slide-out-left'  :
    tPhase === 'out' && tDir === 'prev' ? 'slide-out-right' :
    tPhase === 'in'  && tDir === 'next' ? 'slide-in-right'  :
    tPhase === 'in'  && tDir === 'prev' ? 'slide-in-left'   : '';

  const t = TESTIMONIALS[tIdx];

  return (
    <div className="ivory-scroll section-fade" style={{
      minHeight: 'calc(100vh - 72px)', background: '#FAF6EF',
      overflowY: 'auto', paddingBottom: '96px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px 0' }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{
            fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
            fontSize: '13px', fontWeight: 600, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: '#9A7820', marginBottom: '14px',
          }}>
            Est. London, 2009
          </p>
          <h2 className="section-heading" style={{ marginBottom: '16px' }}>Why Choose Us</h2>
          <span className="gold-rule" style={{ margin: '0 auto' }} />
        </div>

        {/* 3 pillars */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '28px', marginBottom: '96px',
        }}>
          {[
            { num: '01', title: 'Punctuality', desc: 'We monitor flights, track traffic, and plan every route meticulously. In fifteen years, we have never left a client waiting.' },
            { num: '02', title: 'Discretion', desc: 'Your journeys, conversations, and companions are held in complete confidence. Our chauffeurs are professionals in every sense.' },
            { num: '03', title: 'Presentation', desc: 'Every vehicle maintained to concours condition. Every chauffeur presented to the same uncompromising standard, every time.' },
          ].map((item, i) => (
            <div key={i} style={{
              background: '#FFFFFF', padding: '40px 36px', borderRadius: '4px',
              boxShadow: '0 2px 16px rgba(10,22,40,0.06)',
            }}>
              <div style={{
                fontFamily: "var(--font-playfair, 'Playfair Display'), serif",
                fontSize: '48px', fontWeight: 700, color: 'rgba(154,120,32,0.2)',
                lineHeight: 1, marginBottom: '16px',
              }}>
                {item.num}
              </div>
              <h3 style={{
                fontFamily: "var(--font-playfair, 'Playfair Display'), serif",
                fontSize: '28px', fontWeight: 700, color: '#0A1628', marginBottom: '14px',
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
                fontSize: '18px', color: '#8A8278', lineHeight: 1.7,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{
              fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
              fontSize: '13px', fontWeight: 600, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: '#9A7820', marginBottom: '14px',
            }}>
              Client Words
            </p>
            <h2 className="section-heading">Testimonials</h2>
          </div>

          <div style={{ overflow: 'hidden', marginBottom: '28px' }}>
            <div key={tIdx} className={tAnim} style={{
              background: '#FFFFFF', padding: '48px 56px', borderRadius: '4px',
              boxShadow: '0 2px 16px rgba(10,22,40,0.07)', maxWidth: '780px', margin: '0 auto',
            }}>
              <div style={{
                fontFamily: "var(--font-playfair, 'Playfair Display'), serif",
                fontSize: '60px', color: '#C4A44A', lineHeight: 0.7, marginBottom: '20px',
              }}>
                &ldquo;
              </div>
              <p style={{
                fontFamily: "var(--font-playfair, 'Playfair Display'), serif",
                fontSize: '20px', color: '#0A1628', lineHeight: 1.65,
                fontStyle: 'italic', marginBottom: '28px',
              }}>
                {t.quote}
              </p>
              <div style={{ borderTop: '1px solid rgba(10,22,40,0.08)', paddingTop: '20px' }}>
                <div style={{
                  fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
                  fontSize: '15px', fontWeight: 600, color: '#0A1628',
                }}>
                  {t.author}
                </div>
                <div style={{
                  fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
                  fontSize: '13px', color: '#8A8278', marginTop: '4px',
                }}>
                  {t.title}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
            <button className="arrow-btn" style={{ width: '42px', height: '42px', fontSize: '18px' }} onClick={() => navigateTestim('prev')}>←</button>
            <span style={{
              fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
              fontSize: '13px', fontWeight: 600, color: '#8A8278',
            }}>
              {tIdx + 1} / {TESTIMONIALS.length}
            </span>
            <button className="arrow-btn" style={{ width: '42px', height: '42px', fontSize: '18px' }} onClick={() => navigateTestim('next')}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CONTACT VIEW ─── */
function ContactView() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="ivory-scroll section-fade" style={{
      minHeight: 'calc(100vh - 72px)', background: '#FAF6EF',
      overflowY: 'auto', paddingBottom: '96px',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 48px 0' }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{
            fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
            fontSize: '13px', fontWeight: 600, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: '#9A7820', marginBottom: '14px',
          }}>
            Get in Touch
          </p>
          <h2 className="section-heading" style={{ marginBottom: '20px' }}>Contact</h2>
          <span className="gold-rule" style={{ margin: '0 auto 28px' }} />
          <span className="phone-gold">+44 20 8946 0000</span>
          <p style={{
            fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
            fontSize: '18px', color: '#8A8278', marginTop: '8px',
          }}>
            24 hours, 7 days a week
          </p>
        </div>

        {/* Info cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px', marginBottom: '48px',
        }}>
          {[
            { label: 'Telephone', value: '+44 20 8946 0000', sub: '24 hours, 7 days' },
            { label: 'Email', value: 'reservations@wimbledonlimousines.co.uk', sub: 'Reply within 2 hours' },
            { label: 'Address', value: 'Wimbledon, London SW19', sub: 'Greater London & beyond' },
          ].map((c, i) => (
            <div key={i} style={{
              background: '#FFFFFF', padding: '28px 22px', borderRadius: '4px',
              boxShadow: '0 2px 12px rgba(10,22,40,0.06)', textAlign: 'center',
            }}>
              <div style={{
                fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
                fontSize: '12px', fontWeight: 600, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: '#9A7820', marginBottom: '10px',
              }}>
                {c.label}
              </div>
              <div style={{
                fontFamily: "var(--font-playfair, 'Playfair Display'), serif",
                fontSize: '15px', fontWeight: 600, color: '#0A1628',
                marginBottom: '6px', wordBreak: 'break-word',
              }}>
                {c.value}
              </div>
              <div style={{
                fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
                fontSize: '13px', color: '#8A8278',
              }}>
                {c.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{
          background: '#FFFFFF', padding: '48px', borderRadius: '4px',
          boxShadow: '0 2px 16px rgba(10,22,40,0.07)',
        }}>
          <h3 style={{
            fontFamily: "var(--font-playfair, 'Playfair Display'), serif",
            fontSize: '28px', fontWeight: 700, color: '#0A1628', marginBottom: '32px',
          }}>
            Send an Enquiry
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            {([
              { name: 'name', label: 'Full Name', placeholder: 'Your name', type: 'text' },
              { name: 'email', label: 'Email Address', placeholder: 'your@email.com', type: 'email' },
            ] as const).map(({ name, label, placeholder, type }) => (
              <div key={name}>
                <label style={{
                  display: 'block',
                  fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
                  fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#8A8278', marginBottom: '8px',
                }}>
                  {label}
                </label>
                <input type={type} name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} className="contact-field" />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
              fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#8A8278', marginBottom: '8px',
            }}>
              Phone (optional)
            </label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+44..." className="contact-field" />
          </div>
          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'block',
              fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
              fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#8A8278', marginBottom: '8px',
            }}>
              Your Message
            </label>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Please describe your requirements..." rows={5} className="contact-field" style={{ resize: 'vertical' }} />
          </div>
          <button className="gold-btn" style={{ width: '100%' }}>Send Enquiry</button>
        </div>
      </div>
    </div>
  );
}

/* ─── HOME VIEW ─── */
function HomeView({ onFleet, onContact }: { onFleet: () => void; onContact: () => void }) {
  const [bForm, setBForm] = useState({ from: '', to: '', date: '', time: '', passengers: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBForm({ ...bForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="ivory-scroll" style={{ minHeight: 'calc(100vh - 72px)', background: '#FAF6EF', overflowY: 'auto' }}>
      {/* Split hero */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 72px)' }}>
        {/* Left */}
        <div style={{
          background: '#FAF6EF', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '80px 60px 80px 80px',
        }}>
          <div className="fu1" style={{ marginBottom: '24px' }}>
            <span style={{
              fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
              fontSize: '13px', fontWeight: 600, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#9A7820', fontVariant: 'small-caps',
            }}>
              Est. London 2009
            </span>
          </div>
          <div className="fu2" style={{ marginBottom: '28px' }}>
            <span className="hero-line-1">Arrive With</span>
            <span className="hero-line-2">Distinction</span>
          </div>
          <p className="fu3" style={{
            fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
            fontSize: '18px', color: '#8A8278', lineHeight: 1.7,
            marginBottom: '40px', maxWidth: '420px',
          }}>
            London&apos;s premier luxury chauffeur service. Impeccably presented vehicles, discreet professionals, and journeys made memorable.
          </p>
          <div className="fu4" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button className="gold-btn" onClick={onFleet}>Explore Our Fleet</button>
            <button className="navy-outline-btn" onClick={onContact}>Get a Quote</button>
          </div>
        </div>

        {/* Right: photo */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury chauffeur"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(250,246,239,0.12), transparent)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* Booking form */}
      <div style={{ background: '#F2EDE5', padding: '80px 48px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{
              fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
              fontSize: '13px', fontWeight: 600, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: '#9A7820', marginBottom: '12px',
            }}>
              Plan Your Journey
            </p>
            <h2 style={{
              fontFamily: "var(--font-playfair, 'Playfair Display'), serif",
              fontSize: 'clamp(36px, 3.5vw, 48px)', fontWeight: 700, color: '#0A1628',
            }}>
              Instant Quote
            </h2>
          </div>
          <div style={{
            background: '#FFFFFF', padding: '48px', borderRadius: '4px',
            boxShadow: '0 4px 24px rgba(10,22,40,0.08)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              {[
                { name: 'from', label: 'Pickup Location', placeholder: 'Heathrow Terminal 5...', type: 'text' },
                { name: 'to',   label: 'Destination',     placeholder: 'The Savoy, Strand...', type: 'text' },
              ].map(({ name, label, placeholder, type }) => (
                <div key={name}>
                  <label style={{
                    display: 'block',
                    fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
                    fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: '#8A8278', marginBottom: '8px',
                  }}>
                    {label}
                  </label>
                  <input type={type} name={name} value={bForm[name as 'from' | 'to']} onChange={handleChange} placeholder={placeholder} className="booking-field" />
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '28px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
                  fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#8A8278', marginBottom: '8px',
                }}>
                  Date
                </label>
                <input type="date" name="date" value={bForm.date} onChange={handleChange} className="booking-field" />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
                  fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#8A8278', marginBottom: '8px',
                }}>
                  Time
                </label>
                <input type="time" name="time" value={bForm.time} onChange={handleChange} className="booking-field" />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
                  fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#8A8278', marginBottom: '8px',
                }}>
                  Passengers
                </label>
                <select name="passengers" value={bForm.passengers} onChange={handleChange} className="booking-field">
                  <option value="" disabled>Select…</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="gold-btn" style={{ minWidth: '240px' }}>Get a Quote</button>
            </div>
            <p style={{
              fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
              fontSize: '13px', color: '#8A8278', textAlign: 'center', marginTop: '16px',
            }}>
              No booking fee &middot; Instant confirmation &middot; 24/7 support
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: '#FAF6EF', padding: '64px 48px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(154,120,32,0.35), transparent)', marginBottom: '40px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              { value: '15+',   label: 'Years of Service' },
              { value: '24/7',  label: 'Always Available' },
              { value: '5★',    label: 'Rated Excellence' },
              { value: '5,000+', label: 'Journeys Made' },
            ].map((s, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '20px 12px',
                borderRight: i < 3 ? '1px solid rgba(10,22,40,0.09)' : 'none',
              }}>
                <div style={{
                  fontFamily: "var(--font-playfair, 'Playfair Display'), serif",
                  fontSize: '36px', fontWeight: 700, color: '#9A7820', lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: "var(--font-montserrat, 'Montserrat'), sans-serif",
                  fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: '#8A8278', marginTop: '8px',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(154,120,32,0.35), transparent)', marginTop: '4px' }} />
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function IvoryPage() {
  const [section, setSection] = useState<Section>('home');
  const fleetNav   = useGalleryNav(FLEET.length);
  const serviceNav = useGalleryNav(SERVICES.length);
  const eventNav   = useGalleryNav(EVENTS.length);

  const NAV_TABS: { label: string; key: Section }[] = [
    { label: 'Home',    key: 'home' },
    { label: 'Fleet',   key: 'fleet' },
    { label: 'Services', key: 'services' },
    { label: 'Events',  key: 'events' },
    { label: 'About',   key: 'about' },
    { label: 'Contact', key: 'contact' },
  ];

  return (
    <>
      <style>{STYLES}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: '#FFFFFF', borderBottom: '1px solid rgba(10,22,40,0.08)',
        height: '72px',
      }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto', padding: '0 48px',
          height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            onClick={() => setSection('home')}
          >
            <span style={{
              fontFamily: "var(--font-playfair, 'Playfair Display'), serif",
              fontSize: '18px', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#0A1628',
            }}>
              Wimbledon Limousines
            </span>
          </button>

          {/* Nav tabs + Book Now */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            {NAV_TABS.map(({ label, key }) => (
              <button
                key={key}
                className={`nav-tab${section === key ? ' active' : ''}`}
                onClick={() => setSection(key)}
              >
                {label}
              </button>
            ))}
            <button className="book-now-btn" onClick={() => setSection('contact')}>
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* ── CONTENT (below fixed navbar) ── */}
      <div style={{ paddingTop: '72px' }}>
        {section === 'home'     && <HomeView onFleet={() => setSection('fleet')} onContact={() => setSection('contact')} />}
        {section === 'fleet'    && <FleetView nav={fleetNav} onContact={() => setSection('contact')} />}
        {section === 'services' && <ServicesView nav={serviceNav} />}
        {section === 'events'   && <EventsView nav={eventNav} />}
        {section === 'about'    && <AboutView />}
        {section === 'contact'  && <ContactView />}
      </div>
    </>
  );
}
