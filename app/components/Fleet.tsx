const vehicles = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    category: "Executive Saloon",
    passengers: 4,
    luggage: 3,
    features: ["Panoramic Roof", "Massage Seats", "Champagne Bar"],
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    imgPosition: "center 55%",
  },
  {
    id: 2,
    name: "Mercedes-Benz V-Class",
    category: "Executive MPV",
    passengers: 7,
    luggage: 7,
    features: ["Facing Seats", "Extra Legroom", "Tinted Glass"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    imgPosition: "center 50%",
  },
  {
    id: 3,
    name: "Mercedes-Benz E-Class",
    category: "Business Saloon",
    passengers: 4,
    luggage: 3,
    features: ["Leather Seats", "Climate Control", "USB Charging"],
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
    imgPosition: "center 60%",
  },
  {
    id: 4,
    name: "BMW 7 Series",
    category: "Executive Saloon",
    passengers: 4,
    luggage: 3,
    features: ["Rear Entertainment", "Soft-Close Doors", "Privacy Glass"],
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    imgPosition: "center 40%",
  },
  {
    id: 5,
    name: "Range Rover LWB",
    category: "Premium SUV",
    passengers: 4,
    luggage: 4,
    features: ["Raised Seating", "All-Terrain", "Executive Comfort"],
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
    imgPosition: "center 50%",
  },
];

function PassengerIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
      <circle cx="8" cy="4" r="2.5" />
      <path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" strokeLinecap="round" />
    </svg>
  );
}

function BaggageIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-3.5 h-3.5">
      <rect x="4" y="5" width="8" height="9" rx="1" />
      <path d="M6 5V4a2 2 0 0 1 4 0v1" />
      <line x1="8" y1="8" x2="8" y2="11" />
    </svg>
  );
}

export default function Fleet() {
  return (
    <section id="fleet" className="bg-luxury-black pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="gold-divider mb-6" />
          <p className="text-xs tracking-[0.4em] uppercase text-gold font-sans font-medium mb-4">
            Our Vehicles
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-text font-bold">
            The Fleet
          </h2>
          <p className="mt-4 text-luxury-muted text-base font-sans font-light max-w-md mx-auto leading-relaxed tracking-wide">
            A carefully curated collection of the finest luxury vehicles, maintained to the highest standard.
          </p>
        </div>

        {/* Vehicle cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className="luxury-card lift-glow border-run group flex flex-col"
            >
              {/* Vehicle photo */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: v.imgPosition }}
                />
                {/* Subtle dark gradient at bottom for card content bleed */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-luxury-card to-transparent" />
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/40" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-gold/40" />
              </div>

              {/* Card content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-serif text-xl text-luxury-text font-semibold leading-tight">
                      {v.name}
                    </h3>
                    <p className="text-xs tracking-[0.18em] uppercase text-gold font-sans font-medium mt-0.5">
                      {v.category}
                    </p>
                  </div>
                </div>

                {/* Capacity */}
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-luxury-muted">
                    <PassengerIcon />
                    <span className="text-sm font-sans">{v.passengers} passengers</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-luxury-muted">
                    <BaggageIcon />
                    <span className="text-sm font-sans">{v.luggage} bags</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {v.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs tracking-[0.12em] uppercase px-2.5 py-1 border border-luxury-border text-luxury-subtle font-sans"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <a
                    href="/#booking"
                    className="block text-center py-3 text-xs tracking-[0.2em] uppercase font-sans font-semibold text-gold border border-gold/30 hover:border-gold hover:bg-gold/5 transition-all duration-300"
                  >
                    Request This Vehicle
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* "View Full Fleet" card */}
          <a href="/contact" className="luxury-card border-run lift-glow flex flex-col items-center justify-center p-10 text-center gap-4 min-h-[300px] group">
            <div className="w-12 h-12 border border-gold/20 group-hover:border-gold/50 flex items-center justify-center transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 text-gold/50 group-hover:text-gold transition-colors duration-300">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <div>
              <p className="font-serif text-lg text-luxury-muted font-medium">More Vehicles</p>
              <p className="text-xs text-luxury-subtle font-sans mt-1 tracking-wide">
                Enquire about our full fleet
              </p>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
