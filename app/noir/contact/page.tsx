"use client";

import { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────────
   WIMBLEDON LIMOUSINES — NOIR CONTACT PAGE
   Route: /noir/contact  (contact info + form + footer)
───────────────────────────────────────────────────────────────────────────── */

const CONTACT_STYLES = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes gridDrift {
    from { background-position: 0 0; }
    to   { background-position: 50px 50px; }
  }

  @keyframes neonPulse {
    0%, 100% { box-shadow: 0 0 4px rgba(0,212,255,0.4), 0 0 12px rgba(0,212,255,0.2); }
    50%       { box-shadow: 0 0 8px rgba(0,212,255,0.8), 0 0 28px rgba(0,212,255,0.4); }
  }

  .cnt-bg-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,212,255,0.014) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.014) 1px, transparent 1px);
    background-size: 52px 52px;
    animation: gridDrift 12s linear infinite;
    pointer-events: none;
    z-index: 0;
  }

  .contact-field {
    background: #111111;
    border: 1px solid rgba(0,212,255,0.12);
    color: #ffffff;
    transition: border-color 0.3s, box-shadow 0.3s;
    outline: none;
    width: 100%;
    font-size: 16px;
    padding: 14px 16px;
    border-radius: 2px;
    font-family: var(--font-montserrat), sans-serif;
    letter-spacing: 0.02em;
  }
  .contact-field::placeholder { color: rgba(200,214,229,0.2); }
  .contact-field:focus {
    border-color: rgba(0,212,255,0.55);
    box-shadow: 0 0 0 3px rgba(0,212,255,0.08), 0 0 12px rgba(0,212,255,0.1);
  }

  .contact-card {
    background: linear-gradient(155deg, #0D0D0D 0%, #0A0A0A 100%);
    border: 1px solid rgba(0,212,255,0.1);
    border-radius: 6px;
    padding: 32px 28px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s;
  }
  .contact-card:hover {
    border-color: rgba(0,212,255,0.28);
    box-shadow: 0 16px 48px rgba(0,212,255,0.08);
    transform: translateY(-3px);
  }

  .contact-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 10px;
    background: rgba(0,212,255,0.07);
    border: 1px solid rgba(0,212,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
    animation: neonPulse 3s ease-in-out infinite;
  }

  .submit-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #00D4FF 0%, #0099BB 60%, #006688 100%);
    color: #000000;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    border-radius: 2px;
    transition: filter 0.3s, transform 0.2s;
    animation: neonPulse 2.5s ease-in-out infinite;
    font-family: var(--font-montserrat), sans-serif;
    margin-top: 8px;
  }
  .submit-btn:hover { filter: brightness(1.12); transform: translateY(-1px); }

  .cnt-fade-1 { animation: fadeSlideUp 0.75s ease-out 0.05s both; }
  .cnt-fade-2 { animation: fadeSlideUp 0.75s ease-out 0.15s both; }
  .cnt-fade-3 { animation: fadeSlideUp 0.75s ease-out 0.25s both; }
  .cnt-fade-4 { animation: fadeSlideUp 0.75s ease-out 0.35s both; }

  .noir-footer {
    border-top: 1px solid rgba(0,212,255,0.12);
    background: #030303;
    padding: 48px 0 32px;
    margin-top: 80px;
  }

  .footer-link {
    color: rgba(255,255,255,0.4);
    font-size: 14px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    transition: color 0.25s;
    font-family: var(--font-montserrat), sans-serif;
  }
  .footer-link:hover { color: #00D4FF; }

  .glowBarSweep {
    height: 1px;
    background: linear-gradient(90deg, transparent, #00D4FF 30%, #8B5CF6 60%, #00D4FF 80%, transparent);
  }

  .cyan-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,212,255,0.35), rgba(139,92,246,0.2), transparent);
  }
