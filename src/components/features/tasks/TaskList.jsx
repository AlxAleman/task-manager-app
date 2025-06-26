import React from 'react';
import { 
  Target, 
  Calendar, 
  CheckCircle, 
  Circle, 
  MoreVertical, 
  Filter,
  Plus
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { useFilteredTasks, useTasks } from '@/hooks';
import { useI18n } from '@/hooks/useI18n';

const TaskList = () => {
  const filteredTasks = useFilteredTasks();
  const { toggleTask, deleteTask } = useTasks();
  const { t } = useI18n();

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
    if (diffDays < -1) return t('daysAgo', { count: Math.abs(diffDays) });
    if (diffDays > 1) return t('inDays', { count: diffDays });

    return taskDate.toLocaleDateString(t('locale'), {
      day: 'numeric',
      month: 'short'
    });
  };

  const isOverdue = (date, completed) => {
    if (!date || completed) return false;
    return new Date(date) < new Date();
  };

  if (filteredTasks.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {t('noTasksToShow')}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {t('createYourFirstTask')}
        </p>
        <Button icon={Plus}>
          {t('createFirstTask')}
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('tasksWithCount', { count: filteredTasks.length })}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" icon={Filter}>
            {t('filter')}
          </Button>
          <Button variant="ghost" size="sm" icon={MoreVertical} />
        </div>
      </div>

      <div className="space-y-3">
        {filteredTasks.map(task => {
          const overdue = isOverdue(task.dueDate, task.completed);

          return (
            <div 
              key={task.id}
              className={`
                group p-4 border rounded-lg transition-all duration-200 hover:shadow-sm
                ${task.completed 
                  ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600' 
                  : overdue
                    ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-1 transition-all duration-200 hover:scale-110"
                >
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 hover:text-blue-500" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`
                      font-medium text-base
                      ${task.completed 
                        ? 'line-through text-gray-500 dark:text-gray-400' 
                        : 'text-gray-900 dark:text-white'
                      }
                    `}>
                      {task.title}
                    </h3>
                    <Badge variant={getPriorityColor(task.priority)} size="sm">
                      {t(`priority${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`)}
                    </Badge>
                    {overdue && (
                      <Badge variant="danger" size="sm">
                        {t('overdue')}
                      </Badge>
                    )}
                  </div>

                  {task.description && (
                    <p className={`
                      text-sm mb-3
                      ${task.completed 
                        ? 'text-gray-400' 
                        : 'text-gray-600 dark:text-gray-300'
                      }
                    `}>
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <Target className="w-3 h-3" />
                      {task.project}
                    </span>
                    {task.dueDate && (
                      <span className={`
                        flex items-center gap-1
                        ${overdue 
                          ? 'text-red-600 dark:text-red-400 font-medium' 
                          : 'text-gray-500 dark:text-gray-400'
                        }
                      `}>
                        <Calendar className="w-3 h-3" />
                        {formatDate(task.dueDate)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm">
                    {t('edit')}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    {t('delete')}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default TaskList;