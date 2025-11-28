'use client';

import { usePathname } from 'next/navigation';
import SidebarLayout from '@/components/SidebarLayout';
import PublicNavbar from '@/components/PublicNavbar';
import StreakCounter from '@/components/StreakCounter';
import CategoryLinks from '@/components/CategoryLinks';
import Footer from '@/components/Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isTrainingMode = pathname === '/match' || pathname === '/cloze' || pathname === '/input' || pathname === '/flashcard' || pathname?.includes('/training/') || pathname?.includes('/story/') || pathname?.includes('/test/') && pathname !== '/test';
  const isPublicJLPTPage = pathname?.startsWith('/jlpt/');
  const isHowToPassPage = pathname?.startsWith('/how-to-pass/');
  const isSupportPage = pathname === '/about' || pathname === '/help' || pathname === '/contact' || pathname === '/privacy' || pathname === '/schools';
  const isMarketingPage = pathname === '/' || pathname === '/login' || pathname === '/signup' || isSupportPage;
  
  // Only show footer on marketing and how-to-pass pages
  const shouldShowFooter = isMarketingPage || isHowToPassPage;

  // Public JLPT pages have their own navbar
  if (isPublicJLPTPage) {
    return <>{children}</>;
  }

  // How to Pass pages - always public
  if (isHowToPassPage) {
    return (
      <div className="min-h-screen bg-white">
        <PublicNavbar />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    );
  }

  if (isTrainingMode) {
    // Clean layout for training modes
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
        {children}
      </div>
    );
  }

  if (isMarketingPage) {
    // Marketing layout with public navbar
    return (
      <div className="min-h-screen bg-white">
        <PublicNavbar />
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
      <main className="relative" style={{ backgroundColor: '#f9fafb' }}>
        <CategoryLinks />
        <StreakCounter />
        <div>
          {children}
        </div>
      </main>
    </SidebarLayout>
  );
}
