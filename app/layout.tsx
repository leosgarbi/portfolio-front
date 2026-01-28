import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Inter, Orbitron, Playfair_Display } from 'next/font/google';
import type React from 'react';
import './globals.css';

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Léo Sgarbi',
  description:
    'Portfolio épico de desenvolvedor front-end e fotógrafo/videomaker profissional',
  generator: 'v0.app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body
        className={`${inter.className} ${orbitron.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
