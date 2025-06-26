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
          <Badge variant="success" className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            33% {t('dashboard.productivity')}
          </Badge>
          <Button variant="secondary" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            {t('dashboard.viewAnalytics')}
          </Button>
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
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {t('dashboard.viewComplete')}
            </Button>
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