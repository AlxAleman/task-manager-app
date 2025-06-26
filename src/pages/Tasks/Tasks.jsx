import React, { useState } from 'react';
import { Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui';
import { useTasks, useStats } from '@/hooks';
import { useI18n } from '@/hooks/useI18n';
import TaskList from '@/components/features/tasks/TaskList';
import AddTaskModal from '@/components/features/tasks/AddTaskModal';

const Tasks = () => {
  const { state } = useTasks();
  const stats = useStats();
  const { t } = useI18n();
  const [showAddTask, setShowAddTask] = useState(false);

  const getViewTitle = () => {
    switch (state.currentFilter) {
      case 'all': return t('tasks.allTasksTitle');
      case 'pending': return t('tasks.pendingTasksTitle');
      case 'completed': return t('tasks.completedTasksTitle');
      case 'today': return t('tasks.todayTasksTitle');
      case 'overdue': return t('tasks.overdueTasksTitle');
      default: return t('tasks.title');
    }
  };

  const getViewDescription = () => {
    switch (state.currentFilter) {
      case 'all': 
        return `${stats.total} ${t('tasks.totalTasksDesc')}`;
      case 'pending': 
        return `${stats.pending} ${t('tasks.pendingTasksDesc')}`;
      case 'completed': 
        return `${stats.completed} ${t('tasks.completedTasksDesc')}`;
      case 'today': 
        return `${stats.today} ${t('tasks.todayTasksDesc')}`;
      case 'overdue': 
        return stats.overdue > 0 
          ? `${stats.overdue} ${t('tasks.overdueTasksDesc')}` 
          : t('tasks.noOverdueDesc');
      default: 
        return '...';
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {getViewTitle()}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {getViewDescription()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Botón Advanced Filters mejorado */}
            <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 dark:border-gray-600 px-4 py-2 text-sm gap-2 shadow-sm hover:shadow-md">
              <Filter className="w-4 h-4" />
              {t('tasks.advancedFilters')}
            </button>
            
            {/* Botón New Task mejorado */}
            <button 
              onClick={() => setShowAddTask(true)}
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-4 py-2 text-sm gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              {t('tasks.newTask')}
            </button>
          </div>
        </div>

        {/* Task List */}
        <TaskList />
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <AddTaskModal onClose={() => setShowAddTask(false)} />
      )}
    </>
  );
};

export default Tasks;