// src/components/layout/Sidebar/Sidebar.jsx
import React from 'react';
import {
    Target,
    BarChart3,
    Circle,
    CheckCircle,
    Calendar,
    AlertCircle,
    TrendingUp,
    PieChart
} from 'lucide-react';
import { Badge } from '@/components/ui';
import { useTasks, useStats, useLanguage } from '@/hooks';

const Sidebar = () => {
    const { state, setFilter, setView } = useTasks();
    const stats = useStats();
    const { t } = useLanguage();

    const menuItems = [
        {
            id: 'dashboard',
            label: t('dashboard'),
            icon: BarChart3,
            badge: null,
            view: 'dashboard'
        },
        {
            id: 'analytics',
            label: t('analytics'),
            icon: PieChart,
            badge: null,
            view: 'analytics'
        },
        {
            id: 'all',
            label: t('allTasks'),
            icon: Target,
            badge: stats.total,
            view: 'tasks'
        },
        {
            id: 'pending',
            label: t('pending'),
            icon: Circle,
            badge: stats.pending,
            view: 'tasks'
        },
        {
            id: 'completed',
            label: t('completed'),
            icon: CheckCircle,
            badge: stats.completed,
            view: 'tasks'
        },
        {
            id: 'today',
            label: t('today'),
            icon: Calendar,
            badge: stats.today,
            view: 'tasks'
        },
        {
            id: 'overdue',
            label: t('overdue'),
            icon: AlertCircle,
            badge: stats.overdue,
            view: 'tasks'
        }
    ];

    const handleMenuClick = (item) => {
        setView(item.view);
        if (item.view === 'tasks') {
            setFilter(item.id);
        }
    };

    const isActive = (item) => {
        return (state.currentView === 'dashboard' && item.id === 'dashboard') ||
            (state.currentView === 'analytics' && item.id === 'analytics') ||
            (state.currentView === 'tasks' && state.currentFilter === item.id);
    };

    return (
        <aside className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300">
            {/* Header */}
            <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="font-bold text-xl text-gray-900 dark:text-white truncate">
                            {t('appName')}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {t('appSubtitle')}
                        </p>

                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 lg:p-6 overflow-y-auto">
                <div className="space-y-1">
                    {menuItems.map(item => {
                        const Icon = item.icon;
                        const active = isActive(item);

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleMenuClick(item)}
                                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left 
                  transition-all duration-200 group focus-ring
                  ${active
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-sm'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }
                `}
                            >
                                <Icon className={`w-5 h-5 flex-shrink-0 ${active
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200'
                                    }`} />

                                <span className="font-medium flex-1 truncate">
                                    {item.label}
                                </span>

                                {item.badge !== null && (
                                    <Badge variant={active ? 'info' : 'default'} className="flex-shrink-0">
                                        {item.badge}
                                    </Badge>
                                )}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Productivity Widget */}
            <div className="p-4 lg:p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {t('productivity')}
                        </h3>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {t('completed')}
                                </span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {stats.completionRate}%
                                </span>
                            </div>

                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${stats.completionRate}%` }}
                                />
                            </div>
                        </div>

                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {stats.completed} {t('de')} {stats.total} {t('completedTasks')}
                        </div>

                        {stats.weeklyTasks > 0 && (
                            <div className="text-xs text-blue-600 dark:text-blue-400">
                                +{stats.weeklyTasks} {t('thisWeek')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;