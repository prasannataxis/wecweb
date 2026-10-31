import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wimbledon Limousines — Arrive With Distinction',
  description: "London's premier chauffeur service. Bespoke journeys crafted for those who expect nothing less than excellence.",
}

export default function AmberLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
