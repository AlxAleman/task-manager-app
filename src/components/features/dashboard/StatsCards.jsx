import React from 'react';
import { Target, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { useStats } from '@/hooks';
import { useI18n } from '@/hooks/useI18n';

const StatsCards = () => {
  const stats = useStats();
  const { t, language } = useI18n();

  const cards = [
    {
      id: 'total',
      title: t('totalTasks'),
      value: stats.total,
      subtitle: t('totalTasksWeekly'),
      icon: Target,
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      darkBg: 'dark:bg-blue-900/20',
      iconColor: 'text-blue-700 dark:text-blue-400',
      ringColor: 'ring-blue-100 dark:ring-blue-900/50'
    },
    {
      id: 'completed',
      title: t('completedStats'),
      value: stats.completed,
      subtitle: `${stats.completionRate}% ${t('successRate')}`,
      icon: CheckCircle,
      color: 'green',
      bgGradient: 'from-green-500 to-green-600',
      lightBg: 'bg-green-50',
      darkBg: 'dark:bg-green-900/20',
      iconColor: 'text-green-700 dark:text-green-400',
      ringColor: 'ring-green-100 dark:ring-green-900/50'
    },
    {
      id: 'pending',
      title: t('pendingStats'),
      value: stats.pending,
      subtitle: `${stats.today} ${t('forToday')}`,
      icon: Clock,
      color: 'orange',
      bgGradient: 'from-orange-500 to-orange-600',
      lightBg: 'bg-orange-50',
      darkBg: 'dark:bg-orange-900/20',
      iconColor: 'text-orange-700 dark:text-orange-400',
      ringColor: 'ring-orange-100 dark:ring-orange-900/50'
    },
    {
      id: 'overdue',
      title: t('overdueStats'),
      value: stats.overdue,
      subtitle: stats.overdue > 0 ? t('requiresAttention') : t('allUpToDate'),
      icon: AlertTriangle,
      color: 'red',
      bgGradient: 'from-red-500 to-red-600',
      lightBg: 'bg-red-50',
      darkBg: 'dark:bg-red-900/20',
      iconColor: 'text-red-700 dark:text-red-400',
      ringColor: 'ring-red-100 dark:ring-red-900/50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.id}
            className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-l-transparent hover:border-l-current"
            style={{ 
              animationDelay: `${index * 100}ms`,
              borderLeftColor: `var(--${card.color}-500)`
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            <div className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.lightBg} ${card.darkBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-2 ${card.ringColor}`}>
                  <Icon 
                    className="w-6 h-6" 
                    style={{
                      color: card.id === 'total' ? '#1d4ed8' : 
                             card.id === 'completed' ? '#15803d' :
                             card.id === 'pending' ? '#c2410c' : '#dc2626'
                    }}
                  />
                </div>
                {card.id === 'overdue' && card.value > 0 && (
                  <Badge variant="danger" className="animate-pulse shadow-sm">
                    {card.value}
                  </Badge>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  {card.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </span>
                  {card.id === 'completed' && (
                    <Badge variant="success" size="sm" className="shadow-sm">
                      +{Math.floor(card.value * 0.3)} {t('thisWeek')}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {card.subtitle}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;