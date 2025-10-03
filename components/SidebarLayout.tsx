'use client';

import React, { createContext, useContext, useState } from 'react';
import DashboardNavbar from './DashboardNavbar';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarLayout');
  }
  return context;
};

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      <div className="min-h-screen" style={{ backgroundColor: '#f9f8ff' }}>
        <DashboardNavbar />
        <div className="pt-20">
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
