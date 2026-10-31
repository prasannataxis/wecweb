const features = [
  {
    title: "15+ Years Experience",
    description: "Over a decade and a half serving London's most discerning clients with consistent excellence.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Professional Chauffeurs",
    description: "All drivers are fully licensed, DBS-checked, and trained in executive protection etiquette.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2z" />
        <path d="M2 20c0-4.4 4.48-8 10-8s10 3.6 10 8" strokeLinecap="round" />
        <path d="M9 13l1.5 7L12 18l1.5 2L15 13" />
      </svg>
    ),
  },
  {
    title: "Flight Tracking",
    description: "We monitor your flight in real time and adjust your pickup accordingly — no extra charges for delays.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2h0A1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
    ),
  },
  {
    title: "Meet & Greet",
    description: "Your chauffeur will be waiting in Arrivals with a name board, ready to assist with luggage.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M8 9l3 3-3 3M13 15h3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="3" width="20" height="18" rx="2" />
      </svg>
    ),
  },
  {
    title: "Fixed Price Guarantee",
    description: "The price you see is the price you pay. No surge pricing, no hidden fees, ever.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v2M12 16v2M8.5 9.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 0 7 3.5 3.5 0 0 1-3.5-3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "24/7 Availability",
    description: "Our team is on call around the clock — early morning flights, late-night arrivals, no problem.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    title: "Privacy & Discretion",
    description: "We serve high-profile clients and celebrities — your privacy is our absolute priority.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Immaculate Presentation",
    description: "Every vehicle is cleaned, valeted, and stocked with water before each journey.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="bg-luxury-black py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="gold-divider mb-6" />
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold font-sans font-medium mb-4">
            The Standard We Keep
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-text font-bold">
            Why Choose Us
          </h2>
          <p className="mt-4 text-luxury-muted text-sm font-sans font-light max-w-md mx-auto leading-relaxed tracking-wide">
            Every detail considered. Every journey perfected.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="group p-6 border border-luxury-border hover:border-gold/25 transition-all duration-300 flex flex-col gap-4"
            >
              {/* Icon */}
              <div className="text-gold/60 group-hover:text-gold transition-colors duration-300">
                {feat.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-serif text-base text-luxury-text font-semibold mb-2 leading-snug">
                  {feat.title}
                </h3>
                <p className="text-luxury-muted text-xs font-sans font-light leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
