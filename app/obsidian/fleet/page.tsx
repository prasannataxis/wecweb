'use client';

import Link from 'next/link';

const CARS = [
  {
    name: 'Mercedes S-Class',
    category: 'Executive Saloon',
    photo: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    passengers: 3,
    luggage: 3,
    features: ['Leather Interior', 'Climate Control', 'Wi-Fi'],
  },
  {
    name: 'BMW 7 Series',
    category: 'Executive Saloon',
    photo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    passengers: 3,
    luggage: 3,
    features: ['Massage Seats', 'Panoramic Roof', 'Bose Audio'],
  },
  {
    name: 'Rolls-Royce Ghost',
    category: 'Ultra Luxury',
    photo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    passengers: 3,
    luggage: 2,
    features: ['Starlight Headliner', 'Champagne Cooler', 'Whisper-quiet'],
  },
  {
    name: 'Mercedes V-Class',
    category: 'Executive MPV',
    photo: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
    passengers: 6,
    luggage: 6,
    features: ['Conference Layout', 'Privacy Glass', 'LED Ambience'],
  },
  {
    name: 'Range Rover Autobiography',
    category: 'Luxury SUV',
    photo: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
    passengers: 4,
    luggage: 4,
    features: ['4WD Capability', 'Heated Seats', 'Reclining Rear'],
  },
];

function HexCar({
  car,
  row,
  col,
  delay,
}: {
  car: (typeof CARS)[0];
  row: number;
  col: number;
  delay: number;
}) {
  const isOffset = row % 2 === 1;
  void col;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: isOffset ? '-30px' : '0',
        marginLeft: isOffset && col === 0 ? '135px' : '0',
        animation: `hexReveal 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
      }}
    >
      {/* Hex car cell */}
      <div
        style={{
          position: 'relative',
          width: '250px',
          height: '216px',
          cursor: 'pointer',
          transition: 'transform 0.4s',
        }}
        className="hex-car-cell"
      >
        {/* Scarlet outer border */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            background: '#E02020',
            opacity: 0,
            transition: 'opacity 0.3s',
            animation: 'hexPulse 2.5s ease-in-out infinite',
          }}
          className="hex-border-pulse"
        />

        {/* Photo hex */}
        <div
          style={{
            position: 'absolute',
            inset: '4px',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            backgroundImage: `url(${car.photo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Dark gradient overlay inside hex */}
        <div
          style={{
            position: 'absolute',
            inset: '4px',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            background: 'linear-gradient(to bottom, transparent 40%, rgba(15,15,20,0.85) 100%)',
          }}
        />

        {/* Category badge at top */}
        <div
          style={{
            position: 'absolute',
            top: '36px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(224,32,32,0.85)',
            padding: '3px 12px',
            borderRadius: '2px',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: '#F0F0F5',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {car.category}
          </span>
        </div>

        {/* Features on hover overlay */}
        <div
          style={{
            position: 'absolute',
            inset: '4px',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            background: 'rgba(15,15,20,0.88)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: 0,
            transition: 'opacity 0.3s',
            zIndex: 3,
          }}
          className="hex-hover-details"
        >
          {car.features.map((f) => (
            <span
              key={f}
              style={{
                fontSize: '12px',
                color: '#F0F0F5',
                letterSpacing: '0.08em',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              <span style={{ color: '#E02020', marginRight: '6px' }}>◆</span>
              {f}
            </span>
          ))}
          <div style={{ marginTop: '8px', display: 'flex', gap: '16px' }}>
            <span style={{ fontSize: '12px', color: '#7A7A8A' }}>👤 {car.passengers}</span>
            <span style={{ fontSize: '12px', color: '#7A7A8A' }}>🧳 {car.luggage}</span>
          </div>
        </div>
      </div>

      {/* Car name below hex */}
      <div style={{ textAlign: 'center', marginTop: '14px' }}>
        <div
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '17px',
            fontWeight: 700,
            color: '#F0F0F5',
          }}
        >
          {car.name}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#E02020',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: '4px',
            fontWeight: 600,
          }}
        >
          {car.category}
        </div>
      </div>
    </div>
  );
}

