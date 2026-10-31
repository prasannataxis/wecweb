'use client';

import { useState } from 'react';

const CONTACT_TILES = [
  {
    icon: '📞',
    label: 'Phone',
    value: '+44 20 1234 5678',
    sub: 'Mon – Sun, 06:00 – 23:00',
    accent: '#E02020',
  },
  {
    icon: '✉',
    label: 'Email',
    value: 'info@wimbledonlimos.co.uk',
    sub: 'Replies within 2 hours',
    accent: '#E02020',
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    value: '+44 7700 900 123',
    sub: '24/7 instant response',
    accent: '#25D366',
  },
];

function ContactHex({ tile, delay }: { tile: (typeof CONTACT_TILES)[0]; delay: number }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: `hexReveal 0.5s ease ${delay}ms both`,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '200px',
          height: '173px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        className="contact-hex-cell"
      >
        {/* Pulsing outer border */}
        <div
          style={{
            position: 'absolute',
            inset: '-3px',
            background: tile.accent,
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            animation: 'hexPulse 2.5s ease-in-out infinite',
          }}
        />
        {/* Inner fill */}
        <div
          style={{
            position: 'absolute',
            inset: '4px',
            background: '#18181F',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            transition: 'background 0.25s',
          }}
          className="contact-hex-inner"
        />
        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ fontSize: '32px' }}>{tile.icon}</span>
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: tile.accent,
              fontWeight: 700,
              textTransform: 'uppercase',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {tile.label}
          </span>
        </div>
      </div>

      {/* Details below */}
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <div
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            color: '#F0F0F5',
            marginBottom: '4px',
          }}
        >
          {tile.value}
        </div>
        <div style={{ fontSize: '12px', color: '#7A7A8A' }}>{tile.sub}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    from: '',
    to: '',
    date: '',
    vehicle: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

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
            Contact
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
          Book Your{' '}
          <span style={{ color: '#E02020', fontStyle: 'italic' }}>Journey</span>
        </h1>
        <p style={{ fontSize: '16px', color: '#7A7A8A', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
          Get in touch to reserve a vehicle or request a quote.
          We respond within two hours, guaranteed.
        </p>
      </section>

      {/* Contact hex tiles */}
      <section
        style={{
          padding: '72px 80px 56px',
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          flexWrap: 'wrap',
        }}
      >
        {CONTACT_TILES.map((tile, i) => (
          <ContactHex key={tile.label} tile={tile} delay={i * 120} />
        ))}
      </section>

      {/* Divider */}
      <div
        style={{
          margin: '0 80px',
          borderTop: '1px solid rgba(224,32,32,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            marginTop: '-14px',
            background: '#0F0F14',
            padding: '0 24px',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '24px',
              background: '#E02020',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            }}
          />
        </div>
      </div>

      {/* Contact form */}
      <section style={{ padding: '56px 80px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 700,
              color: '#F0F0F5',
            }}
          >
            Send an Enquiry
          </h2>
        </div>

        {submitted ? (
          <div
            style={{
              textAlign: 'center',
              padding: '64px 40px',
              background: '#18181F',
              border: '1px solid rgba(224,32,32,0.3)',
              position: 'relative',
              overflow: 'hidden',
              animation: 'hexReveal 0.5s ease both',
            }}
          >
            {/* Success hex decoration */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '173px',
                background: 'rgba(224,32,32,0.05)',
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              }}
            />
            <div
              style={{
                width: '80px',
                height: '69px',
                background: '#E02020',
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#F0F0F5', fontSize: '28px' }}>✓</span>
            </div>
            <h3
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '28px',
                color: '#F0F0F5',
                marginBottom: '12px',
                position: 'relative',
              }}
            >
              Enquiry Received
            </h3>
            <p style={{ fontSize: '16px', color: '#7A7A8A', position: 'relative' }}>
              Thank you. We will respond within two hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              background: '#18181F',
              border: '1px solid rgba(224,32,32,0.15)',
              padding: '48px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
          >
            {/* Row 1: name + email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <FormField label="Full Name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
              <FormField label="Email Address" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
            </div>

            {/* Row 2: phone + vehicle */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <FormField label="Phone Number" name="phone" type="tel" placeholder="+44 ..." value={formData.phone} onChange={handleChange} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#E02020', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '9px', background: '#E02020', clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} />
                  Vehicle
                </label>
                <select
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  style={{
                    background: '#0F0F14',
                    border: '1px solid rgba(224,32,32,0.3)',
                    color: formData.vehicle ? '#F0F0F5' : '#7A7A8A',
                    fontSize: '15px',
                    padding: '12px 16px',
                    outline: 'none',
                    fontFamily: 'Montserrat, sans-serif',
                    borderRadius: '0',
                    width: '100%',
                  }}
                >
                  <option value="" disabled>Select a vehicle...</option>
                  <option value="s-class">Mercedes S-Class</option>
                  <option value="bmw7">BMW 7 Series</option>
                  <option value="rolls">Rolls-Royce Ghost</option>
                  <option value="vclass">Mercedes V-Class (MPV)</option>
                  <option value="range">Range Rover Autobiography</option>
                </select>
              </div>
            </div>

            {/* Row 3: from + to */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <FormField label="Pickup Location" name="from" placeholder="e.g. Heathrow T5" value={formData.from} onChange={handleChange} />
              <FormField label="Destination" name="to" placeholder="e.g. Mayfair, London" value={formData.to} onChange={handleChange} />
            </div>

            {/* Row 4: date + message */}
            <FormField label="Travel Date" name="date" type="date" value={formData.date} onChange={handleChange} />

            {/* Message */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#E02020', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '9px', background: '#E02020', clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} />
                Additional Notes
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Special requests, number of passengers, luggage, etc."
                rows={4}
                style={{
                  background: '#0F0F14',
                  border: '1px solid rgba(224,32,32,0.3)',
                  color: '#F0F0F5',
                  fontSize: '15px',
                  padding: '12px 16px',
                  outline: 'none',
                  fontFamily: 'Montserrat, sans-serif',
                  resize: 'vertical',
                  borderRadius: '0',
                }}
              />
            </div>

            {/* Submit */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                style={{
                  position: 'relative',
                  width: '220px',
                  height: '56px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
                className="submit-hex-btn"
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#E02020',
                    clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)',
                    transition: 'filter 0.2s',
                  }}
                  className="submit-hex-fill"
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
                  SEND ENQUIRY →
                </span>
              </button>
            </div>
          </form>
        )}
      </section>

      <style>{`
        .contact-hex-cell:hover .contact-hex-inner { background: #E02020 !important; }
        .submit-hex-btn:hover .submit-hex-fill { filter: brightness(1.18); }
        input:focus, textarea:focus, select:focus {
          border-color: #E02020 !important;
          box-shadow: 0 0 0 1px rgba(224,32,32,0.3);
        }
      `}</style>
    </div>
  );
}

function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label
        style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: '#E02020',
          fontWeight: 700,
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        {/* Mini hex bullet */}
        <div
          style={{
            width: '10px',
            height: '9px',
            background: '#E02020',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          }}
        />
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          background: '#0F0F14',
          border: '1px solid rgba(224,32,32,0.3)',
          color: '#F0F0F5',
          fontSize: '15px',
          padding: '12px 16px',
          outline: 'none',
          fontFamily: 'Montserrat, sans-serif',
          borderRadius: '0',
          width: '100%',
          colorScheme: 'dark',
          transition: 'border-color 0.2s',
        }}
      />
    </div>
  );
}
