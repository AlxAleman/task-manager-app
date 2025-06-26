// src/components/layout/Layout/Layout.jsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Header, Sidebar } from '@/components/layout';
import { Button } from '@/components/ui';
import { useTasks } from '@/hooks';
import { useI18n } from '@/hooks/useI18n'; // <--- Agrega esto

// Import pages/views
import Dashboard from '@/pages/Dashboard/Dashboard';
import Tasks from '@/pages/Tasks/Tasks';
import Analytics from '@/pages/Analytics/Analytics';

const Layout = () => {
  const { state } = useTasks();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useI18n(); // <--- Y esto

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <Tasks />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="flex h-full w-full">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-64
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-transform duration-300 ease-in-out lg:transition-none
          flex-shrink-0
        `}>
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Mobile menu button */}
          <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="text-sm font-medium">{t('menu')}</span>
            </Button>
          </div>

          {/* Header */}
          <div className="flex-shrink-0">
            <Header />
          </div>
          
          {/* Main content with scroll */}
          <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
            <div className="h-full">
              <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 h-full">
                <div className="h-full overflow-y-auto">
                  {renderCurrentView()}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
