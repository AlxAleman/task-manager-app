import React from 'react';
import { 
  Target, 
  Calendar, 
  CheckCircle, 
  Circle, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { useTasks } from '@/hooks';
import { useI18n } from '@/hooks/useI18n';

const RecentTasks = () => {
  const { state, toggleTask, setView, setFilter } = useTasks();
  const { t } = useI18n();

  const recentTasks = state.tasks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const taskDate = new Date(date);
    const today = new Date();
    const diffTime = taskDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return t('today');
    if (diffDays === 1) return t('tomorrow');
    if (diffDays === -1) return t('yesterday');

    return taskDate.toLocaleDateString(t('locale'), {
      day: 'numeric',
      month: 'short'
    });
  };

  const handleViewAllTasks = () => {
    setView('tasks');
    setFilter('all');
  };

  if (recentTasks.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {t('noRecentTasks')}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {t('createdTasksWillAppearHere')}
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('recentActivity')}
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleViewAllTasks}
          className="group"
        >
          {t('viewAll')}
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div className="space-y-3">
        {recentTasks.map(task => {
          const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

          return (
            <div 
              key={task.id}
              className={`
                group p-3 border rounded-lg transition-all duration-200 hover:shadow-sm
                ${task.completed 
                  ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600' 
                  : isOverdue
                    ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="transition-all duration-200 hover:scale-110"
                >
                  {task.completed ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400 hover:text-blue-500" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`
                      font-medium text-sm
                      ${task.completed 
                        ? 'line-through text-gray-500 dark:text-gray-400' 
                        : 'text-gray-900 dark:text-white'
                      }
                    `}>
                      {task.title}
                    </h4>
                    <Badge variant={getPriorityColor(task.priority)} size="sm">
                      {t(`priority${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {task.project}
                    </span>
                    {task.dueDate && (
                      <span className={`
                        flex items-center gap-1
                        ${isOverdue ? 'text-red-600 dark:text-red-400' : ''}
                      `}>
                        <Calendar className="w-3 h-3" />
                        {formatDate(task.dueDate)}
                      </span>
                    )}
                  </div>
                </div>

                {isOverdue && (
                  <Badge variant="danger" size="sm">
                    {t('overdue')}
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-blue-600">
              {state.tasks.filter(t => !t.completed).length}
            </p>
            <p className="text-xs text-gray-500">{t('pending')}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-green-600">
              {state.tasks.filter(t => t.completed).length}
            </p>
            <p className="text-xs text-gray-500">{t('completed')}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-orange-600">
              {state.tasks.filter(t => {
                const today = new Date().toDateString();
                return t.dueDate && new Date(t.dueDate).toDateString() === today;
              }).length}
            </p>
            <p className="text-xs text-gray-500">{t('forToday')}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecentTasks;