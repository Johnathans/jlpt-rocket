'use client';

import { usePathname } from 'next/navigation';
import TopNavbar from '@/components/Sidebar';
import StreakCounter from '@/components/StreakCounter';
import CategoryLinks from '@/components/CategoryLinks';
import Footer from '@/components/Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isTrainingMode = pathname?.startsWith('/match') || pathname?.startsWith('/cloze') || pathname?.includes('training');
  
  // Only show footer on home, login, and sign up pages
  const shouldShowFooter = pathname === '/' || pathname === '/login' || pathname === '/signup';

  if (isTrainingMode) {
    // Clean layout for training modes
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    );
  }

  // Regular layout with navbar and conditional footer
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <main className="bg-gray-50 relative">
        <CategoryLinks />
        <StreakCounter />
        <div>
          {children}
        </div>
        {shouldShowFooter && <Footer />}
      </main>
    </div>
  );
}
