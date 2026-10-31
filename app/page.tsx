import Link from "next/link";

const designs = [
  {
    name: "Gold",
    path: "/gold",
    description: "Classic prestige — antique gold on deep black",
    nav: "Multi-page",
    swatches: ["#080808", "#C4A44A", "#CEAB5A"],
    tag: "Original",
  },
  {
    name: "Noir",
    path: "/noir",
    description: "Electric neon — cyan & purple on obsidian black",
    nav: "Multi-page",
    swatches: ["#050505", "#00D4FF", "#8B5CF6"],
    tag: "Dark",
  },
  {
    name: "Velvet",
    path: "/velvet",
    description: "Couture luxury — rose gold on deep plum",
    nav: "Overlay panels",
    swatches: ["#1A0828", "#C8847A", "#E8A89E"],
    tag: "Overlay",
  },
  {
    name: "Obsidian",
    path: "/obsidian",
    description: "Bold edge — scarlet on slate charcoal",
    nav: "Multi-page",
    swatches: ["#0F0F14", "#E02020", "#F0F0F5"],
    tag: "Dark",
  },
  {
    name: "Azure",
    path: "/azure",
    description: "Ocean authority — silver on deep navy blue",
    nav: "Overlay panels",
    swatches: ["#030B1F", "#7EB8D8", "#C8D8E8"],
    tag: "Overlay",
  },
  {
    name: "Amber",
    path: "/amber",
    description: "Whisky warmth — amber glow on espresso",
    nav: "Multi-page",
    swatches: ["#100800", "#E8921A", "#FFF8E8"],
    tag: "Dark",
  },
  {
    name: "Ivory",
    path: "/ivory",
    description: "Daytime elegance — gold leaf on warm ivory",
    nav: "Overlay panels",
    swatches: ["#FAF6EF", "#9A7820", "#0A1628"],
    tag: "Light · Overlay",
  },
  {
    name: "Midnight",
    path: "/midnight",
    description: "Cinematic romance — copper on deep navy",
    nav: "Multi-page",
    swatches: ["#020518", "#CC7B5A", "#C8C0E0"],
    tag: "Dark",
  },
];

export default function DesignIndex() {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card { animation: fadeUp 0.5s ease-out both; }
        .card:nth-child(1) { animation-delay: 0.05s; }
        .card:nth-child(2) { animation-delay: 0.10s; }
        .card:nth-child(3) { animation-delay: 0.15s; }
        .card:nth-child(4) { animation-delay: 0.20s; }
        .card:nth-child(5) { animation-delay: 0.25s; }
        .card:nth-child(6) { animation-delay: 0.30s; }
        .card:nth-child(7) { animation-delay: 0.35s; }
        .card:nth-child(8) { animation-delay: 0.40s; }
        .card:hover .preview-btn { opacity: 1; transform: translateY(0); }
        .preview-btn { opacity: 0; transform: translateY(6px); transition: opacity 0.25s ease, transform 0.25s ease; }
        .card:hover { border-color: rgba(196,164,74,0.5) !important; box-shadow: 0 8px 40px rgba(196,164,74,0.08); }
      `}</style>

      <main style={{ minHeight: "100vh", background: "#060606", padding: "0" }}>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "80px 24px 60px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C4A44A", marginBottom: "20px" }}>
            Design Showcase
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, color: "#F5F0E8", lineHeight: 1.1, marginBottom: "20px" }}>
            Wimbledon Limousines
          </h1>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "16px", color: "#7A7060", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
            8 design directions for client review. Click any to preview the full site.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1px",
          background: "rgba(255,255,255,0.05)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}>
          {designs.map((d) => (
            <Link key={d.name} href={d.path} style={{ textDecoration: "none" }}>
              <div
                className="card"
                style={{
                  background: "#0A0A0A",
                  padding: "36px 32px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  minHeight: "240px",
                }}
              >
                {/* Colour swatches */}
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  {d.swatches.map((c) => (
                    <div
                      key={c}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: c,
                        border: "1px solid rgba(255,255,255,0.12)",
                        flexShrink: 0,
                      }}
                    />
                  ))}
                  <span style={{
                    marginLeft: "auto",
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#4A4540",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "3px 8px",
                  }}>
                    {d.tag}
                  </span>
                </div>

                {/* Name */}
                <div>
                  <h2 style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#F5F0E8",
                    margin: 0,
                    lineHeight: 1.1,
                  }}>
                    {d.name}
                  </h2>
                  <p style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "14px",
                    color: "#7A7060",
                    margin: "8px 0 0",
                    lineHeight: 1.5,
                  }}>
                    {d.description}
                  </p>
                </div>

                {/* Footer row */}
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#4A4540",
                  }}>
                    {d.nav}
                  </span>
                  <span
                    className="preview-btn"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "12px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#C4A44A",
                    }}
                  >
                    Preview →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <div style={{ textAlign: "center", padding: "48px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "13px", color: "#4A4540", letterSpacing: "0.05em" }}>
            Wimbledon Limousines · Design Review · 2026
          </p>
        </div>
      </main>
    </>
  );
}
