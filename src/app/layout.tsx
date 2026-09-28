import type { Metadata } from 'next';
import './globals.css';
import { AttributionProvider } from '@/context/AttributionContext';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'AdOmni Attribution — Omnichannel Performance & Markov Multi-Touch System',
  description:
    'Titan #40: Asymmetrical performance marketing attribution engine, cross-channel ROAS telemetry, Markov chain removal effects, and cohort LTV analytics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#09090b] text-[#f4f4f5]">
        <AttributionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </AttributionProvider>
      </body>
    </html>
  );
}
