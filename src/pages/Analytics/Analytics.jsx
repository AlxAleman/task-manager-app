import React from 'react';
import { BarChart3, TrendingUp, Download, Share2 } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { useStats } from '@/hooks';
import { useI18n } from '@/hooks/useI18n';
import ProductivityChart from '@/components/features/analytics/ProductivityChart';
import ProductivityTimeline from '@/components/features/analytics/ProductivityTimeline';

const Analytics = () => {
  const stats = useStats();
  const { t } = useI18n();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('analyticsTitle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('analyticsSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="success" className="px-3 py-1 shadow-sm">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12% {t('thisWeekTrend')}
          </Badge>
          
          {/* Botón Share mejorado */}
          <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 dark:border-gray-600 px-4 py-2 text-sm gap-2 shadow-sm hover:shadow-md">
            <Share2 className="w-4 h-4" />
            {t('share')}
          </button>
          
          {/* Botón Export mejorado */}
          <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-4 py-2 text-sm gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
            <Download className="w-4 h-4" />
            {t('export')}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">{t('generalProductivity')}</p>
              <p className="text-3xl font-bold">{stats.completionRate}%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">{t('completedStats')}</p>
              <p className="text-3xl font-bold">{stats.completed}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">{t('weeklyTasks')}</p>
              <p className="text-3xl font-bold">{stats.weeklyTasks}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">{t('dailyAverage')}</p>
              <p className="text-3xl font-bold">{Math.round(stats.total / 7)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Productivity Chart */}
      <ProductivityChart />

      {/* Productivity Timeline */}
      <ProductivityTimeline />
    </div>
  );
};

export default Analytics;