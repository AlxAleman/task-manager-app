import React, { useState } from 'react';
import { Plus, Calendar, Users, TrendingUp, Activity } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import AddTaskModal from '@/components/features/tasks/AddTaskModal';
import { useI18n } from '@/hooks/useI18n';

const QuickActions = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { t } = useI18n();

  const actions = [
    { 
      label: t('newTask'),
      icon: Plus, 
      variant: 'primary', 
      action: () => setShowAddTask(true),
      description: t('createNewTask'),
      customStyle: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0'
    },
    { 
      label: t('viewCalendar'),
      icon: Calendar, 
      variant: 'secondary', 
      action: () => console.log('Calendario'),
      description: t('reviewImportantDates'),
      customStyle: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-600'
    },
    { 
      label: t('manageTeam'),
      icon: Users, 
      variant: 'secondary', 
      action: () => console.log('Equipo'),
      description: t('administerCollaborators'),
      customStyle: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-600'
    },
    { 
      label: t('viewReports'),
      icon: TrendingUp, 
      variant: 'secondary', 
      action: () => console.log('Reportes'),
      description: t('analyzeProductivity'),
      customStyle: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-600'
    }
  ];

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('quickActions')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <div key={index} className="group">
              <button
                onClick={action.action}
                className={`w-full h-auto p-4 flex flex-col items-center gap-2 text-center rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${action.customStyle}`}
              >
                <action.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{action.label}</span>
                <span className="text-xs opacity-75 font-normal leading-tight">
                  {action.description}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{t('activeProjects')}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">12</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{t('thisWeek')}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">89%</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{t('efficiency')}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">2.5h</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{t('avgTime')}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Add Task Modal */}
      {showAddTask && (
        <AddTaskModal onClose={() => setShowAddTask(false)} />
      )}
    </>
  );
};

export default QuickActions;