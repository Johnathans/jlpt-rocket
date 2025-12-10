'use client';

import React from 'react';
import DashboardNavbar from './DashboardNavbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
}
