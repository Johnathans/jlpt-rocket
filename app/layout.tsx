import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import ConditionalLayout from '@/components/ConditionalLayout';
import { AuthProvider } from '@/lib/auth';
import { JLPTLevelProvider } from '@/contexts/JLPTLevelContext';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });
const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'], 
  variable: '--font-japanese',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rocket JLPT - Master Japanese with JLPT Preparation',
  description: 'Comprehensive JLPT preparation with adaptive practice, progress tracking, and mastery-based learning for all levels N5 to N1.',
  verification: {
    google: 'QTXmBhJNtHqoEMr5xvi4txr4HOtyartnb9jeFyoSf9Q',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/icon.svg',
    apple: '/apple-touch-icon.svg',
  },
  openGraph: {
    title: 'Rocket JLPT - Master Japanese with JLPT Preparation',
    description: 'Comprehensive JLPT preparation with adaptive practice, progress tracking, and mastery-based learning for all levels N5 to N1.',
    images: ['/icon.svg'],
    siteName: 'Rocket JLPT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rocket JLPT - Master Japanese with JLPT Preparation',
    description: 'Comprehensive JLPT preparation with adaptive practice, progress tracking, and mastery-based learning for all levels N5 to N1.',
    images: ['/icon.svg'],
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
        <GoogleAnalytics />
        <AuthProvider>
          <JLPTLevelProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </JLPTLevelProvider>
        </AuthProvider>
      </body>
    </html>
  );
}