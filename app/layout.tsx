import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import ConditionalLayout from '@/components/ConditionalLayout';

const inter = Inter({ subsets: ['latin'] });
const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'], 
  variable: '--font-japanese',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rocket JLPT',
  description: 'Master JLPT with graded reading stories and furigana support',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Rocket JLPT',
    description: 'Master JLPT with graded reading stories and furigana support',
    images: ['/favicon.png'],
  },
  twitter: {
    card: 'summary',
    title: 'Rocket JLPT',
    description: 'Master JLPT with graded reading stories and furigana support',
    images: ['/favicon.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${notoSansJP.variable}`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}