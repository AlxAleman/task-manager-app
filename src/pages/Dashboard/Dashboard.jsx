import React from 'react';
import { TrendingUp, Eye } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { 
  StatsCards, 
  QuickActions, 
  ProductivityChart, 
  RecentTasks 
} from '@/components/features/dashboard';
import { useI18n } from '@/hooks/useI18n';

const Dashboard = () => {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            {t('dashboard.welcomeBack')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('dashboard.welcomeSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="success" className="flex items-center gap-1 shadow-sm">
            <TrendingUp className="w-3 h-3" />
            33% {t('dashboard.productivity')}
          </Badge>
          {/* Botón View Analytics mejorado */}
          <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 dark:border-gray-600 px-4 py-2 text-sm gap-2 shadow-sm hover:shadow-md transform hover:scale-105">
            <Eye className="w-4 h-4" />
            {t('dashboard.viewAnalytics')}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Quick Actions */}
      <QuickActions />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Productivity Summary */}
        <div className="lg:col-span-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('dashboard.productivitySummary')}
              </h2>
            </div>
            {/* Botón View Complete mejorado */}
            <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-700 px-3 py-1.5 text-sm gap-2 hover:shadow-sm">
              <Eye className="w-4 h-4" />
              {t('dashboard.viewComplete')}
            </button>
          </div>
          <ProductivityChart />
        </div>
      </div>

      {/* Recent Tasks */}
      <RecentTasks />
    </div>
  );
};

export default Dashboard;