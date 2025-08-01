'use client';

import { usePathname } from 'next/navigation';
import TopNavbar from '@/components/Sidebar';
import MarketingNavbar from '@/components/MarketingNavbar';
import StreakCounter from '@/components/StreakCounter';
import CategoryLinks from '@/components/CategoryLinks';
import Footer from '@/components/Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isTrainingMode = pathname?.startsWith('/match') || pathname?.startsWith('/cloze') || pathname?.includes('training');
  const isMarketingPage = pathname === '/' || pathname === '/login' || pathname === '/signup';
  
  // Only show footer on marketing pages
  const shouldShowFooter = isMarketingPage;

  if (isTrainingMode) {
    // Clean layout for training modes
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    );
  }

  if (isMarketingPage) {
    // Marketing layout with simplified navbar
    return (
      <div className="min-h-screen bg-white">
        <MarketingNavbar />
        <main>
          {children}
        </main>
        {shouldShowFooter && <Footer />}
      </div>
    );
  }

  // Regular app layout with full navbar, categories, and streak
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <main className="bg-gray-50 relative">
        <CategoryLinks />
        <StreakCounter />
        <div>
          {children}
        </div>
      </main>
    </div>
  );
}
