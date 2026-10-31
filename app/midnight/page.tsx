"use client";

import { useState, useTransition } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Section = "home" | "fleet" | "services" | "events" | "about" | "contact";

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_ITEMS: { id: Section; label: string; num: string }[] = [
  { id: "home",     label: "HOME",     num: "01" },
  { id: "fleet",    label: "FLEET",    num: "02" },
  { id: "services", label: "SERVICES", num: "03" },
  { id: "events",   label: "EVENTS",   num: "04" },
  { id: "about",    label: "ABOUT",    num: "05" },
  { id: "contact",  label: "CONTACT",  num: "06" },
];

const LEFT_PANEL_IMAGES: Record<Section, string> = {
  home:     "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=960&q=80",
  fleet:    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=960&q=80",
  services: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=960&q=80",
  events:   "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=960&q=80",
  about:    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=960&q=80",
  contact:  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=960&q=80",
};

const FLEET_CARS = [
  {
    id: "mercedes",
    name: "Mercedes S-Class",
    category: "Executive Saloon",
    capacity: "3 Passengers",
    bags: "3 Bags",
    desc: "The pinnacle of German engineering, offering unrivalled comfort for business transfers and airport runs.",
    photo: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=960&q=80",
    thumb: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: "bentley",
    name: "Bentley GT",
    category: "Grand Tourer",
    capacity: "2 Passengers",
    bags: "2 Bags",
    desc: "Effortless British luxury. The GT combines devastating performance with hand-crafted interior craftsmanship.",
    photo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=960&q=80",
    thumb: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: "rangerover",
    name: "Range Rover LWB",
    category: "Luxury SUV",
    capacity: "4 Passengers",
    bags: "4 Bags",
    desc: "Long wheelbase commanding presence. Ideal for family transfers, countryside escapes and prestige group travel.",
    photo: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=960&q=80",
    thumb: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: "bmw7",
    name: "BMW 7 Series",
    category: "Executive Saloon",
    capacity: "3 Passengers",
    bags: "3 Bags",
    desc: "Sophisticated technology meets sublime ride quality. BMW's flagship saloon for discerning corporate clients.",
    photo: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=960&q=80",
    thumb: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: "rollsroyce",
    name: "Rolls-Royce Ghost",
    category: "Ultra Prestige",
    capacity: "3 Passengers",
    bags: "3 Bags",
    desc: "The Spirit of Ecstasy awaits. Reserve the Ghost for weddings, galas and once-in-a-lifetime occasions.",
    photo: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=960&q=80",
    thumb: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400&q=70",
  },
];

const SERVICES = [
  { num: "01", title: "Airport Transfers", desc: "Meet-and-greet at all major London airports. Flight tracking, waiting time included, no hidden charges." },
  { num: "02", title: "Corporate Travel", desc: "Dedicated account management, invoicing, and priority dispatch for executive business travel." },
  { num: "03", title: "Wedding Cars", desc: "Arrive in timeless elegance. Ribbons, complimentary champagne and a dedicated wedding coordinator." },
  { num: "04", title: "Event Hire", desc: "Premieres, galas, sporting events — we handle the logistics so you arrive composed and on time." },
  { num: "05", title: "Chauffeur By Day", desc: "Retain a personal chauffeur for a full day. Ideal for road shows, property viewings, or city-wide schedules." },
  { num: "06", title: "Private Tours", desc: "Bespoke countryside and city tours with knowledgeable chauffeurs who understand London's hidden gems." },
];

const EVENTS = [
  { name: "Wimbledon Championships", venue: "All England Club, SW19", dates: "30 Jun – 13 Jul 2026", desc: "Court-side transfers with preferred parking access and discreet waiting." },
  { name: "Chelsea Flower Show", venue: "Royal Hospital Chelsea", dates: "19 – 23 May 2026", desc: "Garden party arrivals in full Rolls-Royce or Bentley splendour." },
  { name: "Royal Ascot", venue: "Ascot Racecourse, Berkshire", dates: "16 – 20 Jun 2026", desc: "Private race-day packages. Champagne en-route, reserved enclosure drop." },
  { name: "Henley Royal Regatta", venue: "River Thames, Henley-on-Thames", dates: "1 – 5 Jul 2026", desc: "Riverside transfers timed to your crew's programme." },
  { name: "Glyndebourne Festival", venue: "Glyndebourne Opera House, Sussex", dates: "17 May – 31 Aug 2026", desc: "Evening opera transfers with picnic hamper arrangement on request." },
  { name: "London Fashion Week", venue: "Various London Venues", dates: "Feb & Sep 2026", desc: "Show-to-show transfers for buyers, editors, and talent." },
];

