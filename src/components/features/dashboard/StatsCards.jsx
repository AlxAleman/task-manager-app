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
      bgGradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'completed',
      title: t('completedStats'),
      value: stats.completed,
      subtitle: `${stats.completionRate}% ${t('successRate')}`,
      icon: CheckCircle,
      color: 'green',
      bgGradient: 'from-green-500 to-green-600'
    },
    {
      id: 'pending',
      title: t('pendingStats'),
      value: stats.pending,
      subtitle: `${stats.today} ${t('forToday')}`,
      icon: Clock,
      color: 'orange',
      bgGradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'overdue',
      title: t('overdueStats'),
      value: stats.overdue,
      subtitle: stats.overdue > 0 ? t('requiresAttention') : t('allUpToDate'),
      icon: AlertTriangle,
      color: 'red',
      bgGradient: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.id}
            className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            <div className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${card.color}-100 dark:bg-${card.color}-900/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 text-${card.color}-600 dark:text-${card.color}-400`} />
                </div>
                {card.id === 'overdue' && card.value > 0 && (
                  <Badge variant="danger" className="animate-pulse">
                    {card.value}
                  </Badge>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </span>
                  {card.id === 'completed' && (
                    <Badge variant="success" size="sm">
                      +{Math.floor(card.value * 0.3)} {t('thisWeek')}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
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
