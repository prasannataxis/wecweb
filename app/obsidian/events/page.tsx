'use client';

import Link from 'next/link';

const EVENTS = [
  {
    title: 'Wimbledon Championships',
    subtitle: 'Annual Tennis Classic',
    dates: 'Late June – Early July',
    description:
      "The world's most prestigious tennis tournament, right on our doorstep. We provide seamless transfers to and from the All England Club — avoid the queues and arrive refreshed.",
    color: '#1A3A1A',
    accent: '#2ECC71',
    icon: '◈',
  },
  {
    title: 'Royal Ascot',
    subtitle: 'Royal Race Meeting',
    dates: 'Third Week of June',
    description:
      'Dress code, champagne, and the finest thoroughbreds. Our chauffeurs ensure you arrive in style at Ascot Racecourse, with door-to-door service from London.',
    color: '#1A1A2E',
    accent: '#E02020',
    icon: '★',
  },
  {
    title: 'Glastonbury & Music Events',
    subtitle: 'Festival Season',
    dates: 'May – September',
    description:
      'Skip the festival traffic entirely. We offer private transfers to major concert venues and festivals across Southern England.',
    color: '#2A1A00',
    accent: '#F39C12',
    icon: '⬡',
  },
  {
    title: 'Corporate Galas',
    subtitle: 'Awards & Dinners',
    dates: 'Year-round',
    description:
      'The Grosvenor House, Guildhall, Savoy, Dorchester. We know the venues, the timings, and how to make your party arrive together, on time, every time.',
    color: '#1A0A20',
    accent: '#9B59B6',
    icon: '♡',
  },
  {
    title: 'Sporting Events',
    subtitle: 'Premier League & Beyond',
    dates: 'Season-round',
    description:
      "Wembley, Twickenham, The O2, Lord's. Our chauffeurs handle all major sporting venues with pre-arranged pick-up and return logistics.",
    color: '#0A1A2A',
    accent: '#3498DB',
    icon: '⚑',
  },
  {
    title: 'Private Celebrations',
    subtitle: 'Weddings · Anniversaries · Birthdays',
    dates: 'Year-round',
    description:
      'From a quiet anniversary dinner to a 200-guest wedding convoy, we coordinate multi-vehicle logistics for private celebrations of any scale.',
    color: '#1A0F0A',
    accent: '#E67E22',
    icon: '✈',
  },
];

function EventHexBlock({ event, isLeft }: { event: (typeof EVENTS)[0]; isLeft: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '48px',
        flexDirection: isLeft ? 'row' : 'row-reverse',
        marginBottom: '80px',
        flexWrap: 'wrap',
      }}
    >
      {/* Large hex */}
      <div
        style={{
          position: 'relative',
          width: '280px',
          height: '243px',
          flexShrink: 0,
          animation: 'hexReveal 0.6s ease both',
        }}
        className="event-hex"
      >
        {/* Outer glow hex */}
        <div
          style={{
            position: 'absolute',
            inset: '-4px',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            background: event.accent,
            opacity: 0.3,
            animation: 'hexPulse 3s ease-in-out infinite',
          }}
        />
        {/* Filled hex */}
        <div
          style={{
            position: 'absolute',
            inset: '3px',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            background: event.color,
            border: `2px solid ${event.accent}`,
          }}
        />
        {/* Icon & title inside */}
        <div
          style={{
            position: 'absolute',
            inset: '3px',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '52px', color: event.accent }}>{event.icon}</span>
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: event.accent,
              fontWeight: 700,
              textTransform: 'uppercase',
              textAlign: 'center',
              padding: '0 24px',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {event.dates}
          </span>
        </div>
      </div>

      {/* Text block */}
      <div style={{ flex: 1, minWidth: '280px' }}>
        <div
          style={{
            display: 'inline-block',
            background: `${event.accent}22`,
            border: `1px solid ${event.accent}`,
            padding: '4px 14px',
            marginBottom: '14px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: event.accent,
              fontWeight: 700,
              textTransform: 'uppercase',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {event.subtitle}
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 700,
            color: '#F0F0F5',
            marginBottom: '16px',
            lineHeight: 1.15,
          }}
        >
          {event.title}
        </h2>

        <p style={{ fontSize: '16px', color: '#7A7A8A', lineHeight: 1.8, marginBottom: '24px' }}>
          {event.description}
        </p>

        {/* Small hex bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
          {['Professional chauffeur included', 'Meet & greet service', 'Fixed pricing, no surcharges'].map((point) => (
            <div key={point} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '16px',
                  height: '14px',
                  background: event.accent,
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: '14px', color: '#7A7A8A' }}>{point}</span>
            </div>
          ))}
        </div>

        <Link href="/obsidian/contact" style={{ textDecoration: 'none' }}>
          <div
            style={{
              position: 'relative',
              width: '180px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="event-book-btn"
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: event.accent,
                clipPath: 'polygon(6% 0%, 94% 0%, 100% 50%, 94% 100%, 6% 100%, 0% 50%)',
                transition: 'filter 0.2s',
              }}
              className="event-book-fill"
            />
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                fontSize: '11px',
                fontWeight: 700,
                color: '#F0F0F5',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              ENQUIRE →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <div style={{ background: '#0F0F14', minHeight: '100vh', animation: 'pageEntry 0.6s ease both' }}>
      {/* Header */}
      <section
        style={{
          padding: '64px 80px 56px',
          textAlign: 'center',
          background: 'linear-gradient(to bottom, #18181F, #0F0F14)',
          borderBottom: '1px solid rgba(224,32,32,0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ color: '#E02020' }}>◆</span>
          <span style={{ fontSize: '12px', letterSpacing: '0.28em', color: '#E02020', textTransform: 'uppercase', fontWeight: 700 }}>
            Events
          </span>
          <span style={{ color: '#E02020' }}>◆</span>
        </div>
        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(48px, 6vw, 80px)',
            fontWeight: 700,
            color: '#F0F0F5',
            marginBottom: '16px',
          }}
        >
          Every Great{' '}
          <span style={{ color: '#E02020', fontStyle: 'italic' }}>Event</span>
        </h1>
        <p style={{ fontSize: '16px', color: '#7A7A8A', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
          From Wimbledon to the West End, we provide the most distinguished
          transport for London's finest occasions.
        </p>
      </section>

      {/* Event list */}
      <section style={{ padding: '72px 80px 40px' }}>
        {EVENTS.map((event, i) => (
          <EventHexBlock key={event.title} event={event} isLeft={i % 2 === 0} />
        ))}
      </section>

      <style>{`
        .event-book-btn:hover .event-book-fill { filter: brightness(1.2); }
        .event-hex:hover { transform: scale(1.04); transition: transform 0.3s; }
      `}</style>
    </div>
  );
}