const TESTIMONIALS = [
  { quote: "The most seamless service I have ever experienced. The chauffeur had already tracked my delayed flight — remarkable.", author: "Victoria H.", role: "Investment Director, Mayfair" },
  { quote: "We used Wimbledon Limousines for our entire wedding day. Every moment was perfect, precisely on time, utterly beautiful.", author: "James & Sophie T.", role: "Married at Blenheim Palace" },
  { quote: "Our corporate account has been running for three years without a single late pickup. An extraordinary record.", author: "David C.", role: "COO, Global Fintech Group" },
];

// ─── Colour constants for inline styles ────────────────────────────────────────
const C = {
  navy:        "#020518",
  navy2:       "#050A28",
  copper:      "#CC7B5A",
  copperL:     "#E8A882",
  lavW:        "#F4F0F8",
  lavG:        "#7868A8",
  border:      "rgba(204,123,90,0.15)",
  borderMd:    "rgba(204,123,90,0.25)",
  overlay:     "rgba(2,5,28,0.55)",
};

// ─── Left Panel ───────────────────────────────────────────────────────────────
function LeftPanel({
  activeSection,
  setActiveSection,
  fleetPhoto,
}: {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  fleetPhoto: string | null;
}) {
  const [hoverSection, setHoverSection] = useState<Section | null>(null);
  const currentIndex = NAV_ITEMS.findIndex((n) => n.id === activeSection);
  const displayNum = String(currentIndex + 1).padStart(2, "0");
  const bgPhoto = activeSection === "fleet" && fleetPhoto ? fleetPhoto : LEFT_PANEL_IMAGES[activeSection];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Background photo with overlay */}
      <div
        key={bgPhoto}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bgPhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "leftImageFade 0.4s ease-out",
          zIndex: 0,
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: C.overlay, zIndex: 1 }} />

      {/* Content layer */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%", padding: "48px 40px" }}>
        {/* Logo */}
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, letterSpacing: "0.25em", color: C.lavW, marginBottom: 6 }}>
            WIMBLEDON
          </div>
          <div style={{ width: 48, height: 1, background: `linear-gradient(90deg, ${C.copper}, transparent)`, marginBottom: 6 }} />
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", color: C.copper, textTransform: "uppercase" as const }}>
            Limousines
          </div>
        </div>

        {/* Section number */}
        <div style={{ marginTop: 28, fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 500, color: C.copper, letterSpacing: "0.12em" }}>
          {displayNum} / 06
        </div>

        {/* Spacer pushes nav to bottom half */}
        <div style={{ flex: 1 }} />

        {/* Navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 36 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeSection;
            const isHovered = item.id === hoverSection;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                onMouseEnter={() => setHoverSection(item.id)}
                onMouseLeave={() => setHoverSection(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "6px 0",
                  textAlign: "left" as const,
                }}
              >
                {/* Dot */}
                <span style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: isActive || isHovered ? C.copper : "transparent",
                  border: `1.5px solid ${isActive || isHovered ? C.copper : C.lavG}`,
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                  animation: isActive ? "dotFill 0.25s ease-out" : undefined,
                }} />
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 16,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? C.lavW : isHovered ? C.lavW : C.lavG,
                  letterSpacing: "0.15em",
                  transition: "color 0.2s ease",
                }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Book Now */}
        <BookButton />
      </div>
    </div>
  );
}

function BookButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? C.copper : "transparent",
        border: `1px solid ${C.copper}`,
        color: hovered ? C.navy : C.copper,
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.2em",
        padding: "14px 28px",
        cursor: "pointer",
        textTransform: "uppercase" as const,
        transition: "all 0.25s ease",
        animation: "breathe 3s ease-in-out infinite",
        width: "100%",
      }}
    >
      Book Now
    </button>
  );
}

// ─── Right Panel Sections ─────────────────────────────────────────────────────

function HomeContent() {
  const [formHover, setFormHover] = useState(false);
  return (
    <div style={{ background: C.navy2, minHeight: "100vh", padding: "60px 48px" }}>
      {/* Headline */}
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(48px, 5vw, 72px)",
        fontWeight: 700,
        lineHeight: 1.05,
        color: C.lavW,
        marginBottom: 20,
      }}>
        Arrive With{" "}
        <span style={{
          background: `linear-gradient(90deg, ${C.copper}, ${C.copperL}, ${C.copper})`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "copperShimmer 3s linear infinite",
        }}>
          Distinction
        </span>
      </h1>

      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 18, color: C.lavG, lineHeight: 1.7, maxWidth: 480, marginBottom: 48 }}>
        London&apos;s premier chauffeured car service. Discreet, punctual, impeccably presented — for those who expect nothing less than perfect.
      </p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24, marginBottom: 52 }}>
        {[
          { val: "15+", label: "Years Experience" },
          { val: "98%", label: "On-Time Rate" },
          { val: "5★", label: "Client Rating" },
          { val: "24/7", label: "Availability" },
        ].map((s) => (
          <div key={s.label} style={{ borderLeft: `2px solid ${C.copper}`, paddingLeft: 16 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: C.copper }}>{s.val}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: C.lavG, letterSpacing: "0.1em", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Booking form */}
      <div style={{
        background: "rgba(5,10,40,0.8)",
        border: `1px solid ${C.borderMd}`,
        padding: "36px 32px",
        maxWidth: 520,
      }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: C.lavW, marginBottom: 28 }}>
          Arrange Your Transfer
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "From", placeholder: "Pickup location or airport" },
            { label: "To",   placeholder: "Destination" },
            { label: "Date & Time", placeholder: "DD/MM/YYYY HH:MM" },
            { label: "Passengers",  placeholder: "Number of passengers" },
          ].map((f) => (
            <div key={f.label}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.copper, letterSpacing: "0.12em", marginBottom: 6, textTransform: "uppercase" as const }}>
                {f.label}
              </label>
              <input
                placeholder={f.placeholder}
                style={{
                  width: "100%",
                  background: "rgba(2,5,24,0.6)",
                  border: `1px solid ${C.border}`,
                  color: C.lavW,
                  padding: "12px 14px",
                  fontSize: 15,
                  fontFamily: "'Montserrat', sans-serif",
                  outline: "none",
                }}
              />
            </div>
          ))}
          <button
            onMouseEnter={() => setFormHover(true)}
            onMouseLeave={() => setFormHover(false)}
            style={{
              marginTop: 8,
              background: formHover ? C.copperL : C.copper,
              border: "none",
              color: C.navy,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.18em",
              padding: "16px 24px",
              cursor: "pointer",
              textTransform: "uppercase" as const,
              transition: "background 0.2s ease",
              width: "100%",
            }}
          >
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
}

function FleetContent({ onCarHover }: { onCarHover: (photo: string | null) => void }) {
  const [selectedCar, setSelectedCar] = useState<string>(FLEET_CARS[0].id);

  return (
    <div style={{ background: C.navy2, minHeight: "100vh", padding: "60px 48px" }}>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: C.copper, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 12 }}>Our Fleet</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: C.lavW, marginBottom: 8, lineHeight: 1.1 }}>
        Exceptional Vehicles
      </h2>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, color: C.lavG, marginBottom: 40, lineHeight: 1.7 }}>
        Every vehicle is immaculately maintained and driven by an SIA-licensed chauffeur.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {FLEET_CARS.map((car, i) => {
          const isActive = car.id === selectedCar;
          return (
            <div
              key={car.id}
              onClick={() => setSelectedCar(car.id)}
              onMouseEnter={() => onCarHover(car.photo)}
              onMouseLeave={() => onCarHover(null)}
              style={{
                display: "flex",
                gap: 20,
                padding: "24px 20px",
                cursor: "pointer",
                borderLeft: isActive ? `3px solid ${C.copper}` : "3px solid transparent",
                borderBottom: i < FLEET_CARS.length - 1 ? `1px solid ${C.border}` : "none",
                background: isActive ? "rgba(204,123,90,0.06)" : "transparent",
                transition: "all 0.2s ease",
              }}
            >
              {/* Thumbnail */}
              <div style={{ width: 120, height: 80, flexShrink: 0, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={car.thumb}
                  alt={car.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Details */}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: C.lavW, marginBottom: 4 }}>
                  {car.name}
                </div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: C.copper, letterSpacing: "0.1em", marginBottom: 8 }}>
                  {car.category}
                </div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: C.lavG, lineHeight: 1.6, marginBottom: 10 }}>
                  {car.desc}
                </p>
                <div style={{ display: "flex", gap: 20 }}>
                  {[car.capacity, car.bags].map((spec) => (
                    <span key={spec} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: C.lavG, letterSpacing: "0.08em" }}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ServicesContent() {
  return (
    <div style={{ background: C.navy2, minHeight: "100vh", padding: "60px 48px" }}>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: C.copper, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 12 }}>What We Offer</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: C.lavW, marginBottom: 8, lineHeight: 1.1 }}>
        Our Services
      </h2>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, color: C.lavG, marginBottom: 48, lineHeight: 1.7 }}>
        Tailored to your schedule, your standard, your story.
      </p>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {SERVICES.map((svc, i) => (
          <div key={svc.num} style={{ display: "flex", gap: 28, padding: "28px 0", borderBottom: i < SERVICES.length - 1 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: C.copper, letterSpacing: "0.08em", marginTop: 4, minWidth: 24 }}>{svc.num}</div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, color: C.lavW, marginBottom: 10 }}>{svc.title}</h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, color: C.lavG, lineHeight: 1.7 }}>{svc.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsContent() {
  return (
    <div style={{ background: C.navy2, minHeight: "100vh", padding: "60px 48px" }}>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: C.copper, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 12 }}>Season Calendar</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: C.lavW, marginBottom: 8, lineHeight: 1.1 }}>
        Events We Attend
      </h2>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, color: C.lavG, marginBottom: 48, lineHeight: 1.7 }}>
        London&apos;s most prestigious occasions deserve a suitably prestigious arrival.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {EVENTS.map((ev, i) => (
          <div
            key={ev.name}
            style={{
              display: "flex",
              gap: 0,
              borderBottom: i < EVENTS.length - 1 ? `1px solid ${C.border}` : "none",
            }}
          >
            {/* Copper left accent */}
            <div style={{ width: 3, background: C.copper, flexShrink: 0, marginRight: 24, marginTop: 28, marginBottom: 28, borderRadius: 2 }} />
            <div style={{ padding: "28px 0" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, color: C.lavW, marginBottom: 6 }}>{ev.name}</h3>
              <div style={{ display: "flex", gap: 20, marginBottom: 10, flexWrap: "wrap" as const }}>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: C.copper }}>{ev.venue}</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: C.lavG }}>{ev.dates}</span>
              </div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, color: C.lavG, lineHeight: 1.65 }}>{ev.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutContent() {
  return (
    <div style={{ background: C.navy2, minHeight: "100vh", padding: "60px 48px" }}>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: C.copper, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 12 }}>Our Story</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: C.lavW, marginBottom: 8, lineHeight: 1.1 }}>
        About Wimbledon Limousines
      </h2>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, color: C.lavG, lineHeight: 1.7, maxWidth: 520, marginBottom: 52 }}>
        Founded in 2009, Wimbledon Limousines has built an unrivalled reputation for discretion, reliability and understated elegance in London&apos;s private hire industry.
      </p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 56 }}>
        {[
          { val: "15+", label: "Years in Service" },
          { val: "12,000+", label: "Journeys Completed" },
          { val: "4.97★", label: "Average Rating" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              border: `1px solid ${C.border}`,
              padding: "28px 20px",
              textAlign: "center" as const,
              animation: "breathe 4s ease-in-out infinite",
            }}
          >
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: C.copper, marginBottom: 8 }}>{s.val}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: C.lavG, letterSpacing: "0.1em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: C.lavW, marginBottom: 28 }}>Client Testimonials</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {TESTIMONIALS.map((t) => (
          <div
            key={t.author}
            style={{
              background: "rgba(204,123,90,0.05)",
              border: `1px solid ${C.border}`,
              padding: "28px 28px",
              borderLeft: `3px solid ${C.copper}`,
            }}
          >
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontStyle: "italic", color: C.lavW, lineHeight: 1.7, marginBottom: 16 }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 600, color: C.copper }}>{t.author}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: C.lavG, marginTop: 2 }}>{t.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactContent() {
  const [btnHover, setBtnHover] = useState(false);
  return (
    <div style={{ background: C.navy2, minHeight: "100vh", padding: "60px 48px" }}>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: C.copper, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 12 }}>Get In Touch</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: C.lavW, marginBottom: 8, lineHeight: 1.1 }}>
        Contact Us
      </h2>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, color: C.lavG, lineHeight: 1.7, marginBottom: 48 }}>
        Available around the clock for bookings, quotes and enquiries.
      </p>

      {/* Phone — hero size */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: C.lavG, letterSpacing: "0.12em", marginBottom: 6, textTransform: "uppercase" as const }}>Telephone</div>
        <a href="tel:+442012345678" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 700, color: C.copper }}>
            +44 20 1234 5678
          </div>
        </a>
      </div>

      {/* Other contacts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 28, marginBottom: 52 }}>
        {[
          { label: "Email",    val: "bookings@wimbledonlimousines.co.uk" },
          { label: "WhatsApp", val: "+44 7700 900 000" },
          { label: "Office",   val: "Wimbledon Village, London SW19" },
        ].map((row) => (
          <div key={row.label} style={{ display: "flex", gap: 20, borderBottom: `1px solid ${C.border}`, paddingBottom: 16 }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 600, color: C.copper, letterSpacing: "0.1em", minWidth: 80, textTransform: "uppercase" as const, paddingTop: 2 }}>{row.label}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, color: C.lavW }}>{row.val}</div>
          </div>
        ))}
      </div>

      {/* Contact form */}
      <div style={{ border: `1px solid ${C.border}`, padding: "32px 28px" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: C.lavW, marginBottom: 24 }}>Send an Enquiry</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "Name",    placeholder: "Your full name" },
            { label: "Email",   placeholder: "your@email.com" },
            { label: "Subject", placeholder: "Booking / General enquiry" },
          ].map((f) => (
            <div key={f.label}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.copper, letterSpacing: "0.12em", marginBottom: 6, textTransform: "uppercase" as const }}>
                {f.label}
              </label>
              <input
                placeholder={f.placeholder}
                style={{
                  width: "100%",
                  background: "rgba(2,5,24,0.6)",
                  border: `1px solid ${C.border}`,
                  color: C.lavW,
                  padding: "12px 14px",
                  fontSize: 15,
                  fontFamily: "'Montserrat', sans-serif",
                  outline: "none",
                }}
              />
            </div>
          ))}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.copper, letterSpacing: "0.12em", marginBottom: 6, textTransform: "uppercase" as const }}>
              Message
            </label>
            <textarea
              placeholder="How can we help you?"
              rows={4}
              style={{
                width: "100%",
                background: "rgba(2,5,24,0.6)",
                border: `1px solid ${C.border}`,
                color: C.lavW,
                padding: "12px 14px",
                fontSize: 15,
                fontFamily: "'Montserrat', sans-serif",
                outline: "none",
                resize: "vertical" as const,
              }}
            />
          </div>
          <button
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              background: btnHover ? C.copperL : C.copper,
              border: "none",
              color: C.navy,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.18em",
              padding: "16px 24px",
              cursor: "pointer",
              textTransform: "uppercase" as const,
              transition: "background 0.2s ease",
              width: "100%",
              marginTop: 8,
            }}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Root page ─────────────────────────────────────────────────────────────────
export default function MidnightPage() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [fleetPhoto, setFleetPhoto] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @keyframes rightPanelIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes leftImageFade {
          from { opacity: 0.4; }
          to   { opacity: 1; }
        }
        @keyframes copperShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes breathe {
          0%, 100% { box-shadow: 0 0 0 0 rgba(204,123,90,0); }
          50%       { box-shadow: 0 0 16px 2px rgba(204,123,90,0.2); }
        }
        @keyframes dotFill {
          from { transform: scale(0.8); opacity: 0.6; }
          to   { transform: scale(1);   opacity: 1; }
        }
        input::placeholder, textarea::placeholder {
          color: #3D3560;
        }
        input:focus, textarea:focus {
          border-color: rgba(204,123,90,0.4) !important;
        }
        @media (max-width: 768px) {
          .midnight-left  { display: none !important; }
          .midnight-right { margin-left: 0 !important; width: 100% !important; }
        }
      `}</style>

      <div style={{ display: "flex" }}>
        {/* LEFT HALF — fixed, never scrolls */}
        <div
          className="midnight-left"
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "50vw",
            height: "100vh",
            background: C.navy,
            borderRight: `1px solid rgba(204,123,90,0.2)`,
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          <LeftPanel
            activeSection={activeSection}
            setActiveSection={(s) => {
              setActiveSection(s);
              setFleetPhoto(null);
            }}
            fleetPhoto={fleetPhoto}
          />
        </div>

        {/* RIGHT HALF — scrollable */}
        <div
          className="midnight-right"
          style={{
            marginLeft: "50vw",
            width: "50vw",
            minHeight: "100vh",
          }}
        >
          <div
            key={activeSection}
            style={{ animation: "rightPanelIn 0.45s ease-out" }}
          >
            {activeSection === "home"     && <HomeContent />}
            {activeSection === "fleet"    && <FleetContent onCarHover={setFleetPhoto} />}
            {activeSection === "services" && <ServicesContent />}
            {activeSection === "events"   && <EventsContent />}
            {activeSection === "about"    && <AboutContent />}
            {activeSection === "contact"  && <ContactContent />}
          </div>
        </div>
      </div>
    </>
  );
}
