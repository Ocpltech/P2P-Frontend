import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { FadeIn } from '../animations/FadeIn';
import { useTheme } from '../../hooks/useTheme';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'admin' | 'merchant';
  userName: string;
}

export function DashboardLayout({ children, userType, userName }: DashboardLayoutProps) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900">
        <TopBar userName={userName} />
        <div className="flex">
          <Sidebar userType={userType} />
          <main className="flex-1 p-8">
            <FadeIn>
              {children}
            </FadeIn>
          </main>
        </div>
      </div>
    </div>
  );
}