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
      description: t('createNewTask')
    },
    { 
      label: t('viewCalendar'),
      icon: Calendar, 
      variant: 'secondary', 
      action: () => console.log('Calendario'),
      description: t('reviewImportantDates')
    },
    { 
      label: t('manageTeam'),
      icon: Users, 
      variant: 'secondary', 
      action: () => console.log('Equipo'),
      description: t('administerCollaborators')
    },
    { 
      label: t('viewReports'),
      icon: TrendingUp, 
      variant: 'secondary', 
      action: () => console.log('Reportes'),
      description: t('analyzeProductivity')
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
              <Button 
                variant={action.variant}
                icon={action.icon}
                onClick={action.action}
                className="w-full h-auto p-4 flex-col gap-2 text-left"
              >
                <span className="font-medium">{action.label}</span>
                <span className="text-xs opacity-75 font-normal">
                  {action.description}
                </span>
              </Button>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">4</p>
              <p className="text-xs text-gray-500">{t('activeProjects')}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className="text-xs text-gray-500">{t('thisWeek')}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">89%</p>
              <p className="text-xs text-gray-500">{t('efficiency')}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">2.5h</p>
              <p className="text-xs text-gray-500">{t('avgTime')}</p>
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