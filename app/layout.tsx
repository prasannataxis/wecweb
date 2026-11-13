import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { WhatsAppButton } from "./components/contact-info";
import { SettingsProvider } from "./theme/SettingsProvider";
import CardTints from "./theme/CardTints";
import { DEFAULT_SETTINGS, themeInitScript } from "./theme/config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wimbledon Executive Chauffeurs | Luxury Chauffeur Service London",
  description: "London's premier luxury chauffeur service. Executive airport transfers, corporate accounts, event chauffeur and wedding hire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-mode={DEFAULT_SETTINGS.mode}
      data-accent={DEFAULT_SETTINGS.accent}
      className={`${playfair.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased bg-luxury-black text-luxury-text">
        <SettingsProvider>
          <Navbar />
          {children}
          <WhatsAppButton />
          <CardTints />
        </SettingsProvider>
      </body>
    </html>
  );
}
