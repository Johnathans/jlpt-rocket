'use client';

import { usePathname } from 'next/navigation';
import SidebarLayout from '@/components/SidebarLayout';
import MarketingNavbar from '@/components/MarketingNavbar';
import StreakCounter from '@/components/StreakCounter';
import CategoryLinks from '@/components/CategoryLinks';
import Footer from '@/components/Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isTrainingMode = pathname === '/match' || pathname === '/cloze' || pathname === '/input' || pathname === '/flashcard' || pathname?.includes('/training/') || pathname?.includes('/story/') || pathname?.includes('/test/') && pathname !== '/test';
  const isMarketingPage = pathname === '/' || pathname === '/login' || pathname === '/signup';
  
  // Only show footer on marketing pages
  const shouldShowFooter = isMarketingPage;

  if (isTrainingMode) {
    // Clean layout for training modes
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f9f8ff' }}>
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

  // Regular app layout with sidebar, categories, and streak
  return (
    <SidebarLayout>
      <main className="relative" style={{ backgroundColor: '#f9f8ff' }}>
        <CategoryLinks />
        <StreakCounter />
        <div>
          {children}
        </div>
      </main>
    </SidebarLayout>
  );
}
