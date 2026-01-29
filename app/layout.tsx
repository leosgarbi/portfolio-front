import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Inter, Orbitron, Playfair_Display } from 'next/font/google';
import type React from 'react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://leosgarbi.com.br'),
  title: 'Léo Sgarbi — Desenvolvedor Front-End',
  description:
    'Desenvolvedor front-end explorando experiências digitais e narrativas visuais através do código, fotografia e vídeo.',
  keywords: [
    'Desenvolvedor Front-End',
    'React',
    'Next.js',
    'TypeScript',
    'Portfólio',
    'Web Developer',
    'Visual Storytelling',
  ],
  authors: [{ name: 'Léo Sgarbi' }],
  creator: 'Léo Sgarbi',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
