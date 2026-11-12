const services = [
  {
    roman: "I",
    title: "Airport Transfers",
    subtitle: "All London Airports",
    description:
      "Professional meet & greet at Heathrow, Gatwick, Stansted, Luton and Farnborough. Flight tracking included — we wait for you.",
    detail: "Heathrow · Gatwick · Stansted · Luton · Farnborough",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 text-gold">
        <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2h0A1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
    ),
  },
  {
    roman: "II",
    title: "Corporate Accounts",
    subtitle: "Executive Travel",
    description:
      "Dedicated account management, monthly consolidated invoicing, and priority dispatch for your business travel needs.",
    detail: "Monthly billing · Priority booking · Account manager",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 text-gold">
        <rect x="2" y="7" width="20" height="14" rx="1.5" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    roman: "III",
    title: "Event Chauffeur",
    subtitle: "London Events",
    description:
      "Wimbledon, Royal Ascot, Wembley, O2 Arena and more. Arrive in complete comfort at London's most prestigious occasions.",
    detail: "Wimbledon · Royal Ascot · Wembley · O2 Arena",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 text-gold">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    roman: "IV",
    title: "Wedding Hire",
    subtitle: "Your Special Day",
    description:
      "Immaculately presented vehicles with white ribbons, punctuality guaranteed, and flexible packages tailored to your day.",
    detail: "Bridal car · Wedding party · Church to reception",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 text-gold">
        <circle cx="9" cy="12" r="5" />
        <circle cx="15" cy="12" r="5" />
        <path d="M12 8c0-1.1.9-2 2-2s2 .9 2 2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-luxury-dark pt-40 pb-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="gold-divider mb-6" />
          <p className="text-xs tracking-[0.4em] uppercase text-gold font-sans font-medium mb-4">
            What We Offer
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-text font-bold">
            Our Services
          </h2>
          <p className="mt-4 text-luxury-muted text-sm font-sans font-light max-w-md mx-auto leading-relaxed tracking-wide">
            Every journey is tailored to your requirements — professionally driven, impeccably presented.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-luxury-border">
          {services.map((svc) => (
            <div
              key={svc.roman}
              className="bg-luxury-dark group hover:bg-luxury-card2 lift-glow border-run border-run-hover p-8 flex flex-col gap-5 cursor-default"
            >
              {/* Icon */}
              <div className="w-14 h-14 border border-gold/20 flex items-center justify-center group-hover:border-gold/50 transition-colors duration-300">
                {svc.icon}
              </div>

              {/* Roman numeral */}
              <div className="text-xs tracking-[0.3em] uppercase text-gold/40 font-serif font-semibold">
                {svc.roman}
              </div>

              {/* Text */}
              <div>
                <h3 className="font-serif text-xl text-luxury-text font-semibold mb-1">
                  {svc.title}
                </h3>
                <p className="text-xs tracking-[0.2em] uppercase text-gold font-sans font-medium mb-3">
                  {svc.subtitle}
                </p>
                <p className="text-luxury-muted text-sm font-sans font-light leading-relaxed">
                  {svc.description}
                </p>
              </div>

              {/* Detail tag */}
              <div className="mt-auto pt-4 border-t border-luxury-border">
                <p className="text-xs text-luxury-subtle font-sans tracking-wide leading-relaxed">
                  {svc.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