export default function FleetPage() {
  // Honeycomb layout: row 0 = [0,1,2], row 1 = [3,4] offset
  const rows = [
    [0, 1, 2],
    [3, 4],
  ];

  return (
    <div style={{ background: '#0F0F14', minHeight: '100vh', animation: 'pageEntry 0.6s ease both' }}>
      {/* Page header */}
      <section
        style={{
          padding: '64px 80px 56px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(224,32,32,0.15)',
          background: 'linear-gradient(to bottom, #18181F, #0F0F14)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ color: '#E02020' }}>◆</span>
          <span style={{ fontSize: '12px', letterSpacing: '0.28em', color: '#E02020', textTransform: 'uppercase', fontWeight: 700 }}>
            Our Fleet
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
          The{' '}
          <span style={{ color: '#E02020', fontStyle: 'italic' }}>Finest</span> Vehicles
        </h1>
        <p style={{ fontSize: '16px', color: '#7A7A8A', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
          Every vehicle in our fleet is maintained to the highest standards,
          driven by professional, fully-licensed chauffeurs.
        </p>
      </section>

      {/* Honeycomb grid */}
      <section
        style={{
          padding: '72px 80px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {rows.map((rowCars, rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: 'flex',
              gap: '24px',
              marginBottom: rowIdx === 0 ? '0' : '0',
              marginLeft: rowIdx === 1 ? '137px' : '0',
              marginTop: rowIdx === 1 ? '-54px' : '0',
            }}
          >
            {rowCars.map((carIdx, colIdx) => (
              <HexCar
                key={carIdx}
                car={CARS[carIdx]}
                row={rowIdx}
                col={colIdx}
                delay={carIdx * 120}
              />
            ))}
          </div>
        ))}
      </section>

      {/* Book CTA */}
      <section
        style={{
          padding: '0 80px 80px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            padding: '48px 64px',
            textAlign: 'center',
            maxWidth: '640px',
            width: '100%',
          }}
        >
          {/* Hex decoration corners */}
          {['-top-3 -left-3', '-top-3 -right-3', '-bottom-3 -left-3', '-bottom-3 -right-3'].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '40px',
                height: '35px',
                background: 'rgba(224,32,32,0.3)',
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                top: i < 2 ? '-8px' : 'auto',
                bottom: i >= 2 ? '-8px' : 'auto',
                left: i % 2 === 0 ? '-8px' : 'auto',
                right: i % 2 === 1 ? '-8px' : 'auto',
              }}
            />
          ))}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              border: '1px solid rgba(224,32,32,0.25)',
            }}
          />
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '32px',
              fontWeight: 700,
              color: '#F0F0F5',
              marginBottom: '14px',
              position: 'relative',
            }}
          >
            Ready to Book?
          </h3>
          <p style={{ fontSize: '16px', color: '#7A7A8A', marginBottom: '28px', position: 'relative', lineHeight: 1.7 }}>
            Contact our team to reserve your vehicle for any occasion.
          </p>
          <Link href="/obsidian/contact" style={{ textDecoration: 'none', position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                width: '200px',
                height: '54px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
              }}
              className="fleet-book-btn"
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#E02020',
                  clipPath: 'polygon(6% 0%, 94% 0%, 100% 50%, 94% 100%, 6% 100%, 0% 50%)',
                  transition: 'filter 0.2s',
                }}
                className="fleet-book-fill"
              />
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#F0F0F5',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                BOOK A CAR →
              </span>
            </div>
          </Link>
        </div>
      </section>

      <style>{`
        .hex-car-cell:hover { transform: rotateY(15deg) scale(1.03); }
        .hex-car-cell:hover .hex-border-pulse { opacity: 1 !important; animation: none !important; }
        .hex-car-cell:hover .hex-hover-details { opacity: 1 !important; }
        .fleet-book-btn:hover .fleet-book-fill { filter: brightness(1.18); }
      `}</style>
    </div>
  );
}