`;

const CONTACT_INFO = [
  {
    icon: "📞",
    label: "Phone",
    value: "+44 20 7946 0000",
    sub: "Available 24 hours, 7 days a week",
    href: "tel:+442079460000",
  },
  {
    icon: "✉",
    label: "Email",
    value: "info@wimbledonlimousines.co.uk",
    sub: "We respond within 30 minutes",
    href: "mailto:info@wimbledonlimousines.co.uk",
  },
  {
    icon: "📱",
    label: "WhatsApp",
    value: "+44 7700 000 000",
    sub: "Instant message for urgent bookings",
    href: "https://wa.me/447700000000",
  },
  {
    icon: "📍",
    label: "Address",
    value: "4 The Pavement, London SW19 4DA",
    sub: "Wimbledon Village, South West London",
    href: "https://maps.google.com/?q=Wimbledon+Village+London",
  },
];

const FOOTER_LINKS = [
  { label: "Home",     href: "/noir" },
  { label: "Fleet",   href: "/noir/fleet" },
  { label: "Services", href: "/noir/services" },
  { label: "Events",   href: "/noir/events" },
  { label: "About",    href: "/noir/about" },
  { label: "Privacy",  href: "#" },
  { label: "Terms",    href: "#" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <style>{CONTACT_STYLES}</style>
      <div className="cnt-bg-grid" />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          background: "linear-gradient(180deg, #050505 0%, #080808 100%)",
          padding: "72px 0 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#00D4FF",
                  fontWeight: 600,
                  fontFamily: "var(--font-montserrat), sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span style={{ height: "1px", width: "32px", background: "linear-gradient(90deg, #00D4FF, transparent)", display: "block" }} />
                Get In Touch
                <span style={{ height: "1px", width: "32px", background: "linear-gradient(270deg, #00D4FF, transparent)", display: "block" }} />
              </div>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                color: "#ffffff",
                fontSize: "clamp(48px, 6vw, 80px)",
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: "20px",
              }}
            >
              CONTACT US
            </h1>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "18px",
                color: "rgba(200,214,229,0.55)",
                maxWidth: "540px",
                margin: "0 auto",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Our team is available around the clock. Reach us by phone, email or WhatsApp for an instant response.
            </p>
          </div>

          {/* Contact info cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
              marginBottom: "72px",
            }}
          >
            {CONTACT_INFO.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`contact-card cnt-fade-${i + 1}`}
                style={{ textDecoration: "none" }}
              >
                <div className="contact-icon-wrap">{c.icon}</div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "12px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#00D4FF",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      color: "#ffffff",
                      fontSize: "18px",
                      fontWeight: 600,
                      marginBottom: "4px",
                      lineHeight: 1.3,
                    }}
                  >
                    {c.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "14px",
                      color: "rgba(200,214,229,0.4)",
                    }}
                  >
                    {c.sub}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Contact form */}
          <div
            style={{
              maxWidth: "720px",
              margin: "0 auto 96px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                color: "#ffffff",
                fontSize: "clamp(48px, 4vw, 56px)",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "12px",
              }}
            >
              Send a Message
            </h2>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "16px",
                color: "rgba(200,214,229,0.45)",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              We typically respond within 30 minutes during business hours.
            </p>

            {submitted ? (
              <div
                style={{
                  background: "rgba(0,212,255,0.06)",
                  border: "1px solid rgba(0,212,255,0.3)",
                  borderRadius: "6px",
                  padding: "48px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✦</div>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    color: "#00D4FF",
                    fontSize: "28px",
                    fontWeight: 700,
                    marginBottom: "12px",
                  }}
                >
                  Message Received
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "16px",
                    color: "rgba(200,214,229,0.6)",
                  }}
                >
                  Thank you, {form.name || "valued client"}. A member of our team will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  {[
                    { name: "name",  label: "Full Name",     placeholder: "Your full name",    type: "text" },
                    { name: "email", label: "Email Address", placeholder: "your@email.com",   type: "email" },
                  ].map(({ name, label, placeholder, type }) => (
                    <div key={name}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "12px",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "rgba(0,212,255,0.7)",
                          marginBottom: "8px",
                          fontWeight: 500,
                          fontFamily: "var(--font-montserrat), sans-serif",
                        }}
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={form[name as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="contact-field"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(0,212,255,0.7)",
                      marginBottom: "8px",
                      fontWeight: 500,
                      fontFamily: "var(--font-montserrat), sans-serif",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+44 7700 000 000"
                    className="contact-field"
                  />
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(0,212,255,0.7)",
                      marginBottom: "8px",
                      fontWeight: 500,
                      fontFamily: "var(--font-montserrat), sans-serif",
                    }}
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your journey, event or enquiry…"
                    rows={5}
                    className="contact-field"
                    required
                    style={{ resize: "vertical", minHeight: "120px" }}
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ─── FOOTER ─── */}
        <footer className="noir-footer">
          <div className="max-w-7xl mx-auto px-6">
            {/* Glow bar */}
            <div className="glowBarSweep" style={{ marginBottom: "40px" }} />

            {/* Footer grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "start",
                gap: "48px",
              }}
            >
              {/* Logo */}
              <div>
                <Link href="/noir" style={{ textDecoration: "none", display: "inline-block" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      color: "#ffffff",
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      fontSize: "18px",
                    }}
                  >
                    WIMBLEDON
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                    <span style={{ height: "1px", width: "20px", background: "rgba(0,212,255,0.5)", display: "block" }} />
                    <span
                      style={{
                        color: "#00D4FF",
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "12px",
                        letterSpacing: "0.3em",
                        fontVariant: "small-caps",
                        fontWeight: 600,
                      }}
                    >
                      LIMOUSINES
                    </span>
                    <span style={{ height: "1px", width: "20px", background: "rgba(0,212,255,0.5)", display: "block" }} />
                  </div>
                </Link>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "14px",
                    color: "rgba(200,214,229,0.35)",
                    lineHeight: 1.6,
                    marginTop: "16px",
                    maxWidth: "240px",
                  }}
                >
                  London&apos;s premier luxury chauffeur service since 2009.
                </p>
              </div>

              {/* Links */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                {FOOTER_LINKS.map(({ label, href }) => (
                  <Link key={label} href={href} className="footer-link">
                    {label}
                  </Link>
                ))}
              </div>

              {/* Contact right */}
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#00D4FF",
                    fontWeight: 600,
                    marginBottom: "12px",
                  }}
                >
                  24 / 7 Dispatch
                </div>
                <a
                  href="tel:+442079460000"
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    color: "#ffffff",
                    fontSize: "20px",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  +44 20 7946 0000
                </a>
                <a
                  href="mailto:info@wimbledonlimousines.co.uk"
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    color: "rgba(200,214,229,0.45)",
                    fontSize: "14px",
                    textDecoration: "none",
                    display: "block",
                    marginBottom: "20px",
                  }}
                >
                  info@wimbledonlimousines.co.uk
                </a>

                {/* Social links */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                  <a
                    href="https://wa.me/447700000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid rgba(0,212,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                    aria-label="WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" style={{ width: "16px", height: "16px" }} fill="#00D4FF">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright bar */}
            <div
              style={{
                height: "1px",
                background: "rgba(0,212,255,0.08)",
                margin: "36px 0 24px",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.1em",
                }}
              >
                © 2024 Wimbledon Limousines Ltd. All rights reserved.
              </span>
              <span
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.15)",
                  letterSpacing: "0.08em",
                }}
              >
                Registered in England & Wales · Company No. 12345678
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
