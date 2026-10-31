const events = [
  {
    name: "Wimbledon Championships",
    venue: "All England Club",
    location: "SW19, Wimbledon",
    dates: "23 Jun – 6 Jul 2025",
    tag: "Tennis",
    color: "#1a4a1a",
    accent: "rgba(34,197,94,0.12)",
  },
  {
    name: "Royal Ascot",
    venue: "Ascot Racecourse",
    location: "Ascot, Berkshire",
    dates: "17 – 21 Jun 2025",
    tag: "Horse Racing",
    color: "#2a1a1a",
    accent: "rgba(239,68,68,0.12)",
  },
  {
    name: "Wembley Stadium",
    venue: "Wembley Stadium",
    location: "Wembley, London",
    dates: "Year-round events",
    tag: "Stadium",
    color: "#1a1a2a",
    accent: "rgba(99,102,241,0.12)",
  },
  {
    name: "The O2 Arena",
    venue: "The O2",
    location: "Greenwich Peninsula",
    dates: "Year-round events",
    tag: "Arena",
    color: "#1a1a2a",
    accent: "rgba(59,130,246,0.12)",
  },
  {
    name: "Twickenham Stadium",
    venue: "Twickenham",
    location: "Twickenham, London",
    dates: "Six Nations & more",
    tag: "Rugby",
    color: "#1a1a1a",
    accent: "rgba(245,158,11,0.10)",
  },
  {
    name: "Chelsea Flower Show",
    venue: "Royal Hospital Chelsea",
    location: "Chelsea, London",
    dates: "19 – 23 May 2025",
    tag: "Garden Show",
    color: "#1a2a1a",
    accent: "rgba(16,185,129,0.10)",
  },
];

export default function LondonEvents() {
  return (
    <section id="events" className="bg-luxury-dark py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="gold-divider mb-6" />
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans font-medium mb-4">
            Event Transfers
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-text font-bold">
            London Events
          </h2>
          <p className="mt-4 text-luxury-muted text-sm font-sans font-light max-w-lg mx-auto leading-relaxed tracking-wide">
            Book a dedicated chauffeur for London&apos;s finest events. We handle the traffic — you enjoy the occasion.
          </p>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((ev) => (
            <div
              key={ev.name}
              className="group relative overflow-hidden border border-luxury-border hover:border-gold/30 transition-all duration-300 cursor-pointer"
              style={{ background: ev.color }}
            >
              {/* Accent glow */}
              <div
                className="absolute inset-0 opacity-100"
                style={{ background: `radial-gradient(ellipse at top left, ${ev.accent}, transparent 70%)` }}
              />

              <div className="relative p-6 flex flex-col gap-4">
                {/* Tag + Date row */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.25em] uppercase text-gold/70 font-sans font-medium border border-gold/20 px-2.5 py-1">
                    {ev.tag}
                  </span>
                  <span className="text-[10px] text-luxury-muted font-sans">{ev.dates}</span>
                </div>

                {/* Event name */}
                <div>
                  <h3 className="font-serif text-xl text-luxury-text font-semibold leading-tight">
                    {ev.name}
                  </h3>
                  <p className="text-xs text-luxury-muted font-sans mt-1">{ev.venue}</p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-luxury-subtle">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-3.5 h-3.5 flex-shrink-0">
                    <circle cx="8" cy="6.5" r="2.5" />
                    <path d="M8 2C5.24 2 3 4.24 3 7c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" />
                  </svg>
                  <span className="text-xs font-sans">{ev.location}</span>
                </div>

                {/* CTA */}
                <a
                  href="#booking"
                  className="mt-1 flex items-center justify-between py-3 px-4 border border-gold/20 hover:border-gold/60 hover:bg-gold/5 group-hover:border-gold/40 transition-all duration-300"
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gold font-sans font-semibold">
                    Book Chauffeur
                  </span>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-gold">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center text-luxury-subtle text-xs font-sans mt-8 tracking-wide">
          Don&apos;t see your event? &nbsp;
          <a href="#contact" className="text-gold hover:text-gold-light transition-colors underline underline-offset-2">
            Contact us
          </a>
          &nbsp;— we cover all London and South East venues.
        </p>
      </div>
    </section>
  );
}
