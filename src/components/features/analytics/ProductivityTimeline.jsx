import React, { useState } from 'react';
import {
  Clock,
  CheckCircle,
  Target,
  TrendingUp,
  Calendar,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { useTasks } from '@/hooks';
import { useI18n } from '@/hooks/useI18n';

const ProductivityTimeline = () => {
  const { state } = useTasks();
  const { t } = useI18n();
  const [timeRange, setTimeRange] = useState('week');

  const generateTimelineEvents = () => {
    const events = [];
    const now = new Date();

    state.tasks.forEach(task => {
      events.push({
        id: `created-${task.id}`,
        type: 'created',
        title: `${t('taskCreated')}: ${task.title}`,
        description: `${t('project')}: ${task.project} | ${t('priority')}: ${task.priority}`,
        timestamp: new Date(task.createdAt),
        task,
        icon: Target,
        color: 'blue'
      });

      if (task.completed && task.completedAt) {
        events.push({
          id: `completed-${task.id}`,
          type: 'completed',
          title: `${t('taskCompleted')}: ${task.title}`,
          description: `${t('elapsedTime')}: ${calculateDuration(task.createdAt, task.completedAt)}`,
          timestamp: new Date(task.completedAt),
          task,
          icon: CheckCircle,
          color: 'green'
        });
      }
    });

    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(9, 0, 0, 0);

      events.push({
        id: `milestone-${i}`,
        type: 'milestone',
        title: t('workSession'),
        description: `${2 + Math.floor(Math.random() * 3)}h ${t('productiveWork')}`,
        timestamp: date,
        icon: Clock,
        color: 'purple'
      });
    }

    return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffHours = Math.round((endDate - startDate) / (1000 * 60 * 60));

    if (diffHours < 24) return `${diffHours}h`;
    const days = Math.floor(diffHours / 24);
    return `${days}d ${diffHours % 24}h`;
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diffTime = now - timestamp;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 60) return `${t('ago')} ${diffMinutes}m`;
    if (diffHours < 24) return `${t('ago')} ${diffHours}h`;
    if (diffDays < 7) return `${t('ago')} ${diffDays}d`;

    return timestamp.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getEventColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
    };
    return colors[color] || colors.blue;
  };

  const timelineEvents = generateTimelineEvents();

  const groupedEvents = timelineEvents.reduce((groups, event) => {
    const date = event.timestamp.toDateString();
    if (!groups[date]) groups[date] = [];
    groups[date].push(event);
    return groups;
  }, {});

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('productivityTimeline')}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="week">{t('thisWeek')}</option>
            <option value="month">{t('thisMonth')}</option>
            <option value="year">{t('thisYear')}</option>
          </select>
          <Button variant="ghost" size="sm" icon={Filter}>
            {t('filter')}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedEvents).map(([date, events]) => (
          <div key={date} className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {new Date(date).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}
                </span>
              </div>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              <Badge variant="default" size="sm">
                {events.length} {t('events')}
              </Badge>
            </div>

            <div className="space-y-3 ml-6">
              {events.map((event, index) => {
                const Icon = event.icon;
                return (
                  <div key={event.id} className="relative">
                    {index < events.length - 1 && (
                      <div className="absolute left-6 top-12 w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
                    )}

                    <div className="flex items-start gap-4 group">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center
                        ${getEventColor(event.color)}
                        group-hover:scale-110 transition-transform duration-200
                      `}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {event.title}
                          </h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTimestamp(event.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              event.type === 'completed' ? 'success' :
                              event.type === 'created' ? 'info' : 'default'
                            }
                            size="sm"
                          >
                            {event.type === 'completed' ? t('completed') :
                             event.type === 'created' ? t('created') : t('activity')}
                          </Badge>
                          {event.task && (
                            <Badge variant="default" size="sm">
                              {event.task.project}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {timelineEvents.filter(e => e.type === 'created').length}
            </p>
            <p className="text-xs text-gray-500">{t('tasksCreated')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {timelineEvents.filter(e => e.type === 'completed').length}
            </p>
            <p className="text-xs text-gray-500">{t('completed')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {timelineEvents.filter(e => e.type === 'milestone').length}
            </p>
            <p className="text-xs text-gray-500">{t('sessions')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">
              {Math.round(
                timelineEvents.filter(e => e.type === 'completed').length /
                Math.max(timelineEvents.filter(e => e.type === 'created').length, 1) * 100
              )}%
            </p>
            <p className="text-xs text-gray-500">{t('efficiency')}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductivityTimeline;