import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Midnight — Wimbledon Limousines",
  description: "Arrive With Distinction. Premium chauffeured car hire in London.",
};

export default function MidnightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');

        :root {
          --midnight-navy:      #020518;
          --midnight-navy-2:    #050A28;
          --copper:             #CC7B5A;
          --copper-light:       #E8A882;
          --lavender-white:     #F4F0F8;
          --lavender-grey:      #7868A8;
          --border-copper:      rgba(204,123,90,0.15);
          --border-copper-md:   rgba(204,123,90,0.25);
          --overlay:            rgba(2,5,28,0.55);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--midnight-navy);
          color: var(--lavender-white);
          font-family: 'Montserrat', sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        @keyframes rightPanelIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes leftImageFade {
          from { opacity: 0.4; }
          to   { opacity: 1; }
        }

        @keyframes copperShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        @keyframes breathe {
          0%, 100% { box-shadow: 0 0 0 0 rgba(204,123,90,0); }
          50%       { box-shadow: 0 0 16px 2px rgba(204,123,90,0.2); }
        }

        @keyframes dotFill {
          from { transform: scale(0.8); opacity: 0.6; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
      {children}
    </>
  );
}
