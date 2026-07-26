import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/CustomCursor/CustomCursor';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alieezz Photography | Timeless Wedding & Portrait Storytelling',
  description:
    'Alieezz Photography crafts timeless wedding and portrait stories through a cinematic, artistic lens. Book your heritage wedding or fine-art portrait session today.',
  keywords: ['wedding photography', 'portrait photography', 'Alieezz Photography', 'Lahore photographer', 'cinematic wedding'],
  openGraph: {
    title: 'Alieezz Photography',
    description: 'Timeless wedding & portrait storytelling.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body style={{ fontFamily: 'var(--font-sans)' }}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
