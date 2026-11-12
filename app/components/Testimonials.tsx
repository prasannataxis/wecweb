const testimonials = [
  {
    name: "James Hartington",
    role: "Managing Director, Hartington Capital",
    rating: 5,
    quote:
      "I use Wimbledon Executive Chauffeurs for all my client airport runs. The chauffeurs are punctual, professional, and discreet. Exactly what you need when travelling with high-value guests.",
    initials: "JH",
  },
  {
    name: "Priya Sharma",
    role: "Event Director, London",
    rating: 5,
    quote:
      "Booked for our Royal Ascot corporate day — eight guests, two vehicles. Everything was seamless. The cars were immaculate and the drivers were charming. Will absolutely book again.",
    initials: "PS",
  },
  {
    name: "Oliver & Sophie Reynolds",
    role: "Wedding Clients, Surrey",
    rating: 5,
    quote:
      "They made our wedding day even more special. The S-Class was beautifully presented with white ribbons, and our chauffeur was the picture of elegance. Truly a five-star service.",
    initials: "OR",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1"
          className={`w-3.5 h-3.5 ${i < count ? "text-gold" : "text-luxury-subtle"}`}
        >
          <polygon points="6 1 7.5 4.5 11 4.9 8.5 7.3 9.2 11 6 9.2 2.8 11 3.5 7.3 1 4.9 4.5 4.5" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-luxury-dark py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="gold-divider mb-6" />
          <p className="text-xs tracking-[0.4em] uppercase text-gold font-sans font-medium mb-4">
            Client Reviews
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-text font-bold">
            Trusted by London&apos;s Finest
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="luxury-card lift-glow border-run p-8 flex flex-col gap-5">
              {/* Stars */}
              <StarRow count={t.rating} />

              {/* Quote mark */}
              <div className="font-serif text-5xl text-gold/20 leading-none select-none -mt-2">&ldquo;</div>

              {/* Quote */}
              <p className="text-luxury-text text-base font-sans font-light leading-relaxed -mt-4">
                {t.quote}
              </p>

              {/* Reviewer */}
              <div className="mt-auto flex items-center gap-4 pt-5 border-t border-luxury-border">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs tracking-wider text-gold font-sans font-semibold">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <div className="text-sm text-luxury-text font-sans font-medium">{t.name}</div>
                  <div className="text-xs text-luxury-muted font-sans mt-0.5 tracking-wide">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google rating badge */}
        <div className="mt-12 flex justify-center">
          <div className="luxury-card border-run flex items-center gap-4 px-8 py-4">
            <div className="flex flex-col items-center">
              <div className="font-serif text-3xl gold-text font-bold">5.0</div>
              <StarRow count={5} />
            </div>
            <div className="h-10 w-px bg-luxury-border" />
            <div>
              <div className="text-xs text-luxury-muted font-sans tracking-wide">Rated on</div>
              <div className="text-sm text-luxury-text font-sans font-medium mt-0.5">Google Reviews</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
